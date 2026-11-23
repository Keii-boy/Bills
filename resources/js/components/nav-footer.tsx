import { Icon } from '@/components/icon';
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';

export function NavFooter({
    items,
    className,
    ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[];
}) {
    return (
        <SidebarGroup {...props} className={cn('p-0', className)}>
            <nav aria-label="Project resources">
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild tooltip={item.title} className="text-muted-foreground h-9 gap-3 px-3 text-xs">
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    {item.icon && <Icon iconNode={item.icon} className="size-4" aria-hidden="true" />}
                                    <span className="group-data-[collapsible=icon]:sr-only">{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </nav>
        </SidebarGroup>
    );
}
