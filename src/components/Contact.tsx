import { profile } from '../data/portfolio'
import { Container, Eyebrow } from '../styles/PortfolioStyles'
import { ContactLinks, Footer, PrimaryLink, Signature } from '../styles/ContactStyles'
import { ContactBlock } from '../styles/WorkStyles'

export function Contact() {
  return (
    <Container>
      <ContactBlock id="contact">
        <div>
          <Eyebrow>Have a product challenge?</Eyebrow>
          <h2>Let&apos;s make the complex feel clear.</h2>
          <ContactLinks aria-label="Ways to get in touch">
            <a href={`mailto:${profile.email}?subject=${encodeURIComponent('Frontend product challenge')}`}>{profile.email}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn ↗</a>
            <a href={profile.github} target="_blank" rel="noreferrer">Explore GitHub ↗</a>
          </ContactLinks>
        </div>
        <PrimaryLink href={`mailto:${profile.email}?subject=${encodeURIComponent('Frontend product challenge')}`}>Start a conversation ↗</PrimaryLink>
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
