export function startAlexaThinking() {
  const ring = window.portfolioObjects?.alexaRing;
  if (!ring) return;

  ring.material.emissiveIntensity = 2;
}

export function stopAlexaThinking() {
  const ring = window.portfolioObjects?.alexaRing;
  if (!ring) return;

  ring.material.emissiveIntensity = 0.5;
}
