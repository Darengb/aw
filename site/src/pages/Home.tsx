export function Home() {
  return (
    <div className="theme-red">
      <section className="hero">
        <div className="hero-video-background">
          <video autoPlay muted loop playsInline>
            <source src="/images/hero-bg-vid.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="grid-overlay" />
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-headline">Home Page</h1>
            <p className="hero-subheadline">Placeholder - will be implemented in Phase 6A</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
