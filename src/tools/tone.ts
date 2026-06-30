import { getEl, countKeywordHits, animateBars } from '../shared/utils';

type ToneId = 'friendly' | 'persuasive' | 'professional' | 'urgent' | 'empathetic';
type Stage  = 'welcome' | 'nurture' | 'promotional' | 'reengagement' | 'transactional';

interface Tone {
  id:       ToneId;
  name:     string;
  desc:     string;
  note:     string;
  phrases:  string[];
  keywords: string[];
}

const tones: Tone[] = [
  {
    id:      'friendly',
    name:    'Friendly',
    desc:    'Warm, conversational, and approachable. Reads like a message from someone you know.',
    note:    'Works well for welcome sequences, nurture flows, and community-driven brands.',
    phrases: ['"Hey [name],"', '"Hope you\'re well"', '"We love that"', '"Excited to share"', '"Feel free to"', '"Chat soon"'],
    keywords: ['hey', 'hi there', 'hope', 'love', 'excited', 'thrilled', 'happy', 'glad', 'great to', 'good news', 'cheers', 'thanks', 'thank you', 'chat', 'feel free', 'warmly', 'take care', 'looking forward', 'can\'t wait', 'delighted'],
  },
  {
    id:      'persuasive',
    name:    'Persuasive',
    desc:    'Benefit-led and action-driving. Speaks directly to results and motivates a decision.',
    note:    'Essential for promotional campaigns, product launches, and conversion-focused sequences.',
    phrases: ['"You\'ll get"', '"Proven to"', '"Discover"', '"Transform"', '"Claim your"', '"Results speak"'],
    keywords: ['you\'ll', 'you will', 'proven', 'results', 'guaranteed', 'discover', 'transform', 'imagine', 'benefit', 'gain', 'unlock', 'achieve', 'boost', 'grow', 'increase', 'improve', 'claim', 'get started', 'start today', 'here\'s why', 'what if', 'picture this', 'imagine'],
  },
  {
    id:      'professional',
    name:    'Professional',
    desc:    'Formal, structured, and authoritative. Establishes credibility and trust.',
    note:    'Best suited for B2B, financial, legal, or enterprise audiences.',
    phrases: ['"Please find"', '"I\'d like to"', '"As discussed"', '"With regard to"', '"I look forward"', '"Should you require"'],
    keywords: ['please', 'kindly', 'regard', 'pursuant', 'therefore', 'however', 'furthermore', 'accordingly', 'as discussed', 'as per', 'i would like', 'we would like', 'enclosed', 'attached', 'look forward', 'should you', 'do not hesitate', 'at your earliest', 'sincerely', 'best regards', 'yours faithfully'],
  },
  {
    id:      'urgent',
    name:    'Urgent',
    desc:    'Deadline-driven and scarcity-focused. Creates FOMO and prompts immediate action.',
    note:    'Use sparingly — effective for flash sales, event reminders, and expiring offers.',
    phrases: ['"Limited time"', '"Ends tonight"', '"Last chance"', '"Today only"', '"Act now"', '"Only X left"'],
    keywords: ['limited', 'expires', 'expiry', 'deadline', 'ends', 'last chance', 'hurry', 'now', 'today only', 'act now', 'don\'t miss', 'running out', 'selling fast', 'almost gone', 'final', 'urgent', 'immediately', 'right now', 'before it\'s too late', 'only', 'spots left', 'seats left'],
  },
  {
    id:      'empathetic',
    name:    'Empathetic',
    desc:    'Understanding, supportive, and reader-centric. Acknowledges challenges before offering solutions.',
    note:    'Powerful in re-engagement flows, customer service emails, and sensitive subject matter.',
    phrases: ['"We understand"', '"You\'re not alone"', '"We know how"', '"We\'re here for you"', '"That\'s why we"', '"It can be tough"'],
    keywords: ['understand', 'know how', 'we know', 'you\'re not alone', 'we\'re here', 'we care', 'your concerns', 'your needs', 'it can be', 'it\'s not easy', 'that\'s why', 'for you', 'support', 'help you', 'here for you', 'on your side', 'we hear you', 'appreciate', 'acknowledge', 'feel'],
  },
];

const stageNotes: Record<ToneId, Record<Stage, string>> = {
  friendly: {
    welcome:       'An ideal tone for welcome emails — warm and approachable sets the right first impression.',
    nurture:       'Good fit for nurture. Friendly keeps the conversation going without pressure; pair with value to earn trust.',
    promotional:   'Use sparingly in promotional emails. Too friendly can dilute urgency — blend with persuasive for best results.',
    reengagement:  'Friendly works well for re-engagement, especially when acknowledging the gap warmly without making the reader feel guilty.',
    transactional: 'Keep it warm but brief. Transactional emails benefit from a human touch, but clarity comes first.',
  },
  persuasive: {
    welcome:       'Light persuasion can plant seeds in a welcome email, but lead with value first — the relationship is too new for a hard sell.',
    nurture:       'Persuasive elements work well mid-sequence when you\'re moving readers toward a decision.',
    promotional:   'This is where persuasive tone earns its keep. Lead with benefits, back them up with proof, and drive to action.',
    reengagement:  'A clear value proposition is essential here. Persuasive tone helps remind lapsed contacts why they signed up.',
    transactional: 'Transactional emails can carry light persuasive elements (cross-sell, upsell), but keep them secondary to the main message.',
  },
  professional: {
    welcome:       'Professional sets a credible tone, especially for B2B or regulated sectors. Match it to your brand voice.',
    nurture:       'Suits thought-leadership and content-led nurture well. Balance authority with approachability over time.',
    promotional:   'Professional promotion signals reliability over hype — well-suited to considered purchases and high-value offers.',
    reengagement:  'A composed, non-pushy re-approach suits B2B audiences. Focus on being helpful rather than chasing.',
    transactional: 'Natural home for professional tone. Clear, structured, and precise is exactly right for transactional communication.',
  },
  urgent: {
    welcome:       'Urgency in a welcome email can feel jarring. Use only if there\'s a genuine time-sensitive offer — and keep it brief.',
    nurture:       'Avoid urgency in most nurture content. It undermines the trust you\'re working to build over time.',
    promotional:   'Urgency is a powerful tool in promotional emails. Ensure the deadline or scarcity is genuine — false urgency erodes trust.',
    reengagement:  'A measured sense of urgency ("we\'d hate for you to miss out") can motivate re-engagement without feeling pushy.',
    transactional: 'Avoid urgency signals in transactional emails — they create unnecessary anxiety and can confuse the reader.',
  },
  empathetic: {
    welcome:       'Empathy in a welcome email reassures new subscribers that they\'re in the right place and will be well looked after.',
    nurture:       'Particularly powerful in nurture — acknowledging your reader\'s challenges before offering solutions builds real trust.',
    promotional:   'Empathy can make a promotional email feel less like a pitch. Acknowledge the problem before presenting the offer.',
    reengagement:  'One of the best tonal choices for re-engagement. Acknowledge the absence warmly, without blame or pressure.',
    transactional: 'A touch of empathy in transactional emails — especially support-related ones — can turn a functional message into a positive experience.',
  },
};

function scoreText(text: string): Array<Tone & { count: number }> {
  const lower = text.toLowerCase();
  return tones.map(t => ({ ...t, count: countKeywordHits(lower, t.keywords) }));
}

function analyse(): void {
  const text    = getEl<HTMLTextAreaElement>('tone-input').value.trim();
  const stage   = getEl<HTMLSelectElement>('stage-select').value as Stage | '';
  const errorEl = getEl('tone-error');
  const results = getEl('tone-results');

  if (!text) {
    errorEl.classList.add('visible');
    results.classList.remove('visible');
    return;
  }
  errorEl.classList.remove('visible');

  const scored   = scoreText(text);
  const total    = scored.reduce((n, t) => n + t.count, 0);
  const sorted   = [...scored].sort((a, b) => b.count - a.count);
  const topTone  = sorted[0]!;
  const isNeutral = topTone.count === 0;

  getEl('dominant-badge').textContent = !isNeutral ? topTone.name : 'Mixed / Neutral';
  const dominantNote = isNeutral
    ? 'No single tone stands out strongly. This can work for purely informational emails, but adding intentional tone signals will improve engagement.'
    : (stage && stageNotes[topTone.id]?.[stage])
      ? stageNotes[topTone.id][stage]
      : topTone.note;
  getEl('dominant-note').textContent = dominantNote;

  const barsEl = getEl('tone-bars');
  barsEl.innerHTML = scored.map(t => {
    const pct   = total > 0 ? Math.round(t.count / total * 100) : 0;
    const isDom = t.id === topTone.id && !isNeutral;
    return `<div class="tone-row${isDom ? ' is-dominant' : ''}">
      <span class="tone-name">${t.name}</span>
      <div class="tone-bar-track"><div class="tone-bar-fill" data-pct="${pct}"></div></div>
      <span class="tone-pct">${pct}%</span>
    </div>`;
  }).join('');
  animateBars(barsEl, '.tone-bar-fill');

  const tipsEl = getEl('tone-tips');
  tipsEl.innerHTML = sorted.map(t => {
    const toneNote = (stage && stageNotes[t.id]?.[stage]) ? stageNotes[t.id][stage] : t.note;
    return `
    <div class="tone-tip-card">
      <div class="tone-tip-head">
        <span class="tone-tip-name">${t.name}</span>
        <span class="tone-tip-tag">${t.desc}</span>
      </div>
      <p class="tone-tip-desc">${toneNote}</p>
      <div class="tone-tip-phrases">${t.phrases.map(p => `<span class="phrase-chip">${p}</span>`).join('')}</div>
    </div>`;
  }).join('');

  getEl('tone-consulting-cta').style.display = isNeutral ? '' : 'none';
  results.classList.add('visible');
}

getEl('tone-btn').addEventListener('click', analyse);
getEl<HTMLTextAreaElement>('tone-input').addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Enter' && e.ctrlKey) analyse();
});
