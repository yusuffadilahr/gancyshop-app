import { Star, Users, Package, Wrench } from "lucide-react";

// Section Business Stats
export default function SectionBusinessStats() {
  const stats = [
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

  return (
    <section className="py-16 rounded-2xl bg-red-600 mx-2 md:mx-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          {/* <Badge
            variant="outline"
            className="mb-10 px-4 py-2 text-white border-white/20"
          >
            Pencapaian Kami
          </Badge> */}
          <h2 className="text-4xl font-bold text-white mb-4">
            Dipercaya Ribuan{" "}
            <span className="text-white px-4 rounded-2xl py-2 bg-orange-500/85">
              Customer
            </span>
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Angka-angka yang membuktikan komitmen kami dalam memberikan
            pelayanan terbaik
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div
                className={`${stat.color} mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <span className="bg-white rounded-full w-fit p-3">
                  {stat.icon}
                </span>
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <p className="text-white font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
