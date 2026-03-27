import RevealOnScroll from '../components/RevealOnScroll'
import ProjectCard from '../components/ProjectCard'
import ContactSection from '../components/ContactSection'
import { getProjects } from '../data/projects'

export default function Portfolio() {
  const projects = getProjects()

  return (
    <>
      <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white uppercase">Main_All_Builds</h2>
              <p className="text-gray-500 mt-3 text-lg italic">Curated high-performance web solutions.</p>
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-16">
          {projects.map(p => (
            <RevealOnScroll key={p.id}>
              <ProjectCard project={p} layout="full" />
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <ContactSection />
    </>
  )
}
