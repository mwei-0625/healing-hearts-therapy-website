const Therapists = () => {
  const therapists = [
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'Clinical Psychologist',
      description: 'Specializes in anxiety, depression, and trauma therapy with over 10 years of experience.',
      credentials: ['Ph.D. Clinical Psychology', 'Licensed Psychologist']
    },
    {
      name: 'Michael Chen, LCSW',
      specialty: 'Licensed Clinical Social Worker',
      description: 'Expert in couples therapy and family dynamics with a focus on communication skills.',
      credentials: ['MSW Social Work', 'Licensed Clinical Social Worker']
    },
    {
      name: 'Dr. Emily Rodriguez',
      specialty: 'Child & Adolescent Psychologist',
      description: 'Dedicated to helping children and teens navigate emotional and behavioral challenges.',
      credentials: ['Ph.D. Child Psychology', 'Licensed Psychologist']
    }
  ]

  return (
    <section id="therapists" className="therapists">
      <div className="container">
        <h2 className="section-title">Meet Our Therapists</h2>
        <p className="section-subtitle">
          Our experienced team is here to support you on your healing journey
        </p>
        
        <div className="therapists-grid">
          {therapists.map((therapist, index) => (
            <div key={index} className="therapist-card">
              <div className="therapist-image">
                <i className="fas fa-user-md"></i>
              </div>
              <h3>{therapist.name}</h3>
              <p className="therapist-specialty">{therapist.specialty}</p>
              <p className="therapist-description">{therapist.description}</p>
              <div className="therapist-credentials">
                {therapist.credentials.map((credential, credIndex) => (
                  <span key={credIndex}>{credential}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Therapists 