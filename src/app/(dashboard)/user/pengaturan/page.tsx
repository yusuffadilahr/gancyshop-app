import dynamic from "next/dynamic";

const DynamicBodyPengaturan = dynamic(
  () => import("./_clients/components/bodyPengaturan"),
  {
    loading: () => null,
  }
);
export default function page() {
  return <DynamicBodyPengaturan />;
}
