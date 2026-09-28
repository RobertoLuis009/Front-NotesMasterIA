import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

/**
 * Cria/atualiza o usuário no nosso banco. Usa fetch direto (e não o apiFetch)
 * porque no callback a sessão ainda está sendo gravada no response — não dá
 * para lê-la com auth0.getSession() neste ponto.
 */
async function syncUserOnLogin(accessToken: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/api/users/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.ok;
  } catch {
    return false;
  }
}

export const auth0 = new Auth0Client({
  authorizationParameters: {
    audience: process.env.AUTH0_AUDIENCE,
  },

  /**
   * Roda uma única vez: quando o Auth0 redireciona de volta após o login.
   * É aqui que a conta é sincronizada — não a cada visita à home.
   */
  async onCallback(error, ctx, session) {
    const baseUrl = ctx.appBaseUrl ?? process.env.APP_BASE_URL!;

    if (error) {
      const url = new URL("/login", baseUrl);
      url.searchParams.set("error", error.message);
      return NextResponse.redirect(url);
    }

    const destino = new URL(ctx.returnTo ?? "/home", baseUrl);
    const accessToken = session?.tokenSet.accessToken;

    if (accessToken) {
      const ok = await syncUserOnLogin(accessToken);
      destino.searchParams.set("sync", ok ? "ok" : "erro");
    }

    return NextResponse.redirect(destino);
  },
});
