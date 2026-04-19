import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ExternalLink, GitFork } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// DYNAMIC THUMBNAILS — Microlink API
//
// For any Live project with a `url`, the card automatically fetches a fresh
// screenshot via Microlink (https://microlink.io). Results are cached in
// localStorage for 24 hours so repeat visits don't re-hit the API.
//
// Free tier: 100 req/day — sufficient for a portfolio at current traffic.
// Upgrade if traffic grows: https://microlink.io/pricing
// ─────────────────────────────────────────────────────────────────────────────

const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

function getCachedThumb(url) {
  try {
    const raw = localStorage.getItem(`thumb::${url}`)
    if (!raw) return null
    const { src, expires } = JSON.parse(raw)
    if (Date.now() > expires) {
      localStorage.removeItem(`thumb::${url}`)
      return null
    }
    return src // may be a URL string or null (cached failure)
  } catch {
    return null
  }
}

function setCachedThumb(url, src) {
  try {
    localStorage.setItem(
      `thumb::${url}`,
      JSON.stringify({ src, expires: Date.now() + CACHE_TTL_MS })
    )
  } catch {
    // storage quota exceeded — ignore silently
  }
}

function useLiveThumbnail(url) {
  const cached = url ? getCachedThumb(url) : undefined
  const [src, setSrc] = useState(cached !== undefined ? cached : null)
  const [loading, setLoading] = useState(cached === undefined && !!url)

  useEffect(() => {
    if (!url || cached !== undefined) return

    fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true`)
      .then((r) => r.json())
      .then(({ status, data }) => {
        const imgSrc =
          status === 'success'
            ? data?.screenshot?.url ?? data?.image?.url ?? null
            : null
        setCachedThumb(url, imgSrc)
        setSrc(imgSrc)
        setLoading(false)
      })
      .catch(() => {
        setCachedThumb(url, null)
        setLoading(false)
      })
  }, [url]) // eslint-disable-line react-hooks/exhaustive-deps

  return { src, loading }
}

// Thumbnail for Live projects — fetches dynamically, shows spinner while loading
function LiveThumbnail({ url, name }) {
  const { src, loading } = useLiveThumbnail(url)

  if (loading) {
    return (
      <div className="w-full h-full bg-zinc-800/60 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
      </div>
    )
  }

  if (src) {
    return (
      <img
        src={src}
        alt={`${name} preview`}
        className="w-full h-full object-cover object-top"
      />
    )
  }

  // Fallback if Microlink fails
  return <WIPThumb label="Preview unavailable" />
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
  },
  {
    name: 'AIchitect',
    description:
      'AI-powered tool that generates structured, interview-ready system design documents in seconds. Describe what you want to build, set your scale parameters, and get a complete architecture breakdown — requirements, database design, scaling strategy, tech stack, and more.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'FastAPI', 'Python', 'Claude API', 'Mermaid.js', 'Vercel', 'Render'],
    status: 'Live',
    statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    url: 'https://momijilabs-aichitect.vercel.app',
    github: null,
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

                {/* Thumbnail */}
                <div className="relative w-full h-40 overflow-hidden border-b border-zinc-700/40">
                  {project.status === 'Live' && project.url ? (
                    <LiveThumbnail url={project.url} name={project.name} />
                  ) : (
                    <WIPThumb />
                  )}
                </div>

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
