import { Link } from 'react-router-dom'

export default function ProjectCard({ project, layout = 'grid' }) {
  const isGrid = layout === 'grid'

  return (
    <div className="group reveal">
      <Link to={`/portfolio/${project.slug}`}>
        <div className={`${isGrid ? 'aspect-[16/10]' : 'aspect-[16/9]'} bento-card overflow-hidden mb-8 relative border-none bg-[#0a0a0a]`}>
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center p-8">
            <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <p className="text-white text-sm mb-4 font-light tracking-wide">View_Project</p>
              <div className="flex gap-2 justify-center flex-wrap">
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white/10 border border-white/20 rounded text-[9px] font-mono uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Image */}
          <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0">
            <img
              src={project.thumbnailUrl}
              alt={`${project.title} Website Thumbnail`}
              className="object-cover w-full h-full rounded-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </Link>
      <div className="flex justify-between items-start px-2">
        <div>
          <h4 className="text-2xl font-bold mb-1 text-white group-hover:text-violet-400 transition">
            {project.title}
          </h4>
          <p className="text-gray-500 text-xs font-mono">
            {project.shortDescription}
          </p>
        </div>
      </div>
    </div>
  )
}
