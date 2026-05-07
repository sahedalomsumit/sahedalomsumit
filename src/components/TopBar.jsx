export default function TopBar() {
  return (
    <div
      className="w-full py-2.5 px-4 hidden md:flex flex-col md:flex-row justify-center items-center text-[10px] font-mono tracking-[0.2em] z-[60] relative"
      style={{
        backgroundColor: 'var(--topbar-bg)',
        borderBottom: '1px solid var(--topbar-border)',
        color: 'var(--text-muted)',
      }}
    >
      <div className="flex items-center gap-2 text-emerald-500">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        <span style={{ color: 'var(--text-main)' }}>SYSTEM_STATUS:</span>
        OPEN FOR COLLABORATIONS
      </div>
      <span className="mx-6 hidden md:block" style={{ color: 'var(--border)' }}>|</span>
      <div className="flex gap-6 mt-2 md:mt-0">
        <a
          href="https://wa.me/+358415765539"
          className="hover:text-violet-400 transition"
          style={{ color: 'var(--text-muted)' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          MESSAGE_WHATSAPP »
        </a>
        <span className="hidden md:block" style={{ color: 'var(--border)' }}>|</span>
        <a
          href="/img/web-designer-and-developer-sahed-alom-sumit.pdf"
          className="font-bold hover:text-violet-400 transition underline underline-offset-4 decoration-violet-500/50"
          style={{ color: 'var(--text-main)' }}
        >
          DOWNLOAD_RESUME.PDF
        </a>
      </div>
    </div>
  );
}
