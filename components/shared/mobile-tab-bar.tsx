import Link from "next/link";

const tabs = [
  { href: "/ask", label: "Ask AI" },
  { href: "/ambassadors", label: "Ambassadors" },
  { href: "/messages", label: "Messages" },
  { href: "/dashboard", label: "Student" },
  { href: "/ambassador", label: "Ambassador" }
];

export function MobileTabBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 py-2 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-5 gap-1 text-center text-[11px] font-medium text-slate-600">
        {tabs.map((tab) => (
          <Link key={tab.href} href={tab.href} className="rounded-2xl px-2 py-3 transition hover:bg-slate-100">
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
