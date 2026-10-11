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

