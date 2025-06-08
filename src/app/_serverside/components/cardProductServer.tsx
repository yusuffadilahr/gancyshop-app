import CardProduct from "@/app/_clientside/components/cardProduct";
import { getAllDataProductPublic } from "@/app/_serverside/action";
import { Spinner } from "@/components/ui/spinner";
import * as React from 'react'

export default async function CardProductServer() {
    const res = await getAllDataProductPublic()

    return (
        <React.Suspense fallback={
            <div className="w-full justify-center items-center">
                <Spinner />
            </div>
        }>
            <CardProduct dataProduct={res?.data || []} />
        </React.Suspense>
    );
}