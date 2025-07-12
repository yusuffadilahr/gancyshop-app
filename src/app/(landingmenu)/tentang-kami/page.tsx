// app/about/page.tsx
"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Quote } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="p-6 md:p-12 space-y-12">
            {/* Heading */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">
                    Our Story, Vision, and Values
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Learn about our commitment to excellence, innovation, and the principles that guide our work every day.
                </p>
            </div>

            {/* Hero Image */}
            <div className="relative">
                <Image
                    src="/matic.png" // Ganti dengan image kamu
                    alt="Hero"
                    width={1600}
                    height={600}
                    className="w-full h-auto rounded-[32px]"
                />
                <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-emerald-400 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Quote + About Row */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Quote className="w-8 h-8 text-muted-foreground" />
                    <p className="text-lg leading-relaxed">
                        Our team of experts works tirelessly to bring your vision to life, ensuring every project we undertake not only meets but exceeds expectations. We are dedicated to transforming your ideas into impactful digital experiences that resonate with your audience and drive success.
                    </p>
                    <Image
                        src="/body-beat.jpg"
                        alt="Bottom Spiral"
                        width={600}
                        height={300}
                        className="rounded-[24px] w-full h-auto"
                    />
                </div>

                {/* Right: About Card */}
                <Card className="bg-[#2F3ACB] text-white rounded-[24px] p-6 md:p-10 shadow-md">
                    <CardContent className="p-0 space-y-4">
                        <div className="uppercase text-sm text-emerald-400 font-bold tracking-widest">About Us</div>
                        <p className="text-base leading-relaxed">
                            We believe in the power of collaboration and creativity. By partnering closely with our clients, we gain a deep understanding of their unique needs and goals, allowing us to deliver customized solutions that truly make a difference.
                            Our holistic approach integrates design, technology, and strategy to create seamless and engaging digital experiences.
                        </p>
                        <p className="text-base leading-relaxed">
                            By staying ahead of the curve and embracing the latest trends and technologies, we ensure that we provide cutting-edge solutions that not only address current challenges but also anticipate future opportunities.
                            Let us help you navigate the digital landscape and achieve your business objectives with flair.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
