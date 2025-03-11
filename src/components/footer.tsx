"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Footer() {
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setIsReducedMotion(prefersReducedMotion)
  }, [])

  return (
    <footer className="py-8 border-t border-black/10 dark:border-white/10 transition-colors duration-300 bg-white/20 dark:bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="flex items-center space-x-2 mb-4 md:mb-0 group"
            whileHover={!isReducedMotion ? { x: 5 } : {}}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 group-hover:border-purple-500 transition-all duration-300 shadow-md"
              whileHover={!isReducedMotion ? { scale: 1.2, rotate: 10 } : {}}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://raw.githubusercontent.com/valor1818/valord/refs/heads/main/908307-.jpg"
                alt="Valord Avatar"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <span className="text-foreground text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-blue-500 transition-all duration-300">
              Valord
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <nav className="flex gap-6 mb-4 md:mb-0">
              {["Home", "Skills", "Projects", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-foreground/70 hover:text-foreground transition-colors duration-300 text-sm"
                  whileHover={!isReducedMotion ? { y: -2 } : {}}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(item.toLowerCase())?.scrollIntoView({
                      behavior: isReducedMotion ? "auto" : "smooth",
                    })
                  }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="text-foreground/70 text-sm transition-colors duration-300"
              whileHover={!isReducedMotion ? { scale: 1.05 } : {}}
              transition={{ duration: 0.3 }}
            >
              © {new Date().getFullYear()} Valord. All rights reserved.
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

