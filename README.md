# NotesMaster — Front-end

Interface web do NotesMaster: um aplicativo de notas com salvamento automático e integração com IA. Construído com Next.js 16, Tailwind CSS v4 e autenticação via Auth0.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript 5 |
| Estilização | Tailwind CSS v4 |
| Autenticação | Auth0 (`@auth0/nextjs-auth0` v4) |
| Notificações | Sonner v2 |
| Ícones | Lucide React |
| Datas | Day.js (locale `pt-br`) |
| Build output | `standalone` (Docker-ready) |

---

## Pré-requisitos

- Node.js 20+
- Back-end rodando em `http://localhost:3001` (ou definir `NEXT_PUBLIC_API_URL`)
- Conta e aplicação configuradas no Auth0

---

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz:

```env
# Auth0
AUTH0_SECRET=                  # string aleatória longa (openssl rand -hex 32)
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://<seu-tenant>.auth0.com
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_AUDIENCE=                # audience da API no Auth0

# API
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Como rodar

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build     # build de produção
npm run start     # serve o build
npm run lint      # ESLint
```

### Docker

```bash
docker build -t notesmaster-front .
docker run -p 3000:3000 --env-file .env.local notesmaster-front
```

---

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Redireciona para `/home` |
| `/home` | Dashboard com saudação personalizada (requer sessão) |
| `/login` | Página de login com branding |
| `/notas` | Lista de notas com sidebar de navegação |
| `/notas/nova` | Editor de nova nota com autosave |
| `/auth/login` | Endpoint Auth0 (gerenciado pelo middleware) |
| `/auth/logout` | Encerramento de sessão Auth0 |

---

## Estrutura de arquivos

```
app/
  layout.tsx            # Layout raiz — fontes Geist + Toaster global
  page.tsx              # Redirect / → /home
  globals.css           # Import Tailwind v4 + tokens base
  home/page.tsx         # Dashboard (Server Component, exige sessão)
  login/page.tsx        # Página de login pública
  notas/
    page.tsx            # Lista de notas
    nova/page.tsx       # Criação de nota com autosave

components/
  layout/
    AuroraBackground.tsx  # Wrapper do fundo aurora (Server)
    Header.tsx            # Cabeçalho com logo, nav e avatar (Server)
    NavLinks.tsx          # Links ativos por rota (Client)
    UserMenu.tsx          # Dropdown de conta — sair (Client)
  Notes/
    Cards/
      Sidebar.tsx         # Sidebar de categorias de notas (Server)
      NoteEditor.tsx      # Editor com autosave (Client)
  UserSync.tsx            # Sincroniza usuário Auth0 → API no mount (Client)
  Form.tsx                # Wrapper genérico de formulário com toast (Client)

hooks/
  useAutosave.ts          # Debounce + maxWait + serialização de saves

lib/
  auth0.ts                # Instância do Auth0Client com audience
  api.ts                  # apiFetch — injeta Bearer token em todas as chamadas
  auth/
  actions/
    notes.ts              # Server Actions: createNote, updateNote
    users.ts              # Server Actions: getMe, syncUser
  notes/
    createNoteSaver.ts    # Factory: POST na 1ª vez, PATCH nas seguintes
  notifications/
    index.ts              # Wrapper do sonner (notify.success/error/promise)

proxy.ts                  # Middleware Next.js — delega ao auth0.middleware
```

---

## Fluxo de autenticação

1. Usuário acessa `/login` e clica em "Entrar com Auth0"
2. Redirecionado para `/auth/login` — gerenciado pelo `proxy.ts` (middleware)
3. Auth0 autentica e retorna com sessão + `idToken`
4. `UserSync` (`components/UserSync.tsx`) dispara `POST /api/users/me` para criar/atualizar o usuário no banco
5. `apiFetch` injeta `Authorization: Bearer <idToken>` em todas as chamadas subsequentes

---

## Autosave (fluxo da nota nova)

```
usuário digita
  → useAutosave: debounce 800 ms / maxWait 5 s
    → createNoteSaver:
        1ª vez → POST /api/notes  (cria, salva o id)
        demais → PATCH /api/notes/:id
```

Status exibido no editor: `idle | saving | saved | error`.

---

## Design — Tema Nebula

Fundo quase preto azulado (`#010205`) com auroras radiais e índigo acinzentado como cor primária. Consulte [COMPONENTS.md](./COMPONENTS.md) para a paleta completa, tokens e regras de uso dos componentes visuais.

---

## Git Flow

| Branch | Propósito |
|---|---|
| `main` | Código de produção |
| `develop` | Integração de features |
| `feature/*` | Novas funcionalidades |
| `release/*` | Preparação de versão |
| `hotfix/*` | Correções urgentes em produção |

```bash
# Iniciar uma feature
git checkout -b feature/nome develop

# Finalizar
git checkout develop
git merge --no-ff feature/nome
git push origin develop
```
