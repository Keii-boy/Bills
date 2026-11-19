import { cn } from '@/lib/utils';
import { ReceiptText, type LucideProps } from 'lucide-react';

export default function AppLogoIcon({ className, ...props }: LucideProps) {
    return <ReceiptText aria-hidden="true" className={cn(className, 'fill-none')} {...props} />;
}
