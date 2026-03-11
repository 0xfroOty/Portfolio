import { personalInfo } from '../../data'

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="#hero" className="font-mono text-[#00FF41] text-sm tracking-widest">
          <span className="text-white/30">0x</span>froOty
        </a>
        <p className="font-mono text-xs text-white/20">
          Crafted with ❤️ by Sathwik Akash · {new Date().getFullYear()}
        </p>
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-white/30 hover:text-[#00FF41] transition-colors"
        >
          github.com/0xfroOty
        </a>
      </div>
    </footer>
  )
}
