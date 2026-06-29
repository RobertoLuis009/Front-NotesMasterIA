"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import {
  getSimilarNotes,
  type NoteWithScore,
} from "@/lib/actions/notes";

interface Props {
  noteId: number;
}

export default function ContextualLinksPanel({ noteId }: Props) {
  const [notes, setNotes] = useState<NoteWithScore[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSimilarNotes(noteId)
      .then(setNotes)
      .catch(() => setNotes([]))
      .finally(() => setLoading(false));
  }, [noteId]);

  return (
    <div
      className="flex w-72 shrink-0 flex-col gap-3 rounded-2xl border border-white/6 p-5"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        backdropFilter: "blur(24px) saturate(130%)",
        WebkitBackdropFilter: "blur(24px) saturate(130%)",
        boxShadow: "0 24px 70px -12px #020308",
      }}
    >
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[#6370CB]" strokeWidth={2} />
        <span className="text-sm font-semibold text-[#E7EBF1]">
          Notas parecidas
        </span>
        {loading && (
          <span className="ml-auto h-3 w-3 animate-spin rounded-full border border-[#6370CB] border-t-transparent" />
        )}
      </div>

      {notes.length === 0 && !loading && (
        <p className="text-xs text-[#3A4055]">Nenhuma nota similar encontrada.</p>
      )}

      <div className="flex flex-col gap-2">
        {notes.map((note) => (
          <Link
            key={note.id}
            href={`/notas/${note.id}`}
            className="flex flex-col gap-1 rounded-xl border border-white/4 px-3 py-2.5 transition-colors hover:border-[#6370CB]/30 hover:bg-white/4"
          >
            <div className="flex items-center justify-between gap-1">
              <span className="line-clamp-1 text-xs font-medium text-[#E7EBF1]">
                {note.title || "Sem título"}
              </span>
              <span className="shrink-0 text-[10px] text-[#6370CB]">
                {Math.round(note.score * 100)}%
              </span>
            </div>
            <p className="line-clamp-2 text-[11px] leading-relaxed text-[#7D8695]">
              {note.content}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
