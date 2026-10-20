# ADR 0003: ATS Canonical Hierarchy and Page-Break Containment

We decided to refactor the HTML/CSS architecture of all ATS resume pages (`cv-ats.astro`, `cv-ats-it.astro`) to adhere to strict single-column ATS parsing standards, eliminate orphan entry splits across page breaks, and enforce a semantic heading outline.

## Context
Automated Applicant Tracking Systems (ATS) like Workday, Taleo, Greenhouse, and online evaluation engines (Jobscan, Resume Worded) parse plain text streams extracted from vector PDFs. Previous ATS layouts suffered from three structural breakdowns:
1. **Orphan Experience Entries**: Due to unconstrained print flow, physical page boundaries severed job headers (company/date) at the bottom of Page 1 while leaving the corresponding job title and bullet points at the top of Page 2, triggering "malformed resume structure" errors.
2. **Non-Semantic Hierarchy**: Experience entries used flat `<div>` and `<span>` elements where the company and dates preceded the job title, hindering entity relation extractors from binding roles to organizations.
3. **Encoding & Text Layer Contamination**: Raw mathematical formulas (`∇_surf`, `·`), non-standard phone hyphenation, and missing portfolio URLs compromised literal text extraction and candidate identification.

## Decision
1. **Page-Break Containment**: Enforce `break-inside: avoid; page-break-inside: avoid;` on all `.job-entry`, `.education-entry`, and `.project-entry` containers, with `break-after: avoid;` on `h2` and `h3` headers.
2. **Semantic Hierarchy**: Structure every experience item as a distinct `<article class="job-entry">` with `<h3>` designating the Job Title as the primary entity, followed by a semantic `<div class="job-meta">` containing Company Name, Location, and Date Range.
3. **Standard Section Vocabulary**: Use canonical heading names (`PROFESSIONAL SUMMARY`, `WORK EXPERIENCE`, `EDUCATION`, `TECHNICAL SKILLS`, `PROJECTS` in English; `PROFILO PROFESSIONALE`, `ESPERIENZA LAVORATIVA`, `FORMAZIONE`, `COMPETENZE TECNICHE`, `PROGETTI` in Italian).
4. **Header Micro-Formatting**: Format contact details with individual semantic anchor links, standard telephone spacing (`+39 351 307 8191`), verified canonical email (`colombo.federico12@gmail.com`), LinkedIn, GitHub, and explicit live portfolio URL (`https://federicocolombo12.github.io/PortFolio/`).
5. **Clean Text Layer**: Strip mathematical glyphs in favor of plain technical descriptions (`Morten Mikkelsen Surface Gradient shading on procedural volumes`).
6. **Automated Verification**: Expand `applications/tools/verify_cv_ats.py` to systematically validate page break containment, section header detection, contact metadata completeness, and role/company pairing on every build.

## Consequences
- 100% of experience entries remain atomic; zero entries or bullet points are orphaned across page boundaries.
- ATS parsers accurately extract Candidate Identity, Job Titles, Employers, Dates, and Skills into their respective database fields.
- Both English and Italian standard ATS CVs cleanly fill a 2-page print layout without awkward white space or layout spill.
