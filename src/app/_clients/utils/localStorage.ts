import { decryptCrypto, encryptCrypto } from "@/app/_clients/utils/cryptoJs"

export function setLocalStorageWithExpiry(key: string, value: string, ttlMs: number) {
    const now = new Date()

    const item = {
        value,
        expiry: now.getTime() + ttlMs,
    }

    const val = encryptCrypto({ val: JSON.stringify(item), key: process.env.NEXT_PUBLIC_SECRET_KEY as string })
    localStorage.setItem(key, encodeURIComponent(val.toString()))
}

export function getLocalStorageWithExpiry(key: string) {
    const itemStr = (localStorage.getItem(key))
    if (!itemStr) return null

    try {
        const val = decryptCrypto({
            data: decodeURIComponent(itemStr),
            key: process.env.NEXT_PUBLIC_SECRET_KEY as string
        })
        
        const item = JSON.parse(val)
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