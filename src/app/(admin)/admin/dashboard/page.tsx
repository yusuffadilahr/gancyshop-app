import dynamic from "next/dynamic";
const DynamicBodyDashboard = dynamic(()=> import('./_clientside/bodydashboard'), {
    loading: ()=> <></>
})

export default function page() {
    return (
        <DynamicBodyDashboard />
    );
}