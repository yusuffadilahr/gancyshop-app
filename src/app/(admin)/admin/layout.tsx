export const dynamic = 'force-dynamic'

// default dari next js layout itu merender static page
// dimana kondisi ini jika ada pemanggilan data melalui sisi server maka akan dibaca oleh next js sepert static site generation
// meskipun cache dalam api call sudah no-store, nextjs tetap menganggap bahwa pemanggilan di sisi server ialah static site
// maka digunakan force-dynamic agar memberitahu layout dari next js bahwa api call ini di panggil secara dinamis
// memaksa layout agar menjadikan halaman layout dirender secara dinamis bukan statis

// kesimpulannya, pemanggilan cookies tidak bisa di halaman statis
// maka dari itu menggunakan force-dynamic untuk menjadikan halaman layout ini menjadi dinamis
// default nextJs layout itu dirender secara server dan statis, maka dari itu akan muncul error bahwa cookie tidak bisa dirender di halaman statis

import SideBarLayout from "@/app/(admin)/admin/_clients/components/sideBarLayout";
import { handleGetDataProfileAdmin } from "@/app/(admin)/admin/_servers/services";
import { cookies } from "next/headers"
import * as React from "react"

export default async function layout({ children }: { children: React.ReactNode }) {
    const token = (await cookies()).get('_token')?.value;
    const result = await handleGetDataProfileAdmin(String(token))

    return (
        <SideBarLayout dataProfil={result?.data}>
            {children}
        </SideBarLayout>
    )
}
