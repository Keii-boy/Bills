import AccountBalanceList from '@/components/account-balance-list';
import PageTitle from '@/components/page-title';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatYen } from '@/lib/format-yen';
import { type AccountBalanceLink } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus, Wallet } from 'lucide-react';

interface DashboardProps {
    total_balance: string;
    accounts: AccountBalanceLink[];
    links: {
        dashboard: string;
        accounts: string;
        create_account: string;
    };
}

export default function Dashboard({ total_balance, accounts, links }: DashboardProps) {
    const hasAccounts = accounts.length > 0;

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: links.dashboard }]}>
            <Head title="Dashboard" />

            <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6 sm:px-6 md:space-y-8 md:px-8 md:py-10">
                <PageTitle>Dashboard</PageTitle>

                <section aria-labelledby="total-balance-title">
                    <Card className="bg-accent text-accent-foreground p-5 sm:p-8">
                        <h2 id="total-balance-title" className="text-sm font-medium">
                            Total balance
                        </h2>
                        <p className="mt-2 text-[clamp(1.25rem,6vw,1.875rem)] font-semibold tracking-tight break-words tabular-nums sm:text-5xl">
                            {formatYen(total_balance)}
                        </p>
                        {hasAccounts && (
                            <p className="mt-3 text-sm">
                                Across {accounts.length} {accounts.length === 1 ? 'account' : 'accounts'}
                            </p>
                        )}
                    </Card>
                </section>

                <section aria-labelledby="accounts-overview-title" className="space-y-3">
                    <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                        <h2 id="accounts-overview-title" className="text-section-title font-semibold tracking-tight">
                            Accounts overview
                        </h2>
                        {hasAccounts && (
                            <Button asChild variant="outline">
                                <Link href={links.accounts}>Manage accounts</Link>
                            </Button>
                        )}
                    </header>

                    {hasAccounts ? (
                        <AccountBalanceList accounts={accounts} />
                    ) : (
                        <Card className="flex flex-col items-center px-4 py-10 text-center sm:py-14">
                            <span className="bg-accent text-accent-foreground mb-4 grid size-12 place-items-center rounded-lg">
                                <Wallet aria-hidden="true" className="size-6" />
                            </span>
                            <h3 className="font-semibold">No accounts yet</h3>
                            <p className="text-muted-foreground mt-2 text-sm">Create an account to see its balance on your dashboard.</p>
                            <Button asChild className="mt-6 w-full sm:w-auto">
                                <Link href={links.create_account}>
                                    <Plus aria-hidden="true" />
                                    Create account
                                </Link>
                            </Button>
                        </Card>
                    )}
                </section>
            </div>
        </AppLayout>
    );
}
