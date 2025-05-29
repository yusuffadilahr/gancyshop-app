import * as React from "react";

interface ICardAuthLayout {
    children: React.ReactNode
    title: string
    descriptionTitle: string
}

export default function CardAuthLayout({
    children,
    title = 'Sign in to Your Account',
    descriptionTitle = 'Access your dashboard and manage your preferences.'
}: ICardAuthLayout) {
    return (
        <section className="md:w-1/2 w-full px-4 md:px-0 justify-center flex items-center min-h-[80vh] h-fit">
            <div className="min-w-[40vw] border min-h-[20vh] h-fit py-5 px-2 rounded-xl">
                <div className="w-full flex justify-center items-center pb-5 flex-col">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="text-neutral-500 text-center">{descriptionTitle}</p>
                </div>
                {children}
            </div>
        </section>
    );
}