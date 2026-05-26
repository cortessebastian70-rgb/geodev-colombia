import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout({ children, hideFooter }: { children: ReactNode; hideFooter?: boolean }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B1E2D] text-white">
      <Navbar />
      <main className="flex-1 pt-[70px]">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
