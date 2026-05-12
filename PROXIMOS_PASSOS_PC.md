# 🖥️ Próximos Passos - Desenvolvimento em PC

**Data**: 12 de Maio de 2026  
**Versão Atual**: 1.5 (831c8d63)  
**Status**: Pronto para continuar desenvolvimento em PC

---

## 📌 O Que Fazer Agora

### 1️⃣ Preparar Ambiente Local (PC)

#### Pré-requisitos
```bash
# Verificar versões
node --version      # Deve ser 18+
npm --version       # Deve ser 9+
git --version       # Deve estar instalado
```

#### Clonar/Copiar Projeto
```bash
# Opção 1: Se tiver Git
git clone <seu-repositorio> starlight-bi
cd starlight-bi

# Opção 2: Baixar ZIP
# Baixe o projeto da Manus UI e extraia

# Opção 3: Copiar manualmente
cp -r /home/ubuntu/flashbi ~/Projetos/starlight-bi
cd ~/Projetos/starlight-bi
```

#### Instalar Dependências
```bash
# Usar pnpm (recomendado)
pnpm install

# Ou npm
npm install

# Ou yarn
yarn install
```

#### Rodar Localmente
```bash
pnpm run dev
# Abrirá em http://localhost:5173 (ou próxima porta disponível)
```

---

### 2️⃣ Estrutura do Projeto (Referência Rápida)

```
starlight-bi/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/     ← TopBar, Sidebar, Dashboard
│   │   │   ├── cards/      ← Card types (Chart, Table, etc)
│   │   │   └── ui/         ← shadcn/ui components
│   │   ├── hooks/          ← Custom hooks (useIsMobile, usePinchZoom, etc)
│   │   ├── store/          ← Zustand store
│   │   ├── types/          ← TypeScript interfaces
│   │   ├── lib/            ← Utilities (fileParser, etc)
│   │   ├── styles/         ← CSS (grid.css, touch.css)
│   │   ├── App.tsx         ← Root component
│   │   ├── main.tsx        ← Entry point
│   │   └── index.css       ← Global styles
│   ├── index.html          ← HTML template
│   └── public/             ← Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
├── README.md               ← Guia de uso
├── RESUMO_COMPLETO.md      ← Este resumo
└── PROXIMOS_PASSOS_PC.md   ← Este arquivo
```

---

### 3️⃣ Tarefas Imediatas (Fáceis)

#### ✅ Tarefa 1: Double-Tap para Editar
**Arquivo**: `client/src/hooks/useDoubleTap.ts`

```typescript
// Criar novo hook para detectar double-tap
export function useDoubleTap(callback: () => void, delay = 300) {
  const lastTapRef = useRef<number>(0);
  
  const handleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < delay) {
      callback();
    }
    lastTapRef.current = now;
  };
  
  return handleTap;
}
```

**Integração**: Adicionar em `DashboardCardMobile.tsx`

---

#### ✅ Tarefa 2: Swipe para Deletar
**Arquivo**: `client/src/hooks/useSwipeDelete.ts`

```typescript
// Detectar swipe esquerda para deletar
export function useSwipeDelete(onDelete: () => void) {
  const [startX, setStartX] = useState(0);
  
  const handleTouchStart = (e: TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };
  
  const handleTouchEnd = (e: TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 100) { // Swipe 100px para esquerda
      onDelete();
    }
  };
  
  return { handleTouchStart, handleTouchEnd };
}
```

**Integração**: Adicionar em `DashboardCardMobile.tsx`

---

#### ✅ Tarefa 3: Salvar Filtros em localStorage
**Arquivo**: `client/src/store/dashboardStore.ts`

```typescript
// No store, adicionar persistência de filtros
const persistFilters = () => {
  localStorage.setItem(
    'starlight-filters',
    JSON.stringify(store.getState().globalFilters)
  );
};

const loadFilters = () => {
  const saved = localStorage.getItem('starlight-filters');
  if (saved) {
    store.setState({ globalFilters: JSON.parse(saved) });
  }
};
```

---

### 4️⃣ Tarefas Médias (Moderadas)

#### 🔄 Tarefa 4: Compartilhamento de Dashboards
**Arquivos**: 
- `client/src/lib/shareUtils.ts` (novo)
- `client/src/components/layout/ShareModal.tsx` (novo)

**Fluxo**:
1. Gerar ID único para dashboard
2. Codificar dados em URL (ou usar ID curto)
3. Criar link compartilhável
4. Modo "view-only" para links compartilhados

```typescript
// Exemplo de URL compartilhada
https://starlight-bi.com/share/abc123def456

// No App.tsx, detectar rota /share/:id
// Carregar dashboard em modo read-only
```

---

#### 🔄 Tarefa 5: Temas Customizáveis
**Arquivos**:
- `client/src/components/modals/ThemeEditor.tsx` (novo)
- `client/src/lib/themeUtils.ts` (novo)

**Implementação**:
1. Criar editor de cores com color picker
2. Salvar tema em localStorage
3. Aplicar tema dinamicamente via CSS variables

```typescript
// Exemplo de tema customizado
const customTheme = {
  primary: '#00d9ff',
  secondary: '#ff006e',
  accent: '#a100f2',
  background: '#0a0e27',
  card: '#141829',
};
```

---

#### 🔄 Tarefa 6: Histórico de Versões (Undo/Redo)
**Arquivo**: `client/src/hooks/useHistory.ts` (novo)

```typescript
// Hook para gerenciar histórico
export function useHistory<T>(initialState: T) {
  const [history, setHistory] = useState<T[]>([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const push = (state: T) => {
    setHistory([...history.slice(0, currentIndex + 1), state]);
    setCurrentIndex(currentIndex + 1);
  };
  
  const undo = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  
  const redo = () => {
    if (currentIndex < history.length - 1) setCurrentIndex(currentIndex + 1);
  };
  
  return { current: history[currentIndex], push, undo, redo };
}
```

---

### 5️⃣ Tarefas Complexas (Avançadas)

#### 🚀 Tarefa 7: Integração com APIs Externas
**Arquivo**: `client/src/lib/apiIntegration.ts` (novo)

```typescript
// Exemplo: Conectar a API pública
export async function fetchDataFromAPI(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return parseAPIResponse(data); // Converter para formato do dashboard
}

// Usar em cards
const { data } = useEffect(() => {
  fetchDataFromAPI('https://api.example.com/data')
    .then(data => updateDataSource(data));
}, []);
```

**Suporte para**:
- REST APIs (GET, POST)
- GraphQL
- Webhooks para atualização em tempo real
- Autenticação (Bearer, API Key)

---

#### 🚀 Tarefa 8: Colaboração em Tempo Real
**Dependência**: `socket.io-client`

```bash
pnpm add socket.io-client
```

**Arquivo**: `client/src/hooks/useRealtimeSync.ts` (novo)

```typescript
// Sincronizar mudanças entre usuários
export function useRealtimeSync(dashboardId: string) {
  const socket = useRef(io('https://your-server.com'));
  
  useEffect(() => {
    socket.current.on('card-updated', (card) => {
      updateCard(card); // Atualizar store
    });
    
    return () => socket.current.disconnect();
  }, []);
  
  const syncChange = (change: any) => {
    socket.current.emit('change', { dashboardId, change });
  };
  
  return { syncChange };
}
```

---

### 6️⃣ Checklist de Desenvolvimento

#### Antes de Começar
- [ ] Clonar/copiar projeto para PC
- [ ] Instalar dependências (`pnpm install`)
- [ ] Rodar localmente (`pnpm run dev`)
- [ ] Testar em desktop e mobile (DevTools)
- [ ] Revisar código existente

#### Desenvolvimento
- [ ] Criar branch para cada feature (`git checkout -b feature/double-tap`)
- [ ] Implementar feature
- [ ] Testar em desktop e mobile
- [ ] Fazer commit com mensagem clara
- [ ] Push para repositório

#### Antes de Publicar
- [ ] Executar `pnpm run build`
- [ ] Verificar erros de TypeScript (`pnpm run check`)
- [ ] Testar build em produção
- [ ] Fazer checkpoint final
- [ ] Publicar via Manus UI

---

### 7️⃣ Comandos Úteis

```bash
# Desenvolvimento
pnpm run dev              # Rodar em desenvolvimento
pnpm run build            # Build para produção
pnpm run preview          # Preview do build
pnpm run check            # Verificar tipos TypeScript

# Linting & Formatting
pnpm run format           # Formatar código com Prettier
pnpm run lint             # Verificar linting

# Git
git status                # Ver mudanças
git add .                 # Adicionar tudo
git commit -m "msg"       # Fazer commit
git push                  # Push para repositório
git pull                  # Puxar mudanças

# Debugging
# Abrir DevTools: F12 ou Cmd+Opt+I
# Console: Verificar erros
# Network: Verificar requisições
# Performance: Analisar performance
```

---

### 8️⃣ Estrutura de Commits

```bash
# Feature
git commit -m "feat: adicionar double-tap para editar cards"

# Bug fix
git commit -m "fix: corrigir zoom em tabelas no Safari"

# Refactor
git commit -m "refactor: simplificar lógica de filtros"

# Docs
git commit -m "docs: atualizar README com novo recurso"

# Style
git commit -m "style: ajustar espaçamento no FilterBar"
```

---

### 9️⃣ Troubleshooting

#### Problema: "Port 5173 já está em uso"
```bash
# Usar porta diferente
pnpm run dev -- --port 3001
```

#### Problema: "Module not found"
```bash
# Limpar cache e reinstalar
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### Problema: "TypeScript errors"
```bash
# Verificar tipos
pnpm run check

# Corrigir automaticamente
pnpm run format
```

#### Problema: "Build falha"
```bash
# Verificar erros
pnpm run build

# Limpar dist
rm -rf dist
pnpm run build
```

---

### 🔟 Recursos Úteis

**Documentação**
- React: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- TypeScript: https://www.typescriptlang.org
- Zustand: https://github.com/pmndrs/zustand
- Vite: https://vitejs.dev

**Ferramentas**
- VS Code: https://code.visualstudio.com
- DevTools: F12 no navegador
- Git: https://git-scm.com

**Extensões VS Code Recomendadas**
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin
- Prettier - Code formatter
- ESLint

---

## 📊 Roadmap de Desenvolvimento

### Semana 1
- [ ] Double-tap para editar
- [ ] Swipe para deletar
- [ ] Salvar filtros
- [ ] Testes em mobile

### Semana 2
- [ ] Compartilhamento de dashboards
- [ ] Temas customizáveis
- [ ] Histórico de versões
- [ ] Otimização de performance

### Semana 3
- [ ] Integração com APIs
- [ ] Autenticação de usuários
- [ ] Banco de dados
- [ ] Deploy em produção

### Semana 4+
- [ ] Colaboração em tempo real
- [ ] Exportar para PDF/PPT
- [ ] Mobile app nativa
- [ ] Integração com BI tools

---

## 💡 Dicas Importantes

1. **Sempre testar em mobile** - Use DevTools (F12 → Toggle device toolbar)
2. **Commit frequente** - Facilita rollback se algo quebrar
3. **Documentar mudanças** - Adicionar comentários no código
4. **Revisar performance** - Usar DevTools Performance tab
5. **Manter tipos atualizados** - TypeScript é seu amigo!

---

## 🎯 Objetivo Final

Transformar o Starlight BI em uma **plataforma profissional de dashboards** com:
- ✅ Interface intuitiva e responsiva
- ✅ Dados em tempo real
- ✅ Colaboração entre usuários
- ✅ Exportação de relatórios
- ✅ Integração com ferramentas populares

---

**Bom desenvolvimento! 🚀**

Qualquer dúvida, consulte:
- README.md (guia de uso)
- RESUMO_COMPLETO.md (visão geral)
- Código comentado nos componentes
