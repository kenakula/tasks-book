import { CssBaseline, PaletteMode } from '@mui/material';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '../shared/assets/local-storage-keys';

type ContextProps = {
  mode: PaletteMode;
  toggleColorMode: () => void;
  theme: Theme;
};

interface Props {
  children: JSX.Element;
}

export const ThemeStoreContext = createContext<Partial<ContextProps>>({});
export function useCustomTheme(): Partial<ContextProps> {
  return useContext(ThemeStoreContext);
}

export const ThemeStoreProvider = ({ children }: Props): JSX.Element => {
  const [mode, setMode] = useState<PaletteMode>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem(
      LOCAL_STORAGE_THEME_KEY,
    ) as PaletteMode;

    if (storedTheme) {
      setMode(storedTheme);
    }
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#29a19c',
          },
          warning: {
            main: '#ecca75',
          },
          error: {
            main: '#f05454',
          },
          background: {
            default: mode === 'light' ? '#fafafa' : '#222831',
            paper: mode === 'light' ? '#ffffff' : '#2c3440',
          },
          text: {
            primary: mode === 'light' ? '#282846' : '#F9F9F9',
          },
        },
      }),
    [],
  );

  const toggleColorMode = (): void => {
    setMode(prev => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newMode);

      return newMode;
    });
  };

  const value = useMemo(
    () => ({
      mode,
      toggleColorMode,
      theme,
    }),
    [mode, theme],
  );

  return (
    <ThemeStoreContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeStoreContext.Provider>
  );
};
