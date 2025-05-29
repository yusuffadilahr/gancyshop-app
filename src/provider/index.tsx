'use client'

import { Provider } from "react-redux";
import * as React from "react";
import store from "@/redux/store";
import TanstackProvider from "@/provider/tanstackProvider";

export default function RootProvider({ children }: { children: React.ReactNode }) {
    return (
        <React.Fragment>
            <TanstackProvider>
                <Provider store={store}>
                    {children}
                </Provider>
            </TanstackProvider>
        </React.Fragment>
    );
}