"use client";

import { AnimatePresence, motion, usePresenceData, wrap } from "framer-motion";
import { forwardRef, useState, useEffect } from "react";
import Image from "next/image";
import Reveal from "../animations/Reveal";

const images = [
  {
    src: "/images/hero/img1.png",
    alt: "Image 1",
  },
  {
    src: "/images/hero/img2.png",
    alt: "Image 2",
  },
  {
    src: "/images/hero/img3.png",
    alt: "Image 3",
  },
  {
    src: "/images/hero/img4.png",
    alt: "Image 4",
  },
  {
    src: "/images/hero/img5.png",
    alt: "Image 5",
  },
  {
    src: "/images/hero/img6.png",
    alt: "Image 6",
  },
];

export default function HeroImages({ className = "" }: { className?: string }) {
  const [selectedItem, setSelectedItem] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  function setSlide(newDirection: 1 | -1) {
    const nextItem = wrap(0, images.length, selectedItem + newDirection);
    setSelectedItem(nextItem);
    setDirection(newDirection);
  }

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setSlide(1);
    }, 3000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [selectedItem]);

  return (
    <Reveal
      type={"scaleOut"}
      className={`group flex items-center justify-center gap-4 ${className}`}
    >
      <div className="relative">
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <Slide
            key={selectedItem}
            image={images[selectedItem]}
            direction={direction}
          />
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

const Slide = forwardRef<
  HTMLDivElement,
  { image: { src: string; alt: string }; direction: number }
>(function Slide({ image, direction }, ref) {
  const presenceDirection = usePresenceData() || direction;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: presenceDirection * 300 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.1,
          type: "spring",
          duration: 0.6,
          bounce: 0.3,
        },
      }}
      exit={{ opacity: 0, x: presenceDirection * -300 }}
      className="relative w-80 h-80 rounded-xl overflow-hidden"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-contain"
        priority
      />
    </motion.div>
  );
});
