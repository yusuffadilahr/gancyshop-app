"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { IProductPublic } from "@/app/(landingmenu)/product/_clientside/types"

export default function BodyProduct({ products }: { products: IProductPublic[] }) {
    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Management Product</h1>
                <Button variant="secondary">Add Product</Button>
            </div>

            <div className="flex items-center gap-4">
                <Tabs defaultValue="all" className="space-y-0">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="non-active">Non Active</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="ml-auto flex items-center gap-2">
                    <Button variant="outline">Table</Button>
                    <Button variant="outline">Columns</Button>
                    <Button variant="outline">Filter</Button>
                    <Input placeholder="Search Product" className="w-[200px]" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                        <CardHeader className="p-0 relative h-72 w-full">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover w-full h-full"
                            />
                        </CardHeader>
                        <CardContent className="p-4">
                            <h3 className="text-sm font-semibold leading-tight">
                                {product.name}
                            </h3>
                            <p className="text-xs text-muted-foreground mb-1">
                                {product.category.name}
                            </p>
                            <p className="text-base font-bold text-slate-800">
                                {product.price}
                            </p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex items-center justify-end text-sm text-muted-foreground">
                            {product.price}
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="flex justify-end items-center gap-2 pt-4">
                <Button variant="ghost" size="sm">Prev</Button>
                {[1, 2, 3, 4, 5].map((page) => (
                    <Button key={page} variant={page === 2 ? "default" : "ghost"} size="sm">
                        {page}
                    </Button>
                ))}
                <Button variant="ghost" size="sm">Next</Button>
            </div>
        </div>
    )
}