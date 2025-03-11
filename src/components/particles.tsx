"use client"

import { useCallback, useEffect, useState } from "react"
import ReactParticles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import type { Engine } from "tsparticles-engine"
import { useTheme } from "next-themes"

interface ParticlesProps {
  className?: string
}

export const Particles = ({ className = "" }: ParticlesProps) => {
  const [isClient, setIsClient] = useState(false)
  const { theme } = useTheme()
  const [isEnabled, setIsEnabled] = useState(true)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [particleCount, setParticleCount] = useState(40)

  useEffect(() => {
    setIsClient(true)

    // Проверяем предпочтения пользователя по уменьшению движения
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setIsReducedMotion(prefersReducedMotion)

    // Определяем производительность устройства
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const lowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4

    // Адаптируем настройки под устройство
    if (isMobile || lowCPU) {
      setParticleCount(20) // Меньше частиц для слабых устройств
    } else if (prefersReducedMotion) {
      setParticleCount(10) // Минимум частиц для пользователей с предпочтением уменьшенного движения
    }

    // Полностью отключаем для очень слабых устройств
    if ((isMobile && lowCPU) || prefersReducedMotion) {
      setIsEnabled(false)
    }
  }, [])

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  if (!isClient || !isEnabled) return null

  return (
    <ReactParticles
      className={className}
      init={particlesInit}
      options={{
        fpsLimit: 30,
        interactivity: {
          events: {
            onHover: {
              enable: !isReducedMotion,
              mode: "grab",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.5,
              },
            },
          },
        },
        particles: {
          color: {
            value: theme === "dark" ? "#ffffff" : "#333333",
          },
          links: {
            color: theme === "dark" ? "#ffffff" : "#333333",
            distance: 150,
            enable: true,
            opacity: theme === "dark" ? 0.1 : 0.2,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 0.3,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: particleCount,
          },
          opacity: {
            value: theme === "dark" ? 0.2 : 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 2 },
          },
        },
        detectRetina: false,
      }}
    />
  )
}

export default Particles

