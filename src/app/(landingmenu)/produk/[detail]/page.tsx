import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";

const DynamicBodyDetailProduct = dynamic(
  () => import("./_clients/components/bodyDetailProduct"),
  {
    loading: () => <Spinner />,
  }
);
export default async function page({
  params,
}: {
  params: Promise<{ detail: string }>;
}) {
  const dataSlug = await params;
  return <DynamicBodyDetailProduct idProduct={dataSlug?.detail || ""} />;
}
