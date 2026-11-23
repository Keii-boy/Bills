import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function AppearanceToggleTab({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <div
            role="group"
            aria-label="Appearance"
            className={cn('border-border bg-muted inline-flex flex-wrap gap-1 rounded-lg border p-1', className)}
            {...props}
        >
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    type="button"
                    aria-pressed={appearance === value}
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        'ring-offset-muted focus-visible:ring-ring flex min-h-10 items-center gap-2 rounded-md border border-transparent px-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden motion-safe:transition-colors',
                        appearance === value
                            ? 'border-accent-foreground bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:bg-card hover:text-card-foreground',
                    )}
                >
                    <Icon aria-hidden="true" className="size-4" />
                    <span>{label}</span>
                </button>
            ))}
        </div>
    );
}
