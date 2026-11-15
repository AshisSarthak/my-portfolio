import { useState } from 'react'
import { atlasAreas } from '../data/atlas'
import { Container } from '../styles/PortfolioStyles'
import {
  AtlasCanvas,
  AtlasHero,
  AtlasHint,
  AtlasIntro,
  AtlasNode,
  ConnectionMap,
  FocusCard,
  FocusDetail,
  FocusLabel,
  FocusLink,
  Identity,
  IdentityCaption,
  IdentityName,
  NodeSignal,
  NodeText,
} from '../styles/AtlasStyles'

const positions = {
  product: 'northwest',
  systems: 'northeast',
  craft: 'southwest',
  people: 'southeast',
} as const

export function SystemsAtlas() {
  const [activeAreaId, setActiveAreaId] = useState<(typeof atlasAreas)[number]['id']>('systems')
  const activeArea = atlasAreas.find((area) => area.id === activeAreaId) ?? atlasAreas[1]

  return (
    <Container>
      <AtlasHero id="top">
        <AtlasIntro>
          <p>Principal Engineer · UI Architect</p>
          <p><strong>Hyderabad, India</strong> · Open to meaningful challenges</p>
        </AtlasIntro>
        <AtlasCanvas>
          <ConnectionMap viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
            <path data-active={activeAreaId === 'product'} d="M170 100 C285 110 350 210 445 278" />
            <path data-active={activeAreaId === 'systems'} d="M830 105 C720 120 650 210 555 278" />
            <path data-active={activeAreaId === 'craft'} d="M190 520 C300 505 360 405 445 342" />
            <path data-active={activeAreaId === 'people'} d="M810 520 C700 500 640 405 555 342" />
          </ConnectionMap>

          <Identity>
            <IdentityName aria-label="Ashis Sarthak Singh">
              <span>Ashis</span>
              <span>Sarthak Singh</span>
            </IdentityName>
            <IdentityCaption>Build the whole system. Sweat the interface.</IdentityCaption>
          </Identity>

          {atlasAreas.map((area) => (
            <AtlasNode
              key={area.id}
              type="button"
              $position={positions[area.id]}
              $active={area.id === activeAreaId}
              aria-pressed={area.id === activeAreaId}
              aria-controls="atlas-focus"
              onClick={() => {
                setActiveAreaId(area.id)
                document.getElementById(area.destination.slice(1))?.scrollIntoView?.({ block: 'start' })
              }}
            >
              <NodeSignal aria-hidden="true" />
              <NodeText>
                <small>{area.index}</small>
                {area.label}
              </NodeText>
            </AtlasNode>
          ))}
          <AtlasHint>Select a point to explore my approach</AtlasHint>
        </AtlasCanvas>

        <FocusCard id="atlas-focus" aria-live="polite">
          <FocusLabel>{activeArea.index} / {activeArea.label}</FocusLabel>
          <FocusDetail>{activeArea.detail}</FocusDetail>
          <FocusLink href={activeArea.destination}>{activeArea.link} ↗</FocusLink>
        </FocusCard>
      </AtlasHero>
    </Container>
  )
}
