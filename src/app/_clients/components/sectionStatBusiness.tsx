import { useEffect, useRef, useState } from "react";
import { Package, Users, Award, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function SectionBusinessStats() {
  const stats = [
    {
      icon: Package,
      value: 5000,
      suffix: "+",
      label: "Produk Sparepart",
      description: "Original & Berkualitas",
    },
    {
      icon: Users,
      value: 10000,
      suffix: "+",
      label: "Pelanggan Setia",
      description: "Kepercayaan Terjaga",
    },
    {
      icon: Award,
      value: 5,
      suffix: "+ Tahun",
      label: "Pengalaman",
      description: "Melayani Otomotif",
    },
    {
      icon: TrendingUp,
      value: 98,
      suffix: "%",
      label: "Kepuasan",
      description: "Rating Pelanggan",
    },
  ];

  const [counters, setCounters] = useState(stats.map(() => 0));
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          stats.forEach((stat, index) => {
            let current = 0;
            const increment = stat.value / 50;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.value) {
                current = stat.value;
                clearInterval(timer);
              }
              setCounters((prev) => {
                const newCounters = [...prev];
                newCounters[index] = Math.floor(current);
                return newCounters;
              });
            }, 30);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4">
                    <Icon className="w-7 h-7 text-red-600" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                    {counters[index]}
                    {stat.suffix}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
