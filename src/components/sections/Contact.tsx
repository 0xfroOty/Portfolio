import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Github, Linkedin, Phone, Send, CheckCircle } from 'lucide-react'
import SectionWrapper from '../ui/SectionWrapper'
import SectionTitle from '../ui/SectionTitle'
import { personalInfo } from '../../data'

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: '#00FF41',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '0xfroOty',
    href: personalInfo.github,
    color: '#e2e8f0',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'sathwikreddyk',
    href: personalInfo.linkedin,
    color: '#0A66C2',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    color: '#FF6B35',
  },
]

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <SectionWrapper id="contact" className="py-24 px-6 bg-[#050D14]">
      <div className="max-w-6xl mx-auto">
        <SectionTitle label="// contact.init()" title="Get In" accent="Touch" />

        <div ref={ref} className="grid md:grid-cols-2 gap-12">
          {/* Contact links */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="font-body text-white/50 mb-8 leading-relaxed"
            >
              Whether it's a collaboration, an interesting project, or just a chat about security and blockchain — I'm always open. Drop me a message.
            </motion.p>

            <div className="space-y-4">
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 p-4 rounded-xl glass hover:border-white/15 transition-all duration-200 group"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${link.color}15` }}
                  >
                    <link.icon size={18} style={{ color: link.color }} />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-white/30">{link.label}</p>
                    <p className="font-body text-white/70 text-sm group-hover:text-white transition-colors">
                      {link.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 glass rounded-2xl"
              >
                <CheckCircle size={48} className="text-[#00FF41] mb-4" />
                <h3 className="font-display text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="font-body text-white/50 text-sm">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 font-mono text-xs text-[#00FF41] hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {(['name', 'email'] as const).map((field) => (
                  <div key={field}>
                    <label className="font-mono text-xs text-white/30 block mb-2 tracking-wider uppercase">
                      {field}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      required
                      value={form[field]}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                      placeholder={field === 'email' ? 'you@example.com' : 'Your name'}
                      className="w-full bg-[#0a1628]/60 border border-white/10 rounded-xl px-4 py-3 font-body text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#00FF41]/40 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="font-mono text-xs text-white/30 block mb-2 tracking-wider uppercase">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="What's on your mind?"
                    className="w-full bg-[#0a1628]/60 border border-white/10 rounded-xl px-4 py-3 font-body text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#00FF41]/40 transition-colors resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#00FF41] text-[#050A0E] font-mono font-bold text-sm rounded-xl hover:bg-[#00FF41]/90 transition-all duration-200 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#050A0E]/30 border-t-[#050A0E] rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
