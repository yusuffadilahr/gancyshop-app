import { ICarouselSlide } from "@/app/_clients/types";
import { Shield, Truck, Clock, Award } from "lucide-react";
import {
  Star,
  Users,
  Wrench,
  Package,
  MessageCircle,
  CreditCard,
} from "lucide-react";

export const dummyData = [
  {
    id: 44,
    name: "Body Tameng Honda Vario 110",
    description:
      "Body samping kiri dan kanan untuk Honda Vario 110. Material plastik ABS orisinal dengan finishing glossy. Cocok untuk penggantian part pecah atau retak akibat benturan.",
    price: 1000,
    stock: 100,
    imageUrl: "/vario.jpg",
    fileId: null,
    weightGram: 100,
    isActive: true,
    createdAt: "2025-07-12T10:27:38.579Z",
    updatedAt: "2025-07-12T10:27:38.579Z",
    deletedAt: null,
    categoryId: 15,
    ownerId: 19,
    category: {
      id: 15,
      categoryName: "Tameng Depan",
      categoryMotorcyleId: 2,
      createdAt: "2025-06-09T04:13:32.105Z",
      updatedAt: "2025-06-09T04:13:32.105Z",
      deletedAt: null,
    },
  },
  {
    id: 43,
    name: "Sayap Kanan & Kiri Honda Beat Karbu",
    description:
      "Sayap body kanan dan kiri untuk Honda Beat karburator. Cocok untuk versi Beat 2008. Bahan kuat dan tahan panas, pemasangan plug and play tanpa ubahan.",
    price: 120000,
    stock: 12,
    imageUrl: "/beat-kankir.jpg",
    fileId: null,
    weightGram: 10,
    isActive: true,
    createdAt: "2025-07-12T04:50:29.519Z",
    updatedAt: "2025-07-12T09:20:35.318Z",
    deletedAt: null,
    categoryId: 3,
    ownerId: 19,
    category: {
      id: 3,
      categoryName: "Sayap Kiri & Kanan",
      categoryMotorcyleId: 1,
      createdAt: "2025-06-06T15:22:20.000Z",
      updatedAt: "2025-06-06T15:22:20.000Z",
      deletedAt: null,
    },
  },
  {
    id: 42,
    name: "Cover Lengsil Kunci Kontak Atas Universal",
    description:
      "Cover pelindung bagian atas kunci kontak (lengsil), cocok untuk berbagai tipe motor. Membantu melindungi lubang kunci dari debu dan air. Model elegan dan mudah dipasang.",
    price: 10000,
    stock: 9,
    imageUrl: "/cover.jpg",
    fileId: null,
    weightGram: 1,
    isActive: true,
    createdAt: "2025-06-08T00:54:34.822Z",
    updatedAt: "2025-06-08T00:54:34.822Z",
    deletedAt: null,
    categoryId: 4,
    ownerId: 19,
    category: {
      id: 4,
      categoryName: "Cover Lengsil Kunci Atas",
      categoryMotorcyleId: 1,
      createdAt: "2025-06-06T15:22:20.000Z",
      updatedAt: "2025-06-06T15:22:20.000Z",
      deletedAt: null,
    },
  },
  {
    id: 43,
    name: "Sayap Kanan & Kiri Honda Beat Karbu",
    description:
      "Sayap body kanan dan kiri untuk Honda Beat karburator. Cocok untuk versi Beat 2008. Bahan kuat dan tahan panas, pemasangan plug and play tanpa ubahan.",
    price: 120000,
    stock: 12,
    imageUrl: "/beat-kankir.jpg",
    fileId: null,
    weightGram: 10,
    isActive: true,
    createdAt: "2025-07-12T04:50:29.519Z",
    updatedAt: "2025-07-12T09:20:35.318Z",
    deletedAt: null,
    categoryId: 3,
    ownerId: 19,
    category: {
      id: 3,
      categoryName: "Sayap Kiri & Kanan",
      categoryMotorcyleId: 1,
      createdAt: "2025-06-06T15:22:20.000Z",
      updatedAt: "2025-06-06T15:22:20.000Z",
      deletedAt: null,
    },
  },
  {
    id: 42,
    name: "Cover Lengsil Kunci Kontak Atas Universal",
    description:
      "Cover pelindung bagian atas kunci kontak (lengsil), cocok untuk berbagai tipe motor. Membantu melindungi lubang kunci dari debu dan air. Model elegan dan mudah dipasang.",
    price: 10000,
    stock: 9,
    imageUrl: "/cover.jpg",
    fileId: null,
    weightGram: 1,
    isActive: true,
    createdAt: "2025-06-08T00:54:34.822Z",
    updatedAt: "2025-06-08T00:54:34.822Z",
    deletedAt: null,
    categoryId: 4,
    ownerId: 19,
    category: {
      id: 4,
      categoryName: "Cover Lengsil Kunci Atas",
      categoryMotorcyleId: 1,
      createdAt: "2025-06-06T15:22:20.000Z",
      updatedAt: "2025-06-06T15:22:20.000Z",
      deletedAt: null,
    },
  },
];

export const dataRatingStatis = [
  {
    aplikasiName: "Shopee",
    rating: 4.8,
    followers: 2100,
    lastUpdated: "2025-06-06",
    image: "/shopee.png",
    link: "https://shopee.co.id/gancyshop",
  },
  {
    aplikasiName: "Tokopedia",
    rating: 4.6,
    followers: 2300,
    lastUpdated: "2025-06-06",
    image: "/tokped.png",
    link: "https://tokopedia.com/gancis",
  },
  {
    aplikasiName: "Lazada",
    rating: 4.2,
    followers: 2000,
    lastUpdated: "2025-06-06",
    image: "/laz.png",
    link: "https://lazada.co.id/gancyshop",
  },
  {
    aplikasiName: "TikTok Shop",
    rating: 4.4,
    followers: 2200,
    lastUpdated: "2025-06-06",
    image: "/tik.jpg",
    link: "https://tiktok.com/@gancyshop",
  },
];

export const featuresDummy = [
  {
    icon: <Shield className="h-8 w-8 text-red-600" />,
    title: "100% Kualitas Premium",
    description:
      "Semua produk dijamin original dari distributor resmi dengan sertifikat keaslian",
    highlight: "Plug & Play",
  },
  {
    icon: <Truck className="h-8 w-8 text-red-600" />,
    title: "Ongkir Termurah",
    description:
      "Gratis ongkos kirim untuk pembelian minimal Rp 500.000 ke seluruh Indonesia",
    highlight: "Hemat Ongkir",
  },
  {
    icon: <Clock className="h-8 w-8 text-red-600" />,
    title: "Langsung Proses",
    description:
      "Order sebelum jam 15:00 WIB akan diproses dan dikirim di hari yang sama",
    highlight: "Proses Cepat",
  },
  {
    icon: <Award className="h-8 w-8 text-red-600" />,
    title: "Garansi Pengembalian",
    description:
      "Garansi resmi untuk semua produk rusak dengan layanan terbaik",
    highlight: "Garansi Resmi",
  },
];

export const statsDummy = [
  {
    number: "5,000+",
    label: "Produk Ready Stock",
    icon: <Package className="h-8 w-8" />,
    color: "text-blue-600",
  },
  {
    number: "1,247",
    label: "Customer Puas",
    icon: <Users className="h-8 w-8" />,
    color: "text-green-600",
  },
  {
    number: "50+",
    label: "Merek Motor",
    icon: <Wrench className="h-8 w-8" />,
    color: "text-purple-600",
  },
  {
    number: "99.5%",
    label: "Rating Positif",
    icon: <Star className="h-8 w-8" />,
    color: "text-orange-600",
  },
];

export const stepsDummy = [
  {
    step: 1,
    title: "Pilih Parts Motor",
    description:
      "Browse katalog lengkap kami dan temukan parts yang Anda butuhkan untuk motor Anda",
    icon: <Package className="h-8 w-8" />,
    color: "bg-blue-600",
  },
  {
    step: 2,
    title: "Chat via WhatsApp",
    description:
      "Hubungi kami melalui WhatsApp untuk konfirmasi stok, harga, dan detail pengiriman",
    icon: <MessageCircle className="h-8 w-8" />,
    color: "bg-green-600",
  },
  {
    step: 3,
    title: "Bayar & Terima",
    description:
      "Lakukan pembayaran dan tunggu parts berkualitas dikirim langsung ke alamat Anda",
    icon: <CreditCard className="h-8 w-8" />,
    color: "bg-purple-600",
  },
];

export const slidesData: ICarouselSlide[] = [
  {
    id: 1,
    title: "Body Parts Motor Terlengkap",
    subtitle: "Kualitas Premium untuk Semua Jenis Motor",
    description:
      "Fairing, cover body, spakbor, hingga aksesoris body motor dengan bahan berkualitas tinggi.",
    image: "/body-hero.png",
    category: "Body Parts",
    price: "Mulai dari Rp 250.000",
    rating: 4.8,
    inStock: true,
  },
  {
    id: 2,
    title: "Fairing & Cover Body",
    subtitle: "Tampilan Sporty & Presisi",
    description:
      "Pilihan fairing dan cover body motor yang pas, rapi, dan bikin motor makin keren.",
    image: "/body-hero.png",
    category: "Fairing",
    price: "Mulai dari Rp 300.000",
    rating: 4.7,
    inStock: true,
  },
  {
    id: 3,
    title: "Spakbor & Aksesoris Body",
    subtitle: "Detail Kecil, Efek Besar",
    description:
      "Spakbor depan & belakang, undercowl, dan aksesoris body lainnya untuk gaya maksimal.",
    image: "/body-hero.png",
    category: "Aksesoris Body",
    price: "Mulai dari Rp 150.000",
    rating: 4.9,
    inStock: true,
  },
];

export const salesData = [
  { month: "Jan", sales: 485000, orders: 156, customers: 89 },
  { month: "Feb", sales: 620000, orders: 198, customers: 112 },
  { month: "Mar", sales: 580000, orders: 185, customers: 98 },
  { month: "Apr", sales: 750000, orders: 245, customers: 145 },
  { month: "May", sales: 690000, orders: 225, customers: 128 },
  { month: "Jun", sales: 820000, orders: 268, customers: 162 },
];

export const productCategoryData = [
  { name: "Fairing", value: 35, sales: 287000 },
  { name: "Tank Cover", value: 25, sales: 205000 },
  { name: "Side Panel", value: 20, sales: 164000 },
  { name: "Tail Fairing", value: 15, sales: 123000 },
  { name: "Others", value: 5, sales: 41000 },
];

export const topProducts = [
  { name: "Ninja 250 Full Set", sold: 45, revenue: 135000 },
  { name: "R15 Racing Fairing", sold: 38, revenue: 114000 },
  { name: "CBR150 Body Kit", sold: 32, revenue: 96000 },
  { name: "GSX Tank Cover", sold: 28, revenue: 84000 },
  { name: "Vixion Side Panel", sold: 25, revenue: 75000 },
];

export const inventoryData = [
  { product: "Fairing", inStock: 125, lowStock: 15, outOfStock: 3 },
  { product: "Tank Cover", inStock: 98, lowStock: 8, outOfStock: 2 },
  { product: "Side Panel", inStock: 156, lowStock: 12, outOfStock: 1 },
  { product: "Tail Fairing", inStock: 89, lowStock: 18, outOfStock: 4 },
];
