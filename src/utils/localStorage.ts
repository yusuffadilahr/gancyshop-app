export function setLocalStorageWithExpiry(key: string, value: string, ttlMs: number) {
    const now = new Date()

    const item = {
        value,
        expiry: now.getTime() + ttlMs,
    }

    localStorage.setItem(key, JSON.stringify(item))
}

export function getLocalStorageWithExpiry(key: string) {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) return null
    
    try {
        const item = JSON.parse(itemStr)
        const now = new Date()

        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key)
            return null
        }

        return item.value
    } catch (err) {
        console.log(err)
        return null
    }
}