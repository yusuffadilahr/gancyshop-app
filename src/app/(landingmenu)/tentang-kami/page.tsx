import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";

const DynamicAboutPage = dynamic(
  () => import("./_clients/components/bodyTentangKami"),
  { loading: () => <Spinner /> }
);

export default function page() {
  return <DynamicAboutPage />;
}
