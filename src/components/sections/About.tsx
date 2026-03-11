import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper from '../ui/SectionWrapper'
import SectionTitle from '../ui/SectionTitle'
import { personalInfo, learningTopics } from '../../data'

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const interests = [
    { icon: '⛓️', label: 'Blockchain', desc: 'Smart contracts & DeFi protocols' },
    { icon: '🔐', label: 'Cybersecurity', desc: 'Offensive & defensive techniques' },
    { icon: '🔬', label: 'Reverse Engineering', desc: 'Binary analysis & program internals' },
    { icon: '⚙️', label: 'Systems Programming', desc: 'Low-level control & performance' },
  ]

  return (
    <SectionWrapper id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle label="// about.me" title="Who I" accent="Am" />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <div>
            {personalInfo.about.split('\n\n').map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                className="font-body text-white/60 leading-relaxed mb-4"
              >
                {para}
              </motion.p>
            ))}

            {/* Interest cards */}
            <div ref={ref} className="grid grid-cols-2 gap-3 mt-8">
              {interests.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass rounded-lg p-4 hover:border-[#00FF41]/30 transition-all duration-300 group"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-display font-semibold text-white text-sm group-hover:text-[#00FF41] transition-colors">
                    {item.label}
                  </div>
                  <div className="font-mono text-[10px] text-white/30 mt-1">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Terminal learning card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div className="rounded-xl overflow-hidden border border-[#00FF41]/20 shadow-2xl">
              {/* Terminal header */}
              <div className="bg-[#0d1117] px-4 py-3 flex items-center gap-2 border-b border-[#00FF41]/10">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="font-mono text-xs text-white/30 ml-2">frooty@github:~$</span>
              </div>

              {/* Terminal body */}
              <div className="bg-[#0a0f1a] p-6 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#00FF41]">frooty@github</span>
                  <span className="text-white/30">:</span>
                  <span className="text-[#0D7377]">~</span>
                  <span className="text-white/30">$</span>
                  <span className="text-white"> learning</span>
                  <span className="cursor-blink text-[#00FF41]">█</span>
                </div>

                <div className="text-white/30 text-xs mb-4">// Currently studying:</div>

                <div className="space-y-2">
                  {learningTopics.map((topic, i) => (
                    <motion.div
                      key={topic}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-[#FF6B35] text-xs">▶</span>
                      <span className="text-[#00FF41]/80 text-xs">{topic}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#00FF41]/10">
                  <span className="text-white/20 text-xs">// approach: learn by breaking things apart</span>
                </div>
              </div>
            </div>

            {/* Soft skills */}
            <div className="mt-6 glass rounded-lg p-5">
              <p className="font-mono text-xs text-white/30 mb-3">// soft skills</p>
              <p className="font-body text-white/70 text-sm">
                Curious <span className="text-[#00FF41]/40">•</span> Analytical{' '}
                <span className="text-[#00FF41]/40">•</span> Creative{' '}
                <span className="text-[#00FF41]/40">•</span> Open-Minded{' '}
                <span className="text-[#00FF41]/40">•</span> Persistent
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
