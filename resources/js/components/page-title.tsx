function focusTitle(heading: HTMLHeadingElement | null) {
    heading?.focus({ preventScroll: true });
}

export default function PageTitle({ children }: { children: string }) {
    return (
        <h1
            ref={focusTitle}
            tabIndex={-1}
            className="text-page-title md:text-page-title-lg focus-visible:outline-ring min-w-0 rounded-sm font-semibold tracking-tight break-words focus-visible:outline-2 focus-visible:outline-offset-4"
        >
            {children}
        </h1>
    );
}
