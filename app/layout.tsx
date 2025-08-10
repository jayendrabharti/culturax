import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/ThemeProvider";
import NavBar from "@/components/NavBar";
import Main from "@/components/Main";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";

export function generateMetadata(): Metadata {
  return {
    title: `CulturaX.`,
    description:
      "Collision of talent, passion and fun. 10th - 30th September 2025. Mark your calendars!",
    openGraph: {
      title: `CulturaX`,
      description:
        "Collision of talent, passion and fun. 10th - 30th September 2025. Mark your calendars!",
      // url: "",
      siteName: `CulturaX`,
      images: [
        {
          url: "/images/fest_white_logo.png",
          width: 461,
          height: 89,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full overflow-hidden">
      <body className={cn("h-full w-full flex flex-col overflow-hidden")}>
        <ThemeProvider>
          <NavBar />
          <Main
            className={cn(
              "flex w-full flex-col items-center overflow-y-auto overflow-x-hidden flex-1 min-h-0"
            )}
          >
            {children}
            <Footer />
          </Main>
        </ThemeProvider>
      </body>
    </html>
  );
}
