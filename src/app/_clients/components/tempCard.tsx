// "use client"

// import React, { useEffect, useRef, useState, useCallback } from 'react'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { 
//   ChevronLeft, 
//   ChevronRight, 
//   ShoppingCart, 
//   Star, 
//   Wrench, 
//   Shield, 
//   Truck, 
//   Award,
//   Play,
//   Pause,
//   ZapIcon,
//   TrendingUp,
//   Users,
//   CheckCircle2,
//   ArrowRight,
//   Sparkles,
//   Zap
// } from 'lucide-react'
// import Image from 'next/image'

// interface CarouselSlide {
//   id: number
//   title: string
//   subtitle: string
//   description: string
//   image: string
//   category: string
//   price: string
//   originalPrice: string
//   discount: number
//   rating: number
//   reviewCount: number
//   inStock: boolean
//   stockCount: number
//   features: string[]
//   tags: string[]
//   popularity: number
//   isNew?: boolean
//   isBestseller?: boolean
//   videoUrl?: string
// }

// const slides: CarouselSlide[] = [
//   {
//     id: 1,
//     title: "Premium Body Parts",
//     subtitle: "Upgrade Your Ride's Aesthetics",
//     description: "Transform your motorcycle with our premium body parts collection. From sleek fairings to custom tanks, every piece is crafted for perfection and durability.",
//     image: '/body-hero.png',
//     category: "Body Parts",
//     price: "Rp 750.000",
//     originalPrice: "Rp 950.000",
//     discount: 21,
//     rating: 4.9,
//     reviewCount: 2847,
//     inStock: true,
//     stockCount: 156,
//     features: ["Premium ABS Material", "Perfect Fit Guarantee", "UV Resistant Coating", "Easy Installation"],
//     tags: ["Premium", "Durable", "Stylish"],
//     popularity: 95,
//     isBestseller: true,
//     videoUrl: "/demo-video.mp4"
//   },
//   {
//     id: 2,
//     title: "Performance Engine",
//     subtitle: "Unleash Maximum Power",
//     description: "Boost your motorcycle's performance with our high-grade engine components. Engineered for power, built for reliability, designed for champions.",
//     image: '/body-hero.png',
//     category: "Engine",
//     price: "Rp 1.250.000",
//     originalPrice: "Rp 1.500.000",
//     discount: 17,
//     rating: 4.8,
//     reviewCount: 1923,
//     inStock: true,
//     stockCount: 89,
//     features: ["High Performance Boost", "Fuel Efficient", "Extended Warranty", "Professional Installation"],
//     tags: ["Power", "Efficient", "Reliable"],
//     popularity: 88,
//     isNew: true
//   },
//   {
//     id: 3,
//     title: "Smart Electrical",
//     subtitle: "Future-Ready Technology",
//     description: "Experience cutting-edge electrical systems that bring your motorcycle into the digital age. Smart, efficient, and incredibly reliable.",
//     image: '/body-hero.png',
//     category: "Electrical",
//     price: "Rp 450.000",
//     originalPrice: "Rp 600.000",
//     discount: 25,
//     rating: 4.7,
//     reviewCount: 1456,
//     inStock: true,
//     stockCount: 234,
//     features: ["Smart Technology", "Energy Efficient", "Weatherproof Design", "Mobile App Control"],
//     tags: ["Smart", "Modern", "Innovative"],
//     popularity: 92,
//     isNew: true
//   }
// ]

// export default function ProfessionalCarousel() {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true)
//   const [isLoading, setIsLoading] = useState(false)
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const [isHovered, setIsHovered] = useState(false)
//   const [progress, setProgress] = useState(0)
  
//   const carouselRef = useRef<HTMLDivElement>(null)
//   const contentRef = useRef<HTMLDivElement>(null)
//   const imageRef = useRef<HTMLDivElement>(null)
//   const progressRef = useRef<HTMLDivElement>(null)
//   const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
//   const progressInterval = useRef<NodeJS.Timeout | null>(null)

//   // Auto play with progress
//   useEffect(() => {
//     if (isAutoPlaying && !isHovered) {
//       setProgress(0)
//       progressInterval.current = setInterval(() => {
//         setProgress(prev => {
//           if (prev >= 100) {
//             setCurrentSlide(current => (current + 1) % slides.length)
//             return 0
//           }
//           return prev + 2
//         })
//       }, 100)
//     } else {
//       if (progressInterval.current) {
//         clearInterval(progressInterval.current)
//       }
//     }

//     return () => {
//       if (progressInterval.current) {
//         clearInterval(progressInterval.current)
//       }
//     }
//   }, [isAutoPlaying, isHovered])

//   // Mouse tracking for parallax effect
//   const handleMouseMove = useCallback((e: React.MouseEvent) => {
//     if (carouselRef.current) {
//       const rect = carouselRef.current.getBoundingClientRect()
//       const x = (e.clientX - rect.left - rect.width / 2) / rect.width * 100
//       const y = (e.clientY - rect.top - rect.height / 2) / rect.height * 100
//       setMousePosition({ x, y })
//     }
//   }, [])

//   const nextSlide = useCallback(() => {
//     setIsLoading(true)
//     setTimeout(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length)
//       setIsLoading(false)
//       setProgress(0)
//     }, 150)
//   }, [])

//   const prevSlide = useCallback(() => {
//     setIsLoading(true)
//     setTimeout(() => {
//       setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
//       setIsLoading(false)
//       setProgress(0)
//     }, 150)
//   }, [])

//   const goToSlide = useCallback((index: number) => {
//     if (index !== currentSlide) {
//       setIsLoading(true)
//       setTimeout(() => {
//         setCurrentSlide(index)
//         setIsLoading(false)
//         setProgress(0)
//       }, 150)
//     }
//   }, [currentSlide])

//   const currentSlideData = slides[currentSlide]

//   return (
//     <section className="w-full py-4 sm:py-8 px-3 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
//       <div 
//         ref={carouselRef}
//         className="mx-auto"
//         onMouseMove={handleMouseMove}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {/* Main Carousel Container */}
//         <div className="relative bg-white rounded-3xl lg:rounded-[2rem] shadow-2xl shadow-slate-200/50 overflow-hidden group border border-slate-200/50">
          
//           {/* Background Elements */}
//           <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white to-blue-50/40"></div>
//           <div 
//             className="absolute inset-0 opacity-30"
//             style={{
//               backgroundImage: `radial-gradient(circle at ${50 + mousePosition.x * 0.1}% ${50 + mousePosition.y * 0.1}%, rgba(239, 68, 68, 0.1) 0%, transparent 70%)`
//             }}
//           ></div>

//           {/* Progress Bar */}
//           <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200 z-20">
//             <div 
//               ref={progressRef}
//               className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-100 ease-linear"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>

//           <div className="relative z-10 grid lg:grid-cols-12 gap-0 min-h-[65vh] sm:min-h-[70vh] lg:min-h-[75vh]">
            
//             {/* Content Section */}
//             <div 
//               ref={contentRef}
//               className={`lg:col-span-7 flex flex-col justify-center p-6 sm:p-8 lg:p-12 xl:p-16 space-y-4 sm:space-y-6 transition-all duration-700 ${
//                 isLoading ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
//               }`}
//             >
              
//               {/* Header Badges */}
//               <div className="flex flex-wrap items-center gap-2 sm:gap-3">
//                 <Badge 
//                   variant="secondary" 
//                   className="bg-red-100 text-red-700 hover:bg-red-200 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-red-200"
//                 >
//                   <Wrench className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
//                   {currentSlideData.category}
//                 </Badge>
                
//                 {currentSlideData.isBestseller && (
//                   <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 rounded-full border border-amber-200">
//                     <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
//                     Bestseller
//                   </Badge>
//                 )}
                
//                 {currentSlideData.isNew && (
//                   <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 rounded-full border border-emerald-200">
//                     <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
//                     New
//                   </Badge>
//                 )}

//                 {currentSlideData.inStock && (
//                   <Badge className="bg-green-100 text-green-700 hover:bg-green-200 rounded-full border border-green-200">
//                     <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
//                     <span className="hidden sm:inline">Ready Stock</span>
//                     <span className="sm:hidden">Stock</span>
//                   </Badge>
//                 )}

//                 {currentSlideData.discount > 0 && (
//                   <Badge className="bg-red-600 text-white rounded-full animate-pulse">
//                     -{currentSlideData.discount}%
//                   </Badge>
//                 )}
//               </div>

//               {/* Title & Subtitle */}
//               <div>
//                 <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight mb-2 sm:mb-4">
//                   {currentSlideData.title.split(' ').map((word, index) => (
//                     <span key={index} className={index === 1 ? 'text-red-600 bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent' : ''}>
//                       {word}{' '}
//                     </span>
//                   ))}
//                 </h1>
//                 <p className="text-lg sm:text-xl text-slate-600 font-medium">
//                   {currentSlideData.subtitle}
//                 </p>
//               </div>

//               {/* Description */}
//               <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-lg">
//                 {currentSlideData.description}
//               </p>

//               {/* Features */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-lg">
//                 {currentSlideData.features.slice(0, 4).map((feature, index) => (
//                   <div key={index} className="flex items-center space-x-2 text-sm sm:text-base text-slate-700">
//                     <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
//                     <span>{feature}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Stats Row */}
//               <div className="flex flex-wrap items-center gap-4 sm:gap-6 py-3 sm:py-4">
//                 <div className="flex items-center space-x-1">
//                   <div className="flex">
//                     {[...Array(5)].map((_, i) => (
//                       <Star 
//                         key={i} 
//                         className={`w-4 h-4 sm:w-5 sm:h-5 ${
//                           i < Math.floor(currentSlideData.rating) 
//                             ? 'fill-amber-400 text-amber-400' 
//                             : 'fill-slate-200 text-slate-200'
//                         }`} 
//                       />
//                     ))}
//                   </div>
//                   <span className="font-semibold text-slate-900 text-sm sm:text-base">{currentSlideData.rating}</span>
//                   <span className="text-slate-500 text-sm">({currentSlideData.reviewCount.toLocaleString()})</span>
//                 </div>
                
//                 <div className="flex items-center space-x-1 text-sm sm:text-base">
//                   <Users className="w-4 h-4 text-slate-600" />
//                   <span className="text-slate-600">{currentSlideData.popularity}% popularity</span>
//                 </div>

//                 <div className="flex items-center space-x-1 text-sm sm:text-base">
//                   <TrendingUp className="w-4 h-4 text-emerald-600" />
//                   <span className="text-emerald-600 font-medium">{currentSlideData.stockCount} left</span>
//                 </div>
//               </div>

//               {/* Price Section */}
//               <div className="flex flex-wrap items-center gap-3 sm:gap-4">
//                 <div className="flex items-center space-x-2">
//                   <span className="text-2xl sm:text-3xl font-bold text-red-600">
//                     {currentSlideData.price}
//                   </span>
//                   {currentSlideData.originalPrice && (
//                     <span className="text-lg text-slate-400 line-through">
//                       {currentSlideData.originalPrice}
//                     </span>
//                   )}
//                 </div>
//                 {currentSlideData.discount > 0 && (
//                   <Badge className="bg-red-50 text-red-700 text-sm font-bold">
//                     Save {currentSlideData.discount}%
//                   </Badge>
//                 )}
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
//                 <Button 
//                   size="lg" 
//                   className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl group"
//                 >
//                   <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
//                   Add to Cart
//                   <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//                 </Button>
                
//                 <Button 
//                   variant="outline" 
//                   size="lg"
//                   className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold transition-all duration-300 rounded-xl"
//                 >
//                   Quick View
//                 </Button>
//               </div>

//               {/* Trust Indicators */}
//               <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 text-xs sm:text-sm text-slate-600">
//                 <div className="flex items-center space-x-1">
//                   <Shield className="w-4 h-4 text-green-600" />
//                   <span>Warranty</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <Truck className="w-4 h-4 text-blue-600" />
//                   <span>Free Shipping</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <Zap className="w-4 h-4 text-amber-600" />
//                   <span>Fast Delivery</span>
//                 </div>
//               </div>
//             </div>

//             {/* Image Section */}
//             <div 
//               ref={imageRef}
//               className={`lg:col-span-5 relative flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12 transition-all duration-700 ${
//                 isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
//               }`}
//             >
//               <div className="relative w-full h-64 sm:h-80 lg:h-full max-h-[400px] lg:max-h-none">
//                 <div 
//                   className="absolute inset-0 bg-gradient-to-br from-red-100 to-blue-100 rounded-2xl lg:rounded-3xl transition-all duration-700 hover:scale-105"
//                   style={{
//                     transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
//                   }}
//                 >
//                   <Image width={500} height={500}
//                     src={currentSlideData.image}
//                     alt={currentSlideData.title}
//                     className="w-full h-full object-cover rounded-2xl lg:rounded-3xl transition-all duration-700"
//                   />
//                 </div>
                
//                 {/* Floating Elements */}
//                 <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white rounded-2xl p-3 sm:p-4 shadow-xl border border-slate-200">
//                   <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
//                 </div>
                
//                 <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-3 sm:p-4 shadow-xl">
//                   <div className="text-xs sm:text-sm font-bold">{currentSlideData.stockCount}+</div>
//                   <div className="text-xs">In Stock</div>
//                 </div>

//                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg">
//                   <Badge className="bg-emerald-100 text-emerald-800 text-xs">
//                     <TrendingUp className="w-3 h-3 mr-1" />
//                     Top Rated
//                   </Badge>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Navigation Arrows */}
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={prevSlide}
//             className="absolute left-2 sm:left-4 z-20 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white shadow-xl backdrop-blur-sm rounded-full w-10 h-10 sm:w-12 sm:h-12 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-slate-200"
//           >
//             <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
//           </Button>
          
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={nextSlide}
//             className="absolute right-2 sm:right-4 z-20 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white shadow-xl backdrop-blur-sm rounded-full w-10 h-10 sm:w-12 sm:h-12 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-slate-200"
//           >
//             <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
//           </Button>

//           {/* Autoplay Control */}
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setIsAutoPlaying(!isAutoPlaying)}
//             className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm rounded-full w-10 h-10 border border-slate-200 transition-all duration-300"
//           >
//             {isAutoPlaying ? 
//               <Pause className="w-4 h-4 text-slate-700" /> : 
//               <Play className="w-4 h-4 text-slate-700" />
//             }
//           </Button>
//         </div>

//         {/* Bottom Navigation */}
//         <div className="flex items-center justify-between mt-6 sm:mt-8">
          
//           {/* Slide Indicators */}
//           <div className="flex items-center space-x-2 sm:space-x-3">
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`transition-all duration-300 rounded-full border-2 ${
//                   index === currentSlide
//                     ? 'w-8 sm:w-12 h-3 bg-red-600 border-red-600'
//                     : 'w-3 h-3 bg-transparent border-slate-300 hover:border-slate-400'
//                 }`}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>

//           {/* Slide Counter */}
//           <div className="flex items-center space-x-4 text-sm text-slate-600">
//             <span className="font-medium">
//               {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
//             </span>
//             <div className="flex items-center space-x-2">
//               <span className="text-xs">Auto</span>
//               <div className={`w-2 h-2 rounded-full transition-colors ${isAutoPlaying ? 'bg-red-500' : 'bg-slate-400'}`}></div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Info Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
//           <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
//             <div className="flex items-center space-x-3 mb-3">
//               <div className="p-2 bg-red-100 rounded-xl">
//                 <Shield className="w-5 h-5 text-red-600" />
//               </div>
//               <h3 className="font-semibold text-slate-900">Quality Guarantee</h3>
//             </div>
//             <p className="text-sm text-slate-600">All products come with comprehensive warranty and quality assurance.</p>
//           </div>

//           <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
//             <div className="flex items-center space-x-3 mb-3">
//               <div className="p-2 bg-blue-100 rounded-xl">
//                 <Truck className="w-5 h-5 text-blue-600" />
//               </div>
//               <h3 className="font-semibold text-slate-900">Fast Delivery</h3>
//             </div>
//             <p className="text-sm text-slate-600">Express shipping available with same-day delivery in major cities.</p>
//           </div>

//           <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 sm:col-span-2 lg:col-span-1">
//             <div className="flex items-center space-x-3 mb-3">
//               <div className="p-2 bg-emerald-100 rounded-xl">
//                 <Award className="w-5 h-5 text-emerald-600" />
//               </div>
//               <h3 className="font-semibold text-slate-900">Expert Support</h3>
//             </div>
//             <p className="text-sm text-slate-600">Professional installation and technical support from certified technicians.</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }