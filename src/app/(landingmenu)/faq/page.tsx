import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";

const DynamicBodyFaq = dynamic(() => import("./_clients/components/bodyFaq"), {
  loading: () => <Spinner />,
});
export default function page() {
  return <DynamicBodyFaq />;
}
