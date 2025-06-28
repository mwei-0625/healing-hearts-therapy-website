const Services = () => {
  const services = [
    {
      icon: 'fas fa-brain',
      title: 'Cognitive Behavioral Therapy',
      description: 'Identify and change negative thought patterns to improve emotional well-being and behavior.'
    },
    {
      icon: 'fas fa-users',
      title: 'Couples Therapy',
      description: 'Strengthen relationships, improve communication, and resolve conflicts together.'
    },
    {
      icon: 'fas fa-child',
      title: 'Child & Adolescent Therapy',
      description: 'Specialized support for young people dealing with emotional and behavioral challenges.'
    },
    {
      icon: 'fas fa-anxiety',
      title: 'Anxiety & Depression',
      description: 'Evidence-based treatments for managing anxiety, depression, and mood disorders.'
    },
    {
      icon: 'fas fa-trauma',
      title: 'Trauma Therapy',
      description: 'Safe and effective treatment for trauma, PTSD, and related conditions.'
    },
    {
      icon: 'fas fa-balance-scale',
      title: 'Life Transitions',
      description: 'Support during major life changes, grief, career transitions, and personal growth.'
    }
  ]

  return (
    <section id="services" className="services">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          We offer a comprehensive range of therapeutic approaches to meet your unique needs
        </p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services 