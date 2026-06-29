import Link from "next/link";
import { ArrowUpRight, ArrowRight, Clock, Sparkles } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { getRecentNotes } from "@/lib/actions/notes";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export default async function RecentNotesList() {
  const notes = await getRecentNotes().catch(() => []);

  if (notes.length === 0) {
    return (
      <div
        className="rounded-2xl border border-white/6 p-5"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
          backdropFilter: "blur(24px) saturate(130%)",
          WebkitBackdropFilter: "blur(24px) saturate(130%)",
          boxShadow: "0 24px 70px -12px #020308",
        }}
      >
        <p className="text-sm text-[#7D8695]">Nenhuma nota ainda.</p>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border border-white/6"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        backdropFilter: "blur(24px) saturate(130%)",
        WebkitBackdropFilter: "blur(24px) saturate(130%)",
        boxShadow: "0 24px 70px -12px #020308",
      }}
    >
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <span className="text-base font-semibold text-[#E7EBF1]">
          Continuar onde parou
        </span>
        <Link
          href="/notas"
          className="flex items-center gap-1 text-xs text-[#7D8695] transition-colors hover:text-[#E7EBF1]"
        >
          ver todas
          <ArrowRight className="h-3 w-3" strokeWidth={2} />
        </Link>
      </div>

      <div className="flex flex-col px-3 pb-3">
        {notes.map((note) => (
          <Link
            key={note.id}
            href={`/notas/${note.id}`}
            className="group flex items-center gap-4 rounded-xl px-3 py-3.5 transition-colors hover:bg-white/5"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/6 border border-white/8">
              <Sparkles className="h-4 w-4 text-[#6370CB]" strokeWidth={1.5} />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="truncate text-sm font-semibold text-[#E7EBF1]">
                {note.title || "Sem título"}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#7D8695]">
                <Clock className="h-3 w-3 shrink-0" strokeWidth={2} />
                <span>{dayjs(note.updatedAt).fromNow()}</span>
              </div>
            </div>

            <ArrowUpRight
              className="h-4 w-4 shrink-0 text-[#3A4055] opacity-0 transition-all group-hover:opacity-100 group-hover:text-[#6370CB]"
              strokeWidth={2}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
