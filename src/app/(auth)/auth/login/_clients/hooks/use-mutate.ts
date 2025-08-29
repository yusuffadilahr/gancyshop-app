import { loginAction } from "@/app/(auth)/auth/login/_servers/services"
import { setCookie } from "@/app/_servers/utils/setCookies"
import { toast } from "@/hooks/use-toast"
import { encryptCrypto } from "@/app/_clients/utils/cryptoJs"
import { useMutation } from "@tanstack/react-query"

export const useLoginHooks = ({
    secretKey
}: { secretKey: string }) => {
    const initialValues = {
        email: '',
        password: ''
    }

    const { mutate: handleLogin, isPending } = useMutation({
        mutationFn: async (fd: FormData) => {
            const response = await loginAction(fd)
            return response
        }, onSuccess: (res) => {
            if (res?.error) throw res

            const token = res.data.token
            const role = res.data.role

            const encryptedRole = encryptCrypto({ val: role, key: secretKey as string })
            
            setCookie({ data: encryptedRole.toString(), expires: (10 * 365 * 24 * 60), cookieName: '_role' })
            setCookie({ data: token, expires: (5 / 1440), cookieName: '_token' })

            toast({
                title: res.message || 'Berhasil Login',
                description: new Date().toDateString(),
            })

            window.location.href = (role === 'ADMIN') ? '/admin/dashboard' : '/'

        }, onError: (err) => {
            if ('error' in err && err?.error) {
                toast({
                    title: err?.message || '',
                    description: new Date().toDateString(),
                })
            } else {
                toast({
                    title: 'Ada kesalahan dari server!',
                    description: new Date().toDateString(),
                })
            }
        }
    })
    return {
        handleLogin, isPending, initialValues
    }
}