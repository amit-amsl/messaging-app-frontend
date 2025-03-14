import { ThemeContext, themes } from "@/contexts/theme-context";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitcher() {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            className="theme-controller hidden"
            value={themes.dark}
            checked={theme === themes.dark}
            onChange={toggleTheme}
          />
          <Sun size={32} className="swap-off fill-current" />

          <Moon size={32} className="swap-on fill-current" />
        </label>
      )}
    </ThemeContext.Consumer>
  );
}
