"use client";

import { Fragment, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Spinner } from "@/components/ui/spinner";

import SectionCarousell from "@/app/_clients/components/sectionCarousell";
import SectionBusinessStats from "./sectionStatBusiness";
import SectionCardPlatform from "./sectionCardPlatform";
import SectionProduct from "./sectionProduct";
import SectionWhyChooseUs from "./sectionWhyUs";
import SectionHowToOrder from "./sectionHowToOrder";
import SectionCallToAction from "./sectionCallToAction";

const DynamicFirstVisitModal = dynamic(() => import("./firstVisitModal"), {
  loading: () => <Spinner />,
});

export default function BodyLanding() {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    console.log("Welcome, Diddy!");

    const checkCookie = sessionStorage.getItem("_inf");
    if (!checkCookie) setIsOpenDialog(true);
  }, []);

  return (
    <Fragment>
      <DynamicFirstVisitModal
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
      />

      <SectionCarousell />
      <SectionBusinessStats />
      <SectionCardPlatform />
      <SectionProduct />
      <SectionWhyChooseUs />
      <SectionHowToOrder />
      <SectionCallToAction />
    </Fragment>
  );
}
