import { ReactNode } from "react";
import { Footer } from "@/components/shared/footer";
import { MobileTabBar } from "@/components/shared/mobile-tab-bar";
import { Navbar } from "@/components/shared/navbar";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f4ef] text-ink">
      <Navbar />
      <main className="pb-24 md:pb-10">{children}</main>
      <Footer />
      <MobileTabBar />
    </div>
  );
}
