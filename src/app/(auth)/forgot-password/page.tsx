import dynamic from "next/dynamic";
import * as React from 'react'

const DynamicBodyForgotPassword = dynamic(() => import('./_clients/components/bodyForgotPassword'), {
    loading: () => <></>
})

export default function page() {
    return (
        <React.Fragment>
            <DynamicBodyForgotPassword />
        </React.Fragment>
    );
}