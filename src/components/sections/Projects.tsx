import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, ArrowRight } from 'lucide-react'
import SectionWrapper from '../ui/SectionWrapper'
import SectionTitle from '../ui/SectionTitle'
import { projects } from '../../data'

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 ${
        project.featured
          ? 'border-[#00FF41]/20 hover:border-[#00FF41]/50'
          : 'border-white/8 hover:border-[#FF6B35]/40'
      }`}
      style={{
        background: project.featured
          ? 'linear-gradient(135deg, rgba(0,255,65,0.04) 0%, rgba(10,22,40,0.8) 100%)'
          : 'linear-gradient(135deg, rgba(255,107,53,0.04) 0%, rgba(10,22,40,0.8) 100%)',
      }}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 font-mono text-[10px] px-2 py-1 bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/20 rounded-full">
          Featured
        </div>
      )}

      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${project.color}08 0%, transparent 70%)`,
        }}
      />

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#00FF41] transition-colors duration-300">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-white/30 mt-1">
              {project.tags[0]} · {project.tags[1]}
            </p>
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-white/10 text-white/40 hover:text-[#00FF41] hover:border-[#00FF41]/30 transition-all"
            >
              <Github size={18} />
            </a>
          )}
        </div>

        {/* Description */}
        <p className="font-body text-white/55 text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Focus areas */}
        {project.focus && (
          <div className="mb-6">
            <p className="font-mono text-[10px] text-white/30 mb-3 tracking-widest uppercase">Focus Areas</p>
            <div className="space-y-2">
              {project.focus.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <ArrowRight size={12} style={{ color: project.color }} />
                  <span className="font-mono text-xs text-white/50">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-3 py-1 rounded-full border"
              style={{
                background: `${project.color}08`,
                borderColor: `${project.color}25`,
                color: `${project.color}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* GitHub link */}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center gap-2 font-mono text-xs text-white/30 hover:text-[#00FF41] transition-colors group/link"
          >
            <ExternalLink size={12} />
            <span>View on GitHub</span>
            <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <SectionWrapper id="projects" className="py-24 px-6 bg-[#050D14]">
      <div className="max-w-6xl mx-auto">
        <SectionTitle label="// projects.git" title="What I've" accent="Built" />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
