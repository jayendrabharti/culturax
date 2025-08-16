import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import NextAuthSessionProviders from "@/providers/NextAuthSessionProvider";
import { DataProvider } from "@/providers/DataProvider";

export function generateMetadata(): Metadata {
  return {
    title: `CulturaX.`,
    description:
      "Collision of talent, passion and fun. 10th - 30th September 2025. Mark your calendars!",
    openGraph: {
      title: `CulturaX`,
      description:
        "Collision of talent, passion and fun. 10th - 30th September 2025. Mark your calendars!",
      url: "https://www.culturax.iqlipse.space",
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
        <NextAuthSessionProviders>
          <DataProvider>
            <ThemeProvider>
              {children}
              <Toaster richColors />
            </ThemeProvider>
          </DataProvider>
        </NextAuthSessionProviders>
      </body>
    </html>
  );
}
