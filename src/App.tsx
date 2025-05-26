import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import HomePage from './pages/HomePage';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const App: React.FC = () => {
  // Create theme with Material You 3 inspired design
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#9c27b0',
      },
      background: {
        default: '#f5f5f5',
      },
    },
    shape: {
      borderRadius: 16,
    },
    typography: {
      fontFamily: '"Roboto", "Arial", sans-serif',
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 24,
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
    },
  });

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HomePage />
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App;
