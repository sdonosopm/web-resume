import { MapPin, ArrowDown } from 'lucide-react'
import { personalInfo } from '../data/resume'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 dark:from-navy-950 dark:via-[#0a1929] dark:to-navy-900" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Accent glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 text-sm text-navy-200">
          <MapPin size={14} />
          {personalInfo.location}
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-4">
          {personalInfo.name}
        </h1>

        <p className="text-xl sm:text-2xl font-light text-navy-200 mb-3">
          {personalInfo.title}
        </p>

        <p className="text-base sm:text-lg text-navy-300 max-w-xl mx-auto mb-10 leading-relaxed">
          {personalInfo.tagline}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg bg-white text-navy-900 font-semibold text-sm hover:bg-navy-100 transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-lg border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
          >
            Get in Touch
          </a>
        </div>

        <a
          href="#about"
          className="inline-block mt-16 text-navy-400 hover:text-white transition-colors animate-bounce"
        >
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  )
}
