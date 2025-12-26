import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";
import * as React from "react";

const DynamicBodyLogin = dynamic(
  () => import("./_clients/components/bodyFormLogin"),
  {
    loading: () => <Spinner />,
  }
);

export default function page() {
  return <DynamicBodyLogin />;
}
