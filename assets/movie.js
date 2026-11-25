const moviePlayer = (() => {
  const base = location.protocol === 'file:' ? 'http://127.0.0.1:8743' : location.origin;
  let dispose = () => {};
  const storageKey = 'deutsch-b1.movie.v1';
  const rates = [0.5,0.75,0.9,1,1.25,1.5,2];
  const bookmarks = new Map(), localSubs = new Map();
  const prefs = {};
  let lastFilm;
  let captureBookmark = () => {}, restoreMedia = '';
  function profileData() {
    return {...prefs,lastFilm,films:Object.fromEntries(bookmarks)};
  }
  function subtitleProfile() {
    return Object.fromEntries(localSubs);
  }
  function applySubtitles(saved) {
    localSubs.clear();
    for (const [id,file] of Object.entries(saved)) {
      if (typeof file?.name === 'string' && typeof file.text === 'string') localSubs.set(id,{name:file.name,text:file.text});
    }
  }
  function applyProfile(saved = {}) {
    bookmarks.clear();
    for (const [id,mark] of Object.entries(saved.films || {})) {
      if (mark && typeof mark === 'object') bookmarks.set(id,mark);
    }
    lastFilm = saved.lastFilm;
    prefs.tv = liveTV.settings(saved.tv);
    prefs.rate = rates.includes(saved.rate) ? saved.rate : 1;
    prefs.volume = Number.isFinite(saved.volume) ? Math.max(0,Math.min(1,saved.volume)) : 1;
    prefs.muted = saved.muted === true;
    prefs.size = ['small','normal','large'].includes(saved.size) ? saved.size : 'normal';
    cacheProgress();
  }
  function cacheProgress() {
    try { localStorage.setItem(storageKey,JSON.stringify(profileData())); } catch {}
  }
  function storeProgress() {
    cacheProgress();
    profileSync.update("movie",profileData());
  }
  let saved;
  try { saved = JSON.parse(localStorage.getItem(storageKey)); } catch {}
  if (saved) applyProfile(saved);
  else Object.assign(prefs,{rate:1,volume:1,muted:false,size:'normal'});
  const iconMarkup = new Map();
  function icon(name) {
    if (!iconMarkup.has(name)) {
      const key = name.split('-').map(part => part[0].toUpperCase() + part.slice(1)).join('');
      const shape = window.lucide?.icons[key];
      if (!shape) return '';
      const svg = lucide.createElement(shape);
      svg.setAttribute('aria-hidden','true');
      iconMarkup.set(name,svg.outerHTML);
    }
    return iconMarkup.get(name);
  }
  function clock(seconds) {
    const t = Math.max(0, Math.floor(seconds || 0));
    return [Math.floor(t / 3600), Math.floor(t / 60) % 60, t % 60]
      .slice(t < 3600 ? 1 : 0).map((n, i) => i ? String(n).padStart(2, '0') : n).join(':');
  }
  function readCues(text) {
    const timing = /^(?:(\d+):)?(\d{2}):(\d{2})[.,](\d{3})\s+-->\s+(?:(\d+):)?(\d{2}):(\d{2})[.,](\d{3})(?:\s|$)/m;
    const seconds = (h, m, s, ms) => Number(h || 0) * 3600 + Number(m) * 60 + Number(s) + Number(ms) / 1000;
    const cues = [];
    for (const block of text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').split(/\n[ \t]*\n/)) {
      const match = block.match(timing);
      if (!match) continue;
      const start = seconds(...match.slice(1, 5)), end = seconds(...match.slice(5, 9));
      const line = block.slice(match.index).split('\n').slice(1).join('\n').trim();
      if (line && end > start) {
        const plain = new VTTCue(start, end, line).getCueAsHTML().textContent;
        const segments = [];
        let at = start, pos = 0;
        for (const tag of line.matchAll(/<(?:(\d+):)?(\d{2}):(\d{2})\.(\d{3})>/g)) {
          const next = seconds(...tag.slice(1));
          if (next < at || next > end) continue;
          if (next > at && tag.index > pos) segments.push({start:at, end:next, text:new VTTCue(at,next,line.slice(pos,tag.index)).getCueAsHTML().textContent});
          pos = tag.index + tag[0].length; at = next;
        }
        if (pos && at < end) segments.push({start:at,end,text:new VTTCue(at,end,line.slice(pos)).getCueAsHTML().textContent});
        cues.push({start, end, text:plain, segments, preserveSpacing:true});
      }
    }
    return cues.sort((a,b) => a.start - b.start);
  }

  function mediaOutline(box, corner, notch, mirror, inset, sx = 1, sy = 1) {
    const w = box.width, h = box.height;
    const l = inset, r = w - inset, t = inset, b = h - inset;
    const radius = Math.max(0, Math.min(corner - inset, (r-l)/2, (b-t)/2));
    const cut = Math.min(notch, Math.max(0, r-l-2*radius), Math.max(0, b-t-2*radius));
    const x = r-cut, y = t+Math.max(radius, cut);
    const tip = Math.min(radius, cut*.4);
    const sweep = Math.min(corner+inset, cut*.45, (y-t-radius)*.7);
    const p = (x,y) => `${((mirror ? w-x : x)/sx).toFixed(2)} ${(y/sy).toFixed(2)}`;
    return `path("M ${p(l+radius,t)} L ${p(x-radius,t)} Q ${p(x,t)} ${p(x,t+radius)} L ${p(x,y-sweep)} Q ${p(x,y)} ${p(x+sweep,y)} L ${p(r-tip,y)} Q ${p(r,y)} ${p(r,y+tip)} L ${p(r,b-radius)} Q ${p(r,b)} ${p(r-radius,b)} L ${p(l+radius,b)} Q ${p(l,b)} ${p(l,b-radius)} L ${p(l,t+radius)} Q ${p(l,t)} ${p(l+radius,t)} Z")`;
  }

  let closeHub = () => {};
  function mount(root) {
    if (root.querySelector('#movie-view')) return;
    closeHub();
    root.innerHTML = `<section id="movie-view" class="movie-card media-hub" aria-label="Movie va TV">
      <div class="media-choices">${['movie','tv'].map(mode => {
        const name = mode === 'movie' ? 'Movie' : 'TV';
        return `<div class="media-tile" data-tile="${mode}">
          <span class="media-surface" aria-hidden="true"><span class="media-fill"></span></span>
          <button type="button" data-media="${mode}" aria-label="${name}" aria-pressed="false" aria-controls="media-content" title="${name}">
            <span class="movie-emblem">${icon(mode === 'movie' ? 'clapperboard' : 'tv')}</span><span class="media-name">${name}</span>
          </button></div>`;
      }).join('')}</div><div id="media-content" hidden></div></section>`;
    const hub = root.querySelector('#movie-view');
    const content = hub.querySelector('#media-content');
    const buttons = [...hub.querySelectorAll('[data-media]')];
    const moving = [...hub.querySelectorAll('.media-surface,.movie-emblem,.media-name')];
    const animations = new Map();
    const outlines = new Map();
    const surfaces = moving.filter(node => node.classList.contains('media-surface'));
    const mix = (from,to,progress) => from+(to-from)*progress;
    const silhouette = node => {
      const tile = node.parentElement;
      const compact = hub.dataset.mode && hub.dataset.mode !== tile.dataset.tile;
      const corner = parseFloat(getComputedStyle(tile).borderTopLeftRadius);
      const notch = hub.dataset.mode && !compact ? parseFloat(getComputedStyle(hub).paddingLeft) + buttons.find(b => b.dataset.media !== hub.dataset.mode).offsetWidth + 12 : 0;
      return {corner,notch};
    };
    function paintOutline(node, box, {corner,notch}) {
      if (!box.width || !box.height) return;
      const mirror = node.parentElement.dataset.tile === 'tv';
      node.style.clipPath = mediaOutline(box,corner,notch,mirror,0);
      node.firstElementChild.style.clipPath = mediaOutline(box,corner,notch,mirror,1);
    }
    const shapeObserver = new ResizeObserver(entries => {
      for (const {target} of entries) {
        if (animations.get(target)?.playState === 'running') continue;
        paintOutline(target,target.getBoundingClientRect(),silhouette(target));
      }
    });
    for (const node of surfaces) {
      paintOutline(node,node.getBoundingClientRect(),silhouette(node));
      shapeObserver.observe(node);
    }
    closeHub = () => {
      shapeObserver.disconnect();
      for (const animation of animations.values()) animation.cancel();
      animations.clear();
      closeHub = () => {};
    };
    let movieHeight, measuredWidth;
    for (const button of buttons) button.onclick = () => {
      const mode = button.dataset.media;
      const closing = hub.dataset.mode === mode;
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const outgoing = buttons.find(item => item.dataset.media === hub.dataset.mode);
      const outgoingSurface = outgoing?.parentElement.querySelector('.media-surface');
      const surface = button.closest('.media-tile').querySelector('.media-surface');
      const previous = moving.map(node => node.getBoundingClientRect());
      const previousOutlines = new Map(surfaces.map(node => {
        const shape = outlines.get(node);
        const progress = animations.get(node)?.effect.getComputedTiming().progress;
        return [node,shape && progress !== null && progress !== undefined ? {
          corner:mix(shape.from.corner,shape.to.corner,progress), notch:mix(shape.from.notch,shape.to.notch,progress)
        } : silhouette(node)];
      }));
      for (const animation of animations.values()) animation.cancel();
      animations.clear();
      outlines.clear();
      dispose();
      if (closing) delete hub.dataset.mode;
      else hub.dataset.mode = mode;
      document.dispatchEvent(new CustomEvent('media-hub-mode',{detail:hub.dataset.mode || null}));
      for (const item of buttons) item.setAttribute('aria-pressed',String(!closing && item === button));
      content.hidden = closing;
      content.classList.remove('media-sized');
      content.style.removeProperty('--movie-height');
      content.replaceChildren();
      if (mode === 'movie' && !closing && measuredWidth === content.clientWidth)
        content.style.setProperty('--movie-height',movieHeight + 'px');
      const timing = {duration:400,easing:'cubic-bezier(.42,0,.24,1)'};
      const opening = !closing && !reduced;
      content.style.visibility = opening ? 'hidden' : '';
      content.inert = opening;
      const loadContent = () => {
        if (mode === 'movie') {
          mountPlayer(content);
          const player = content.firstElementChild;
          const resize = () => {
            movieHeight = player.getBoundingClientRect().height;
            measuredWidth = content.clientWidth;
            content.style.setProperty('--movie-height',movieHeight + 'px');
          };
          content.classList.add('media-sized');
          const observer = new ResizeObserver(resize);
          observer.observe(player);
          const stopPlayer = dispose;
          dispose = () => { observer.disconnect(); stopPlayer(); };
        }
        else {
          const stopTV = liveTV.mount(content,liveTV.settings(prefs.tv),settings => {
            prefs.tv = settings;
            storeProgress();
          });
          dispose = () => { stopTV(); dispose = () => {}; };
        }
        window.lucide?.createIcons({root:content});
      };
      if (reduced) {
        for (const node of surfaces) paintOutline(node,node.getBoundingClientRect(),silhouette(node));
        if (!closing) loadContent();
        return;
      }
      const bounds = moving.map(node => node.getBoundingClientRect());
      moving.forEach((node,i) => {
        const from = previous[i], to = bounds[i];
        if (!to.width || !to.height) return;
        const first = {transform:`translate(${from.left-to.left}px,${from.top-to.top}px)`};
        const last = {transform:'none'};
        const frames = [first,last];
        if (previousOutlines.has(node)) {
          const sx = from.width / to.width, sy = from.height / to.height;
          first.transform += ` scale(${sx},${sy})`;
          const a = previousOutlines.get(node), b = silhouette(node);
          outlines.set(node,{from:a,to:b});
          paintOutline(node,to,b);
          const mirror = node.parentElement.dataset.tile === 'tv';
          const fillFrames = [];
          for (const offset of [0,.25,.5,.75,1]) {
            const box = {width:mix(from.width,to.width,offset), height:mix(from.height,to.height,offset)};
            const corner = mix(a.corner,b.corner,offset), notch = mix(a.notch,b.notch,offset);
            const scaleX = mix(sx,1,offset), scaleY = mix(sy,1,offset);
            const frame = offset === 0 ? first : offset === 1 ? last : {offset};
            frame.clipPath = mediaOutline(box,corner,notch,mirror,0,scaleX,scaleY);
            if (offset > 0 && offset < 1) frames.push(frame);
            fillFrames.push({offset,clipPath:mediaOutline(box,corner,notch,mirror,1,scaleX,scaleY)});
          }
          animations.set(node.firstElementChild,node.firstElementChild.animate(fillFrames,timing));
        }
        if (opening && node === surface) {
          first.filter = 'blur(3px)';
          first.opacity = .72;
          last.filter = 'blur(0px)';
          last.opacity = 1;
        }
        first.offset = 0; last.offset = 1;
        if (node === outgoingSurface) {
          first.filter = last.filter = 'blur(0px)';
          first.opacity = last.opacity = 1;
          frames.push({offset:.52,filter:'blur(2.5px)',opacity:.78});
        }
        const animation = node.animate(frames.sort((a,b) => a.offset-b.offset),timing);
        animations.set(node,animation);
        if (previousOutlines.has(node)) animation.addEventListener('finish',() => {
          if (animations.get(node) === animation) paintOutline(node,node.getBoundingClientRect(),silhouette(node));
        },{once:true});
      });
      if (opening) {
        const expansion = animations.get(surface);
        const reveal = () => {
          if (!hub.isConnected || hub.dataset.mode !== mode || animations.get(surface) !== expansion) return;
          loadContent();
          content.style.visibility = '';
          content.inert = false;
          animations.set(content,content.animate([{opacity:0},{opacity:1}],{duration:160,easing:'ease-out'}));
        };
        if (expansion) expansion.onfinish = reveal;
        else reveal();
      }
    };
    const restoredMode = restoreMedia;
    restoreMedia = '';
    if (restoredMode) buttons.find(button => button.dataset.media === restoredMode)?.click();
  }

  function mountPlayer(root) {
    root.innerHTML = `<section aria-label="Movie">
      <div class="movie-head">
        <label class="movie-pick">Film<select id="movie-list" disabled></select></label></div>
      <p class="movie-status" role="status"></p>
      <div id="movie-screen" hidden>
        <div class="movie-player">
          <div class="movie-stage" tabindex="0" aria-label="Film pleyeri" aria-describedby="movie-shortcuts">
            <video playsinline preload="metadata" crossorigin="anonymous"></video>
            <button type="button" id="movie-center" aria-label="Ijro etish">${icon('play')}</button>
            <span class="movie-loading" role="status" hidden>Yuklanmoqda…</span>
            <div class="movie-caption" hidden><span lang="de"></span><img alt="Film subtitri" hidden></div>
          </div>
          <div class="movie-desk">
            <div class="movie-time"><output id="movie-now">0:00</output><input id="movie-seek" type="range" min="0" max="1" step="0.1" value="0" aria-label="Film vaqti"><span id="movie-end">0:00</span></div>
            <div class="movie-transport">
              <button class="movie-primary" type="button" id="movie-play">${icon('play')}<span>Ijro etish</span></button>
              <button type="button" id="movie-back" aria-label="10 soniya orqaga" title="10 soniya orqaga · ←">${icon('rotate-ccw')}<span>10</span></button>
              <button type="button" id="movie-forward" aria-label="10 soniya oldinga" title="10 soniya oldinga · →">${icon('rotate-cw')}<span>10</span></button>
              <span class="movie-spacer"></span>
              <button type="button" id="movie-mute" aria-label="Ovozni o‘chirish" title="Ovozni o‘chirish · M">${icon('volume-2')}</button>
              <input id="movie-volume" type="range" min="0" max="1" step=".05" value="1" aria-label="Ovoz balandligi">
              <label class="movie-speed"><select id="movie-rate" aria-label="Ijro tezligi">${rates.map(n=>`<option value="${n}">${n}×</option>`).join('')}</select></label>
              <button type="button" id="movie-cc" aria-label="Subtitr" title="Subtitr · C" aria-pressed="true">${icon('captions')}</button>
              <button type="button" id="movie-tools-toggle" aria-label="Shadowing paneli" title="Shadowing paneli" aria-controls="movie-study" aria-expanded="false">${icon('panel-right')}</button>
              <button type="button" id="movie-full" aria-label="To‘liq ekran" aria-keyshortcuts="F" title="To‘liq ekran · F">${icon('maximize')}</button>
            </div>
          </div>
        </div>
        <aside class="movie-study" id="movie-study" aria-label="Shadowing">
          <div class="movie-study-head"><div><h2>${icon('headphones')} Shadowing</h2><p id="movie-sub-info"></p></div>
            <button type="button" id="movie-import" aria-label="SRT yoki VTT ochish" title="SRT yoki VTT ochish">${icon('file-plus-2')}</button>
            <input type="file" accept=".srt,.vtt" id="movie-file" hidden></div>
          <div class="movie-tools"><label class="movie-track">Subtitr treki<select id="movie-track"></select></label><label>Harf o‘lchami<select id="movie-caption-size"><option value="small">Kichik</option><option value="normal">O‘rta</option><option value="large">Katta</option></select></label></div>
          <label class="movie-caption-mode">Subtitr ko‘rinishi<select id="movie-caption-mode" aria-describedby="movie-mode-hint"><option value="flow">Ibora + urg‘u</option><option value="line">Faqat ibora</option><option value="word">Bitta so‘z</option></select></label>
          <p id="movie-mode-hint" class="movie-mode-hint" hidden>Bu trekda har bir so‘zning vaqti yo‘q. Urg‘u uchun vaqt belgilari bor trekni tanlang.</p>
          <div class="movie-tools movie-loop"><button type="button" id="movie-repeat" aria-pressed="false">${icon('repeat')} Jumlani takrorlash</button><button type="button" id="movie-ab" aria-pressed="false">A · Boshlanish</button></div>
          <div class="movie-transcript"><div class="movie-transcript-head"><h3>Dialoglar</h3><button type="button" id="movie-first" hidden></button><button type="button" id="movie-current" aria-label="Joriy jumlani topish" title="Joriy jumlani topish">${icon('locate-fixed')}</button></div>
            <p id="movie-dialogue-language" hidden></p>
            <div class="movie-search">${icon('search')}<input id="movie-search" type="search" aria-label="Dialoglarda qidirish" placeholder="Dialoglarda qidirish"></div>
            <ul class="movie-dialogues" aria-label="Subtitr satrlari"></ul>
            <p class="movie-empty" hidden></p>
          </div>
        </aside>
      </div>
      <p id="movie-shortcuts" hidden>Space: ijro yoki pauza. Chap va o‘ng: 10 soniya. F: to‘liq ekran. C: subtitr. M: ovoz.</p>
    </section>`;
    const el = root.firstElementChild, get = s => el.querySelector(s);
    const video = get('video'), list = get('#movie-list'), status = get('.movie-status'), screen = get('#movie-screen');
    const caption = get('.movie-caption'), words = caption.firstElementChild;
    const renderCaption = captionDisplay.renderer(words);
    const cc = get('#movie-cc'), repeat = get('#movie-repeat'), ab = get('#movie-ab'), slider = get('#movie-seek');
    const controller = new AbortController(), needsMP4 = new Set();
    let catalog = [], film, media = '', offset = 0, pendingSeek = null, cues = [], ends = [], active = -1;
    let subKey = '', subRequest, subInfo = '', ccOn = true, loop = null, pointA = null;
    let timer, frame, stopped = false, dragging = false, snapshot;
    const tracks = get('#movie-track'), picture = caption.querySelector('img');
    const wordParts = new Map();
    const stage = get('.movie-stage'), loadIndicator = get('.movie-loading'), desk = get('.movie-desk');
    const dialogue = get('.movie-dialogues'), search = get('#movie-search'), empty = get('.movie-empty');
    const rate = get('#movie-rate'), volume = get('#movie-volume'), size = get('#movie-caption-size');
    const toolsToggle = get('#movie-tools-toggle');
    let lastSave = 0, intended = null, full = false, hideTimer, saving = true, playRevision = 0;
    let rows = new Map(), playingIntent = false, dialoguePosition = 0;
    rate.value = prefs.rate; video.volume = prefs.volume; video.muted = prefs.muted;
    size.value = prefs.size; screen.dataset.captionSize = prefs.size;
    captionDisplay.bind(get('#movie-caption-mode'), paint, controller.signal);

    function remember(force = true) {
      if (stopped || !media || !film || !saving) return;
      const at = performance.now();
      if (!force && at - lastSave < 1200) return;
      lastSave = at;
      bookmarks.set(film.id, {time:Math.max(0,intended ?? now()), playing:playingIntent, cc:ccOn, track:tracks.value, search:search.value, dialoguePosition});
      lastFilm = film.id;
      storeProgress();
    }
    function renderDialogues() {
      const query = search.value.trim().toLocaleLowerCase('de');
      const fragment = document.createDocumentFragment();
      rows = new Map();
      for (const [index,cue] of cues.entries()) {
        if (query && !cue.text.toLocaleLowerCase('de').includes(query)) continue;
        const li = document.createElement('li'), button = document.createElement('button');
        const time = document.createElement('time'), text = document.createElement('span');
        button.type = 'button'; button.dataset.cue = index;
        button.tabIndex = rows.size ? -1 : 0;
        time.textContent = clock(cue.start); text.textContent = cue.text;
        if (index === active) button.setAttribute('aria-current','true');
        button.append(time,text); li.append(button); fragment.append(li); rows.set(index,button);
      }
      dialogue.replaceChildren(fragment);
      dialogue.scrollTop = cues.length ? dialoguePosition : 0;
      empty.hidden = rows.size > 0;
      empty.textContent = cues.length ? 'Qidiruvga mos jumla topilmadi.' : 'Bu trekda dialoglar hali yuklanmagan.';
      search.disabled = !cues.length;
      get('#movie-current').disabled = !rows.has(active);
    }
    search.oninput = () => { dialoguePosition = 0; renderDialogues(); remember(); };
    dialogue.onscroll = () => {
      if (!cues.length) return;
      dialoguePosition = dialogue.scrollTop;
      remember(false);
    };
    dialogue.onclick = event => {
      const button = event.target.closest('[data-cue]');
      if (button) jumpToCue(Number(button.dataset.cue));
    };
    function focusCue(row) {
      dialogue.querySelector('[tabindex="0"]')?.setAttribute('tabindex','-1');
      row.tabIndex = 0;
      const bounds = dialogue.getBoundingClientRect(), rect = row.getBoundingClientRect();
      if (rect.top < bounds.top || rect.bottom > bounds.bottom) {
        dialogue.scrollTop += rect.top + rect.height / 2 - bounds.top - bounds.height / 2;
      }
      row.focus({preventScroll:true});
    }
    dialogue.onkeydown = event => {
      const from = event.target.closest('li');
      if (!from) return;
      const item = {ArrowDown:from.nextElementSibling,ArrowUp:from.previousElementSibling,
        Home:dialogue.firstElementChild,End:dialogue.lastElementChild}[event.key];
      if (item) { event.preventDefault(); focusCue(item.firstElementChild); }
    };
    get('#movie-current').onclick = () => {
      const row = rows.get(active);
      if (row) focusCue(row);
    };
    let pictures = false, fullWords = false;
    function phrases(data) {
      const groups = [];
      for (const word of data) {
        const part = {start:word.start,end:word.end,text:word.text ?? word.word};
        const last = groups.at(-1);
        if (!last || part.start - last.end > .6 || part.end - last.start > 4.5 || last.segments.length >= 9)
          groups.push({start:part.start,end:part.end,text:part.text,segments:[part]});
        else { last.text += ' ' + part.text; last.end = part.end; last.segments.push(part); }
      }
      return groups;
    }
    function choices() {
      return [...(film?.tracks || []), ...(film?.files || [])];
    }
    function fillTracks() {
      const options = choices().map(track => {
        const opt = new Option(track.label + (track.kind === 'pgs' ? ' · PGS' : ''), track.id);
        opt.disabled = track.kind === 'bitmap';
        return opt;
      });
      if (film.wordChunk) options.unshift(new Option('Deutsch · so‘zma-so‘z (avtomatik)', 'words'));
      if (localSubs.has(film.id)) options.push(new Option(localSubs.get(film.id).name,'local'));
      tracks.replaceChildren(...options);
      const preferred = bookmarks.get(film.id)?.track;
      const fallback = film.wordChunk ? 'words' : film.defaultTrack;
      if (options.some(o => !o.disabled && o.value === preferred)) tracks.value = preferred;
      else if (options.some(o => !o.disabled && o.value === fallback)) tracks.value = fallback;
      tracks.disabled = !options.length;
    }
    function partAt(part) {
      const size = film.wordChunk;
      if (part < 0 || part * size >= duration()) return;
      const key = url('words/' + part);
      let item = wordParts.get(key);
      if (item && (!item.retry || item.retry > Date.now())) return item;
      item = {}; wordParts.set(key,item);
      fetch(key, {signal:controller.signal}).then(res => {
        if (!res.ok) throw Error();
        return res.json();
      }).then(data => { item.data = phrases(data); }).catch(() => { item.retry = Date.now() + 10000; })
        .finally(() => { if (!stopped && media && tracks.value === 'words') paint(); });
      return item;
    }
    function livePhrase(t) {
      const n = Math.floor(t / film.wordChunk);
      const item = partAt(n);
      if (!video.paused && (n+1)*film.wordChunk - t < 7) partAt(n+1);
      const note = item?.data ? 'Nemischa so‘zma-so‘z · audiodan avtomatik' :
        item?.retry ? 'So‘zlarni aniqlab bo‘lmadi. Subtitr trekini tanlashingiz mumkin.' : 'Nemischa so‘zlarning vaqti aniqlanmoqda…';
      if (subInfo !== note) { subInfo = note; describe(); }
      return item?.data?.find(cue => cue.start <= t && t < cue.end);
    }
    const now = () => intended ?? offset + (video.currentTime || 0);
    const duration = () => film?.duration || (Number.isFinite(video.duration) ? video.duration : 0);
    const url = name => base + '/media/' + film.id + '/' + name;
    function setIcon(button, name, label) {
      button.innerHTML = icon(name) + (button.id === 'movie-play' ? '<span></span>' : '');
      const span = button.querySelector('span');
      if (span) span.textContent = label;
      button.title = label; button.setAttribute('aria-label', label);
    }
    function resetLoop() {
      loop = null; pointA = null;
      repeat.setAttribute('aria-pressed','false'); ab.setAttribute('aria-pressed','false'); ab.textContent = 'A · Boshlanish';
    }
    function showTime(t) {
      const label = clock(t);
      if (get('#movie-now').textContent !== label) get('#movie-now').textContent = label;
      const ratio = Math.max(0, Math.min(1,t/(duration() || 1)));
      slider.style.setProperty('--rail-ratio', ratio);
      slider.style.setProperty('--filled', ratio * 100 + '%');
      slider.setAttribute('aria-valuetext',label);
    }
    function paint(t = now()) {
      if (!dragging) {
        const value = Math.round(Math.min(t, duration()) * 10) / 10;
        if (Number(slider.value) !== value || slider.getAttribute('aria-valuetext') !== clock(t)) {
          slider.value = value;
          showTime(t);
        }
      }
      // Locate the latest started cue, then include any earlier overlapping lines.
      let lo = 0, hi = cues.length;
      while (lo < hi) {
        const mid = (lo + hi) >>> 1;
        if (cues[mid].start <= t) lo = mid + 1; else hi = mid;
      }
      let index = -1;
      const visible = [];
      for (let i = lo - 1; i >= 0 && ends[i] > t; i--) {
        if (cues[i].end > t) {
          visible.unshift(cues[i]);
          if (index === -1) index = i;
        }
      }
      if (active !== index) {
        rows.get(active)?.removeAttribute('aria-current');
        rows.get(index)?.setAttribute('aria-current','true');
        get('#movie-current').disabled = !rows.has(index);
      }
      active = index;
      get('#movie-first').hidden = !cues.length || t >= cues[0].start;
      const speechMode = tracks.value === 'words' && film && media;
      const live = ccOn && speechMode && !fullWords ? livePhrase(t) : null;
      const textLines = !ccOn || pictures ? [] : speechMode && !fullWords ? (live ? [live] : []) : visible;
      const showingText = renderCaption(textLines, cue => cue.segments.findIndex(w => w.start <= t && t < w.end));
      const src = ccOn && pictures && index >= 0 ? cues[index].image : '';
      if (src && picture.getAttribute('src') !== src) picture.src = src;
      picture.hidden = !src; words.hidden = !showingText;
      caption.hidden = !showingText && !src;
    }
    function installCues(next, lang) {
      cues = next; ends = []; active = -1;
      let end = 0;
      for (const cue of cues) { end = Math.max(end, cue.end); ends.push(end); }
      words.lang = lang || '';
      const wordsTrack = tracks.value === 'words';
      get('#movie-mode-hint').hidden = !cues.length || wordsTrack || cues.some(cue => cue.segments?.length);
      get('#movie-caption-mode').disabled = !wordsTrack && !cues.some(cue => cue.segments?.length);
      if (cues.length) get('#movie-first').textContent = 'Birinchi jumla · ' + clock(cues[0].start);
      repeat.disabled = !cues.length; cc.disabled = !cues.length && tracks.value !== 'words';
      renderDialogues(); paint();
    }
    function describe() {
      const label = subInfo || film?.note || '';
      status.textContent = film?.audio === 'Nemischa audio' ? '' : (film?.audio || '');
      get('#movie-sub-info').textContent = label;
    }
    function langName(code) {
      if (code === 'de') return 'Nemischa subtitr';
      if (code === 'en') return 'Inglizcha subtitr';
      return code && code !== 'und' ? 'Subtitr (' + code + ')' : 'Subtitr';
    }
    async function loadSubs() {
      const speech = tracks.value === 'words';
      const local = tracks.value === 'local' ? localSubs.get(film.id) : null;
      const completed = speech && film.files?.find(f => f.label.endsWith('.auto.words.de.srt'));
      const selected = completed || choices().find(tr => tr.id === (speech ? film.defaultTrack : tracks.value));
      const folder = selected && url('tracks/' + selected.id + '/');
      const bitmap = selected?.kind === 'pgs';
      const endpoint = folder && folder + (bitmap ? 'index.json' : 'track.vtt');
      const key = local || [film.id,tracks.value,endpoint].join('/');
      if (key === subKey) { describe(); return; }
      subRequest?.abort(); subRequest = new AbortController(); subKey = key;
      pictures = false; fullWords = false; subInfo = ''; resetLoop(); installCues([], ''); describe();
      get('#movie-dialogue-language').hidden = true;
      if (!endpoint && !local) return;
      try {
        let data;
        if (local) data = readCues(local.text);
        else {
          const res = await fetch(endpoint, {signal:subRequest.signal});
          if (!res.ok) throw Error();
          data = bitmap ? (await res.json()).map((c,i) => ({...c,image:folder+c.image,text:'Subtitr ' + (i+1)})) : readCues(await res.text());
        }
        if (stopped || subKey !== key) return;
        if (!data.length) throw Error();
        pictures = bitmap && !speech;
        if (selected?.label.endsWith('.auto.words.de.srt')) {
          fullWords = true;
          data = phrases(data);
          subInfo = 'Nemischa so‘zma-so‘z · audiodan avtomatik';
        }
        installCues(data, speech ? 'de' : selected?.lang);
        const language = get('#movie-dialogue-language');
        language.hidden = !speech || selected?.lang === 'de';
        if (!language.hidden) language.textContent = langName(selected?.lang);
        if (!speech) subInfo = local ? local.name : selected.label;
        describe();
      } catch {
        if (!stopped && subKey === key && !speech) { subInfo = 'Subtitrni o‘qib bo‘lmadi. SRT yoki VTT faylini oching.'; describe(); }
      }
    }
    function play() {
      const attempt = ++playRevision;
      playingIntent = true;
      loadIndicator.hidden = video.readyState >= 3;
      video.play().catch(error => {
        if (stopped || attempt !== playRevision || error.name === 'AbortError') return;
        playingIntent = false;
        loadIndicator.hidden = true;
        syncTransport();
        remember();
      });
    }
    function seek(to, resume = playingIntent) {
      const t = Math.max(0, Math.min(to, Math.max(0, duration() - .05)));
      const clipTime = t - offset;
      const clipBuffered = media === 'clip.mp4' && Array.from({length:video.buffered.length},(_,i) => i)
        .some(i => video.buffered.start(i) <= clipTime && clipTime < video.buffered.end(i));
      intended = t;
      playingIntent = resume;
      if (media === 'clip.mp4' && !clipBuffered && !(t === offset && !video.readyState)) {
        playRevision++;
        offset = t; video.preload = resume ? 'auto' : 'metadata'; video.src = url(media) + '?start=' + t;
        video.playbackRate = prefs.rate;
      } else if (video.readyState) video.currentTime = clipTime;
      else {
        pendingSeek = {time:t, resume};
        video.preload = 'metadata';
      }
      paint(t); remember();
      if (resume && !pendingSeek) play();
    }
    function stopMedia() {
      saving = false; playRevision++;
      cancelAnimationFrame(frame); subRequest?.abort(); fullWords = false; pendingSeek = null; intended = null;
      playingIntent = false; offset = 0; media = ''; subInfo = ''; subKey = ''; dragging = false;
      video.pause(); video.removeAttribute('src'); video.load();
      loadIndicator.hidden = true; slider.style.removeProperty('--buffered'); screen.hidden = true; resetLoop(); search.value = ''; dialoguePosition = 0; installCues([], '');
    }
    function choose() {
      const next = catalog.find(item => item.id === list.value);
      const source = next?.direct && !needsMP4.has(next.id) ? 'original.mkv' :
        next?.compatible === 'ready' ? 'video.mp4' : next?.streaming ? 'clip.mp4' : '';
      const changed = next?.id !== film?.id || media !== source;
      if (changed) { remember(); stopMedia(); }
      film = next;
      if (!source) {
        if (!film) status.textContent = 'Film qo‘shish uchun MKV faylini movie papkasiga joylang.';
        else if (film.status === 'error') status.textContent = film.note;
        else if (film.compatible === 'error') status.textContent = 'Videoni moslashtirib bo‘lmadi. Diskdagi bo‘sh joyni tekshiring.';
        else if (film.compatible === 'encoding') status.textContent = 'Video moslashtirilmoqda · ' + film.percent + '%';
        else status.textContent = film.compatible === 'queued' ? 'Video moslashtirish navbatida.' : 'Film treklari tekshirilmoqda…';
        return;
      }
      if (changed) {
        media = source; screen.hidden = false;
        const mark = bookmarks.get(film.id);
        search.value = mark?.search || '';
        dialoguePosition = mark?.dialoguePosition || 0;
        ccOn = mark?.cc !== false; cc.setAttribute('aria-pressed',String(ccOn));
        fillTracks();
        const time = Number.isFinite(mark?.time) ? Math.max(0,Math.min(mark.time, Math.max(0,duration() - .05))) : 0;
        offset = media === 'clip.mp4' ? time : 0;
        pendingSeek = time && !offset ? {time,resume:!!mark?.playing} : null;
        intended = time;
        playingIntent = !!mark?.playing;
        video.preload = media === 'clip.mp4' && !time ? 'none' : 'metadata';
        video.defaultPlaybackRate = prefs.rate;
        video.src = url(media) + (offset ? '?start=' + offset : '');
        video.playbackRate = prefs.rate;
        slider.max = duration() || 1; get('#movie-end').textContent = clock(duration());
        lastFilm = film.id; saving = true;
        showTime(time); paint(time); syncTransport(); remember();
        if (playingIntent && !pendingSeek) play();
      } else fillTracks();
      loadSubs();
    }
    tracks.onchange = () => { dialoguePosition = 0; ccOn = true; cc.setAttribute('aria-pressed','true'); remember(); loadSubs(); };
    video.onloadedmetadata = () => {
      slider.max = duration() || 1; get('#movie-end').textContent = clock(duration());
      if (pendingSeek) { const {time,resume} = pendingSeek; pendingSeek = null; seek(time,resume); }
      else if (!video.seeking) intended = null;
      paint();
    };
    function tick() {
      paint();
      if (loop && !video.seeking && intended === null && now() >= loop.end) seek(loop.start, true);
      if (!video.paused && !stopped) frame = requestAnimationFrame(tick);
    }
    function syncTransport() {
      const playing = !video.paused;
      const label = playing ? 'Pauza' : 'Ijro etish';
      if (get('#movie-play').title !== label) setIcon(get('#movie-play'),playing?'pause':'play',label);
      stage.classList.toggle('movie-playing',playing);
    }
    video.onplay = () => { syncTransport(); wake(); cancelAnimationFrame(frame); tick(); };
    video.onplaying = () => { playingIntent = true; syncTransport(); loadIndicator.hidden = true; remember(); };
    video.onpause = () => { syncTransport(); wake(); cancelAnimationFrame(frame); paint(); remember(); };
    video.onwaiting = () => { if (playingIntent) loadIndicator.hidden = false; };
    video.oncanplay = () => { loadIndicator.hidden = true; };
    video.onseeked = () => { if (!pendingSeek) intended = null; paint(); remember(); };
    video.ontimeupdate = () => { if (document.hidden) paint(); remember(false); };
    video.onprogress = () => {
      const buffered = video.buffered;
      const end = buffered.length ? offset + buffered.end(buffered.length-1) : 0;
      slider.style.setProperty('--buffered',Math.min(100,end/(duration() || 1)*100) + '%');
    };
    video.onended = () => {
      if (loop) seek(loop.start,true);
      else { playingIntent = false; remember(); }
    };
    video.onerror = async () => {
      if (!film || !video.error || stopped) return;
      if (media === 'original.mkv' && [3,4].includes(video.error.code)) {
        const id = film.id, endpoint = base + '/api/movies/' + id + '/compatible';
        needsMP4.add(id); choose();
        try { const res = await fetch(endpoint,{method:'POST',signal:controller.signal}); if (!res.ok) throw Error(); }
        catch { if (!stopped && film?.id === id) status.textContent = 'Mos videoni tayyorlash uchun server ulanishini tekshiring.'; }
      } else status.textContent = 'Videoni ochib bo‘lmadi. Movie serverini va faylni tekshiring.';
    };
    function togglePlay() {
      if (!video.paused || playingIntent) {
        playingIntent = false; playRevision++;
        if (pendingSeek) pendingSeek.resume = false;
        video.pause(); loadIndicator.hidden = true; syncTransport(); remember();
      } else if (video.ended) seek(0,true);
      else {
        if (pendingSeek) pendingSeek.resume = true;
        play();
      }
      wake();
    }
    get('#movie-play').onclick = video.onclick = get('#movie-center').onclick = togglePlay;
    function nudge(seconds) { resetLoop(); seek(now() + seconds); wake(); }
    get('#movie-back').onclick = () => nudge(-10);
    get('#movie-forward').onclick = () => nudge(10);
    get('#movie-mute').onclick = () => { video.muted = !video.muted; if (!video.muted && !video.volume) video.volume = 1; };
    volume.oninput = () => { video.volume = Number(volume.value); video.muted = !video.volume; };
    function syncVolumeSlider() {
      volume.value = video.muted ? 0 : video.volume;
      volume.style.setProperty('--rail-ratio',volume.value);
    }
    video.onvolumechange = () => {
      prefs.volume = video.volume; prefs.muted = video.muted;
      syncVolumeSlider();
      setIcon(get('#movie-mute'), video.muted?'volume-x':'volume-2', video.muted?'Ovozni yoqish':'Ovozni o‘chirish');
      storeProgress();
    };
    syncVolumeSlider();
    slider.oninput = () => { dragging = true; showTime(Number(slider.value)); };
    slider.onchange = () => { dragging = false; resetLoop(); seek(Number(slider.value)); };
    slider.onpointercancel = () => { dragging = false; showTime(now()); paint(); };
    cc.onclick = () => { ccOn = !ccOn; cc.setAttribute('aria-pressed', String(ccOn)); paint(); remember(); };
    get('#movie-first').onclick = () => { if (cues.length) { resetLoop(); seek(cues[0].start,true); } };
    function jumpToCue(index) {
      const cue = cues[index];
      if (!cue) return;
      if (loop) { resetLoop(); loop = cue; repeat.setAttribute('aria-pressed','true'); }
      seek(cue.start,true);
    }
    repeat.onclick = () => {
      if (loop) { resetLoop(); return; }
      const cue = cues[active] || cues.find(c => c.start >= now()) || cues.at(-1);
      if (cue) { resetLoop(); loop = cue; repeat.setAttribute('aria-pressed','true'); seek(cue.start,true); }
    };
    ab.onclick = () => {
      if (ab.getAttribute('aria-pressed') === 'true') { resetLoop(); return; }
      if (pointA === null) { resetLoop(); pointA = now(); ab.textContent = 'B · Tugash'; }
      else if (now() > pointA + .1) {
        loop = {start:pointA,end:now()}; pointA = null;
        ab.textContent = 'A–B takrorini o‘chirish'; ab.setAttribute('aria-pressed','true'); seek(loop.start,true);
      } else showToast('B nuqtasini A nuqtasidan keyin belgilang.', 'info');
    };
    rate.onchange = () => {
      prefs.rate = Number(rate.value);
      video.defaultPlaybackRate = video.playbackRate = prefs.rate; storeProgress();
    };
    size.onchange = () => { prefs.size = size.value; screen.dataset.captionSize = prefs.size; storeProgress(); };

    const mobileView = mobileFullscreen(screen,controller.signal);
    function wake() {
      if (screen.classList.contains('mobile-full')) return;
      screen.classList.remove('movie-idle'); clearTimeout(hideTimer);
      if (!full || video.paused || toolsToggle.getAttribute('aria-expanded') === 'true') return;
      hideTimer = setTimeout(() => {
        if (!desk.contains(document.activeElement) && !desk.matches(':hover')) screen.classList.add('movie-idle');
      },2600);
    }
    function fullLabel() {
      mobileView.sync();
      full = document.fullscreenElement === screen || screen.classList.contains('movie-expanded');
      if (!full) { toolsToggle.setAttribute('aria-expanded','false'); screen.classList.remove('movie-tools-open'); }
      setIcon(get('#movie-full'),full?'minimize':'maximize', full?'To‘liq ekrandan chiqish':'To‘liq ekran');
      wake();
    }
    async function toggleFull() {
      if (screen.classList.contains('movie-expanded')) screen.classList.remove('movie-expanded');
      else if (document.fullscreenElement === screen) await document.exitFullscreen();
      else {
        try { await screen.requestFullscreen(); }
        catch { if (!stopped) screen.classList.add('movie-expanded'); }
      }
      if (!stopped) { fullLabel(); stage.focus({preventScroll:true}); }
    }
    get('#movie-full').onclick = toggleFull;
    toolsToggle.onclick = () => {
      const open = screen.classList.toggle('movie-tools-open');
      toolsToggle.setAttribute('aria-expanded',String(open)); wake();
      if (open) tracks.focus({preventScroll:true});
    };
    screen.onpointermove = screen.onpointerdown = screen.onfocusin = wake;
    desk.onpointerleave = desk.onfocusout = wake;
    stage.ondblclick = event => { if (event.target === video || event.target === stage) toggleFull(); };
    screen.onkeydown = event => {
      if (event.key === 'Escape' && screen.classList.contains('movie-expanded')) { toggleFull(); return; }
      if (event.target.closest('button,input,select') || event.altKey || event.ctrlKey || event.metaKey) return;
      const action = {
        ' ':togglePlay, k:togglePlay, ArrowLeft:() => nudge(-10), ArrowRight:() => nudge(10),
        f:toggleFull, m:() => get('#movie-mute').click(), c:() => cc.click()
      }[event.key.length === 1 ? event.key.toLowerCase() : event.key];
      if (action) { event.preventDefault(); event.stopPropagation(); action(); }
    };
    document.addEventListener('fullscreenchange',fullLabel,{signal:controller.signal});
    window.addEventListener('pagehide',() => remember(),{signal:controller.signal});
    document.addEventListener('visibilitychange',() => { if (document.hidden) remember(); },{signal:controller.signal});
    get('#movie-import').onclick = () => get('#movie-file').click();
    get('#movie-file').onchange = async e => {
      const file = e.target.files[0], id = film?.id;
      if (!file || !id) return;
      e.target.value = '';
      try {
        const text = await file.text();
        if (!readCues(text).length) throw Error();
        localSubs.set(id,{name:file.name,text});
        if (!stopped && film?.id === id) { fillTracks(); tracks.value = 'local'; ccOn = true; cc.setAttribute('aria-pressed','true'); remember(); loadSubs(); }
        saveMovieSubtitles();
      } catch { if (!stopped && film?.id === id) status.textContent = 'Faylda vaqt belgili subtitr topilmadi. SRT yoki VTT faylini tanlang.'; }
    };
    list.onchange = choose;
    async function refresh() {
      try {
        const res = await fetch(base + '/api/movies', {signal:controller.signal, cache:'no-store'});
        if (!res.ok) throw Error();
        const movies = await res.json();
        if (stopped) return;
        const signature = JSON.stringify(movies);
        if (signature !== snapshot) {
          const old = list.value || lastFilm;
          catalog = movies; snapshot = signature;
          list.replaceChildren(...movies.map(m => new Option(m.name.replace(/\.$/,''),m.id)));
          if (movies.some(m=>m.id===old)) list.value = old;
          list.disabled = !movies.length; choose();
        }
      } catch {
        if (stopped) return;
        snapshot = undefined; status.textContent = 'Movie serveriga ulanilmadi. Loyiha papkasida ./start.sh skriptini ishga tushiring.';
      }
      if (!stopped) timer = setTimeout(refresh,1500);
    }
    captureBookmark = remember;
    dispose = () => {
      captureBookmark = () => {};
      remember(); stopped = true; controller.abort(); clearTimeout(timer); clearTimeout(hideTimer);
      if (document.fullscreenElement === screen) document.exitFullscreen().catch(() => {});
      stopMedia(); dispose = () => {};
    };
    refresh();
  }
  return {mount, close: () => { closeHub(); dispose(); }, checkpoint:() => captureBookmark(),
    resumeHub:mode => { restoreMedia = ['movie','tv'].includes(mode) ? mode : ''; },
    profileData, applyProfile, subtitleProfile, applySubtitles};
})();
