"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setIsReducedMotion(prefersReducedMotion)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Определяем активный раздел на основе прокрутки
      const sections = ["home", "skills", "projects", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/60 dark:bg-black/60 backdrop-blur-xl shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 group-hover:border-purple-500 shadow-md hover:shadow-blue-500/50 transition-all duration-300"
              whileHover={!isReducedMotion ? { scale: 1.1 } : {}}
              whileTap={!isReducedMotion ? { scale: 0.95 } : {}}
            >
              <Image
                src="https://raw.githubusercontent.com/valor1818/valord/refs/heads/main/908307-.jpg"
                alt="Valord Avatar"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <span className="text-foreground text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-blue-500 transition-all duration-300">
              Valord
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {["Home", "Skills", "Projects", "Contact"].map((item) => {
              const isActive = activeSection === item.toLowerCase()
              return (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-foreground/80 hover:text-foreground relative group transition-colors duration-300 ${
                    isActive ? "text-foreground font-medium" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(item.toLowerCase())?.scrollIntoView({
                      behavior: isReducedMotion ? "auto" : "smooth",
                    })
                  }}
                >
                  <span className="relative z-10">{item}</span>
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:shadow-glow transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                  <span
                    className={`absolute -bottom-1 -right-1 w-1 h-1 rounded-full bg-purple-500 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></span>
                </Link>
              )
            })}
          </nav>

          <motion.button
            className="md:hidden text-foreground bg-black/20 dark:bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-black/30 dark:hover:bg-white/30 transition-colors duration-300"
            whileHover={!isReducedMotion ? { scale: 1.1 } : {}}
            whileTap={!isReducedMotion ? { scale: 0.9 } : {}}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white/90 dark:bg-black/90 backdrop-blur-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {["Home", "Skills", "Projects", "Contact"].map((item) => {
                  const isActive = activeSection === item.toLowerCase()
                  return (
                    <motion.div
                      key={item}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        href={`#${item.toLowerCase()}`}
                        className={`text-foreground/80 hover:text-foreground py-2 block transition-colors duration-300 ${
                          isActive ? "text-foreground font-medium" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          setMobileMenuOpen(false)
                          document.getElementById(item.toLowerCase())?.scrollIntoView({
                            behavior: isReducedMotion ? "auto" : "smooth",
                          })
                        }}
                      >
                        {item}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

