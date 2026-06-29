import { BookOpen } from "lucide-react";
import { getNoteCount } from "@/lib/actions/notes";

export default async function NoteCountCard() {
  const { count } = await getNoteCount().catch(() => ({ count: 0 }));

  return (
    <div
      className="flex flex-col gap-3 rounded-2xl border border-white/6 p-5"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        backdropFilter: "blur(24px) saturate(130%)",
        WebkitBackdropFilter: "blur(24px) saturate(130%)",
        boxShadow: "0 24px 70px -12px #020308",
      }}
    >
      <BookOpen className="h-5 w-5 text-[#7D8695]" strokeWidth={2} />
      <span className="text-4xl font-bold text-[#E7EBF1]">{count}</span>
      <span className="text-sm text-[#7D8695]">Notas</span>
    </div>
  );
}
