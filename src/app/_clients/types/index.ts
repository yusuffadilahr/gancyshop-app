import { IconType } from "react-icons/lib";

export interface IDataCategoryMotor {
  id: number;
  motorCycleName: string;
  releaseYear: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IAppSideBar {
  dataProfil: {
    fullname: string;
    phoneNumber: string;
    email: string;
  };
  dataMenu: {
    title: string;
    url: string;
    icon: IconType;
  }[];
  role: "USER" | "ADMIN";
}

export interface ICarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  price: string;
  rating: number;
  inStock: boolean;
}
