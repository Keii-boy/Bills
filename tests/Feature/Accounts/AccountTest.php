<?php

namespace Tests\Feature\Accounts;

use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class AccountTest extends TestCase
{
    use RefreshDatabase;

    public function test_an_account_belongs_to_its_owner(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $account = $owner->accounts()->create([
            'name' => 'Cash',
            'opening_balance' => '10000',
        ]);

        $this->assertTrue($account->user->is($owner));
        $this->assertSame([$account->id], $owner->accounts()->pluck('id')->all());
        $this->assertFalse($otherUser->accounts()->whereKey($account->id)->exists());
    }

    #[DataProvider('allowedOpeningBalances')]
    public function test_opening_balance_round_trips_as_a_whole_yen_string(string $balance): void
    {
        $account = User::factory()->create()->accounts()->create([
            'name' => 'Cash',
            'opening_balance' => $balance,
        ]);

        $this->assertSame($balance, $account->refresh()->opening_balance);
    }

    public static function allowedOpeningBalances(): array
    {
        return [
            'negative limit' => ['-999999999999'],
            'zero' => ['0'],
            'positive limit' => ['999999999999'],
        ];
    }

    public function test_a_user_can_have_accounts_with_the_same_name(): void
    {
        $user = User::factory()->create();
        $user->accounts()->createMany([
            ['name' => 'Cash', 'opening_balance' => '0'],
            ['name' => 'Cash', 'opening_balance' => '1000'],
        ]);

        $this->assertSame(2, $user->accounts()->where('name', 'Cash')->count());
    }

    public function test_deleting_a_user_removes_only_their_accounts(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $account = $owner->accounts()->create(['name' => 'Cash', 'opening_balance' => '0']);
        $otherAccount = $otherUser->accounts()->create(['name' => 'Savings', 'opening_balance' => '0']);

        $owner->delete();

        $this->assertModelMissing($account);
        $this->assertModelExists($otherAccount);
    }

    #[DataProvider('invalidOpeningBalances')]
    public function test_postgresql_rejects_opening_balances_outside_the_allowed_range(string $balance): void
    {
        if (DB::getDriverName() !== 'pgsql') {
            $this->markTestSkipped('This assertion requires PostgreSQL numeric constraints.');
        }

        $user = User::factory()->create();

        $this->expectException(QueryException::class);

        $user->accounts()->create(['name' => 'Cash', 'opening_balance' => $balance]);
    }

    public static function invalidOpeningBalances(): array
    {
        return [
            'below minimum' => ['-1000000000000'],
            'above maximum' => ['1000000000000'],
            'not a number' => ['NaN'],
        ];
    }
}
