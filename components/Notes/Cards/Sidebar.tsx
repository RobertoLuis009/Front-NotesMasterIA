import Link from "next/link";
import { BookOpen, Star, Clock, Network, Sparkles, Plus, type LucideIcon } from "lucide-react";

type NavItem = {
  label: string;
  active: boolean;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { label: "Todas as notas", active: true, icon: BookOpen },
  { label: "Favoritas", active: false, icon: Star },
  { label: "Recentes", active: false, icon: Clock },
  { label: "Grafo", active: false, icon: Network },
  { label: "Assistente IA", active: false, icon: Sparkles },
];


export default function Sidebar() {
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
      {/* Nova nota */}
      <Link
        href="/notas/nova"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#5566B8] to-[#2E5C82] px-4 py-3 text-sm font-semibold text-[#F6F8FB] shadow-lg shadow-[#3A3F8E]/40 transition-all hover:brightness-110"
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
        Nova nota
      </Link>

      {/* Navegação */}
      <nav className="flex flex-col gap-1">
        {navItems.map(({ label, active, icon: Icon }) => (
          <a
            key={label}
            href="#"
            className={
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors " +
              (active
                ? "bg-[#6370CB]/15 text-[#E7EBF1]"
                : "text-[#7D8695] hover:bg-white/5 hover:text-[#E7EBF1]")
            }
          >
            <Icon
              className={"h-5 w-5 " + (active ? "text-[#6370CB]" : "")}
              strokeWidth={2}
            />
            {label}
          </a>
        ))}
      </nav>

    </aside>
  );
}
