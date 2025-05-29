import { useSideBarHelper } from "@/app/(admin)/admin/_clientside/hooks/use-aside";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link";


export function AppSidebar({ dataProfil }: {
    dataProfil: {
        fullname: string,
        phoneNumber: string,
        email: string
    }
}) {
    const { items } = useSideBarHelper()

    return (
        <Sidebar>
            <div className="p-2">
                <SidebarHeader className="bg-[#f96a32] py-7 rounded-xl flex-wrap">
                    <div className="w-full flex items-center gap-2">
                        <div className="rounded-full w-12 h-12 bg-black">
                            <Image src={'/login-left-section.png'} alt="photos"
                                width={500} height={500} className="w-fit h-12 object-cover rounded-full" />
                        </div>
                        <div className="space-y-0 text-white">
                            <h1 className="text-[14px] font-semibold flex items-center gap-2">{dataProfil?.fullname ?? 'Admin'}</h1>
                            <h1 className="text-xs">Admin</h1>
                        </div>
                    </div>
                </SidebarHeader>
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="pb-5">Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item?.url} className="flex items-center">
                                            <item.icon />
                                            <span>{item?.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
