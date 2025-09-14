import { object, string } from "yup";

export const forgotPasswordSchema = object().shape({
  email: string().required("Email wajib diisi"),
});
