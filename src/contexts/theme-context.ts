import { ChangeEventHandler, createContext, useContext } from "react";

export type Theme = "light" | "dark" | "system";

export const themes: { [key: string]: Theme } = {
  light: "light",
  dark: "dark",
};

interface ThemeContextInterface {
  theme: Theme;
  toggleTheme: ChangeEventHandler<HTMLInputElement>;
}

export const ThemeContext = createContext<ThemeContextInterface>({
  theme: themes.system,
  toggleTheme: () => {},
});

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside a ThemeContext.Provider");
  }
  return context.theme;
}
