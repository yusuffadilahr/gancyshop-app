import dynamic from "next/dynamic";
const DynamicBodyDashboard = dynamic(()=> import('./_clients/components/bodyAdminDashboard'), {
    loading: ()=> <></>
})

export default function page() {
    return (
        <DynamicBodyDashboard />
    );
}