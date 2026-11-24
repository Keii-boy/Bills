import InputError from '@/components/input-error';
import PageTitle from '@/components/page-title';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { type FormEventHandler, useEffect, useRef } from 'react';

export default function CreateAccount() {
    const accountsUrl = route('accounts.index');
    const { data, setData, post, processing, errors } = useForm({ name: '', opening_balance: '' });
    const submitting = useRef(false);
    const nameInput = useRef<HTMLInputElement>(null);
    const balanceInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (errors.name) {
            nameInput.current?.focus();
        } else if (errors.opening_balance) {
            balanceInput.current?.focus();
        }
    }, [errors]);

    const submit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (submitting.current) {
            return;
        }

        post(route('accounts.store'), {
            onStart: () => {
                submitting.current = true;
            },
            onFinish: () => {
                submitting.current = false;
            },
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Accounts', href: accountsUrl },
                { title: 'Create account', href: route('accounts.create') },
            ]}
        >
            <Head title="Create account" />

            <div className="mx-auto w-full max-w-2xl space-y-6 px-4 py-6 sm:px-6 md:space-y-8 md:px-8 md:py-10">
                <PageTitle>Create account</PageTitle>

                <Card>
                    <form method="post" onSubmit={submit} aria-busy={processing}>
                        <div className="space-y-6 p-4 sm:p-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Account name</Label>
                                <Input
                                    ref={nameInput}
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(event) => setData('name', event.target.value)}
                                    placeholder="e.g. Cash"
                                    maxLength={100}
                                    required
                                    readOnly={processing}
                                    aria-invalid={Boolean(errors.name)}
                                    aria-describedby={errors.name ? 'name-error' : undefined}
                                />
                                <InputError id="name-error" message={errors.name} role="alert" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="opening_balance">Opening balance (JPY)</Label>
                                <div className="relative">
                                    <span
                                        aria-hidden="true"
                                        className="text-muted-foreground pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm"
                                    >
                                        ¥
                                    </span>
                                    <Input
                                        ref={balanceInput}
                                        id="opening_balance"
                                        name="opening_balance"
                                        type="text"
                                        className="pl-8 tabular-nums"
                                        value={data.opening_balance}
                                        onChange={(event) => setData('opening_balance', event.target.value)}
                                        required
                                        readOnly={processing}
                                        aria-invalid={Boolean(errors.opening_balance)}
                                        aria-describedby={
                                            errors.opening_balance ? 'opening-balance-hint opening-balance-error' : 'opening-balance-hint'
                                        }
                                    />
                                </div>
                                <p id="opening-balance-hint" className="text-muted-foreground text-sm">
                                    Enter your starting balance in whole yen, using up to 12 digits without commas or leading zeros. For example,
                                    10000, 0, or -1200.
                                </p>
                                <InputError id="opening-balance-error" message={errors.opening_balance} role="alert" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 border-t p-4 sm:flex-row sm:items-center sm:gap-3 sm:px-6">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating account…' : 'Create account'}
                            </Button>
                            <Button asChild variant="ghost">
                                <Link href={accountsUrl}>Cancel</Link>
                            </Button>
                        </div>
                    </form>
                    <p role="status" className="sr-only">
                        {processing ? 'Creating account…' : ''}
                    </p>
                </Card>
            </div>
        </AppLayout>
    );
}
