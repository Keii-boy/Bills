import AccountBalanceList from '@/components/account-balance-list';
import PageTitle from '@/components/page-title';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type Account } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus, Wallet } from 'lucide-react';

export default function AccountsIndex({ accounts }: { accounts: Account[] }) {
    const accountsUrl = route('accounts.index');
    const createUrl = route('accounts.create');
    const hasAccounts = accounts.length > 0;

    return (
        <AppLayout breadcrumbs={[{ title: 'Accounts', href: accountsUrl }]}>
            <Head title="Accounts" />

            <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6 sm:px-6 md:space-y-8 md:px-8 md:py-10">
                <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <PageTitle>Accounts</PageTitle>
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
                    <AccountBalanceList accounts={accounts.map((account) => ({ ...account, href: route('accounts.show', account.id) }))} />
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
