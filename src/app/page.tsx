export const dynamic = 'force-dynamic'

import SectionProductServer from "@/app/_serverside/components/sectionProductServer";
import * as React from "react";

import { default as nextDynamic } from "next/dynamic";
import { Spinner } from "@/components/ui/spinner";

const DynamicBodyLanding = nextDynamic(() => import('@/app/_clientside/components/bodyLandingPage'), {
  loading: () => <Spinner />
})

export default function page() {
  return (
    <React.Fragment>
      <DynamicBodyLanding sectionProductServer={
        <SectionProductServer />
      } />
    </React.Fragment>
  );
}