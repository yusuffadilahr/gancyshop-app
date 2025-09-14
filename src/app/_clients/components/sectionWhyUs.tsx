import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ISectionWhyChooseUsProps } from "../types";
import { featuresDummy } from "@/app/_servers/utils/dummyData";

export default function SectionWhyChooseUs({
  pt = "pt-16",
  dividerBorder = true,
}: ISectionWhyChooseUsProps) {
  return (
    <section className={`px-2 md:px-5 ${pt}`}>
      {/* bg-gradient-to-br from-gray-50 via-white to-red-50 */}
      <div className="w-full">
        <div className="text-center mb-12">
          <Badge variant="destructive" className="mb-4 px-4 py-2">
            Mengapa Pilih Kami?
          </Badge>
          {dividerBorder ? (
            <div className="flex items-center w-full justify-center gap-3">
              <div className="border-[1px] border-neutral-200 flex-1 mb-3"></div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Kepercayaan <span className="text-red-600">1000+</span> Customer
              </h2>
              <div className="border-[1px] border-neutral-200 flex-1 mb-3"></div>
            </div>
          ) : (
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Kepercayaan <span className="text-red-600">1000+</span> Customer
            </h2>
          )}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami berkomitmen memberikan produk berkualitas tinggi dengan
            pelayanan terbaik untuk kepuasan Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresDummy.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-full bg-white shadow-md group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <Badge variant="outline" className="mb-3 text-xs">
                  {feature.highlight}
                </Badge>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
