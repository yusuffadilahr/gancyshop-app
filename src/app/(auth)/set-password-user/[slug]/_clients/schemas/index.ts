import { sanitizeDangerousChars } from "@/app/_clients/utils/sanitizeInput";
import { object, ref, string } from "yup";

export const setPasswordSchema = object().shape({
  password: string()
    .transform(sanitizeDangerousChars)
    .required("Password wajib diisi")
    .min(8, "Password minimal 8 karakter")
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]+$/,
      "Password mengandung karakter tidak valid"
    ),

  confirm_password: string()
    // .transform(sanitizeDangerousChars)
    .required("Konfirmasi password wajib diisi")
    .oneOf(
      [ref("password")],
      "Konfirmasi password harus sama dengan password"
    ),
});

export const forgotPasswordSchema = object().shape({
  email: string().required("Email wajib diisi"),
});
