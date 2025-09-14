import { statsDummy } from "@/app/_servers/utils/dummyData";

export default function SectionBusinessStats() {
  return (
    <section className="py-16 rounded-2xl bg-red-600 mx-2 md:mx-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
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
          {statsDummy.map((stat, index) => (
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
