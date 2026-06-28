/** Typed getElementById that throws if the element is missing. */
export function getEl<T extends HTMLElement = HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element #${id} not found`);
  return el as T;
}

/**
 * Count total substring hits across a keyword list.
 * Scans for every non-overlapping occurrence of each keyword.
 */
export function countKeywordHits(lowerText: string, keywords: string[]): number {
  return keywords.reduce((total, kw) => {
    let pos = 0, hits = 0;
    while ((pos = lowerText.indexOf(kw, pos)) !== -1) { hits++; pos += kw.length; }
    return total + hits;
  }, 0);
}

/**
 * Animate bar fills using a double-rAF so the browser paints the initial 0-width
 * state before transitioning to the target width stored in data-pct.
 */
export function animateBars(container: Element, selector: string): void {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    container.querySelectorAll<HTMLElement>(selector).forEach(el => {
      el.style.width = (el.dataset['pct'] ?? '0') + '%';
    });
  }));
}
