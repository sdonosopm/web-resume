import { GraduationCap, Award, Trophy } from 'lucide-react'
import { education, certifications, awards } from '../data/resume'

export function Education() {
  return (
    <section id="education" className="py-24 px-6 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-light)] mb-2">
          Education, Certifications & Awards
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

        {/* Awards & Recognition */}
        {awards.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-6">
              <Trophy size={20} className="text-[var(--accent-light)]" />
              <h4 className="text-lg font-semibold text-[var(--text-primary)]">Awards & Recognition</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {awards.map((award, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent-light)]/10 flex items-center justify-center shrink-0">
                    <Trophy size={18} className="text-[var(--accent-light)]" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-[var(--accent-light)]/10 text-[var(--accent-light)]">
                        {award.place}
                      </span>
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        {award.category}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--accent-light)] font-medium mt-1.5">{award.event}</p>
                    {award.project && (
                      <p className="text-xs text-[var(--text-muted)] mt-1">Project: {award.project}</p>
                    )}
                    {award.detail && (
                      <p className="text-sm text-[var(--text-secondary)] mt-2">{award.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
