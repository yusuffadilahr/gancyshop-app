import { decryptCrypto, encryptCrypto } from "@/app/_clients/utils/cryptoJs"

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || ''
export const encryptParams = (id: string) => {
    const dataEncrypt = encryptCrypto({ val: id, key: secretKey })
    return encodeURIComponent(dataEncrypt.toString())
}

export const decryptParams = (encryptedParams: string) => {
    const decoded = decodeURIComponent(encryptedParams)
    return decryptCrypto({ data: decoded, key: secretKey })
}