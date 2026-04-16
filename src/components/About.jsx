import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const skills = {
  Technical: [
    'Java', 'Python', 'JavaScript', 'TypeScript',
    'React', 'Redux', 'HTML / CSS',
    'Spring MVC', 'FastAPI', 'REST APIs',
    'PostgreSQL', 'MySQL', 'MS SQL Server',
    'Git', 'GitHub', 'Jira',
  ],
  'AI & Emerging': [
    'Claude API',
    'Claude Code',
    'Prompt Engineering',
    'LLM Integration',
    'AI/ML Integration',
    'Agentic Development',
    'RAG (Retrieval-Augmented Generation)',
  ],
  Leadership: [
    'Engineering org scaling',
    'Servant-leadership',
    'Recruitment & talent acquisition',
    'Agile / Scrum methodology',
    'Product ownership & roadmaps',
    'Customer & vendor management',
  ],
  Domain: [
    'IATA CUSS / CUPPS standards',
    'Airport self-service systems',
    'DCS integration',
    'SDLC process optimization',
  ],
}

function FadeInSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <FadeInSection>
          <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-3">
            About
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
            The person behind the work
          </h2>
        </FadeInSection>

        {/* Bio */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <FadeInSection delay={0.1}>
            <div className="space-y-5 text-zinc-400 leading-relaxed text-[15px]">
              <p>
                I'm a software leader who started as a full-stack developer and grew into the kind
                of executive who thinks as much about people, process, and product as about code.
              </p>
              <p>
                My career spans 13+ years across IBM, OpenText, and most recently Embross — a
                company specializing in self-service passenger processing solutions for airports
                worldwide. At Embross, I was a developer first (React, Redux, Java EE, Spring MVC),
                then a team lead, then a manager, and ultimately Head of Software Engineering —
                where I restructured and scaled the entire software department from 4 siloed teams
                into 7 purpose-built product and delivery teams with 45 direct and indirect reports.
              </p>
              <p>
                I'm a firm believer in servant-leadership: a good leader sets the direction, then
                gets out of the way and makes sure the team has everything they need to succeed. The
                best thing I ever built wasn't a product — it was a team that could ship without me.
              </p>
              <p>
                After stepping away from corporate leadership in early 2026, I've been doing what
                I'd been meaning to do for years: building products myself. I'm combining my
                leadership and domain experience with a return to hands-on development — this time
                with a modern stack and AI at the center of everything.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="space-y-5 text-zinc-400 leading-relaxed text-[15px]">
              <p>
                I'm a University of Waterloo Honours Computer Science graduate, a recipient of the
                AKCSE Member of the Year award (2014–2015), and a native speaker of both English
                and Korean.
              </p>
              <p>
                I'm currently open to the right leadership opportunity while I build. If that sounds
                like a fit, let's talk.
              </p>

              {/* Quick facts */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: 'Experience', value: '13+ years' },
                  { label: 'Peak org size', value: '45 people' },
                  { label: 'Based in', value: 'Vaughan, ON' },
                  { label: 'Languages', value: 'EN · KO · JA · ZH' },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="p-4 rounded-lg bg-zinc-800/60 border border-zinc-700/50"
                  >
                    <p className="text-zinc-500 text-xs uppercase tracking-wide mb-1">{label}</p>
                    <p className="text-white font-semibold text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>

        {/* Skills */}
        <FadeInSection delay={0.15}>
          <h3 className="text-xl font-semibold text-white mb-6">Skills</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="p-5 rounded-xl bg-zinc-800/50 border border-zinc-700/40"
              >
                <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md bg-zinc-700/60 text-zinc-300 text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
