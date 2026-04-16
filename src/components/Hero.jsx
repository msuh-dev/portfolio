import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
}

const handleScroll = (href) => {
  const target = document.querySelector(href)
  if (target) target.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-zinc-950 to-zinc-900 pointer-events-none" />

      {/* Decorative amber glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Status badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-medium tracking-wide"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Available for the right opportunity
        </motion.div>

        {/* Name */}
        <motion.h1
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-none mb-4"
        >
          Michael Suh
        </motion.h1>

        {/* Title */}
        <motion.p
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-lg sm:text-xl md:text-2xl text-amber-400 font-medium mb-6"
        >
          Product &amp; Software Engineering Executive
        </motion.p>

        {/* Hero paragraph */}
        <motion.p
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          I've spent 13+ years building software and the teams that build it — scaling engineering
          organizations, shipping enterprise products used at airports around the world, and leading
          people through the messy, human reality of making things at scale. Now I'm building
          products of my own. Welcome to where that's happening.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={0.4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => handleScroll('#projects')}
            className="px-6 py-3 rounded-md bg-amber-500 text-zinc-950 font-semibold text-sm hover:bg-amber-400 transition-colors duration-200 w-full sm:w-auto"
          >
            See My Work
          </button>
          <button
            onClick={() => handleScroll('#contact')}
            className="px-6 py-3 rounded-md border border-zinc-700 text-zinc-300 font-semibold text-sm hover:border-amber-500/60 hover:text-amber-400 transition-colors duration-200 w-full sm:w-auto"
          >
            Let's Connect
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 cursor-pointer hover:text-amber-400 transition-colors"
        onClick={() => handleScroll('#about')}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
