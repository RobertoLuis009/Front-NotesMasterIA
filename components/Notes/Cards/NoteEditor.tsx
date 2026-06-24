"use client";

import { useMemo, useState } from "react";
import { useAutosave, type AutosaveStatus } from "@/hooks/useAutosave";
import { createNoteSaver } from "@/lib/notes/createNoteSaver";

const STATUS_LABEL: Record<AutosaveStatus, string> = {
  idle: "",
  saving: "Salvando…",
  saved: "Salvo",
  error: "Erro ao salvar",
};

export default function NoteEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Instancia o saver uma única vez (mantém o id entre POST → PATCH).
  const [save] = useState(() => createNoteSaver());

  const data = useMemo(() => ({ title, content }), [title, content]);
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
          placeholder="Título da nota..."
          className="w-full bg-transparent text-4xl font-bold text-[#E7EBF1] placeholder-[#3A4055] outline-none"
        />
        <span
          className={
            "shrink-0 pt-3 text-xs font-medium transition-colors " +
            (status === "error" ? "text-[#D73337]" : "text-[#7D8695]")
          }
        >
          {STATUS_LABEL[status]}
        </span>
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
