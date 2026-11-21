import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import {
  GridContent,
  GridFooter,
  GridHeader,
  GridHint,
  GridRow,
  GridViewport,
  LabHeading,
  LabLayout,
  LabMetric,
  LabMetrics,
  LabPanel,
  LabPanelHeader,
  LabSection,
  LabPageContainer,
  TokenControl,
  TokenActions,
  TokenReadout,
  TokenReset,
  TokenValue,
  TokenControls,
} from '../styles/LabStyles'
import { themes, type ThemeName } from '../theme'

const ROW_COUNT = 100_000
const ROW_HEIGHT = 38
const HEADER_HEIGHT = 34
const INITIAL_VIEWPORT_HEIGHT = 520
const OVERSCAN = 5

const projects = ['Atlas Analytics', 'Meridian UI', 'Northstar', 'Fieldnotes', 'Clearview', 'Signal Desk', 'Prism Reports', 'Orbit Console']
const teams = ['Product team', 'Design systems', 'Platform team', 'Experience', 'Data platform']
const statuses = ['Active', 'In review', 'Queued']

interface PlaygroundLabProps {
  themeName: ThemeName
}

export function PlaygroundLab({ themeName }: PlaygroundLabProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [viewportHeight, setViewportHeight] = useState(INITIAL_VIEWPORT_HEIGHT)
  const [accentOverride, setAccentOverride] = useState<string>()
  const [surfaceOverride, setSurfaceOverride] = useState<string>()
  const [radius, setRadius] = useState(8)
  const [density, setDensity] = useState<'Comfortable' | 'Compact' | 'Spacious'>('Comfortable')
  const [startIndex, setStartIndex] = useState(0)
  const [updates, setUpdates] = useState(0)
  const [fps, setFps] = useState(0)
  const accent = accentOverride ?? themes[themeName].accent
  const surface = surfaceOverride ?? themes[themeName].surface
  const rowHeight = density === 'Compact' ? 32 : density === 'Spacious' ? 48 : ROW_HEIGHT

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const updateHeight = (height: number) => {
      setViewportHeight(Math.max(1, Math.round(height)))
    }

    if (typeof ResizeObserver === 'undefined') {
      const handleResize = () => updateHeight(viewport.clientHeight)
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }

    const observer = new ResizeObserver(([entry]) => updateHeight(entry.contentRect.height))
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let frameId = 0
    let frames = 0
    let sampleStart = 0
    let running = false
    let inView = false

    const measure = (now: number) => {
      if (!running || document.visibilityState !== 'visible') return
      frames += 1
      if (now - sampleStart >= 1000) {
        setFps(Math.round((frames * 1000) / (now - sampleStart)))
        frames = 0
        sampleStart = now
      }
      frameId = window.requestAnimationFrame(measure)
    }

    const start = () => {
      if (running || !inView || document.visibilityState !== 'visible') return
      running = true
      frames = 0
      sampleStart = performance.now()
      frameId = window.requestAnimationFrame(measure)
    }

    const stop = () => {
      running = false
      window.cancelAnimationFrame(frameId)
    }

    const observer = typeof IntersectionObserver === 'undefined'
      ? undefined
      : new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting
          if (inView) start()
          else stop()
        })
    if (viewportRef.current && observer) observer.observe(viewportRef.current)
    else {
      inView = true
      start()
    }
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') start()
      else stop()
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      stop()
      observer?.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const rowsToRender = useMemo(() => {
    const visibleCount = Math.ceil(viewportHeight / rowHeight) + OVERSCAN * 2
    const first = Math.max(0, startIndex - OVERSCAN)
    const last = Math.min(ROW_COUNT, first + visibleCount)
    return Array.from({ length: last - first }, (_, offset) => first + offset)
  }, [rowHeight, startIndex, viewportHeight])

  const tokenStyle: CSSProperties & Record<
    '--lab-accent' | '--lab-surface' | '--lab-radius' | '--lab-row-height',
    string
  > = {
    '--lab-accent': accent,
    '--lab-surface': surface,
    '--lab-radius': `${radius}px`,
    '--lab-row-height': `${rowHeight}px`,
  }

  function handleScroll() {
    const scrollTop = viewportRef.current?.scrollTop ?? 0
    const nextStart = Math.max(0, Math.floor((scrollTop - HEADER_HEIGHT) / rowHeight))
    setStartIndex(nextStart)
    setUpdates((count) => count + 1)
  }

  function resetTokens() {
    setAccentOverride(undefined)
    setSurfaceOverride(undefined)
    setRadius(8)
    setDensity('Comfortable')
    if (viewportRef.current) viewportRef.current.scrollTop = 0
    setStartIndex(0)
    setUpdates((count) => count + 1)
  }

  function handleDensityChange(value: string) {
    if (value !== 'Comfortable' && value !== 'Compact' && value !== 'Spacious') return
    setDensity(value)
    if (viewportRef.current) viewportRef.current.scrollTop = 0
    setStartIndex(0)
    setUpdates((count) => count + 1)
  }

  return (
    <LabPageContainer>
      <LabSection id="playground" style={tokenStyle}>
        <LabHeading>
          <div>
            <span className="lab-kicker">Interactive lab</span>
            <h2>Playground</h2>
            <p>
              Explore theme tokens, then stress-test a virtualized 100,000-row grid.
            </p>
          </div>
        </LabHeading>

        <LabLayout>
          <LabPanel aria-labelledby="token-panel-title">
            <LabPanelHeader>
              <h3 id="token-panel-title">Design tokens</h3>
              <span>Changes apply to this page</span>
            </LabPanelHeader>
            <TokenControls>
              <TokenControl>
                <span>Accent color</span>
                <TokenValue>{accent}</TokenValue>
                <input aria-label="Accent color token" type="color" value={accent} onChange={(event) => {
                  setAccentOverride(event.target.value)
                  setUpdates((count) => count + 1)
                }} />
              </TokenControl>
              <TokenControl>
                <span>Surface color</span>
                <TokenValue>{surface}</TokenValue>
                <input aria-label="Surface color token" type="color" value={surface} onChange={(event) => {
                  setSurfaceOverride(event.target.value)
                  setUpdates((count) => count + 1)
                }} />
              </TokenControl>
              <TokenControl>
                <span>Corner radius</span>
                <TokenValue>{radius}px</TokenValue>
                <input aria-label="Corner radius token" type="range" min="0" max="18" value={radius} onChange={(event) => {
                  setRadius(Number(event.target.value))
                  setUpdates((count) => count + 1)
                }} />
              </TokenControl>
              <TokenControl>
                <span>Grid density</span>
                <TokenValue>{density}</TokenValue>
                <select aria-label="Grid density token" value={density} onChange={(event) => handleDensityChange(event.target.value)}>
                  <option>Comfortable</option>
                  <option>Compact</option>
                  <option>Spacious</option>
                </select>
              </TokenControl>
            </TokenControls>
            <TokenActions>
              <TokenReset type="button" onClick={resetTokens}>↺ &nbsp; Reset tokens</TokenReset>
              <TokenReadout aria-live="polite">
                <span>--lab-accent:</span> {accent};&nbsp;
                <span>--lab-surface:</span> {surface};&nbsp;
                <span>--lab-radius:</span> {radius}px;&nbsp;
                <span>--lab-row-height:</span> {tokenStyle['--lab-row-height']};
              </TokenReadout>
            </TokenActions>
          </LabPanel>

          <LabPanel aria-labelledby="grid-panel-title">
            <LabPanelHeader>
              <h3 id="grid-panel-title">Virtualized data grid</h3>
              <span aria-label="Performance metrics are live">● LIVE METRICS</span>
            </LabPanelHeader>
            <LabMetrics aria-label="Live rendering metrics">
              <LabMetric><span>Frame rate</span><strong>{fps || '—'} <em>FPS</em></strong></LabMetric>
              <LabMetric><span>Rows mounted</span><strong>{rowsToRender.length} <em>/ 100,000</em></strong></LabMetric>
              <LabMetric><span>Grid updates</span><strong>{updates} <em>this session</em></strong></LabMetric>
            </LabMetrics>
            <GridViewport
              ref={viewportRef}
              onScroll={handleScroll}
              role="grid"
              aria-label="Virtualized sample project data"
              aria-rowcount={ROW_COUNT + 1}
              tabIndex={0}
            >
              <GridContent style={{ height: HEADER_HEIGHT + ROW_COUNT * rowHeight }}>
                <GridHeader role="row" aria-rowindex={1}>
                  <span role="columnheader">ID</span>
                  <span role="columnheader">Project</span>
                  <span role="columnheader">Owner</span>
                  <span role="columnheader">Status</span>
                </GridHeader>
                {rowsToRender.map((index) => {
                  const status = statuses[index % statuses.length]
                  return (
                    <GridRow
                      key={index}
                      role="row"
                      aria-rowindex={index + 2}
                      style={{ top: HEADER_HEIGHT + index * rowHeight }}
                    >
                      <span className="row-id" role="gridcell">{String(index + 1).padStart(5, '0')}</span>
                      <span className="project-name" role="gridcell">{projects[index % projects.length]}</span>
                      <span role="gridcell">{teams[index % teams.length]}</span>
                      <span className={`status ${status === 'In review' ? 'review' : status.toLowerCase()}`} role="gridcell">{status}</span>
                    </GridRow>
                  )
                })}
              </GridContent>
            </GridViewport>
            <GridFooter>
              <span>Only visible rows plus a small buffer are mounted.</span>
              <span>Rows {startIndex + 1}–{Math.min(ROW_COUNT, startIndex + rowsToRender.length)} of {ROW_COUNT.toLocaleString()}</span>
            </GridFooter>
          </LabPanel>
        </LabLayout>
        <GridHint>Tip: change the accent, surface, radius, or density to see these design tokens update the lab in real time.</GridHint>
      </LabSection>
    </LabPageContainer>
  )
}
