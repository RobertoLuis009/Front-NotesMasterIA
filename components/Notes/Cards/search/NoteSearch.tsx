"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { searchNotes, type NoteWithScore } from "@/lib/actions/notes";

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function NoteSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NoteWithScore[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    searchNotes(debouncedQuery)
      .then((r) => {
        setResults(r);
        setOpen(true);
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <div className="flex items-center gap-2 rounded-xl border border-white/6 bg-white/5 px-4 py-2.5">
        <Search className="h-4 w-4 shrink-0 text-[#7D8695]" strokeWidth={2} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca mágica — busque por conceito..."
          className="flex-1 bg-transparent text-sm text-[#E7EBF1] placeholder-[#3A4055] outline-none"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
          >
            <X
              className="h-4 w-4 text-[#7D8695] hover:text-[#E7EBF1]"
              strokeWidth={2}
            />
          </button>
        )}
        {loading && (
          <span className="h-3 w-3 animate-spin rounded-full border border-[#6370CB] border-t-transparent" />
        )}
      </div>

      {open && results.length > 0 && (
        <div
          className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border border-white/6 p-2"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            backdropFilter: "blur(24px) saturate(130%)",
            boxShadow: "0 24px 70px -12px #020308",
          }}
        >
          {results.map((note) => (
            <Link
              key={note.id}
              href={`/notas/${note.id}`}
              onClick={() => setOpen(false)}
              className="flex flex-col gap-1 rounded-xl px-4 py-3 transition-colors hover:bg-white/5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-[#E7EBF1]">
                  {note.title || "Sem título"}
                </span>
                <span className="shrink-0 text-xs text-[#6370CB]">
                  {Math.round(note.score * 100)}% similar
                </span>
              </div>
              <p className="line-clamp-1 text-xs text-[#7D8695]">
                {note.content}
              </p>
            </Link>
          ))}
        </div>
      )}

      {open &&
        results.length === 0 &&
        !loading &&
        debouncedQuery.length >= 2 && (
          <div
            className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border border-white/6 px-4 py-3"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
              backdropFilter: "blur(24px) saturate(130%)",
            }}
          >
            <p className="text-sm text-[#7D8695]">Nenhuma nota encontrada.</p>
          </div>
        )}
    </div>
  );
}
