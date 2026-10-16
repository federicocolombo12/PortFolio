# ADR 0002: Mobile Responsive Architecture and Touch Ergonomics

We decided to decouple desktop and mobile layouts through strict responsive boundaries: preserving the desktop layout 100% intact, while transforming mobile (< 768px) into an app-grade touch experience with Mobile Drawer Navigation, a Full-Screen Sheet for project inspection, single-row Swipeable Chip Bars for category filtering, and safe-area responsive media containment.

## Context
The portfolio's rich desktop design (multi-link header, floating centered modal box, horizontal multi-column grids, and multi-line category filters) resulted in severe usability friction on mobile viewports (< 768px): navigation links crowded horizontally without an off-canvas drawer, modal popups suffered dual-scroll and safe-area notch clipping, wide markdown tables caused body-width blowouts, and filter chips wrapped across multiple rows.

## Decision
1. **Desktop Integrity**: All desktop rules (> 768px) remain strictly untouched.
2. **Mobile Drawer Navigation**: On < 768px, compress the top header into `[Logo] --- [CV Pill] [Hamburger]`. The CV pill remains permanently accessible in 1 tap, while section links and social handles move into a glassmorphism off-canvas drawer with 48px touch targets.
3. **Full-Screen Sheet**: On mobile, the In-Page Modal expands edge-to-edge (100% width and viewport height) with `env(safe-area-inset-top)` offset for close controls, top-anchored 16:9 media player, and swipe-down dismiss gestures.
4. **Media & Hardware Decoding Safeguard**: Only the currently active slide inside the modal decodes and plays video; all inactive slides and thumbnail strips display lightweight static WebP Video Poster Frames.
5. **Swipeable Chip Bar**: Convert wrapped category filter buttons into a single-row horizontally scrollable container with fade gradient edge indicators.
6. **Responsive MDX Deep-Dives**: Contain all technical benchmark tables in auto-scrolling wrappers (`overflow-x: auto`) and collapse multi-column video grids to a single column on < 640px.

## Consequences
- Zero layout regressions on desktop/web viewports.
- 100% touch-friendly, native-feeling mobile experience for recruiters and technical leads on iOS and Android.
- Safe-area compliance across all modern smartphone form factors (notches, Dynamic Island, home indicators).
- No memory leaks or GPU video decoder saturation on mobile networks.
