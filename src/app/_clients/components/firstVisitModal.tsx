import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { encryptCrypto } from "../utils/cryptoJs";
import { IFirstVisitModalProps } from "../types";

export default function FirstVisitModal({
  isOpenDialog,
  setIsOpenDialog,
}: IFirstVisitModalProps) {
  const handleOpenChange = (open: boolean) => {
    const checked = sessionStorage.getItem("_inf");
    const dataSessionStrg = encryptCrypto({
      val: "done",
      key: process.env.NEXT_PUBLIC_SECRET_KEY || "",
    });

    if (!checked) sessionStorage.setItem("_inf", dataSessionStrg.toString());
    setIsOpenDialog(open);
  };

  return (
    <Dialog open={isOpenDialog} onOpenChange={handleOpenChange}>
      <DialogTitle className="sr-only">x</DialogTitle>
      <DialogContent className="p-0 shadow-none border-none bg-transparent">
        <Card className="relative w-full shadow-none border-none mx-auto p-8 bg-gradient-to-r from-red-500 to-orange-400 rounded-3xl overflow-hidden">
          <div className="absolute -top-[90%] -right-20 w-[1000px] h-[1000px] bg-white/20 rounded-full"></div>
          <div className="absolute -top-[70%] -right-10 w-[800px] h-[800px] bg-white/40 rounded-full"></div>
          <div className="absolute -top-[50%] -right-20 w-[600px] h-[600px] bg-white/50 rounded-full"></div>

          <div className="relative z-10 inset-0 p-2 md:p-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Gancy Motor Parts
            </h1>
            <p className="text-white/90 text-lg mb-8 max-w-md">
              Solusi terpercaya untuk semua kebutuhan{" "}
              <span className="font-extrabold">body kit & sparepart motor</span>{" "}
              berkualitas tinggi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/produk" prefetch={false}>
                <Button size="lg" className="rounded-xl">
                  <span>Pesan Sekarang</span>
                  <ArrowRight />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
