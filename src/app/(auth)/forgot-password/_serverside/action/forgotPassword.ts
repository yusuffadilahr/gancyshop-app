'use server'

export const forgotPasswordAction = async (fd: FormData) => {
    try {
        const data = {
            email: fd.get('email')
        }

        const res = await fetch('http://localhost:8000/api/user/forgot-password-user', {
            method: 'POST',
            cache: 'no-store',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },

            body: JSON.stringify(data)
        })

        const result = await res.json()
        if (!res.ok) throw new Error(result?.message || 'Ubah Password Gagal')

        return result
    } catch (error) {
        throw error
    }
} 