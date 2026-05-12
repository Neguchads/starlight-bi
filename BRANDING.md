# 🎨 Starlight BI - Branding Guide

**Data**: 12 de Maio de 2026  
**Versão**: 1.0  
**Status**: Logo Profissional Integrado

---

## 📋 Índice

1. [Logo](#logo)
2. [Cores](#cores)
3. [Tipografia](#tipografia)
4. [Ícones](#ícones)
5. [Uso do Logo](#uso-do-logo)
6. [Variantes](#variantes)

---

## 🎯 Logo

### Descrição

O logo do Starlight BI é um design moderno e futurista que combina:
- **Geometria 3D**: Cubos e formas isométricas
- **Gradiente Neon**: Transição de cyan (#00d9ff) para magenta (#ff006e) com roxo (#a100f2)
- **Esfera Central**: Representa dados e análise
- **Conexões**: Linhas que conectam os elementos, simbolizando integração de dados
- **Fundo Dark**: Azul escuro (#0a0e27) para contraste

### Dimensões

| Formato | Tamanho | Uso |
|---------|--------|-----|
| **Favicon** | 32x32px | Browser tab, bookmarks |
| **App Icon** | 192x192px | Mobile home screen |
| **Logo Pequeno** | 64x64px | Sidebar, topbar |
| **Logo Médio** | 128x128px | Headers, cards |
| **Logo Grande** | 256x256px | Landing page, hero |
| **Logo XL** | 512x512px | Social media, marketing |

### Localização dos Arquivos

```
client/public/
├── logo.png          ← Logo principal (1024x1024px)
├── favicon.png       ← Favicon (32x32px)
└── logo-icon.png     ← Apenas ícone (sem texto)
```

---

## 🎨 Cores Oficiais

### Paleta Neon (Starlight BI)

| Cor | Hex | RGB | Uso |
|-----|-----|-----|-----|
| **Cyan** | #00d9ff | rgb(0, 217, 255) | Primária, highlights |
| **Magenta** | #ff006e | rgb(255, 0, 110) | Secundária, accents |
| **Purple** | #a100f2 | rgb(161, 0, 242) | Terciária, gradients |

### Paleta Dark Theme

| Elemento | Hex | RGB | Uso |
|----------|-----|-----|-----|
| **Background** | #0a0e27 | rgb(10, 14, 39) | Fundo principal |
| **Surface** | #141829 | rgb(20, 24, 41) | Cards, modals |
| **Card** | #1a1f3a | rgb(26, 31, 58) | Componentes |
| **Border** | rgba(0,217,255,0.1) | - | Bordas, divisores |
| **Text** | #e0e6ff | rgb(224, 230, 255) | Texto principal |
| **Text Secondary** | #8a95b8 | rgb(138, 149, 184) | Texto secundário |

### Cores Semânticas

| Significado | Hex | Uso |
|-------------|-----|-----|
| **Success** | #52c41a | Confirmações, sucesso |
| **Warning** | #faad14 | Avisos, atenção |
| **Error** | #ff4d4f | Erros, deletar |
| **Info** | #1890ff | Informações, dicas |

---

## 🔤 Tipografia

### Font Stack

```css
/* Sans Serif (Corpo) */
font-family: 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', sans-serif;

/* Monospace (Código) */
font-family: 'Fira Code', 'Courier New', monospace;
```

### Hierarquia de Tamanhos

| Nível | Tamanho | Peso | Uso |
|-------|---------|------|-----|
| **Display** | 36px | 700 | Títulos principais |
| **Heading 1** | 30px | 700 | Títulos de seção |
| **Heading 2** | 24px | 600 | Subtítulos |
| **Heading 3** | 20px | 600 | Subseções |
| **Body Large** | 18px | 400 | Texto destaque |
| **Body** | 16px | 400 | Texto padrão |
| **Body Small** | 14px | 400 | Texto secundário |
| **Caption** | 12px | 400 | Labels, hints |

---

## 🎯 Ícones

### Biblioteca

- **Lucide React**: Ícones principais (24px padrão)
- **Custom SVG**: Ícones específicos do Starlight BI

### Tamanhos Padrão

| Tamanho | Pixels | Uso |
|---------|--------|-----|
| **XS** | 16px | Badges, labels |
| **SM** | 20px | Buttons, inputs |
| **MD** | 24px | Padrão, topbar |
| **LG** | 32px | Headers, cards |
| **XL** | 48px | Hero, destaque |

---

## 📐 Uso do Logo

### Espaçamento Mínimo

O logo deve ter um espaço mínimo ao redor de **8px** (1/4 da altura do logo).

```
┌─────────────────────────────┐
│  8px                        │
│    ┌─────────────────────┐  │
│    │   Logo (64x64px)    │  │
│    └─────────────────────┘  │
│                        8px  │
└─────────────────────────────┘
```

### Proporções

O logo deve manter a proporção **1:1** (quadrado).

```
✅ Correto:     ❌ Incorreto:
┌─────────┐     ┌──────────────┐
│         │     │              │
│  Logo   │     │    Logo      │
│         │     │              │
└─────────┘     └──────────────┘
```

### Fundo

- **Fundo Dark**: Use o logo com cores neon
- **Fundo Light**: Use versão com cores mais escuras (se disponível)
- **Fundo Gradiente**: Certifique-se de contraste suficiente

---

## 🎨 Variantes

### Logo Completo

```
┌──────────────────────────────┐
│  [Logo Icon]  Starlight BI   │
└──────────────────────────────┘
```

**Uso**: TopBar, headers, landing page

### Logo com Texto Horizontal

```
┌──────────────────────────────┐
│  [Logo Icon]                 │
│  Starlight BI                │
└──────────────────────────────┘
```

**Uso**: Sidebar, cards, footers

### Apenas Ícone

```
┌──────────┐
│          │
│ [Logo]   │
│          │
└──────────┘
```

**Uso**: Favicon, app icon, badges

### Logo Invertido

```
[Fundo Dark] [Logo Neon]
[Fundo Light] [Logo Dark]
```

**Uso**: Temas alternativos, modo claro

---

## 🔧 Implementação

### Componente React

```tsx
import { Logo } from "@/components/ui/Logo";

// Variantes
<Logo size="sm" />           {/* 24px */}
<Logo size="md" />           {/* 32px */}
<Logo size="lg" />           {/* 40px */}
<Logo size="xl" />           {/* 48px */}

// Apenas ícone
<Logo size="md" showText={false} />

// Com classe customizada
<Logo size="lg" className="hover:animate-pulse" />
```

### HTML Direto

```html
<!-- Logo com texto -->
<img src="/logo.png" alt="Starlight BI" class="w-8 h-8" />

<!-- Favicon -->
<link rel="icon" type="image/png" href="/favicon.png" />

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" href="/logo.png" />
```

---

## 📱 Responsividade

### Desktop (>1024px)

- Logo: 40px (md)
- Texto: 18px
- Espaçamento: 16px

### Tablet (768px-1024px)

- Logo: 32px (sm)
- Texto: 16px
- Espaçamento: 12px

### Mobile (<768px)

- Logo: 28px (sm)
- Texto: 14px
- Espaçamento: 8px

---

## ✅ Checklist de Branding

- ✅ Logo integrado no TopBar
- ✅ Favicon definido
- ✅ Cores neon aplicadas
- ✅ Tipografia consistente
- ✅ Ícones padronizados
- ✅ Responsividade testada
- ✅ Contraste verificado
- ✅ Documentação completa

---

## 🎓 Referências

- **Logo Design**: Futurismo Minimalista com Glassmorphism
- **Paleta**: Neon Cyan + Magenta + Purple
- **Inspiração**: Power BI, Canva, Obsidian
- **Estilo**: Modern, Tech-forward, Professional

---

**Desenvolvido com ❤️ para Starlight BI**  
**Branding v1.0 - 12 de Maio de 2026**
