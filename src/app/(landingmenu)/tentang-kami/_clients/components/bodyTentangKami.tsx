'use client';
import React, { JSX } from 'react'
import Image from 'next/image'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Trophy,
    Users,
    Shield,
    Clock,
    Star,
    Wrench,
    Target,
    Heart,
    Award,
    CheckCircle,
    Globe,
    PhoneCall,
    ArrowRight,
} from 'lucide-react';

interface StatisticProps {
    icon: React.ElementType
    value: string
    label: string
    description: string
}

interface ValueCardProps {
    icon: React.ElementType
    title: string
    description: string
    features: string[]
}

interface TimelineItemProps {
    year: string
    title: string
    description: string
    milestone: string
}

const Statistics: React.FC<StatisticProps> = ({ icon: Icon, value, label, description }) => (
    <div className="text-center group hover:scale-105 transition-all duration-300">
        <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                <Icon className="w-8 h-8 text-white" />
            </div>
        </div>
        <div className="text-3xl font-bold text-foreground mb-2">{value}</div>
        <div className="font-semibold text-lg text-foreground mb-1">{label}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
    </div>
)

const ValueCard: React.FC<ValueCardProps> = ({ icon: Icon, title, description, features }) => (
    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 group hover:-translate-y-1">
        <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
            <div className="space-y-3">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, description, milestone }) => (
    <div className="relative flex gap-6 pb-8 group">
        <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                {year}
            </div>
            <div className="w-px h-full bg-gradient-to-b from-blue-500 to-transparent mt-4"></div>
        </div>
        <div className="flex-1 pb-8">
            <Badge variant="secondary" className="mb-2 group-hover:bg-blue-100 transition-colors duration-300">{milestone}</Badge>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
    </div>
)

export default function AboutPage(): JSX.Element {
    const statistics = [
        {
            icon: Users,
            value: "10K+",
            label: "Pelanggan Setia",
            description: "Dipercaya ribuan pengendara di seluruh Indonesia"
        },
        {
            icon: Award,
            value: "4+",
            label: "Tahun Pengalaman",
            description: "Melayani dengan dedikasi sejak 2020"
        },
        {
            icon: Star,
            value: "4.9",
            label: "Rating Pelanggan",
            description: "Kepuasan pelanggan adalah prioritas utama"
        },
        {
            icon: Globe,
            value: "50+",
            label: "Kota Terlayani",
            description: "Jangkauan pengiriman ke seluruh Indonesia"
        }
    ]

    const values = [
        {
            icon: Shield,
            title: "Kualitas Premium",
            description: "Setiap spare part melalui kontrol kualitas ketat dengan standar internasional untuk memastikan performa optimal kendaraan Anda.",
            features: [
                "Spare part original dan aftermarket berkualitas",
                "Garansi resmi untuk setiap produk",
                "Sertifikasi ISO dan SNI",
                "Testing quality control menyeluruh"
            ]
        },
        {
            icon: Clock,
            title: "Pelayanan Ekspres",
            description: "Komitmen kami adalah memberikan pelayanan yang cepat, responsif, dan profesional untuk semua kebutuhan Anda.",
            features: [
                "Respons customer service < 5 menit",
                "Proses pesanan same day",
                "Pengiriman ekspres ke seluruh Indonesia",
                "Real-time tracking & update status"
            ]
        },
        {
            icon: Wrench,
            title: "Variasi Komprehensif",
            description: "Koleksi lengkap spare part motor dari berbagai brand ternama dengan stok yang selalu tersedia untuk kebutuhan Anda.",
            features: [
                "10.000+ SKU spare part tersedia",
                "Kompatibel untuk 200+ model motor",
                "Stok realtime dan selalu update",
                "Import direct dari manufacturer"
            ]
        }
    ]

    const timeline = [
        {
            year: "2020",
            title: "Pendirian GancyShop",
            description: "Memulai perjalanan sebagai toko spare part motor dengan fokus pada kualitas dan kepuasan pelanggan. Dimulai dari toko offline kecil dengan visi besar.",
            milestone: "Founding"
        },
        {
            year: "2021",
            title: "Ekspansi Digital",
            description: "Meluncurkan platform e-commerce dan sistem manajemen inventory modern. Mulai melayani pelanggan dari berbagai daerah melalui marketplace.",
            milestone: "Digital Growth"
        },
        {
            year: "2022",
            title: "Jaringan Distribusi",
            description: "Membangun kerjasama dengan supplier resmi dan mengembangkan jaringan distribusi ke seluruh Indonesia dengan sistem logistik yang terintegrasi.",
            milestone: "Network Expansion"
        },
        {
            year: "2023",
            title: "Sertifikasi Kualitas",
            description: "Meraih sertifikasi ISO 9001:2015 dan menjadi authorized dealer untuk beberapa brand ternama. Menerapkan system quality management yang ketat.",
            milestone: "Quality Excellence"
        },
        {
            year: "2024",
            title: "Inovasi & Teknologi",
            description: "Mengimplementasikan teknologi AI untuk inventory management dan customer service. Meluncurkan aplikasi mobile dan sistem B2B untuk dealer.",
            milestone: "Tech Innovation"
        }
    ]

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="relative container mx-auto px-4 py-2 lg:py-5">
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <Badge variant="outline" className="mb-6 text-sm font-medium animate-pulse">
                            Terpercaya Sejak 2020
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
                            Tentang{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                GancyShop
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
                            Partner terpercaya untuk semua kebutuhan spare part motor Anda. Dengan pengalaman lebih dari 4 tahun,
                            kami telah melayani ribuan pelanggan di seluruh Indonesia dengan komitmen kualitas dan pelayanan terbaik.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-300">
                                <PhoneCall className="mr-2 h-4 w-4" />
                                Hubungi Kami
                            </Button>
                            <Button variant="outline" size="lg" className="hover:scale-105 transition-all duration-300 group">
                                Lihat Katalog
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative px-20 mx-auto">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                            <Image
                                src="/matic.png"
                                alt="GancyShop - Spare Part Motor Terpercaya"
                                width={1200}
                                height={600}
                                className="w-full h-auto hover:scale-105 transition-transform duration-700"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            <div className="absolute bottom-6 right-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 transition-transform duration-300">
                                    <Wrench className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {statistics.map((stat, index) => (
                            <Statistics key={index} {...stat} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 px-20 items-center">
                        <div className="space-y-8">
                            <div>
                                <Badge variant="outline" className="mb-4 hover:bg-blue-50 transition-colors duration-300">
                                    <Target className="mr-2 h-3 w-3" />
                                    Visi & Misi
                                </Badge>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                    Membangun Ekosistem Otomotif yang{" "}
                                    <span className="text-blue-600">Berkelanjutan</span>
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                    GancyShop didirikan dengan visi menjadi market leader dalam industri spare part motor di Indonesia.
                                    Kami percaya bahwa kualitas produk dan pelayanan yang excellent adalah kunci untuk membangun
                                    kepercayaan dan loyalitas pelanggan jangka panjang.
                                </p>
                            </div>

                            <div className="grid gap-6">
                                <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300 group">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg mb-2">Visi Kami</h3>
                                                <p className="text-muted-foreground">
                                                    Menjadi platform spare part motor #1 di Indonesia yang dikenal karena kualitas,
                                                    inovasi, dan customer experience yang luar biasa.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-300 group">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg mb-2">Misi Kami</h3>
                                                <p className="text-muted-foreground">
                                                    Menyediakan spare part berkualitas tinggi dengan harga kompetitif, didukung layanan
                                                    pelanggan yang responsive dan sistem distribusi yang reliable.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="relative">
                            <Image
                                src="/body-beat.jpg"
                                alt="Spare Part Motor Berkualitas"
                                width={600}
                                height={800}
                                className="rounded-3xl border-[1px] w-full h-auto hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge variant="outline" className="mb-4 hover:bg-yellow-50 transition-colors duration-300">
                            <Trophy className="mr-2 h-3 w-3" />
                            Nilai-Nilai Kami
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Mengapa Memilih <span className="text-blue-600">GancyShop</span>?
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Komitmen kami terhadap excellence tercermin dalam setiap aspek bisnis,
                            dari pemilihan produk hingga after-sales service yang komprehensif.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <ValueCard key={index} {...value} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge variant="outline" className="mb-4 hover:bg-green-50 transition-colors duration-300">
                            <Clock className="mr-2 h-3 w-3" />
                            Perjalanan Kami
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Journey Menuju <span className="text-blue-600">Excellence</span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Dari startup kecil hingga menjadi pemain utama di industri spare part motor Indonesia.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {timeline.map((item, index) => (
                            <TimelineItem key={index} {...item} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Siap Bergabung dengan Ribuan Pelanggan Setia?
                        </h2>
                        <p className="text-xl opacity-90 mb-8 leading-relaxed">
                            Temukan pengalaman berbelanja spare part motor yang berbeda.
                            Kualitas premium, harga kompetitif, dan pelayanan yang memuaskan.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300">
                                <PhoneCall className="mr-2 h-4 w-4" />
                                Konsultasi Gratis
                            </Button>
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300 group">
                                Lihat Promo Terbaru
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}