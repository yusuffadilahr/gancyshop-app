"use client";

import { useAppSelector } from "@/redux/store";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { FaTiktok } from "react-icons/fa";
import { SiShopee } from "react-icons/si";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { postEmailSubcription } from "@/app/_servers/services";
import Cookies from "js-cookie";
import { toast } from "@/hooks/use-toast";

export function Footer() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [emailSub, setEmailSub] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<string | undefined>("");

  const pathname = usePathname();
  const isNotFound = useAppSelector((state) => state.globaltheme.notFoundPage);

  useEffect(() => {
    const isLogin = Cookies.get("_loggedIn") || undefined;
    setIsLoggedIn(isLogin);
    setMounted(true);
  }, []);

  const dashboardPathUser = ["dashboard", "keranjang", "pengaturan"];
  const dashboardPath = pathname.split("/").slice(2).join("");

  const isDashboard = dashboardPathUser.includes(dashboardPath);
  const { mutate: handleSubcription, isPending } = useMutation({
    mutationFn: async () => {
      const fd = new FormData();
      fd.append("email", emailSub);

      const res = await postEmailSubcription(fd);
      return res;
    },

    onSuccess: (res) => {
      if (res.error) throw res;

      toast({
        title: res?.message || "Berhasil Mengirim Email",
        description: new Date().toDateString(),
      });
    },

    onError: (err) => {
      if ("message" in err) {
        toast({
          title: err?.message || "Gagal Mengirim Email",
          description: new Date().toDateString(),
        });
      } else {
        toast({
          description: new Date().toDateString(),
          title: "Gagal Mengirim Email",
        });
      }
    },
  });

  if (!mounted) return null;
  if (
    (!isNotFound && pathname.startsWith("/admin")) ||
    isNotFound ||
    isDashboard
  )
    return null;

  return (
    <footer className="bg-white text-slate-800 border-t px-2 md:px-0 border-slate-200">
      <div className="w-full flex flex-col items-center py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1">
            <h2 className="text-xl font-bold text-red-600 mb-1">
              Stay informed
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              Sign up for our newsletter.
            </p>
            <div className="flex items-center gap-2">
              <Input
                onChange={(e) => {
                  const { value } = e.target;
                  setEmailSub(value);
                }}
                value={emailSub}
                name="emailSub"
                placeholder="Your Email Address"
                className="bg-slate-100 text-slate-800"
              />
              <Button
                onClick={() => handleSubcription()}
                variant="secondary"
                className="bg-red-500 hover:bg-red-400 text-white"
                disabled={!isLoggedIn || isPending}
              >
                Subscribe →
              </Button>
            </div>
          </div>

          <div className="text-sm space-y-2">
            <h4 className="font-semibold">Explore</h4>
            <p className="text-slate-600">
              <strong>Stories:</strong> Discover what makes us unique.
            </p>
            <p className="text-slate-600">
              <strong>Events:</strong> Turn empathy into action.
            </p>
            <p className="text-slate-600">
              <strong>Where to Give:</strong> Make a difference.
            </p>
            <p className="text-slate-600">
              <strong>How to Give:</strong> Your impact. Your way.
            </p>
          </div>

          <div className="text-sm space-y-2">
            <h4 className="font-semibold">About</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/tentang-kami" className="hover:text-red-600">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="hover:text-red-600">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="hover:text-red-600">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="hover:text-red-600">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-sm space-y-2">
            <h4 className="font-semibold text-red-600">Privacy & Security</h4>
            <ul className="space-y-1">
              <li>
                <Link href="#" className="hover:text-red-600">
                  Pledge to Donors
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  Social Media Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600">
                  Copyright Notice
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-slate-200" />

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-2">
          <p>
            &copy; {new Date().getFullYear()} Gancy Motor Parts. All rights
            reserved.
          </p>
          <div className="flex gap-4 text-red-600">
            <Link href="https://shopee.co.id/gancyshop" target="_blank">
              <SiShopee size={18} />
            </Link>
            <Link href="https://www.tiktok.com/@gancyshop" target="_blank">
              <FaTiktok size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
