import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TermsAndConditionsPage() {
  return (
    <section className="fixed inset-0 w-screen h-screen m-0 p-0">
      <Image
        src={"/images/fest_black_logo.png"}
        alt="Fest Logo"
        width={200}
        height={100}
        className="absolute bottom-4 left-4 z-10 bg-zinc-400/50 p-5 rounded-3xl"
      />
      <Link href="/">
        <Button className="absolute top-4 right-4 z-10">
          <HomeIcon />
          Go To Homepage
        </Button>
      </Link>
      <iframe
        src="https://merchant.razorpay.com/policy/QG639JCmuZ8ypx"
        title="Terms and Conditions"
        className="w-full h-full border-0"
        style={{ display: "block" }}
      ></iframe>
    </section>
  );
}
