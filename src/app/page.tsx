import dynamic from "next/dynamic";
import * as React from "react";

const DynamicBodyLanding = dynamic(() => import('@/app/_clientside/components/bodyLandingPage'), {
  loading: () => <></>
})

export default function page() {
  return (
    <React.Fragment>
      <DynamicBodyLanding />
    </React.Fragment>
  );
}