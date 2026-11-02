// Tech Art Slides Studio - Figma Plugin Backend
// Features: Multi-Slide Translation (IT->EN), Design System Harmonizer, Layout Auto-Align, and Tech Art HUD Decorator

figma.showUI(__html__, { width: 540, height: 720, themeColors: true });

function getAllSlides() {
  const slides = [];
  const slideGrid = figma.currentPage.children.find(n => n.type === 'SLIDE_GRID');
  if (slideGrid) {
    for (const row of slideGrid.children) {
      if (row.type === 'SLIDE_ROW') {
        for (const s of row.children) {
          if (s.type === 'SLIDE') slides.push(s);
        }
      }
    }
  } else {
    for (const c of figma.currentPage.children) {
      if (c.type === 'SLIDE' || c.type === 'FRAME' || c.type === 'SECTION') {
        slides.push(c);
      }
    }
  }
  return slides;
}

function findSlideForNode(node, slides) {
  let curr = node;
  while (curr && curr.parent) {
    if (curr.type === 'SLIDE' || curr.type === 'FRAME') {
      const idx = slides.findIndex(s => s.id === curr.id);
      if (idx !== -1) return { index: idx + 1, name: curr.name, id: curr.id };
    }
    curr = curr.parent;
  }
  return { index: '?', name: 'Slide' };
}

async function safeLoadFont(fontName) {
  try {
    await figma.loadFontAsync(fontName);
    return true;
  } catch (e) {
    try {
      await figma.loadFontAsync({ family: fontName.family, style: 'Regular' });
      return true;
    } catch (e2) {
      try {
        await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
        return true;
      } catch (e3) {
        return false;
      }
    }
  }
}

async function loadFontForNode(node) {
  try {
    if (node.fontName !== figma.mixed) {
      return await safeLoadFont(node.fontName);
    } else {
      const segments = node.getStyledTextSegments(['fontName']);
      for (const seg of segments) {
        if (seg.fontName) {
          await safeLoadFont(seg.fontName);
        }
      }
      return true;
    }
  } catch (err) {
    return false;
  }
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  return { r, g, b };
}

function isSaturatedAccent(rgb) {
  const max = Math.max(rgb.r, rgb.g, rgb.b);
  const min = Math.min(rgb.r, rgb.g, rgb.b);
  return (max - min) > 0.25;
}

function getChapterInfo(slideIndex, slideNode) {
  let text = '';
  try {
    if (slideNode && 'findAllWithCriteria' in slideNode) {
      const texts = slideNode.findAllWithCriteria({ types: ['TEXT'] });
      text = texts.map(t => t.characters).join(' ').toLowerCase();
    }
  } catch(e) {}

  // 1-13: A1 (Env Art, Cyan)
  // 14-26: A2 (MetaHumans, Purple)
  // 27-39: A3 (Cinematics, Amber)
  // 40-52: A4 (Reality Capture, Red)
  // 53-65: A5 (Niagara, Emerald)
  if (text.includes('niagara') || text.includes('magic comet') || text.includes('vfx') || slideIndex >= 53) {
    return {
      num: '05',
      chapter: 'CH.05 // NIAGARA_VFX',
      pipeline: 'GPU PARTICLES / HLSL',
      colorHex: '#10B981',
      rgb: hexToRgb('#10B981')
    };
  } else if (text.includes('reality capture') || text.includes('gaussian') || text.includes('colmap') || text.includes('nerf') || slideIndex >= 40) {
    return {
      num: '04',
      chapter: 'CH.04 // REALITY_CAP',
      pipeline: '3D GAUSSIAN SPLATS / COLMAP',
      colorHex: '#EF4444',
      rgb: hexToRgb('#EF4444')
    };
  } else if (text.includes('cinematic') || text.includes('sequencer') || text.includes('mocap') || text.includes('live link') || slideIndex >= 27) {
    return {
      num: '03',
      chapter: 'CH.03 // CINEMATICS',
      pipeline: 'SEQUENCER / LIVE LINK MOCAP',
      colorHex: '#F59E0B',
      rgb: hexToRgb('#F59E0B')
    };
  } else if (text.includes('metahuman') || text.includes('hair') || text.includes('groom') || text.includes('scalp') || slideIndex >= 14) {
    return {
      num: '02',
      chapter: 'CH.02 // CHAR_PIPELINE',
      pipeline: 'METAHUMANS / HAIR GROOMING',
      colorHex: '#A855F7',
      rgb: hexToRgb('#A855F7')
    };
  } else {
    return {
      num: '01',
      chapter: 'CH.01 // ENV_ART',
      pipeline: 'GAEA 2.0 / PCG MEGAPLANTS',
      colorHex: '#00E5FF',
      rgb: hexToRgb('#00E5FF')
    };
  }
}

figma.ui.onmessage = async (msg) => {
  // ==========================================
  // 1. SCAN DECK
  // ==========================================
  if (msg.type === 'scan') {
    const slides = getAllSlides();
    const selection = figma.currentPage.selection;
    let targetNodes = [];
    const isSelectionMode = msg.scope === 'selection' && selection.length > 0;

    if (isSelectionMode) {
      for (const sel of selection) {
        if (sel.type === 'TEXT') {
          targetNodes.push(sel);
        } else if ('findAllWithCriteria' in sel) {
          const sub = sel.findAllWithCriteria({ types: ['TEXT'] });
          targetNodes.push(...sub);
        }
      }
    } else {
      targetNodes = figma.currentPage.findAllWithCriteria({ types: ['TEXT'] });
    }

    const uniqueMap = new Map();
    const fontSet = new Set();
    const sizeSet = new Set();

    for (const n of targetNodes) {
      if (n.name && n.name.startsWith('[TECH_')) continue;
      if (!uniqueMap.has(n.id) && n.characters.trim().length > 0) {
        const slideInfo = findSlideForNode(n, slides);
        if (n.fontName !== figma.mixed) {
          fontSet.add(`${n.fontName.family} (${n.fontName.style})`);
        }
        if (n.fontSize !== figma.mixed) {
          sizeSet.add(Math.round(n.fontSize));
        }

        uniqueMap.set(n.id, {
          id: n.id,
          text: n.characters,
          fontSize: n.fontSize !== figma.mixed ? n.fontSize : 14,
          fontFamily: n.fontName !== figma.mixed ? n.fontName.family : 'Mixed',
          slideIndex: slideInfo.index,
          slideName: slideInfo.name
        });
      }
    }

    const items = Array.from(uniqueMap.values());
    figma.ui.postMessage({
      type: 'scan-result',
      totalSlides: slides.length,
      totalTexts: items.length,
      detectedFonts: Array.from(fontSet),
      detectedSizes: Array.from(sizeSet).sort((a, b) => a - b),
      scope: isSelectionMode ? 'selection' : 'all',
      items: items
    });
  }

  // ==========================================
  // 2. APPLY TRANSLATION
  // ==========================================
  else if (msg.type === 'apply-translation') {
    const { id, newText } = msg;
    const node = figma.getNodeById(id);
    if (!node || node.type !== 'TEXT') {
      figma.ui.postMessage({ type: 'item-done', id, success: false, error: 'Node not found or not text' });
      return;
    }

    const fontLoaded = await loadFontForNode(node);
    if (!fontLoaded) {
      figma.ui.postMessage({ type: 'item-done', id, success: false, error: 'Font could not be loaded' });
      return;
    }

    try {
      node.characters = newText;
      figma.ui.postMessage({ type: 'item-done', id, success: true, newText });
    } catch (err) {
      figma.ui.postMessage({ type: 'item-done', id, success: false, error: String(err) });
    }
  }

  // ==========================================
  // 3. UNIFY DESIGN SYSTEM & TYPOGRAPHY
  // ==========================================
  else if (msg.type === 'unify-styles') {
    const {
      headlineFamily = 'Chakra Petch',
      bodyFamily = 'Inter',
      snapSizes = true,
      boostContrast = true,
      roundCards = true,
      scope = 'all'
    } = msg;

    const targetStyles = [
      { family: headlineFamily, style: 'Bold' },
      { family: headlineFamily, style: 'SemiBold' },
      { family: headlineFamily, style: 'Medium' },
      { family: bodyFamily, style: 'Regular' },
      { family: bodyFamily, style: 'Medium' },
      { family: bodyFamily, style: 'SemiBold' },
      { family: bodyFamily, style: 'Bold' },
      { family: 'Inter', style: 'Regular' },
      { family: 'Inter', style: 'Bold' }
    ];

    for (const f of targetStyles) {
      await safeLoadFont(f);
    }

    let textNodes = [];
    let frameNodes = [];
    const selection = figma.currentPage.selection;
    const isSelectionMode = scope === 'selection' && selection.length > 0;

    if (isSelectionMode) {
      for (const sel of selection) {
        if (sel.type === 'TEXT') textNodes.push(sel);
        else if ('findAllWithCriteria' in sel) {
          textNodes.push(...sel.findAllWithCriteria({ types: ['TEXT'] }));
          frameNodes.push(...sel.findAllWithCriteria({ types: ['FRAME', 'RECTANGLE'] }));
        }
      }
    } else {
      textNodes = figma.currentPage.findAllWithCriteria({ types: ['TEXT'] });
      frameNodes = figma.currentPage.findAllWithCriteria({ types: ['FRAME', 'RECTANGLE'] });
    }

    let modifiedTexts = 0;
    let modifiedCards = 0;

    for (const node of textNodes) {
      if (node.name && node.name.startsWith('[TECH_')) continue;
      try {
        await loadFontForNode(node);
        const currentSize = node.fontSize !== figma.mixed ? node.fontSize : 14;

        if (currentSize >= 28) {
          try {
            node.fontName = { family: headlineFamily, style: 'Bold' };
          } catch(e) {
            node.fontName = { family: 'Inter', style: 'Bold' };
          }
          if (snapSizes) {
            node.fontSize = currentSize >= 44 ? 48 : 36;
            node.lineHeight = { value: 115, unit: 'PERCENT' };
          }
          if (boostContrast && node.fills && Array.isArray(node.fills)) {
            const firstFill = node.fills[0];
            if (firstFill && firstFill.type === 'SOLID' && !isSaturatedAccent(firstFill.color)) {
              node.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
            }
          }
        } else if (currentSize >= 18 && currentSize < 28) {
          try {
            node.fontName = { family: headlineFamily, style: 'SemiBold' };
          } catch(e) {
            node.fontName = { family: bodyFamily, style: 'SemiBold' };
          }
          if (snapSizes) {
            node.fontSize = 20;
            node.lineHeight = { value: 125, unit: 'PERCENT' };
          }
          if (boostContrast && node.fills && Array.isArray(node.fills)) {
            const firstFill = node.fills[0];
            if (firstFill && firstFill.type === 'SOLID' && !isSaturatedAccent(firstFill.color)) {
              node.fills = [{ type: 'SOLID', color: hexToRgb('#F8FAFC') }];
            }
          }
        } else if (currentSize >= 12 && currentSize < 18) {
          try {
            node.fontName = { family: bodyFamily, style: 'Regular' };
          } catch(e) {
            node.fontName = { family: 'Inter', style: 'Regular' };
          }
          if (snapSizes) {
            node.fontSize = 14;
            node.lineHeight = { value: 145, unit: 'PERCENT' };
          }
          if (boostContrast && node.fills && Array.isArray(node.fills)) {
            const firstFill = node.fills[0];
            if (firstFill && firstFill.type === 'SOLID' && !isSaturatedAccent(firstFill.color)) {
              node.fills = [{ type: 'SOLID', color: hexToRgb('#CBD5E1') }];
            }
          }
        } else {
          try {
            node.fontName = { family: bodyFamily, style: 'SemiBold' };
          } catch(e) {
            node.fontName = { family: 'Inter', style: 'SemiBold' };
          }
          if (snapSizes) {
            node.fontSize = 11;
            node.letterSpacing = { value: 12, unit: 'PERCENT' };
          }
        }

        modifiedTexts++;
      } catch(err) {
        console.warn('Error unifying node:', err);
      }
    }

    if (roundCards) {
      for (const frame of frameNodes) {
        if (frame.name && frame.name.startsWith('[TECH_')) continue;
        if (frame.width < 1850 && frame.height < 1000 && frame.width > 80 && frame.height > 40) {
          try {
            if ('cornerRadius' in frame && frame.cornerRadius !== figma.mixed) {
              frame.cornerRadius = 8;
            }
            if ('strokes' in frame && frame.strokes && frame.strokes.length > 0) {
              frame.strokeWeight = 1;
            }
            modifiedCards++;
          } catch(e) {}
        }
      }
    }

    figma.ui.postMessage({
      type: 'unify-done',
      modifiedTexts,
      modifiedCards
    });

    figma.notify(`✨ Typography unified: ${modifiedTexts} texts & ${modifiedCards} cards harmonized.`);
  }

  // ==========================================
  // 4. AUTO-ALIGN & GRID SNAP
  // ==========================================
  else if (msg.type === 'align-layout') {
    const {
      standardLeftMargin = 120,
      alignHeaders = true,
      normalizeHeaderGap = true,
      alignRowTops = true,
      alignColumns = true,
      fixAutoResize = true,
      scope = 'all'
    } = msg;

    const allSlides = getAllSlides();
    const selection = figma.currentPage.selection;
    let targetSlides = [];

    if (scope === 'selection' && selection.length > 0) {
      for (const sel of selection) {
        if (sel.type === 'SLIDE' || sel.type === 'FRAME') {
          targetSlides.push(sel);
        } else {
          let curr = sel.parent;
          while (curr) {
            if (curr.type === 'SLIDE' || curr.type === 'FRAME') {
              if (!targetSlides.includes(curr)) targetSlides.push(curr);
              break;
            }
            curr = curr.parent;
          }
        }
      }
    } else {
      targetSlides = allSlides;
    }

    let alignedHeadersCount = 0;
    let alignedRowsCount = 0;
    let alignedColsCount = 0;

    for (const slide of targetSlides) {
      if (!('children' in slide)) continue;
      const children = Array.from(slide.children).filter(n => !n.name || !n.name.startsWith('[TECH_'));

      // 1. Separate Header text elements vs Content blocks
      const headerTexts = [];
      const contentElements = [];

      for (const node of children) {
        if (node.type === 'TEXT' && node.y < 320) {
          headerTexts.push(node);
        } else {
          contentElements.push(node);
        }
      }

      // --- Align Slide Headers ---
      if (alignHeaders && headerTexts.length > 0) {
        // Sort vertically: kicker -> title -> subtitle
        headerTexts.sort((a, b) => a.y - b.y);

        for (const h of headerTexts) {
          // If node's parent is auto-layout, modifying x/y directly isn't supported
          if (!h.parent || h.parent.layoutMode === 'NONE' || !h.parent.layoutMode) {
            h.x = standardLeftMargin;
          }
          if (fixAutoResize && h.type === 'TEXT') {
            try {
              if (h.height < 60 && h.characters.length < 60) {
                h.textAutoResize = 'WIDTH_AND_HEIGHT';
              } else {
                h.textAutoResize = 'HEIGHT';
              }
            } catch(e) {}
          }
          alignedHeadersCount++;
        }

        // Harmonize header vertical rhythm
        if (normalizeHeaderGap && headerTexts.length >= 2) {
          // Snap the first header to top baseline
          let currentY = headerTexts[0].y;
          if (currentY < 40 || currentY > 140) {
            currentY = 70;
            if (!headerTexts[0].parent || headerTexts[0].parent.layoutMode === 'NONE') {
              headerTexts[0].y = currentY;
            }
          }
          for (let i = 1; i < headerTexts.length; i++) {
            const prev = headerTexts[i - 1];
            const node = headerTexts[i];
            if (!node.parent || node.parent.layoutMode === 'NONE') {
              node.y = prev.y + prev.height + 10;
            }
          }
        }
      }

      // --- Align Row Tops (Cards and Images side-by-side) ---
      if (alignRowTops && contentElements.length >= 2) {
        const sortedY = [...contentElements].sort((a, b) => a.y - b.y);
        const rows = [];
        let currentRow = [];

        for (const node of sortedY) {
          if (currentRow.length === 0) {
            currentRow.push(node);
          } else {
            const avgY = currentRow.reduce((sum, n) => sum + n.y, 0) / currentRow.length;
            // Tolerance threshold for elements in the same horizontal row: 28px
            if (Math.abs(node.y - avgY) <= 28) {
              currentRow.push(node);
            } else {
              rows.push(currentRow);
              currentRow = [node];
            }
          }
        }
        if (currentRow.length > 0) rows.push(currentRow);

        for (const row of rows) {
          if (row.length >= 2) {
            // Find baseline Y (leftmost or minimum)
            const targetY = Math.round(row[0].y);
            for (const node of row) {
              if (!node.parent || node.parent.layoutMode === 'NONE') {
                node.y = targetY;
                alignedRowsCount++;
              }
            }
          }
        }
      }

      // --- Align Stacked Columns (e.g. caption or sub-card under image) ---
      if (alignColumns && contentElements.length >= 2) {
        for (let i = 0; i < contentElements.length; i++) {
          for (let j = 0; j < contentElements.length; j++) {
            if (i === j) continue;
            const topNode = contentElements[i];
            const bottomNode = contentElements[j];
            if (
              bottomNode.y > topNode.y &&
              Math.abs(bottomNode.x - topNode.x) <= 22 &&
              (!bottomNode.parent || bottomNode.parent.layoutMode === 'NONE')
            ) {
              bottomNode.x = topNode.x;
              alignedColsCount++;
            }
          }
        }
      }
    }

    figma.ui.postMessage({
      type: 'align-done',
      alignedHeadersCount,
      alignedRowsCount,
      alignedColsCount,
      totalSlides: targetSlides.length
    });

    figma.notify(`📐 Alignment complete! ${alignedHeadersCount} headers & ${alignedRowsCount} row elements aligned.`);
  }

  // ==========================================
  // 5. INJECT TECH ART HUD & DECOR
  // ==========================================
  else if (msg.type === 'inject-tech-decor') {
    const {
      addTopHud = true,
      addDivider = true,
      addCorners = true,
      polishCards = true,
      scope = 'all'
    } = msg;

    const allSlides = getAllSlides();
    const selection = figma.currentPage.selection;
    let targetSlides = [];

    if (scope === 'selection' && selection.length > 0) {
      for (const sel of selection) {
        if (sel.type === 'SLIDE' || sel.type === 'FRAME') {
          targetSlides.push(sel);
        } else {
          let curr = sel.parent;
          while (curr) {
            if (curr.type === 'SLIDE' || curr.type === 'FRAME') {
              if (!targetSlides.includes(curr)) targetSlides.push(curr);
              break;
            }
            curr = curr.parent;
          }
        }
      }
    } else {
      targetSlides = allSlides;
    }

    // Preload tech fonts
    await safeLoadFont({ family: 'Space Grotesk', style: 'Bold' });
    await safeLoadFont({ family: 'Space Grotesk', style: 'Medium' });
    await safeLoadFont({ family: 'Inter', style: 'Regular' });
    await safeLoadFont({ family: 'Inter', style: 'Medium' });
    await safeLoadFont({ family: 'Inter', style: 'Bold' });

    let injectedHudCount = 0;
    let injectedDividerCount = 0;
    let injectedCornerCount = 0;
    let polishedCardCount = 0;

    for (let i = 0; i < targetSlides.length; i++) {
      const slide = targetSlides[i];
      if (!('children' in slide)) continue;

      const slideIndex = allSlides.findIndex(s => s.id === slide.id) + 1 || (i + 1);
      const info = getChapterInfo(slideIndex, slide);

      // Clean existing tech decor on this slide first to avoid duplicates
      const existingDecor = Array.from(slide.children).filter(
        n => (n.getPluginData && n.getPluginData('techDecor')) || (n.name && n.name.startsWith('[TECH_'))
      );
      for (const d of existingDecor) {
        try { d.remove(); } catch(e) {}
      }

      // Snapshot of existing content children
      const existingChildren = Array.from(slide.children);

      // Find slide title node
      let titleNode = null;
      for (const child of existingChildren) {
        if (child.type === 'TEXT' && child.y < 280) {
          if (!titleNode || child.y < titleNode.y) {
            titleNode = child;
          }
        }
      }

      // --- 1. Top HUD Bar ---
      if (addTopHud) {
        try {
          const hud = figma.createFrame();
          hud.name = '[TECH_HUD] Status Bar';
          hud.setPluginData('techDecor', 'hud');
          hud.layoutMode = 'HORIZONTAL';
          hud.layoutSizingHorizontal = 'HUG';
          hud.layoutSizingVertical = 'HUG';
          hud.itemSpacing = 8;
          hud.paddingLeft = 10;
          hud.paddingRight = 10;
          hud.paddingTop = 5;
          hud.paddingBottom = 5;
          hud.cornerRadius = 4;
          hud.fills = [{ type: 'SOLID', color: hexToRgb('#121216'), opacity: 0.9 }];
          hud.strokes = [{ type: 'SOLID', color: info.rgb, opacity: 0.35 }];
          hud.strokeWeight = 1;

          // Status Dot + Chapter Tag
          const tagText = figma.createText();
          tagText.fontName = { family: 'Space Grotesk', style: 'Bold' };
          tagText.fontSize = 10;
          tagText.characters = `● ${info.chapter}`;
          tagText.fills = [{ type: 'SOLID', color: info.rgb }];
          hud.appendChild(tagText);

          // Pipe separator
          const pipe1 = figma.createText();
          pipe1.fontName = { family: 'Inter', style: 'Regular' };
          pipe1.fontSize = 10;
          pipe1.characters = '|';
          pipe1.fills = [{ type: 'SOLID', color: hexToRgb('#475569') }];
          hud.appendChild(pipe1);

          // Pipeline tech specs
          const pipeText = figma.createText();
          pipeText.fontName = { family: 'Inter', style: 'Medium' };
          pipeText.fontSize = 10;
          pipeText.characters = info.pipeline;
          pipeText.fills = [{ type: 'SOLID', color: hexToRgb('#94A3B8') }];
          hud.appendChild(pipeText);

          // Pipe separator
          const pipe2 = figma.createText();
          pipe2.fontName = { family: 'Inter', style: 'Regular' };
          pipe2.fontSize = 10;
          pipe2.characters = '|';
          pipe2.fills = [{ type: 'SOLID', color: hexToRgb('#475569') }];
          hud.appendChild(pipe2);

          // Slide frame counter
          const frameText = figma.createText();
          frameText.fontName = { family: 'Space Grotesk', style: 'Medium' };
          frameText.fontSize = 10;
          const padIdx = slideIndex < 10 ? `0${slideIndex}` : `${slideIndex}`;
          frameText.characters = `FRAME [${padIdx}/${allSlides.length}]`;
          frameText.fills = [{ type: 'SOLID', color: hexToRgb('#F1F5F9') }];
          hud.appendChild(frameText);

          slide.appendChild(hud);
          hud.x = 1920 - 120 - hud.width;
          hud.y = 65;
          injectedHudCount++;
        } catch(err) {
          console.warn('HUD creation error:', err);
        }
      }

      // --- 2. Technical Hairline Divider below Slide Title ---
      if (addDivider) {
        try {
          const divY = titleNode ? Math.min(titleNode.y + titleNode.height + 14, 250) : 190;
          const divGroup = figma.createFrame();
          divGroup.name = '[TECH_DIVIDER] Line';
          divGroup.setPluginData('techDecor', 'divider');
          divGroup.fills = [];
          divGroup.resize(1680, 4);
          divGroup.x = 120;
          divGroup.y = divY;

          // Colored accent tab
          const notch = figma.createRectangle();
          notch.resize(48, 2);
          notch.y = 1;
          notch.fills = [{ type: 'SOLID', color: info.rgb }];
          divGroup.appendChild(notch);

          // Thin background line
          const hair = figma.createRectangle();
          hair.x = 48;
          hair.y = 1.5;
          hair.resize(1680 - 48, 1);
          hair.fills = [{ type: 'SOLID', color: hexToRgb('#27272A') }];
          divGroup.appendChild(hair);

          // Terminal tick
          const endTick = figma.createRectangle();
          endTick.x = 1680 - 4;
          endTick.y = 0;
          endTick.resize(4, 4);
          endTick.fills = [{ type: 'SOLID', color: info.rgb, opacity: 0.7 }];
          divGroup.appendChild(endTick);

          slide.appendChild(divGroup);
          injectedDividerCount++;
        } catch(err) {
          console.warn('Divider creation error:', err);
        }
      }

      // --- 3. Corner Crosshairs & Card Polishing ---
      for (const child of existingChildren) {
        if (
          (child.type === 'FRAME' || child.type === 'RECTANGLE') &&
          child.width > 140 && child.width < 1800 &&
          child.height > 60 && child.height < 900
        ) {
          if (polishCards) {
            try {
              if (child.type === 'FRAME') {
                child.fills = [{ type: 'SOLID', color: hexToRgb('#16161A'), opacity: 0.88 }];
                child.strokes = [{ type: 'SOLID', color: hexToRgb('#2D2D36') }];
                child.strokeWeight = 1;
                child.cornerRadius = 8;
                polishedCardCount++;
              }
            } catch(e) {}
          }

          if (addCorners) {
            try {
              const tl = figma.createText();
              tl.name = '[TECH_CORNER] Crosshair TL';
              tl.setPluginData('techDecor', 'corner');
              tl.fontName = { family: 'Space Grotesk', style: 'Bold' };
              tl.fontSize = 11;
              tl.characters = '+';
              tl.fills = [{ type: 'SOLID', color: info.rgb, opacity: 0.6 }];
              slide.appendChild(tl);
              tl.x = child.x - 4;
              tl.y = child.y - 7;

              const br = figma.createText();
              br.name = '[TECH_CORNER] Crosshair BR';
              br.setPluginData('techDecor', 'corner');
              br.fontName = { family: 'Space Grotesk', style: 'Bold' };
              br.fontSize = 11;
              br.characters = '+';
              br.fills = [{ type: 'SOLID', color: info.rgb, opacity: 0.6 }];
              slide.appendChild(br);
              br.x = child.x + child.width - 6;
              br.y = child.y + child.height - 7;

              injectedCornerCount += 2;
            } catch(e) {}
          }
        }
      }
    }

    figma.ui.postMessage({
      type: 'tech-decor-done',
      injectedHudCount,
      injectedDividerCount,
      injectedCornerCount,
      polishedCardCount,
      totalSlides: targetSlides.length
    });

    figma.notify(`⚡ Tech Art FX injected! Added ${injectedHudCount} HUDs, ${injectedDividerCount} dividers, ${injectedCornerCount} crosshairs.`);
  }

  // ==========================================
  // 6. CLEAN TECH ART DECOR
  // ==========================================
  else if (msg.type === 'clean-tech-decor') {
    const { scope = 'all' } = msg;
    const allSlides = getAllSlides();
    const selection = figma.currentPage.selection;
    let targetSlides = scope === 'selection' && selection.length > 0 ? selection : allSlides;

    let removedCount = 0;
    for (const slide of targetSlides) {
      if (!('children' in slide)) continue;
      const decors = Array.from(slide.children).filter(
        n => (n.getPluginData && n.getPluginData('techDecor')) || (n.name && n.name.startsWith('[TECH_'))
      );
      for (const d of decors) {
        try {
          d.remove();
          removedCount++;
        } catch(e) {}
      }
    }

    figma.ui.postMessage({
      type: 'clean-done',
      removedCount
    });

    figma.notify(`🧹 Cleaned up ${removedCount} tech decor elements.`);
  }

  // ==========================================
  // 7. NOTIFY & CLOSE
  // ==========================================
  else if (msg.type === 'notify') {
    figma.notify(msg.message, { timeout: msg.timeout || 3000, error: msg.isError });
  } else if (msg.type === 'close') {
    figma.closePlugin();
  }
};
