"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { motion } from "framer-motion"

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    setMounted(true)
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setIsReducedMotion(prefersReducedMotion)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    // Создаем и диспатчим событие перед изменением темы
    const event = new CustomEvent("themeChange")
    document.dispatchEvent(event)

    // Устанавливаем новую тему
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  }

  return (
    <motion.button
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md border border-black/10 dark:border-white/10 flex items-center justify-center text-foreground hover:bg-white/40 dark:hover:bg-black/40 transition-colors duration-300 shadow-lg"
      onClick={toggleTheme}
      whileHover={!isReducedMotion ? { scale: 1.1, boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)" } : {}}
      whileTap={!isReducedMotion ? { scale: 0.9 } : {}}
      transition={{ duration: 0.3 }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-foreground" />
      ) : (
        <Moon size={20} className="text-foreground" />
      )}
    </motion.button>
  )
}

