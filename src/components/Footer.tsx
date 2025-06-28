const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <i className="fas fa-heart"></i>
              <span>Healing Hearts</span>
            </div>
            <p>Providing compassionate therapy services to help you heal, grow, and thrive.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><button onClick={() => scrollToSection('home')} className="footer-link">Home</button></li>
              <li><button onClick={() => scrollToSection('services')} className="footer-link">Services</button></li>
              <li><button onClick={() => scrollToSection('about')} className="footer-link">About</button></li>
              <li><button onClick={() => scrollToSection('therapists')} className="footer-link">Therapists</button></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>Cognitive Behavioral Therapy</li>
              <li>Couples Therapy</li>
              <li>Child & Adolescent Therapy</li>
              <li>Anxiety & Depression</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p><i className="fas fa-phone"></i> (555) 123-4567</p>
            <p><i className="fas fa-envelope"></i> hello@healinghearts.com</p>
            <p><i className="fas fa-map-marker-alt"></i> 123 Healing Street, Wellness City</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Healing Hearts Therapy Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 