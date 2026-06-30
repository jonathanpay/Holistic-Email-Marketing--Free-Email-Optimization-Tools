import { getEl } from '../shared/utils';

function calculate(): void {
  const sampleSize  = parseFloat(getEl<HTMLInputElement>('sampleSize').value);
  const controlRate = parseFloat(getEl<HTMLInputElement>('controlRate').value) / 100;
  const variantRate = parseFloat(getEl<HTMLInputElement>('variantRate').value) / 100;
  const errorEl     = getEl('sscc-error');
  const resultsEl   = getEl('sscc-results');

  if (isNaN(sampleSize) || isNaN(controlRate) || isNaN(variantRate) || sampleSize <= 0) {
    errorEl.classList.add('visible');
    resultsEl.classList.remove('visible');
    return;
  }
  errorEl.classList.remove('visible');

  const pooledRate    = (controlRate + variantRate) / 2;
  const standardError = Math.sqrt((2 * pooledRate * (1 - pooledRate)) / sampleSize);
  const zScore        = Math.abs(variantRate - controlRate) / standardError;
  const confidence    = (1 - (1 / Math.exp(zScore * zScore / 2))) * 100;

  const badge          = getEl('sscc-badge');
  const verdict        = getEl('sscc-verdict');
  const note           = getEl('sscc-note');
  const check          = getEl('badge-check');
  const cross          = getEl('badge-cross');
  const validationEl   = getEl('sscc-validation');
  const valHead        = getEl('sscc-validation-head');
  const valBody        = getEl('sscc-validation-body');
  const crosslinkEl    = getEl('sscc-crosslink');
  const crosslinkLabel = getEl('sscc-crosslink-label');
  const ctaEl          = getEl('sscc-course-cta');

  badge.className   = 'confidence-badge';
  verdict.className = 'confidence-verdict';

  if (confidence >= 99) {
    badge.classList.add('is-significant');
    verdict.classList.add('is-significant');
    verdict.textContent      = '99% Confident';
    note.textContent         = 'Your result is highly significant. You can act on this with confidence.';
    check.style.display      = ''; cross.style.display = 'none';
    valHead.textContent      = 'Before you roll out — validate';
    valBody.textContent      = 'A highly significant result is a strong signal. In Holistic Testing, the next step is validation: repeat the finding in a different segment or on a separate send occasion. One result, however strong, can still be a coincidence. Confirmation is what turns a signal into a reliable insight.';
    validationEl.style.display  = '';
    crosslinkLabel.textContent  = 'Planning your next test?';
    crosslinkEl.style.display   = '';
  } else if (confidence >= 95) {
    badge.classList.add('is-significant');
    verdict.classList.add('is-significant');
    verdict.textContent      = 'At Least 95% Confident';
    note.textContent         = 'Your result meets the standard threshold for statistical significance.';
    check.style.display      = ''; cross.style.display = 'none';
    valHead.textContent      = 'Significant — but validate before rolling out';
    valBody.textContent      = 'This result clears the standard threshold, but in Holistic Testing that\'s a reason to validate, not to immediately declare a winner. Repeat the test in a different context — a different segment, list, or send occasion — to confirm the pattern holds before committing to a change.';
    validationEl.style.display  = '';
    crosslinkLabel.textContent  = 'Planning your validation test?';
    crosslinkEl.style.display   = '';
  } else {
    badge.classList.add('not-significant');
    verdict.classList.add('not-significant');
    verdict.textContent      = 'Not Yet Significant';
    note.textContent         = 'You need more data before acting on this result.';
    cross.style.display      = ''; check.style.display = 'none';
    valHead.textContent      = 'Two things to check';
    valBody.textContent      = 'First, confirm your test has run for the duration you planned — checking early is a common source of false negatives. Second, if you\'ve hit your planned duration and still have no result, your effect size may be smaller than your test was designed to detect. Use the Duration Calculator to check whether a longer run or a wider minimum effect would change things.';
    validationEl.style.display  = '';
    crosslinkLabel.textContent  = 'Check if your test was sized correctly →';
    crosslinkEl.style.display   = '';
  }

  ctaEl.style.display = '';
  resultsEl.classList.add('visible');
}

getEl('sscc-btn').addEventListener('click', calculate);
(['sampleSize', 'controlRate', 'variantRate'] as const).forEach(id => {
  getEl<HTMLInputElement>(id).addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') calculate();
  });
});
