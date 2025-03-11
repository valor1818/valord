"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Zap, ZapOff } from 'lucide-react'

interface PerformanceSettings {
  enableLavaLamp: boolean
  enableParticles: boolean
  enableAnimations: boolean
}

// Создаем глобальный контекст для настроек производительности
export const defaultPerformanceSettings: PerformanceSettings = {
  enableLavaLamp: true,
  enableParticles: true,
  enableAnimations: true,
}

// Сохраняем настройки в localStorage
export const savePerformanceSettings = (settings: PerformanceSettings) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("performance-settings", JSON.stringify(settings))
  }
}

// Загружаем настройки из localStorage
export const loadPerformanceSettings = (): PerformanceSettings => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("performance-settings")
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error("Failed to parse performance settings", e)
      }
    }

    // Автоматически определяем настройки для слабых устройств
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const lowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4

    if (isMobile || lowCPU) {
      const lowPerformanceSettings: PerformanceSettings = {
        enableLavaLamp: false,
        enableParticles: false,
        enableAnimations: true,
      }
      savePerformanceSettings(lowPerformanceSettings)
      return lowPerformanceSettings
    }
  }
  return defaultPerformanceSettings
}

export default function PerformanceToggle() {
  const [mounted, setMounted] = useState(false)
  const [settings, setSettings] = useState<PerformanceSettings>(defaultPerformanceSettings)
  // Удаляем неиспользуемые переменные isOpen и setIsOpen

  useEffect(() => {
    setMounted(true)
    setSettings(loadPerformanceSettings())
  }, [])

  if (!mounted) return null

  const toggleLowPerformanceMode = () => {
    const newSettings = settings.enableLavaLamp
      ? { enableLavaLamp: false, enableParticles: false, enableAnimations: true }
      : defaultPerformanceSettings

    setSettings(newSettings)
    savePerformanceSettings(newSettings)

    // Перезагрузка страницы для применения настроек
    window.location.reload()
  }

  return (
    <motion.button
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10 flex items-center justify-center text-foreground hover:bg-white/30 dark:hover:bg-black/30"
      onClick={toggleLowPerformanceMode}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
      aria-label="Toggle performance mode"
    >
      {settings.enableLavaLamp ? (
        <Zap size={20} className="text-foreground" />
      ) : (
        <ZapOff size={20} className="text-foreground" />
      )}
    </motion.button>
  )
}