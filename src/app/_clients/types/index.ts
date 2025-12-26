import { IconType } from "react-icons/lib";

export interface IDataCategoryMotor {
  id: number;
  motorCycleName: string;
  releaseYear: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IProfileUser {
  fullname: string;
  phoneNumber: string;
  email: string;
}

interface IDataMenu {
  title: string;
  url: string;
  icon: IconType;
}
export interface IAppSideBarProps {
  dataProfil: IProfileUser;
  dataMenu: IDataMenu[];
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

export interface IFirstVisitModalProps {
  isOpenDialog: boolean;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISectionWhyChooseUsProps {
  pt?: string;
  dividerBorder?: boolean;
}
