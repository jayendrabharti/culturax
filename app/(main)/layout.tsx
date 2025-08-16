import NavBar from "@/components/NavBar";
import Main from "@/components/Main";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <Main
        className={cn(
          "flex w-full flex-col items-center overflow-y-auto overflow-x-hidden flex-1 min-h-0"
        )}
      >
        {children}
        <Footer />
      </Main>
    </>
  );
}
