import { getEl, countKeywordHits, animateBars } from '../shared/utils';

interface Appeal {
  id:       string;
  name:     string;
  color:    string;
  tint:     string;
  desc:     string;
  note:     string;
  phrases:  string[];
  keywords: string[];
}

const appeals: Appeal[] = [
  {
    id:      'fear',
    name:    'Fear',
    color:   '#B91C1C',
    tint:    'rgba(185,28,28,0.1)',
    desc:    'Loss aversion, risk of inaction, consequence of delay.',
    note:    'High-converting for one-off promotions and re-engagement — but overuse in nurture sequences erodes trust over time. Best paired with a genuine solution, not just a threat.',
    phrases: ['"Don\'t let this happen to you"', '"The cost of waiting"', '"Before it\'s too late"', '"You\'re leaving money on the table"', '"Most people miss this"'],
    keywords: ["miss out", "lose", "risk", "threat", "falling behind", "left behind", "too late", "regret", "mistake", "costly", "fail", "before it's gone", "running out", "expire", "last chance", "warning", "without", "penalty", "danger", "worried", "concerned", "at risk", "behind", "missed", "losing", "lost", "afraid", "fear", "scary", "urgent", "hurry", "deadline", "ending"],
  },
  {
    id:      'hope',
    name:    'Hope',
    color:   '#166534',
    tint:    'rgba(22,101,52,0.1)',
    desc:    'Aspiration, positive transformation, a better version of the future.',
    note:    'The most sustainable long-term appeal. Works across all email types — onboarding, nurture, and educational content especially — because it motivates without pressure.',
    phrases: ['"Imagine waking up to..."', '"Finally, a way to..."', '"This changes everything"', '"Your next chapter starts here"', '"Picture where you\'ll be in 90 days"'],
    keywords: ["imagine", "dream", "future", "transform", "change", "achieve", "better", "improve", "grow", "success", "possibility", "opportunity", "potential", "breakthrough", "finally", "unlock", "reach", "vision", "inspire", "hope", "thrive", "flourish", "build", "create", "aspire", "look forward", "new chapter", "picture this", "one day", "could be", "what if you", "believe"],
  },
  {
    id:      'curiosity',
    name:    'Curiosity',
    color:   '#5B21B6',
    tint:    'rgba(91,33,182,0.1)',
    desc:    'Intrigue, mystery, the desire to know something not yet revealed.',
    note:    'Powerful for subject lines and opening hooks — but the body copy must deliver on the promise. Unfulfilled curiosity frustrates readers and hurts open rates on future sends.',
    phrases: ['"Here\'s what most marketers never notice..."', '"The surprising reason your emails underperform"', '"Most people don\'t know this"', '"We rarely talk about this"', '"Find out what\'s really happening"'],
    keywords: ["discover", "reveal", "secret", "hidden", "surprising", "what if", "wonder", "find out", "uncover", "inside", "behind the scenes", "little-known", "curious", "mystery", "the truth", "rarely", "most people", "you won't believe", "unknown", "unexpected", "intriguing", "why do", "how is it", "have you ever", "bet you didn't", "rarely discussed", "untold", "overlooked", "uncover"],
  },
  {
    id:      'pride',
    name:    'Pride',
    color:   '#92400E',
    tint:    'rgba(146,64,14,0.1)',
    desc:    'Status, achievement, recognition, and the desire to be seen as exceptional.',
    note:    'Effective for exclusive offers, loyalty programmes, and professional development emails. Use carefully with Humanistic audiences — status appeals can feel at odds with community values.',
    phrases: ['"For those who refuse to settle"', '"You\'ve been selected"', '"Join our most successful members"', '"This is for the top 10%"', '"Recognised industry leaders use this"'],
    keywords: ["exclusive", "members only", "elite", "award", "recognition", "achievement", "accomplished", "proud", "premium", "selected", "chosen", "invite only", "vip", "expert", "authority", "distinguished", "renowned", "prestige", "status", "best-in-class", "industry leader", "world-class", "gold standard", "top performer", "high achiever", "leading", "ahead of", "above average", "superior"],
  },
  {
    id:      'trust',
    name:    'Trust',
    color:   '#1E40AF',
    tint:    'rgba(30,64,175,0.1)',
    desc:    'Safety, reliability, credentials, and the reassurance that the risk is low.',
    note:    'Essential in every email to some degree, but especially critical early in the relationship — welcome sequences, transactional emails, and high-stakes offers all need a strong trust foundation.',
    phrases: ['"Trusted by 10,000+ marketers"', '"Backed by independent research"', '"30-day guarantee, no questions asked"', '"Here\'s exactly how it works"', '"Read what our members say"'],
    keywords: ["proven", "trusted", "guarantee", "certified", "accredited", "research", "study", "data", "evidence", "testimonial", "review", "established", "verified", "secure", "safe", "reliable", "backed by", "endorsed", "transparent", "honest", "authentic", "track record", "no risk", "results", "thousands", "years of", "industry-recognised", "independently", "tested", "validated"],
  },
  {
    id:      'belonging',
    name:    'Belonging',
    color:   '#9D174D',
    tint:    'rgba(157,23,77,0.1)',
    desc:    'Community, shared identity, and the feeling of being part of something larger.',
    note:    'Builds long-term brand loyalty more reliably than any other appeal. Particularly powerful for subscription products, community-led brands, and re-engagement campaigns where readers have gone quiet.',
    phrases: ['"Join 8,000 marketers doing this differently"', '"You\'re not alone in this"', '"This is a community, not just a course"', '"People like you are already inside"', '"We\'re building something together"'],
    keywords: ["together", "community", "join", "members", "family", "team", "people like you", "others like you", "you're not alone", "shared", "collective", "movement", "group", "network", "insider", "part of", "we all", "everyone", "like-minded", "peers", "fellow", "belong", "in this together", "our community", "thousands of", "millions of", "growing group", "tribe"],
  },
];

function scoreText(text: string): Array<Appeal & { count: number }> {
  const lower = text.toLowerCase();
  return appeals.map(a => ({ ...a, count: countKeywordHits(lower, a.keywords) }));
}

function analyse(): void {
  const text    = getEl<HTMLTextAreaElement>('appeal-input').value.trim();
  const errorEl = getEl('appeal-error');
  const results = getEl('appeal-results');
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
  const total  = scored.reduce((n, a) => n + a.count, 0);
  const sorted = [...scored].sort((a, b) => b.count - a.count);
  const top    = sorted[0]!;
  const second = sorted[1]!;

  const badgeEl = getEl('dominant-badge');
  const noteEl  = getEl('dominant-note');

  if (total === 0) {
    badgeEl.textContent      = 'Mixed / Neutral';
    badgeEl.style.background = '#897680';
    noteEl.textContent       = 'No clear emotional triggers detected. Even subtle changes in word choice can shift the emotional register significantly.';
  } else if (top.count > 0 && second.count > 0 && (top.count - second.count) / total < 0.08) {
    badgeEl.textContent      = `${top.name} & ${second.name}`;
    badgeEl.style.background = top.color;
    noteEl.textContent       = 'Two appeals are registering at similar strength. Scroll down to check whether that combination is intentional.';
  } else if (top.count / total < 0.3) {
    badgeEl.textContent      = 'Mixed / Neutral';
    badgeEl.style.background = '#897680';
    noteEl.textContent       = 'No single appeal dominates. Spreading emotional signals too evenly can dilute impact — consider which trigger best fits your goal for this email.';
  } else {
    badgeEl.textContent      = top.name;
    badgeEl.style.background = top.color;
    noteEl.textContent       = top.note;
  }

  const barsEl = getEl('appeal-bars');
  barsEl.innerHTML = scored.map(a => {
    const pct   = total > 0 ? Math.round(a.count / total * 100) : 0;
    const isDom = a.id === top.id && total > 0;
    return `<div class="appeal-row${isDom ? ' is-dominant' : ''}">
      <span class="appeal-name" style="${isDom ? `color:${a.color}` : ''}">${a.name}</span>
      <div class="appeal-bar-track">
        <div class="appeal-bar-fill" data-pct="${pct}" style="background:${a.color}"></div>
      </div>
      <span class="appeal-pct" style="${isDom ? `color:${a.color}` : ''}">${pct}%</span>
    </div>`;
  }).join('');
  animateBars(barsEl, '.appeal-bar-fill');

  const tipsEl = getEl('appeal-tips');
  tipsEl.innerHTML = sorted.map(a => `
    <div class="appeal-tip-card" style="border-left-color:${a.color}">
      <div class="appeal-tip-head">
        <span class="appeal-tip-name" style="color:${a.color}">${a.name}</span>
        <span class="appeal-tip-tag">${a.desc}</span>
      </div>
      <p class="appeal-tip-desc">${a.note}</p>
      <div class="appeal-tip-phrases">
        ${a.phrases.map(ph => `<span class="phrase-chip" style="background:${a.tint};color:${a.color}">${ph}</span>`).join('')}
      </div>
    </div>
  `).join('');

  results.classList.add('visible');
}

getEl('appeal-btn').addEventListener('click', analyse);
getEl<HTMLTextAreaElement>('appeal-input').addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Enter' && e.ctrlKey) analyse();
});
