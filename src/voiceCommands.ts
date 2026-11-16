export function getVoiceCommand(text: string): 'close' | 'light' | 'dark' | undefined {
  const command = text.toLowerCase()
  if (/\b(?:close|exit|dismiss|end)\s+(?:(?:the|this|my)\s+)?(?:voice mode|voice session|conversation|session|window)\b/.test(command)) {
    return 'close'
  }
  if (/\b(?:dark|light)\s+(?:mode|theme)\b|\b(?:switch|set|change|turn)\b.*\b(?:dark|light)\b/.test(command)) {
    return /\bdark\b/.test(command) ? 'dark' : 'light'
  }
  return undefined
}
