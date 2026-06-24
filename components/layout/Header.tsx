import { auth0 } from "@/lib/auth0";
import NavLinks from "@/components/layout/NavLinks";
import UserMenu from "@/components/layout/UserMenu";

export default async function Header() {
  const session = await auth0.getSession();

  const initials = (session?.user.name ?? "")
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="flex items-center justify-between px-6 py-4 sm:px-8">
      {/* Marca */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#6370CB] to-[#32A7C6] shadow-lg shadow-[#6370CB]/25">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-[#F6F8FB]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
          </svg>
        </div>
        <span className="text-lg font-semibold tracking-tight text-[#E7EBF1]">
          NotesMaster
        </span>
      </div>

      {/* Navegação */}
      <NavLinks />

      {/* Ações */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notificações"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#7D8695] transition-colors hover:text-[#E7EBF1]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <UserMenu initials={initials} />
      </div>
    </header>
  );
}
