import { work } from '../data/portfolio'
import { Container, Section, SectionHeading } from '../styles/PortfolioStyles'
import { CaseStudy, CaseStudyCopy, CaseStudyIndex, CaseStudyList, WorkArtwork } from '../styles/WorkStyles'
import { WorkArtwork as WorkArtworkIllustration } from './WorkArtwork'

export function SelectedWork() {
  return (
    <Container>
      <Section id="work">
        <SectionHeading>
          <span className="section-index">Selected work</span>
          <h2>Not just what I built—how I made it better.</h2>
        </SectionHeading>
        <CaseStudyList>
          {work.map((item) => (
            <CaseStudy key={item.number} id={item.id}>
              <WorkArtwork>
                <WorkArtworkIllustration type={item.visual} title={item.title} />
              </WorkArtwork>
              <CaseStudyCopy>
                <CaseStudyIndex>CASE {item.number} · {item.category}</CaseStudyIndex>
                <span>{item.organization}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <small>
                  <strong>My role:</strong> {item.contribution}
                  {item.technologies.length > 0 && (
                    <>
                      <br />
                      <strong>Built with:</strong> {item.technologies.join(' · ')}
                    </>
                  )}
                </small>
              </CaseStudyCopy>
            </CaseStudy>
          ))}
        </CaseStudyList>
      </Section>
    </Container>
  )
}
