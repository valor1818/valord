"use client"

import { motion, useInView } from "framer-motion"
import { Code, Layers, Braces, FileCode, Cpu, Server, Globe, Gamepad2, Bot } from 'lucide-react'
import { useRef, useEffect, useState } from "react"
import { ReactNode } from "react"

// Определяем интерфейс для свойств SkillBar
interface SkillBarProps {
  name: string;
  level: number;
  index: number;
  icon: ReactNode;
  isReducedMotion: boolean;
  isInView: boolean;
}

const programmingSkills = [
  { name: "JavaScript", level: 7, icon: <Braces className="h-4 w-4 text-yellow-400" /> },
  { name: "TypeScript", level: 6, icon: <FileCode className="h-4 w-4 text-blue-400" /> },
  { name: "Python", level: 8, icon: <Code className="h-4 w-4 text-green-400" /> },
  { name: "Java", level: 5, icon: <Cpu className="h-4 w-4 text-orange-400" /> },
  { name: "C++", level: 2, icon: <Server className="h-4 w-4 text-purple-400" /> },
]

const otherSkills = [
  { name: "TON API", level: 7, icon: <Globe className="h-4 w-4 text-blue-400" /> },
  { name: "Tailwind CSS", level: 7, icon: <Code className="h-4 w-4 text-cyan-400" /> },
  { name: "React", level: 7, icon: <Code className="h-4 w-4 text-blue-500" /> },
  { name: "Minecraft", level: 9, icon: <Gamepad2 className="h-4 w-4 text-green-500" /> },
  { name: "discord.py", level: 6, icon: <Bot className="h-4 w-4 text-indigo-400" /> },
]

const SkillBar = ({ name, level, index, icon, isReducedMotion, isInView }: SkillBarProps) => {
  const barRef = useRef(null)
  const barInView = useInView(barRef, { once: true, amount: 0.3 })
  const shouldAnimate = isInView && barInView && !isReducedMotion

  return (
    <motion.div
      ref={barRef}
      className="mb-6 group"
      initial={{ opacity: 0, x: -10 }}
      animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={!isReducedMotion ? { x: 5 } : {}}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30">
            {icon}
          </div>
          <h3 className="text-base font-medium group-hover:text-blue-400 transition-colors duration-300">{name}</h3>
        </div>
        <motion.span
          className="text-sm bg-gradient-to-r from-blue-500 to-purple-500 px-2 py-0.5 rounded-full text-white"
          whileHover={!isReducedMotion ? { scale: 1.1 } : {}}
        >
          {level}/10
        </motion.span>
      </div>
      <div className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden group-hover:shadow-md group-hover:shadow-purple-500/20 transition-shadow duration-300">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 relative"
          initial={{ width: 0 }}
          animate={shouldAnimate ? { width: `${level * 10}%` } : { width: `${level * 10}%` }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          {!isReducedMotion && (
            <motion.div
              className="absolute top-0 right-0 h-full w-1 bg-white opacity-0 group-hover:opacity-70"
              animate={{
                x: [0, 5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setIsReducedMotion(prefersReducedMotion)
  }, [])

  return (
    <section id="skills" ref={ref} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          My <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Skills</span>
        </h2>
        <p className="text-foreground/70 text-center mb-12 max-w-2xl mx-auto">
          Expertise in various technologies and programming languages
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white/40 dark:bg-black/40 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-xl p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-shadow duration-300"
            whileHover={!isReducedMotion ? { y: -5 } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md"
                whileHover={!isReducedMotion ? { scale: 1.1 } : {}}
                whileTap={!isReducedMotion ? { scale: 0.9 } : {}}
              >
                <Code className="h-5 w-5 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold">Programming Languages</h3>
            </div>

            {programmingSkills.map((skill, index) => (
              <SkillBar 
                key={skill.name} 
                name={skill.name} 
                level={skill.level} 
                index={index} 
                icon={skill.icon} 
                isReducedMotion={isReducedMotion}
                isInView={isInView}
              />
            ))}
          </motion.div>

          <motion.div
            className="bg-white/40 dark:bg-black/40 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-xl p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-shadow duration-300"
            whileHover={!isReducedMotion ? { y: -5 } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md"
                whileHover={!isReducedMotion ? { scale: 1.1 } : {}}
                whileTap={!isReducedMotion ? { scale: 0.9 } : {}}
              >
                <Layers className="h-5 w-5 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold">Technologies & Frameworks</h3>
            </div>

            {otherSkills.map((skill, index) => (
              <SkillBar 
                key={skill.name} 
                name={skill.name} 
                level={skill.level} 
                index={index} 
                icon={skill.icon} 
                isReducedMotion={isReducedMotion}
                isInView={isInView}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}