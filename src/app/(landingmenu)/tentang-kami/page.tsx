import dynamic from "next/dynamic";

const DynamicAboutPage = dynamic(() => import('./_clients/components/bodyTentangKami'), { loading: () => null })
export default function page() {
    return <DynamicAboutPage />
}