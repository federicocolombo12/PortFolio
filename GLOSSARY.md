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

**Gaussian Splatting NPR**:
A real-time non-photorealistic rendering technique transforming photographic 3D Gaussian Splats into painterly brush strokes (watercolor, gouache, impasto) natively inside Blender 5.3 Beta.
_Avoid_: Splat filter, stylize plugin, post-process splats

**Tangent Flow Field**:
A procedural vector field computed per-point in Geometry Nodes that aligns splat brush elongation tangentially along surface contours and curls with 3D noise.
_Avoid_: Guide curve, stroke direction, point velocity

**ATS Canonical Structure**:
A single-column document architecture adhering to strict Applicant Tracking System parsing rules: standardized section titles (`PROFESSIONAL SUMMARY`, `WORK EXPERIENCE`, `EDUCATION`, `TECHNICAL SKILLS`, `PROJECTS`), semantic heading tags (`h1`, `h2`, `h3`), and zero-split entry blocks.
_Avoid_: Freeform layout, multi-column ATS, graphic table

**Orphan Experience Entry**:
A critical document formatting error where an experience header (company/job title) is severed from its associated bullet points across a physical page boundary.
_Avoid_: Split entry, broken block, trailing bullet

**ATS Text Layer**:
The direct, extractable string content extracted from a PDF stream via standard PDF text extractors, strictly devoid of math symbols, ligatures, or unencoded characters.
_Avoid_: OCR text, graphic layer, print raster

**Viewport Kuwahara Filter**:
A real-time non-linear edge-preserving filter in Blender's Viewport Compositor that pools colors and softens gradients while preserving high-contrast silhouette edges.
_Avoid_: Oil paint filter, blur mask

**Radiance Base**:
The raw unshaded photometric color and opacity of native 3D Gaussian Splats preserved directly from the capture without destructive artificial shadow removal.
_Avoid_: Point diffuse, base color

