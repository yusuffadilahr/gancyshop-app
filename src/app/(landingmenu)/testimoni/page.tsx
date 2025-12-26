import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";

const DynamicBodyTestimoni = dynamic(
  () => import("./_clients/components/bodyTestimoni"),
  {
    loading: () => <Spinner />,
  }
);

export default function page() {
  return <DynamicBodyTestimoni />;
}
