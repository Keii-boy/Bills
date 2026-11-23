export default function Heading({ title, description }: { title: string; description?: string }) {
    return (
        <>
            <div className="mb-8 space-y-1.5">
                <h2 className="text-page-title md:text-page-title-lg font-semibold tracking-tight">{title}</h2>
                {description && <p className="text-muted-foreground text-sm">{description}</p>}
            </div>
        </>
    );
}
