import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-300";

const variants = {
  primary: "bg-burnt-500 text-white hover:bg-burnt-700",
  secondary: "bg-white text-ink ring-1 ring-slate-200 hover:bg-slate-50",
  ghost: "bg-transparent text-ink hover:bg-white/70"
};

type Props = {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, variant = "primary", href, ...props }: Props) {
  const styles = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link className={styles} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
