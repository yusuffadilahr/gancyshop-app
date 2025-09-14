"use client";

import * as React from "react";
import SectionCardPlatform from "./sectionCardPlatform";
import SectionCarousell from "@/app/_clients/components/sectionCarousell";
import SectionCallToAction from "./sectionCallToAction";
import SectionProduct from "./sectionProduct";
import dynamic from "next/dynamic";
import { Spinner } from "@/components/ui/spinner";
import SectionWhyChooseUs from "./sectionWhyUs";
import SectionBusinessStats from "./sectionStatBusiness";
import SectionHowToOrder from "./sectionHowToOrder";

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
    <div className="pb-20 md:px-4 min-h-screen h-fit space-y-0">
      <DynamicFirstVisitModal
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
      />

      <SectionCarousell />
      <SectionWhyChooseUs />
      <SectionCardPlatform />
      <SectionProduct />
      <SectionBusinessStats />
      <SectionHowToOrder />
      <SectionCallToAction />
    </div>
  );
}
