import Cookies from 'js-cookie'

export const setCookie = ({ data, expires, cookieName }: { data: string, expires: number, cookieName: string }) => {
    Cookies.set(cookieName, data, { sameSite: 'Lax', expires: expires })
}