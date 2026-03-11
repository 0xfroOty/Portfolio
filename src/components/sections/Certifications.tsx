import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award } from 'lucide-react'
import SectionWrapper from '../ui/SectionWrapper'
import SectionTitle from '../ui/SectionTitle'
import { certifications } from '../../data'

export default function Certifications() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <SectionWrapper id="certifications" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionTitle label="// cert.verify" title="Certifi" accent="cations" />

        <div ref={ref} className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative group rounded-2xl p-6 overflow-hidden cursor-default"
              style={{
                background: 'rgba(10, 22, 40, 0.5)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${cert.color}20`,
              }}
            >
              {/* Glass shine effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${cert.color}10 0%, transparent 70%)`,
                }}
              />

              {/* Top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: `${cert.color}15` }}
              >
                {cert.icon}
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-white text-lg mb-1 group-hover:text-white transition-colors">
                {cert.title}
              </h3>
              <p className="font-mono text-xs mb-3" style={{ color: cert.color }}>
                {cert.issuer}
              </p>
              <p className="font-body text-white/40 text-xs leading-relaxed">
                {cert.description}
              </p>

              {/* Award icon */}
              <div className="absolute bottom-4 right-4 text-white/10 group-hover:text-white/20 transition-colors">
                <Award size={20} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
