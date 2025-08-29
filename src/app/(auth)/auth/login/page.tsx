import dynamic from "next/dynamic";
import * as React from "react";

const DynamicBodyLogin = dynamic(() => import('./_clients/components/bodylogin'), {
    loading: () => <></>
})

export default function page() {
    return (
        <React.Fragment>
            <DynamicBodyLogin />
        </React.Fragment>
    );
}