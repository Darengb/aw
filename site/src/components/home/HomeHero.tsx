import MetricCard from './MetricCard';

export default function HomeHero() {
  return (
    <section className="hero min-h-screen flex items-center relative bg-transparent overflow-hidden isolate">
      <div className="hero-video-background absolute inset-0 -z-20 overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 opacity-100 object-cover">
          <source src="/images/hero-bg-vid.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="grid-overlay absolute inset-0 bg-black/20 -z-10 opacity-100"></div>

      <div className="hero-container max-w-container mx-auto px-8 relative grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 md:gap-24 items-center">
        <div className="hero-content relative order-1">
          <h1 className="hero-headline font-display text-[4rem] md:text-[7rem] font-normal leading-[1.05] tracking-[-0.02em] mb-0 md:mb-14 text-white">
            <span className="line-1 block font-normal">Real Jobs.</span>
            <span className="line-2 block text-white/85 relative font-normal">Real Support.</span>
            <span className="line-2 block text-white/85 relative font-normal"><span className="accent relative text-white">Real Results.</span></span>
          </h1>

          {/* Desktop CTA */}
          <div className="hero-ctas hidden md:flex gap-5">
            <a href="#paths" className="btn-secondary"><span>Get Started</span></a>
          </div>
        </div>

        {/* Dashboard */}
        <aside className="federal-monitor bg-transparent border-none overflow-visible relative order-2">
          {/* Dashboard Header - Hidden */}
          <div className="dashboard-header bg-transparent pb-4 border-none hidden justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <div>
                <div className="title-main font-body text-xs font-bold uppercase tracking-[0.08em] text-aw-blue">Performance Dashboard</div>
                <div className="title-sub font-mono text-[0.625rem] text-gray-500 tracking-wider">Lives Changed</div>
              </div>
            </div>
            <div className="dashboard-status flex items-center gap-2 px-3 py-1.5 bg-aw-blue/8 border border-aw-blue/25 rounded-sm">
              <span className="status-pulse w-1.5 h-1.5 bg-aw-blue rounded-full"></span>
              <span className="status-label font-mono text-[0.6875rem] font-semibold text-aw-blue tracking-wider uppercase">Active</span>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="dashboard-grid p-0 grid grid-cols-2 gap-4 relative">
            <MetricCard
              tag="EST. 1984"
              value="10,000,000"
              symbol="+"
              symbolPosition="right"
              label="Clients Served"
              isHero={true}
            />
            <MetricCard
              value="4"
              symbol="~"
              symbolPosition="left"
              label="Weeks to Place"
            />
            <MetricCard
              value="60%"
              symbol=">"
              symbolPosition="left"
              label="Retention Rate"
            />
            <MetricCard
              value="11"
              symbol="+"
              symbolPosition="right"
              label="States Covered"
            />
            <MetricCard
              value="40"
              symbol="+"
              symbolPosition="right"
              label="Years Operating"
            />
          </div>
        </aside>

        {/* Mobile CTA - shown below stats */}
        <div className="hero-ctas-mobile flex md:hidden gap-5 order-3 w-full">
          <a href="#paths" className="btn-secondary w-full text-center justify-center"><span>Get Started</span></a>
        </div>
      </div>
    </section>
  );
}
