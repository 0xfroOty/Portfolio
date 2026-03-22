import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Clock } from 'lucide-react'
import SectionWrapper from '../ui/SectionWrapper'
import SectionTitle from '../ui/SectionTitle'
import { certifications } from '../../data'

interface CertCardProps {
  cert: {
    title: string
    issuer: string
    year: string
    icon: string
    color: string
    description: string
    url: string | null
  }
  index: number
  inView: boolean
}

function CertCard({ cert, index, inView }: CertCardProps) {
  const cardStyle = {
    background: 'rgba(10, 22, 40, 0.5)',
    backdropFilter: 'blur(20px)',
    border: '1px solid ' + cert.color + '20',
  }
  const shineStyle = {
    background:
      'radial-gradient(ellipse 80% 60% at 50% 0%, ' +
      cert.color +
      '10 0%, transparent 70%)',
  }
  const topBarStyle = {
    background:
      'linear-gradient(90deg, transparent, ' + cert.color + ', transparent)',
  }
  const badgeStyle = {
    borderColor: cert.color + '40',
    color: cert.color,
    background: cert.color + '10',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative group rounded-2xl p-6 overflow-hidden cursor-default"
      style={cardStyle}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={shineStyle}
      />
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={topBarStyle}
      />
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
        style={{ background: cert.color + '15' }}
      >
        {cert.icon}
      </div>
      <h3 className="font-display font-bold text-white text-lg mb-1 group-hover:text-white transition-colors">
        {cert.title}
      </h3>
      <div className="flex items-center justify-between mb-3">
        <p className="font-mono text-xs" style={{ color: cert.color }}>
          {cert.issuer}
        </p>
        {cert.year === 'In Progress' ? (
          <span
            className="flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-full border"
            style={badgeStyle}
          >
            <Clock size={10} />
            In Progress
          </span>
        ) : (
          <span className="font-mono text-[10px] text-white/30">
            {cert.year}
          </span>
        )}
      </div>
      <p className="font-body text-white/40 text-xs leading-relaxed mb-4">
        {cert.description}
      </p>
      <div className="absolute bottom-4 right-4 text-white/10 group-hover:text-white/20 transition-colors">
        <Award size={20} />
      </div>
    </motion.div>
  )
}

export default function Certifications() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <SectionWrapper id="certifications" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionTitle label="// cert.verify" title="Certifi" accent="cations" />
        <div ref={ref} className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {certifications.map(function (cert, index) {
            return (
              <CertCard
                key={cert.title}
                cert={cert}
                index={index}
                inView={inView}
              />
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
