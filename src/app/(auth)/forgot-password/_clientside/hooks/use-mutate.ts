import { forgotPasswordAction } from "@/app/(auth)/forgot-password/_serverside/action";
import { useAppTools } from "@/hooks/use-app";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const useMutateForgotPassword = () => {
    const { router } = useAppTools()

    const initialValues = {
        email: ''
    }

    const { mutate: handleForgotPassword, isPending } = useMutation({
        mutationFn: async (fd: FormData) => {
            return await forgotPasswordAction(fd)
        },
        onSuccess: (res) => {
            toast({
                title: res.message || 'Berhasil meminta permintaan',
                description: new Date().toDateString(),
            })

            router.push('/auth/login')
        }, onError: (err) => {
            toast({
                title: err.message || 'Gagal meminta permintaan',
                description: new Date().toDateString(),
            })
        }
    })

    return {
        initialValues,
        handleForgotPassword,
        isPending
    }
}