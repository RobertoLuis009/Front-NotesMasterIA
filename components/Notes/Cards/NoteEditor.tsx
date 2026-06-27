"use client";

import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { useAutosave, type AutosaveStatus } from "@/hooks/useAutosave";
import { createNoteSaver } from "@/lib/notes/createNoteSaver";
import type { NoteResponse } from "@/lib/actions/notes";

const STATUS_LABEL: Record<AutosaveStatus, string> = {
  idle: "",
  saving: "Salvando...",
  saved: "Salvo",
  error: "Erro ao salvar",
};

export default function NoteEditor({ note }: { note?: NoteResponse }) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [isFavorite, setIsFavorite] = useState(note?.isFavorite ?? false);

  const [save] = useState(() => createNoteSaver(note?.id));

  const data = useMemo(
    () => ({ title, content, isFavorite }),
    [title, content, isFavorite],
  );
  const status = useAutosave(data, save);

  return (
    <div
      className="flex h-full flex-1 flex-col rounded-2xl border border-white/6 p-8"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        backdropFilter: "blur(24px) saturate(130%)",
        WebkitBackdropFilter: "blur(24px) saturate(130%)",
        boxShadow: "0 24px 70px -12px #020308",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titulo da nota..."
          className="w-full bg-transparent text-4xl font-bold text-[#E7EBF1] placeholder-[#3A4055] outline-none"
        />

        <div className="flex shrink-0 items-center gap-3 pt-3">
          <span
            className={
              "text-xs font-medium transition-colors " +
              (status === "error" ? "text-[#D73337]" : "text-[#7D8695]")
            }
          >
            {STATUS_LABEL[status]}
          </span>

          <button
            type="button"
            onClick={() => setIsFavorite((prev) => !prev)}
            aria-label={
              isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
            }
            className="cursor-pointer transition-transform hover:scale-110"
          >
            <Star
              className="h-5 w-5 transition-colors"
              strokeWidth={2}
              style={
                isFavorite
                  ? { color: "#6370CB", fill: "#6370CB" }
                  : { color: "#3A4055" }
              }
            />
          </button>
        </div>
      </div>

      <div className="mt-4 h-px w-16 bg-white/8" />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Comece a escrever. Use / para comandos, @ para mencionar outras notas..."
        className="mt-6 flex-1 resize-none bg-transparent text-base leading-relaxed text-[#7D8695] placeholder-[#3A4055] outline-none"
      />
    </div>
  );
}



