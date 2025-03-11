"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

// Создаем контекст для отслеживания переходов темы
const ThemeTransitionContext = createContext({
  isTransitioning: false,
})

export const useThemeTransition = () => useContext(ThemeTransitionContext)

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Функция для обработки изменений темы
  const handleThemeChange = () => {
    setIsTransitioning(true)

    // Сбрасываем флаг перехода после завершения анимации
    setTimeout(() => {
      setIsTransitioning(false)
    }, 300) // Совпадает с длительностью перехода
  }

  // Слушаем события изменения темы
  useEffect(() => {
    document.addEventListener("themeChange", handleThemeChange)
    return () => {
      document.removeEventListener("themeChange", handleThemeChange)
    }
  }, [])

  return (
    <ThemeTransitionContext.Provider value={{ isTransitioning }}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ThemeTransitionContext.Provider>
  )
}

