"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { useRef, useEffect, useState } from "react"

export default function Projects() {
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setIsReducedMotion(prefersReducedMotion)
  }, [])

  return (
    <section id="projects" ref={ref} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center transition-colors duration-300">
          My{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text transition-colors duration-300">
            Projects
          </span>
        </h2>
        <p className="text-foreground/70 text-center mb-12 transition-colors duration-300 max-w-2xl mx-auto">
          Check out my latest work and professional projects
        </p>

        <motion.div
          className="bg-white/40 dark:bg-black/40 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-300 group shadow-lg"
          whileHover={
            !isReducedMotion
              ? {
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)",
                }
              : {}
          }
          transition={{ duration: 0.4 }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          viewport={{ once: true }}
        >
          <div className="relative h-64 md:h-80 overflow-hidden">
            <motion.div whileHover={!isReducedMotion ? { scale: 1.05 } : {}} transition={{ duration: 0.4 }}>
              <Image
                src="https://raw.githubusercontent.com/valor1818/ludoman/refs/heads/main/sources/Screenshot_1.png"
                alt="LUDOMAN Cryptocurrency"
                width={800}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="eager"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <motion.div
              className="absolute bottom-0 left-0 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-colors duration-300">
                LUDOMAN
              </h3>
              <p className="text-white transition-colors duration-300">Cryptocurrency website on TON blockchain</p>
            </motion.div>
          </div>
          <div className="p-8">
            <p className="text-foreground/80 mb-6 transition-colors duration-300 text-lg leading-relaxed">
              LUDOMAN is a cryptocurrency project built on the TON blockchain. The website provides information about
              the token, its features, and how to purchase it. The project showcases modern web development techniques
              and blockchain integration.
            </p>
            <div className="flex items-center space-x-4">
              <motion.a
                href="https://1000ludoman.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-300 group/link"
                whileHover={!isReducedMotion ? { x: 5 } : {}}
                transition={{ duration: 0.3 }}
              >
                <ExternalLink size={18} className="group-hover/link:animate-pulse" />
                <span className="font-medium">Visit Website</span>
                <motion.span
                  className="w-0 h-0.5 bg-blue-500 dark:bg-blue-400 block transition-all duration-300"
                  whileHover={!isReducedMotion ? { width: "100%" } : {}}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

