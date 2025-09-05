"use client";

import DashboardContentLayout from "@/app/_clients/components/dashboardContentLayout";
import TitleDashboardSection from "@/components/core/titleDashboard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

export default function BodyPesan() {
  return (
    <DashboardContentLayout>
      <TitleDashboardSection
        description="Kelola Pesan dari Customer"
        titleMenuDashboard="Pesan"
      />

      {/* pesan user */}
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 sm:col-span-4">
          <Card>
            <CardHeader className="z-40">
              <div className="space-y-4">
                <div className="space-y-2 border-b pb-3">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                      <MessageCircle />
                      <h1 className="font-semibold ">Pesan</h1>
                    </div>

                    {/* count pesan user */}
                    <Badge>3</Badge>
                  </div>
                  <p className="text-sm text-neutral-500">
                    Kelola pesan dari user
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex gap-3 items-center">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="flex justify-between w-full items-center">
                  <div className="space-y-0">
                    <h1 className="text-sm font-semibold">Rusnadi</h1>
                    <p className="text-xs text-neutral-500">USER</p>
                  </div>

                  <Badge>1</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 sm:col-span-8">
          <Card>
            <CardHeader>
              <h1>Ini header</h1>
            </CardHeader>
            <CardContent>
              <p>Content</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardContentLayout>
  );
}
