import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AuroraBackground from "@/components/layout/AuroraBackground";
import Header from "@/components/layout/Header";
import NoteEditor from "@/components/Notes/Cards/editor/NoteEditor";

export default function NovaNotaPage() {
  return (
    <AuroraBackground>
      <Header />
      <div className="mx-auto flex h-full w-full max-w-5xl flex-col gap-4 p-6">
        <Link
          href="/notas"
          className="flex w-fit items-center gap-2 rounded-xl border border-white/6 bg-white/5 px-4 py-2 text-sm font-medium text-[#7D8695] transition-colors hover:bg-white/8 hover:text-[#E7EBF1]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Voltar
        </Link>
        <NoteEditor />
      </div>
    </AuroraBackground>
  );
}
