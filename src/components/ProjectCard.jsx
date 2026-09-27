import { Link } from 'react-router-dom'

export default function ProjectCard({ project, layout = 'grid' }) {
  const isGrid = layout === 'grid'

  return (
    <div className="group relative">
      <div
        className={`${isGrid ? 'aspect-[16/10]' : 'aspect-[16/9]'} bento-card overflow-hidden mb-5 relative group/card cursor-pointer`}
        style={{ backgroundColor: 'var(--card-bg)' }}
      >
        {/* Stretched Link to Case Study */}
        <Link
          to={`/work/${project.slug}`}
          className="absolute inset-0 z-0"
          aria-label={`View ${project.title} case study`}
        />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          {project.industry ? (
            <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md bg-black/60 text-white/90 border border-white/10 shadow-sm pointer-events-none">
              {project.industry}
            </span>
          ) : <span />}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto p-2 rounded-full backdrop-blur-md bg-black/60 text-white/80 hover:text-white hover:bg-violet-600 transition-all border border-white/10 shadow-sm"
              title="View Live Site"
              aria-label={`View live site for ${project.title}`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>

        {/* Hover Specular Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-400 z-10 flex flex-col justify-end p-6 pointer-events-none">
          <div className="transform translate-y-3 group-hover/card:translate-y-0 transition-transform duration-300">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white tracking-wider uppercase mb-2">
              <span>Explore Case Study</span>
              <svg className="w-3.5 h-3.5 text-violet-400 transition-transform group-hover/card:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="flex gap-1.5 flex-wrap">
              {(project.tags || []).slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase bg-white/15 text-white/90 backdrop-blur-sm border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Image with smooth zoom */}
        <div className="w-full h-full overflow-hidden bg-black/20 flex items-center justify-center">
          <img
            src={project.thumbnailUrl}
            alt={`${project.title} - ${project.industry || 'Web Design'} Project by Sahed Alom Sumit`}
            className="object-cover w-full h-full transform transition-transform duration-700 ease-out group-hover/card:scale-105"
            loading="lazy"
          />
        </div>
      </div>

      {/* Card Info Below */}
      <div className="flex justify-between items-start px-1.5">
        <div className="space-y-1">
          <Link to={`/work/${project.slug}`}>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-violet-400 transition-colors"
                style={{ color: 'var(--text-main)' }}>
              {project.title}
            </h3>
          </Link>
          <p className="text-xs line-clamp-1 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {project.shortDescription}
          </p>
        </div>

        <Link
          to={`/work/${project.slug}`}
          className="w-8 h-8 rounded-full border flex items-center justify-center transition-all group-hover:border-violet-500 group-hover:bg-violet-500/10 flex-shrink-0 ml-3"
          style={{ borderColor: 'var(--border)' }}
          aria-label={`Open ${project.title}`}
        >
          <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-violet-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
