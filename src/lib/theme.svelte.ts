import { browser } from "$app/environment";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "theme";

function applyTheme(resolved: ResolvedTheme) {
  if (!browser) return;
  const el = document.documentElement;
  el.classList.remove("light", "dark");
  el.classList.add(resolved);
  el.style.colorScheme = resolved;
}

class ThemeStore {
  theme = $state<Theme>("system");
  systemTheme = $state<ResolvedTheme>("light");

  get resolved(): ResolvedTheme {
    return this.theme === "dark" || (this.theme === "system" && this.systemTheme === "dark") ? "dark" : "light";
  }

  constructor() {
    if (!browser) return;

    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark" || stored === "system") {
      this.theme = stored;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    this.systemTheme = media.matches ? "dark" : "light";
    media.addEventListener("change", (e) => {
      this.systemTheme = e.matches ? "dark" : "light";
      applyTheme(this.resolved);
    });

    applyTheme(this.resolved);
  }

  setTheme(theme: Theme) {
    this.theme = theme;
    if (browser) {
      localStorage.setItem(STORAGE_KEY, theme);
      applyTheme(this.resolved);
    }
  }
}

export const themeStore = new ThemeStore();
