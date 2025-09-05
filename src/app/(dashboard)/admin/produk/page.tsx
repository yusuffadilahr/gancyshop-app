import dynamic from "next/dynamic";
import * as React from "react";

const DynamicBodyProduk = dynamic(() => import('./_clients/components/bodyProduct'), {
    loading: () => <></>
})

export default function page() {
    return <DynamicBodyProduk />
}