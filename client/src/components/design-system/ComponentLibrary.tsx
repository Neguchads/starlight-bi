/**
 * Starlight BI - Component Library (Figma-like)
 * Componentes reutilizáveis com variantes e slots
 */

import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from "react";
import { COMPONENT_VARIANTS, SPACING, BORDER_RADIUS, SHADOWS } from "./DesignTokens";

// ==================== BUTTON COMPONENT ====================
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  icon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  loading,
  fullWidth,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const variantStyles = COMPONENT_VARIANTS.button[variant];
  const sizeClasses = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-lg
        transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantStyles.bg} ${variantStyles.text}
        ${variantStyles.hover} ${variantStyles.active}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <span className="animate-spin">⟳</span>}
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

// ==================== CARD COMPONENT ====================
interface CardProps {
  variant?: "default" | "elevated" | "interactive";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({
  variant = "default",
  children,
  className = "",
  onClick,
}: CardProps) {
  const variantStyles = COMPONENT_VARIANTS.card[variant];

  return (
    <div
      className={`
        ${variantStyles.bg} border ${variantStyles.border}
        rounded-lg p-4 transition-all duration-200
        ${"hover" in variantStyles ? variantStyles.hover : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// ==================== INPUT COMPONENT ====================
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: "sm" | "md" | "lg";
  error?: string;
  label?: string;
  icon?: ReactNode;
}

export function Input({
  size = "md",
  error,
  label,
  icon,
  className = "",
  ...props
}: InputProps) {
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#e0e6ff] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a95b8]">
            {icon}
          </span>
        )}
        <input
          className={`
            w-full ${sizeClasses[size]} ${icon ? "pl-10" : ""}
            bg-[rgba(0,217,255,0.05)] border border-[rgba(0,217,255,0.2)]
            rounded-lg text-[#e0e6ff] placeholder-[#8a95b8]
            focus:outline-none focus:border-[#00d9ff] focus:ring-1 focus:ring-[#00d9ff]
            transition-all duration-200
            ${error ? "border-[#ff006e] focus:ring-[#ff006e]" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-[#ff006e] mt-1">{error}</p>}
    </div>
  );
}

// ==================== BADGE COMPONENT ====================
interface BadgeProps {
  variant?: "primary" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  icon?: ReactNode;
}

export function Badge({
  variant = "primary",
  size = "md",
  children,
  icon,
}: BadgeProps) {
  const variantColors = {
    primary: "bg-[rgba(0,217,255,0.2)] text-[#00d9ff] border-[rgba(0,217,255,0.3)]",
    success: "bg-[rgba(82,196,26,0.2)] text-[#52c41a] border-[rgba(82,196,26,0.3)]",
    warning:
      "bg-[rgba(250,173,20,0.2)] text-[#faad14] border-[rgba(250,173,20,0.3)]",
    error: "bg-[rgba(255,77,79,0.2)] text-[#ff4d4f] border-[rgba(255,77,79,0.3)]",
    info: "bg-[rgba(24,144,255,0.2)] text-[#1890ff] border-[rgba(24,144,255,0.3)]",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1 font-medium rounded-full
        border ${variantColors[variant]} ${sizeClasses[size]}
      `}
    >
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
}

// ==================== ALERT COMPONENT ====================
interface AlertProps {
  variant?: "success" | "warning" | "error" | "info";
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  onClose?: () => void;
}

export function Alert({
  variant = "info",
  title,
  children,
  icon,
  onClose,
}: AlertProps) {
  const variantColors = {
    success: {
      bg: "bg-[rgba(82,196,26,0.1)]",
      border: "border-[rgba(82,196,26,0.3)]",
      text: "text-[#52c41a]",
    },
    warning: {
      bg: "bg-[rgba(250,173,20,0.1)]",
      border: "border-[rgba(250,173,20,0.3)]",
      text: "text-[#faad14]",
    },
    error: {
      bg: "bg-[rgba(255,77,79,0.1)]",
      border: "border-[rgba(255,77,79,0.3)]",
      text: "text-[#ff4d4f]",
    },
    info: {
      bg: "bg-[rgba(24,144,255,0.1)]",
      border: "border-[rgba(24,144,255,0.3)]",
      text: "text-[#1890ff]",
    },
  };

  const colors = variantColors[variant];

  return (
    <div
      className={`
        ${colors.bg} border ${colors.border} rounded-lg p-4
        flex gap-3 items-start
      `}
    >
      {icon && <span className={colors.text}>{icon}</span>}
      <div className="flex-1">
        {title && (
          <h4 className={`font-semibold ${colors.text} mb-1`}>{title}</h4>
        )}
        <p className="text-[#8a95b8] text-sm">{children}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-[#8a95b8] hover:text-[#e0e6ff] transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
}

// ==================== SKELETON COMPONENT ====================
interface SkeletonProps {
  width?: string;
  height?: string;
  circle?: boolean;
  count?: number;
  className?: string;
}

export function Skeleton({
  width = "100%",
  height = "20px",
  circle,
  count = 1,
  className = "",
}: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`
            bg-[rgba(0,217,255,0.1)] animate-pulse
            ${circle ? "rounded-full" : "rounded-lg"}
            ${className}
          `}
          style={{ width, height }}
        />
      ))}
    </>
  );
}

// ==================== TOOLTIP COMPONENT ====================
interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({
  content,
  children,
  position = "top",
}: TooltipProps) {
  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  return (
    <div className="relative inline-block group">
      {children}
      <div
        className={`
          absolute ${positionClasses[position]} left-1/2 -translate-x-1/2
          px-3 py-2 bg-[#0a0e27] border border-[rgba(0,217,255,0.2)]
          rounded-lg text-sm text-[#e0e6ff] whitespace-nowrap
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          pointer-events-none z-50
        `}
      >
        {content}
      </div>
    </div>
  );
}

// ==================== PROGRESS COMPONENT ====================
interface ProgressProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  color?: "primary" | "success" | "warning" | "error";
}

export function Progress({
  value,
  max = 100,
  size = "md",
  showLabel,
  color = "primary",
}: ProgressProps) {
  const percentage = (value / max) * 100;

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const colorClasses = {
    primary: "bg-[#00d9ff]",
    success: "bg-[#52c41a]",
    warning: "bg-[#faad14]",
    error: "bg-[#ff4d4f]",
  };

  return (
    <div>
      <div
        className={`w-full ${sizeClasses[size]} bg-[rgba(0,217,255,0.1)] rounded-full overflow-hidden`}
      >
        <div
          className={`${sizeClasses[size]} ${colorClasses[color]} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-[#8a95b8] mt-1">{Math.round(percentage)}%</p>
      )}
    </div>
  );
}

// ==================== DIVIDER COMPONENT ====================
interface DividerProps {
  variant?: "solid" | "dashed" | "dotted";
  orientation?: "horizontal" | "vertical";
  label?: string;
  className?: string;
}

export function Divider({
  variant = "solid",
  orientation = "horizontal",
  label,
  className = "",
}: DividerProps) {
  const borderStyles = {
    solid: "border-solid",
    dashed: "border-dashed",
    dotted: "border-dotted",
  };

  if (orientation === "vertical") {
    return (
      <div
        className={`h-full w-px border-l border-[rgba(0,217,255,0.1)] ${borderStyles[variant]} ${className}`}
      />
    );
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div
        className={`flex-1 border-t border-[rgba(0,217,255,0.1)] ${borderStyles[variant]}`}
      />
      {label && <span className="text-sm text-[#8a95b8]">{label}</span>}
      <div
        className={`flex-1 border-t border-[rgba(0,217,255,0.1)] ${borderStyles[variant]}`}
      />
    </div>
  );
}
