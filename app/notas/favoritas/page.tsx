import AuroraBackground from "@/components/layout/AuroraBackground";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/Notes/Cards/navigation/Sidebar";
import NotesList from "@/components/Notes/Cards/list/NotesList";
import { getFavoriteNotes } from "@/lib/actions/notes";

export default async function FavoritasPage() {
  const notes = await getFavoriteNotes();

  return (
    <AuroraBackground>
      <Header />
      <div className="flex gap-6 p-6">
        <Sidebar />
        <div className="flex flex-1 flex-col gap-4">
          <h2 className="text-lg font-semibold text-[#E7EBF1]">Favoritas</h2>
          <NotesList notes={notes} emptyMessage="Nenhuma nota favorita ainda." />
        </div>
      </div>
    </AuroraBackground>
  );
}
