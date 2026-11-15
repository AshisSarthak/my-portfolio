interface WorkArtworkProps {
  type: string
  title: string
}

export function WorkArtwork({ type, title }: WorkArtworkProps) {
  if (type === 'banking-team') {
    return (
      <svg viewBox="0 0 360 200" role="img" aria-label={`${title}: banking module and frontend team illustration`}>
        <path className="art-line" d="M92 48h38m-38 52h38m-38 52h38m130-104h38m-38 104h38" />
        <rect className="art-frame" x="130" y="58" width="100" height="84" rx="5" />
        <path className="art-line" d="m151 82 29-13 29 13m-49 5h40m-36 0v22m14-22v22m14-22v22m-35 5h42" />
        <circle className="art-frame" cx="73" cy="48" r="13" />
        <circle className="art-frame" cx="73" cy="100" r="13" />
        <circle className="art-frame" cx="73" cy="152" r="13" />
        <circle className="art-accent" cx="287" cy="48" r="13" />
        <circle className="art-frame" cx="287" cy="152" r="13" />
        <circle className="art-soft" cx="73" cy="46" r="4" />
        <path className="art-soft" d="M65 55q8-10 16 0" />
        <circle className="art-soft" cx="73" cy="98" r="4" />
        <path className="art-soft" d="M65 107q8-10 16 0" />
        <circle className="art-soft" cx="73" cy="150" r="4" />
        <path className="art-soft" d="M65 159q8-10 16 0" />
        <circle fill="var(--atlas-surface)" cx="287" cy="46" r="4" />
        <path fill="none" stroke="var(--atlas-surface)" strokeWidth="2" d="M279 55q8-10 16 0" />
        <circle className="art-soft" cx="287" cy="150" r="4" />
        <path className="art-soft" d="M279 159q8-10 16 0" />
      </svg>
    )
  }

  if (type === 'architecture') {
    return (
      <svg viewBox="0 0 360 200" role="img" aria-label={`${title}: modular architecture illustration`}>
        <path className="art-line" d="M92 66H161M199 66h69M121 98v32m118-32v32M140 145h80" />
        <rect className="art-frame" x="48" y="46" width="72" height="42" rx="4" />
        <rect className="art-frame" x="144" y="46" width="72" height="42" rx="4" />
        <rect className="art-frame" x="240" y="46" width="72" height="42" rx="4" />
        <rect className="art-soft" x="64" y="60" width="40" height="5" rx="2" />
        <rect className="art-accent" x="160" y="60" width="40" height="5" rx="2" />
        <rect className="art-soft" x="256" y="60" width="40" height="5" rx="2" />
        <rect className="art-frame" x="88" y="130" width="72" height="34" rx="4" />
        <rect className="art-frame" x="200" y="130" width="72" height="34" rx="4" />
        <circle className="art-accent" cx="180" cy="66" r="4" />
      </svg>
    )
  }

  if (type === 'interface') {
    return (
      <svg viewBox="0 0 360 200" role="img" aria-label={`${title}: interface design illustration`}>
        <rect className="art-frame" x="38" y="30" width="284" height="144" rx="5" />
        <path className="art-line" d="M38 52h284M89 53v121" />
        <circle className="art-accent" cx="53" cy="41" r="3" />
        <circle className="art-soft" cx="64" cy="41" r="3" />
        <circle className="art-soft" cx="75" cy="41" r="3" />
        <rect className="art-soft" x="50" y="68" width="25" height="4" rx="2" />
        <rect className="art-muted" x="50" y="82" width="19" height="3" rx="1" />
        <rect className="art-muted" x="50" y="94" width="24" height="3" rx="1" />
        <rect className="art-frame" x="106" y="68" width="92" height="44" rx="3" />
        <rect className="art-frame" x="210" y="68" width="94" height="44" rx="3" />
        <rect className="art-frame" x="106" y="124" width="198" height="34" rx="3" />
        <path className="art-line" d="M119 97h16l10-15 12 20 10-10h18" />
        <rect className="art-accent" x="222" y="81" width="54" height="4" rx="2" />
        <rect className="art-soft" x="222" y="92" width="34" height="3" rx="1" />
        <rect className="art-soft" x="119" y="137" width="68" height="4" rx="2" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 360 200" role="img" aria-label={`${title}: collaborative engineering illustration`}>
      <path className="art-line" d="M86 100h72m44 0h72M180 64v28m0 16v28M118 70l37 23m50 14 37 23m0-60-37 23m-50 14-37 23" />
      <circle className="art-frame" cx="86" cy="100" r="23" />
      <circle className="art-frame" cx="274" cy="100" r="23" />
      <circle className="art-frame" cx="180" cy="52" r="19" />
      <circle className="art-frame" cx="180" cy="148" r="19" />
      <circle className="art-accent" cx="180" cy="100" r="25" />
      <circle fill="var(--atlas-surface)" cx="180" cy="100" r="9" />
      <circle className="art-soft" cx="86" cy="100" r="5" />
      <circle className="art-soft" cx="274" cy="100" r="5" />
      <circle className="art-soft" cx="180" cy="52" r="5" />
      <circle className="art-soft" cx="180" cy="148" r="5" />
    </svg>
  )
}
