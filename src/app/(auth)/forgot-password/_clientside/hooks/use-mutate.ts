import { forgotPasswordAction } from "@/app/(auth)/forgot-password/_serverside/action";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useMutateForgotPassword = () => {
    const router = useRouter()

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