"use client";
import * as React from "react";
import SectionCardPlatform from "./sectionCardPlatform";
import SectionCarousell from "@/app/_clients/components/sectionCarousell";
import SectionCallToAction from "./sectionCallToAction";
import SectionProduct from "./sectionProduct";
import { dummyData } from "@/app/_servers/utils/dummyData";

export default function BodyLanding() {
  React.useEffect(() => {
    console.log("Welcome, Diddy!");
  }, []);

  return (
    <div className="pb-20 md:px-4 min-h-screen h-fit space-y-4">
      <SectionCarousell />

      <SectionProduct dataProduct={dummyData} />
      <SectionCardPlatform />
      <SectionCallToAction />
    </div>
  );
}
