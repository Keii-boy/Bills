import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <span className="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-md">
                <AppLogoIcon className="size-[18px]" />
            </span>
            <span className="text-sidebar-foreground text-lg leading-none font-semibold tracking-tight group-data-[collapsible=icon]:sr-only">
                Bills
            </span>
        </>
    );
}
