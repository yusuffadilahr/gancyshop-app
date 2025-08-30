import { object, string } from "yup";

export const formLoginSchema = object({
    email: string()
        .trim()
        .email("Format email tidak valid")
        .matches(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Format email tidak valid")

        .required("Email wajib diisi"),

    password: string()
        .trim()
        .min(6, "Password minimal 6 karakter")
        .max(50, "Password terlalu panjang")
        .required("Password wajib diisi"),
})