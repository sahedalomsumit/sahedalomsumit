import { useParams, Link } from 'react-router-dom'
import { getProjectBySlug, getAdjacentProjects } from '../data/projects'
import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const { prev, next } = getAdjacentProjects(slug)

  if (!project) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-6xl font-black text-white mb-4">404</h1>
          <p className="text-gray-500 font-mono mb-8">PROJECT_NOT_FOUND</p>
          <Link to="/portfolio" className="px-8 py-3 bg-white text-black font-bold rounded-full text-xs uppercase tracking-widest hover:bg-violet-500 hover:text-white transition">Back_to_Portfolio</Link>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="mb-8">
            <Link to="/portfolio" className="font-mono text-xs text-gray-500 hover:text-violet-400 transition tracking-widest uppercase">
              ← Back_to_All_Builds
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
            <div>
              <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                / Project_Detail
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white uppercase leading-[0.9]">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-3 mt-6">
                {project.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-white text-black font-black rounded-2xl text-xs tracking-[0.2em] hover:bg-violet-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl shadow-violet-500/10 uppercase flex items-center gap-2 shrink-0"
            >
              View_Live_Site
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </RevealOnScroll>

        {/* Project Hero Image */}
        <RevealOnScroll>
          <div className="aspect-[16/9] bento-card overflow-hidden relative border-none bg-[#0a0a0a] mb-16">
            <img
              src={project.thumbnailUrl}
              alt={`${project.title} Website`}
              className="object-cover w-full h-full rounded-2xl"
            />
          </div>
        </RevealOnScroll>

        {/* Project Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <RevealOnScroll className="lg:col-span-4">
            <div className="bento-card p-8 h-full">
              <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-8">/ Quick_Data</div>
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Industry</p>
                  <p className="text-white text-lg font-semibold">{project.industry}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Year</p>
                  <p className="text-white text-lg font-semibold">{project.year}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Tech_Stack</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-lg text-[10px] font-mono text-violet-400 uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Live_URL</p>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-violet-400 text-sm font-semibold hover:text-white transition truncate block">
                    {project.liveUrl.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <div className="lg:col-span-8 space-y-8">
            <RevealOnScroll>
              <div className="bento-card p-8 md:p-12">
                <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-6">/ Overview</div>
                <p className="text-gray-400 text-lg leading-relaxed font-light">{project.fullDescription}</p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="bento-card p-8 md:p-12">
                <div className="font-mono text-violet-400 text-[10px] uppercase tracking-widest mb-6">/ The_Challenge</div>
                <p className="text-gray-400 text-lg leading-relaxed font-light">{project.challenge}</p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="bento-card p-8 md:p-12">
                <div className="font-mono text-emerald-500 text-[10px] uppercase tracking-widest mb-6">/ The_Solution</div>
                <p className="text-gray-400 text-lg leading-relaxed font-light">{project.solution}</p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="bento-card p-8 md:p-12">
                <div className="font-mono text-violet-400 text-[10px] uppercase tracking-widest mb-6">/ Results_&_Impact</div>
                <p className="text-gray-400 text-lg leading-relaxed font-light">{project.results}</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Key Features */}
        <RevealOnScroll>
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-white uppercase tracking-tighter mb-10">Key_Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.keyFeatures.map((feature, i) => (
                <div key={i} className="bento-card p-6 flex items-center gap-4 group">
                  <span className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 font-mono text-xs font-bold shrink-0 group-hover:bg-emerald-500/20 transition">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-gray-300 text-sm">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Navigation */}
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to={`/portfolio/${prev.slug}`} className="bento-card p-8 group hover:border-violet-500 transition-all">
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">← Previous_Build</p>
              <h4 className="text-2xl font-bold text-white group-hover:text-violet-400 transition">{prev.title}</h4>
              <p className="text-gray-500 text-xs font-mono mt-2">{prev.industry}</p>
            </Link>
            <Link to={`/portfolio/${next.slug}`} className="bento-card p-8 group hover:border-emerald-500 transition-all text-right">
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">Next_Build →</p>
              <h4 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition">{next.title}</h4>
              <p className="text-gray-500 text-xs font-mono mt-2">{next.industry}</p>
            </Link>
          </div>
        </RevealOnScroll>
      </section>

      <ContactSection />
    </>
  )
}
