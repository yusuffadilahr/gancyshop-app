import * as React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <aside className="w-full min-h-screen flex">
            <section className="w-1/5 bg-slate-500 min-h-screen">
                <div className="py-4 min-h-32 flex items-center px-4 bg-yellow-400">
                    <div className="rounded-full w-20 h-20 bg-black"></div>
                </div>
                <div className="px-4">
                    <h1>Menu</h1>
                </div>
            </section>
            <section className="w-4/5 h-full">
                {children}
            </section>
        </aside>
    );
}