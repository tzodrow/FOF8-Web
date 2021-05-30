export function avg(...params: Array<number>) {
    if (params.length === 0) return 0;
    const sum = params.reduce((a, b) => a + b);
    return sum / params.length;
}