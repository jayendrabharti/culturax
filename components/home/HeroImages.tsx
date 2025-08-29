import { heroImages } from "@/utils/data";
import LogoLoop from "../reactbits/animations/LogoLoop/LogoLoop";

export default function HeroImages({ className = "" }: { className?: string }) {
  return (
    <div
      style={{
        height: "200px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <LogoLoop
        logos={heroImages}
        speed={120}
        direction="left"
        logoHeight={150}
        gap={50}
        pauseOnHover
        fadeOut
      />
    </div>
  );
}
