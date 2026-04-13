import { useState } from 'react'
import { ExternalLink, Monitor, FileText, BarChart3, Play } from 'lucide-react'
import { GithubIcon } from './icons'
import { projects, type Project } from '../data/resume'
import { VideoModal } from './VideoModal'

const categoryIcons = {
  'web-app': Monitor,
  research: FileText,
  data: BarChart3,
}

const categoryLabels = {
  'web-app': 'Web Application',
  research: 'Research',
  data: 'Data Analysis',
}

const filters = ['all', 'web-app', 'research', 'data'] as const

export function Projects() {
  const [filter, setFilter] = useState<string>('all')
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null)

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="py-24 px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-light)] mb-2">
          Portfolio
        </h2>
        <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
          Featured Projects
        </h3>
        <p className="text-[var(--text-secondary)] mb-8 max-w-2xl">
          A selection of finance and technology projects showcasing full-stack development, data analysis, and financial research.
        </p>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filter === f
                  ? 'bg-[var(--accent-light)] text-white'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {f === 'all' ? 'All Projects' : categoryLabels[f]}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onPlayVideo={(id, title) => setActiveVideo({ id, title })}
            />
          ))}
        </div>
      </div>

      {activeVideo && (
        <VideoModal
          videoId={activeVideo.id}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  )
}

function ProjectCard({
  project,
  onPlayVideo,
}: {
  project: Project
  onPlayVideo: (videoId: string, title: string) => void
}) {
  const Icon = categoryIcons[project.category]
  const hasVideo = Boolean(project.videoId)

  return (
    <div className="group flex flex-col rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-light)]/30 transition-all hover:shadow-lg hover:shadow-[var(--accent-light)]/5 overflow-hidden">
      {/* Header with gradient - clickable if video available */}
      <div
        className={`relative h-36 bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center ${hasVideo ? 'cursor-pointer' : ''}`}
        onClick={() => hasVideo && onPlayVideo(project.videoId!, project.title)}
      >
        {hasVideo ? (
          // YouTube thumbnail when video is available
          <>
            <img
              src={`https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`}
              alt={`${project.title} preview`}
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
            />
            <div className="relative z-10 w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <Play size={22} className="text-[#1e3a5f] ml-1" fill="#1e3a5f" />
            </div>
          </>
        ) : (
          <Icon size={40} className="text-navy-300 group-hover:text-white transition-colors" />
        )}

        <div className="absolute top-3 right-3 z-20">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white/10 text-navy-200 backdrop-blur-sm">
            {categoryLabels[project.category]}
          </span>
        </div>
        {project.hasDemo && (
          <div className="absolute top-3 left-3 z-20">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-300 backdrop-blur-sm">
              {hasVideo ? 'Video Demo' : 'Demo Available'}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-5">
        <h4 className="text-base font-semibold text-[var(--text-primary)] mb-2 leading-snug">
          {project.title}
        </h4>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-1 mb-4">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <span className="w-1 h-1 rounded-full bg-[var(--accent-light)]" />
              {h}
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[11px] font-medium rounded bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-[var(--border-color)] flex gap-4 items-center">
        {hasVideo && (
          <button
            onClick={() => onPlayVideo(project.videoId!, project.title)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-light)] hover:underline"
          >
            <Play size={12} fill="currentColor" />
            Watch Demo
          </button>
        )}
        {project.hasDemo && project.demoPath && (
          <a
            href={project.demoPath}
            className="flex items-center gap-1.5 text-xs font-medium text-[var(--accent-light)] hover:underline"
          >
            <ExternalLink size={12} />
            Live Demo
          </a>
        )}
        <a href="#" className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]">
          <GithubIcon size={12} />
          Source Code {/* mock */}
        </a>
      </div>
    </div>
  )
}
