import { object, ref, string } from "yup";

export const formRegisterSchema = object().shape({
    firstName: string()
        .trim()
        .min(2, "Nama depan terlalu pendek")
        .max(50, "Nama depan terlalu panjang")
        .required("Nama depan wajib diisi"),

    lastName: string()
        .trim()
        .min(2, "Nama belakang terlalu pendek")
        .max(50, "Nama belakang terlalu panjang")
        .required("Nama belakang wajib diisi"),

    email: string()
        .trim()
        .email("Format email tidak valid")
        .matches(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Format email tidak valid")
        .required("Email wajib diisi"),

    phoneNumber: string()
        .min(8, "Nomor telepon terlalu pendek")
        .max(16, "Nomor telepon terlalu panjang")
        .required("Nomor telepon wajib diisi"),

    password: string()
        .min(8, "Password minimal 8 karakter")
        .matches(/[A-Z]/, "Password harus mengandung huruf kapital")
        .matches(/[a-z]/, "Password harus mengandung huruf kecil")
        .matches(/[0-9]/, "Password harus mengandung angka")
        .matches(/[@$!%*?&]/, "Password harus mengandung simbol (@$!%*?&)")
        .required("Password wajib diisi"),

    confPassword: string()
        .oneOf([ref("password")], "Konfirmasi password tidak sesuai")
        .required("Konfirmasi password wajib diisi"),
});