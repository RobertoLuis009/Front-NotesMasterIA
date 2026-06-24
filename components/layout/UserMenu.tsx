"use client";

import { useEffect, useRef, useState } from "react";

export default function UserMenu({ initials }: { initials: string }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#6370CB] to-[#386694] text-sm font-semibold text-[#F6F8FB] transition-all hover:brightness-110"
      >
        {initials}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-white/10 bg-[#04070F] p-1 shadow-2xl"
        >
          <a
            href="/auth/logout"
            role="menuitem"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#7D8695] transition-colors hover:bg-white/5 hover:text-[#E7EBF1]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            Sair da conta
          </a>
        </div>
      )}
    </div>
  );
}
