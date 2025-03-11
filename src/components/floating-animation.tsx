"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { loadPerformanceSettings } from "./performance-toggle"

interface FloatingAnimationProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export default function FloatingAnimation({
  children,
  delay = 0,
  duration = 4,
  className = "",
}: FloatingAnimationProps) {
  const [enableAnimations, setEnableAnimations] = useState(true)

  useEffect(() => {
    const settings = loadPerformanceSettings()
    setEnableAnimations(settings.enableAnimations)
  }, [])

  // Если анимации отключены, просто возвращаем детей без анимации
  if (!enableAnimations) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  )
}

