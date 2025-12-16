"use client";

<<<<<<< HEAD
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
=======
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";
>>>>>>> develop

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

