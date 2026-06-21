# Copy Review — Holistic Email Marketing Tools

This document collects all user-facing explanatory text across the index and five tool pages for review and editing.

---

## INDEX PAGE (`index.html`)

### Header
- **Brand name:** Holistic Email Marketing
- **Tagline:** Free optimisation tools

### Hero
- **Kicker:** Free Tools
- **Heading:** Sharpen Your Email Marketing
- **Sub-heading:** Stop guessing. Start growing.
- **Lead:** Five practical, no-sign-up tools to help you analyse, improve, and test your email copy.

### Tools section kicker
- **Kicker:** Five tools — pick yours

### Tool cards

**We-We Calculator**
- **Badge:** Foundation
- **Description:** Is your copy talking about you, or to your reader? Paste your email and see the brand vs. customer balance instantly.

**Email Readability Score**
- **Badge:** Foundation
- **Description:** Paste your email to check its reading level against three industry-standard formulas — Flesch-Kincaid, Gunning Fog, and SMOG.

**Feature-to-Benefit Converter**
- **Badge:** Intermediate
- **Description:** Enter a product or service feature and get a customer-benefit statement that speaks to your reader's real needs.

**Statistical Significance Calculator**
- **Badge:** Intermediate
- **Description:** Enter your sample size and conversion rates to find out whether your A/B test result is statistically significant before you act on it.

**Email Tone Analyzer**
- **Badge:** Intermediate
- **Description:** Paste your email to see which tones are present — friendly, persuasive, professional, urgent, or empathetic — and get phrase suggestions for shifting tone.

### Footer
- **Tagline:** Smarter email starts here.

---

## WE-WE CALCULATOR (`wewe-tool.html`)

### Tool header
- **Badge:** Foundation
- **Title:** We-We Calculator
- **Lead:** Is your copy talking about you, or to your reader? Paste your email below and see the brand vs. customer balance at a glance.

### How it works note
The calculator counts brand-centric pronouns (we, us, our, I, me, my) and customer-centric pronouns (you, your), then shows you the split. Note that first-person *I* is included in the brand count — so naturally conversational copy will score more brand-focused than it really is. Treat the result as a directional guide, not a precise measure.

### Input
- **Field label:** Your email copy
- **Placeholder:** Paste your email copy here…
- **Error message:** Please paste some email copy before analysing.
- **Button:** Analyse →

### Results
- **Results label:** Results
- **Score box 1:** Brand-Focused
- **Score box 2:** Customer-Focused
- **Tip (brand > 60%):** Your copy is heavily brand-focused. Try replacing "we", "us", and "our" with "you" and "your" to put your reader at the centre of the message.

---

## EMAIL READABILITY SCORE (`ers-tool-feedback.html`)

### Tool header
- **Badge:** Foundation
- **Title:** Email Readability Score
- **Lead:** Check how easy your email copy is to read. Paste your text below to get scores from three industry-standard readability formulas, plus actionable suggestions.

### Input
- **Field label:** Your email copy
- **Placeholder:** Paste your email copy here…
- **Error message:** Please paste some email copy before checking.
- **Button:** Check Readability →

### Results
- **Results label:** Readability Scores

**Flesch-Kincaid**
- **Description:** Score out of 100 — higher is easier. Weighs sentence length and syllable count.
- **Grade labels:** Very Easy — 5th grade (90+) / Easy — 6th grade (80–89) / Fairly Easy — 7th grade (70–79) / Standard — 8th–9th grade (60–69) / Fairly Difficult — 10th–12th grade (50–59) / Difficult — College level (30–49) / Very Difficult — Advanced College (<30)

**Gunning Fog**
- **Description:** Grade level estimate based on sentence length and complex (3+ syllable) words.
- **Grade labels:** Clear & accessible (≤6) / Good for most email (7–8) / Moderate complexity (9–10) / Challenging (11–12) / Very complex (13+)

**SMOG Index**
- **Description:** Grade level estimate focused on polysyllabic words. Favoured in healthcare comms.
- **Grade labels:** Clear & accessible (≤6) / Good for most email (7–8) / Moderate complexity (9–10) / Challenging (11–12) / Very complex (13+)

**Email target zone**
- **Content:** Aim for a Flesch-Kincaid score of **60 or above** and a Gunning Fog / SMOG grade of **8 or below** — roughly a comfortable 8th-grade reading level for most audiences.

### Suggestions
- **Suggestions label:** Suggestions
- **Suggestion 1:** You have at least one very long sentence (20+ words). Breaking it up will improve readability.
- **Suggestion 2:** Your text contains several polysyllabic words. Where possible, swap them for shorter alternatives.
- **Suggestion 3:** Passive voice detected multiple times. Active constructions ("we sent" vs "was sent") tend to read faster.

---

## FEATURE-TO-BENEFIT CONVERTER (`f2b-tool.html`)

### Tool header
- **Badge:** Intermediate
- **Title:** Feature-to-Benefit Converter
- **Lead:** Transform a product or service feature into a customer benefit statement your reader will actually care about.

### How it works note
Enter a feature, choose your industry, and the converter generates a customer-benefit statement drawn from a curated template library. Results are starting points — adapt the language to fit your specific product, audience, and brand voice before using.

### Input
- **Field label 1:** Your industry *(optional)*
- **Dropdown options:** General / E-commerce & Retail / SaaS & Technology / Professional Services / B2B / Financial Services / Healthcare & Wellbeing / Education & Training / Non-profit & Charity
- **Field label 2:** Product or service feature
- **Placeholder:** e.g. automated email scheduling
- **Error message:** Please enter a feature to convert.
- **Button:** Convert →

### Results
- **Results label:** Customer Benefit
- **Variation button:** Try another variation →

---

## STATISTICAL SIGNIFICANCE CALCULATOR (`sscc.html`)

### Tool header
- **Badge:** Intermediate
- **Title:** Statistical Significance Calculator
- **Lead:** Find out whether your A/B test result is statistically significant before you act on it. Enter your sample size and conversion rates below.

### Input
- **Field label 1:** Sample Size — per variant
- **Placeholder 1:** e.g. 1000
- **Field label 2:** Control Rate (%)
- **Placeholder 2:** e.g. 2.5
- **Field label 3:** Variant Rate (%)
- **Placeholder 3:** e.g. 3.1
- **Error message:** Please enter valid values in all three fields.
- **Button:** Calculate →

### Results
- **Verdict 1 (≥99% confidence):** 99% Confident — Your result is highly significant. You can act on this with confidence.
- **Verdict 2 (95–98% confidence):** At Least 95% Confident — Your result meets the standard threshold for statistical significance.
- **Verdict 3 (<95% confidence):** Not Yet Significant — You need more data before acting on this result. Continue the test.

---

## EMAIL TONE ANALYZER (`tone-tool.html`)

### Tool header
- **Badge:** Intermediate
- **Title:** Email Tone Analyzer
- **Lead:** Paste your email copy to see which tones are present — and get phrase suggestions for shifting toward the tone you want.

### Input
- **Field label:** Your email copy
- **Placeholder:** Paste your email copy here…
- **Error message:** Please paste some email copy before analysing.
- **Button:** Analyse Tone →

### Results — dominant tone verdicts
- **Label:** Dominant tone
- **Friendly note:** Works well for welcome sequences, nurture flows, and community-driven brands.
- **Persuasive note:** Essential for promotional campaigns, product launches, and conversion-focused sequences.
- **Professional note:** Best suited for B2B, financial, legal, or enterprise audiences.
- **Urgent note:** Use sparingly — effective for flash sales, event reminders, and expiring offers.
- **Empathetic note:** Powerful in re-engagement flows, customer service emails, and sensitive subject matter.
- **Mixed/Neutral note:** No single tone stands out strongly. This can work for purely informational emails, but adding intentional tone signals will improve engagement.

### Results — tone breakdown label
- **Label:** Tone breakdown

### Tone definitions and phrase suggestions

**Friendly**
- **Description:** Warm, conversational, and approachable. Reads like a message from someone you know.
- **Note:** Works well for welcome sequences, nurture flows, and community-driven brands.
- **Example phrases:** "Hey [name]," / "Hope you're well" / "We love that" / "Excited to share" / "Feel free to" / "Chat soon"

**Persuasive**
- **Description:** Benefit-led and action-driving. Speaks directly to results and motivates a decision.
- **Note:** Essential for promotional campaigns, product launches, and conversion-focused sequences.
- **Example phrases:** "You'll get" / "Proven to" / "Discover" / "Transform" / "Claim your" / "Results speak"

**Professional**
- **Description:** Formal, structured, and authoritative. Establishes credibility and trust.
- **Note:** Best suited for B2B, financial, legal, or enterprise audiences.
- **Example phrases:** "Please find" / "I'd like to" / "As discussed" / "With regard to" / "I look forward" / "Should you require"

**Urgent**
- **Description:** Deadline-driven and scarcity-focused. Creates FOMO and prompts immediate action.
- **Note:** Use sparingly — effective for flash sales, event reminders, and expiring offers.
- **Example phrases:** "Limited time" / "Ends tonight" / "Last chance" / "Today only" / "Act now" / "Only X left"

**Empathetic**
- **Description:** Understanding, supportive, and reader-centric. Acknowledges challenges before offering solutions.
- **Note:** Powerful in re-engagement flows, customer service emails, and sensitive subject matter.
- **Example phrases:** "We understand" / "You're not alone" / "We know how" / "We're here for you" / "That's why we" / "It can be tough"

### Results — strengthen tone label
- **Label:** How to strengthen each tone
