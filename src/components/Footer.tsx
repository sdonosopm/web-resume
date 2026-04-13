export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-8 px-6 bg-navy-950 text-center">
      <p className="text-sm text-navy-400">
        &copy; {year} Sebastian Donoso. All rights reserved.
      </p>
    </footer>
  )
}
