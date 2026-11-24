import { Card } from '@/components/ui/card';
import { formatYen } from '@/lib/format-yen';
import { type AccountBalanceLink } from '@/types';
import { Link } from '@inertiajs/react';
import { ChevronRight, Wallet } from 'lucide-react';

export default function AccountBalanceList({ accounts }: { accounts: AccountBalanceLink[] }) {
    return (
        <Card className="p-1">
            <ul role="list" className="divide-y">
                {accounts.map((account) => (
                    <li key={account.href}>
                        <Link
                            href={account.href}
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
                                <span className="font-semibold break-words tabular-nums sm:text-lg">{formatYen(account.current_balance)}</span>
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
    );
}
