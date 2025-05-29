import { registerAction } from "@/app/(auth)/auth/register/_serverside/action/register";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const useMutateRegister = () => {
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '+62',
    }

    const { mutate: handleRegister, isPending } = useMutation({
        mutationFn: async (fd: FormData) => {
            return await registerAction(fd)
        }, onSuccess: (res) => {
            toast({
                title: res.message || 'Berhasil melakukan registrasi',
                description: new Date().toDateString(),
            })
        }, onError: (err) => {
            toast({
                title: err?.message || 'Gagal melakukan registrasi',
                description: new Date().toDateString(),
            })
        }
    })

    return {
        initialValues,
        handleRegister,
        isPending
    }
}