export const dynamic = 'force-dynamic'

import CardProductServer from "@/app/_serverside/components/cardProductServer";
import * as React from "react";

import { default as nextDynamic } from "next/dynamic";

const DynamicBodyLanding = nextDynamic(() => import('@/app/_clientside/components/bodyLandingPage'), {
  loading: () => <></>
})

export default function page() {
  return (
    <React.Fragment>
      <DynamicBodyLanding cardProductServer={
        <CardProductServer />
      } />
    </React.Fragment>
  );
}