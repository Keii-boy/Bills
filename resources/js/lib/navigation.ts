function pathname(url: string): string {
    return url.split(/[?#]/, 1)[0].replace(/\/+$/, '') || '/';
}

export function getNavigationMatch(currentUrl: string, destination: string, matchChildren = false): 'page' | 'location' | undefined {
    const currentPath = pathname(currentUrl);
    const destinationPath = pathname(destination);

    if (currentPath === destinationPath) {
        return 'page';
    }

    if (matchChildren && destinationPath !== '/' && currentPath.startsWith(`${destinationPath}/`)) {
        return 'location';
    }
}
