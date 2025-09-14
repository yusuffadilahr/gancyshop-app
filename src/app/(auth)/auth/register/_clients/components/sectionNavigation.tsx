import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SectionNavigation() {
  return (
    <section className="flex w-full justify-center items-center flex-col">
      <h1 className="py-2 text-sm text-gray-500">Atau</h1>
      <Link href="/auth/login" className="w-full">
        <Button variant="outline" className="w-full" size="lg">
          Masuk ke Akun
        </Button>
      </Link>
      <p className="mt-3 text-center text-sm text-gray-600">
        Dengan membuat akun, Anda menyetujui{" "}
        <Link href="/terms" className="text-blue-500 underline">
          Syarat & Ketentuan
        </Link>{" "}
        dan{" "}
        <Link href="/privacy" className="text-blue-500 underline">
          Kebijakan Privasi
        </Link>{" "}
        kami.
      </p>
    </section>
  );
}
