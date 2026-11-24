import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { getNavigationMatch } from '@/lib/navigation';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { url } = usePage();

    return (
        <nav aria-label="Main navigation">
            <SidebarMenu>
                {items.map((item) => {
                    const current = getNavigationMatch(url, item.url, item.matchChildren);

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                tooltip={item.title}
                                isActive={Boolean(current)}
                                className="data-[active=true]:before:bg-sidebar-accent-foreground h-11 gap-3 px-3 group-data-[collapsible=icon]:before:hidden data-[active=true]:font-semibold data-[active=true]:before:absolute data-[active=true]:before:top-1/2 data-[active=true]:before:left-0 data-[active=true]:before:h-5 data-[active=true]:before:w-0.5 data-[active=true]:before:-translate-y-1/2 [&>svg]:size-[18px]"
                            >
                                <Link href={item.url} aria-current={current} prefetch={item.prefetch}>
                                    {item.icon && <item.icon aria-hidden="true" />}
                                    <span className="group-data-[collapsible=icon]:sr-only">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </nav>
    );
}
