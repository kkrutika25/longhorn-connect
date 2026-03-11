import Link from "next/link";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/ask", label: "Ask AI" },
  { href: "/ambassadors", label: "Ambassadors" },
  { href: "/messages", label: "Messages" },
  { href: "/dashboard", label: "Student" },
  { href: "/ambassador", label: "Ambassador" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-[#f7f4ef]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-burnt-500 text-sm font-bold text-white">
            UT
          </span>
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-burnt-700">LonghornConnect</p>
            <p className="text-xs text-slate-500">UT Austin guidance and mentorship</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-burnt-700">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button href="/ambassadors" variant="secondary">
            Find an Ambassador
          </Button>
        </div>
      </div>
    </header>
  );
}
