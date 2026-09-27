import { Link } from 'react-router-dom';
import RevealOnScroll from './RevealOnScroll';
import TechIcon from './TechIcon';

const hubs = [
  { slug: 'full-stack-development', title: 'Full-Stack Development', color: 'emerald', label: 'Full_Stack_Hub' },
  { slug: 'low-no-code-development', title: 'Low/No-Code Solutions', color: 'violet', label: 'Low_No_Code_Hub' },
  { slug: 'ui-ux-design', title: 'UI/UX Design', color: 'violet', label: 'Design_Hub' },
  { slug: 'app-development', title: 'App Development & Tools', color: 'emerald', label: 'App_Tools_Hub' }
];

export default function HubNavigation({ currentSlug }) {
  const otherHubs = hubs.filter(h => h.slug !== currentSlug);

  return (
    <section className="py-16 border-t border-white/5 bg-[#030303]">
      <RevealOnScroll>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div className="font-mono text-gray-500 text-[10px] uppercase tracking-widest flex items-center gap-4">
              <span className="w-8 h-[1px] bg-white/10"></span>
              Explore_Other_Service_Architecture
            </div>
            <Link 
              to="/services" 
              className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest hover:text-white transition-colors"
            >
              View_All_Services →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherHubs.map((hub) => (
              <Link 
                key={hub.slug}
                to={`/services/${hub.slug}`}
                className={`bento-card p-6 group border-${hub.color}-500/10 bg-white/[0.01] hover:bg-${hub.color}-500/5 transition-all flex flex-col justify-between h-full`}
              >
                <div>
                  <div className={`font-mono text-${hub.color}-500 text-[9px] uppercase tracking-widest mb-4 opacity-50 group-hover:opacity-100 transition-opacity`}>/ {hub.label}</div>
                  <h3 className="text-xl font-black text-white/60 group-hover:text-white transition-colors uppercase italic leading-tight">{hub.title}</h3>
                </div>
                <div className={`mt-6 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-gray-500 group-hover:text-${hub.color}-500 transition-colors`}>
                  Enter_Hub →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}

