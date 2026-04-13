import { Footprints, Medal, Mountain, Bike, Volleyball, Piano, Waves, MapPin, Calendar, Trophy } from 'lucide-react'
import { disciplines, otherInterests, type Discipline, type Interest } from '../data/resume'

const disciplineIconMap: Record<Discipline['icon'], typeof Footprints> = {
  spartan: Trophy,
  mtb: Bike,
  triathlon: Medal,
  running: Footprints,
  tennis: Volleyball,
  piano: Piano,
  surfing: Waves,
}

const interestIconMap: Record<Interest['icon'], typeof Footprints> = {
  marathon: Footprints,
  triathlon: Medal,
  enduro: Mountain,
  tennis: Volleyball,
  piano: Piano,
  surfing: Waves,
}

export function Interests() {
  return (
    <section id="interests" className="py-24 px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-light)] mb-2">
          Beyond Work
        </h2>
        <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
          Endurance & Interests
        </h3>
        <p className="text-[var(--text-secondary)] mb-10 max-w-2xl">
          The same discipline, goal-setting, and resilience that drive endurance sports also shape
          how I approach portfolio management and client relationships.
        </p>

        {/* Race history by discipline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {disciplines.map((discipline) => {
            const Icon = disciplineIconMap[discipline.icon]
            return (
              <div
                key={discipline.label}
                className="rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] overflow-hidden hover:border-[var(--accent-light)]/30 hover:shadow-md transition-all"
              >
                {/* Discipline header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border-color)]">
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent-light)]/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[var(--accent-light)]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--text-primary)]">
                      {discipline.label}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)]">
                      {discipline.races.length} event{discipline.races.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Race list */}
                <div className="divide-y divide-[var(--border-color)]">
                  {discipline.races.map((race) => (
                    <div key={race.name + race.date} className="px-5 py-3 flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-[var(--text-primary)]">
                          {race.name}
                        </span>
                        <span className="text-xs text-[var(--text-muted)] whitespace-nowrap flex items-center gap-1">
                          <Calendar size={11} />
                          {race.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                        <span className="flex items-center gap-1">
                          <MapPin size={11} className="text-[var(--accent-light)]" />
                          {race.location}
                        </span>
                        {race.distance && (
                          <span className="text-[var(--accent-light)] font-medium">
                            {race.distance}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Other interests */}
        <div className="flex flex-wrap gap-4">
          {otherInterests.map((item) => {
            const Icon = interestIconMap[item.icon]
            return (
              <div
                key={item.label}
                className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-light)]/30 hover:shadow-md transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-[var(--accent-light)]/10 flex items-center justify-center group-hover:bg-[var(--accent-light)]/20 transition-colors">
                  <Icon size={18} className="text-[var(--accent-light)]" />
                </div>
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
