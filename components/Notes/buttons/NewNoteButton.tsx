import Link from "next/link";
import { Plus } from "lucide-react";

export default function NewNoteButton() {
  return (
    <Link
      href="/notas/nova"
      className="flex shrink-0 items-center gap-2 rounded-xl bg-linear-to-r from-[#5566B8] to-[#2E5C82] px-5 py-3 text-sm font-semibold text-[#F6F8FB] shadow-lg shadow-[#3A3F8E]/40 transition-all hover:brightness-110"
    >
      <Plus className="h-4 w-4" strokeWidth={2.5} />
      Nova nota
    </Link>
  );
}
