// Interactive Slide Deck Viewer Logic for Figma exported slides

export const slideCaptions: Record<number, string> = {
	1: 'Environment Art & World Building (Cover)',
	2: 'Overview & Artistic Direction',
	3: 'Tool Breakdown (Heightmaps, Auto-Material, PCG)',
	4: 'Ecosistema Procedurale: Slope & Altitude Auto-Materials',
	5: 'Confronto Grayboxing vs Risultato Finale',
	6: 'Topografia Realistica: Flusso Heightmap (Gaea to Landscape)',
	7: 'Sistema dei Fiori Procedurale & Modular Kit Esterno',
	8: 'House Decals, Roof Materials & Texturing',
	9: 'Decisioni Tecniche: Workflow Spline 100% Procedurale',
	10: 'PCG & Spline: Path Generation, Grass Volume & Megaplants',
	11: 'La Sfida Principale: Bilanciamento Fantasy & Ghibli',
	12: 'Ciclo Giorno/Notte: Sistema Celestial & Switching Lights',
	13: 'Problemi Risolti: Nanite Landscape & Mie Scattering',
	14: 'MetaHumans & AI Cinematics (Cover)',
	15: 'Premesse Narrative: Expedition 33 Homage',
	16: 'Primo Tentativo: FaceBuilder in Blender & Bottlenecks',
	17: 'Limiti di Adattamento dello Skeleton MetaHuman Identity',
	18: 'Turning Point: RealityScan dei Nostri Volti',
	19: 'Layout di Produzione & Pipeline End-to-End',
	20: 'Confronto A/B dei Due MetaHumans',
	21: 'Hair Sculpting: Divario tra Scalp e Trasformazioni',
	22: 'Preparazione dello Scalp in Blender',
	23: 'Hair Sculpting con Modifiers & Strand Steps',
	24: 'Pipeline Completa Hair Grooming: Blender to UE5',
	25: 'Risoluzione Groom Binding & Strand Size Tuning',
	26: 'Integrazione Shading e Dinamiche Fisiche Capelli',
	27: 'Cinematics & Sequencer Setup (Cover)',
	28: 'Establishing Shot: Framing Esterno 200mm',
	29: 'Shot 2: Moving In & Atmosphere Interna',
	30: 'Shot 3: Dettaglio del MetaHuman nel Laboratorio',
	31: 'Struttura Master Sequencer & Subsequences Modulari',
	32: 'Shot 4: Campo/Controcampo Dialogo',
	33: 'Face MoCap in Tempo Reale via Live Link Face (iPhone)',
	34: 'Shot Breakdown: Le 7 Inquadrature Registiche',
	35: 'Cartwheel AI Mocap Corporeo & Correzione Root Motion',
	36: 'Shot 6 & 7: Confronto Finale e Composite',
	37: 'Reality Capture & 3D Gaussian Splatting (Cover)',
	38: 'Regole di Acquisizione Fotografica: Golden Rules',
	39: 'Dettagli di Ripresa (Chest Height, Crab Walk, No Stabilization)',
	40: 'Pipeline Completa Fotogrammetria - RealityCapture',
	41: "Cos'è COLMAP: Structure from Motion",
	42: 'Parametri e Matching Geometrico in COLMAP',
	43: 'Benchmark Tempi COLMAP: Algoritmo Non Convergente',
	44: 'Frame Sampling con FFmpeg (1 frame ogni 7)',
	45: 'Risoluzione Density Cloud e Nuvola Sparsa',
	46: 'Inferno delle DLL: Risoluzione Dipendenze Windows/Linux',
	47: 'COLMAP & Nerfstudio: Limiti dei Floaters',
	48: 'Post-Mortem NeRF: Artefatti "Melted Wax"',
	49: 'Introduzione al 3D Gaussian Splatting',
	50: 'Densificazione e Pruning dei Gaussiani',
	51: 'Pipeline di Training 3D Gaussian Splatting',
	52: 'Sperimentazione in Locale con XScene (Plugin UE5)',
	53: 'Configurazione XVaDTools e Runtime Locale',
	54: 'Benchmark XScene: Limiti della Mesh su RTX 4070',
	55: 'Cloud AI Tools (Luma, Vid2Scene) Post-Mortem & PLY',
	56: 'Dataset Finale e Integrazione NanoGS in UE5',
	57: 'Niagara VFX: The Magic Comet (Cover)',
	58: 'Visione Artistica: Trasformare l\'Ambiente in Fiaba',
	59: 'Setup dell\'Ambiente e Illuminazione della Scena',
	60: 'I 3 Sistemi Particellari Realizzati',
	61: 'Integrazione Fairy Field e Petali al Vento',
	62: 'Anatomia Niagara: Campo di Forze e Curl Noise',
	63: 'Anatomia Meteor System: I 4 Emitter Combinati',
	64: 'Homing Meteor Logic: Point Attraction Force & Blueprint Target Vector',
	65: 'References, Tutorial e Crediti',
};

export function changeSlide(container: HTMLElement, direction: number) {
	const start = parseInt(container.getAttribute('data-start') || '1', 10);
	const end = parseInt(container.getAttribute('data-end') || '13', 10);
	const total = end - start + 1;
	let current = parseInt(container.getAttribute('data-current') || '1', 10);

	if (direction > 0) {
		current = current >= total ? 1 : current + 1;
	} else {
		current = current <= 1 ? total : current - 1;
	}

	container.setAttribute('data-current', String(current));
	const globalSlideNum = start + current - 1;
	const padded = String(globalSlideNum).padStart(2, '0');

	const imgEl = container.querySelector('.deck-slide-img') as HTMLImageElement | null;
	const counterEl = container.querySelector('.deck-counter-current') as HTMLElement | null;
	const captionEl = container.querySelector('.deck-caption') as HTMLElement | null;

	if (imgEl) {
		const currentSrc = imgEl.src || imgEl.getAttribute('src') || '';
		if (currentSrc.includes('/figma-slides/')) {
			imgEl.src = currentSrc.replace(/slide_\d+\.webp.*$/, `slide_${padded}.webp`);
		} else {
			const baseUrl = (import.meta.env.BASE_URL || '').replace(/\/$/, '');
			imgEl.src = `${baseUrl}/figma-slides/slide_${padded}.webp`;
		}
		imgEl.alt = `Slide ${globalSlideNum}`;
	}

	if (counterEl) {
		counterEl.textContent = String(current);
	}

	if (captionEl) {
		const text = slideCaptions[globalSlideNum] || `Slide ${globalSlideNum}`;
		captionEl.textContent = `Slide ${current}: ${text}`;
	}

	// Preload adjacent slides for instant response
	const nextIdx = current >= total ? 1 : current + 1;
	const prevIdx = current <= 1 ? total : current - 1;
	[nextIdx, prevIdx].forEach((idx) => {
		const gNum = start + idx - 1;
		const pPad = String(gNum).padStart(2, '0');
		if (imgEl && imgEl.src) {
			const preloader = new Image();
			preloader.src = imgEl.src.replace(/slide_\d+\.webp.*$/, `slide_${pPad}.webp`);
		}
	});
}

let isInitialized = false;

export function initDeckViewer() {
	if (typeof window === 'undefined') return;
	if (isInitialized) return;
	isInitialized = true;

	// Delegated click handler on document
	document.addEventListener('click', (e) => {
		const target = e.target as HTMLElement | null;
		if (!target) return;

		const btn = target.closest('.deck-nav-btn');
		if (!btn) return;

		e.preventDefault();
		e.stopPropagation();

		const container = btn.closest('.deck-viewer-container') as HTMLElement | null;
		if (!container) return;

		const isNext = btn.classList.contains('deck-next');
		changeSlide(container, isNext ? 1 : -1);
	});

	// Touch swipe support on main frame
	let touchStartX = 0;
	let touchStartY = 0;

	document.addEventListener(
		'touchstart',
		(e: any) => {
			const frame = e.target?.closest?.('.deck-main-frame');
			if (frame && e.touches && e.touches.length === 1) {
				touchStartX = e.touches[0].clientX;
				touchStartY = e.touches[0].clientY;
			}
		},
		{ passive: true }
	);

	document.addEventListener(
		'touchend',
		(e: any) => {
			const frame = e.target?.closest?.('.deck-main-frame');
			if (frame && e.changedTouches && e.changedTouches.length === 1) {
				const deltaX = e.changedTouches[0].clientX - touchStartX;
				const deltaY = e.changedTouches[0].clientY - touchStartY;
				if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
					const container = frame.closest('.deck-viewer-container') as HTMLElement | null;
					if (container) {
						changeSlide(container, deltaX < 0 ? 1 : -1);
					}
				}
			}
		},
		{ passive: true }
	);

	// Keyboard arrow navigation when hovering or focusing a deck
	document.addEventListener('keydown', (e) => {
		const activeTag = document.activeElement?.tagName || '';
		if (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag)) return;

		const hoveredContainer =
			(document.querySelector('#projectModal.open .deck-viewer-container') as HTMLElement | null) ||
			(document.querySelector('.deck-viewer-container:hover') as HTMLElement | null) ||
			(document.querySelector('.deck-viewer-container') as HTMLElement | null);

		if (!hoveredContainer) return;

		if (e.key === 'ArrowRight') {
			changeSlide(hoveredContainer, 1);
		} else if (e.key === 'ArrowLeft') {
			changeSlide(hoveredContainer, -1);
		}
	});
}
