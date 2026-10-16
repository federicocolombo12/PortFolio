# Portfolio & Graphics Showcase

The personal portfolio, showcase, and CV generator for Federico Colombo, Graphics Engineer & Technical Artist.

## Language

**Hero Showreel**:
The top interactive carousel showcasing live video highlights of flagship graphics and XR projects.
_Avoid_: Banner, slider, header video

**In-Page Modal**:
The modal dialog overlay that pops up on project card inspection to display multi-media carousels and technical deep-dives without full-page navigation.
_Avoid_: Popup, detail page, dialog window

**Project Card**:
A grid item representing an individual portfolio project with preview image, tags, and interactive inspection button.
_Avoid_: Thumbnail, tile, box

**Tool Badge**:
A specific label on a project card designating its primary software or engine architecture (e.g. `C++ / OpenGL`, `Unity 6 / HLSL`, `Unreal Engine 5`, `Blender 3D`, `VR 360° Film`).
_Avoid_: Generic category, Tech Art tag

**Video Poster Frame**:
A high-resolution still image extracted from a video clip displayed immediately on frame zero to eliminate black rectangles during buffering.
_Avoid_: Placeholder, thumbnail fallback

**Vector PDF Generation**:
The automated Playwright Chromium build step that renders exact 100% design fidelity vector PDFs of Curriculum Vitae and Resume variants into `public/`.
_Avoid_: Print page, PDF export, HTML to PDF

**Mobile Drawer Navigation**:
The off-canvas overlay menu for mobile viewports (< 768px) with glassmorphism blur and 48px touch targets, replacing crowded desktop nav links while keeping the CV quick-access pill prominent.
_Avoid_: Hamburger dropdown, mobile header menu

**Full-Screen Sheet**:
The edge-to-edge modal display mode on mobile devices for inspecting project technical breakdowns with swipe-down dismissal, 16:9 media anchor, and streamlined safe-area margins.
_Avoid_: Mobile popup, mobile dialog

**Swipeable Chip Bar**:
A single-row horizontally scrollable category filter bar with edge-fade indicators, replacing multiline wrapped buttons on mobile viewports.
_Avoid_: Horizontal pill bar, wrapped filter list

