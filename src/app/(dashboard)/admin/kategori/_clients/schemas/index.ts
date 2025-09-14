import { object, string } from "yup";

export const editKategoriSchema = object().shape({
  idCategoryMotor: string().required("Harap diisi terlebih dahulu"),
  categoryName: string().required("Harap diisi terlebih dahulu"),
});
