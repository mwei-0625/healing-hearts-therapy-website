import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you for your message! We will get back to you within 24 hours.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      })
      setIsSubmitting(false)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      content: '(555) 123-4567'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      content: 'hello@healinghearts.com'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      content: '123 Healing Street\nWellness City, WC 12345'
    },
    {
      icon: 'fas fa-clock',
      title: 'Hours',
      content: 'Mon-Fri: 9AM-7PM\nSat: 10AM-4PM'
    }
  ]

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get Started Today</h2>
        <p className="section-subtitle">
          Take the first step towards healing. Contact us to schedule your initial consultation.
        </p>
        
        <div className="contact-content">
          <div className="contact-info">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-item">
                <i className={info.icon}></i>
                <div>
                  <h4>{info.title}</h4>
                  <p>{info.content}</p>
                </div>
              </div>
            ))}
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a Service</option>
                <option value="cbt">Cognitive Behavioral Therapy</option>
                <option value="couples">Couples Therapy</option>
                <option value="child">Child & Adolescent Therapy</option>
                <option value="anxiety">Anxiety & Depression</option>
                <option value="trauma">Trauma Therapy</option>
                <option value="transitions">Life Transitions</option>
              </select>
            </div>
            
            <div className="form-group">
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about what brings you to therapy..."
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            {submitMessage && (
              <div className="success-message">
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact 