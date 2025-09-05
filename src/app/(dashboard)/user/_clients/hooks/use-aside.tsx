import { FaBoxOpen, FaCogs, FaTachometerAlt } from "react-icons/fa";

export const useSideBarHelper = () => {
  const items = [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: FaTachometerAlt,
    },
    {
      title: "Keranjang",
      url: "/user/keranjang",
      icon: FaBoxOpen,
    },
    {
      title: "Pengaturan",
      url: "/user/pengaturan",
      icon: FaCogs,
    },
  ];

  return {
    items,
  };
};
