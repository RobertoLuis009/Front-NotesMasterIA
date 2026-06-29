import AuroraBackground from "@/components/layout/AuroraBackground";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/Notes/Cards/navigation/Sidebar";
import NotesList from "@/components/Notes/Cards/list/NotesList";
import NoteSearch from "@/components/Notes/Cards/search/NoteSearch";
import { getNotes } from "@/lib/actions/notes";

export default async function NotasPage() {
  const notes = await getNotes();

  return (
    <AuroraBackground>
      <Header />
      <div className="flex gap-6 p-6">
        <Sidebar />
        <div className="flex flex-1 flex-col gap-4">
          <NoteSearch />
          <NotesList notes={notes} />
        </div>
      </div>
    </AuroraBackground>
  );
}
