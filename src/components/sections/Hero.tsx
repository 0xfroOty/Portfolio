import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, ExternalLink, Github, Mail } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import Particles from '../ui/Particles'
import BinaryParticles from '../ui/BinaryParticles'
import { useTypingEffect } from '../../hooks/useTypingEffect'
import { useCounter } from '../../hooks/useCounter'
import { personalInfo, stats } from '../../data'

// ─────────────────────────────────────────────────────────────────────────────
// CV SETUP      → replace public/cv.pdf with your actual CV
// PROFILE PHOTO → replace public/profile.jpg with your actual photo
//   Any square JPG/PNG will be cropped to the 240px circle automatically.
//   Falls back to "SA" initials if the file is missing.
// ─────────────────────────────────────────────────────────────────────────────

// ── Stat counter ──────────────────────────────────────────────────────────────
function StatCounter({
  label,
  value,
  suffix,
  start,
}: {
  label: string
  value: number
  suffix: string
  start: boolean
}) {
  const count = useCounter(value, 1800, start)
  return (
    <div className="text-center">
      <div className="font-display text-3xl font-bold text-[#00FF41]">
        {count}{suffix}
      </div>
      <div className="font-mono text-xs text-white/40 tracking-widest uppercase mt-1">
        {label}
      </div>
    </div>
  )
}

// ── Large centered profile photo ──────────────────────────────────────────────
function ProfilePhoto() {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      className="flex justify-center mb-10"
      initial={{ opacity: 0, scale: 0.6, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Hover: slight scale + tilt */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: 2 }}
        transition={{ type: 'spring', stiffness: 240, damping: 16 }}
        className="relative"
        style={{ width: '240px', height: '240px' }}
      >
        {/* ── Diffuse glow aura — zIndex:-1 keeps it strictly behind the photo ── */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: '-20px',
            zIndex: -1,
            background:
              'radial-gradient(circle, rgba(0,255,65,0.30) 0%, rgba(0,255,65,0.10) 50%, transparent 72%)',
            filter: 'blur(18px)',
            animation: 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
          }}
        />

        {/* ── Slow-rotating dashed ring ── */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: '1.5px dashed rgba(0,255,65,0.40)',
            margin: '-8px',
            width: 'calc(100% + 16px)',
            height: 'calc(100% + 16px)',
            borderRadius: '50%',
          }}
        />

        {/* ── Photo frame — 240 × 240 circular ── */}
        <div
          className="w-full h-full rounded-full overflow-hidden border-[3px] border-[#00FF41]"
          style={{
            boxShadow: [
              '0 0 0 5px rgba(0,255,65,0.10)',
              '0 0 30px rgba(0,255,65,0.65)',
              '0 0 65px rgba(0,255,65,0.20)',
            ].join(', '),
          }}
        >
          {!imgError ? (
            <img
              src="/profile.jpg"
              alt="Sathwik Akash Reddy"
              className="w-full h-full object-cover object-center"
              style={{ filter: 'none', mixBlendMode: 'normal' }}
              onError={() => setImgError(true)}
            />
          ) : (
            /* Initials fallback when profile.jpg is absent */
            <div className="w-full h-full bg-gradient-to-br from-[#0A1628] to-[#050A0E] flex items-center justify-center">
              <span className="font-display text-6xl font-extrabold text-[#00FF41]">SA</span>
            </div>
          )}
        </div>

        {/* ── Online status dot ── */}
        <span
          className="absolute bottom-3 right-3 w-6 h-6 bg-[#00FF41] rounded-full border-2 border-[#050A0E]"
          style={{ boxShadow: '0 0 10px rgba(0,255,65,0.9)' }}
        >
          <span className="absolute inset-0 rounded-full bg-[#00FF41] animate-ping opacity-50" />
        </span>
      </motion.div>
    </motion.div>
  )
}

// ── Hero section ──────────────────────────────────────────────────────────────
export default function Hero() {
  const typed = useTypingEffect(personalInfo.roles, 75, 2000)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050A0E] grid-bg"
    >
      {/* ── Background effects ── */}
      {/* Canvas dot-particle base layer */}
      <Particles />
      {/* Three.js binary/hex floating text particles — z:1, behind all content */}
      <BinaryParticles />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 45%, rgba(0,255,65,0.07) 0%, transparent 70%)',
        }}
      />

      {/* ── Corner decorations ── */}
      <div className="absolute top-20 left-6 font-mono text-[#00FF41]/20 text-xs leading-relaxed hidden md:block select-none">
        <div>$ whoami</div>
        <div className="text-white/30">sathwik_akash</div>
        <div className="mt-2">$ cat interests.txt</div>
        <div className="text-white/30">blockchain | security | re</div>
      </div>
      <div className="absolute bottom-20 right-6 font-mono text-[#00FF41]/20 text-xs text-right hidden md:block select-none">
        <div>// system status</div>
        <div className="text-white/30">learning: active</div>
        <div className="text-white/30">building: true</div>
        <div className="text-white/30">available: yes</div>
      </div>

      {/* ── Main content ── */}
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20 pb-10">

        {/* 1 ── Profile photo (240px, circular, glowing) */}
        <ProfilePhoto />

        {/* 2 ── Hello World + full name */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38 }}
        >
          <p className="font-mono text-xs text-[#00FF41] tracking-[0.4em] uppercase mb-4">
            Hello, World — I'm
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-none tracking-tight">
            Kajuluri{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] to-[#0D7377]">
              Sathwik
            </span>
            <br />
            Akash Reddy
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.56 }}
          className="mt-4 font-body text-white/50 text-sm tracking-widest uppercase"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* 3 ── Typing roles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.72 }}
          className="mt-6 h-10 flex items-center justify-center"
        >
          <span className="font-mono text-lg md:text-xl text-[#FF6B35]">
            {typed}
            <span className="cursor-blink text-[#00FF41]">_</span>
          </span>
        </motion.div>

        {/* 4 ── Buttons: Download CV · View CV Online · GitHub · Email */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.88 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="/cv.pdf"
            download
            className="flex items-center gap-2 px-6 py-3 bg-[#00FF41] text-[#050A0E] font-mono font-bold text-sm rounded hover:bg-[#00FF41]/90 transition-all duration-200 glow-acid"
          >
            <Download size={16} />
            Download CV
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-[#00FF41]/40 text-[#00FF41] font-mono text-sm rounded hover:bg-[#00FF41]/10 transition-all duration-200"
          >
            <ExternalLink size={16} />
            View CV Online
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-white/10 text-white/60 font-mono text-sm rounded hover:text-white hover:border-white/30 transition-all duration-200"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-2 px-6 py-3 border border-white/10 text-white/60 font-mono text-sm rounded hover:text-white hover:border-white/30 transition-all duration-200"
          >
            <Mail size={16} />
            Email
          </a>
        </motion.div>

        {/* 5 ── Stats: 2 Projects · 3 Certifications · 25+ Skills */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.08 }}
          className="mt-16 flex justify-center gap-10 md:gap-20"
        >
          {stats.map((s) => (
            <StatCounter
              key={s.label}
              label={s.label}
              value={s.value}
              suffix={s.suffix}
              start={inView}
            />
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#00FF41]/40 to-transparent animate-pulse" />
      </motion.div>
    </section>
  )
}
