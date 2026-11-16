import { useState } from 'react'
import { career, recognition } from '../data/portfolio'
import { Container, Section, SectionHeading } from '../styles/PortfolioStyles'
import { CareerPanel, Recognition } from '../styles/CareerStyles'

export function Career() {
  const [selectedRole, setSelectedRole] = useState(0)
  const role = career[selectedRole]

  return (
    <Container>
      <Section id="career">
        <SectionHeading>
          <span className="section-index">Experience</span>
          <h2>A career built in chapters.</h2>
        </SectionHeading>
        <CareerPanel role="region" aria-label="Career index">
          <div className="index-layout">
            <ol className="career-entries index-list" aria-label="Career timeline">
              {career.map((item, index) => (
                <li className="career-entry" key={item.company}>
                  <button
                    type="button"
                    aria-pressed={selectedRole === index}
                    onClick={() => setSelectedRole(index)}
                  >
                    <time>{item.period}</time>
                    <span className="index-company-copy">
                      <span className="company-name">{item.company}</span>
                      <span className="company-role">{item.role}</span>
                    </span>
                    <span className="company-mark">
                      <img src={item.logo} alt="" loading="lazy" decoding="async" />
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <aside
              className="index-detail"
              aria-label="Role overview"
              aria-live="polite"
              key={selectedRole}
            >
              <div className="company-mark">
                <img src={role.logo} alt={`${role.company} logo`} loading="lazy" decoding="async" />
              </div>
              <div className="index-heading">
                <h3>{role.company}</h3>
                <p>{role.role}</p>
                <div className="index-meta">
                  <time>{role.period}</time>
                  <span>{role.location}</span>
                </div>
              </div>
              <section className="index-overview" aria-labelledby="career-overview-title">
                <h4 id="career-overview-title">Overview</h4>
                <p>{role.overview}</p>
              </section>
              <ul className="index-highlights" aria-label="Role highlights">
                {role.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <ul className="index-focus" aria-label="Role focus areas">
                {role.focus.map((focus) => (
                  <li key={focus}>{focus}</li>
                ))}
              </ul>
            </aside>
          </div>
        </CareerPanel>
        <Recognition aria-label="Recognition">
          {recognition.map((award) => <span key={award}>{award}</span>)}
        </Recognition>
      </Section>
    </Container>
  )
}
