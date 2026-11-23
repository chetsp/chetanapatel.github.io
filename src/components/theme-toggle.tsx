"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
export default function ThemeToggle() {
  const { setTheme } = useTheme();
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Toggle color theme"
      title="Toggle color theme"
      onClick={() =>
        setTheme(
          document.documentElement.classList.contains("light")
            ? "dark"
            : "light",
        )
      }
    >
      <Sun className="sun-icon" size={17} aria-hidden="true" />
      <Moon className="moon-icon" size={17} aria-hidden="true" />
    </button>
  );
}
