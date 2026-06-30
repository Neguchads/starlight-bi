/**
 * Starlight BI - Landing Page
 * Hero section, features showcase, CTA
 */

import { useLocation } from "wouter";
import { ArrowRight, Zap, BarChart3, Layers, Smartphone, Lock, Rocket } from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#141829] to-[#0a0e27] text-[#e0e6ff] overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,14,39,0.8)] backdrop-blur-md border-b border-[rgba(0,217,255,0.1)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/manus-storage/logo_063e4c18.png" alt="Starlight BI" className="w-8 h-8 rounded-lg" />
            <span className="text-lg font-bold bg-gradient-to-r from-[#00d9ff] to-[#ff006e] bg-clip-text text-transparent">
              Starlight BI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation("/docs")}
              className="text-[#8a95b8] hover:text-[#00d9ff] transition-colors"
            >
              Docs
            </button>
            <button
              onClick={() => setLocation("/dashboard")}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#00d9ff] to-[#ff006e] text-[#0a0e27] font-semibold hover:shadow-lg hover:shadow-[#00d9ff]/50 transition-all duration-300"
            >
              Começar
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,217,255,0.1)] border border-[rgba(0,217,255,0.2)] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00d9ff] animate-pulse"></span>
            <span className="text-sm text-[#00d9ff]">Novo: Design System Completo</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#00d9ff] via-[#a100f2] to-[#ff006e] bg-clip-text text-transparent">
              Dashboard Visual
            </span>
            <br />
            <span className="text-[#e0e6ff]">Totalmente Editável</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-[#8a95b8] mb-8 max-w-3xl mx-auto leading-relaxed">
            Power BI meets Canva meets Obsidian. Crie dashboards profissionais com drag-and-drop, filtros globais, e 11 tipos de cards em tempo real.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => setLocation("/dashboard")}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-[#00d9ff] to-[#ff006e] text-[#0a0e27] font-bold text-lg hover:shadow-lg hover:shadow-[#00d9ff]/50 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Começar Agora
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 rounded-lg border border-[rgba(0,217,255,0.3)] text-[#00d9ff] font-bold text-lg hover:bg-[rgba(0,217,255,0.1)] transition-all duration-300"
            >
              Saiba Mais
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
            <div className="p-4 rounded-lg bg-[rgba(0,217,255,0.05)] border border-[rgba(0,217,255,0.1)]">
              <div className="text-3xl font-bold text-[#00d9ff]">11+</div>
              <div className="text-sm text-[#8a95b8]">Tipos de Cards</div>
            </div>
            <div className="p-4 rounded-lg bg-[rgba(255,0,110,0.05)] border border-[rgba(255,0,110,0.1)]">
              <div className="text-3xl font-bold text-[#ff006e]">5</div>
              <div className="text-sm text-[#8a95b8]">Filtros Globais</div>
            </div>
            <div className="p-4 rounded-lg bg-[rgba(161,0,242,0.05)] border border-[rgba(161,0,242,0.1)]">
              <div className="text-3xl font-bold text-[#a100f2]">100%</div>
              <div className="text-sm text-[#8a95b8]">Responsivo</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-[rgba(0,217,255,0.02)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Tudo que você precisa
            </h2>
            <p className="text-xl text-[#8a95b8]">
              Funcionalidades profissionais para criar dashboards incríveis
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl bg-[rgba(10,14,39,0.5)] border border-[rgba(0,217,255,0.1)] hover:border-[rgba(0,217,255,0.3)] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00d9ff] to-[#a100f2] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap size={24} className="text-[#0a0e27]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Drag & Drop</h3>
              <p className="text-[#8a95b8]">
                Arraste e redimensione cards livremente. Seu layout, sua forma.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl bg-[rgba(10,14,39,0.5)] border border-[rgba(255,0,110,0.1)] hover:border-[rgba(255,0,110,0.3)] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ff006e] to-[#a100f2] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 size={24} className="text-[#0a0e27]" />
              </div>
              <h3 className="text-xl font-bold mb-2">11 Tipos de Cards</h3>
              <p className="text-[#8a95b8]">
                Gráficos, tabelas, KPI, Kanban, flashcards e muito mais.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl bg-[rgba(10,14,39,0.5)] border border-[rgba(161,0,242,0.1)] hover:border-[rgba(161,0,242,0.3)] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#a100f2] to-[#00d9ff] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers size={24} className="text-[#0a0e27]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Filtros Globais</h3>
              <p className="text-[#8a95b8]">
                Aplique filtros que atualizam múltiplos gráficos simultaneamente.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-xl bg-[rgba(10,14,39,0.5)] border border-[rgba(0,217,255,0.1)] hover:border-[rgba(0,217,255,0.3)] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00d9ff] to-[#ff006e] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Smartphone size={24} className="text-[#0a0e27]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mobile First</h3>
              <p className="text-[#8a95b8]">
                Funciona perfeitamente em desktop, tablet e mobile com gestos touch.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-xl bg-[rgba(10,14,39,0.5)] border border-[rgba(255,0,110,0.1)] hover:border-[rgba(255,0,110,0.3)] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ff006e] to-[#a100f2] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Lock size={24} className="text-[#0a0e27]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Persistência Local</h3>
              <p className="text-[#8a95b8]">
                Seus dashboards são salvos automaticamente no navegador.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-xl bg-[rgba(10,14,39,0.5)] border border-[rgba(161,0,242,0.1)] hover:border-[rgba(161,0,242,0.3)] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#a100f2] to-[#ff006e] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Rocket size={24} className="text-[#0a0e27]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Design System</h3>
              <p className="text-[#8a95b8]">
                100+ tokens, componentes reutilizáveis e animações fluidas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para criar dashboards incríveis?
          </h2>
          <p className="text-xl text-[#8a95b8] mb-8">
            Comece agora gratuitamente. Sem cartão de crédito necessário.
          </p>
          <button
            onClick={() => setLocation("/dashboard")}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-[#00d9ff] to-[#ff006e] text-[#0a0e27] font-bold text-lg hover:shadow-lg hover:shadow-[#00d9ff]/50 transition-all duration-300 inline-flex items-center gap-2 group"
          >
            Começar Agora
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(0,217,255,0.1)] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/manus-storage/logo_063e4c18.png" alt="Starlight BI" className="w-6 h-6 rounded" />
                <span className="font-bold text-[#00d9ff]">Starlight BI</span>
              </div>
              <p className="text-[#8a95b8] text-sm">
                Dashboard visual profissional, totalmente editável.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-[#8a95b8] text-sm">
                <li><button onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-[#00d9ff] transition-colors">Features</button></li>
                <li><button onClick={() => setLocation("/docs")} className="hover:text-[#00d9ff] transition-colors">Documentação</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Comunidade</h4>
              <ul className="space-y-2 text-[#8a95b8] text-sm">
                <li><a href="https://github.com/Neguchads/starlight-bi" target="_blank" rel="noopener noreferrer" className="hover:text-[#00d9ff] transition-colors">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-[#8a95b8] text-sm">
                <li><a href="#" className="hover:text-[#00d9ff] transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-[#00d9ff] transition-colors">Termos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[rgba(0,217,255,0.1)] pt-8 text-center text-[#8a95b8] text-sm">
            <p>&copy; 2026 Starlight BI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
