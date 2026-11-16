import { profile } from '../data/portfolio'
import { Container, Eyebrow } from '../styles/PortfolioStyles'
import { Footer, PrimaryLink, Signature } from '../styles/ContactStyles'
import { ContactBlock } from '../styles/WorkStyles'

export function Contact() {
  return (
    <Container>
      <ContactBlock id="contact">
        <div>
          <Eyebrow>Next coordinates</Eyebrow>
          <h2>Have a knotty frontend challenge? I&apos;d like to hear about it.</h2>
        </div>
        <PrimaryLink href={`mailto:${profile.email}`}>Start a conversation ↗</PrimaryLink>
      </ContactBlock>
      <Signature href="#top" aria-label={`${profile.name}, return to top`}>
        <span>Ashis</span>
        <span>Sarthak Singh.</span>
      </Signature>
      <Footer>
        <span>{profile.role} · {profile.location}</span>
        <div className="social-links">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </Footer>
    </Container>
  )
}
