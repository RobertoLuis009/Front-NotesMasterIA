"use client";

import { useEffect, useRef, useState } from "react";

export type AutosaveStatus = "idle" | "saving" | "saved" | "error";

type Options = {
  /** Espera após parar de digitar antes de salvar (ms). Default 800. */
  delay?: number;
  /** Teto: força um save mesmo em digitação contínua (ms). Default 5000. */
  maxWait?: number;
};

/**
 * Salvamento automático genérico (estilo Notion). Apenas agendamento:
 * debounce + maxWait + serialização (um save em voo por vez) + flush no
 * unmount. A lógica de persistência (criar vs atualizar) fica no `save`.
 */
export function useAutosave<T>(
  value: T,
  save: (value: T) => Promise<void>,
  { delay = 800, maxWait = 5000 }: Options = {},
) {
  const [status, setStatus] = useState<AutosaveStatus>("idle");

  const valueRef = useRef(value);
  const saveRef = useRef(save);
  // Snapshot do que já foi salvo. Lazy init: o valor inicial conta como "salvo",
  // então nada dispara até o usuário mudar algo (funciona com nota vazia).
  const savedSnapshot = useRef(JSON.stringify(value));
  const savingRef = useRef(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxWaitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  valueRef.current = value;
  saveRef.current = save;

  // Mantido num ref para sempre enxergar os closures mais recentes.
  const flush = useRef<() => void>(() => {});
  flush.current = () => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
    if (maxWaitTimer.current) {
      clearTimeout(maxWaitTimer.current);
      maxWaitTimer.current = null;
    }

    const snapshot = JSON.stringify(valueRef.current);
    if (snapshot === savedSnapshot.current) return; // nada mudou
    if (savingRef.current) return; // já há um save em voo; o .then re-checa

    const toSave = valueRef.current;
    savingRef.current = true;
    setStatus("saving");

    saveRef.current(toSave)
      .then(() => {
        savedSnapshot.current = snapshot;
        savingRef.current = false;
        // Mudou durante o save? salva o mais recente; senão, marca como salvo.
        if (JSON.stringify(valueRef.current) !== savedSnapshot.current) {
          flush.current();
        } else {
          setStatus("saved");
        }
      })
      .catch(() => {
        savingRef.current = false;
        setStatus("error"); // savedSnapshot intacto → segue "dirty" p/ retentar
      });
  };

  // Debounce a cada mudança; maxWait persiste do 1º "dirty" até o save.
  useEffect(() => {
    const snapshot = JSON.stringify(value);
    if (snapshot === savedSnapshot.current) return;

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => flush.current(), delay);

    if (!maxWaitTimer.current) {
      maxWaitTimer.current = setTimeout(() => flush.current(), maxWait);
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
        debounceTimer.current = null;
      }
    };
  }, [value, delay, maxWait]);

  // Flush ao desmontar: dispara o save pendente (fire-and-forget).
  useEffect(() => {
    return () => {
      const snapshot = JSON.stringify(valueRef.current);
      if (snapshot !== savedSnapshot.current && !savingRef.current) {
        saveRef.current(valueRef.current).catch(() => {});
      }
    };
  }, []);

  return status;
}
