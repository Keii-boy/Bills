import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { type FormEventHandler, useRef } from 'react';

export default function CreateAccount() {
    const accountsUrl = route('accounts.index');
    const { data, setData, post, processing, errors } = useForm({ name: '', opening_balance: '' });
    const submitting = useRef(false);

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

            <div className="w-full max-w-xl p-4 md:p-6">
                <Heading title="Create account" />

                <form onSubmit={submit} aria-busy={processing} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Account name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(event) => setData('name', event.target.value)}
                            placeholder="Cash"
                            maxLength={100}
                            required
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        <InputError id="name-error" message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="opening_balance">Opening balance (JPY)</Label>
                        <Input
                            id="opening_balance"
                            type="text"
                            value={data.opening_balance}
                            onChange={(event) => setData('opening_balance', event.target.value)}
                            placeholder="10000"
                            required
                            aria-invalid={Boolean(errors.opening_balance)}
                            aria-describedby={errors.opening_balance ? 'opening-balance-hint opening-balance-error' : 'opening-balance-hint'}
                        />
                        <p id="opening-balance-hint" className="text-muted-foreground text-sm">
                            Enter whole yen without commas. For example, 10000, 0, or -1200.
                        </p>
                        <InputError id="opening-balance-error" message={errors.opening_balance} />
                    </div>

                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create account'}
                        </Button>
                        <Button asChild variant="ghost">
                            <Link href={accountsUrl}>Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
