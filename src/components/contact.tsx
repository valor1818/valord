"use client"

import { motion, useInView } from "framer-motion"
import { MessageSquare } from 'lucide-react'
import { useRef, useEffect, useState } from "react"

export default function Contact() {
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setIsReducedMotion(prefersReducedMotion)
  }, [])

  return (
    <section id="contact" ref={ref} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center transition-colors duration-300">
          Get in{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text transition-colors duration-300">
            Touch
          </span>
        </h2>
        <p className="text-foreground/70 text-center mb-12 transition-colors duration-300 max-w-2xl mx-auto">
          Feel free to reach out to me for collaboration or inquiries
        </p>

        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-1 gap-6">
            <motion.div
              className="bg-white/60 dark:bg-black/60 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-8 transition-all duration-300 group shadow-lg"
              whileHover={!isReducedMotion ? {
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.2), 0 10px 10px -5px rgba(139, 92, 246, 0.1)",
              } : {}}
              transition={{ duration: 0.4 }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            >
              <div className="flex flex-col items-center text-center">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg transition-colors duration-300"
                  whileHover={!isReducedMotion ? { scale: 1.1 } : {}}
                  transition={{ duration: 0.3 }}
                  animate={!isReducedMotion ? {
                    boxShadow: [
                      "0 0 0 rgba(139, 92, 246, 0)",
                      "0 0 20px rgba(139, 92, 246, 0.5)",
                      "0 0 0 rgba(139, 92, 246, 0)",
                    ],
                  } : {}}
                >
                  <MessageSquare className="text-white" size={32} />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-colors duration-300">
                  Let&apos;s Connect
                </h3>
                <p className="text-foreground/80 mb-8 max-w-md transition-colors duration-300 text-lg leading-relaxed">
                  Have a project in mind or just want to chat? Feel free to reach out to me through Telegram.
                  I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                </p>
                <motion.a
                  href="https://t.me/valord"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 relative overflow-hidden group"
                  whileHover={!isReducedMotion ? { scale: 1.05 } : {}}
                  whileTap={!isReducedMotion ? { scale: 0.95 } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <MessageSquare size={18} className={!isReducedMotion ? "group-hover:animate-pulse" : ""} />
                    Telegram @valord
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}