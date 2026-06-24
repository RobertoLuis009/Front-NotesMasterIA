# Front-end — Convenções de UI e Estrutura

Guia de referência para manter consistência visual e organização dos componentes do front-end (Next.js + Tailwind v4). Tema: **Nebula** — obsidiana/noir, fundo quase preto azulado, índigo acinzentado como destaque, sem rosa/roxo vibrante.

---

## 1. Paleta de cores (tema Nebula)

| Token                  | Hex       | Uso                                              |
| ---------------------- | --------- | ------------------------------------------------ |
| `background`           | `#010205` | Fundo base (quase preto, azul-noite)             |
| `foreground`           | `#E7EBF1` | Texto principal (gelo)                           |
| `card`                 | `#04070F` | Fundo de cards / superfícies                     |
| `card-foreground`      | `#E7EBF1` | Texto sobre card                                 |
| `popover`              | `#03050D` | Fundo de popovers / dropdowns                    |
| `primary`              | `#6370CB` | Destaque principal (índigo acinzentado)          |
| `primary-foreground`   | `#F6F8FB` | Texto sobre primary                              |
| `secondary`            | `#386694` | Azul-aço (degradês, estados secundários)         |
| `secondary-foreground` | `#F6F8FB` | Texto sobre secondary                            |
| `muted`                | `#0D111A` | Superfícies discretas                            |
| `muted-foreground`     | `#7D8695` | Texto secundário, labels, itens inativos         |
| `accent`               | `#32A7C6` | Ciano de realce (fim de degradês da marca)       |
| `accent-foreground`    | `#020307` | Texto sobre accent                               |
| `destructive`          | `#D73337` | Ações destrutivas (erros, exclusão)              |
| `destructive-foreground` | `#F6F8FB` | Texto sobre destructive                        |
| `ring`                 | `#6370CB` | Anel de foco                                     |
| `aurora-1`             | `#343B91` | Aurora índigo (glows de fundo)                   |
| `aurora-2`             | `#004771` | Aurora azul-noite (glows de fundo)               |
| `aurora-3`             | `#004356` | Aurora ciano profundo (glows de fundo)           |

> Enquanto não houver tokens registrados no `globals.css`, usamos os hex direto via *arbitrary values* do Tailwind (ex.: `bg-[#010205]`, `text-[#7D8695]`).

### Degradês recorrentes

- **Marca / texto de destaque**: `from-[#6370CB] to-[#32A7C6]` (primary → accent).
- **Botões primários**: `from-[#5566B8] to-[#2E5C82]`, glow de sombra `shadow-[#3A3F8E]/40`.
- **Avatar**: `from-[#6370CB] to-[#386694]` (primary → secondary).

---

## 2. Fundo das páginas (degradê aurora)

O fundo do dashboard/páginas é a **cor base + 3 auroras radiais sobrepostas**, reforçadas por **2 blobs flutuantes**.

- Base: `#010205`
- Aurora 1 (topo-esquerda, índigo): `#1F1B57`
- Aurora 2 (topo-direita, azul-noite): `#0B2942`
- Aurora 3 (centro-baixo, ciano profundo): `#0A2E3B`
- Blobs: dois círculos com `aurora-1` e `aurora-2`, `blur-3xl` e `opacity-30`.

Implementado de forma reutilizável em **`components/layout/AuroraBackground.tsx`** — toda página que precisa do fundo deve envolver o conteúdo nesse componente, em vez de recriar o degradê.

```tsx
<AuroraBackground>
  <Header />
  <main>...</main>
</AuroraBackground>
```

### Efeito "vidro" (glass-panel)

Cards translúcidos sobre o fundo escuro (ex.: `Sidebar`):

- Fundo: gradiente vertical de branco translúcido `rgba(255,255,255,0.04) → rgba(255,255,255,0.01)`
- Borda: `rgba(255,255,255,0.06)` (`border-white/6`)
- Sombra profunda: `#020308`
- Efeito: `backdrop-filter: blur(24px) saturate(130%)`

> O vidro só aparece quando há conteúdo atrás do card — usar sempre sobre o `AuroraBackground`.

---

## 3. Estrutura de pastas dos componentes

Princípios:

1. **Agrupar pelo papel** do componente, não criar pasta de categoria com um único arquivo.
2. **Colocation**: sub-componentes usados por um único "pai" ficam na mesma pasta dele.
3. **`styles/` é só para CSS/tokens** — componentes que renderizam JSX nunca vão para lá.
4. **Component-folder + `index.ts`** só quando o componente passa a ter arquivos próprios (sub-componentes, hook, teste, CSS module). Antes disso, é nesting desnecessário.

```
components/
  layout/                  # "casca" das páginas
    Header.tsx
    NavLinks.tsx           # sub-componente do Header (client)
    UserMenu.tsx           # sub-componente do Header (client)
    AuroraBackground.tsx   # wrapper de fundo aurora
  Notes/                   # domínio "notas"
    Cards/
      Sidebar.tsx
  UserSync.tsx             # utilitário compartilhado
```

### Regras de nomenclatura

- Componentes em **PascalCase** (`Header.tsx`, `UserMenu.tsx`).
- Client components marcados com `"use client"` no topo (ex.: `NavLinks`, `UserMenu`).
- Imports sempre pelo alias `@/components/...` (ex.: `@/components/layout/Header`).

### Quando crescer

- Migrar de organização "por tipo" (`layout/`) para **"por feature"** (`features/notes/`, `features/auth/`) quando o número de telas/domínios aumentar.
