import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper from '../ui/SectionWrapper'
import SectionTitle from '../ui/SectionTitle'
import { education } from '../../data'

export default function Education() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <SectionWrapper id="education" className="py-24 px-6 bg-[#050D14]">
      <div className="max-w-4xl mx-auto">
        <SectionTitle label="// education.log" title="Academic" accent="Journey" />

        <div ref={ref} className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#00FF41]/50 via-[#00FF41]/20 to-transparent" />

          <div className="space-y-8">
            {education.map((edu, i) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="relative pl-20"
              >
                {/* Node */}
                <div className="absolute left-[26px] top-6 flex items-center justify-center">
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    edu.current
                      ? 'border-[#00FF41] bg-[#00FF41]/20'
                      : 'border-[#0D7377] bg-[#0D7377]/20'
                  }`} />
                  {edu.current && (
                    <span className="absolute w-8 h-8 rounded-full bg-[#00FF41]/10 animate-ping" />
                  )}
                </div>

                {/* Card */}
                <div className={`glass rounded-xl p-6 hover:border-[#00FF41]/30 transition-all duration-300 ${
                  edu.current ? 'border-[#00FF41]/20' : 'border-white/5'
                }`}>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">
                        {edu.institution}
                      </h3>
                      <p className="font-body text-[#00FF41]/80 text-sm mt-1">{edu.degree}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block font-mono text-xs px-3 py-1 rounded-full ${
                        edu.current
                          ? 'bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/20'
                          : 'bg-white/5 text-white/40'
                      }`}>
                        {edu.current ? '● ACTIVE' : edu.year}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="font-mono text-xs text-white/30">{edu.period}</span>
                    <span className="text-white/10">|</span>
                    <span className="font-mono text-xs text-white/30">{edu.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
