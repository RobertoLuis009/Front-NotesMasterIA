import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import {
  getNoteCount,
  getConnectionInsights,
  getRecentNotes,
} from "@/lib/actions/notes";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export default async function NoteStats() {
  const [notes, connections, recent] = await Promise.all([
    getNoteCount().catch(() => ({ count: 0 })),
    getConnectionInsights().catch(() => ({ count: 0 })),
    getRecentNotes().catch(() => []),
  ]);

  const lastEdit = recent[0]
    ? dayjs(recent[0].updatedAt).fromNow(true)
    : "nunca";

  const stats = [
    { value: String(notes.count), label: "Notas" },
    { value: String(connections.count), label: "Conexões" },
    { value: lastEdit, label: "Última edição" },
  ];

  return (
    <dl className="mt-16 flex max-w-lg flex-wrap gap-x-14 gap-y-6 border-t border-white/8 pt-5">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1.5">
          <dd className="text-3xl font-semibold tracking-tight text-[#E7EBF1]">
            {stat.value}
          </dd>
          <dt className="text-[11px] uppercase tracking-[0.12em] text-[#7D8695]">
            {stat.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
