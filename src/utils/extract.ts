export const extractString = (value: unknown): string | undefined =>
    typeof value === 'string' ? value : undefined
