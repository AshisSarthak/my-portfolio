import { career, recognition } from '../data/portfolio'
import { Container, Section, SectionHeading } from '../styles/PortfolioStyles'
import { CareerItem, CareerList, Recognition } from '../styles/CareerStyles'
import { CompactCareer } from '../styles/WorkStyles'

export function Career() {
  return (
    <Container>
      <Section id="career">
        <SectionHeading>
          <span className="section-index">Experience</span>
          <h2>The path behind the practice.</h2>
        </SectionHeading>
        <CompactCareer>
          <summary>Explore 12+ years, eight teams, and the details of my journey</summary>
          <div>
            <CareerList>
              {career.map((item) => (
                <CareerItem key={item.company}>
                  <div>
                    <h3>{item.company}</h3>
                    <p>{item.role}</p>
                  </div>
                  <time>{item.period}</time>
                </CareerItem>
              ))}
            </CareerList>
            <Recognition aria-label="Recognition">
              {recognition.map((award) => <span key={award}>{award}</span>)}
            </Recognition>
          </div>
        </CompactCareer>
      </Section>
    </Container>
  )
}
