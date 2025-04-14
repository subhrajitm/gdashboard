export const theme = {
  colors: {
    primary: {
      main: '#FF4F59',
      light: '#FF7A82',
      dark: '#CC3F46',
    },
    secondary: {
      main: '#FFAD28',
      light: '#FFC15C',
      dark: '#CC8A20',
    },
    background: {
      light: '#FFFAF4',
      dark: '#181C23',
    },
    surface: {
      light: '#FFF2DF',
      dark: '#1F232A',
    },
    text: {
      light: '#181C23',
      dark: '#FFFFFF',
    },
    border: {
      light: '#444744',
      dark: '#282A27',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      bold: '700',
    },
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
  transitions: {
    default: 'all 0.2s ease-in-out',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  container: {
    padding: {
      default: '1rem',
      sm: '1.5rem',
      md: '2rem',
      lg: '2.5rem',
      xl: '3rem',
    },
    maxWidth: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  grid: {
    columns: {
      default: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
    },
    gap: {
      default: '1rem',
      sm: '1.25rem',
      md: '1.5rem',
      lg: '2rem',
    },
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};