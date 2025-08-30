import SectionProduct from "@/app/_clients/components/sectionProduct";
import { dummyData } from "@/app/_servers/utils/dummyData";
import { Spinner } from "@/components/ui/spinner";
import * as React from 'react'

export default async function SectionProductServer() {
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