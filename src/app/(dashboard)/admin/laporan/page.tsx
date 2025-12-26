import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";

const DynamicBodyLaporan = dynamic(
  () => import("./_clients/components/bodyLaporan"),
  {
    loading: () => <Spinner />,
  }
);

export default function page() {
  return <DynamicBodyLaporan />;
}
