/**
 * Starlight BI - Documentation Page
 */

import { useLocation } from "wouter";
import { ChevronRight, BookOpen, Zap, Grid3x3, Filter, Smartphone } from "lucide-react";

export default function Docs() {
  const [, setLocation] = useLocation();

  const sections = [
    {
      id: "getting-started",
      title: "Começando",
      icon: Zap,
      content: "Aprenda o básico do Starlight BI em 5 minutos"
    },
    {
      id: "cards",
      title: "Tipos de Cards",
      icon: Grid3x3,
      content: "Explore os 11 tipos de cards disponíveis"
    },
    {
      id: "filters",
      title: "Filtros Globais",
      icon: Filter,
      content: "Configure filtros que afetam múltiplos gráficos"
    },
    {
      id: "mobile",
      title: "Mobile & Touch",
      icon: Smartphone,
      content: "Gestos touch, pinch-to-zoom e responsividade"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#141829] to-[#0a0e27] text-[#e0e6ff]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,14,39,0.8)] backdrop-blur-md border-b border-[rgba(0,217,255,0.1)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 hover:text-[#00d9ff] transition-colors"
          >
            <img src="/manus-storage/logo_063e4c18.png" alt="Starlight BI" className="w-8 h-8 rounded-lg" />
            <span className="text-lg font-bold bg-gradient-to-r from-[#00d9ff] to-[#ff006e] bg-clip-text text-transparent">
              Starlight BI
            </span>
          </button>
          <button
            onClick={() => setLocation("/dashboard")}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#00d9ff] to-[#ff006e] text-[#0a0e27] font-semibold hover:shadow-lg hover:shadow-[#00d9ff]/50 transition-all duration-300"
          >
            Dashboard
          </button>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,217,255,0.1)] border border-[rgba(0,217,255,0.2)] mb-8">
            <BookOpen size={16} className="text-[#00d9ff]" />
            <span className="text-sm text-[#00d9ff]">Documentação Completa</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#00d9ff] to-[#ff006e] bg-clip-text text-transparent">
              Guia do Starlight BI
            </span>
          </h1>
          <p className="text-xl text-[#8a95b8]">
            Tudo que você precisa saber para dominar o Starlight BI
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mb-12">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                className="p-6 rounded-xl bg-[rgba(10,14,39,0.5)] border border-[rgba(0,217,255,0.1)] hover:border-[rgba(0,217,255,0.3)] transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00d9ff] to-[#a100f2] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon size={24} className="text-[#0a0e27]" />
                  </div>
                  <ChevronRight size={20} className="text-[#8a95b8] group-hover:text-[#00d9ff] transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                <p className="text-[#8a95b8]">{section.content}</p>
              </div>
            );
          })}
        </div>

        {/* Detailed Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Getting Started */}
          <div className="p-8 rounded-xl bg-[rgba(0,217,255,0.05)] border border-[rgba(0,217,255,0.1)]">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Zap className="text-[#00d9ff]" />
              Começando
            </h2>
            <div className="space-y-4 text-[#8a95b8]">
              <p>
                <strong className="text-[#e0e6ff]">1. Acesse o Dashboard</strong> - Clique em "Começar Agora" para acessar o dashboard principal
              </p>
              <p>
                <strong className="text-[#e0e6ff]">2. Adicione um Card</strong> - Use a sidebar esquerda para adicionar elementos (gráficos, tabelas, etc)
              </p>
              <p>
                <strong className="text-[#e0e6ff]">3. Configure seus Dados</strong> - Importe dados via CSV, JSON, PDF, Word ou PowerPoint
              </p>
              <p>
                <strong className="text-[#e0e6ff]">4. Personalize</strong> - Edite cores, títulos, filtros e layout conforme necessário
              </p>
              <p>
                <strong className="text-[#e0e6ff]">5. Salve</strong> - Seus dashboards são salvos automaticamente no navegador
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="p-8 rounded-xl bg-[rgba(255,0,110,0.05)] border border-[rgba(255,0,110,0.1)]">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Grid3x3 className="text-[#ff006e]" />
              Tipos de Cards
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-[#8a95b8]">
              <div>
                <p><strong className="text-[#e0e6ff]">📝 Flashcard</strong> - Texto rico e editável</p>
              </div>
              <div>
                <p><strong className="text-[#e0e6ff]">📊 Tabela</strong> - Dados estruturados e editáveis</p>
              </div>
              <div>
                <p><strong className="text-[#e0e6ff]">📈 Gráfico de Barras</strong> - Comparação de dados</p>
              </div>
              <div>
                <p><strong className="text-[#e0e6ff]">📉 Gráfico de Linha</strong> - Tendências ao longo do tempo</p>
              </div>
              <div>
                <p><strong className="text-[#e0e6ff]">🥧 Gráfico de Pizza</strong> - Proporções e percentuais</p>
              </div>
              <div>
                <p><strong className="text-[#e0e6ff]">🍩 Gráfico de Rosca</strong> - Pizza com centro vazio</p>
              </div>
              <div>
                <p><strong className="text-[#e0e6ff]">📐 Gráfico de Área</strong> - Dados acumulados</p>
              </div>
              <div>
                <p><strong className="text-[#e0e6ff]">📌 KPI/Métrica</strong> - Número grande com variação</p>
              </div>
              <div>
                <p><strong className="text-[#e0e6ff]">🎯 Kanban</strong> - Gerenciamento de tarefas</p>
              </div>
              <div>
                <p><strong className="text-[#e0e6ff]">🖼️ Imagem</strong> - Upload e exibição de imagens</p>
              </div>
              <div>
                <p><strong className="text-[#e0e6ff]">➖ Divisor</strong> - Separador visual</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="p-8 rounded-xl bg-[rgba(161,0,242,0.05)] border border-[rgba(161,0,242,0.1)]">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Filter className="text-[#a100f2]" />
              Filtros Globais
            </h2>
            <div className="space-y-4 text-[#8a95b8]">
              <p>
                Os filtros globais permitem que você filtre dados em múltiplos gráficos simultaneamente. Existem 5 tipos:
              </p>
              <ul className="space-y-2 ml-4">
                <li><strong className="text-[#e0e6ff]">Texto</strong> - Filtro por string</li>
                <li><strong className="text-[#e0e6ff]">Select</strong> - Escolha entre opções</li>
                <li><strong className="text-[#e0e6ff]">Data</strong> - Filtro por data específica</li>
                <li><strong className="text-[#e0e6ff]">Date Range</strong> - Intervalo de datas</li>
                <li><strong className="text-[#e0e6ff]">Número</strong> - Filtro por valor numérico</li>
              </ul>
            </div>
          </div>

          {/* Mobile */}
          <div className="p-8 rounded-xl bg-[rgba(0,217,255,0.05)] border border-[rgba(0,217,255,0.1)]">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Smartphone className="text-[#00d9ff]" />
              Mobile & Touch
            </h2>
            <div className="space-y-4 text-[#8a95b8]">
              <p>
                <strong className="text-[#e0e6ff]">Responsivo</strong> - O Starlight BI funciona perfeitamente em desktop, tablet e mobile
              </p>
              <p>
                <strong className="text-[#e0e6ff]">Swipe</strong> - Deslize da esquerda para abrir/fechar o menu
              </p>
              <p>
                <strong className="text-[#e0e6ff]">Drag</strong> - Arraste cards para reorganizar o layout
              </p>
              <p>
                <strong className="text-[#e0e6ff]">Pinch-to-Zoom</strong> - Use dois dedos para ampliar/reduzir gráficos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(0,217,255,0.1)] py-12 px-4 mt-20">
        <div className="max-w-6xl mx-auto text-center text-[#8a95b8]">
          <p>&copy; 2026 Starlight BI. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
