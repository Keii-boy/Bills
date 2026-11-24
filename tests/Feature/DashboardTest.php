<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page(): void
    {
        $this->get(route('dashboard'))->assertRedirectToRoute('login');
    }

    public function test_users_without_accounts_receive_an_empty_list_and_zero_balance(): void
    {
        User::factory()->create()->accounts()->create(['name' => 'Private', 'opening_balance' => '1000']);

        $this->actingAs(User::factory()->create())->get(route('dashboard'))->assertInertia(
            fn (Assert $page) => $page->component('dashboard', false)
                ->where('total_balance', '0')
                ->where('accounts', [])
                ->where('links', [
                    'dashboard' => '/dashboard',
                    'accounts' => '/accounts',
                    'create_account' => '/accounts/create',
                ]),
        );
    }

    public function test_the_dashboard_lists_and_sums_only_accounts_owned_by_the_signed_in_user(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $cash = $owner->accounts()->create(['name' => 'Cash', 'opening_balance' => '10']);
        $otherUser->accounts()->create(['name' => 'Private', 'opening_balance' => '17']);
        $bank = $owner->accounts()->create(['name' => 'Bank', 'opening_balance' => '-999999999999']);
        $card = $owner->accounts()->create(['name' => 'Card', 'opening_balance' => '-12']);
        $savings = $owner->accounts()->create(['name' => 'Savings', 'opening_balance' => '0']);

        $this->actingAs($owner)->get(route('dashboard', ['user_id' => $otherUser->id]))->assertInertia(
            fn (Assert $page) => $page->component('dashboard', false)
                ->where('total_balance', '-1000000000001')
                ->where('accounts', [
                    ['name' => 'Cash', 'current_balance' => '10', 'href' => '/accounts/'.$cash->id],
                    ['name' => 'Bank', 'current_balance' => '-999999999999', 'href' => '/accounts/'.$bank->id],
                    ['name' => 'Card', 'current_balance' => '-12', 'href' => '/accounts/'.$card->id],
                    ['name' => 'Savings', 'current_balance' => '0', 'href' => '/accounts/'.$savings->id],
                ]),
        );
    }

    public function test_the_total_preserves_whole_yen_above_the_javascript_safe_integer_limit(): void
    {
        $owner = User::factory()->create();
        $entry = ['user_id' => $owner->id, 'name' => 'Savings', 'opening_balance' => '999999999999'];

        for ($remaining = 9008; $remaining > 0; $remaining -= 250) {
            DB::table('accounts')->insert(array_fill(0, min($remaining, 250), $entry));
        }

        $owner->accounts()->create(['name' => 'Cash', 'opening_balance' => '1']);

        $this->actingAs($owner)->get(route('dashboard'))->assertInertia(
            fn (Assert $page) => $page->component('dashboard', false)
                ->where('total_balance', '9007999999990993')
                ->has('accounts', 9009),
        );
    }

    public function test_the_dashboard_protects_financial_data_in_the_cache_and_browser_history(): void
    {
        $response = $this->actingAs(User::factory()->create())->get('https://bills.test/dashboard');

        $response->assertOk();
        $this->assertTrue($response->headers->hasCacheControlDirective('no-store'));
        $this->assertTrue($response->headers->hasCacheControlDirective('private'));
        $this->assertTrue($response->inertiaPage()['encryptHistory']);
    }

    public function test_the_dashboard_supports_local_browser_history_encryption_on_loopback(): void
    {
        $response = $this->actingAs(User::factory()->create())->get('http://127.0.0.1/dashboard');

        $response->assertOk();
        $this->assertTrue($response->inertiaPage()['encryptHistory']);
    }
}
