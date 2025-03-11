"use client"

import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import Image from "next/image"
import FloatingAnimation from "./floating-animation"
import { useEffect, useState } from "react"
import { loadPerformanceSettings } from "./performance-toggle"

export default function Hero() {
  const [enableAnimations, setEnableAnimations] = useState(true)

  useEffect(() => {
    const settings = loadPerformanceSettings()
    setEnableAnimations(settings.enableAnimations)
  }, [])

  // Базовые анимационные настройки
  const baseTransition = { duration: 0.3 }

  // Отключаем анимации, если пользователь выбрал режим низкой производительности
  const animProps = enableAnimations
    ? {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
        transition: baseTransition,
      }
    : { initial: { opacity: 1 } }

  return (
    <section id="home" className="min-h-screen flex items-center pt-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div {...animProps}>
          <motion.div
            initial={enableAnimations ? { opacity: 0, y: 20 } : { opacity: 1 }}
            animate={enableAnimations ? { opacity: 1, y: 0 } : { opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              <TypeAnimation
                sequence={["Hello, I'm Valord", 1000, "Developer", 1000, "Admirer of TON", 1000]}
                wrapper="span"
                speed={50}
                repeat={Number.POSITIVE_INFINITY}
              />
            </h1>
          </motion.div>
          <motion.p
            className="text-x1 text-foreground/80 mb-8"
            initial={enableAnimations ? { opacity: 0, y: 20 } : { opacity: 1 }}
            animate={enableAnimations ? { opacity: 1, y: 0 } : { opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            A passionate developer with expertise in various programming languages and technologies.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4"
            initial={enableAnimations ? { opacity: 0, y: 20 } : { opacity: 1 }}
            animate={enableAnimations ? { opacity: 1, y: 0 } : { opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            <motion.a
              href="#contact"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 relative overflow-hidden group"
              whileHover={enableAnimations ? { scale: 1.05 } : {}}
              whileTap={enableAnimations ? { scale: 0.95 } : {}}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <span className="relative z-10">Contact Me</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100"></span>
            </motion.a>
            <motion.a
              href="#projects"
              className="px-6 py-3 bg-black/10 dark:bg-white/10 backdrop-blur-sm border border-black/20 dark:border-white/20 rounded-full text-foreground font-medium hover:bg-black/20 dark:hover:bg-white/20 hover:shadow-lg hover:shadow-purple-500/10"
              whileHover={enableAnimations ? { scale: 1.05 } : {}}
              whileTap={enableAnimations ? { scale: 0.95 } : {}}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              View Projects
            </motion.a>
          </motion.div>
        </motion.div>

        {enableAnimations ? (
          <FloatingAnimation delay={0.2} duration={5}>
            <HeroImage />
          </FloatingAnimation>
        ) : (
          <HeroImage />
        )}
      </div>
    </section>
  )
}

// Выделяем компонент изображения для оптимизации
function HeroImage() {
  const [enableAnimations, setEnableAnimations] = useState(true)

  useEffect(() => {
    const settings = loadPerformanceSettings()
    setEnableAnimations(settings.enableAnimations)
  }, [])

  return (
    <motion.div
      className="relative"
      initial={enableAnimations ? { opacity: 0, scale: 0.8 } : { opacity: 1 }}
      animate={enableAnimations ? { opacity: 1, scale: 1 } : { opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="w-full h-80 md:h-96 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 blur-xl animate-pulse" />
        <motion.div
          className="absolute inset-4 bg-white/60 dark:bg-black/60 backdrop-blur-sm rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden"
          whileHover={enableAnimations ? { boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)" } : {}}
        >
          <div className="text-center">
            <motion.div
              className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-purple-500 mb-4 relative"
              whileHover={enableAnimations ? { scale: 1.05, borderColor: "#3b82f6" } : {}}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 hover:opacity-20" />
              <Image
                src="https://raw.githubusercontent.com/valor1818/valord/refs/heads/main/908307-.jpg"
                alt="Valord Avatar"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority // Добавляем приоритетную загрузку для ключевого изображения
              />
            </motion.div>
            <motion.h2
              className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              whileHover={enableAnimations ? { scale: 1.05 } : {}}
            >
              Valord
            </motion.h2>
            <p className="text-foreground/80">Developer & Admirer of TON</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

