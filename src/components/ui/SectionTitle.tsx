interface SectionTitleProps {
  label: string
  title: string
  accent?: string
}

export default function SectionTitle({ label, title, accent }: SectionTitleProps) {
  return (
    <div className="mb-16">
      <p className="font-mono text-xs text-[#00FF41] tracking-[0.3em] uppercase mb-3">{label}</p>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
        {title}
        {accent && <span className="text-[#00FF41]"> {accent}</span>}
      </h2>
      <div className="mt-4 h-px w-16 bg-gradient-to-r from-[#00FF41] to-transparent" />
    </div>
  )
}
