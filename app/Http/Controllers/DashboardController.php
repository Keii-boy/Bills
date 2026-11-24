<?php

namespace App\Http\Controllers;

use Brick\Math\BigInteger;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $ownedAccounts = $request->user()->accounts()
            ->orderBy('id')
            ->get(['id', 'name', 'opening_balance']);

        $accounts = [];
        $totalBalance = BigInteger::zero();

        foreach ($ownedAccounts as $account) {
            $balance = $account->currentBalance();
            $totalBalance = $totalBalance->plus($balance);

            $accounts[] = [
                'name' => $account->name,
                'current_balance' => $balance,
                'href' => route('accounts.show', $account, absolute: false),
            ];
        }

        // Browser history encryption requires Web Crypto on HTTPS or loopback.
        Inertia::encryptHistory($request->isSecure() || in_array($request->getHost(), ['localhost', '127.0.0.1', '[::1]'], true));

        return Inertia::render('dashboard', [
            'total_balance' => (string) $totalBalance,
            'accounts' => $accounts,
            'links' => [
                'dashboard' => route('dashboard', absolute: false),
                'accounts' => route('accounts.index', absolute: false),
                'create_account' => route('accounts.create', absolute: false),
            ],
        ]);
    }
}
