export function sanitizeDangerousChars(value: string) {
    if (typeof value !== 'string') return value;
    let sanitized = value.replace(/<[^>]*>/g, '');
    sanitized = sanitized.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]/g, '');
    return sanitized.trim()
}

export const checkCharacterValue = (val: string) => {
    const regexCheck = /^[A-Za-z0-9\s]+$/

    return regexCheck.test(val)
}