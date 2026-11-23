import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link } from '@inertiajs/react';
import { Fragment } from 'react';

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: BreadcrumbItemType[] }) {
    if (breadcrumbs.length === 0) {
        return null;
    }

    return (
        <Breadcrumb className="min-w-0 flex-1">
            <BreadcrumbList className="flex-nowrap gap-2">
                {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;

                    return (
                        <Fragment key={item.href}>
                            <BreadcrumbItem className={isLast ? 'min-w-0 flex-1' : 'max-w-[45%] min-w-0'}>
                                {isLast ? (
                                    <BreadcrumbPage className="truncate font-semibold" title={item.title}>
                                        {item.title}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink
                                        asChild
                                        className="focus-visible:outline-ring truncate rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                                    >
                                        <Link href={item.href} title={item.title}>
                                            {item.title}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator className="shrink-0" />}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
