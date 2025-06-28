const About = () => {
  const features = [
    {
      icon: 'fas fa-shield-alt',
      title: 'Safe & Confidential',
      description: 'Your privacy and confidentiality are our top priorities.'
    },
    {
      icon: 'fas fa-certificate',
      title: 'Licensed Professionals',
      description: 'All our therapists are fully licensed and experienced.'
    },
    {
      icon: 'fas fa-heart',
      title: 'Compassionate Care',
      description: 'We approach every client with empathy and understanding.'
    }
  ]

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">About Healing Hearts</h2>
            <p>
              At Healing Hearts, we believe everyone deserves access to compassionate, 
              professional mental health care. Our team of licensed therapists is dedicated 
              to creating a safe, non-judgmental space where you can explore your thoughts, 
              feelings, and experiences.
            </p>
            
            <div className="about-features">
              {features.map((feature, index) => (
                <div key={index} className="feature">
                  <i className={feature.icon}></i>
                  <div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="about-image">
            <div className="about-placeholder">
              <i className="fas fa-hand-holding-heart"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 