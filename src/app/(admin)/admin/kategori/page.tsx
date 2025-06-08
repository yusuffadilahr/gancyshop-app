import { default as nextDynamic } from "next/dynamic";

const DynamicBodyKategori = nextDynamic(() => import('./_clientside/components/bodyKategori'), { loading: () => <></> })

export default function page() {
    return (
        <div>
            <DynamicBodyKategori />
        </div>
    );
}