import dynamic from "next/dynamic";

const DynamicNotFoundPage = dynamic(
  () => import("./_clients/components/bodyNotFound"),
  { loading: () => null }
);

export default function NotFound() {
  return <DynamicNotFoundPage />;
}
