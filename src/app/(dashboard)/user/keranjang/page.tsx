import dynamic from "next/dynamic";

const DynamicBodyKeranjang = dynamic(
  () => import("./_clients/components/bodyKeranjang"),
  {
    loading: () => null,
  }
);
export default function page() {
  return <DynamicBodyKeranjang />;
}
