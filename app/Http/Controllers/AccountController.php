<?php

namespace App\Http\Controllers;

use App\Http\Requests\Accounts\StoreAccountRequest;
use App\Models\Account;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function index(Request $request): Response
    {
        $accounts = $request->user()->accounts()
            ->orderBy('id')
            ->get()
            ->map($this->accountProps(...));

        return Inertia::render('accounts/index', ['accounts' => $accounts]);
    }

    public function create(): Response
    {
        return Inertia::render('accounts/create');
    }

    public function store(StoreAccountRequest $request): RedirectResponse
    {
        $account = $request->user()->accounts()->create($request->validated());

        return to_route('accounts.show', $account);
    }

    public function show(Request $request, string $account): Response
    {
        $accountId = filter_var($account, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);

        abort_if($accountId === false, 404);

        $ownedAccount = $request->user()->accounts()->findOrFail($accountId);

        return Inertia::render('accounts/show', ['account' => $this->accountProps($ownedAccount)]);
    }

    /** @return array{id: int, name: string, opening_balance: string, current_balance: string} */
    private function accountProps(Account $account): array
    {
        return [
            'id' => $account->id,
            'name' => $account->name,
            'opening_balance' => $account->opening_balance,
            'current_balance' => $account->currentBalance(),
        ];
    }
}
