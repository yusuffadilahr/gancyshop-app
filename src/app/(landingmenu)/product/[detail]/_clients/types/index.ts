export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  fileId: string | null;
  weightGram: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  categoryId: number;
  ownerId: number;
  category: {
    id: number;
    categoryName: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };

  cart: {
    createdAt: string | null;
    deletedAt: string | null;
    id: number;
    price: number;
    productId: number;
    quantity: number;
    totalPrice: number;
    updatedAt: string | null;
    userId: number;
  }[];
}

export interface IBodyProductDetailProps {
  idProduct: string;
}