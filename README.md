# Federico Colombo | Portfolio

A professional portfolio built with **Astro**, focusing on showcasing Technical Art, XR Development, and Game Programming projects.

## Tech Stack

- **Framework:** [Astro](https://astro.build)
- **Styling:** Custom CSS with Glassmorphism, Dark Mode, and CSS Variables
- **Content:** MDX (Markdown with JSX components) and Content Collections
- **Deployment:** Ready for Vercel / Netlify / GitHub Pages

## Project Structure

The portfolio uses Astro's Content Collections to strictly type and organize projects:

- `src/content/projects/`: Contains `.mdx` files for every portfolio piece.
- `src/pages/`: Contains the main routing (`index.astro` for Home, `about.astro` for the CV timeline, and `projects/index.astro` for the gallery).
- `src/components/`: Reusable Astro components like the Navigation Header, Footer, and SEO elements.
- `src/styles/global.css`: Centralized CSS variables, typography, and utility classes for the "Blue/Cyan" aesthetic.

## Local Development

```bash
npm install
npm run dev -- --background
```

Your dev server will start at `http://localhost:4321/`.

## Author

**Federico Colombo**
- Game and XR Developer
- LinkedIn / GitHub / Contacts: See the website for more info!
