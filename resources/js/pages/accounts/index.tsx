import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatYen } from '@/lib/format-yen';
import { type Account } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function AccountsIndex({ accounts }: { accounts: Account[] }) {
    const accountsUrl = route('accounts.index');

    return (
        <AppLayout breadcrumbs={[{ title: 'Accounts', href: accountsUrl }]}>
            <Head title="Accounts" />

            <div className="w-full max-w-4xl p-4 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-x-4">
                    <Heading title="Accounts" />
                    <Button asChild>
                        <Link href={route('accounts.create')}>Create account</Link>
                    </Button>
                </div>

                {accounts.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="space-y-1 p-6">
                            <p className="font-medium">No accounts yet</p>
                            <p className="text-muted-foreground text-sm">Create an account to start tracking its balance.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-muted-foreground border-b">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left font-medium">
                                        Account
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-right font-medium whitespace-nowrap">
                                        Current balance
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {accounts.map((account) => (
                                    <tr key={account.id}>
                                        <td className="px-4 py-4 break-words">
                                            <Link href={route('accounts.show', account.id)} className="font-medium underline underline-offset-4">
                                                {account.name}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-4 text-right whitespace-nowrap tabular-nums">{formatYen(account.current_balance)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
