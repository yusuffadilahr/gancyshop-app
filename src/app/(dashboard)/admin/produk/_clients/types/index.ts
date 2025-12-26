import { FormikErrors } from "formik";

export interface IDataProduk {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  weightGram: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  ownerId: number;
  category: {
    categoryMotorcyleId: number;
    categoryName: string;
    createdAt: string;
    deletedAt: string | null;
    id: number;
    updatedAt: string;
  };
}

export interface IInitialValuesAddProduct {
  images: null | File;
  name: string;
  description: string;
  price: string;
  isActive: boolean;
  stock: string;
  weightGram: string;
  categoryId: string;
}

export interface IModalEditProductProps {
  setFilePreview: React.Dispatch<React.SetStateAction<string>>;
  dataTable: IDataProduk | null;
  setDataTable: React.Dispatch<React.SetStateAction<IDataProduk | null>>;
  onClick: () => void;
  filePreview: string;
  handleChangeFile: (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: File | null | undefined,
      shouldValidate?: boolean
    ) => Promise<void | FormikErrors<{
      images: null | File;
      name: string;
      description: string;
      price: number;
      isActive: boolean;
      stock: number;
      weightGram: number;
    }>>
  ) => void;
  refetch: () => void;
}

export interface IInitialValuesEditProduct {
  images: null | File;
  name: string;
  description: string;
  price: string;
  isActive: boolean;
  stock: string;
  weightGram: string;
}

export interface ITableProductProps {
  isLoading: boolean;
  filePreview: string;
  setFilePreview: React.Dispatch<React.SetStateAction<string>>;
  data: IDataProduk[];
  handleUpdateActiveProduct: ({ fd, id }: { fd: FormData; id: string }) => void;
  isPending: boolean;
  handleChangeFile: (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: File | null | undefined,
      shouldValidate?: boolean
    ) => Promise<void | FormikErrors<{
      images: null | File;
      name: string;
      description: string;
      price: number;
      isActive: boolean;
      stock: number;
      weightGram: number;
    }>>
  ) => void;
  refetch: () => void;
}

export interface IModalAddProductProps {
  initialValues: IInitialValuesAddProduct;
  handleAddProduct: (
    formData: FormData,
    options: { onSuccess: () => void }
  ) => void;
  isPending: boolean;
  filePreview: string;
  setFilePreview: (val: string) => void;
  handleChangeFile: (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: File | null | undefined,
      shouldValidate?: boolean
    ) => Promise<void | FormikErrors<{
      images: null | File;
      name: string;
      description: string;
      price: number;
      isActive: boolean;
      stock: number;
      weightGram: number;
    }>>
  ) => void;
}

export interface ISelectOptionSearchProps {
  handleGetDataCategoryByCategoryMotor: (id: string) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: {
    categoryMotor: string;
    category: string;
  };
  setValue: React.Dispatch<
    React.SetStateAction<{
      categoryMotor: string;
      category: string;
    }>
  >;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<IInitialValuesAddProduct>>;
}

export interface IDataCategoryName {
  categoryMotorcyleId: number;
  categoryName: string;
  createdAt: string | null;
  deletedAt: string | null;
  id: number;
  updatedAt: string | null;
}

export interface ISelectOptionCategoryProps {
  setValueDisplay: React.Dispatch<
    React.SetStateAction<{
      categoryMotor: string;
      category: string;
    }>
  >;
  valueDisplay: {
    categoryMotor: string;
    category: string;
  };
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<IInitialValuesAddProduct>>;
  data: IDataCategoryName[];
}
