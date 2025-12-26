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
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { IAppSideBarProps } from "../types";
import { ChevronRight, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

export function AppSidebar({ dataProfil, dataMenu, role }: IAppSideBarProps) {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-4">
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-5 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-white p-0.5 shadow-md">
                <Image
                  src={"/login-left-section.png"}
                  alt="profile"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-white font-bold text-sm truncate">
                {dataProfil?.fullname ?? "Admin"}
              </h1>
              <p className="text-red-100 text-xs font-medium">{role}</p>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {dataMenu.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`
                        relative group transition-all duration-200
                        ${
                          isActive
                            ? "bg-red-50 text-red-600 font-semibold hover:bg-red-100"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }
                      `}
                    >
                      <Link
                        href={item?.url}
                        prefetch={false}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
                      >
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-600 rounded-r-full"></div>
                        )}

                        <div
                          className={`
                          flex-shrink-0 w-5 h-5
                          ${
                            isActive
                              ? "text-red-600"
                              : "text-gray-500 group-hover:text-gray-700"
                          }
                        `}
                        >
                          <item.icon className="w-5 h-5" />
                        </div>

                        <span className="flex-1 text-sm">{item?.title}</span>
                        <ChevronRight
                          className={`
                          w-4 h-4 transition-transform duration-200
                          ${
                            isActive
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                          }
                        `}
                        />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer Section */}
      <SidebarFooter className="p-3 border-t border-gray-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
            >
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full">
                <LogOut className="w-5 h-5" />
                <span className="flex-1 text-sm font-medium text-left">
                  Keluar
                </span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="mt-3 px-3 py-2 text-center">
          <p className="text-xs text-gray-400">Version 1.0.0</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
