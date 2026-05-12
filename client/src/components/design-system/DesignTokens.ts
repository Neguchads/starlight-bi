/**
 * Starlight BI - Design System Tokens (Figma-like)
 * Sistema de design tokens para componentes reutilizáveis
 */

// ==================== COLORS ====================
export const COLORS = {
  // Primary
  primary: {
    50: "#e6f7ff",
    100: "#bae7ff",
    200: "#91d5ff",
    300: "#69c0ff",
    400: "#40a9ff",
    500: "#1890ff",
    600: "#0050b3",
    700: "#003a8c",
    800: "#002766",
    900: "#001a40",
  },

  // Neon (Starlight BI)
  neon: {
    cyan: "#00d9ff",
    magenta: "#ff006e",
    purple: "#a100f2",
  },

  // Semantic
  success: "#52c41a",
  warning: "#faad14",
  error: "#ff4d4f",
  info: "#1890ff",

  // Neutral
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },

  // Dark theme (Obsidian-like)
  dark: {
    bg: "#0a0e27",
    surface: "#141829",
    card: "#1a1f3a",
    border: "rgba(0, 217, 255, 0.1)",
    text: "#e0e6ff",
    textSecondary: "#8a95b8",
  },
};

// ==================== TYPOGRAPHY ====================
export const TYPOGRAPHY = {
  // Font families
  fontFamily: {
    sans: "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', sans-serif",
    mono: "'Fira Code', 'Courier New', monospace",
  },

  // Font sizes
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
  },

  // Font weights
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Line heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter spacing
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
};

// ==================== SPACING ====================
export const SPACING = {
  0: "0",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
};

// ==================== BORDER RADIUS ====================
export const BORDER_RADIUS = {
  none: "0",
  sm: "0.125rem", // 2px
  base: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px",
};

// ==================== SHADOWS ====================
export const SHADOWS = {
  none: "none",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  glow: "0 0 20px rgba(0, 217, 255, 0.3)",
  "glow-strong": "0 0 40px rgba(0, 217, 255, 0.5)",
};

// ==================== TRANSITIONS ====================
export const TRANSITIONS = {
  fast: "150ms ease-out",
  base: "200ms ease-out",
  slow: "300ms ease-out",
  slower: "500ms ease-out",

  // Easing functions
  easing: {
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

// ==================== BREAKPOINTS ====================
export const BREAKPOINTS = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// ==================== Z-INDEX ====================
export const Z_INDEX = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// ==================== COMPONENT SIZES ====================
export const COMPONENT_SIZES = {
  // Button sizes
  button: {
    xs: { padding: "0.25rem 0.5rem", fontSize: "0.75rem", height: "24px" },
    sm: { padding: "0.375rem 0.75rem", fontSize: "0.875rem", height: "32px" },
    md: { padding: "0.5rem 1rem", fontSize: "1rem", height: "40px" },
    lg: { padding: "0.75rem 1.5rem", fontSize: "1.125rem", height: "48px" },
    xl: { padding: "1rem 2rem", fontSize: "1.25rem", height: "56px" },
  },

  // Input sizes
  input: {
    sm: { padding: "0.375rem 0.75rem", fontSize: "0.875rem", height: "32px" },
    md: { padding: "0.5rem 1rem", fontSize: "1rem", height: "40px" },
    lg: { padding: "0.75rem 1.5rem", fontSize: "1.125rem", height: "48px" },
  },

  // Icon sizes
  icon: {
    xs: "16px",
    sm: "20px",
    md: "24px",
    lg: "32px",
    xl: "48px",
  },
};

// ==================== ANIMATION PRESETS ====================
export const ANIMATIONS = {
  fadeIn: "fadeIn 0.3s ease-out",
  slideUp: "slideUp 0.3s ease-out",
  slideDown: "slideDown 0.3s ease-out",
  slideLeft: "slideLeft 0.3s ease-out",
  slideRight: "slideRight 0.3s ease-out",
  scaleIn: "scaleIn 0.2s ease-out",
  pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  bounce: "bounce 1s infinite",
  spin: "spin 1s linear infinite",
};

// ==================== GLASSMORPHISM ====================
export const GLASSMORPHISM = {
  light: {
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  dark: {
    background: "rgba(10, 14, 39, 0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(0, 217, 255, 0.1)",
  },
  strong: {
    background: "rgba(10, 14, 39, 0.95)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(0, 217, 255, 0.2)",
  },
};

// ==================== COMPONENT VARIANTS ====================
export const COMPONENT_VARIANTS = {
  button: {
    primary: {
      bg: "bg-[#00d9ff]",
      text: "text-[#0a0e27]",
      hover: "hover:bg-[#00d9ff]/90",
      active: "active:bg-[#00d9ff]/80",
    },
    secondary: {
      bg: "bg-[rgba(0,217,255,0.1)]",
      text: "text-[#00d9ff]",
      hover: "hover:bg-[rgba(0,217,255,0.2)]",
      active: "active:bg-[rgba(0,217,255,0.3)]",
    },
    danger: {
      bg: "bg-[#ff006e]",
      text: "text-white",
      hover: "hover:bg-[#ff006e]/90",
      active: "active:bg-[#ff006e]/80",
    },
    ghost: {
      bg: "bg-transparent",
      text: "text-[#e0e6ff]",
      hover: "hover:bg-[rgba(0,217,255,0.1)]",
      active: "active:bg-[rgba(0,217,255,0.2)]",
    },
  },

  card: {
    default: {
      bg: "bg-[rgba(20,24,41,0.8)]",
      border: "border-[rgba(0,217,255,0.1)]",
      hover: "hover:border-[#00d9ff]",
    },
    elevated: {
      bg: "bg-[#141829]",
      border: "border-[rgba(0,217,255,0.2)]",
      shadow: "shadow-lg",
    },
    interactive: {
      bg: "bg-[rgba(20,24,41,0.6)]",
      border: "border-[rgba(0,217,255,0.15)]",
      hover: "hover:bg-[rgba(20,24,41,0.8)] hover:border-[#00d9ff]",
    },
  },
};
