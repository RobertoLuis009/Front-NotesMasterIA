"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Star, Clock, Network, Sparkles, Plus, type LucideIcon } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { label: "Todas as notas", href: "/notas", icon: BookOpen },
  { label: "Favoritas", href: "/notas/favoritas", icon: Star },
  { label: "Recentes", href: "#", icon: Clock },
  { label: "Grafo", href: "#", icon: Network },
  { label: "Assistente IA", href: "#", icon: Sparkles },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside
      className="flex h-full w-72 flex-col gap-6 rounded-2xl border border-white/6 p-5"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        backdropFilter: "blur(24px) saturate(130%)",
        WebkitBackdropFilter: "blur(24px) saturate(130%)",
        boxShadow: "0 24px 70px -12px #020308",
      }}
    >
      <Link
        href="/notas/nova"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#5566B8] to-[#2E5C82] px-4 py-3 text-sm font-semibold text-[#F6F8FB] shadow-lg shadow-[#3A3F8E]/40 transition-all hover:brightness-110"
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
        Nova nota
      </Link>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className={
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors " +
              (pathname === href
                ? "bg-[#6370CB]/15 text-[#E7EBF1]"
                : "text-[#7D8695] hover:bg-white/5 hover:text-[#E7EBF1]")
            }
          >
            <Icon
              className={"h-5 w-5 " + (pathname === href ? "text-[#6370CB]" : "")}
              strokeWidth={2}
            />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
