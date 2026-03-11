import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper from '../ui/SectionWrapper'
import SectionTitle from '../ui/SectionTitle'
import { skillCategories, softSkills } from '../../data'

const SKILL_ICONS: Record<string, string> = {
  'Assembly': '⚙️',
  'Hardhat': '🪖',
  'Truffle': '🍄',
  'Remix IDE': '🔷',
  'Bitcoin Scripting': '₿',
  'Foundry': '🔨',
  'Ghidra': '👻',
  'Radare2': '📡',
  'Binary Ninja': '🥷',
  'IDA Free': '🔎',
  'GDB': '🐛',
  'Pwndbg': '💉',
  'Burp Suite': '🕷️',
  'Metasploit': '🎯',
  'Wireshark': '🦈',
  'Objdump': '📋',
  'Strace': '🔍',
}

function SkillBadge({ name, icon, color, index }: { name: string; icon: string | null; color: string; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/8 border border-white/5 hover:border-opacity-30 transition-all duration-200 group cursor-default"
      style={{ '--hover-color': color } as React.CSSProperties}
    >
      {icon ? (
        <img
          src={icon}
          alt={name}
          className="w-8 h-8 object-contain group-hover:scale-110 transition-transform"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            target.nextElementSibling!.classList.remove('hidden')
          }}
        />
      ) : null}
      <span
        className={`text-2xl ${icon ? 'hidden' : ''}`}
        id={`emoji-${name}`}
      >
        {SKILL_ICONS[name] || '🔧'}
      </span>
      <span className="font-mono text-[10px] text-white/50 group-hover:text-white/80 transition-colors text-center leading-tight">
        {name}
      </span>
    </motion.div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const displayed = activeCategory
    ? skillCategories.filter(c => c.title === activeCategory)
    : skillCategories

  return (
    <SectionWrapper id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle label="// skills.json" title="Tech" accent="Arsenal" />

        {/* Category filter tabs */}
        <div ref={ref} className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => setActiveCategory(null)}
            className={`font-mono text-xs px-4 py-2 rounded-full border transition-all duration-200 ${
              !activeCategory
                ? 'bg-[#00FF41]/10 border-[#00FF41]/40 text-[#00FF41]'
                : 'border-white/10 text-white/40 hover:text-white/70'
            }`}
          >
            All
          </button>
          {skillCategories.map(cat => (
            <button
              key={cat.title}
              onClick={() => setActiveCategory(activeCategory === cat.title ? null : cat.title)}
              className={`font-mono text-xs px-4 py-2 rounded-full border transition-all duration-200`}
              style={{
                background: activeCategory === cat.title ? `${cat.color}15` : 'transparent',
                borderColor: activeCategory === cat.title ? `${cat.color}60` : 'rgba(255,255,255,0.1)',
                color: activeCategory === cat.title ? cat.color : 'rgba(255,255,255,0.4)',
              }}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory || 'all'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-10"
          >
            {displayed.map((category) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-5 rounded-full" style={{ background: category.color }} />
                  <h3 className="font-display font-semibold text-white text-sm">{category.title}</h3>
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="font-mono text-xs text-white/20">{category.skills.length} tools</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                  {category.skills.map((skill, i) => (
                    <SkillBadge
                      key={skill.name}
                      name={skill.name}
                      icon={skill.icon}
                      color={category.color}
                      index={i}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Soft skills strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 glass rounded-xl p-6 text-center"
        >
          <p className="font-mono text-xs text-white/30 mb-3">// soft_skills.exe</p>
          <p className="font-body text-white/70">
            {softSkills.map((s, i) => (
              <span key={s}>
                <span className="text-white/90">{s}</span>
                {i < softSkills.length - 1 && (
                  <span className="text-[#00FF41]/40 mx-3">•</span>
                )}
              </span>
            ))}
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
