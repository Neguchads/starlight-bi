# Starlight BI

**Dashboard visual editável, arrastável e redimensionável** — Uma aplicação web moderna que combina a potência do Power BI, a criatividade do Canva e a elegância do Obsidian.

## 🌟 Características Principais

### Dashboard Interativo
- **Grid arrastável e redimensionável** com React-Grid-Layout
- **11 tipos de elementos** para criar dashboards personalizados
- **Modo edição/preview** para alternar entre criação e visualização
- **Persistência automática** em localStorage
- **Exportar/Importar** dashboards em JSON

### Tipos de Cards Suportados
1. **Flashcard** — Texto rico editável com formatação
2. **Tabela** — Dados tabulares com suporte a múltiplas colunas
3. **Gráfico Pizza** — Visualização de proporções
4. **Gráfico Barras** — Comparação de valores
5. **Gráfico Linha** — Tendências ao longo do tempo
6. **Gráfico Rosca** — Variação da pizza com furo central
7. **Gráfico Área** — Preenchimento sob linhas
8. **Kanban** — Organização de tarefas em colunas
9. **KPI/Métrica** — Números grandes com indicadores de tendência
10. **Imagem** — Upload e exibição de imagens
11. **Divisor** — Separadores visuais

### Design Futurista
- **Glassmorphism** com backdrop blur
- **Paleta neon**: Ciano (#00d9ff), Magenta (#ff006e), Roxo (#a100f2)
- **Tema dark** como padrão (estilo Obsidian)
- **Animações fluidas** e hover effects
- **Interface minimalista** e intuitiva

### Gerenciamento de Dados
- **Store centralizado** com Zustand
- **Múltiplas fontes de dados** (JSON, CSV, Excel)
- **Atualização em tempo real** de gráficos
- **Sincronização automática** entre cards e dados

## 🚀 Começando

### Pré-requisitos
- Node.js 18+
- pnpm 10+

### Instalação

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

## 📦 Stack Tecnológico

- **React 19** — Framework UI
- **Vite** — Build tool e dev server
- **TypeScript** — Type safety
- **Tailwind CSS 4** — Styling
- **Zustand** — State management
- **React-Grid-Layout** — Grid arrastável
- **ApexCharts** — Visualização de dados
- **TipTap** — Editor de texto rico
- **Lucide React** — Ícones
- **shadcn/ui** — Componentes UI

## 🎨 Arquitetura

```
client/src/
├── components/
│   ├── layout/
│   │   ├── TopBar.tsx          # Barra superior com ações
│   │   ├── Sidebar.tsx         # Menu lateral com elementos
│   │   └── Dashboard.tsx       # Grid principal
│   └── cards/
│       ├── DashboardCard.tsx   # Card wrapper
│       ├── CardContent.tsx     # Router de tipos
│       └── types/
│           ├── FlashcardContent.tsx
│           ├── TableContent.tsx
│           ├── ChartContent.tsx
│           ├── KPIContent.tsx
│           ├── KanbanContent.tsx
│           ├── ImageContent.tsx
│           └── DividerContent.tsx
├── store/
│   └── dashboardStore.ts       # Zustand store
├── types/
│   └── index.ts                # TypeScript definitions
├── styles/
│   └── grid.css                # Estilos do grid
├── App.tsx                     # Componente principal
└── main.tsx                    # Entry point
```

## 💡 Como Usar

### Adicionar um Card
1. Clique em um tipo de elemento na sidebar
2. O card será adicionado ao dashboard
3. Arraste para reposicionar
4. Redimensione pelas bordas

### Editar um Card
1. Clique no card para selecioná-lo
2. Use os botões de configuração (⚙️) ou delete (✕)
3. Edite o conteúdo diretamente no card

### Gerenciar Dados
1. Acesse a seção "Dados" na sidebar
2. Faça upload de CSV/Excel ou use o editor JSON
3. Os gráficos atualizam automaticamente

### Exportar/Importar
- **Exportar**: Clique no botão de download na topbar
- **Importar**: Clique no botão de upload e selecione um JSON

### Alternar Tema
- Use o botão de sol/lua na topbar
- Tema dark (padrão) ou light

## 🎯 Funcionalidades Futuras

- [ ] Integração com APIs externas
- [ ] Colaboração em tempo real
- [ ] Temas customizáveis
- [ ] Mais tipos de gráficos (scatter, bubble, etc)
- [ ] Filtros globais
- [ ] Agendamento de atualizações
- [ ] Exportar para PDF/PNG
- [ ] Modo apresentação

## 🛠️ Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run dev

# Build para produção
pnpm run build

# Preview de produção
pnpm run preview

# Type checking
pnpm run check

# Formatação de código
pnpm run format
```

### Estrutura de Tipos

Todos os tipos são definidos em `client/src/types/index.ts`:

- `DashboardCard` — Estrutura de um card
- `CardConfig` — Configuração específica de cada tipo
- `Dashboard` — Estrutura completa do dashboard
- `DataSource` — Fonte de dados
- `CardType` — Union type de tipos de cards

### Store Zustand

O store em `client/src/store/dashboardStore.ts` gerencia:

- Criação/carregamento de dashboards
- CRUD de cards
- Gerenciamento de dados
- Persistência em localStorage
- Export/import de JSON

## 🎨 Design System

### Paleta de Cores
- **Background**: `#0a0e27` (azul-preto profundo)
- **Primary**: `#00d9ff` (ciano neon)
- **Secondary**: `#ff006e` (magenta neon)
- **Accent**: `#a100f2` (roxo neon)
- **Text**: `#e0e6ff` (branco suave)
- **Muted**: `#8a95b8` (cinza azulado)

### Tipografia
- **Display**: Courier Prime (monospace bold)
- **Body**: Inter Light (sans-serif)
- **Accent**: Courier Prime para números

### Componentes
- Glassmorphism com `backdrop-blur-md`
- Bordas suaves com `rounded-lg`
- Sombras sutis com `shadow-[...]`
- Transições fluidas com `transition-all duration-300`

## 📝 Licença

MIT

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📧 Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Starlight BI** — Transforme dados em insights visuais ✨
