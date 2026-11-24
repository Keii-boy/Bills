import AccountPageTitle from '@/components/account-page-title';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatYen } from '@/lib/format-yen';
import { type Account } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ChevronRight, Plus, Wallet } from 'lucide-react';

export default function AccountsIndex({ accounts }: { accounts: Account[] }) {
    const accountsUrl = route('accounts.index');
    const createUrl = route('accounts.create');
    const hasAccounts = accounts.length > 0;

    return (
        <AppLayout breadcrumbs={[{ title: 'Accounts', href: accountsUrl }]}>
            <Head title="Accounts" />

            <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6 sm:px-6 md:space-y-8 md:px-8 md:py-10">
                <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <AccountPageTitle>Accounts</AccountPageTitle>
                    {hasAccounts && (
                        <Button asChild>
                            <Link href={createUrl}>
                                <Plus aria-hidden="true" />
                                Create account
                            </Link>
                        </Button>
                    )}
                </header>

                {hasAccounts ? (
                    <Card className="p-1">
                        <ul role="list" className="divide-y">
                            {accounts.map((account) => (
                                <li key={account.id}>
                                    <Link
                                        href={route('accounts.show', account.id)}
                                        className="group hover:bg-accent/60 focus-visible:outline-ring grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 rounded-md px-3 py-4 focus-visible:outline-2 focus-visible:-outline-offset-2 motion-safe:transition-colors sm:grid-cols-[auto_minmax(0,1fr)_auto_auto] sm:gap-x-4 sm:px-4"
                                    >
                                        <span className="bg-accent text-accent-foreground row-span-2 grid size-10 place-items-center self-start rounded-md sm:row-span-1 sm:self-center">
                                            <Wallet aria-hidden="true" className="size-5" />
                                        </span>
                                        <span className="col-start-2 font-semibold break-words underline-offset-4 group-hover:underline group-focus-visible:underline">
                                            {account.name}
                                        </span>
                                        <span className="col-start-2 flex flex-col sm:col-start-3 sm:row-start-1 sm:text-right">
                                            <span className="text-muted-foreground text-xs">Current balance</span>
                                            <span className="font-semibold break-words tabular-nums sm:text-lg">
                                                {formatYen(account.current_balance)}
                                            </span>
                                        </span>
                                        <ChevronRight
                                            aria-hidden="true"
                                            className="text-muted-foreground col-start-3 row-span-2 row-start-1 size-4 sm:col-start-4 sm:row-span-1"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Card>
                ) : (
                    <section aria-labelledby="empty-accounts-title">
                        <Card className="flex flex-col items-center px-4 py-12 text-center sm:py-16">
                            <span className="bg-accent text-accent-foreground mb-5 grid size-12 place-items-center rounded-lg">
                                <Wallet aria-hidden="true" className="size-6" />
                            </span>
                            <h2 id="empty-accounts-title" className="text-section-title font-semibold tracking-tight">
                                No accounts yet
                            </h2>
                            <p className="text-muted-foreground mt-2 max-w-xs text-sm">Add a cash or bank account to start tracking its balance.</p>
                            <Button asChild className="mt-6 w-full sm:w-auto">
                                <Link href={createUrl}>
                                    <Plus aria-hidden="true" />
                                    Create account
                                </Link>
                            </Button>
                        </Card>
                    </section>
                )}
            </div>
        </AppLayout>
    );
}
