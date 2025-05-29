import dynamic from "next/dynamic";
import * as React from "react";

const DynamicBodySetPassword = dynamic(() => import('./_clientside/components/bodySetPassword'), {
    loading: () => <></>
})

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await params
    return (
        <React.Fragment>
            <DynamicBodySetPassword tokenSlug={slug} />
        </React.Fragment>
    );
}