# 🎨 Starlight BI - Design System & Advanced Kanban Guide

**Versão**: 1.6  
**Data**: 12 de Maio de 2026  
**Status**: Novo Sistema de Design + Kanban Avançado

---

## 📚 Índice

1. [Design System Tokens](#design-system-tokens)
2. [Component Library](#component-library)
3. [Advanced Kanban](#advanced-kanban)
4. [Figma Integration](#figma-integration)
5. [Best Practices](#best-practices)

---

## 🎨 Design System Tokens

### Cores (COLORS)

```typescript
import { COLORS } from "@/components/design-system/DesignTokens";

// Neon (Starlight BI)
COLORS.neon.cyan      // #00d9ff
COLORS.neon.magenta   // #ff006e
COLORS.neon.purple    // #a100f2

// Semânticas
COLORS.success        // #52c41a
COLORS.warning        // #faad14
COLORS.error          // #ff4d4f
COLORS.info           // #1890ff

// Dark Theme
COLORS.dark.bg        // #0a0e27
COLORS.dark.surface   // #141829
COLORS.dark.card      // #1a1f3a
COLORS.dark.text      // #e0e6ff
```

### Tipografia (TYPOGRAPHY)

```typescript
import { TYPOGRAPHY } from "@/components/design-system/DesignTokens";

// Font Families
TYPOGRAPHY.fontFamily.sans   // Inter + system fonts
TYPOGRAPHY.fontFamily.mono   // Fira Code

// Font Sizes
TYPOGRAPHY.fontSize.xs       // 12px
TYPOGRAPHY.fontSize.sm       // 14px
TYPOGRAPHY.fontSize.base     // 16px
TYPOGRAPHY.fontSize.lg       // 18px
TYPOGRAPHY.fontSize.xl       // 20px
TYPOGRAPHY.fontSize["2xl"]   // 24px
TYPOGRAPHY.fontSize["3xl"]   // 30px
TYPOGRAPHY.fontSize["4xl"]   // 36px

// Font Weights
TYPOGRAPHY.fontWeight.light      // 300
TYPOGRAPHY.fontWeight.normal     // 400
TYPOGRAPHY.fontWeight.semibold   // 600
TYPOGRAPHY.fontWeight.bold       // 700
```

### Espaçamento (SPACING)

```typescript
import { SPACING } from "@/components/design-system/DesignTokens";

SPACING[0]    // 0
SPACING[1]    // 4px
SPACING[2]    // 8px
SPACING[4]    // 16px
SPACING[6]    // 24px
SPACING[8]    // 32px
SPACING[12]   // 48px
SPACING[16]   // 64px
```

### Border Radius (BORDER_RADIUS)

```typescript
import { BORDER_RADIUS } from "@/components/design-system/DesignTokens";

BORDER_RADIUS.sm      // 2px
BORDER_RADIUS.base    // 4px
BORDER_RADIUS.md      // 6px
BORDER_RADIUS.lg      // 8px
BORDER_RADIUS.xl      // 12px
BORDER_RADIUS["2xl"]  // 16px
BORDER_RADIUS.full    // 9999px (circular)
```

### Sombras (SHADOWS)

```typescript
import { SHADOWS } from "@/components/design-system/DesignTokens";

SHADOWS.none          // none
SHADOWS.sm            // Sombra pequena
SHADOWS.base          // Sombra padrão
SHADOWS.lg            // Sombra grande
SHADOWS.xl            // Sombra extra grande
SHADOWS.glow          // Brilho cyan
SHADOWS.glow-strong   // Brilho cyan forte
```

### Transições (TRANSITIONS)

```typescript
import { TRANSITIONS } from "@/components/design-system/DesignTokens";

TRANSITIONS.fast      // 150ms ease-out
TRANSITIONS.base      // 200ms ease-out
TRANSITIONS.slow      // 300ms ease-out
TRANSITIONS.slower    // 500ms ease-out

// Easing functions
TRANSITIONS.easing.linear   // linear
TRANSITIONS.easing.in       // cubic-bezier(0.4, 0, 1, 1)
TRANSITIONS.easing.out      // cubic-bezier(0, 0, 0.2, 1)
TRANSITIONS.easing.inOut    // cubic-bezier(0.4, 0, 0.2, 1)
```

---

## 🧩 Component Library

### Button

```tsx
import { Button } from "@/components/design-system/ComponentLibrary";

// Variantes
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>

// Tamanhos
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// Com ícone
<Button icon={<Plus size={20} />}>Adicionar</Button>

// Loading
<Button loading>Carregando...</Button>

// Full width
<Button fullWidth>Botão em Largura Total</Button>
```

### Card

```tsx
import { Card } from "@/components/design-system/ComponentLibrary";

// Variantes
<Card variant="default">Conteúdo</Card>
<Card variant="elevated">Conteúdo Elevado</Card>
<Card variant="interactive" onClick={() => {}}>Clicável</Card>
```

### Input

```tsx
import { Input } from "@/components/design-system/ComponentLibrary";

// Básico
<Input placeholder="Digite aqui..." />

// Com label
<Input label="Nome" placeholder="Seu nome" />

// Com ícone
<Input icon={<Search size={20} />} placeholder="Buscar..." />

// Com erro
<Input error="Campo obrigatório" />

// Tamanhos
<Input size="sm" />
<Input size="md" />
<Input size="lg" />
```

### Badge

```tsx
import { Badge } from "@/components/design-system/ComponentLibrary";

// Variantes
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>

// Com ícone
<Badge icon={<Star size={16} />}>Featured</Badge>

// Tamanhos
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

### Alert

```tsx
import { Alert } from "@/components/design-system/ComponentLibrary";

<Alert variant="success" title="Sucesso!">
  Operação realizada com sucesso.
</Alert>

<Alert variant="error" title="Erro" onClose={() => {}}>
  Algo deu errado. Tente novamente.
</Alert>
```

### Skeleton

```tsx
import { Skeleton } from "@/components/design-system/ComponentLibrary";

// Carregamento de linha
<Skeleton width="100%" height="20px" />

// Carregamento circular
<Skeleton width="40px" height="40px" circle />

// Múltiplas linhas
<Skeleton count={3} />
```

### Tooltip

```tsx
import { Tooltip } from "@/components/design-system/ComponentLibrary";

<Tooltip content="Clique para editar" position="top">
  <button>Passe o mouse</button>
</Tooltip>
```

### Progress

```tsx
import { Progress } from "@/components/design-system/ComponentLibrary";

<Progress value={65} max={100} showLabel />
<Progress value={80} color="success" />
<Progress value={45} color="warning" size="lg" />
```

### Divider

```tsx
import { Divider } from "@/components/design-system/ComponentLibrary";

// Horizontal
<Divider />
<Divider variant="dashed" />
<Divider label="Ou" />

// Vertical
<Divider orientation="vertical" />
```

---

## 🎯 Advanced Kanban

### Tipos Kanban

```typescript
import { KanbanCard, KanbanColumn, KanbanBoard } from "@/types/kanban";

interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "todo" | "in-progress" | "review" | "done";
  storyPoints?: number;
  assignee?: { id: string; name: string; avatar?: string };
  tags?: KanbanTag[];
  dueDate?: number;
  attachments?: KanbanAttachment[];
  comments?: KanbanComment[];
  checklist?: KanbanChecklistItem[];
  subtasks?: KanbanCard[];
  createdAt: number;
  updatedAt: number;
}

interface KanbanColumn {
  id: string;
  title: string;
  color?: string;
  cards: KanbanCard[];
  limit?: number; // Limite de cards
  collapsed?: boolean;
  position: number;
}
```

### Usando Advanced Kanban

```tsx
import { KanbanAdvanced } from "@/components/cards/types/KanbanAdvanced";

<KanbanAdvanced 
  card={dashboardCard}
  onUpdate={(updatedCard) => {
    // Atualizar card
  }}
/>
```

### Funcionalidades

✅ **Drag-and-Drop** - Arrastar cards entre colunas  
✅ **Story Points** - Estimativas de esforço  
✅ **Prioridades** - Low, Medium, High, Critical  
✅ **Assignees** - Atribuir pessoas com avatares  
✅ **Tags** - Categorização com cores  
✅ **Due Dates** - Datas de vencimento  
✅ **Attachments** - Arquivos anexados  
✅ **Comments** - Discussões em cards  
✅ **Checklists** - Tarefas dentro de cards  
✅ **Subtasks** - Cards aninhados  
✅ **Filtros** - Busca e filtros avançados  
✅ **Limite de Cards** - Controle de capacidade  

---

## 🎨 Figma Integration

### CSS Classes para Animações

```html
<!-- Fade In -->
<div class="animate-fade-in">Conteúdo</div>

<!-- Slide Up -->
<div class="animate-slide-up">Conteúdo</div>

<!-- Scale In -->
<div class="animate-scale-in">Conteúdo</div>

<!-- Pulse -->
<div class="animate-pulse">Carregando...</div>

<!-- Glow -->
<div class="animate-glow">Destaque</div>
```

### Glassmorphism

```html
<!-- Light Glass -->
<div class="glass-light">Conteúdo</div>

<!-- Dark Glass -->
<div class="glass-dark">Conteúdo</div>

<!-- Strong Glass -->
<div class="glass-strong">Conteúdo</div>
```

### Gradients

```html
<!-- Neon Gradient -->
<div class="gradient-neon">Conteúdo</div>

<!-- Purple Gradient -->
<div class="gradient-purple">Conteúdo</div>

<!-- Success Gradient -->
<div class="gradient-success">Conteúdo</div>
```

### Hover Effects

```html
<!-- Lift Effect -->
<div class="hover-lift">Passe o mouse</div>

<!-- Glow Effect -->
<div class="hover-glow">Passe o mouse</div>

<!-- Scale Effect -->
<div class="hover-scale">Passe o mouse</div>
```

### Shadow Effects

```html
<!-- Glow Shadow -->
<div class="shadow-glow">Conteúdo</div>

<!-- Strong Glow -->
<div class="shadow-glow-strong">Conteúdo</div>

<!-- Error Glow -->
<div class="shadow-glow-error">Erro</div>

<!-- Success Glow -->
<div class="shadow-glow-success">Sucesso</div>
```

---

## 📋 Best Practices

### 1. Use Design Tokens

```tsx
// ❌ Evite hardcoding cores
<div style={{ color: "#00d9ff" }}>Texto</div>

// ✅ Use tokens
import { COLORS } from "@/components/design-system/DesignTokens";
<div style={{ color: COLORS.neon.cyan }}>Texto</div>
```

### 2. Componentes Reutilizáveis

```tsx
// ❌ Evite repetir estilos
<button className="px-4 py-2 bg-[#00d9ff] text-[#0a0e27] rounded-lg">
  Botão 1
</button>
<button className="px-4 py-2 bg-[#00d9ff] text-[#0a0e27] rounded-lg">
  Botão 2
</button>

// ✅ Use componentes
<Button>Botão 1</Button>
<Button>Botão 2</Button>
```

### 3. Variantes de Componentes

```tsx
// ✅ Use variantes para diferentes estados
<Button variant="primary">Ação Principal</Button>
<Button variant="secondary">Ação Secundária</Button>
<Button variant="danger">Deletar</Button>
<Button variant="ghost">Cancelar</Button>
```

### 4. Responsive Design

```tsx
// ✅ Use classes de responsividade
<div className="hide-mobile show-desktop">Desktop Only</div>
<div className="show-mobile hide-desktop">Mobile Only</div>
```

### 5. Animações

```tsx
// ✅ Use animações predefinidas
<div className="animate-fade-in">Aparece suavemente</div>
<div className="animate-slide-up">Desliza para cima</div>
<div className="hover-lift">Levanta ao passar o mouse</div>
```

### 6. Acessibilidade

```tsx
// ✅ Sempre use labels
<Input label="Email" placeholder="seu@email.com" />

// ✅ Use focus-ring para navegação por teclado
<button className="focus-ring">Clicável</button>

// ✅ Indique estados de erro
<Input error="Campo obrigatório" />
```

---

## 🚀 Próximos Passos

1. **Integração com Figma** - Sincronizar componentes com Figma
2. **Temas Dinâmicos** - Criar temas customizáveis
3. **Documentação Interativa** - Storybook para componentes
4. **Validação de Acessibilidade** - Auditorias WCAG
5. **Performance** - Otimizar bundle size

---

## 📞 Suporte

Para dúvidas sobre o Design System:
- Consulte `DesignTokens.ts` para valores
- Consulte `ComponentLibrary.tsx` para componentes
- Consulte `design-system.css` para animações

---

**Desenvolvido com ❤️ usando React, TypeScript e Tailwind CSS**
