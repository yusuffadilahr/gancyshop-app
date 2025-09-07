import dynamic from "next/dynamic";
import { Spinner } from "@/components/ui/spinner";

const DynamicBodyLanding = dynamic(
  () => import("@/app/_clients/components/bodyLandingPage"),
  {
    loading: () => <Spinner />,
  }
);

export default function page() {
  return <DynamicBodyLanding />;
}
