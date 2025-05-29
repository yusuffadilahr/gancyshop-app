export function sanitizeDangerousChars(value: string) {
    if (typeof value !== 'string') return value;
    let sanitized = value.replace(/<[^>]*>/g, '');
    sanitized = sanitized.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]/g, '');
    return sanitized.trim()
}