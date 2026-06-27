import AuroraBackground from "@/components/layout/AuroraBackground";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/Notes/Cards/Sidebar";
import NotesList from "@/components/Notes/Cards/NotesList";
import { getNotes } from "@/lib/actions/notes";

export default async function NotasPage() {
  const notes = await getNotes();

  return (
    <AuroraBackground>
      <Header />
      <div className="flex gap-6 p-6">
        <Sidebar />
        <NotesList notes={notes} />
      </div>
    </AuroraBackground>
  );
}
