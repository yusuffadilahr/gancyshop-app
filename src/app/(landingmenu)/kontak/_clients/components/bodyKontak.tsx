"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";

function HeroContact() {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-red-600 to-red-700 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center text-white">
          <Badge className="bg-white/20 text-white hover:bg-white/30 mb-6 backdrop-blur-sm">
            Hubungi Kami
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Ada Pertanyaan? <br />
            <span className="text-red-200">Kami Siap Membantu</span>
          </h1>
          <p className="text-lg lg:text-xl text-red-100 max-w-3xl mx-auto leading-relaxed">
            Tim profesional kami siap memberikan solusi terbaik untuk kebutuhan
            sparepart kendaraan Anda
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactInfoCards() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Telepon",
      content: "+62 888-8888-8888",
      subcontent: "+62 821-8888-8888",
      description: "Senin - Sabtu, 08:00 - 17:00",
      color: "red",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@sparepartotomotif.com",
      subcontent: "support@sparepartotomotif.com",
      description: "Respons dalam 24 jam",
      color: "blue",
    },
    {
      icon: MapPin,
      title: "Alamat",
      content: "Jl. Jalan Raya No. 123",
      subcontent: "Bogor, Jawa Barat 16320",
      description: "Buka Senin - Sabtu",
      color: "green",
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      content: "Senin - Jumat: 08:00 - 17:00",
      subcontent: "Sabtu: 08:00 - 15:00",
      description: "Minggu & Tanggal Merah Tutup",
      color: "purple",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4 group-hover:bg-red-600 transition-colors">
                    <Icon className="w-8 h-8 text-red-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {info.title}
                  </h3>
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    {info.content}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {info.subcontent}
                  </p>
                  <p className="text-xs text-gray-500">{info.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Badge className="bg-red-100 text-red-600 hover:bg-red-200 mb-4">
              Kirim Pesan
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Punya <span className="text-red-600">Pertanyaan?</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Isi formulir di bawah ini dan tim kami akan menghubungi Anda
              sesegera mungkin
            </p>

            {isSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-700 font-medium">
                  Pesan berhasil dikirim! Kami akan menghubungi Anda segera.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-semibold">
                    Nama Lengkap *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Masukkan nama Anda"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-gray-700 font-semibold"
                  >
                    No. Telepon *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="08xx-xxxx-xxxx"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-semibold">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="subject"
                  className="text-gray-700 font-semibold"
                >
                  Subjek *
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Perihal pesan Anda"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <div className="space-y-2">
                <Textarea
                  label="Pesan"
                  id="message"
                  name="message"
                  placeholder="Tuliskan pesan Anda di sini..."
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500 resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Kirim Pesan
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-red-600" />
                  Kontak Cepat
                </h3>
                <div className="space-y-4">
                  <Link
                    target="_blank"
                    href="tel:+6281234567890"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
                      <Phone className="w-5 h-5 text-red-600 group-hover:text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Telepon</div>
                      <div className="font-semibold text-gray-900">
                        +62 888-8888-8888
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="mailto:info@sparepartotomotif.com"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
                      <Mail className="w-5 h-5 text-red-600 group-hover:text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-semibold text-gray-900">
                        info@sparepartotomotif.com
                      </div>
                    </div>
                  </Link>

                  <div className="flex items-center gap-3 p-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Jam Kerja</div>
                      <div className="font-semibold text-gray-900">
                        Sen - Sab, 08:00 - 17:00
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Ikuti Kami
                </h3>
                <div className="flex gap-3">
                  <Link
                    href="#"
                    className="w-12 h-12 bg-red-100 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors group"
                  >
                    <Instagram className="w-5 h-5 text-red-600 group-hover:text-white" />
                  </Link>

                  <Link
                    href="#"
                    className="w-12 h-12 bg-red-100 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors group"
                  >
                    <Facebook className="w-5 h-5 text-red-600 group-hover:text-white" />
                  </Link>

                  <Link
                    href="#"
                    className="w-12 h-12 bg-red-100 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors group"
                  >
                    <Youtube className="w-5 h-5 text-red-600 group-hover:text-white" />
                  </Link>

                  <Link
                    href="#"
                    className="w-12 h-12 bg-red-100 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors group"
                  >
                    <Linkedin className="w-5 h-5 text-red-600 group-hover:text-white" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "Bagaimana cara memesan sparepart?",
      answer:
        "Anda bisa memesan melalui website, telepon, atau datang langsung ke toko kami. Tim kami siap membantu Anda memilih produk yang tepat.",
    },
    {
      question: "Apakah semua produk original?",
      answer: "Tidak, kami hanya menjual sparepart 100% buatan lokal.",
    },
    {
      question: "Berapa lama waktu pengiriman?",
      answer:
        "Untuk area Jakarta 1-2 hari kerja, luar Jakarta 2-4 hari kerja tergantung lokasi. Pengiriman gratis untuk pembelian di atas Rp 500.000.",
    },
    {
      question: "Apakah bisa konsultasi gratis?",
      answer:
        "Tentu! Tim ahli kami siap memberikan konsultasi gratis untuk membantu Anda memilih sparepart yang sesuai dengan kendaraan Anda.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="bg-red-100 text-red-600 hover:bg-red-200 mb-4">
            FAQ
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Pertanyaan yang Sering{" "}
            <span className="text-red-600">Diajukan</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="border-none shadow-md hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-0">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full text-left p-6 flex items-center justify-between"
                >
                  <h3 className="font-bold text-gray-900 pr-8">
                    {faq.question}
                  </h3>
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-4 h-4 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BodyKontak() {
  return (
    <div className="min-h-screen">
      <HeroContact />
      <ContactInfoCards />
      <ContactFormSection />
      <FAQSection />
    </div>
  );
}
