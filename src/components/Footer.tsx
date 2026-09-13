import { useT } from '../i18n'

export function Footer() {
  const t = useT()
  const year = new Date().getFullYear()

  return (
    <footer className="py-8 px-6 bg-navy-950 text-center">
      <p className="text-sm text-navy-400">
        &copy; {year} Sebastián Donoso. {t.footer.rights}
      </p>
    </footer>
  )
}
