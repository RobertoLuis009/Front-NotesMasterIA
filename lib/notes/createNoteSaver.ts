import { createNote, updateNote, type NoteInput } from "@/lib/actions/notes";

/**
 * Cria um "saver" que decide entre criar e atualizar: o 1º save faz POST e
 * memoriza o id; os seguintes fazem PATCH no mesmo id. A serialização (um save
 * em voo por vez) fica a cargo do useAutosave, então aqui não há concorrência.
 */
export function createNoteSaver() {
  let id: number | null = null;

  return async (data: NoteInput): Promise<void> => {
    if (id === null) {
      const note = await createNote(data);
      id = note.id;
    } else {
      await updateNote(id, data);
    }
  };
}
