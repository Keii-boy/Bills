import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    return (
        <header className="border-border bg-card text-card-foreground flex min-h-14 min-w-0 shrink-0 items-center gap-3 border-b px-4 py-1.5 md:px-6 lg:px-8">
            <SidebarTrigger className="-ml-2 shrink-0" />
            <Breadcrumbs breadcrumbs={breadcrumbs} />
        </header>
    );
}
