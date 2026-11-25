(() => {
  'use strict';

  const root = document.documentElement;
  const content = document.getElementById('app-root');
  const header = document.getElementById('platform-header');
  const footer = document.querySelector('body > footer');
  const navShell = header.querySelector('.platform-nav-shell');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const forced = matchMedia('(forced-colors: active)');
  const surface = 'button, [role="button"], input, select, video, .motion-card, .rounded-2xl.border, .rounded-3xl.border, [data-layout-card], .study-report, .study-record, .practice-panel, .movie-card:not(.media-hub), .media-surface, .flip-face, .focus-timer, section.bg-slate-900, #progress-activity-chart';
  const landingSurface = surface + ', .rounded-lg, .rounded-xl, .rounded-2xl, .rounded-3xl, article, [data-card], .movie-emblem, .movie-study, .practice-sidebar';
  const tile = '.movie-emblem, :is(span,div):is(.rounded-lg,.rounded-xl,.rounded-2xl,.rounded-full):has(> svg[data-lucide]:only-child)';
  const iconCard = '.motion-card,.movie-card,.practice-panel,.practice-sidebar,.study-report,.rounded-2xl.border,.rounded-3xl.border,[data-layout-card]';
  const iconSelector = ':is(' + iconCard + ',' + tile + ') svg[data-lucide]:not(button *,a *,[role="button"] *)';
  const iconRuns = new WeakMap();
  const glyphMetrics = new Map();
  const letterMask = document.createElement('canvas').getContext('2d', {willReadFrequently:true});
  const letterCrests = new Map();
  const largeText = 'h1,h2,h3,h4,h5,h6,[role="heading"],.text-lg,.text-xl,.text-2xl,.text-3xl,.text-4xl,.text-5xl';
  const smallText = 'p,small,.text-xs,.text-sm';
  const canvas = document.createElement('canvas');
  canvas.id = 'tomato-liquid';
  canvas.setAttribute('aria-hidden', 'true');
  const ctx = canvas.getContext('2d');
  if (!ctx || !footer) return;

  let frame = 0, now = 0, nextDrop = 0, nextMeasure = 0;
  let width = 0, height = 0, seed = 0, sourceIndex = 0, nextFeatured = 0;
  let drops = [], pools = [], marks = [], impacts = [];
  const poolNodes = new WeakMap();
  const sources = new Map();
  const sourceTurns = new Map();
  // Coordinates of the attached tips within each SVG's viewBox (0–1).
  const lips = {
    crown:[[.24,.43],[.79,.36],[.53,.22]],
    classic:[[.352,.564],[.717,.546]], ribbon:[[.864,.340],[.602,.434],[.250,.449]],
    'long-drop':[[.637,.619]], double:[[.699,.559],[.466,.449]],
    pearl:[[.580,.784]], twin:[[.744,.611],[.364,.438]],
    short:[[.841,.534],[.528,.341],[.239,.495]], slant:[[.374,.668]]
  };
  let offscreenLedges = null;
  let session = false, paused = false, dripsEnabled = true, pauseAt = 0, skinTimeout = 0;
  let fadingMarks = [];
  const footerRunoffDuration = 10000;
  const dropRunoffDuration = 5000;

  const poolLayer = document.createElement('div');
  poolLayer.className = 'tomato-footer-pools';
  poolLayer.setAttribute('aria-hidden', 'true');
  footer.prepend(poolLayer);

  function spotNode(spot) {
    const node = document.createElement('b');
    node.style.left = 'calc(50% + ' + spot.offset + 'px)';
    node.style.width = spot.radius * 3 + 'px';
    node.style.height = spot.radius + 'px';
    return node;
  }

  function poolNode(pool) {
    const node = document.createElement('i');
    node.style.left = pool.fraction * 100 + '%';
    node.style.width = pool.width * 2 + 'px';
    node.style.height = pool.depth + 'px';
    node.append(...(pool.spots || []).map(spotNode));
    return node;
  }

  function renderPools() {
    for (const node of poolLayer.querySelectorAll('i:not([data-runoff])')) node.remove();
    for (const pool of pools) {
      const node = poolNode(pool);
      poolNodes.set(pool,node);
      poolLayer.append(node);
    }
  }

  function restorePools(value) {
    impacts = [];
    pools = Array.isArray(value) ? value.slice(0,24).filter(p =>
      p && Number.isFinite(p.fraction) && p.fraction >= 0 && p.fraction <= 1 &&
      Number.isFinite(p.width) && p.width > 0 && p.width <= 78 &&
      Number.isFinite(p.depth) && p.depth > 0 && p.depth <= 12
    ).map(p => ({...p, spots:Array.isArray(p.spots) ? p.spots.slice(-12).filter(spot =>
      spot && Number.isFinite(spot.offset) && Math.abs(spot.offset) <= 200 &&
      Number.isFinite(spot.radius) && spot.radius > 0 && spot.radius <= 4
    ) : []})) : [];
    renderPools();
  }

  function savePools() {
    workspace.tomatoPools = pools.map(p => ({...p}));
    writeWorkspace();
  }

  function drainPools() {
    if (!pools.length) return;
    const draining = pools;
    pools = [];
    savePools();
    renderPools();
    if (reduced.matches || forced.matches) return;
    // Split each puddle so both edges receive runoff, even for a single pool.
    for (const pool of draining) {
      for (const end of ['-90px', 'calc(100% + 90px)']) {
        const part = poolNode(pool);
        part.dataset.runoff = '';
        poolLayer.append(part);
        const flow = part.animate([
          {left:part.style.left, transform:'translateX(-50%) scale(1,1)'},
          {left:end, transform:'translateX(-50%) scale(1.8,.4)'}
        ], {duration:footerRunoffDuration, easing:'cubic-bezier(.4,0,.6,1)', fill:'forwards'});
        flow.onfinish = () => part.remove();
      }
    }
  }

  function reset() {
    impacts = [];
    drainPools();
    const start = performance.now();
    for (const drop of drops) {
      if (drop.runoff) continue;
      drop.runoff = {start, y:drop.y, velocity:drop.velocity};
      drop.origin = null;
      drop.contact = null;
    }
    if (!session || reduced.matches || forced.matches) return;
    // Keep only the paint selectors alive for the reverse entrance transition.
    fadingMarks = marks.slice();
    root.setAttribute('data-tomato-draining', '');
    clearTimeout(skinTimeout);
    skinTimeout = setTimeout(() => {
      root.removeAttribute('data-tomato-draining');
      fadingMarks = [];
      skinTimeout = 0;
    }, 450);
  }

  window.pomodoroLiquid = {restorePools, reset, shakeCard, onWetEdge};
  restorePools(workspace.tomatoPools);

  function resize() {
    const scale = Math.min(devicePixelRatio || 1, 1.5);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    nextMeasure = 0;
  }

  // Computed background sizes use px, %, or min(px, %). End offsets
  // serialize as calc(100% - Npx), relative to the remaining free space.
  function length(value, basis) {
    if (value.startsWith('min('))
      return Math.min(...value.slice(4,-1).split(',').map(part => length(part.trim(), basis)));
    if (value.startsWith('calc(')) {
      const parts = value.slice(5,-1).split(/\s+/);
      return length(parts[0], basis) + (parts[1] === '-' ? -1 : 1) * length(parts[2], basis);
    }
    return parseFloat(value) * (value.endsWith('%') ? basis / 100 : 1);
  }

  function register(pattern, element, x, y, size, overhang = false, tipIndex = 0) {
    if (!Number.isFinite(y) || !(x >= 0 && x < width)) return;
    if (session && (y < 0 || y >= height)) return;
    if (!sources.has(pattern)) sources.set(pattern, []);
    const mediaBounds = element.matches('.media-surface') ? element.getBoundingClientRect() : null;
    sources.get(pattern).push({element, x, y, size, overhang, tipIndex, mediaBounds});
  }

  const wetEdges = [];
  let spray = [], lastFeet, lastSplash = 0, lastSlip = 0, reaction;
  const sprite = document.getElementById('parkour-avatar');

  function splashAt(x,y,count,power,drift = 0) {
    for (let i=0; i<count; i++) {
      spray.push({x:x+scrollX,y:y+scrollY,vx:(i%2 ? 1 : -1)*power*(.25+Math.random())+drift,
        vy:-power*(.4+Math.random()),radius:1.3+Math.random()*2.4,age:0});
    }
    if (spray.length > 96) spray.splice(0,spray.length-96);
  }

  function stagger(direction,slide) {
    reaction?.cancel();
    const distance = slide ? 5 : 3;
    reaction = sprite.animate([
      {translate:'0px',rotate:'0deg'},
      {translate:(direction*distance)+'px '+(slide ? '0px' : '2px'),rotate:(direction*(slide ? 5 : 7))+'deg',offset:.45},
      {translate:'0px',rotate:'0deg'}
    ],{duration:slide ? 580 : 220,easing:'ease-in-out'});
  }

  function onWetEdge(point) {
    if (!session || paused || !dripsEnabled || !canvas.isConnected) return false;
    const edge = wetEdges.find(e => point.x >= e.left && point.x <= e.right &&
      point.y >= e.top-4 && point.y <= e.bottom+2);
    if (!edge || !edge.el.isConnected) return false;
    const y = Math.max(edge.top+1,point.y);
    return edge.el.contains(document.elementFromPoint(point.x,y)) ||
      (edge.el.matches('.media-surface') && document.elementsFromPoint(point.x,y).includes(edge.el));
  }

  function crossSauce(feet,time,footerBox) {
    const prev = lastFeet;
    lastFeet = feet && {...feet,sx:scrollX,sy:scrollY};
    if (!prev || !feet || !feet.moving || prev.sx!==scrollX || prev.sy!==scrollY) return;
    const dx=feet.x-prev.x, dy=feet.y-prev.y;
    if (Math.hypot(dx,dy)>75 || time-lastSplash<120) return;
    for (const pool of pools) {
      const center=footerBox.left+pool.fraction*footerBox.width;
      const u=(feet.x-center)/pool.width;
      if (Math.abs(u)>=1) continue;
      const top=footerBox.top-pool.depth*Math.sqrt(1-u*u);
      if (dy>0 && prev.y<=top && feet.y>=top) {
        splashAt(feet.x,top,24,Math.min(235,125+dy*6),dx*2);
        stagger(Math.sign(dx)||1,false); lastSplash=time; return;
      }
    }
    if (Math.abs(dx)<.15 && Math.abs(dy)<1) return;
    if (!onWetEdge(feet)) return;
    lastSplash=time;
    splashAt(feet.x,feet.y,6,62,-dx*4);
    if (Math.abs(dx)>.3 && time-lastSlip>1100) { stagger(Math.sign(dx),true); lastSlip=time; }
  }

  function gatherLayers(element, box, pseudo = null, collect = register) {
    const style = getComputedStyle(element, pseudo);
    if (!style.backgroundImage.includes('pomodoro-flow') || style.visibility !== 'visible' ||
        (pseudo && (style.content === 'none' || Number(style.opacity) === 0))) return;
    const sizes = style.backgroundSize.split(/,\s*(?![^()]*\))/);
    const posX = style.backgroundPositionX.split(',');
    const posY = style.backgroundPositionY.split(',');
    const left = box.left + element.clientLeft;
    const top = box.top + element.clientTop + (pseudo ? parseFloat(style.top) : 0);
    const w = pseudo ? parseFloat(style.width) : element.clientWidth;
    const h = pseudo ? parseFloat(style.height) : element.clientHeight;
    for (const [i, image] of style.backgroundImage.split(',').entries()) {
      const match = image.match(/pomodoro-flow(?:-([a-z-]+))?\.svg/);
      if (!match) continue;
      const pattern = match[1] || 'classic';
      const [sx, sy] = sizes[i].trim().match(/min\([^)]*\)|[^\s]+/g);
      const sw = length(sx, w), sh = length(sy, h);
      const x = left + length(posX[i].trim(), w - sw);
      const y = top + length(posY[i].trim(), h - sh);
      if (collect === register && content.contains(element) && sw>0 && sh>0)
        wetEdges.push({el:element,left:x,right:x+sw,top:y,bottom:y+sh});
      const buttonStream = style.getPropertyValue('--tomato-button-stream').trim();
      const featured = buttonStream === 'featured';
      let stream = featured ? 'featured-' + (element.id || element.dataset.action) : buttonStream ? buttonStream + '-button' : pattern;
      if (style.getPropertyValue('--tomato-emblem-rim').trim() === '1' && element.matches(tile)) stream = 'emblem-rim';
      if (element.matches('.brand-ink-letter')) stream = 'brand-letter';
      for (const [tipIndex, [u,v]] of lips[pattern].entries())
        collect(stream, element, x + u * sw, y + v * sh, featured ? 5.5 : buttonStream ? 4.4 : 3.75, pseudo === '::after' && !element.matches('.media-surface'), tipIndex);
    }
  }

  function gatherChartPoints(element, box) {
    const chart = window.Chart?.getChart?.(element);
    if (!chart?.chartArea || !chart.width || !chart.height) return;
    // Follow the plotted series in CSS pixels, including HiDPI displays.
    for (const meta of chart.getSortedVisibleDatasetMetas()) {
      const values = chart.data.datasets[meta.index].data;
      let index = -1;
      for (let i = 0; i < values.length; i++)
        if (values[i] > 0 && (index < 0 || values[i] >= values[index])) index = i;
      const point = meta.data[index];
      if (!point || point.skip) continue;
      const x = box.left + point.x * box.width / chart.width;
      const y = box.top + point.y * box.height / chart.height;
      if (y < 0 || y >= height || document.elementFromPoint(x,y) !== element) continue;
      marks.push({x, y:y + 2, size:2.2});
      register('chart', element, x, y + 2, 3.75);
    }
  }

  function letterInk(node, char, box) {
    const style = getComputedStyle(node.parentElement);
    const font = style.fontStyle + ' ' + style.fontWeight + ' ' + style.fontSize + ' ' + style.fontFamily;
    const key = font + '|' + char;
    let metric = glyphMetrics.get(key);
    if (!metric) {
      ctx.font = font;
      metric = ctx.measureText(char);
      if (glyphMetrics.size >= 512) glyphMetrics.clear();
      glyphMetrics.set(key, metric);
    }
    const ascent = metric.fontBoundingBoxAscent ?? box.height * .8;
    const descent = metric.fontBoundingBoxDescent ?? box.height * .2;
    return {
      font, key, metric,
      top:box.top + (box.height - ascent - descent) / 2 + ascent - metric.actualBoundingBoxAscent,
      left:box.left - metric.actualBoundingBoxLeft, right:box.left + metric.actualBoundingBoxRight
    };
  }

  // Locate a real upper stroke, including the dot on i and the apex on A.
  // Cache the result so scrolling only needs fresh DOM positions.
  function letterCrest(char, ink) {
    const cached = letterCrests.get(ink.key);
    if (cached) return cached;
    const w = Math.max(1, Math.ceil(ink.right - ink.left));
    const h = Math.max(1, Math.ceil(ink.metric.actualBoundingBoxAscent + ink.metric.actualBoundingBoxDescent));
    letterMask.canvas.width = w + 2;
    letterMask.canvas.height = h + 2;
    letterMask.font = ink.font;
    letterMask.fillText(char, 1 + ink.metric.actualBoundingBoxLeft, 1 + ink.metric.actualBoundingBoxAscent);
    const pixels = letterMask.getImageData(1,1,w,h).data;
    let best = Infinity, crest = {x:w/2, y:0};
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        if (pixels[(y*w+x)*4+3] < 96) continue;
        const score = y + Math.abs(x - w*.55)*.22;
        if (score < best) { best = score; crest = {x:x+.5, y:y+.5}; }
        break;
      }
    }
    if (letterCrests.size >= 512) letterCrests.clear();
    letterCrests.set(ink.key,crest);
    return crest;
  }

  function gatherHeading(element, range, used, barBottom) {
    const letters = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    for (let node; (node = walker.nextNode());) {
      if (used.has(node)) continue;
      used.add(node);
      for (const match of node.data.matchAll(/[\p{L}\p{N}]/gu))
        letters.push({node, offset:match.index, char:match[0]});
    }
    const count = Math.min(7, Math.ceil(letters.length / 5));
    for (let i = 0; i < count; i++) {
      const {node, offset, char} = letters[Math.floor((i + .33) * letters.length / count)];
      range.setStart(node, offset);
      range.setEnd(node, offset + char.length);
      const rect = range.getBoundingClientRect();
      if (!rect.width || rect.bottom <= barBottom || rect.top >= height) continue;
      const ink = letterInk(node, char, rect);
      if (ink.right <= ink.left) continue;
      const crest = letterCrest(char, ink);
      const w = Math.min(rect.width * 1.17, ink.right - ink.left + rect.height * .16);
      const h = Math.min(10.5, Math.max(4, rect.height * .25));
      const x = (ink.left + ink.right - w) / 2;
      const y = ink.top + crest.y - h * .36;
      const tip = Math.max(.14, Math.min(.86, (ink.left + crest.x - x) / w));
      if (!element.contains(document.elementFromPoint(x + w * tip, ink.top + crest.y))) continue;
      marks.push({x, y, w, h, tip});
      register('heading-letter', element, x + w * tip, y + h, Math.min(5.15, h));
    }
  }

  // Find a short upper stroke of the actual drawing. Keep it in SVG units
  // so Lucide icons can be resized without moving the sauce off the outline.
  function iconRun(svg) {
    if (iconRuns.has(svg)) return iconRuns.get(svg);
    let best = null, bestScore = -Infinity;
    for (const shape of svg.querySelectorAll('path,line,polyline,polygon,circle,ellipse,rect')) {
      const length = shape.getTotalLength();
      if (length < 3) continue;
      const span = Math.min(length, 10);
      for (let start = 0; start <= length - span; start += 2) {
        const points = Array.from({length:6}, (_,i) => shape.getPointAtLength(start + span*i/5));
        const ys = points.map(p => p.y);
        const score = Math.abs(points[0].x - points[5].x) - Math.max(...ys) * .8;
        if (score > bestScore) { bestScore = score; best = {shape, points}; }
      }
    }
    iconRuns.set(svg,best);
    return best;
  }

  function gatherIcon(svg) {
    const run = iconRun(svg);
    const matrix = run?.shape.getScreenCTM();
    if (!matrix) return;
    const stroke = run.points.map(p => p.matrixTransform(matrix));
    const lip = stroke.reduce((lower,p) => p.y > lower.y ? p : lower);
    const owner = svg.parentElement;
    if (!owner.contains(document.elementFromPoint(lip.x,lip.y))) return;
    const size = Math.max(2,Math.min(3.6,svg.getBoundingClientRect().width * .15));
    const y = lip.y + size * .8;
    marks.push({stroke, x:lip.x, y, size});
    register('icon-stroke', owner, lip.x, y, size);
  }

  function railTip(element, box) {
    let offset = box.width, y = box.bottom;
    if (element.type === 'range') {
      const min = Number(element.min), max = Number(element.max);
      const fraction = (element.valueAsNumber - min) / (max - min);
      offset = 7 + Math.max(0, box.width - 14) * fraction;
      y = box.top + box.height / 2 + 6;
    } else if (element instanceof HTMLProgressElement) {
      offset = box.width * element.position;
    }
    return {x:box.left + offset, y};
  }

  function gather() {
    offscreenLedges = null;
    wetEdges.length = 0;
    sources.clear();
    marks = [];
    const movieScreen = document.querySelector('#movie-screen:is(:fullscreen,.movie-expanded), .tv-console:fullscreen');
    const host = movieScreen || document.body;
    if (canvas.parentNode !== host) { host.append(canvas); resize(); }
    const bar = header.getBoundingClientRect();
    if (session && !movieScreen) gatherLayers(header, bar, '::after');
    const candidates = session ? [
      navShell, ...header.querySelectorAll('button, [role="button"], #brand-home-btn > div, .brand-ink-letter, input[type=range]'),
      ...content.querySelectorAll([surface, '.focus-droplet', tile, iconSelector, '.tv-console .movie-stage, .movie-study,.practice-sidebar, progress:not([data-focus-progress]), [data-study-fill]'].join(','))
    ] : document.querySelectorAll('.focus-timer[data-tomato-timer] :is(.focus-primary,.focus-droplet), .focus-timer[data-tomato-timer]');
    for (const element of candidates) {
      if (movieScreen && !movieScreen.contains(element)) continue;
      const box = element.getBoundingClientRect();
      if (!box.width || !box.height || box.right <= 0 || box.left >= width) continue;
      if (session && (box.bottom <= 0 || box.top >= height)) continue;
      if (session && element.matches('input[type=range],progress:not([data-focus-progress]),[data-study-fill]')) {
        if (element instanceof HTMLProgressElement && element.position <= 0) continue;
        const tip = railTip(element, box);
        register('tomato-rail', element, tip.x, tip.y - 1, 3.6);
        continue;
      }
      if (element instanceof SVGSVGElement) {
        gatherIcon(element);
        continue;
      }
      if (element.matches('.media-surface') && !element.getAnimations().length)
        gatherLayers(element, box, '::after');
      if (session) gatherLayers(element, box);
      if (element.matches('.brand-ink-letter')) gatherLayers(element, box, '::before');
      if (element === navShell || element.matches('.tv-console .movie-stage')) gatherLayers(element, box, '::after');
      if (element.id === 'progress-activity-chart') gatherChartPoints(element, box);
      if (element.matches('.focus-timer:not(.focus-dock), .focus-timer:not(.focus-dock) .focus-primary'))
        gatherLayers(element, box, '::before');
      if (element.matches('.focus-droplet'))
        register('progress', element, box.left + box.width / 2, box.bottom, 3.75);
    }

    // Visit each painted layer before returning to another tip on the same layer.
    for (const group of sources.values()) group.sort((a,b) => a.tipIndex - b.tipIndex);
    if (!session) return;
    const range = document.createRange();
    const used = new Set();
    const headingArea = movieScreen || document;
    const headingsFirst = new Set([...headingArea.querySelectorAll(largeText), ...(movieScreen || content).querySelectorAll(smallText)]);
    const topLimit = movieScreen ? 0 : bar.bottom;
    for (const element of headingsFirst) {
      const box = element.getBoundingClientRect();
      if (!box.width || !box.height || box.bottom < topLimit || box.top > height) continue;
      if (element.matches(largeText)) {
        gatherHeading(element, range, used, topLimit);
        continue;
      }
      const value = element.textContent.trim();
      if (value.length < 4) continue;
      let hash = seed;
      for (const character of value.slice(0, 96)) hash = (Math.imul(hash, 31) + character.charCodeAt(0)) >>> 0;
      if (hash % 5 !== 0) continue;

      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      let limit = 1;
      for (let text; limit && (text = walker.nextNode());) {
        if (used.has(text)) continue;
        const gaps = [...text.data.matchAll(/\S( )(?=\S)/g)];
        if (!gaps.length) continue;
        const positions = [gaps[hash % gaps.length].index + 1];
        for (const index of positions) {
          range.setStart(text, index);
          range.setEnd(text, Math.min(index + 1, text.length));
          const rect = range.getBoundingClientRect();
          if ((!rect.width && index < text.length) || rect.bottom <= topLimit || rect.top >= height) continue;
          const x = rect.left + (rect.width ? rect.width / 2 : 3);
          const y = rect.bottom - rect.height * .25;
          marks.push({x, y, size:.85});
          register('letter', element, x, y, 2.7);
          used.add(text);
          limit--;
        }
      }
      if (marks.length >= 65) break;
    }
  }

  function emitDrop(time) {
    if (!sources.size || drops.length >= 48) return;
    const featured = [...sources.keys()].filter(key => key.startsWith('featured-'));
    const patterns = [...sources.keys()].filter(key => !key.startsWith('featured-'));
    if (patterns.length >= 4 && sources.has('amber-button')) {
      const opposite = (patterns.indexOf('amber-button') + Math.ceil(patterns.length / 2)) % patterns.length;
      patterns.splice(opposite, 0, 'amber-button');
    }
    const featuredDue = featured.length && time >= nextFeatured;
    const featuredTurn = sourceTurns.get('featured') || 0;
    for (let n = featuredDue ? -featured.length : 0; n < patterns.length; n++) {
      const pattern = n < 0 ? featured[(featuredTurn + n + featured.length) % featured.length] : patterns[sourceIndex++ % patterns.length];
      const group = sources.get(pattern);
      let turn = sourceTurns.get(pattern) || 0;
      for (let i = 0; i < group.length; i++) {
        const source = group[turn++ % group.length];
        if (!source.element.isConnected) continue;
        if (pattern === 'tomato-rail') {
          const box = source.element.getBoundingClientRect();
          if (!box.width || !box.height) continue;
          const tip = railTip(source.element, box);
          source.x = Math.min(box.right - .5, tip.x);
          source.y = tip.y - 1;
        }
        const outsidePreview = !session && (source.y < 0 || source.y >= height);
        const hit = outsidePreview ? source.element : document.elementFromPoint(source.x, source.y);
        const mediaLip = source.mediaBounds;
        if (mediaLip) {
          const box = source.element.getBoundingClientRect();
          if (source.element.getAnimations().length || box.x !== mediaLip.x || box.y !== mediaLip.y ||
              box.width !== mediaLip.width || box.height !== mediaLip.height) continue;
        }
        if (!hit || !(source.element.contains(hit) ||
            (mediaLip && hit.closest('.media-hub') && document.elementsFromPoint(source.x,source.y).includes(source.element)) ||
            (source.overhang && (header.contains(hit) || content.contains(hit) || hit === document.body)) ||
            (pattern === 'progress' && source.element.parentElement.contains(hit)))) continue;
        if (n < 0) {
          nextFeatured = time + 1450 + Math.random() * 350;
          sourceTurns.set('featured', (featured.indexOf(pattern) + 1) % featured.length);
        }
        sourceTurns.set(pattern, turn % group.length);
        addDrop(source);
        return;
      }
    }
  }

  function shakeCard(card) {
    if (!session || paused || !dripsEnabled || !canvas.isConnected || document.hidden || !card.isConnected) return 0;
    const tips = [];
    gatherLayers(card,card.getBoundingClientRect(),null,(_pattern,element,x,y,size) => {
      if (Number.isFinite(x) && Number.isFinite(y) && card.contains(document.elementFromPoint(x,y)))
        tips.push({element,x,y,size});
    });
    const count = Math.min(4,tips.length,Math.max(0,48-drops.length));
    for (let i=0; i<count; i++) {
      const index = Math.floor(Math.random()*tips.length);
      addDrop(tips.splice(index,1)[0],true);
    }
    return count;
  }

  function addDrop(source, shaken = false) {
    const box = source.element.getBoundingClientRect();
    const size = source.size + Math.random() * .6;
    drops.push({
      x:source.x + scrollX, y:source.y + scrollY, size, velocity:shaken ? 55 + Math.random()*45 : 0, stretch:.6, spread:.65,
      seen:new Set([source.element]), lastGlyph:null,
      origin:shaken ? null : {element:source.element, x:source.x-box.left, y:source.y-box.top,
        age:0, duration:.65 + Math.random() * .55},
      contact:null
    });
  }

  // The caret locates the nearest character. Its measured ink, rather than
  // the whole line box, determines whether the bead actually touches it.
  function glyphAt(hit, x, y, before, after, lastGlyph) {
    let node, offset;
    if (document.caretPositionFromPoint) {
      const caret = document.caretPositionFromPoint(x, y);
      node = caret?.offsetNode;
      offset = caret?.offset;
    } else {
      const caret = document.caretRangeFromPoint?.(x, y);
      node = caret?.startContainer;
      offset = caret?.startOffset;
    }
    if (node?.nodeType !== Node.TEXT_NODE || !hit.contains(node)) return null;
    const range = document.createRange();
    for (const index of [offset, offset - 1]) {
      const char = node.data[index];
      if (!char || !/[\p{L}\p{N}]/u.test(char) ||
          (lastGlyph?.node === node && lastGlyph.index === index)) continue;
      range.setStart(node, index);
      range.setEnd(node, index + 1);
      const box = range.getBoundingClientRect();
      if (x < box.left || x > box.right || box.top > after || box.bottom < before) continue;
      const ink = letterInk(node, char, box);
      const inset = ink.top - box.top;
      if (x < ink.left || x > ink.right || ink.top < before - .6 || ink.top > after) continue;
      return {anchor:range, box, inset, glyph:{node, index, char}};
    }
    return null;
  }

  // Outside the viewport there is no browser hit test. Cache document-space
  // card edges until the next layout measurement and check the swept segment.
  function offscreenLanding(drop, before, after) {
    if (!offscreenLedges) {
      offscreenLedges = [];
      for (const anchor of content.querySelectorAll(landingSurface)) {
        const box = anchor.getBoundingClientRect();
        if (box.height < 8 || !box.width || (box.top >= 0 && box.top < height)) continue;
        offscreenLedges.push({anchor, top:box.top + scrollY, left:box.left + scrollX,
          right:box.right + scrollX});
      }
      offscreenLedges.sort((a,b) => a.top - b.top);
    }
    let lo = 0, hi = offscreenLedges.length;
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (offscreenLedges[mid].top < before - .6) lo = mid + 1;
      else hi = mid;
    }
    for (let i = lo; i < offscreenLedges.length; i++) {
      const edge = offscreenLedges[i];
      if (edge.top > after) break;
      if (drop.x < edge.left || drop.x > edge.right ||
          drop.seen.has(edge.anchor) || !edge.anchor.isConnected) continue;
      return {anchor:edge.anchor, box:edge.anchor.getBoundingClientRect(), inset:0};
    }
    return null;
  }

  function findLanding(drop, before, after) {
    if (after < before) return null;
    if (before < scrollY) {
      const target = offscreenLanding(drop, before, Math.min(after, scrollY));
      if (target || after < scrollY) return target;
    }
    if (before >= scrollY + height) return offscreenLanding(drop, before, after);
    const belowView = after > scrollY + height;
    const end = after;
    before = Math.max(0, before - scrollY);
    after = Math.min(height - .01, after - scrollY);
    const x = drop.x - scrollX;
    const steps = Math.max(1, Math.ceil((after - before) / 5));
    for (let i = 1; i <= steps; i++) {
      const y = before + (after - before) * i / steps;
      const hit = document.elementFromPoint(x, y);
      if (!hit || !(content.contains(hit) || header.contains(hit))) continue;
      const element = hit.closest(landingSurface);
      let ledge = null;
      if (element && !drop.seen.has(element)) {
        const box = element.getBoundingClientRect();
        if (box.height >= 8 && box.top >= before - .6 && box.top <= y)
          ledge = {anchor:element, box, inset:0};
      }
      const letter = glyphAt(hit, x, y, before, y, drop.lastGlyph);
      if (ledge && (!letter || ledge.box.top <= letter.box.top + letter.inset)) return ledge;
      if (letter) return letter;
    }
    return belowView ? offscreenLanding(drop, scrollY + height, end) : null;
  }

  function land(drop, target) {
    const {box, glyph} = target;
    const localX = drop.x - (box.left + scrollX);
    const direction = localX < box.width / 2 ? -1 : 1;
    const distance = direction < 0 ? localX : box.width - localX;
    // Thick sauce creeps a short distance before running down the face.
    const travel = direction * Math.min(distance, glyph ? drop.size : 5 + Math.random() * 11);
    drop.contact = {...target, localX, travel, age:0,
      duration:(glyph ? .48 : .68) + Math.random() * .48};
    if (glyph) drop.lastGlyph = glyph;
    else drop.seen.add(target.anchor);
    drop.velocity = 0;
    drop.y = scrollY + box.top + target.inset - drop.size * .65;
    drop.stretch = .65;
    drop.spread = 1.22;
  }

  function fall(drop, dt, footerBox) {
    if (drop.origin) {
      const origin = drop.origin;
      if (!origin.element.isConnected || (origin.element.matches('.media-surface') && origin.element.getAnimations().length)) return false;
      const box = origin.element.getBoundingClientRect();
      if (!box.width || !box.height) return false;
      if (origin.element.matches('input[type=range],progress,[data-study-fill]')) {
        const tip = railTip(origin.element, box);
        origin.x = tip.x - box.left;
        origin.y = tip.y - 1 - box.top;
      }
      origin.age += dt;
      const t = Math.min(1, origin.age / origin.duration);
      drop.spread = .5 + .5 * t;
      drop.stretch = .55 + .83 * t;
      drop.x = scrollX + box.left + origin.x;
      origin.lip = scrollY + box.top + origin.y;
      drop.y = origin.lip + drop.size * (.4 + 2 * t * t);
      if (t < 1) return true;
      drop.origin = null;
    }
    if (drop.contact) {
      const c = drop.contact;
      if (c.glyph ? !c.glyph.node.isConnected || c.glyph.node.data[c.glyph.index] !== c.glyph.char :
          !c.anchor.isConnected) return false;
      const box = c.anchor.getBoundingClientRect();
      if (!box.width || !box.height) return false;
      c.age += dt;
      const t = Math.min(1, c.age / c.duration);
      const creep = t * t * (3 - 2 * t);
      drop.x = scrollX + box.left + c.localX + c.travel * creep;
      drop.y = scrollY + box.top + c.inset + drop.size * (-.65 + 1.95 * t * t);
      drop.spread = 1.22 - .31 * creep;
      drop.stretch = .65 + .57 * creep;
      if (t < 1) return true;
      drop.contact = null;
    }

    const before = drop.y + drop.size * drop.stretch;
    drop.velocity = Math.min(320, drop.velocity + dt * 420);
    drop.y += drop.velocity * dt;
    drop.stretch += (1 + drop.velocity / 1050 - drop.stretch) * Math.min(1, 12 * dt);
    drop.spread = 1 / Math.sqrt(drop.stretch);
    const after = drop.y + drop.size * drop.stretch;
    const bottom = footerBox.top + scrollY;
    const target = findLanding(drop, before, Math.min(after, bottom));
    if (target) {
      land(drop, target);
      return true;
    }
    if (after < bottom - 12) return true;
    const fraction = Math.max(0, Math.min(1, (drop.x - scrollX - footerBox.left) / footerBox.width));
    // Use the highest curved surface directly below the drop, even when
    // neighboring pools overlap. An empty patch between pools stays dry.
    let pool = null, surfaceHeight = 0;
    for (const candidate of pools) {
      const dx = (candidate.fraction - fraction) * footerBox.width / candidate.width;
      if (Math.abs(dx) >= 1) continue;
      const depth = candidate.depth * Math.sqrt(1 - dx * dx);
      if (depth > surfaceHeight) { surfaceHeight = depth; pool = candidate; }
    }
    if (after < bottom - surfaceHeight) return true;
    const wet = !!pool;
    if (!pool && pools.length >= 24)
      pool = pools.reduce((a,b) => Math.abs(a.fraction - fraction) < Math.abs(b.fraction - fraction) ? a : b);
    const changed = !pool || pool.width < 78 || pool.depth < 12;
    if (pool) {
      pool.width = Math.min(78, pool.width + drop.size * 1.7);
      pool.depth = Math.min(12, pool.depth + .65);
    } else {
      pool = {fraction, width:9, depth:2.2};
      pools.push(pool);
    }
    const node = poolNode(pool);
    node.dataset.impact = wet ? 'wet' : 'dry';
    const kick = .5 + Math.min(drop.velocity / 320,1) * .5;
    if (wet) {
      const offset = (fraction - pool.fraction) * footerBox.width / pool.width;
      const direction = Math.abs(offset) > .05 ? Math.sign(offset) : Math.random() < .5 ? -1 : 1;
      node.style.setProperty('--impact-shift', direction * kick * 2.4 + 'px');
    }
    const previous = poolNodes.get(pool);
    if (previous) previous.replaceWith(node);
    else poolLayer.append(node);
    poolNodes.set(pool,node);
    if (changed) savePools();

    const beads = Array.from({length:4}, (_,i) => {
      const side = i % 2 ? 1 : -1;
      const vy = (42 + Math.random()*52) * kick;
      const flight = (vy + Math.sqrt(vy*vy + 960*surfaceHeight)) / 480;
      const bead = {vx:side * (23 + Math.random()*37) * kick, vy,
        radius:drop.size*(.23 + Math.random()*.16), flight};
      if (wet && i < 2) {
        // Two outer beads clear the rim. The smaller beads fall back into the sauce.
        bead.offset = side * (pool.width + 3 + Math.random()*7);
        bead.vx = ((pool.fraction - fraction) * footerBox.width + bead.offset) / flight;
      }
      return bead;
    });
    impacts.push({fraction, pool, surfaceHeight, wet, beads, kick, age:0});
    return false;
  }

  function leaveSpot(pool, bead) {
    const spots = pool.spots ||= [];
    const node = poolNodes.get(pool);
    // Keep repeated splashes in the same place from adding overlapping DOM nodes.
    if (!node || spots.some(spot => Math.abs(spot.offset - bead.offset) < 2)) return false;
    if (spots.length === 12) { spots.shift(); node.firstElementChild?.remove(); }
    const spot = {offset:bead.offset, radius:bead.radius};
    spots.push(spot);
    node.append(spotNode(spot));
    return true;
  }

  function paintImpacts(dt, box) {
    let stained = false;
    impacts = impacts.filter(hit => {
      hit.age += dt;
      const t = hit.age, lifetime = hit.wet ? .6 : .48;
      for (const bead of hit.beads) {
        if (bead.offset !== undefined && t >= bead.flight && !bead.landed) {
          bead.landed = true;
          if (leaveSpot(hit.pool, bead)) stained = true;
        }
      }
      if (t >= lifetime) return false;
      if (box.top < 0 || box.top > height + 24) return true;
      const x = box.left + hit.fraction * box.width, y = box.top - hit.surfaceHeight;
      ctx.save();
      ctx.globalAlpha = 1 - (t / lifetime) ** 2;
      if (hit.wet) {
        ctx.save();
        // A shallow highlight spreads from the actual contact point.
        const center = box.left + hit.pool.fraction * box.width;
        ctx.beginPath();
        ctx.rect(center-hit.pool.width, box.top-hit.pool.depth-2, hit.pool.width*2, hit.pool.depth+2);
        ctx.clip();
        ctx.strokeStyle = '#fb9a6d';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(x,y+1,1+t*(15+12*hit.kick),.7+t*2.4,0,0,Math.PI*2);
        ctx.stroke();
        ctx.restore();
      }
      for (const bead of hit.beads) {
        if (t >= bead.flight) continue;
        const rise = bead.vy*t - 240*t*t;
        const bx = x + bead.vx*t;
        // Inner beads merge back through the curved surface on the way down.
        const dx = (bx - box.left - hit.pool.fraction*box.width) / hit.pool.width;
        if (hit.wet && bead.offset === undefined && 480*t > bead.vy && Math.abs(dx) < 1 &&
            rise + hit.surfaceHeight < hit.pool.depth * Math.sqrt(1 - dx*dx)) continue;
        paintDrop(bx,y-rise,bead.radius,1.1);
      }
      ctx.restore();
      return true;
    });
    if (stained) savePools();
  }

  function paintDrop(x, y, size, stretch = 1, spread = 1) {
    ctx.fillStyle = '#bd321a';
    ctx.beginPath();
    ctx.ellipse(x, y, size * .82 * spread, size * stretch, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff9573';
    ctx.beginPath();
    ctx.ellipse(x - size * .2, y - size * .3, size * .24, size * .32, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function paintMark(mark) {
    if (mark.stroke) {
      ctx.save();
      ctx.lineCap = ctx.lineJoin = 'round';
      ctx.lineWidth = mark.size * 1.35;
      ctx.strokeStyle = '#b93419';
      ctx.beginPath();
      for (const [i,p] of mark.stroke.entries()) {
        if (i === 0) ctx.moveTo(p.x,p.y);
        else ctx.lineTo(p.x,p.y);
      }
      ctx.stroke();
      ctx.lineWidth = mark.size * .32;
      ctx.strokeStyle = '#ffac7d';
      ctx.translate(0,-mark.size*.3);
      ctx.beginPath();
      const [,a,b,c] = mark.stroke;
      ctx.moveTo(a.x,a.y);
      ctx.quadraticCurveTo(b.x,b.y,c.x,c.y);
      ctx.stroke();
      ctx.restore();
      paintDrop(mark.x, mark.y - mark.size*.55, mark.size*.72);
      return;
    }
    if (!mark.w) return paintDrop(mark.x, mark.y, mark.size);
    // The hanging bead is centered on the measured stroke.
    const {x,y,w,h,tip} = mark;
    ctx.save();
    ctx.translate(x,y);
    ctx.scale(w,h);
    ctx.fillStyle = '#bb361d';
    ctx.beginPath();
    ctx.moveTo(0,.40);
    ctx.bezierCurveTo(.15,-.05,.82,-.04,1,.31);
    ctx.quadraticCurveTo(1,.55,tip+.12,.56);
    ctx.bezierCurveTo(tip+.08,.58,tip+.12,1,tip,1);
    ctx.bezierCurveTo(tip-.10,1,tip-.07,.56,tip-.15,.54);
    ctx.quadraticCurveTo(.06,.65,0,.40);
    ctx.fill();
    ctx.fillStyle = '#ffae83';
    ctx.beginPath();
    ctx.ellipse(.37,.23,.18,.07,0,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
  }

  function tick(time) {
    const dt = now ? Math.min(.032, (time - now) / 1000) : 0;
    now = time;
    if (time >= nextMeasure) {
      gather();
      nextMeasure = time + 450;
    }
    if (dripsEnabled && !paused && time >= nextDrop) {
      emitDrop(time);
      nextDrop = time + 620 + Math.random() * 420;
    }
    ctx.clearRect(0, 0, width, height);
    if (marks.length || fadingMarks.length) {
      ctx.globalAlpha = Number(getComputedStyle(root).getPropertyValue('--tomato-ink'));
      for (const mark of session ? marks : fadingMarks) paintMark(mark);
      ctx.globalAlpha = 1;
    }
    const footerBox = footer.getBoundingClientRect();
    const feet = session && dripsEnabled && !paused ? window.parkourFeet?.() : null;
    crossSauce(feet,time,footerBox);
    drops = drops.filter(drop => {
      if (!drop.runoff) {
        const before = drop.y-scrollY;
        const falling = !drop.origin && !drop.contact;
        const alive = paused || fall(drop,dt,footerBox);
        if (feet && falling && Math.abs(drop.x-scrollX-feet.x)<10*feet.size &&
            before<=feet.y && drop.y-scrollY>=feet.y-46*feet.size) {
          const y=Math.max(before,feet.y-46*feet.size);
          splashAt(drop.x-scrollX,y,5,50);
          stagger(drop.x-scrollX<feet.x ? 1 : -1,false);
          return false;
        }
        return alive;
      }
      const t = Math.max(0, Math.min(1, (time - drop.runoff.start) / dropRunoffDuration));
      const distance = Math.max(0, footerBox.top + scrollY - drop.runoff.y);
      // Match the release velocity and accelerate toward the current footer.
      const launch = Math.min(distance, drop.runoff.velocity * dropRunoffDuration / 1000);
      drop.y = drop.runoff.y + launch * t + (distance - launch) * t * t;
      drop.stretch = 1 + .3 * t;
      return t < 1;
    });
    paintImpacts(paused ? 0 : dt, footerBox);
    ctx.save();
    ctx.translate(-scrollX, -scrollY);
    for (const drop of drops) {
      if (drop.y + 16 < scrollY || drop.y - 16 > scrollY + height) continue;
      if (drop.origin) {
        const t = drop.origin.age / drop.origin.duration;
        const neck = drop.size * (1 - .85 * t);
        const lip = drop.origin.lip;
        ctx.fillStyle = '#bd321a';
        ctx.beginPath();
        ctx.moveTo(drop.x - neck, lip - 1);
        ctx.quadraticCurveTo(drop.x, lip + 1, drop.x - drop.size * .55, drop.y);
        ctx.lineTo(drop.x + drop.size * .55, drop.y);
        ctx.quadraticCurveTo(drop.x, lip + 1, drop.x + neck, lip - 1);
        ctx.fill();
      }
      paintDrop(drop.x, drop.y, drop.size, drop.stretch, drop.spread);
    }
    for (const bead of spray) {
      if (!paused) {
        bead.age+=dt; bead.vy+=560*dt; bead.x+=bead.vx*dt; bead.y+=bead.vy*dt;
      }
      ctx.globalAlpha=Math.max(0,1-bead.age/.85);
      paintDrop(bead.x,bead.y,bead.radius);
    }
    spray=spray.filter(bead=>bead.age<.85);
    ctx.restore();
    frame = (!dripsEnabled || paused) && !drops.some(drop => drop.runoff) ? 0 : requestAnimationFrame(tick);
  }

  function invalidate() {
    nextMeasure = 0;
    if (canvas.isConnected && !frame) frame = requestAnimationFrame(tick);
  }

  function sync() {
    const active = root.hasAttribute('data-tomato-session');
    const preview = root.hasAttribute('data-tomato-preview');
    const time = performance.now();
    if (active && !session) {
      clearTimeout(skinTimeout);
      skinTimeout = 0;
      fadingMarks = [];
      root.removeAttribute('data-tomato-draining');
      seed = Math.random() * 0xffffffff >>> 0;
      root.dataset.tomatoLayout = String(seed % 3);
      sourceIndex = 0;
      nextDrop = time + 750;
    }
    if (!active && !preview) {
      delete root.dataset.tomatoLayout;
      drops = [];
      impacts = [];
      sources.clear();
      sourceTurns.clear();
      offscreenLedges = null;
    }
    const allowDrips = !root.hasAttribute('data-tomato-drips-off');
    if (dripsEnabled !== allowDrips) {
      drops = [];
      impacts = [];
      nextDrop = (paused ? pauseAt : time) + 750;
      dripsEnabled = allowDrips;
    }
    if (!active || !allowDrips || reduced.matches || forced.matches) {
      spray=[]; lastFeet=null; reaction?.cancel();
    }
    session = active;
    const freeze = active && root.hasAttribute('data-tomato-paused');
    if (freeze && !paused) pauseAt = time;
    if (!freeze && paused && active) nextDrop += time - pauseAt;
    if (freeze !== paused) now = 0;
    paused = freeze;
    const enabled = (active || preview) && !reduced.matches && !forced.matches && !document.hidden;
    if (enabled) {
      if (!canvas.isConnected) {
        document.body.append(canvas);
        resize();
        now = 0;
      }
      invalidate();
    } else {
      cancelAnimationFrame(frame);
      frame = 0;
      canvas.remove();
    }
  }

  new MutationObserver(sync).observe(root, {attributes:true, attributeFilter:['data-tomato-session','data-tomato-paused','data-tomato-preview','data-tomato-drips-off']});
  new MutationObserver(() => { if (paused || !dripsEnabled) invalidate(); }).observe(content, {childList:true, subtree:true});
  addEventListener('resize', () => { if (canvas.isConnected) { resize(); invalidate(); } }, {passive:true});
  addEventListener('scroll', invalidate, {passive:true, capture:true});
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  forced.addEventListener('change', sync);
  sync();
})();
