import { Container, Section, SectionHeading } from '../styles/PortfolioStyles'
import { HelpGrid, HelpItem, ImpactBar, ImpactItem } from '../styles/HelpStyles'

const strengths = [
  {
    title: 'Find the right frontend shape',
    description:
      'Clarify boundaries, data flows, and shared patterns before complexity turns into costly rewrites.',
    evidence: 'Modular dashboard architecture',
    href: '#case-apple',
  },
  {
    title: 'Make complex interfaces feel clear',
    description:
      'Bring product intent, responsive behavior, accessibility, and performance together in data-rich experiences.',
    evidence: 'Enterprise banking experience',
    href: '#case-sberbank',
  },
  {
    title: 'Help teams deliver with confidence',
    description:
      'Set practical engineering standards, review critical decisions, and grow capability through technical guidance.',
    evidence: 'Frontend team enablement',
    href: '#case-adia',
  },
]

export function HowIHelp() {
  return (
    <Container>
      <Section id="services">
        <SectionHeading>
          <span className="section-index">Where I add value</span>
          <h2>Bring me the messy, important part.</h2>
        </SectionHeading>
        <HelpGrid>
          {strengths.map((strength) => (
            <HelpItem key={strength.title}>
              <h3>{strength.title}</h3>
              <p>{strength.description}</p>
              <a href={strength.href}>{strength.evidence} <span aria-hidden="true">↗</span></a>
            </HelpItem>
          ))}
        </HelpGrid>
        <ImpactBar aria-label="Selected delivery experience">
          <ImpactItem>
            <strong>90%</strong>
            <span>faster application delivery reported after AI-assisted frontend workflows</span>
          </ImpactItem>
          <ImpactItem>
            <strong>4–5</strong>
            <span>engineers guided while owning an enterprise banking module</span>
          </ImpactItem>
          <ImpactItem>
            <strong>End to end</strong>
            <span>from initial product design through frontend delivery</span>
          </ImpactItem>
        </ImpactBar>
      </Section>
    </Container>
  )
}
