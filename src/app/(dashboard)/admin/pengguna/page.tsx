import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";

const DynamicBodyPengguna = dynamic(
  () => import("./_clients/components/bodyPengguna"),
  { loading: () => <Spinner /> }
);
export default function page() {
  return <DynamicBodyPengguna />;
}
