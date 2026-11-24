import PageTitle from '@/components/page-title';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatYen } from '@/lib/format-yen';
import { type Account } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function ShowAccount({ account }: { account: Account }) {
    const accountsUrl = route('accounts.index');

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Accounts', href: accountsUrl },
                { title: account.name, href: route('accounts.show', account.id) },
            ]}
        >
            <Head title="Account details" />

            <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6 sm:px-6 md:space-y-8 md:px-8 md:py-10">
                <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <PageTitle>{account.name}</PageTitle>
                    <Button asChild variant="ghost" className="-ml-3 shrink-0 self-start px-3 sm:ml-0">
                        <Link href={accountsUrl}>
                            <ArrowLeft aria-hidden="true" />
                            Back to accounts
                        </Link>
                    </Button>
                </header>

                <Card className="overflow-hidden">
                    <dl className="grid md:grid-cols-[3fr_2fr]">
                        <div className="bg-accent text-accent-foreground min-w-0 px-4 py-8 sm:px-6 md:p-8">
                            <dt className="text-sm font-medium">Current balance</dt>
                            <dd className="mt-2 text-3xl font-semibold tracking-tight break-words tabular-nums sm:text-4xl">
                                {formatYen(account.current_balance)}
                            </dd>
                        </div>
                        <div className="min-w-0 border-t p-4 sm:p-6 md:border-t-0 md:border-l md:p-8">
                            <dt className="text-muted-foreground text-sm font-medium">Opening balance</dt>
                            <dd className="mt-2 text-2xl font-semibold tracking-tight break-words tabular-nums">
                                {formatYen(account.opening_balance)}
                            </dd>
                            <dd className="text-muted-foreground mt-2 text-sm">Starting balance before recorded activity.</dd>
                        </div>
                    </dl>
                </Card>
            </div>
        </AppLayout>
    );
}
