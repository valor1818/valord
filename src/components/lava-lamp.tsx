"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface LavaLampProps {
  position: "left" | "right"
}

export default function LavaLamp({ position }: LavaLampProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(true)
  const animationRef = useRef<number | null>(null)
  // Удаляем неиспользуемую переменную isReducedMotion

  // Автоматическое определение производительности устройства
  useEffect(() => {
    // Проверяем предпочтения пользователя по уменьшению движения
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    
    // Определяем производительность устройства
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const lowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
    const isLowPerformance = isMobile || lowCPU || prefersReducedMotion

    // Если устройство слабое или пользователь предпочитает уменьшенное движение, отключаем эффект
    if (isLowPerformance) {
      setIsVisible(false)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isVisible) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Оптимизированные настройки для разных устройств
    const FPS = 30
    const frameDelay = 1000 / FPS
    let lastFrameTime = 0

    // Оптимизация размеров канваса
    const setCanvasDimensions = () => {
      // Определяем масштаб в зависимости от производительности
      const scale = 0.5
      canvas.width = window.innerWidth * scale
      canvas.height = window.innerHeight * scale
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    setCanvasDimensions()

    // Оптимизированный обработчик изменения размера окна
    const handleResize = () => {
      requestAnimationFrame(() => {
        setCanvasDimensions()
      })
    }

    // Используем ResizeObserver вместо события resize для лучшей производительности
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(document.body)

    // Оптимизированное количество блобов
    const blobCount = position === "left" ? 3 : 3

    // Создаем блобы с оптимизированными параметрами
    const blobs = Array.from({ length: blobCount }, () => {
      const xPosition =
        position === "left" ? Math.random() * (canvas.width * 0.3) : canvas.width - Math.random() * (canvas.width * 0.3)

      const opacity = theme === "dark" ? 0.15 : 0.08

      return {
        x: xPosition,
        y: Math.random() * canvas.height,
        radius: 20 + Math.random() * 30,
        speedX: (Math.random() * 0.15 - 0.075) * (position === "right" ? -1 : 1),
        speedY: Math.random() * 0.15 - 0.075,
        color: position === "left" ? `rgba(59, 130, 246, ${opacity})` : `rgba(139, 92, 246, ${opacity})`,
      }
    })

    // Оптимизированный цикл анимации
    const animate = (timestamp: number) => {
      if (timestamp - lastFrameTime < frameDelay) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      lastFrameTime = timestamp
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Обновляем и рисуем блобы
      blobs.forEach((blob) => {
        blob.x += blob.speedX
        blob.y += blob.speedY

        const padding = 25
        if (blob.x < blob.radius + padding || blob.x > canvas.width - blob.radius - padding) {
          blob.speedX *= -1
        }
        if (blob.y < blob.radius + padding || blob.y > canvas.height - blob.radius - padding) {
          blob.speedY *= -1
        }

        // Оптимизированный градиент
        const gradientRadius = blob.radius * 1.3
        const blobGradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, gradientRadius)

        // Упрощенная обработка цвета
        const rgbMatch = blob.color.match(/rgba?$$(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?$$/)
        if (rgbMatch) {
          const r = rgbMatch[1]
          const g = rgbMatch[2]
          const b = rgbMatch[3]
          const a = rgbMatch[4] || "1"

          blobGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a})`)
          blobGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
        } else {
          blobGradient.addColorStop(0, blob.color)
          blobGradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        }

        ctx.beginPath()
        ctx.arc(blob.x, blob.y, gradientRadius, 0, Math.PI * 2)
        ctx.fillStyle = blobGradient
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      resizeObserver.disconnect()
    }
  }, [position, theme, isVisible])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 h-full w-full pointer-events-none z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}