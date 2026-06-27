export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#010205] text-[#E7EBF1]">
      {/* Auroras de fundo */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-112 w-112 rounded-full bg-[#343B91]/25 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-[#004771]/20 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-112 w-112 rounded-full bg-[#004356]/20 blur-[130px]" />

      <div className="relative grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Painel esquerdo — branding */}
        <section className="relative hidden flex-col justify-between p-12 lg:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#6370CB] to-[#32A7C6] shadow-lg shadow-[#6370CB]/25">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-[#F6F8FB]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight">
              NotesMaster
            </span>
          </div>

          <div className="max-w-md">
            <h2 className="text-4xl font-bold leading-tight tracking-tight">
              <span className="bg-linear-to-r from-[#6370CB] to-[#32A7C6] bg-clip-text text-transparent">
                Pensamentos
              </span>{" "}
              que se encontram sozinhos.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#7D8695]">
              Entre e continue a tecer sua rede de ideias com a ajuda da
              inteligência artificial.
            </p>

            {/* Grafo decorativo */}
            <svg
              viewBox="0 0 400 220"
              className="mt-10 w-full max-w-sm"
              fill="none"
            >
              <line
                x1="60"
                y1="80"
                x2="200"
                y2="140"
                stroke="url(#g)"
                strokeWidth="1.5"
              />
              <line
                x1="200"
                y1="140"
                x2="110"
                y2="190"
                stroke="url(#g)"
                strokeWidth="1.5"
              />
              <line
                x1="200"
                y1="140"
                x2="320"
                y2="70"
                stroke="url(#g)"
                strokeWidth="1.5"
              />
              <line
                x1="320"
                y1="70"
                x2="280"
                y2="180"
                stroke="url(#g)"
                strokeWidth="1.5"
              />
              <line
                x1="200"
                y1="140"
                x2="280"
                y2="180"
                stroke="url(#g)"
                strokeWidth="1.5"
              />
              <circle cx="60" cy="80" r="9" fill="#6370CB" />
              <circle cx="200" cy="140" r="14" fill="#386694" />
              <circle cx="110" cy="190" r="9" fill="#6370CB" />
              <circle cx="320" cy="70" r="9" fill="#32A7C6" />
              <circle cx="280" cy="180" r="9" fill="#32A7C6" />
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#6370CB" />
                  <stop offset="1" stopColor="#32A7C6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <p className="text-xs text-[#7D8695]/70">
            © 2026 NotesMaster. Todas as ideias suas.
          </p>
        </section>

        {/* Painel direito — card de login */}
        <section className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md rounded-2xl border border-white/5 bg-[#04070F]/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Bem-vindo de volta
              </h1>
              <p className="text-sm text-[#7D8695]">
                Entre na sua constelação de notas.
              </p>
            </div>

            <a
              href="/auth/login"
              className="group mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-[#6370CB] to-[#386694] px-4 py-3.5 text-sm font-semibold text-[#F6F8FB] shadow-lg shadow-[#6370CB]/20 transition-all hover:shadow-[#6370CB]/35 hover:brightness-110"
            >
              Entrar com Auth0
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>

            <p className="mt-6 text-center text-xs leading-relaxed text-[#7D8695]/80">
              Ao entrar você concorda com nossos termos de uso.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
