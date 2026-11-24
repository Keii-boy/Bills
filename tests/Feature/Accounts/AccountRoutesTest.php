<?php

namespace Tests\Feature\Accounts;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class AccountRoutesTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_guests_are_redirected_to_login_from_all_account_routes(): void
    {
        $this->get(route('accounts.index'))->assertRedirectToRoute('login');
        $this->get(route('accounts.create'))->assertRedirectToRoute('login');
        $this->post(route('accounts.store'))->assertRedirectToRoute('login');
        $this->get(route('accounts.show', 1))->assertRedirectToRoute('login');
    }

    public function test_the_index_shows_only_accounts_owned_by_the_signed_in_user(): void
    {
        $user = User::factory()->create();
        User::factory()->create()->accounts()->create(['name' => 'Private', 'opening_balance' => '999']);

        $this->actingAs($user)->get(route('accounts.index'))->assertInertia(
            fn (Assert $page) => $page->component('accounts/index', false)->where('accounts', []),
        );

        $account = $user->accounts()->create(['name' => 'Cash', 'opening_balance' => '10000']);

        $this->get(route('accounts.index'))->assertInertia(
            fn (Assert $page) => $page->component('accounts/index', false)->where('accounts', [[
                'id' => $account->id,
                'name' => 'Cash',
                'opening_balance' => '10000',
                'current_balance' => '10000',
            ]]),
        );
    }

    public function test_a_signed_in_user_can_open_the_create_page(): void
    {
        $this->actingAs(User::factory()->create())->get(route('accounts.create'))->assertInertia(
            fn (Assert $page) => $page->component('accounts/create', false),
        );
    }

    public function test_invalid_opening_balance_returns_to_the_form_with_both_entries(): void
    {
        $input = ['name' => 'Cash', 'opening_balance' => '-1200.5'];

        $this->actingAs(User::factory()->create())
            ->from(route('accounts.create'))
            ->post(route('accounts.store'), $input)
            ->assertRedirectToRoute('accounts.create')
            ->assertSessionHasErrors(['opening_balance'])
            ->assertSessionHasInput('name', $input['name'])
            ->assertSessionHasInput('opening_balance', $input['opening_balance']);

        $this->assertDatabaseCount('accounts', 0);
    }

    #[DataProvider('validOpeningBalances')]
    public function test_store_uses_the_signed_in_user_and_shows_string_balances(string $balance): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        $response = $this->actingAs($user)->post(route('accounts.store'), [
            'name' => 'Cash',
            'opening_balance' => $balance,
            'user_id' => $otherUser->id,
            'current_balance' => '999',
        ]);

        $response->assertSessionHasNoErrors();
        $account = $user->accounts()->sole();
        $response->assertRedirectToRoute('accounts.show', $account);
        $this->assertDatabaseCount('accounts', 1);

        $this->get(route('accounts.show', $account))->assertInertia(
            fn (Assert $page) => $page->component('accounts/show', false)->where('account', [
                'id' => $account->id,
                'name' => 'Cash',
                'opening_balance' => $balance,
                'current_balance' => $balance,
            ]),
        );
    }

    public static function validOpeningBalances(): array
    {
        return [
            'negative limit' => ['-999999999999'],
            'zero' => ['0'],
            'positive limit' => ['999999999999'],
        ];
    }

    public function test_accounts_outside_the_signed_in_users_records_return_not_found(): void
    {
        $account = User::factory()->create()->accounts()->create(['name' => 'Private', 'opening_balance' => '0']);
        $this->actingAs(User::factory()->create());

        $this->get(route('accounts.show', $account))->assertNotFound();
        $this->get(route('accounts.show', $account->id + 1))->assertNotFound();
        $this->get(route('accounts.show', 'invalid'))->assertNotFound();
        $this->get(route('accounts.show', '9223372036854775808'))->assertNotFound();
    }

    #[DataProvider('invalidFields')]
    public function test_store_rejects_invalid_input_without_creating_an_account(string $field, mixed $value): void
    {
        $input = ['name' => 'Cash', 'opening_balance' => '1000'];
        $input[$field] = $value;

        $this->actingAs(User::factory()->create())
            ->from(route('accounts.create'))
            ->post(route('accounts.store'), $input)
            ->assertRedirectToRoute('accounts.create')
            ->assertSessionHasErrors($field);

        $this->assertDatabaseCount('accounts', 0);
    }

    public static function invalidFields(): array
    {
        return [
            'blank name' => ['name', '   '],
            'name over 100 characters' => ['name', str_repeat('a', 101)],
            'missing balance' => ['opening_balance', null],
            'fraction' => ['opening_balance', '1000.5'],
            'decimal with no fraction' => ['opening_balance', '1000.0'],
            'scientific notation' => ['opening_balance', '1e3'],
            'formatted amount' => ['opening_balance', '1,000'],
            'non-numeric string' => ['opening_balance', 'NaN'],
            'numeric value' => ['opening_balance', 1000],
            'leading zeros' => ['opening_balance', '01000'],
            'below minimum' => ['opening_balance', '-1000000000000'],
            'above maximum' => ['opening_balance', '1000000000000'],
        ];
    }
}
