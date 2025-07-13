import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import * as React from "react"

interface ICardProductProps {
    imageUrl: string
    imageAlt: string
    productName: string
    categoryName: string
    productPrice: number
    productStock: number
    productWeight: number
    productCreatedAt: string | Date
    productIsActive: boolean
    customButton?: React.ReactNode
}

export default function CardProduct({
    categoryName, imageUrl,
    productCreatedAt, productIsActive,
    productName, productPrice, productStock,
    productWeight, imageAlt, customButton
}: ICardProductProps) {
    return (
        <Card className="overflow-hidden flex flex-col h-fit">
            <CardHeader className="p-0 relative h-60 w-full">
                <Image src={imageUrl} alt={imageAlt}
                    fill className="object-cover w-full h-full" />

                {!productIsActive && (
                    <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                        Tidak Aktif
                    </span>
                )}
            </CardHeader>

            <CardContent className="p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-sm font-semibold leading-tight line-clamp-1">
                        {productName}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                        {categoryName}
                    </p>
                </div>
                <div className="mt-2 space-y-1">
                    <p className="text-base font-bold text-slate-800">
                        Rp{productPrice?.toLocaleString("id-ID")}
                    </p>
                    <p className="text-xs text-gray-600">Stok: {productStock}</p>
                    <p className="text-xs text-gray-600">Gramasi Pengiriman: {productWeight} kilogram</p>
                    <p className="text-[10px] text-gray-400">
                        Dibuat: {new Date(productCreatedAt).toLocaleDateString("id-ID")}
                    </p>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <span className={`text-sm font-medium ${productStock > 0 ? "text-green-600" : "text-red-500"}`}>
                    {productStock > 0 ? 'Tersedia' : 'Stok Habis'}
                </span>
                {!customButton ? (
                    <Button variant='default' size="sm" className="bg-red-500 hover:bg-red-400 text-white"
                        disabled={!productIsActive || productStock === 0}>
                        Beli
                    </Button>
                ) : <>{customButton}</>}
            </CardFooter>
        </Card>
    );
}