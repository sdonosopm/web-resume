import { skills } from '../data/resume'

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-light)] mb-2">
          Skills
        </h2>
        <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-12">
          Technical & Domain Expertise
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((group) => (
            <div
              key={group.category}
              className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]"
            >
              <h4 className="text-base font-semibold text-[var(--text-primary)] mb-4">
                {group.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm rounded-lg bg-[var(--accent-light)]/10 text-[var(--accent-light)] font-medium border border-[var(--accent-light)]/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
