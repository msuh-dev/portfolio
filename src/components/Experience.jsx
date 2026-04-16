import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const experiences = [
  {
    company: 'Embross',
    location: 'Vaughan, ON',
    roles: [
      {
        title: 'Head of Software Engineering',
        period: 'March 2023 – February 2026',
        bullets: [
          'Scaled the software department from 4 teams to 7 specialized teams with 45 direct and indirect reports across Product Engineering, Project Delivery, CUSS Platform, Tools & Analytics, QA, Business Analysis, and IT & Cloud Ops.',
          'Led and mentored 6 direct-report managers across all engineering functions.',
          'Served as Product Owner for Kiosk and Bag Drop product lines, aligning roadmaps with customer requirements and strategic direction.',
          'Spearheaded technical modernization of the CUSS Platform to IATA CUSS 2.0 compliance — a global industry standard for airport self-service.',
          'Managed high-stakes customer escalations for global airline and airport clients.',
        ],
      },
      {
        title: 'Software Development Manager',
        period: 'June 2019 – December 2020',
        bullets: [
          'Managed a cross-functional team of 11 Developers and 2 QA Specialists across 6–8 concurrent airline and airport projects globally.',
          'Introduced and customized Agile/Scrum methodologies; led sprint planning, retrospectives, and roadmap prioritization.',
          'Collaborated with senior leadership on technical roadmaps and business development strategy.',
        ],
      },
      {
        title: 'Team Lead, Software Development',
        period: 'October 2017 – June 2019',
        bullets: [
          'Led a team of 5 developers while serving as Technical Architect across 4 parallel client engagements.',
          'Bridged technical requirements and architectural implementation; mentored junior developers.',
          'Spearheaded technical recruitment efforts.',
        ],
      },
      {
        title: 'Full-Stack Software Developer',
        period: 'March 2016 – November 2017',
        bullets: [
          'Delivered full-stack solutions (React, Redux, Java EE, Spring MVC) compliant with IATA CUSS, ADA, and PCI DSS standards.',
          "Lead Developer for Embross's inaugural deployments with Spirit Airlines and Copa Airlines — from development through live launch.",
          "Contributed to development of CBSA's Primary Inspection Kiosk (PIK/RTA) for incoming international travellers into Canada.",
        ],
      },
    ],
    note: 'Embross builds self-service passenger processing solutions — check-in kiosks, automated bag drop, and e-gates — deployed at airports across North America and internationally.',
  },
  {
    company: 'OpenText',
    location: 'Waterloo, ON',
    roles: [
      {
        title: 'Manager, Software Engineering',
        period: 'January 2021 – March 2023',
        bullets: [
          'Built a high-performing software engineering and QA team of 7 from scratch — full-cycle recruitment, onboarding, and mentorship.',
          'Led a department-wide security vulnerability triage program, coordinating across development, product, and security teams.',
          'Acted concurrently as Project Manager and Development Lead for complex customer escalations and product enhancements.',
        ],
      },
    ],
  },
  {
    company: 'IBM',
    location: 'Markham, ON',
    roles: [
      {
        title: 'Support Product Manager',
        period: 'April 2015 – March 2016',
        bullets: [
          'Strategic liaison between Client Support, Development, and Product Management for IBM Cognos ICM (Incentive Compensation Management).',
          'Defined product roadmaps, improved product quality, and streamlined client adoption through best practices documentation.',
        ],
      },
      {
        title: 'Business Consultant, IBM Cognos ICM',
        period: 'August 2014 – April 2015',
        bullets: [
          'Led a $550K end-to-end Cognos ICM implementation for a major medical device manufacturer — requirements, design, testing, customization, and complex data migration.',
        ],
      },
      {
        title: 'Lead Tech Support Analyst, IBM Cognos ICM',
        period: 'September 2012 – August 2014',
        bullets: [
          'Supervised a support team of 5 analysts managing 40+ global enterprise accounts.',
          'Provided server optimization and custom scripting (JavaScript, T-SQL).',
        ],
      },
    ],
  },
]

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

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
            Where I've been
          </h2>
        </FadeInSection>

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <FadeInSection key={exp.company} delay={i * 0.1}>
              <div className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-10">
                {/* Company sidebar */}
                <div className="md:pt-1">
                  <h3 className="text-white font-bold text-lg">{exp.company}</h3>
                  <p className="text-zinc-500 text-sm mt-0.5">{exp.location}</p>
                  {exp.note && (
                    <p className="text-zinc-600 text-xs mt-3 leading-relaxed italic">
                      {exp.note}
                    </p>
                  )}
                </div>

                {/* Roles */}
                <div className="space-y-8">
                  {exp.roles.map((role) => (
                    <div key={role.title} className="relative pl-5 border-l border-zinc-800">
                      {/* Dot */}
                      <div className="absolute -left-1.25 top-1.5 w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-zinc-950" />

                      <div className="mb-2">
                        <h4 className="text-white font-semibold text-base">{role.title}</h4>
                        <p className="text-amber-400/80 text-sm">{role.period}</p>
                      </div>

                      <ul className="space-y-2">
                        {role.bullets.map((bullet, k) => (
                          <li
                            key={k}
                            className="text-zinc-400 text-sm leading-relaxed flex gap-3"
                          >
                            <span className="text-amber-500 mt-1.5 shrink-0 text-[10px]">▸</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              {i < experiences.length - 1 && (
                <div className="mt-12 border-t border-zinc-800/60" />
              )}
            </FadeInSection>
          ))}
        </div>

        {/* Education */}
        <FadeInSection delay={0.2}>
          <div className="mt-16 pt-12 border-t border-zinc-800/60">
            <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-6">
              Education
            </p>
            <div className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-10">
              <div>
                <h3 className="text-white font-bold text-lg">University of Waterloo</h3>
                <p className="text-zinc-500 text-sm">Waterloo, ON</p>
              </div>
              <div className="pl-5 border-l border-zinc-800">
                <h4 className="text-white font-semibold text-base">
                  Bachelor of Computer Science (Honours)
                </h4>
                <p className="text-amber-400/80 text-sm">Graduated 2011</p>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.25}>
          <div className="mt-10 pt-10 border-t border-zinc-800/60">
            <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-6">
              Awards
            </p>
            <div className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-10">
              <div>
                <h3 className="text-white font-bold text-lg">AKCSE</h3>
                <p className="text-zinc-500 text-sm">The Association of Korean-Canadian Scientists and Engineers</p>
              </div>
              <div className="pl-5 border-l border-zinc-800">
                <h4 className="text-white font-semibold text-base">AKCSE Member of the Year</h4>
                <p className="text-amber-400/80 text-sm">2014–2015</p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
