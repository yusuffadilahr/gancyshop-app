import SectionProduct from "@/app/_clientside/components/sectionProduct";
// import { getAllDataProductPublic } from "@/app/_serverside/action";
import { dummyData } from "@/app/_serverside/utils/dummyData";
import { Spinner } from "@/components/ui/spinner";
import * as React from 'react'

export default async function SectionProductServer() {
    // const res = await getAllDataProductPublic()
    // const products = res?.data?.data
    
    return (
        <React.Suspense fallback={
            <div className="w-full justify-center items-center">
                <Spinner />
            </div>
        }>
            <SectionProduct dataProduct={dummyData || []} />
        </React.Suspense>
    );
}