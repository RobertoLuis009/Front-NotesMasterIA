# NotesMaster — Front-end

Interface web de um aplicativo de notas com **salvamento automático**, **busca semântica** e **sugestão de notas relacionadas**. Construída com Next.js 16 (App Router), React 19 e Tailwind CSS v4, com autenticação via OpenID Connect.

---

## Destaques técnicos

- **Server Components + Server Actions:** a sessão e o access token permanecem no servidor. O navegador nunca recebe o token nem chama a API diretamente.
- **Autosave robusto:** debounce com limite máximo de espera e serialização das requisições, evitando gravações concorrentes e condições de corrida entre criação e atualização.
- **Camada de acesso à API centralizada:** um único cliente (`apiFetch`) injeta a autenticação e padroniza o tratamento de erros.
- **Proteção de rotas por middleware:** todas as rotas passam pelo middleware de autenticação do Next.js.
- **Build `standalone`:** imagem Docker enxuta, pronta para produção.
- **Design system próprio:** tema escuro com tokens documentados e componentes reutilizáveis (ver [COMPONENTS.md](./COMPONENTS.md)).

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Linguagem | TypeScript 5 |
| Estilização | Tailwind CSS v4 |
| Autenticação | `@auth0/nextjs-auth0` v4 (OIDC) |
| Notificações | Sonner |
| Ícones | Lucide React |
| Datas | Day.js (locale `pt-br`) |

---

## Pré-requisitos

- Node.js 22+
- API do NotesMaster em execução (por padrão em `http://localhost:3001`)
- Aplicação OIDC configurada no provedor de identidade

---

## Configuração

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Autenticação (OIDC)
AUTH0_SECRET=               # string aleatória longa, usada para criptografar a sessão
AUTH0_DOMAIN=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_AUDIENCE=             # identificador da API que receberá o access token
APP_BASE_URL=http://localhost:3000

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
npm run start     # executa o build
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
| `/login` | Página de entrada |
| `/home` | Painel com resumo, notas recentes e indicadores |
| `/notas` | Lista de notas com busca |
| `/notas/favoritas` | Notas favoritas |
| `/notas/nova` | Criação de nota com autosave |
| `/notas/[id]` | Edição de nota, com painel de notas relacionadas |
| `/auth/*` | Rotas de login e logout, tratadas pelo middleware de autenticação |

---

## Arquitetura

```
app/                      # Rotas (App Router)
  home/  login/
  notas/                  # lista, favoritas, nova e [id]

components/
  layout/                 # Header, navegação, menu do usuário, fundo
  Notes/
    Cards/
      navigation/         # Sidebar
      editor/             # Editor com autosave e painel de relacionadas
      list/               # Listas de notas (completa e recentes)
      search/             # Busca
      count/              # Indicadores
    buttons/
  UserSync.tsx            # Sincroniza o usuário autenticado com a API
  Form.tsx                # Wrapper de formulário com feedback

hooks/
  useAutosave.ts          # Debounce, limite máximo de espera e serialização

lib/
  auth0.ts                # Cliente de autenticação
  api.ts                  # apiFetch: injeta o token e trata erros
  actions/                # Server Actions (notas e usuários)
  notes/createNoteSaver.ts# Criação na 1ª gravação, atualização nas seguintes
  notifications/          # Wrapper de notificações

proxy.ts                  # Middleware do Next.js (autenticação)
```

---

## Fluxo de autenticação

1. O usuário inicia o login e é redirecionado ao provedor de identidade.
2. Ao retornar, o SDK cria uma sessão criptografada, em cookie, no servidor.
3. `UserSync` solicita à API a criação do perfil local, caso ainda não exista.
4. As Server Actions chamam a API via `apiFetch`, que envia o access token da sessão no header `Authorization`.

---

## Autosave

```
usuário digita
  → useAutosave: debounce de 800 ms, com espera máxima de 5 s
    → createNoteSaver:
        1ª gravação → POST  (cria a nota e guarda o id)
        demais      → PATCH (atualiza a nota existente)
```

As gravações são serializadas: uma nova só começa quando a anterior termina. O editor exibe o estado atual (`idle`, `saving`, `saved` ou `error`).

---

## Design

Tema escuro com fundo em degradê e cores de destaque em índigo e ciano. A paleta, os tokens e as regras de uso dos componentes visuais estão em [COMPONENTS.md](./COMPONENTS.md).

---

## Fluxo de branches

| Branch | Propósito |
|---|---|
| `main` | Código de produção |
| `develop` | Integração de features |
| `feature/*` | Novas funcionalidades |
| `release/*` | Preparação de versão |
| `hotfix/*` | Correções urgentes |

Os commits seguem o padrão Conventional Commits (`feat`, `fix`, `chore`, ...).
