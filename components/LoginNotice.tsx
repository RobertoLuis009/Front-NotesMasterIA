"use client";

import { useEffect } from "react";
import { notify } from "@/lib/notifications";

/**
 * A sincronização da conta acontece no onCallback do Auth0 (lib/auth0.ts), uma
 * única vez por login. Aqui só mostramos o resultado e limpamos o parâmetro da
 * URL, para o aviso não reaparecer a cada F5 ou ao voltar para a home.
 */
export default function LoginNotice() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sync = params.get("sync");

    if (!sync) return;

    if (sync === "ok") {
      notify.success("Conta sincronizada com sucesso!");
    } else {
      notify.error("Erro ao sincronizar conta.");
    }

    params.delete("sync");
    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      window.location.pathname + (query ? `?${query}` : ""),
    );
  }, []);

  return null;
}
