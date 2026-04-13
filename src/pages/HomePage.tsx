import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Experience } from '../components/Experience'
import { Skills } from '../components/Skills'
import { Projects } from '../components/Projects'
import { Education } from '../components/Education'
import { Interests } from '../components/Interests'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'

interface HomePageProps {
  isDark: boolean
  toggleDark: () => void
}

export function HomePage({ isDark, toggleDark }: HomePageProps) {
  return (
    <>
      <Navbar isDark={isDark} toggleDark={toggleDark} />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Interests />
      <Contact />
      <Footer />
    </>
  )
}
