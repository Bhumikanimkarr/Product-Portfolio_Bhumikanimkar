import { Nav } from '@/components/site/nav'
import { Hero } from '@/components/site/hero'
import { Problems } from '@/components/site/problems'
import { Work } from '@/components/site/work'
import { About, Services } from '@/components/site/about-services'
import { Process, ToolsMarquee } from '@/components/site/process'
import { Lab } from '@/components/site/lab'
import { Contact, Faq } from '@/components/site/faq-contact'

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problems />
        <Work />
        <About />
        <Services />
        <Process />
        <ToolsMarquee />
        <Lab />
        <Faq />
        <Contact />
      </main>
    </>
  )
}
