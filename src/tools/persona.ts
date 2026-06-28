import { getEl, countKeywordHits, animateBars } from '../shared/utils';

interface Persona {
  id:       string;
  name:     string;
  color:    string;
  tint:     string;
  desc:     string;
  note:     string;
  phrases:  string[];
  keywords: string[];
}

const personas: Persona[] = [
  {
    id:      'competitive',
    name:    'Competitive',
    color:   '#C93D1B',
    tint:    'rgba(201,61,27,0.1)',
    desc:    'Direct, results-focused, and achievement-driven. Responds to performance language, specific outcomes, and speed.',
    note:    'Effective for ROI-focused B2B emails, productivity tools, and high-performance audiences.',
    phrases: ['"Get results in X days"', '"Outperform your competition"', '"The fastest route to [outcome]"', '"Here\'s your ROI"', '"Win more with less"'],
    keywords: ['results', 'proven', 'win', 'achieve', 'goal', 'roi', 'performance', 'fast', 'instantly', 'quickly', 'ahead', 'advantage', 'outperform', 'growth', 'bottom line', 'number one', 'gain', 'dominate', 'power', 'beat', 'success', 'top', 'efficient', 'productivity', 'faster', 'leading', 'rank', 'competitive', 'maximise', 'maximize', 'drive', 'impact', 'output', 'accelerate', 'scale'],
  },
  {
    id:      'spontaneous',
    name:    'Spontaneous',
    color:   '#A86200',
    tint:    'rgba(168,98,0,0.1)',
    desc:    'Emotion-first and impulse-driven. Responds to excitement, novelty, exclusivity, and social momentum.',
    note:    'Works well for flash sales, new product launches, limited offers, and community-driven brands.',
    phrases: ['"You\'ll love this"', '"Just launched"', '"Don\'t miss out"', '"Everyone\'s talking about"', '"Limited spots available"'],
    keywords: ['exciting', 'new', 'discover', 'amazing', 'incredible', 'love', 'trending', 'everyone', 'exclusive', 'limited', 'last chance', 'today only', 'hurry', 'surprise', 'delight', 'popular', 'fantastic', 'brilliant', 'awesome', 'special', 'deal', 'offer', 'sale', 'fun', 'enjoy', 'launch', "don't miss", 'just dropped', 'introducing', 'fresh', 'buzz', 'sensation'],
  },
  {
    id:      'humanistic',
    name:    'Humanistic',
    color:   '#167A5E',
    tint:    'rgba(22,122,94,0.1)',
    desc:    'Relationship-driven and empathy-led. Responds to warmth, shared values, community, and personal stories.',
    note:    'Powerful for welcome sequences, nurture flows, non-profit emails, and values-led brands.',
    phrases: ['"We understand how you feel"', '"Join [X] people like you"', '"Here\'s [name]\'s story"', '"We\'re here whenever you need us"', '"You\'re not alone in this"'],
    keywords: ['together', 'community', 'relationship', 'story', 'feel', 'care', 'support', 'understand', 'trust', 'share', 'connect', 'belong', 'journey', "you're not alone", "we're here", 'personal', 'people', 'family', 'team', 'warmth', 'values', 'mission', 'meaningful', 'purpose', 'heart', 'compassion', 'kindness', 'culture', 'listen', 'empathy', 'human', 'real', 'authentic'],
  },
  {
    id:      'methodical',
    name:    'Methodical',
    color:   '#1A5FA8',
    tint:    'rgba(26,95,168,0.1)',
    desc:    'Detail-oriented and logic-led. Responds to data, process clarity, proof, and risk reduction.',
    note:    'Essential for B2B, technical, financial, and enterprise audiences who need to justify decisions.',
    phrases: ['"Research shows that..."', '"Here\'s exactly how it works"', '"Step 1… Step 2… Step 3…"', '"Backed by [X] studies"', '"Compare the data"'],
    keywords: ['research', 'data', 'study', 'evidence', 'statistics', 'step by step', 'process', 'how it works', 'because', 'analysis', 'compare', 'guarantee', 'risk-free', 'backed by', 'in fact', 'specifically', 'methodology', 'framework', 'system', 'detailed', 'comprehensive', 'thorough', 'accurate', 'reliable', 'consistent', 'checklist', 'guide', 'roadmap', 'benchmark', 'measure', 'criteria', 'fact', 'statistic', 'percent', 'breakdown', 'specification', 'structured'],
  },
];

function scoreText(text: string): Array<Persona & { count: number }> {
  const lower = text.toLowerCase();
  return personas.map(p => ({ ...p, count: countKeywordHits(lower, p.keywords) }));
}

function analyse(): void {
  const text    = getEl<HTMLTextAreaElement>('persona-input').value.trim();
  const errorEl = getEl('persona-error');
  const results = getEl('persona-results');
  const warnEl  = getEl('short-warn');

  if (!text) {
    errorEl.classList.add('visible');
    results.classList.remove('visible');
    return;
  }
  errorEl.classList.remove('visible');

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  warnEl.classList.toggle('visible', wordCount < 30);

  const scored = scoreText(text);
  const total  = scored.reduce((n, p) => n + p.count, 0);
  const sorted = [...scored].sort((a, b) => b.count - a.count);
  const top    = sorted[0]!;
  const second = sorted[1]!;

  const badgeEl = getEl('dominant-badge');
  const noteEl  = getEl('dominant-note');

  if (total === 0) {
    badgeEl.textContent      = 'Mixed / Neutral';
    badgeEl.style.background = '#897680';
    noteEl.textContent       = 'No clear persona signals detected. Adding intentional language cues will help your copy speak to specific buyer types.';
  } else if (top.count > 0 && second.count > 0 && (top.count - second.count) / total < 0.08) {
    badgeEl.textContent      = `${top.name} & ${second.name}`;
    badgeEl.style.background = top.color;
    noteEl.textContent       = 'Your copy speaks to two types at similar strength. Check the breakdown to see which types you\'re underserving.';
  } else if (top.count / total < 0.3) {
    badgeEl.textContent      = 'Mixed / Neutral';
    badgeEl.style.background = '#897680';
    noteEl.textContent       = 'No single buyer type stands out. Targeted emails typically convert better when they speak to a specific persona.';
  } else {
    badgeEl.textContent      = top.name;
    badgeEl.style.background = top.color;
    noteEl.textContent       = top.note;
  }

  const barsEl = getEl('persona-bars');
  barsEl.innerHTML = scored.map(p => {
    const pct   = total > 0 ? Math.round(p.count / total * 100) : 0;
    const isDom = p.id === top.id && total > 0;
    return `<div class="persona-row${isDom ? ' is-dominant' : ''}">
      <span class="persona-name" style="${isDom ? `color:${p.color}` : ''}">${p.name}</span>
      <div class="persona-bar-track">
        <div class="persona-bar-fill" data-pct="${pct}" style="background:${p.color}"></div>
      </div>
      <span class="persona-pct" style="${isDom ? `color:${p.color}` : ''}">${pct}%</span>
    </div>`;
  }).join('');
  animateBars(barsEl, '.persona-bar-fill');

  const tipsEl = getEl('persona-tips');
  tipsEl.innerHTML = sorted.map(p => `
    <div class="persona-tip-card" style="border-left-color:${p.color}">
      <div class="persona-tip-head">
        <span class="persona-tip-name" style="color:${p.color}">${p.name}</span>
        <span class="persona-tip-tag">${p.desc}</span>
      </div>
      <p class="persona-tip-desc">${p.note}</p>
      <div class="persona-tip-phrases">
        ${p.phrases.map(ph => `<span class="phrase-chip" style="background:${p.tint};color:${p.color}">${ph}</span>`).join('')}
      </div>
    </div>
  `).join('');

  results.classList.add('visible');
}

getEl('persona-btn').addEventListener('click', analyse);
getEl<HTMLTextAreaElement>('persona-input').addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Enter' && e.ctrlKey) analyse();
});
