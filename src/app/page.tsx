'use client'

import Hero from "@/components/hero"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ThemeToggle from "@/components/theme-toggle"
import { Suspense } from "react"
import dynamic from "next/dynamic"

// Динамический импорт тяжелых компонентов для оптимизации загрузки
const DynamicParticles = dynamic(() => import("@/components/particles").then((mod) => ({ default: mod.Particles })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10" />,
})

const DynamicLavaLamp = dynamic(() => import("@/components/lava-lamp"), {
  ssr: false,
  loading: () => null,
})

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden relative">
      {/* Background particles - загружаются динамически */}
      <Suspense fallback={<div className="absolute inset-0 -z-10" />}>
        <DynamicParticles className="absolute inset-0 -z-10" />
      </Suspense>

      {/* Lava lamps - загружаются динамически */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        <Suspense fallback={null}>
          <DynamicLavaLamp position="left" />
          <DynamicLavaLamp position="right" />
        </Suspense>
      </div>

      <Navbar />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </div>

      <ThemeToggle />
      <Footer />
    </main>
  )
}

