import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: { children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
    return (
        <AppShell variant="sidebar">
            <a
                href="#main-content"
                className="bg-primary text-primary-foreground focus-visible:outline-ring sr-only rounded-md px-4 py-2 text-sm font-semibold focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
                Skip to content
            </a>
            <AppSidebar />
            <AppContent variant="sidebar" className="min-w-0">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <div id="main-content" tabIndex={-1} className="flex min-w-0 flex-1 flex-col">
                    {children}
                </div>
            </AppContent>
        </AppShell>
    );
}
