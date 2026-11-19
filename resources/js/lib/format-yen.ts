const yenFormatter = new Intl.NumberFormat('en-JP', { style: 'currency', currency: 'JPY' });

export function formatYen(amount: string): string {
    return yenFormatter.format(BigInt(amount));
}
