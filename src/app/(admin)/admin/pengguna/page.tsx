import dynamic from "next/dynamic";

const DynamicBodyPengguna = dynamic(() => import('./_clients/components/bodyPengguna'), { loading: () => null })
export default function page() {
    return <DynamicBodyPengguna />
}