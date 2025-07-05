// useThemeStore.js
import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "light",

  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    document.documentElement.setAttribute("data-theme", theme); // ✅ Apply to <html>
    set({ theme });
  },

  hydrateTheme: () => {
    const theme = localStorage.getItem("chat-theme") || "light";
    document.documentElement.setAttribute("data-theme", theme); // ✅ Ensure applied on reload
    set({ theme });
  },
}));