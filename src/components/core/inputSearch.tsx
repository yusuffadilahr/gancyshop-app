import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ReadonlyURLSearchParams } from "next/navigation";
import * as React from "react";

interface IInputSearchProps
  extends React.ComponentPropsWithoutRef<typeof Input> {
  searchParams?: ReadonlyURLSearchParams;
  loadingSearch: boolean;
  paddingY?: string;
}

export default function InputSearch({
  searchParams,
  loadingSearch,
  paddingY = "py-5",
  ...props
}: IInputSearchProps) {
  return (
    <div className="flex items-center relative w-full">
      <Input
        {...props}
        type="search"
        defaultValue={searchParams?.get("search") || ""}
        placeholder="Cari disini.."
        className={`w-full ${paddingY} rounded-xl ${
          loadingSearch ? "pl-10" : ""
        }`}
      />
      {loadingSearch && <Spinner className="absolute left-2" size={"small"} />}
    </div>
  );
}
