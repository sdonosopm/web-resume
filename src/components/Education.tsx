import { GraduationCap, Award } from 'lucide-react'
import { education, certifications } from '../data/resume'

export function Education() {
  return (
    <section id="education" className="py-24 px-6 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-light)] mb-2">
          Education & Certifications
        </h2>
        <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-12">
          Academic Background
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap size={20} className="text-[var(--accent-light)]" />
              <h4 className="text-lg font-semibold text-[var(--text-primary)]">Education</h4>
            </div>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]"
                >
                  <h5 className="font-semibold text-[var(--text-primary)]">{edu.degree}</h5>
                  <p className="text-sm text-[var(--accent-light)] font-medium mt-1">{edu.institution}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{edu.period}</p>
                  {edu.details && (
                    <p className="text-sm text-[var(--text-secondary)] mt-3">{edu.details}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Award size={20} className="text-[var(--accent-light)]" />
              <h4 className="text-lg font-semibold text-[var(--text-primary)]">Certifications</h4>
            </div>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]"
                >
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Award size={16} className="text-[var(--accent-light)]" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{cert.name}</span>
                    {cert.detail && (
                      <p className="text-xs text-[var(--text-muted)] mt-1">{cert.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
