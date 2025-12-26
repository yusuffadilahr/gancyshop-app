export interface IDataReportSales {
  date: string;

  total: Array<{
    name: string;
    value: number;
    yesterday: number;
    isFormatRupiah: boolean;

    percentage: string;
    trend: "up" | "down" | "equal";
    isPositive: boolean;
  }>;

  data: Array<{
    id: number;
    resi: string | number;
    report: Array<{
      id: number;
      quantity: number;
      fee: number;
      productName: string;
      description?: string;
      price: number;
      subtotal: number;
      net: number;
      imageUrl?: string;
      isActive?: boolean;
    }>;
  }>;

  summary: {
    subtotal: number;
    tax: number;
    net: number;
    transaction: number;
    qty: number;
  };
}

export interface IDataListProduk {
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
