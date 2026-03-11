import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/ask", label: "Ask AI" },
  { href: "/ambassadors", label: "FindAmbassador" },
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
        <div className="hidden items-center gap-3 md:flex">
          <div className="rounded-[24px] border border-slate-200 bg-white/80 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Demo Login</p>
            <div className="mt-2 flex items-center gap-2">
              <Image
                src="https://randomuser.me/api/portraits/women/33.jpg"
                alt="Demo user"
                width={28}
                height={28}
                className="rounded-full border border-slate-200 object-cover"
                unoptimized
              />
              <select
                defaultValue="student"
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 outline-none transition focus:border-burnt-300 focus:ring-2 focus:ring-burnt-100"
              >
                <option value="student">Student</option>
                <option value="ambassador">Ambassador</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
