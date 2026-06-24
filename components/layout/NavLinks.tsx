"use client";

import { usePathname } from "next/navigation";

const links = [
  { href: "/home", label: "Início" },
  { href: "/notas", label: "Notas" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-2">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <a
                href={link.href}
                className={
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors " +
                  (active
                    ? "bg-white/5 text-[#E7EBF1] hover:bg-white/10"
                    : "text-[#7D8695] hover:text-[#E7EBF1]")
                }
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
