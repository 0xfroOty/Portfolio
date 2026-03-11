import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface SectionWrapperProps {
  children: ReactNode
  id: string
  className?: string
}

export default function SectionWrapper({ children, id, className = '' }: SectionWrapperProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  )
}
