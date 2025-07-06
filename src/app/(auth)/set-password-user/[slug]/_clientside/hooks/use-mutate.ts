import { setPasswordAction } from "@/app/(auth)/set-password-user/[slug]/_serverside/action";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useMutateSetPassword = (token: string) => {
    const router = useRouter()

    const initialValues = {
        password: '',
        confirm_password: ''
    }

    const { mutate: handleSetPassword, isPending } = useMutation({
        mutationFn: async (fd: FormData) => {
            return await setPasswordAction(fd, token)
        },
        onSuccess: (res) => {
            toast({
                title: res.message || 'Berhasil merubah kata sandi, silahkan login',
                description: new Date().toDateString(),
            })

            router.push('/auth/login')
        }, onError: (err) => {
            toast({
                title: err.message || 'Gagal merubah kata sandi, silahkan coba lagi',
                description: new Date().toDateString(),
            })
        }
    })

    return {
        handleSetPassword,
        initialValues,
        isPending
    }
}