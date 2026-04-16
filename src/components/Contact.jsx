import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Send, CheckCircle } from 'lucide-react'

const LinkedInIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"/>
  </svg>
)

const GitHubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)
import emailjs from '@emailjs/browser'

// ── EmailJS config ──────────────────────────────────────────────────────────
// Replace these with your real EmailJS values once you set up the service:
// 1. Sign up at https://www.emailjs.com/
// 2. Create a service (Gmail or Outlook) → copy Service ID
// 3. Create an email template → copy Template ID
// 4. Go to Account → copy Public Key
const EMAILJS_SERVICE_ID  = 'service_upfitet'
const EMAILJS_TEMPLATE_ID = 'template_gh1qv3p'
const EMAILJS_PUBLIC_KEY  = 'OptqGe4o466t2ZZKx'
// ───────────────────────────────────────────────────────────────────────────

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

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:    form.name,
          email:   form.email,
          message: form.message,
          title:   'Portfolio Contact Form',
          time:    new Date().toLocaleString('en-CA', {
            timeZone:     'America/Toronto',
            dateStyle:    'full',
            timeStyle:    'short',
          }),
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-zinc-800/60 border border-zinc-700/60 rounded-lg px-4 py-3 text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-colors duration-200'

  return (
    <section id="contact" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Let's Connect
          </h2>
          <p className="text-zinc-400 text-base max-w-xl mb-12">
            Whether you're looking for a seasoned engineering leader, want to collaborate on
            something interesting, or just want to talk about what I'm building — I'd love to hear
            from you.
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <FadeInSection delay={0.1}>
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
                <CheckCircle size={48} className="text-emerald-400" />
                <h3 className="text-white font-semibold text-lg">Message sent!</h3>
                <p className="text-zinc-400 text-sm">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-amber-400 text-sm hover:text-amber-300 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wide"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wide"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wide"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="What's on your mind?"
                    value={form.message}
                    onChange={handleChange}
                    className={inputClass + ' resize-none'}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm">
                    Something went wrong. Please try emailing me directly at{' '}
                    <a
                      href="mailto:michaelsuh87@outlook.com"
                      className="underline hover:text-red-300"
                    >
                      michaelsuh87@outlook.com
                    </a>
                    .
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-amber-500 text-zinc-950 font-semibold text-sm hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </FadeInSection>

          {/* Links & info */}
          <FadeInSection delay={0.2}>
            <div className="space-y-6">
              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-wide mb-4 font-medium">
                  Find me elsewhere
                </p>
                <div className="space-y-3">
                  {[
                    {
                      icon: <LinkedInIcon size={18} />,
                      label: 'LinkedIn',
                      value: 'linkedin.com/in/michaelsuh87',
                      href: 'https://linkedin.com/in/michaelsuh87',
                    },
                    {
                      icon: <GitHubIcon size={18} />,
                      label: 'GitHub',
                      value: 'github.com/msuh-dev',
                      href: 'https://github.com/msuh-dev',
                    },
                    {
                      icon: <Mail size={18} />,
                      label: 'Email',
                      value: 'michaelsuh87@outlook.com',
                      href: 'mailto:michaelsuh87@outlook.com',
                    },
                  ].map(({ icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/40 border border-zinc-700/40 hover:border-amber-500/40 hover:bg-zinc-800/70 group transition-all duration-200"
                    >
                      <span className="text-zinc-500 group-hover:text-amber-400 transition-colors duration-200">
                        {icon}
                      </span>
                      <div>
                        <p className="text-zinc-500 text-xs">{label}</p>
                        <p className="text-zinc-300 text-sm group-hover:text-amber-400 transition-colors duration-200">
                          {value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <p className="text-amber-400 text-sm font-medium mb-1">Open to opportunities</p>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  I'm currently available for the right senior engineering leadership role while I
                  continue building my product portfolio.
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}
