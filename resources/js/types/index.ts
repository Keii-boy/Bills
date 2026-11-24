import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface AccountBalance {
    name: string;
    current_balance: string;
}

export interface AccountBalanceLink extends AccountBalance {
    href: string;
}

export interface Account extends AccountBalance {
    id: number;
    opening_balance: string;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    matchChildren?: boolean;
    prefetch?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
