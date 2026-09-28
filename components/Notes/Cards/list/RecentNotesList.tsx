import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { getRecentNotes } from "@/lib/actions/notes";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export default async function RecentNotesList() {
  const notes = await getRecentNotes().catch(() => []);

  return (
    <section>
      <div className="flex items-baseline justify-between pb-4">
        <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-[#7D8695]">
          Recentes
        </h2>
        <Link
          href="/notas"
          className="text-xs text-[#7D8695] transition-colors hover:text-[#E7EBF1]"
        >
          ver todas
        </Link>
      </div>

      {notes.length === 0 ? (
        <p className="border-t border-white/6 pt-5 text-sm text-[#7D8695]">
          Nenhuma nota ainda.
        </p>
      ) : (
        <ul className="flex flex-col border-b border-white/6">
          {notes.map((note) => (
            <li key={note.id} className="border-t border-white/6">
              <Link
                href={`/notas/${note.id}`}
                className="group flex flex-col gap-1.5 py-4.5"
              >
                <span className="truncate text-sm font-medium text-[#E7EBF1] transition-colors group-hover:text-white">
                  {note.title || "Sem título"}
                </span>
                <span className="text-xs text-[#7D8695]">
                  {dayjs(note.updatedAt).fromNow()}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
