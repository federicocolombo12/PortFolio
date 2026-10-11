# ADR 0001: Video Transcoding and Hardware-Accelerated Animations

We decided to transcode all legacy uncompressed `.mov` files to faststart web-optimized MP4 (H.264 / AAC) and migrate manual JavaScript animation loops to native GPU-accelerated APIs (`scrollIntoView({ behavior: 'smooth' })`, `will-change: transform`).

## Context
Raw `.mov` recordings totaled over 217 MB in `public/`, with individual files up to 56 MB (`SPOM.mov`, `PBR_Screen.mov`). When loading the homepage, multiple `<video autoplay>` tags decoded simultaneously, saturating GPU memory bandwidth and causing frame drops on 60/120Hz displays. Furthermore, a custom JS cubic-easing scroll loop conflicted with user trackpad gestures.

## Decision
1. Transcode all `.mov` assets to web-optimized MP4 with `ffmpeg` using `-c:v libx264 -crf 22 -preset slow -movflags +faststart`, targeting ~1.5–3 MB per clip.
2. In the Hero Showreel, maintain only the currently active slide video playing; inactive slides are paused.
3. In the In-Page Modal, delay video stream assignment until after the opening scale transition starts, preventing decoder blocking during the 60fps CSS animation.
4. Replace manual JS scroll interpolations with browser-native smooth scrolling.

## Consequences
- Total video payload reduced from 217 MB to under 18 MB (>90% reduction).
- Page load, memory footprint, and GPU decoding overhead drop drastically.
- Modal openings and scroll animations remain 100% fluid across mobile and desktop.
