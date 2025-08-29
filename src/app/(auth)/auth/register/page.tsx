import dynamic from "next/dynamic"
import * as React from "react"

const DynamicBodyRegister = dynamic(() => import('./_clients/components/bodyRegisterAuth'), {
    loading: () => <></>
})

export default function page() {
    return (
        <React.Fragment>
            <DynamicBodyRegister />
        </React.Fragment>
    );
}