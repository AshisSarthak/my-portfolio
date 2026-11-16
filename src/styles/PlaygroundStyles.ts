import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0%, 100% { transform: scale(0.94); opacity: 0.35; }
  50% { transform: scale(1.06); opacity: 0.85; }
`

const enterVoiceMode = keyframes`
  from { opacity: 0; transform: scale(1.015); }
  to { opacity: 1; transform: scale(1); }
`

const beamSweep = keyframes`
  0% { opacity: 0; transform: translateX(-48%) scaleX(0.6); }
  28%, 72% { opacity: 1; }
  100% { opacity: 0; transform: translateX(48%) scaleX(1.1); }
`

const barIdle = keyframes`
  0%, 100% { transform: translateY(0) scaleY(0.72); opacity: 0.58; }
  50% { transform: translateY(-1px) scaleY(1.12); opacity: 0.95; }
`

const barActive = keyframes`
  0%, 100% { opacity: 0.76; }
  50% { opacity: 1; }
`

export const VoiceModeOverlay = styled.div`
  --voice-body-size: 0.82rem;
  --voice-label-size: 0.68rem;
  --voice-meta-size: 0.62rem;
  position: fixed;
  z-index: 10000;
  inset: 0;
  background:
    radial-gradient(ellipse at 32% 40%, rgba(52, 126, 145, 0.17), transparent 44%),
    radial-gradient(ellipse at 85% 95%, rgba(102, 80, 155, 0.12), transparent 38%),
    #080c11;
  color: #f3f6fa;
  animation: ${enterVoiceMode} 260ms cubic-bezier(0.2, 0.7, 0.2, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const VoiceDialog = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 0;
  flex-direction: column;
  overflow: auto;
  padding: 0 clamp(20px, 5vw, 72px);

  @media (max-width: 700px) {
    padding: 0 18px max(14px, env(safe-area-inset-bottom));
  }
`

export const VoiceDialogTopbar = styled.header`
  display: flex;
  min-height: 62px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid rgba(226, 238, 249, 0.12);

  > a {
    color: #f3f6fa;
    font-size: 1.1rem;
    font-weight: 800;
    letter-spacing: -0.07em;
    text-decoration: none;

    span {
      color: #62e6ff;
    }
  }

  .dialog-meta {
    display: flex;
    align-items: center;
    gap: 9px;
    color: rgba(233, 241, 248, 0.58);
    font-size: var(--voice-label-size);
    font-weight: 700;
    letter-spacing: 0.14em;
  }

  .dialog-meta i, .live-tag i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #62e6ff;
    box-shadow: 0 0 15px rgba(98, 230, 255, 0.8);
  }

  @media (max-width: 520px) {
    min-height: 54px;

    .dialog-meta {
      font-size: var(--voice-meta-size);
      letter-spacing: 0.08em;
    }
  }
`

export const VoiceExitButton = styled.button`
  display: inline-flex;
  min-height: 38px;
  align-items: center;
  gap: 10px;
  padding: 0 11px 0 14px;
  border: 1px solid rgba(226, 238, 249, 0.19);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.035);
  color: #e8eef4;
  cursor: pointer;
  font-size: var(--voice-label-size);
  transition: border-color 160ms ease, background 160ms ease;

  > span:last-child {
    color: #aab8c5;
    font-size: 1.15rem;
    line-height: 1;
  }

  &:hover {
    border-color: rgba(98, 230, 255, 0.6);
    background: rgba(98, 230, 255, 0.08);
  }
`

export const VoiceModeGrid = styled.div`
  display: grid;
  width: min(1060px, 100%);
  min-height: 0;
  flex: 1;
  align-self: center;
  grid-template-columns: minmax(0, 1.05fr) minmax(300px, 0.95fr);
  gap: clamp(18px, 4vw, 46px);
  padding: 12px 0;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr) minmax(270px, 0.9fr);
    gap: 18px;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 14px 0 8px;
  }
`

export const VoiceConsole = styled.section`
  position: relative;
  display: grid;
  min-width: 0;
  min-height: 0;
  align-content: center;
  justify-items: center;
  gap: 9px;
  padding: 0;
  text-align: center;

  .console-intro {
    width: 100%;
    max-width: 480px;
  }

  .voice-kicker {
    color: #76dff2;
    font-size: var(--voice-label-size);
    font-weight: 750;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .voice-controls {
    display: grid;
    justify-items: center;
    gap: 5px;
  }

  .voice-controls > p {
    margin: 0;
    color: rgba(224, 234, 241, 0.42);
    font-size: var(--voice-meta-size);
    line-height: 1.4;
  }

  .voice-controls .launch-hint {
    color: rgba(224, 234, 241, 0.66);
    font-size: var(--voice-body-size);
  }

  @media (max-width: 720px) {
    min-height: 304px;

    .console-intro {
      padding: 0 2px;
    }
  }

  @media (max-width: 400px) {
    min-height: 286px;
  }
`

export const VoiceModeTitle = styled.h1`
  margin: 4px 0;
  color: #f4f7fb;
  font-family: var(--display);
  font-size: clamp(1.8rem, 3.2vw, 2.65rem);
  font-weight: 500;
  letter-spacing: -0.045em;
  line-height: 1;
`

export const VoiceModeSubtitle = styled.p`
  max-width: 400px;
  margin: 0 auto;
  color: rgba(224, 233, 241, 0.58);
  font-size: var(--voice-body-size);
  line-height: 1.65;
`

export const VoiceBeam = styled.div`
  position: relative;
  display: flex;
  width: min(430px, 100%);
  height: clamp(104px, 17vh, 142px);
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  margin: 1px 0;
  overflow: hidden;
  border: 1px solid rgba(98, 230, 255, 0.09);
  border-radius: 26px;
  background:
    radial-gradient(ellipse at 50% 50%, rgba(98, 230, 255, 0.1), transparent 68%),
    linear-gradient(90deg, rgba(10, 19, 26, 0.2), rgba(16, 29, 37, 0.72), rgba(10, 19, 26, 0.2));
  box-shadow: inset 0 0 40px rgba(98, 230, 255, 0.045), 0 12px 55px rgba(35, 183, 205, 0.08);
  transition: border-color 240ms ease, box-shadow 240ms ease;

  &::before {
    position: absolute;
    top: 50%;
    right: 7%;
    left: 7%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(98, 230, 255, 0.34), transparent);
    content: "";
  }

  .beam-sweep {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: 38%;
    height: 2px;
    border-radius: 50%;
    background: linear-gradient(90deg, transparent, #e1fbff, transparent);
    box-shadow: 0 0 12px 3px rgba(98, 230, 255, 0.72), 0 0 38px 8px rgba(98, 230, 255, 0.2);
    animation: ${beamSweep} 2.8s ease-in-out infinite;
    pointer-events: none;
  }

  &[data-state='listening'] {
    border-color: rgba(98, 230, 255, 0.38);
    box-shadow: inset 0 0 48px rgba(98, 230, 255, 0.1), 0 0 42px rgba(66, 197, 220, 0.13);
  }

  &[data-state='speaking'] {
    border-color: rgba(181, 162, 255, 0.43);
    box-shadow: inset 0 0 48px rgba(181, 162, 255, 0.11), 0 0 42px rgba(152, 128, 237, 0.13);

    .beam-sweep {
      background: linear-gradient(90deg, transparent, #f1eaff, transparent);
      box-shadow: 0 0 12px 3px rgba(181, 162, 255, 0.72), 0 0 38px 8px rgba(152, 128, 237, 0.2);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .beam-sweep {
      animation: none;
      opacity: 0.7;
    }
  }
`

export const VoiceBeamBars = styled.div`
  display: flex;
  width: 84%;
  height: 88%;
  align-items: center;
  justify-content: center;
  gap: clamp(2px, 0.65vw, 6px);
  pointer-events: none;
`

export const VoiceBeamBar = styled.span`
  width: 4px;
  max-height: 80%;
  border-radius: 99px;
  background: linear-gradient(to top, rgba(98, 230, 255, 0.2), #85efff);
  box-shadow: 0 0 8px rgba(98, 230, 255, 0.38);
  opacity: 0.84;
  animation: ${barIdle} 1.35s ease-in-out infinite;
  transition: height 100ms ease-out, background 180ms ease;

  [data-state='listening'] & {
    animation: ${barActive} 700ms ease-in-out infinite;
  }

  [data-state='speaking'] & {
    background: linear-gradient(to top, rgba(181, 162, 255, 0.28), #c5b7ff);
    box-shadow: 0 0 8px rgba(181, 162, 255, 0.45);
    animation: ${barActive} 700ms ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const VoiceStatus = styled.p`
  display: flex;
  min-height: 20px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin: 0;
  color: rgba(238, 244, 249, 0.88);
  font-size: var(--voice-label-size);
  font-weight: 600;

  .status-indicator {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #83a2ae;
  }

  &[data-state='listening'] .status-indicator {
    background: #62e6ff;
    box-shadow: 0 0 13px rgba(98, 230, 255, 0.95);
  }

  &[data-state='thinking'] .status-indicator {
    background: #f3c873;
    animation: ${pulse} 1.1s ease-in-out infinite;
  }

  &[data-state='speaking'] .status-indicator {
    background: #b5a2ff;
    box-shadow: 0 0 13px rgba(181, 162, 255, 0.95);
  }
`

export const VoiceModeAction = styled.button<{ $ending?: boolean }>`
  display: inline-flex;
  min-height: 38px;
  align-items: center;
  justify-content: center;
  gap: 11px;
  padding: 0 15px;
  border: 1px solid ${({ $ending }) => $ending ? 'rgba(255,255,255,0.2)' : 'transparent'};
  border-radius: 999px;
  background: ${({ $ending }) => $ending ? 'rgba(255,255,255,0.08)' : '#75e4f4'};
  color: ${({ $ending }) => $ending ? '#f3f6fa' : '#081116'};
  cursor: pointer;
  font-size: var(--voice-label-size);
  font-weight: 750;
  transition: transform 170ms ease, box-shadow 170ms ease, background 170ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ $ending }) => $ending ? 'none' : '0 7px 30px rgba(98, 230, 255, 0.2)'};
  }

  svg {
    width: 19px;
    height: 19px;
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.8;
  }

  .button-arrow {
    font-size: 1rem;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const VoiceError = styled.p`
  max-width: 440px;
  margin: 2px 0;
  padding: 7px 10px;
  border: 1px solid rgba(255, 157, 145, 0.3);
  border-radius: 11px;
  background: rgba(108, 40, 42, 0.25);
  color: #ffc0b8;
  font-size: var(--voice-label-size);
  line-height: 1.6;
`

export const VoiceTranscriptPanel = styled.aside`
  display: flex;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(226, 238, 249, 0.14);
  border-radius: 19px;
  background: linear-gradient(145deg, rgba(21, 31, 41, 0.84), rgba(14, 21, 28, 0.94));
  box-shadow: 0 22px 80px rgba(0, 0, 0, 0.19);

  .privacy-note {
    margin: 0;
    padding: 0 15px 12px;
    color: rgba(224, 234, 241, 0.38);
    font-size: var(--voice-meta-size);
    line-height: 1.4;
  }

  @media (max-width: 720px) {
    min-height: 214px;
  }
`

export const VoiceTranscriptHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 15px 11px;
  border-bottom: 1px solid rgba(226, 238, 249, 0.1);

  .voice-kicker {
    color: #76dff2;
    font-size: var(--voice-label-size);
    font-weight: 750;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  h2 {
    margin: 5px 0 0;
    color: #f3f6fa;
    font-family: var(--display);
    font-size: 1.35rem;
    font-weight: 500;
    letter-spacing: -0.04em;
  }

  .live-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: rgba(228, 238, 246, 0.58);
    font-size: var(--voice-meta-size);
    font-weight: 750;
    letter-spacing: 0.12em;
  }

  .live-tag i {
    width: 6px;
    height: 6px;
  }
`

export const VoiceTranscript = styled.div`
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  gap: 18px;
  overflow: auto;
  padding: 13px 15px;

  .transcript-empty {
    margin: auto 0;
    color: rgba(226, 236, 244, 0.69);
    font-size: var(--voice-body-size);
    line-height: 1.65;
  }

  .transcript-empty p.hint-label {
    margin: 0 0 6px;
    color: rgba(118, 223, 242, 0.78);
    font-size: var(--voice-meta-size);
    font-weight: 750;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .transcript-empty ul {
    display: grid;
    gap: 5px;
    margin: 0;
    padding: 0;
    color: rgba(226, 236, 244, 0.62);
    font-size: var(--voice-body-size);
    list-style: none;
  }

  .transcript-empty li::before {
    margin-right: 7px;
    color: rgba(118, 223, 242, 0.72);
    content: "↗";
  }

  .thinking-note {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    color: #f0d39a;
    font-size: var(--voice-label-size);
  }

  .thinking-note span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #f0c66f;
    animation: ${pulse} 0.9s ease-in-out infinite;
  }

  .project-action {
    padding: 15px;
    border: 1px solid rgba(98, 230, 255, 0.18);
    border-radius: 15px;
    background: linear-gradient(140deg, rgba(98, 230, 255, 0.075), rgba(181, 162, 255, 0.035));
  }

  .project-action > span {
    color: #83e3f0;
    font-size: var(--voice-meta-size);
    font-weight: 750;
    letter-spacing: 0.1em;
  }

  .project-action h3 {
    margin: 6px 0 5px;
    color: #f3f6fa;
    font-family: var(--display);
    font-size: 1.3rem;
    font-weight: 500;
  }

  .project-action p {
    display: -webkit-box;
    overflow: hidden;
    margin: 0 0 13px;
    color: rgba(224, 234, 241, 0.64);
    font-size: var(--voice-body-size);
    line-height: 1.65;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .project-action button, .navigation-action {
    display: inline-flex;
    min-height: 34px;
    align-items: center;
    gap: 8px;
    padding: 0 11px;
    border: 1px solid rgba(98, 230, 255, 0.27);
    border-radius: 999px;
    background: rgba(98, 230, 255, 0.08);
    color: #a9eff8;
    cursor: pointer;
    font-size: var(--voice-label-size);
    font-weight: 700;
  }

`

export const VoiceTranscriptBlock = styled.div`
  &[data-speaker='you'] {
    align-self: flex-end;
    max-width: 92%;
    padding: 11px 13px;
    border: 1px solid rgba(98, 230, 255, 0.15);
    border-radius: 14px 14px 4px 14px;
    background: rgba(98, 230, 255, 0.08);
  }

  &[data-speaker='guide'] {
    align-self: flex-start;
    max-width: 96%;
  }

  > span {
    color: rgba(161, 222, 232, 0.62);
    font-size: var(--voice-meta-size);
    font-weight: 750;
    letter-spacing: 0.12em;
  }

  p {
    margin: 5px 0 0;
    color: rgba(239, 244, 249, 0.9);
    font-size: var(--voice-body-size);
    line-height: 1.65;
  }
`
