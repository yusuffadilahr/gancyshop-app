"use client";

import { usePathname } from "next/navigation";

export default function BodyKontak() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <h1>{pathname} Under Construction</h1>
    </div>
  );
}
