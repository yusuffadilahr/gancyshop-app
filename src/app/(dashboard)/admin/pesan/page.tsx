import dynamic from "next/dynamic";

const DynamicBodyPesan = dynamic(() => import("./_clients/bodyPesan"), {
  loading: () => null,
});

export default function page() {
  return <DynamicBodyPesan />;
}
