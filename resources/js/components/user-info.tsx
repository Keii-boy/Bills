import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

export function UserInfo({ user, showEmail = false }: { user: User; showEmail?: boolean }) {
    const getInitials = useInitials();

    return (
        <>
            <Avatar className="size-8 shrink-0 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-accent text-accent-foreground font-semibold">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="grid min-w-0 flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:sr-only">
                <span className="truncate font-medium">{user.name}</span>
                {showEmail && <span className="text-muted-foreground truncate text-xs">{user.email}</span>}
            </div>
        </>
    );
}
