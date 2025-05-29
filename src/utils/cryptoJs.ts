import CryptoJS from "crypto-js"

export const encryptCrypto = ({ role, key }: { role: string, key: string }) => {
    const data = CryptoJS.AES.encrypt(role, key as string, {
        iv: CryptoJS.lib.WordArray.random(16)
    })

    return data
}

export const decryptCrypto = ({ data, key }: { data: string, key: string }) => {
    const byte = CryptoJS.AES.decrypt(data as string, key)
    const decrypted = byte.toString(CryptoJS.enc.Utf8)

    return decrypted
}