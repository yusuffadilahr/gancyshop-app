"use client";
import * as React from "react";
import SectionCardPlatform from "./sectionCardPlatform";
import SectionCarousell from "@/app/_clients/components/sectionCarousell";
import SectionCallToAction from "./sectionCallToAction";
import SectionProduct from "./sectionProduct";
import { dummyData } from "@/app/_servers/utils/dummyData";
import dynamic from "next/dynamic";
import { Spinner } from "@/components/ui/spinner";

const DynamicFirstVisitModal = dynamic(() => import("./firstVisitModal"), {
  loading: () => <Spinner />,
});

export default function BodyLanding() {
  const [isOpenDialog, setIsOpenDialog] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log("Welcome, Diddy!");
    const checkCookie = sessionStorage.getItem("_inf");
    if (!checkCookie) setIsOpenDialog(true);
  }, []);

  return (
    <div className="pb-20 md:px-4 min-h-screen h-fit space-y-4">
      <DynamicFirstVisitModal
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
      />

      <SectionCarousell />
      <SectionProduct dataProduct={dummyData} />
      <SectionCardPlatform />
      <SectionCallToAction />
    </div>
  );
}
