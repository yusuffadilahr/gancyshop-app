import dynamic from "next/dynamic";
const DynamicBodyDashboard = dynamic(()=> import('./_clientside/components/bodydashboard'), {
    loading: ()=> <></>
})

export default function page() {
    return (
        <DynamicBodyDashboard />
    );
}