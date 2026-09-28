import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import LoginNotice from "@/components/LoginNotice";
import Header from "@/components/layout/Header";
import AuroraBackground from "@/components/layout/AuroraBackground";
import NoteSearch from "@/components/Notes/Cards/search/NoteSearch";
import NewNoteButton from "@/components/Notes/buttons/NewNoteButton";
import NoteStats from "@/components/Notes/Cards/count/NoteStats";
import RecentNotesList from "@/components/Notes/Cards/list/RecentNotesList";
import { getConnectionInsights } from "@/lib/actions/notes";

dayjs.locale("pt-br");

function getGreeting(hour: number) {
  if (hour >= 5 && hour < 12) return "Bom dia";
  if (hour >= 12 && hour < 18) return "Boa tarde";
  return "Boa noite";
}

export default async function Home() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/login");
  }

  const now = dayjs();
  const greeting = getGreeting(now.hour());
  const rawName =
    session.user.given_name ?? session.user.nickname ?? session.user.name ?? "";
  const firstName = rawName.includes("@")
    ? rawName.split("@")[0]
    : rawName.split(" ")[0];
  const { count } = await getConnectionInsights().catch(() => ({ count: 0 }));

  return (
    <AuroraBackground>
      <LoginNotice />
      <Header />

      <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-14 sm:px-10 sm:pt-20">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-24">
          {/* Saudação e ações */}
          <section>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#7D8695]">
              {now.format("dddd, D [de] MMMM · HH:mm")}
            </p>

            <h1 className="mt-5 font-serif text-5xl leading-[1.02] tracking-tight text-[#F2F5F9] sm:text-[68px]">
              {greeting},
              <br />
              <span className="break-all">{firstName}</span>.
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-[#7D8695]">
              Você tem{" "}
              <span className="text-[#E7EBF1]">
                {count} {count === 1 ? "ideia" : "ideias"}
              </span>{" "}
              esperando para se conectar. A IA está observando em silêncio.
            </p>

            <div className="mt-11 flex max-w-lg flex-col gap-3.5">
              <NoteSearch />
              <div>
                <NewNoteButton />
              </div>
            </div>

            <NoteStats />
          </section>

          {/* Notas recentes */}
          <aside className="lg:pt-1.5">
            <RecentNotesList />
          </aside>
        </div>
      </main>
    </AuroraBackground>
  );
}
