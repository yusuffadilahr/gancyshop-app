interface ICategory {
  id: number;
  categoryMotorcycleId: number;
  categoryName: string;
  createdAt: string; // ISO Date
  updatedAt: string | null;
  deletedAt: string | null;
}

interface IProduct {
  id: number;
  category: ICategory;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  weightGram: number;
  imageUrl: string;
  fileId: number | null;
  ownerId: number;
  isActive: boolean;
  createdAt: string; // ISO Date
  updatedAt: string | null;
  deletedAt: string | null;
}

export interface IDataCartProduct {
  id: number;
  userId: number;
  productId: number;
  product: IProduct;
  price: number; // harga produk saat masuk cart
  quantity: number;
  totalPrice: number; // price * quantity
  createdAt: string; // ISO Date
  updatedAt: string | null; // ISO Date
  deletedAt: string | null;
}
