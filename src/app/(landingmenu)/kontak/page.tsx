import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";

const DynamicBodyKontak = dynamic(
  () => import("./_clients/components/bodyKontak"),
  {
    loading: () => <Spinner />,
  }
);

export default function page() {
  return <DynamicBodyKontak />;
}
