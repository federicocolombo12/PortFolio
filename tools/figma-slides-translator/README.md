# Tech Art Slides Studio - Figma Plugin
*(Translator, Design System Harmonizer, Layout Auto-Align & Tech Art HUD Decorator)*

Una suite completa sviluppata su misura per Figma Slides per trasformare la presentazione (`Tech-Art-Presentazione_ENG`) in un pitch deck tecnico di livello AAA (stile GDC / Unreal Engine Showcase).

---

## ⚡ Come caricare il plugin in Figma (10 secondi)

1. Apri **Figma** (Desktop o Browser).
2. Apri il file duplicato della presentazione:
   👉 **`Tech-Art-Presentazione_ENG`**
3. Clicca sull'icona menu in alto a sinistra (o fai click destro sul canvas) e vai su:
   **Plugins** > **Development** > **Import plugin from manifest...**
4. Seleziona il file `manifest.json` che si trova in:
   `/Users/federicocolombo/Documents/Portfolio/tools/figma-slides-translator/manifest.json`
5. Clicca su **Open**: il plugin comparirà subito nella lista dei tuoi plugin di sviluppo!

---

## 🛠️ Le 4 Modalità dello Studio

### 1. 🌐 Translate (IT ➔ EN)
* **Scan Full Deck / Selection:** Rileva all'istante tutte le slide e i testi presenti.
* **Tech Art Dictionary + Fallback:** Utilizza il glossario tecnico curato per i 5 capitoli (Environment Art, Heightmaps, PCG, MetaHumans, Hair Grooming, Sequencer, Live Link Mocap, COLMAP, Gaussian Splatting, Niagara VFX).
* **Safe Font Loading:** Carica in asincrono ciascun font prima di sostituire il testo, evitando salti visivi.

### 2. 🎨 Typography (Harmonize Styles)
* **Headline Font:** Imposta il font display per i titoli (Default: `Chakra Petch`, taglio tecnico a 45°, o `Space Grotesk`).
* **Body Font:** Imposta il font leggibile per i paragrafi (Default: `Inter`).
* **Snap Font Sizes:** Normalizza la gerarchia visiva (H1: 36/48px, H2: 20px, Body: 14px, Tag: 11px).
* **Harmonize Contrast:** Sostituisce i grigi scuri e poco leggibili con bianchi brillanti (`#FFFFFF`) e ardesia chiara (`#CBD5E1`), preservando gli accenti cromatici dei capitoli (Ciano, Viola, Ambra, Rosso, Smeraldo).
* **Unify Cards:** Uniforma i raggi degli angoli a 8px e i bordi a 1px sottile.

### 3. 📐 Align Grid (Auto-Allineamento & Layout Clean)
* **Align Slide Headers:** Allinea tutti i titoli, kickers e sottotitoli al margine sinistro standard (default: `120px`).
* **Normalize Header Vertical Flow:** Imposta un ritmo verticale costante tra Kicker, Titolo e Sottotitolo (gap 10px).
* **Snap Row Tops:** Rileva le card e le immagini affiancate sulla stessa riga (entro 28px di tolleranza) e allinea la loro coordinata superiore `Y` alla perfezione, eliminando i disallineamenti a scalino.
* **Snap Column Stacks:** Allinea didascalie o card impilate sotto le immagini al bordo sinistro `X`.
* **Auto-Fit Text Bounding Boxes:** Ripara i box di testo a dimensione fissa impostando `WIDTH_AND_HEIGHT` o `HEIGHT` per evitare tagli improvvisi di testo.

### 4. ⚡ Tech Art FX (HUD & Elementi di Stile)
Aggiunge dettagli grafici in perfetto stile **Tech Art / Unreal Engine HUD**:
* **Slide Top HUD Bar:** Inserisce in alto a destra una barra monospace con:
  - Pallino di stato colorato (`●`)
  - Tag del Capitolo (`CH.01 // ENV_ART`, `CH.02 // CHAR_PIPELINE`, ecc.)
  - Specifiche tecniche (`GAEA 2.0 / PCG MEGAPLANTS`, `GPU PARTICLES / HLSL`, ecc.)
  - Contatore frame: `FRAME [07/65]`
* **Technical Hairline Divider:** Linea sottile 1px stile CAD sotto il titolo della slide con tacchetta d'accento colorata in base al capitolo.
* **Card Corner Crosshairs (+):** Mirini a croce CAD (`+`) agli angoli delle card.
* **Dark Glass Card Finish:** Vetro scuro traslucido (`#16161A`, 88% opacità) con bordo fine ardesia.
* **One-Click Revert:** Pulsante rosso **"🧹 Clean / Remove Tech Decor"** per eliminare o rigenerare gli elementi decorativi in qualsiasi momento senza intaccare i tuoi contenuti originali.

---

## 🎨 Palette dei 5 Capitoli
1. **Assignment 01 (Slides 01-13):** Ciano Elettrico `#00E5FF` (Environment Art, Gaea, PCG, Megaplants)
2. **Assignment 02 (Slides 14-26):** Viola Neon `#A855F7` (MetaHumans, RealityScan, Hair Grooming)
3. **Assignment 03 (Slides 27-39):** Ambra / Oro `#F59E0B` (Cinematics, Sequencer, Live Link Mocap)
4. **Assignment 04 (Slides 40-52):** Cremisi / Rosso Cyber `#EF4444` (Reality Capture, COLMAP, Gaussian Splatting)
5. **Assignment 05 (Slides 53-65):** Verde Smeraldo `#10B981` (Niagara VFX, Magic Comet, GPU Particles)
