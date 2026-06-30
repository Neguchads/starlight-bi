import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#0a0e27] to-[#141829]">
      <Card className="w-full max-w-lg mx-4 shadow-lg border border-[rgba(0,217,255,0.2)] bg-[rgba(20,24,41,0.8)] backdrop-blur-sm">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-[rgba(255,0,110,0.2)] rounded-full animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-[#ff006e]" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-[#e0e6ff] mb-2">404</h1>

          <h2 className="text-xl font-semibold text-[#8a95b8] mb-4">
            Página Não Encontrada
          </h2>

          <p className="text-[#8a95b8] mb-8 leading-relaxed">
            Desculpe, a página que você procura não existe.
            <br />
            Ela pode ter sido movida ou deletada.
          </p>

          <div
            id="not-found-button-group"
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              onClick={handleGoHome}
              className="bg-gradient-to-r from-[#00d9ff] to-[#ff006e] text-[#0a0e27] font-bold px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[#00d9ff]/50"
            >
              <Home className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
