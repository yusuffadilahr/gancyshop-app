import dynamic from "next/dynamic";
import * as React from "react";

const DynamicBodyProduk = dynamic(() => import('./_clientside/bodyProduk'), {
    loading: () => <></>
})

export default function page() {
    return (
        <React.Fragment>
            <DynamicBodyProduk />
        </React.Fragment>
    );
}