const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Your Journey to Healing Starts Here</h1>
          <p className="hero-subtitle">
            Professional therapy services in a safe, supportive environment. 
            We're here to help you navigate life's challenges and find your path to wellness.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn btn-primary" 
              onClick={() => scrollToSection('contact')}
            >
              Book a Session
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => scrollToSection('services')}
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-placeholder">
            <i className="fas fa-spa"></i>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 