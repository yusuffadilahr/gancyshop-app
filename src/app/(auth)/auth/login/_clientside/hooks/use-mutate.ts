import { loginAction } from "@/app/(auth)/auth/login/_serverside/action"
import { setCookie } from "@/app/_serverside/utils/setCookies"
import { toast } from "@/hooks/use-toast"
import { encryptCrypto } from "@/utils/cryptoJs"
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
            const token = res.data.token
            const role = res.data.role

            const encryptedRole = encryptCrypto({ val: role, key: secretKey as string })

            localStorage.setItem('_token', token)
            setCookie({ data: encryptedRole.toString(), expires: 1, cookieName: '_role' })
            setCookie({ data: token, expires: 1, cookieName: '_token' })

            toast({
                title: res.message || 'Berhasil Login',
                description: new Date().toDateString(),
            })

            window.location.href = (role === 'ADMIN') ? '/admin/dashboard' : '/'

        }, onError: () => {
            toast({
                title: 'Gagal Login',
                description: new Date().toDateString(),
            })
        }
    })
    return {
        handleLogin, isPending, initialValues
    }
}