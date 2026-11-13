## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Context & Token Optimization (`context-mode` MCP)

This project has the `context-mode` MCP server and CLI active (`/opt/homebrew/bin/context-mode`).
To prevent context window bloat and minimize token consumption during refactorings and codebase exploration:

1. **Think-in-Code (Zero Context Bloat):**
   - For bulk code analysis, inspecting file trees, finding cross-references, or auditing props/classes across files, NEVER dump entire large files (e.g., `src/pages/index.astro`, which is >2,200 lines / 80KB) into LLM context via unbounded `view_file`.
   - Run a sandboxed script via `ctx_execute` (Node, Python, or Shell) to process files in the sandbox and print ONLY the computed answer (e.g., matching selectors, line ranges, or summaries).

2. **Search Before Read (`ctx_search`):**
   - All source code in `src/` is indexed in the local FTS5 SQLite knowledge base under `source: "portfolio-src"`.
   - When researching functions, components, styles, or data structures, run `ctx_search(queries: ["..."], source: "portfolio-src")` to locate exact definitions and excerpts.
   - After major structural changes or file additions, refresh the index with `npm run ctx:index`.

3. **Targeted Refactoring:**
   - Once target sections are identified via `ctx_search` or `ctx_execute`, view only the relevant line range (`StartLine` and `EndLine`) and perform surgical modifications with `replace_file_content`.

## Agent skills

### Issue tracker

Issues and specs are tracked in GitHub Issues via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The canonical five-role triage vocabulary is used (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout (`GLOSSARY.md` and `docs/adr/` at repo root). See `docs/agents/domain.md`.

## PDF Generation & ATS Text Layer Integrity Rules (MANDATORY)

Any agent generating or modifying PDF CVs, Resumes, or Cover Letters MUST adhere strictly to the following engineering standards. Failure to follow these rules corrupts the PDF text stream and causes ATS parsers (Ashby, Workday, Greenhouse, iCIMS, Lever) to fail keyword extraction.

1. **Font Embedding & System Fonts (Zero `/Type3` Policy):**
   - **Allowed Fonts:** Use ONLY ubiquitous, native TrueType/OpenType system fonts in print CSS. Prefer:
     `font-family: Arial, Helvetica, sans-serif;` (or `'Times New Roman', Times, serif;`).
   - **Note on macOS Helvetica Neue:** Avoid `'Helvetica Neue'` as the primary font on macOS; Apple's CoreText metrics table for Helvetica Neue can cause word-spacing intervals to be extracted with extraneous newlines in Chromium headless. Prefer `Arial, Helvetica, sans-serif`.
   - **Strictly Prohibited:** NEVER use external web fonts (`fonts.googleapis.com`, `@import`, custom `@font-face`) or macOS dynamic system aliases (`-apple-system`, `BlinkMacSystemFont`). In Chromium headless print, these cause font embedding fallback to `/Subtype /Type3` bitmap/procedural glyphs or broken Unicode CMaps, turning text into illegible gibberish for parsers.

2. **Typography, Ligatures & Stacking Context Integrity:**
   - Always enforce in print stylesheets:
     ```css
     font-variant-ligatures: none !important;
     font-feature-settings: 'liga' 0, 'calt' 0 !important;
     letter-spacing: normal !important;
     text-align: left; /* Avoid justify in print CSS which alters word-spacing intervals */
     ```
   - **No Negative/Fractional Letter-Spacing:** Never use negative `letter-spacing` (e.g. `-0.02em`) in print CSS. Chromium will emit individual glyphs with relative position shifts (`Td`), causing ATS parsers to split words across separate lines (`P y t h o n`).
   - **Natural List Flow (No Absolute Positioning in Bullets):** Never use `position: relative` with `position: absolute` pseudo-elements (`::before`) for bullet points. Chromium Skia pushes absolute layers to separate display lists, which completely scrambles the reading/extraction order (e.g. putting job bullets at the bottom of the page). Always use standard natural flow: `list-style: disc; padding-left: 13px;` or inline bullets.

3. **Chromium Headless CLI Flag:**
   - Always use the modern Chromium print engine:
     `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="<output.pdf>" "<input.html>"`

4. **Circular Photo / Avatar Artifact Prevention:**
   - Never apply `border-radius: 50%` with `box-shadow` or colored backgrounds over rectangular images in print CSS (Chromium's Skia PDF renderer outputs a black/dark square artifact box behind the circle).
   - Photos MUST be pre-cropped as transparent circular PNGs (e.g. via Python `PIL` with 4x supersampled anti-aliased alpha mask). In CSS, use `background: transparent; box-shadow: none; border: none;`.

5. **Single-Page A4 Enclosure & Space Utilization (Density Rule):**
   - Set `@page { size: A4 portrait; margin: 0; }`.
   - Calculate paddings and line-heights precisely so the document fits strictly on **1 page A4** (`len(reader.pages) == 1`). Blank or spillover second pages are strictly unacceptable.
   - **Balanced Column Filling & Organic Density:** Avoid half-empty pages or large white voids at the bottom of either column (aim for ~88–95% vertical usage across both sidebar and main content). If space remains, deepen the technical bullets, mention architectural decisions, low-level optimizations, profiling workflows, or additional relevant projects from `master_profile.md`.

6. **Mandatory Post-Generation Verification (Automated Test):**
   - Every generation script MUST run an automated verification check using `pypdf` or `pdfplumber` asserting:
     a) Total page count is exactly 1.
     b) Extracted text is clean and continuous (verify candidate name, email, education, and keywords extract without character-splitting newlines).
     c) Zero `/Type3` font dictionaries exist in PDF objects (only `/Type0` or `/TrueType`).

7. **Zero Hallucination & Fact Integrity:**
   - All candidate profile data must match `applications/profile/master_profile.md` and `src/pages/cv.astro` with 100% fidelity.
   - Verified URLs:
     - Portfolio: `https://federicocolombo12.github.io/PortFolio/`
     - GitHub: `https://github.com/federicocolombo12`
     - LinkedIn: `https://www.linkedin.com/in/federico-colombo10`

8. **Cover Letter Tone of Voice (Anti-Sycophancy & Human-Engineer Policy):**
   - **Zero "Leccata di Culo" / No Sycophancy:** Strictly eliminate excessive flattery, brown-nosing, and hyperbolic company praise (e.g., ban phrases like *"I have long admired your world-class leadership"*, *"your visionary groundbreaking work"*, *"I would be deeply honored to join"*).
   - **Zero AI-Jargon & Formulaic Openings:** Ban generic LLM tropes (*"I am writing to express my profound excitement/enthusiasm"*, *"testament to"*, *"delve into"*, *"foster dynamic synergies"*, *"seamlessly bridge the gap"*).
   - **No LinkedIn Job IDs as Requisition Codes:** NEVER use LinkedIn URL numeric IDs (e.g. `Ref: 4485736691`) as a reference or requisition code. LinkedIn numbers are internal platform board IDs, not corporate job requisitions. Only include a reference code if it is an official employer requisition ID (e.g. `REQ-...`, `26WD...`). If none exists, identify the role strictly by title and location (*"Application: GPU Software Engineer — Cork, Ireland"*).
   - **Clickable Hyperlinks for Mentioned Projects:** Whenever a project (*PulseEngine*, *Graphics Lab Engine*, *Smart Cable Generator*) is cited in the cover letter text, embed an active hyperlink directly to its live portfolio or GitHub URL (`<a href="...">ProjectName</a>`), styled cleanly so recruiters can inspect code and demos with one click.
   - **Objective Hardware & Architecture Framing (No Forced Pandering):** Reference target hardware (e.g. Meta Quest 3 / Snapdragon XR2 Gen 2) strictly as objective architectural constraints and engineering specs (e.g. mobile tiled GPU limits, memory bandwidth ceilings, thermal envelopes), never as an unnatural brand-dropping device to flatter the company.
   - **Direct, Pragmatic & Engineer-to-Engineer:** Adopt the voice of a confident, competent software engineer speaking directly to peers or technical managers:
     - Open directly with the role applied for and your immediate technical focus.
     - Highlight 2-3 concrete engineering challenges you solved with hard metrics and architectural specifics (low-level GPU compute, memory/allocations, cache/pipeline efficiency, tooling).
     - State practical alignment with their stack, hardware target, and logistics (e.g., EU citizenship / immediate right to work, relocation readiness).
     - Keep it crisp, factual, and punchy.

9. **Job Fit & Brutal Honesty Policy (Zero-Bullshit Filter):**
   - **No Sugarcoating / Zero Time-Wasting:** When the candidate shares a job posting or asks to evaluate/apply for a role, give a 100% candid, unfiltered technical and strategic assessment. If a role is unviable, an operational dead-end, or a waste of time, say so directly and immediately. Do NOT draft applications for dead-on-arrival positions.
   - **Hard Filter 1 — Legal & Work Authorization:** Check location and visa eligibility first (EU vs UK vs US vs Canada). Studios in British Columbia/Quebec operating under provincial tax credits (FIBC / PSTC) legally require existing local work authorization/residency and do not sponsor junior/intermediate roles. If legally disqualified, flag as **Dead on Arrival**.
   - **Hard Filter 2 — Career Vector & Specialization:** Protect the candidate's strategic vector (Technical Artist / Real-Time Graphics Programmer / Engine Engineer in Unity, UE5, C++, HLSL). Reject roles that push them into unrelated operational labor (e.g. night-shift render farm babysitting, general IT support, basic manual QA) unless explicitly instructed otherwise.
   - **Hard Filter 3 — Tech Stack & Production Fit:** Honestly map the candidate's proven toolchain against mandatory requirements. Differentiate between learnable overlaps and hard blockers (e.g. 3+ years Houdini/Nuke/Katana VFX pipeline vs Real-Time Engine/Shader programming).

10. **Mandatory OpenATS X-Ray Reverse-Engineering Verification Rule:**
    - **Custom Local Tool Path:** `/Users/federicocolombo/Documents/open-ats-xray`
    - Every generation script MUST invoke and assert passing results using Federico's custom reverse-engineering tool **OpenATS X-Ray**:
      ```bash
      PYTHONPATH=/Users/federicocolombo/Documents/open-ats-xray python3 -m ats_xray.cli analyze <output_cv.pdf> --jd <posting.md> --master <master_profile.md>
      PYTHONPATH=/Users/federicocolombo/Documents/open-ats-xray python3 -m ats_xray.cli cover-letter <output_cl.pdf> --jd <posting.md> --master <master_profile.md>
      ```
    - **Zero Enterprise ATS Failures:** The CV must achieve `[PASS]` on all 5 simulated enterprise parsers:
      1. **Workday** (Textkernel / Sovren): 100/100 (canonical headers, standard date patterns, zero /Type3).
      2. **Greenhouse** (Linear Structural Pattern-Matcher): 100/100 (pure single-column, 0 column bleeds).
      3. **Ashby** (Modern Geometric Parser): 100/100 (valid /Annots links, clean glyphs).
      4. **Lever** (Context-Weighted Stemmer): 100/100 (no ligatures, contextual keywords in project bullets).
      5. **iCIMS / Taleo** (Legacy Stream-Order Parser): 100/100 (strict stream linearity, zero reading breaks).
    - **Target Score Thresholds:** Overall ATS Score `>= 90/100`, Rigor Score `>= 85/100`, with Hiring Committee consensus `STRONG ADVANCE TO PHONE SCREEN`.
    - **Cover Letter Score & Density:** Cover Letter must achieve `100/100` on Authenticity and Rigor with `OPTIMAL_A4` density budget (~320–380 words) and committee verdict `ADVANCE`.
    - **Strict Stream Linearization (Zero Column Bleeds):** Avoid floating elements (e.g. `float: right;` for dates/location) or multi-column flex setups that introduce horizontal coordinate gaps > 60pt on the same Y-axis. Always use inline stream hierarchy:
      `<div class="entry-header"><span class="entry-role">Role</span> <span class="entry-meta">&bull; Company &bull; Location &bull; Dates</span></div>`.
    - **Canonical Section Headers:** Always use taxonomy-standard headers: `PROFESSIONAL SUMMARY`, `TECHNICAL SKILLS` (or `CORE COMPETENCIES`), `PROFESSIONAL EXPERIENCE`, `KEY PROJECTS`, `EDUCATION`.
    - **Standard Date Patterns:** Format dates using standard intervals (e.g., `03/2026 – Present`, `11/2024 – Present`, `10/2024 – 01/2025`, `09/2023 – 06/2024`, `Oct 2024 – Dec 2026`, `Oct 2021 – Jul 2024`) to enable automated Years of Experience (YoE) parsing.
    - **Quantified Impact Density:** Ensure technical bullets feature grounded numerical benchmarks (`%`, `ms`, `fps`, `x`, counts of assets/students from `master_profile.md`) to satisfy the quantified impact threshold.

## Antigravity Multi-Device Logging Rule
Alla fine di ogni task, piano di implementazione o refactoring significativo:
1. Genera o aggiorna una sintesi di massimo 5 righe in:
   `/Users/federicocolombo/Library/CloudStorage/GoogleDrive-chiccoclub5@gmail.com/Il mio Drive/Antigravity_Connectors/mac/status_latest.md`
2. Formato obbligatorio:
   - Device: MacBook M4
   - Progetto attivo: Portfolio
   - Cosa è stato fatto oggi: [1-2 frasi]
   - Blocco/Problema tecnico attuale: [es. issue layout, bug transizioni o "Nessuno"]
   - Prossimo passo pianificato: [cosa farai dopo]
