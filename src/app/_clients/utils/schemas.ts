import { sanitizeDangerousChars } from '@/app/_clients/utils/sanitizeInput'
import * as Yup from 'yup'

export const setPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .transform(sanitizeDangerousChars)
        .required('Password wajib diisi')
        .min(8, 'Password minimal 8 karakter')
        .matches(
            /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]+$/,
            'Password mengandung karakter tidak valid'
        ),

    confirm_password: Yup.string()
        // .transform(sanitizeDangerousChars)
        .required('Konfirmasi password wajib diisi')
        .oneOf([Yup.ref('password')], 'Konfirmasi password harus sama dengan password'),
})

export const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email wajib diisi')
})