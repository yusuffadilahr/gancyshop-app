import { Spinner } from "@/components/ui/spinner";
import { default as nextDynamic } from "next/dynamic";

const DynamicBodyKategori = nextDynamic(
  () => import("./_clients/components/bodyKategori"),
  { loading: () => <Spinner /> }
);

export default function page() {
  return (
    <div>
      <DynamicBodyKategori />
    </div>
  );
}
