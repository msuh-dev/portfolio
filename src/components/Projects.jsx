import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, GitFork } from 'lucide-react'
import portfolioThumb from '../assets/images/portfolio-thumb.png'

// ─────────────────────────────────────────────────────────────────────────────
// DYNAMIC THUMBNAILS — thum.io Screenshot Service
//
// For any Live project with a `url`, the card renders a live screenshot via
// https://image.thum.io — free, no API key required, works as a plain <img src>.
// Caching handled server-side; browser image cache covers repeat loads.
//
// URL format: https://image.thum.io/get/width/800/<url>  (no encoding needed)
// ─────────────────────────────────────────────────────────────────────────────

// Thumbnail for Live projects — direct screenshot image, spinner until loaded
function LiveThumbnail({ url, name }) {
  const [status, setStatus] = useState('loading') // 'loading' | 'loaded' | 'error'
  const screenshotUrl = `https://image.thum.io/get/width/800/${url}`

  return (
    <div className="relative w-full h-full">
      {status === 'loading' && (
        <div className="absolute inset-0 bg-zinc-800/60 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
        </div>
      )}
      {status === 'error' && <WIPThumb label="Preview unavailable" />}
      <img
        src={screenshotUrl}
        alt={`${name} preview`}
        className={`w-full h-full object-cover object-top transition-opacity duration-500 ${
          status === 'loaded' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ display: status === 'error' ? 'none' : 'block' }}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </div>
  )
}

// Thumbnail for Coming Soon projects
function WIPThumb({ label = 'Work in Progress' }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-zinc-800/60">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-amber-400/50"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">{label}</p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT DATA
// ─────────────────────────────────────────────────────────────────────────────

const projects = [
  {
    name: 'Personal Portfolio Site',
    description:
      "A clean, modern developer portfolio built with React and Tailwind CSS — the site you're looking at right now.",
    tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'EmailJS'],
    status: 'Live',
    statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    url: 'https://michaelsuh.vercel.app',
    github: 'https://github.com/msuh-dev/portfolio',
    demo: 'https://michaelsuh.vercel.app',
    // Static thumbnail used here because Framer Motion entrance animations
    // render at opacity:0 and thum.io captures the page before they play.
    staticThumb: portfolioThumb,
  },
  {
    name: 'AIchitect',
    description:
      'AI-powered tool that generates structured, interview-ready system design documents in seconds. Describe what you want to build, set your scale parameters, and get a complete architecture breakdown — requirements, database design, scaling strategy, tech stack, and more.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'FastAPI', 'Python', 'Claude API', 'Mermaid.js', 'Vercel', 'Render'],
    status: 'Live',
    statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    url: 'https://momijilabs-aichitect.vercel.app',
    github: 'https://github.com/msuh-dev/aichitect',
    demo: 'https://momijilabs-aichitect.vercel.app',
  },
  {
    name: 'AI Resume Tailoring Tool',
    description:
      'Helps job seekers tailor their resume to specific job descriptions and track their applications — all in one place.',
    tech: ['React', 'Python', 'FastAPI', 'PostgreSQL'],
    status: 'Coming Soon',
    statusColor: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
    url: null,
    github: null,
    demo: null,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function FadeInSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Projects
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            What I'm building
          </h2>
          <p className="text-zinc-400 text-base max-w-xl mb-12">
            A selection of what I'm building independently — AI-powered tools that solve real problems.
          </p>
        </FadeInSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <FadeInSection key={project.name} delay={i * 0.05}>
              <div className="group relative flex flex-col h-full rounded-xl bg-zinc-800/40 border border-zinc-700/40 hover:border-amber-500/40 hover:bg-zinc-800/60 transition-all duration-300 overflow-hidden">

                {/* Thumbnail — clickable for Live projects, static for Coming Soon */}
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.name}`}
                    className="group/thumb block relative w-full h-40 overflow-hidden border-b border-zinc-700/40"
                  >
                    {project.staticThumb ? (
                      <img
                        src={project.staticThumb}
                        alt={`${project.name} preview`}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/thumb:scale-105"
                      />
                    ) : (
                      <LiveThumbnail url={project.url} name={project.name} />
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 bg-zinc-900/80 rounded-full p-2.5">
                        <ExternalLink size={16} className="text-amber-400" />
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="relative w-full h-40 overflow-hidden border-b border-zinc-700/40">
                    <WIPThumb />
                  </div>
                )}

                {/* Card body */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Status badge + icon links */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${project.statusColor}`}
                    >
                      {project.status === 'Live' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                      )}
                      {project.status}
                    </span>

                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-500 hover:text-amber-400 transition-colors"
                          aria-label="GitHub repository"
                        >
                          <GitFork size={16} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-500 hover:text-amber-400 transition-colors"
                          aria-label="Visit live site"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-white font-semibold text-base mb-2 group-hover:text-amber-400 transition-colors duration-200">
                    {project.name}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-xs font-medium bg-zinc-700/60 text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}
