import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";
import * as React from "react";

const DynamicBodyProduk = dynamic(
  () => import("./_clients/components/bodyProduct"),
  {
    loading: () => <Spinner />,
  }
);

export default function page() {
  return <DynamicBodyProduk />;
}
