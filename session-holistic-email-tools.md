# Session: Holistic Email Marketing — Free Email Optimisation Tools

**Date:** 2026-05-30  
**Repo:** `jonathanpay/Holistic-Email-Marketing--Free-Email-Optimization-Tools`  
**Branch:** `claude/sweet-shannon-BUK9c`  
**PR:** https://github.com/jonathanpay/Holistic-Email-Marketing--Free-Email-Optimization-Tools/pull/1

---

## What Was Done

### Starting point
The repo had been started on lovable.dev and imported to GitHub but not maintained. Tools existed as incomplete HTML fragments with no shared design system and no index page. One file (`sscc 3.html`) had a broken filename with a space.

### Design system applied
Used the **Holistic Email Academy (HEA)** design system (not the incomplete HEM one):
- Font: CMG Sans (Regular 400 + SemiBold 600) — local `fonts/` directory
- Brand colour: Academy Purple `#9E41BF`
- CSS custom properties: all `--hea-*` namespace
- Shared files: `style.css` (tokens + base components) and `tool-page.css` (page layout)
- Assets: `assets/logo-icon.png` (arrow-loop mark)

### Files in the HEM repo (final state)

```
index.html                  Landing page — 2×3 card grid of all 5 tools
style.css                   HEA design system tokens + base components
tool-page.css               Shared page layout for all tool pages
wewe-tool.html              We-We Calculator
ers-tool-feedback.html      Email Readability Score
f2b-tool.html               Feature-to-Benefit Converter
sscc.html                   Statistical Significance Calculator
tone-tool.html              Email Tone Analyzer (new — was missing)
fonts/CMGSans-Regular.ttf
fonts/CMGSans-SemiBold.ttf
assets/logo-icon.png
assets/logo-wordmark.png
README.md
```

`sscc 3.html` was deleted (replaced by `sscc.html`).

---

## Each Tool — Current State

### 1. We-We Calculator (`wewe-tool.html`)
- **Level:** Foundation
- **What it does:** Counts brand-centric pronouns (we, us, our, I, me, my) vs customer-centric (you, your), shows % split with animated bars
- **Disclaimer added:** `tool-note` block above the tool card explaining that `I` is counted as brand-centric so conversational copy will skew brand-heavy — treat as directional
- **Tip box:** appears when brand % > 60%, suggests replacing we/us/our with you/your

### 2. Email Readability Score (`ers-tool-feedback.html`)
- **Level:** Foundation
- **What it does:** Scores copy against Flesch-Kincaid, Gunning Fog, and SMOG
- **Key fixes made:**
  - Syllable counting changed from single-string vowel split to **per-word** using `syllablesInWord()` (strips to alpha, removes silent trailing `e`, counts vowel groups, min 1 per word)
  - Gunning Fog and SMOG now show **dynamic grade labels** ("Clear & accessible", "Good for most email", "Moderate complexity", "Challenging", "Very complex")
  - **Blended Score dropped** — it was averaging incompatible scales (FK is 0–100 ease; GF/SMOG are grade levels). Replaced with a "Email target zone" guidance card (purple fill): aim for FK ≥ 60, GF/SMOG ≤ grade 8
  - Each score card has a one-line italic description of what the formula measures
- **Suggestions:** long sentences (20+ words), polysyllabic words (>5 occurrences), passive voice (>2 matches)

### 3. Feature-to-Benefit Converter (`f2b-tool.html`)
- **Level:** Intermediate
- **What it does:** Takes a product feature + industry vertical → returns a benefit statement
- **Architecture:** 384 templates in a nested JS object `templates[vertical][category]` (8 × 8 × 6)
- **8 verticals:** general, ecommerce, saas, professional (services), financial, healthcare, education, nonprofit
- **8 categories:** time-saving, ease-of-use, performance, cost-saving, security, analytics, personalisation, support
- **Detection:** `detectCategory(feature)` uses partial-match keyword lists per category (`categoryKeywords` object); defaults to `ease-of-use`
- **UI:** vertical `<select>` dropdown (`.hea-select` pill styling with custom SVG chevron), feature text input, benefit output as italic quote block on warm cream, "Try another variation →" ghost button re-runs `convert()`
- **Caveat note:** above the card explaining the tool uses templates not AI generation

### 4. Statistical Significance Calculator (`sscc.html`)
- **Level:** Intermediate
- **What it does:** Pooled proportion z-test. Inputs: sample size (per variant), control rate %, variant rate %
- **Output:** 99% Confident / At Least 95% Confident / Not Yet Significant — with animated badge (check/cross SVG) colour-coded green/red
- **Formula:** pooled rate → standard error → z-score → `(1 - 1/exp(z²/2)) × 100`

### 5. Email Tone Analyzer (`tone-tool.html`) — **New**
- **Level:** Intermediate
- **What it does:** Detects 5 tones via keyword matching; shows dominant tone badge + animated % bars + tip cards
- **5 tones:** Friendly, Persuasive, Professional, Urgent, Empathetic
- **Each tone has:** ~20 keyword/phrase patterns, a description, a "when to use" note, and 6 example phrases shown as chips
- **Scoring:** substring search counting all occurrences; results normalised to % of total matches
- **Tip cards:** sorted dominant-first, always visible (not conditional on score)
- **No-signal state:** if total keyword count = 0, badge reads "Mixed / Neutral" with a neutral explanation

---

## index.html
- Sticky header: logo + brand name
- Hero: "Sharpen Your Email Marketing" / "Stop guessing. Start growing." / 5-tool lead text
- Tools section on `--hea-bg-alt` with 2-column card grid (wraps to 1 col on mobile)
- Each card: level pill, title, description, "Open tool →" link
- Footer: logo + "Smarter email starts here."

---

## jonathanpay.github.io — email-tools subdirectory

A separate deliverable was created for the personal GitHub Pages site. See archive: `email-tools-patch.tar.gz` (sent as file download in session — needs to be manually applied to local clone of `jonathanpay/jonathanpay.github.io`).

### What's in the archive
```
jonathanpay.github.io/
  index.html                 (modified — "Email Tools" added to nav; Projects placeholder → live card)
  email-tools/
    index.html               Tools hub page (navy/gold styled)
    style.css                --hea-* tokens remapped to navy/gold palette; Open Sans font
    tool-page.css            Layout with navy header + footer matching main site
    wewe-tool.html
    ers-tool-feedback.html
    f2b-tool.html
    sscc.html
    tone-tool.html
```

### How to apply
```bash
tar -xzf email-tools-patch.tar.gz
cd path/to/local/jonathanpay.github.io
cp -r /path/to/extracted/jonathanpay.github.io/email-tools .
cp /path/to/extracted/jonathanpay.github.io/index.html .
git add email-tools/ index.html
git commit -m "Add /email-tools/ section with five standalone tools"
git push
```

### Design mapping (navy/gold)
| HEA token | Original | github.io mapped value |
|---|---|---|
| `--hea-purple` | `#9E41BF` | `#dfb81f` (gold) |
| `--hea-purple-deep` | `#7A2E96` | `#8b7417` (gold-deep) |
| `--hea-purple-tint` | `#F4E9F9` | `rgba(223,184,31,0.12)` |
| `--hea-plum` | `#3D2A35` | `#2c3d50` (navy) |
| `--hea-plum-soft` | `#5C4651` | `#39536f` (navy-mid) |
| `--hea-bg-alt` | `#FBF7FB` | `#f4f5f7` |
| `--hea-bg-warm` | `#FAF3E8` | `#f8f6f1` |
| Font | CMG Sans (local TTF) | Open Sans (Google Fonts) |

---

## Pending / Known Limitations

- **Tone Analyzer keyword matching:** Pure substring matching — no NLP. Tone detection is directional only. Phrase chips in tip cards are hardcoded suggestions, not derived from the actual text.
- **F2B Converter category detection:** Last keyword match wins (no weighting). Short or vague features may misclassify. Could be improved with scoring per category.
- **Syllable counter:** Handles the common `silent-e` case but won't perfectly count diphthongs, irregular words, or names. Accurate enough for editorial guidance.
- **SSOG formula:** Uses `(1 - 1/exp(z²/2)) * 100` as a confidence approximation rather than the standard normal CDF. Results are indicative, not precisely calibrated to a t-distribution.
- **github.io commit signing:** The environment's commit-signing service is scoped to the HEM repo only. That's why the github.io changes were delivered as a tar archive rather than pushed directly.
- **README.md:** Updated in the HEM repo — now accurately lists all 5 tools with descriptions. The old "Email Tone Analyzer" entry (which was listed as available but didn't exist) has been replaced with the new build.

---

## Key Files to Know About

| File | Purpose |
|---|---|
| `style.css` | Single source of truth for HEA design tokens — edit here to retheme all tools |
| `tool-page.css` | Shared layout — header, footer, tool-card, form elements, results |
| `f2b-tool.html` | Most complex file — contains the 384-template JS object (lines ~100–500 approx) |
| `tone-tool.html` | The `tones` array at top of script contains all keyword lists and tip content |
