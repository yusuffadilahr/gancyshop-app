'use server'

export const registerAction = async (fd: FormData) => {
    try {
        const data = {
            firstName: fd.get('firstName'),
            lastName: fd.get('lastName'),
            email: fd.get('email'),
            phoneNumber: fd.get('phoneNumber')
        }

        const res = await fetch('http://localhost:8000/api/user/register-user', {
            cache: 'no-store',
            headers: {
                "Content-Type": 'application/json',
                'Accept': 'application/json'
            },

            method: 'POST',
            body: JSON.stringify(data)
        })

        const result = await res.json()
        if (!res.ok) throw new Error(result?.message || 'Login gagal')

        return result
    } catch (error) {
        throw error
    }
}