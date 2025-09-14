import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { stepsDummy } from "@/app/_servers/utils/dummyData";

export default function SectionHowToOrder() {
  return (
    <section className="pt-16 bg-white">
      <div className="px-2 md:px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3">
            <div className="border-[1px] border-neutral-200 flex-1 mb-3"></div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-red-600">3 Langkah</span> Memulai Order
            </h2>
            <div className="border-[1px] border-neutral-200 flex-1 mb-3"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Proses pemesanan yang simple dan cepat untuk mendapatkan parts motor
            berkualitas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {stepsDummy.map((step, index) => (
            <div key={index} className="relative">
              {index < stepsDummy.length - 1 && (
                <div className="hidden md:block absolute top-20 left-1/2 w-full h-0.5 bg-gray-200 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              )}

              <Card className="relative z-10 hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500">
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 text-white`}
                  >
                    {step.icon}
                  </div>

                  <Badge variant="outline" className="mb-4">
                    Langkah {step.step}
                  </Badge>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
