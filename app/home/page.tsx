import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import UserSync from "@/components/UserSync";
import Header from "@/components/layout/Header";
import AuroraBackground from "@/components/layout/AuroraBackground";

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
  const firstName = session.user.name?.split(" ")[0] ?? "";

  return (
    <AuroraBackground>
      <UserSync />
      <Header />

      <main className="px-6 py-12 sm:px-12 sm:py-16">
        <p className="text-sm font-medium uppercase tracking-widest text-[#7D8695]">
          {now.format("dddd, D [de] MMMM · HH:mm")}
        </p>

        <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
          {greeting},{" "}
          <span className="bg-linear-to-r from-[#6370CB] to-[#32A7C6] bg-clip-text text-transparent">
            {firstName}
          </span>
          .
        </h1>

        <p className="mt-5 max-w-xl text-lg text-[#7D8695]">
          Você tem <span className="font-semibold text-[#E7EBF1]">7 ideias</span>{" "}
          esperando para se conectar. A IA está observando em silêncio.
        </p>
      </main>
    </AuroraBackground>
  );
}
