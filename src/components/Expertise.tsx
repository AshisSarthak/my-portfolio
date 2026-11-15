import { Capability, CapabilityList, PracticeArea, PracticeGrid } from '../styles/ExpertiseStyles'
import { Container, Section, SectionHeading } from '../styles/PortfolioStyles'

const practiceAreas = [
  {
    title: 'Interface',
    detail: 'React · TypeScript · Design systems · Accessibility',
  },
  {
    title: 'Architecture',
    detail: 'Feature-Sliced Design · Micro-frontends · Monorepos',
  },
  {
    title: 'Quality',
    detail: 'Performance · Jest · Storybook · CI/CD',
  },
  {
    title: 'People',
    detail: 'Technical direction · Mentorship · Product partnership',
  },
]

export function Expertise() {
  return (
    <Container>
      <Section id="approach">
        <SectionHeading>
          <span className="section-index">What connects it</span>
          <h2>Different disciplines. One coherent experience.</h2>
        </SectionHeading>
        <PracticeGrid>
          {practiceAreas.map((area) => (
            <PracticeArea key={area.title}>
              <span>{area.title}</span>
              <CapabilityList>
                {area.detail.split(' · ').map((capability) => (
                  <Capability key={capability}>{capability}</Capability>
                ))}
              </CapabilityList>
            </PracticeArea>
          ))}
        </PracticeGrid>
      </Section>
    </Container>
  )
}
