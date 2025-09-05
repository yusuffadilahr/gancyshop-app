import {
  FaBoxOpen,
  FaCogs,
  FaEnvelope,
  FaTachometerAlt,
  FaTags,
  FaUsers,
} from "react-icons/fa";

export const useSideBarHelper = () => {
  const items = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: FaTachometerAlt,
    },
    {
      title: "Kelola Produk",
      url: "/admin/produk",
      icon: FaBoxOpen,
    },
    {
      title: "Kategori Produk",
      url: "/admin/kategori",
      icon: FaTags,
    },
    {
      title: "Pesan Masuk",
      url: "/admin/pesan",
      icon: FaEnvelope,
    },
    {
      title: "Pengguna",
      url: "/admin/pengguna",
      icon: FaUsers,
    },
    {
      title: "Pengaturan",
      url: "/admin/pengaturan",
      icon: FaCogs,
    },
  ];

  return {
    items,
  };
};
