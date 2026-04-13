import { Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'
import { personalInfo } from '../data/resume'

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-light)] mb-2">
            Contact
          </h2>
          <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
            Let's Connect
          </h3>
          <p className="text-[var(--text-secondary)] mb-10">
            Interested in discussing finance, technology, or potential collaboration? I'd love to hear from you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-light)]/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)]/10 flex items-center justify-center group-hover:bg-[var(--accent-light)]/20 transition-colors">
                <Mail size={20} className="text-[var(--accent-light)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)] mb-0.5">Email</p>
                <p className="text-sm font-medium text-[var(--text-primary)]">{personalInfo.email}</p>
              </div>
            </a>

            <a
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-light)]/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)]/10 flex items-center justify-center group-hover:bg-[var(--accent-light)]/20 transition-colors">
                <LinkedinIcon size={20} className="text-[var(--accent-light)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)] mb-0.5">LinkedIn</p>
                <p className="text-sm font-medium text-[var(--text-primary)]">Profile</p>
              </div>
            </a>

            <a
              href={`https://${personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-light)]/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)]/10 flex items-center justify-center group-hover:bg-[var(--accent-light)]/20 transition-colors">
                <GithubIcon size={20} className="text-[var(--accent-light)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)] mb-0.5">GitHub</p>
                <p className="text-sm font-medium text-[var(--text-primary)]">Repositories</p>
              </div>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-muted)]">
            <MapPin size={14} />
            {personalInfo.location}
          </div>
        </div>
      </div>
    </section>
  )
}
