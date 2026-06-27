import { createNote, updateNote, type NoteInput } from "@/lib/actions/notes";

/**
 * Cria um "saver" que decide entre criar e atualizar: o 1º save faz POST e
 * memoriza o id; os seguintes fazem PATCH no mesmo id. Passar `initialId`
 * pula o POST e vai direto para PATCH (nota existente).
 */
export function createNoteSaver(initialId?: number) {
  let id: number | null = initialId ?? null;

  return async (data: NoteInput): Promise<void> => {
    if (id === null) {
      const note = await createNote(data);
      id = note.id;
    } else {
      await updateNote(id, data);
    }
  };
}
