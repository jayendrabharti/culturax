"use client";
import { cn } from "@/lib/utils";
import { appName } from "@/utils/data";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function Logo({
  size = "md",
}: {
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const { theme } = useTheme();
  const isDarkMode: boolean = theme === "dark";

  return (
    <Link href={"/"}>
      <Image
        suppressHydrationWarning
        src={
          isDarkMode
            ? "/images/fest_white_logo.png"
            : "/images/fest_black_logo.png"
        }
        alt={appName}
        className={cn("h-8 w-auto", {
          "h-6": size === "sm",
          "h-8": size === "md",
          "h-10": size === "lg",
          "h-20": size === "xl",
        })}
        priority
        width={100}
        height={100}
      />
    </Link>
  );
}
