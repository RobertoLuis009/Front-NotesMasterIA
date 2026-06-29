import Link from "next/link";
import type { NoteResponse } from "@/lib/actions/notes";
import { ArrowRight } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

function NoteCard({ note }: { note: NoteResponse }) {
  return (
    <Link
      href={`/notas/${note.id}`}
      className="group flex flex-col gap-3 rounded-2xl border border-white/6 p-5 transition-all hover:border-[#6370CB]/30 hover:shadow-[0_0_24px_-4px_#6370CB22]"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        backdropFilter: "blur(24px) saturate(130%)",
        WebkitBackdropFilter: "blur(24px) saturate(130%)",
        boxShadow: "0 24px 70px -12px #020308",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold leading-snug text-[#E7EBF1]">
          {note.title || "Sem título"}
        </h3>
        <span className="shrink-0 text-xs text-[#7D8695]">
          {dayjs(note.updatedAt).fromNow()}
        </span>
      </div>

      <p className="line-clamp-3 text-sm leading-relaxed text-[#7D8695]">
        {note.content || "Sem conteúdo"}
      </p>

      <div className="mt-1 flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <span className="text-xs font-medium text-[#6370CB]">Abrir</span>
        <ArrowRight className="h-3 w-3 text-[#6370CB] transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.5} />
      </div>
    </Link>
  );
}

export default function NotesList({
  notes,
  emptyMessage = "Nenhuma nota ainda. Crie a primeira!",
}: {
  notes: NoteResponse[];
  emptyMessage?: string;
}) {
  if (notes.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-[#7D8695]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid flex-1 auto-rows-min grid-cols-1 gap-4 sm:grid-cols-2">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
