import dynamic from "next/dynamic";

const DynamicBodyDashboard = dynamic(
  () => import("./_clients/components/bodyDashboard"),
  {
    loading: () => null,
  }
);
export default function page() {
  return <DynamicBodyDashboard />;
}
