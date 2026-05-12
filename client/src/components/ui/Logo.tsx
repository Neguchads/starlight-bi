/**
 * Starlight BI - Logo Component
 * Componente reutilizável para exibir o logo em diferentes tamanhos
 */

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const SIZES = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
  xl: "w-12 h-12",
};

const TEXT_SIZES = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

export function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/manus-storage/logo_063e4c18.png"
        alt="Starlight BI"
        className={`${SIZES[size]} rounded-lg flex-shrink-0`}
      />
      {showText && (
        <span
          className={`font-bold bg-gradient-to-r from-[#00d9ff] to-[#ff006e] bg-clip-text text-transparent ${TEXT_SIZES[size]} flex-shrink-0`}
        >
          Starlight BI
        </span>
      )}
    </div>
  );
}
