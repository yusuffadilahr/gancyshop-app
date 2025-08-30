import dynamic from "next/dynamic";
import * as React from "react";

const DynamicBodySetPassword = dynamic(() => import('./_clients/components/bodySetPassword'), {
    loading: () => <></>
})

interface IPageProps {
    params: Promise<{ slug: string }>;
}

export default async function Page({ params }: IPageProps) {
    const { slug } = await params
    
    return (
        <React.Fragment>
            <DynamicBodySetPassword tokenSlug={slug} />
        </React.Fragment>
    );
}