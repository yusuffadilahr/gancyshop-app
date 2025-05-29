import dynamic from "next/dynamic"
import * as React from "react"

const DynamicBodyRegister = dynamic(() => import('./_clientside/components/bodyregister'), {
    loading: () => <></>
})

export default function page() {
    return (
        <React.Fragment>
            <DynamicBodyRegister />
        </React.Fragment>
    );
}