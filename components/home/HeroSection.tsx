"use client";

import { Playwrite_AU_QLD } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import Reveal from "../animations/Reveal";
import { RainbowButton } from "../magicui/rainbow-button";
import { ArrowRightIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import HeroImages from "./HeroImages";

const font = Playwrite_AU_QLD();

export default function HeroSection() {
  const { theme } = useTheme();
  const isDarkMode: boolean = theme === "dark";

  return (
    <section
      className={cn(
        "min-h-[calc(100vh-70px)] w-full flex flex-col items-center justify-between py-8"
      )}
    >
      <Reveal
        delay={0}
        className="grid grid-cols-4 gap-3 place-content-center place-items-center w-full"
      >
        <div>
          <Link
            href={"https://www.instagram.com/deptofstudentorganization/?hl=en"}
            target={"_blank"}
          >
            <Image
              suppressHydrationWarning
              src={
                isDarkMode
                  ? "/images/dso_white_logo.png"
                  : "/images/dso_black_logo.png"
              }
              alt={"DSO Logo"}
              className={""}
              priority
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div>
          <Link
            href={"https://www.linkedin.com/company/loovert"}
            target={"_blank"}
          >
            <Image
              suppressHydrationWarning
              src={
                isDarkMode
                  ? "/images/loovert_white_logo.png"
                  : "/images/loovert_black_logo.png"
              }
              alt={"Loovert Logo"}
              className={""}
              priority
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div>
          <Link href={"https://iqlipse.space"} target={"_blank"}>
            <Image
              src={"/images/iqlipse_logo.png"}
              alt={"Iqlipse Logo"}
              className={""}
              priority
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div>
          <Link
            href={"https://www.linkedin.com/company/collegeye/"}
            target={"_blank"}
          >
            <Image
              suppressHydrationWarning
              src={
                isDarkMode
                  ? "/images/collegeeye_white_logo.png"
                  : "/images/collegeeye_black_logo.png"
              }
              alt={"CollegeEye Logo"}
              className={""}
              priority
              width={100}
              height={100}
            />
          </Link>
        </div>
      </Reveal>

      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10 w-full px-5 max-w-7xl mx-auto">
        {/* Hero Images Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-2xl mx-auto p-2 md:p-4">
            <HeroImages className="w-full" />
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center">
          <Reveal delay={0.1} className="mb-10">
            <Link href={"/events"}>
              <RainbowButton
                className="rounded-full px-5 py-0"
                size={"sm"}
                variant={"outline"}
              >
                Explore Events
                <ArrowRightIcon className="transition-all duration-150 group-hover:ml-2" />
              </RainbowButton>
            </Link>
          </Reveal>

          <Reveal delay={0.2} className="w-full">
            <Image
              suppressHydrationWarning
              src={
                isDarkMode
                  ? "/images/fest_white_logo.png"
                  : "/images/fest_black_logo.png"
              }
              alt={"Fest Logo"}
              className={"w-full px-10 mx-auto max-w-3xl"}
              priority
              width={500}
              height={500}
            />
          </Reveal>

          <Reveal
            delay={0.3}
            className={cn(
              "font-extralight text-base md:text-lg lg:text-2xl",
              font.className
            )}
          >
            Collision of talent, passion and fun.
          </Reveal>

          <Reveal
            delay={0.4}
            className="font-bold text-base md:text-2xl lg:text-4xl my-10"
          >
            From 10<sup>th</sup> to 30<sup>th</sup> September 2025
          </Reveal>

          <Reveal delay={0.5}>
            <div className="flex flex-row flex-wrap justify-center gap-4">
              <Link href={"/events"}>
                <Button>
                  Register Now
                  <ArrowRightIcon />
                </Button>
              </Link>
              <Link href={"/contact"}>
                <Button variant={"outline"}>
                  Contact Us
                  <PhoneIcon />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* moved above for better layout */}
      </div>

      <div></div>
    </section>
  );
}
