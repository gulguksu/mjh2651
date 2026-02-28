export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Big Text */}
      <div className="px-6 md:px-12 pt-20 md:pt-32 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-mono text-5xl md:text-8xl lg:text-9xl tracking-tighter leading-none text-balance">
            아산신화초등학교 5학년 1반,
            <br />
            <span className="text-primary-foreground/40">
              언제나 빛나는
            </span>
            <br />
            우리들.
          </h2>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-6 md:px-12 py-10 border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <span className="font-mono text-sm tracking-tight">5-1 CLASS.</span>
            <div className="flex items-center gap-6 text-xs text-primary-foreground/50">
              <span>아산시 영인면</span>
              <span>아산신화초등학교</span>
              <span>5학년 1반</span>
            </div>
          </div>
          <p className="text-xs text-primary-foreground/30 font-mono">
            &copy; 2026 Class 5-1. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
