import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatYen } from '@/lib/format-yen';
import { type Account } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function ShowAccount({ account }: { account: Account }) {
    const accountsUrl = route('accounts.index');

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Accounts', href: accountsUrl },
                { title: account.name, href: route('accounts.show', account.id) },
            ]}
        >
            <Head title={account.name} />

            <div className="w-full max-w-4xl p-4 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-x-4">
                    <div className="min-w-0 break-words">
                        <Heading title={account.name} />
                    </div>
                    <Button asChild variant="outline">
                        <Link href={accountsUrl}>Back to accounts</Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <dl className="grid gap-6 sm:grid-cols-2">
                            <div>
                                <dt className="text-muted-foreground text-sm">Current balance</dt>
                                <dd className="mt-1 text-2xl font-semibold tabular-nums">{formatYen(account.current_balance)}</dd>
                            </div>
                            <div>
                                <dt className="text-muted-foreground text-sm">Opening balance</dt>
                                <dd className="mt-1 text-2xl font-semibold tabular-nums">{formatYen(account.opening_balance)}</dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
