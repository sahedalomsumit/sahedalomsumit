export default function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-5xl mx-auto text-center reveal">
        <h2 className="text-5xl sm:text-6xl md:text-[8rem] font-extrabold mb-14 tracking-tighter leading-none text-white uppercase">
          Let's build_
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-20">
          <div className="bento-card p-10 flex flex-col justify-between group cursor-pointer hover:border-violet-500 transition-all">
            <a href="mailto:sahedalomsumit@gmail.com" target="_blank" rel="noopener noreferrer">
              <div>
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-violet-500 transition">
                  <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="font-mono text-[9px] text-emerald-500 font-bold uppercase mb-2 tracking-widest">Sync_Email</p>
                <h3 className="text-l md:text-2xl font-bold text-white truncate">sahedalomsumit@gmail.com</h3>
              </div>
              <p className="mt-8 text-gray-500 group-hover:text-violet-400 transition text-xs font-mono">Initialize_Chat_Sequence »</p>
            </a>
          </div>
          <div className="bento-card p-10 flex flex-col justify-between group cursor-pointer hover:border-emerald-500 transition-all">
            <a href="https://wa.me/+358415765539" target="_blank" rel="noopener noreferrer">
              <div>
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-emerald-500 transition">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="font-mono text-[9px] text-emerald-500 font-bold uppercase mb-2 tracking-widest">Instant_Ping</p>
                <h3 className="text-l md:text-2xl font-bold text-white">+358 41 576 5539</h3>
              </div>
              <p className="mt-8 text-gray-500 group-hover:text-emerald-400 transition text-xs font-mono">Sync_Mobile_Node »</p>
            </a>
          </div>
        </div>

        <a
          href="mailto:sahedalomsumit@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-16 py-6 bg-white text-black font-black text-xs uppercase tracking-[0.4em] rounded-full hover:bg-violet-500 hover:text-white transition-all transform hover:scale-105 shadow-2xl shadow-white/5 inline-block"
        >
          Execute_Handshake
        </a>
      </div>
    </section>
  )
}
