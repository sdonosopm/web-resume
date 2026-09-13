import { ArrowUp } from 'lucide-react'
import { useT } from '../i18n'

export function BackToTop() {
  const t = useT()
  return (
    <div className="max-w-6xl mx-auto mt-12 flex justify-center">
      <a
        href="#top"
        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-light)]/40 transition-colors"
      >
        <ArrowUp size={14} />
        {t.common.backToTop}
      </a>
    </div>
  )
}
