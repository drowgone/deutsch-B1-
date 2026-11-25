// German-language broadcaster streams from IPTV-PRO's iptv-org catalogue.
const liveTV = (() => {
  const channels = [
    ['Das Erste','https://daserste-live.ard-mcdn.de/daserste/live/hls/int/master.m3u8'],
    ['tagesschau24','https://tagesschau.akamaized.net/hls/live/2020115/tagesschau/tagesschau_1/master.m3u8'],
    ['BR Fernsehen Süd','https://mcdn.br.de/br/fs/bfs_sued/hls/de/master.m3u8'],
    ['NDR Hamburg','https://mcdn.ndr.de/ndr/hls/ndr_fs/ndr_hh/master.m3u8'],
    ['WDR Köln','https://wdr-live.ard-mcdn.de/wdr/live/hls/de/master.m3u8'],
    ['KiKA','https://kikahls.akamaized.net/hls/live/2022690/livetvkika_ww/master.m3u8']
  ];
  const rakutenChannels = [
    ['Deutsches Kino','https://german-cinema-rakuten-tv-de.fast.rakuten.tv/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-hls-aes128-rtv-6200-playout/master.m3u8'],
    ['Top Filme','https://top-movies-rakuten-tv-de.fast.rakuten.tv/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-hls-aes128-rtv-5985-playout/master.m3u8'],
    ['Actionfilme','https://action-rakuten-tv-de.fast.rakuten.tv/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-hls-aes128-rtv-6066-playout/master.m3u8'],
    ['Drama Filme','https://drama-rakuten-tv-de.fast.rakuten.tv/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-hls-aes128-rtv-6096-playout/master.m3u8'],
    ['Komödien','https://comedy-rakuten-tv-de.fast.rakuten.tv/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-hls-aes128-rtv-6182-playout/master.m3u8'],
    ['Crime Serien','https://crime-rakuten-tv-de.fast.rakuten.tv/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-hls-aes128-rtv-6217-playout/master.m3u8'],
    ['100% Weihnachten','https://family-rakuten-tv-de.fast.rakuten.tv/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-hls-aes128-rtv-6209-playout/master.m3u8']
  ];
  let library;
  function loadHls() {
    library ??= new Promise((resolve,reject) => {
      const script = document.createElement('script');
      script.src = 'assets/vendor/hls-1.6.13.min.js';
      script.onload = () => resolve(window.Hls);
      script.onerror = () => { library = null; script.remove(); reject(Error('HLS')); };
      document.head.append(script);
    });
    return library;
  }

  // WebVTT timestamp nodes give exact anchors. Between anchors, distribute
  // words over the cue's airtime when the broadcaster only times phrases.
  function captionLine(cue) {
    const groups = [];
    let start = cue.startTime, text = '';
    const tree = cue.getCueAsHTML();
    const walk = document.createTreeWalker(tree,NodeFilter.SHOW_ALL);
    for (let node = walk.nextNode(); node; node = walk.nextNode()) {
      if (node.nodeType === Node.TEXT_NODE) text += node.data;
      else if (node.nodeName === 'BR') text += ' ';
      else if (node.nodeType === Node.PROCESSING_INSTRUCTION_NODE && node.target === 'timestamp') {
        const at = node.data.split(':').reduce((n,part) => n*60+Number(part),0);
        if (at >= start && at < cue.endTime) {
          groups.push({text,start,end:at}); start = at; text = '';
        }
      }
    }
    groups.push({text,start,end:cue.endTime});
    const segments = [];
    for (const group of groups) {
      const words = group.text.trim().split(/\s+/u).filter(Boolean);
      const total = words.reduce((n,w) => n+w.length,0);
      let at = group.start;
      for (const word of words) {
        const end = at + (group.end-group.start)*word.length/total;
        segments.push({text:word,start:at,end}); at = end;
      }
    }
    return {text:segments.map(word => word.text).join(' '),segments};
  }

  function settings(saved) {
    const channel = [...channels,...rakutenChannels].find(([name]) => name === saved?.channel);
    return {
      channel:(channel || channels[0])[0],
      volume:Number.isFinite(saved?.volume) ? Math.max(0,Math.min(1,saved.volume)) : 1,
      muted:saved?.muted === true,
      captions:saved?.captions !== false
    };
  }

  function mount(root,prefs,save) {
    root.innerHTML = `<section class="tv-console movie-player" aria-label="Nemischa TV">
      <div class="movie-stage"><video playsinline aria-label="Jonli efir"></video>
      <span class="movie-loading" role="status"></span><div class="movie-caption" hidden><span lang="de"></span></div></div>
      <div class="movie-desk"><div class="movie-transport">
      <label class="tv-channel">Telekanal<select></select></label>
      <button type="button" class="movie-primary" data-tv-play></button>
      <button type="button" data-tv-mute></button>
      <input type="range" min="0" max="1" step=".05" value="1" aria-label="Ovoz balandligi">
      <button type="button" data-tv-cc aria-label="Nemischa subtitr" aria-pressed="true"><i data-lucide="captions"></i></button>
      <select data-tv-captions aria-label="Subtitr ko‘rinishi"><option value="flow">Ibora + urg‘u</option><option value="line">Faqat ibora</option><option value="word">Bitta so‘z</option></select>
      <span class="movie-spacer"></span>
      <button type="button" data-tv-full aria-label="To‘liq ekran" title="To‘liq ekran"><i data-lucide="maximize"></i></button>
      </div></div></section>`;
    const get = s => root.querySelector(s);
    const panel = get('section'), video = get('video'), select = get('select');
    const play = get('[data-tv-play]'), mute = get('[data-tv-mute]'), volume = get('input');
    const status = get('[role=status]'), full = get('[data-tv-full]');
    let engine, revision = 0, failed = false, closed = false;
    const overlay = get('.movie-caption'), cc = get('[data-tv-cc]');
    const render = captionDisplay.renderer(overlay.firstElementChild);
    const lines = new WeakMap(), listeners = new AbortController();
    let track, enabled = prefs.captions, frame = 0;
    cc.setAttribute('aria-pressed',String(enabled));
    video.volume = prefs.volume;
    video.muted = prefs.muted;
    volume.value = String(prefs.volume);
    function remember() {
      save({channel:select.selectedOptions[0].text, volume:video.volume, muted:video.muted, captions:enabled});
    }
    function paintCaptions() {
      cancelAnimationFrame(frame);
      const cues = enabled && track ? Array.from(track.activeCues || []) : [];
      const visible = [];
      for (const cue of cues) {
        if (!cue.getCueAsHTML) continue;
        if (!lines.has(cue)) lines.set(cue,captionLine(cue));
        visible.push(lines.get(cue));
      }
      overlay.hidden = !render(visible,line => line.segments.findIndex(
        word => word.start <= video.currentTime && video.currentTime < word.end));
      if (visible.length && !video.paused && !closed) frame = requestAnimationFrame(paintCaptions);
    }
    function useTrack(next) {
      if (track !== next) {
        track?.removeEventListener('cuechange',paintCaptions);
        track = next;
        track?.addEventListener('cuechange',paintCaptions);
      }
      paintCaptions();
    }
    const isGerman = lang => /^(de|deu|ger|deutsch|german)(-|$)/i.test(lang || '');
    function syncTracks() {
      if (closed) return;
      const list = Array.from(video.textTracks).filter(t => ['captions','subtitles'].includes(t.kind));
      const selected = engine?.subtitleTracks[engine.subtitleTrack];
      const chosen = list.find(t => selected && t.label === selected.name) ||
        list.find(t => isGerman(t.language) || isGerman(t.label)) ||
        list.find(t => !t.language && t.kind === 'captions');
      for (const item of list) {
        const mode = enabled && item === chosen ? 'hidden' : 'disabled';
        if (item.mode !== mode) item.mode = mode;
      }
      useTrack(enabled ? chosen : null);
      cc.title = chosen ? 'Nemischa subtitr' : 'Kanaldan nemischa subtitr kutilmoqda';
    }
    video.textTracks.addEventListener('addtrack',syncTracks,{signal:listeners.signal});
    video.textTracks.addEventListener('removetrack',syncTracks,{signal:listeners.signal});
    video.addEventListener('timeupdate',paintCaptions,{signal:listeners.signal});
    captionDisplay.bind(get('[data-tv-captions]'),paintCaptions,listeners.signal);
    function selectHlsTrack() {
      if (engine) {
        const tracks = engine.subtitleTracks.filter(t => isGerman(t.lang) || isGerman(t.name));
        const german = tracks.find(t => !t.forced && !/forced/i.test(t.name)) || tracks[0];
        engine.subtitleDisplay = false;
        engine.subtitleTrack = enabled && german ? german.id : -1;
      }
      syncTracks();
    }
    cc.onclick = () => {
      enabled = !enabled; cc.setAttribute('aria-pressed',String(enabled)); remember(); selectHlsTrack();
    };
    function message(text) { status.textContent = text; status.hidden = !text; }
    function label(button,text,icon,visible=false) {
      button.title = text; button.setAttribute('aria-label',text);
      button.innerHTML = '<i data-lucide="'+icon+'"></i>' + (visible ? '<span>'+text+'</span>' : '');
      window.lucide?.createIcons({root:button});
    }
    function refresh() {
      label(play,failed?'Qayta ulanish':video.paused?'Ijro etish':'Pauza',failed?'rotate-cw':video.paused?'play':'pause',true);
      label(mute,video.muted?'Ovozni yoqish':'Ovozni o‘chirish',video.muted?'volume-x':'volume-2');
    }
    function error() {
      if (closed) return;
      failed = true; message('Efirga ulanilmadi. Qayta ulaning yoki boshqa kanalni tanlang.'); refresh();
    }
    async function start() {
      const id = ++revision;
      useTrack(null);
      engine?.destroy(); engine = null;
      video.pause(); video.removeAttribute('src'); video.load();
      failed = false; message('Efirga ulanmoqda…'); refresh();
      const url = select.value;
      const begin = () => video.play().catch(e => {
        if (revision !== id || e.name === 'AbortError') return;
        if (e.name === 'NotAllowedError') message('Efirni boshlash uchun «Ijro etish»ni bosing.');
        else error();
      });
      try {
        if (video.canPlayType('application/vnd.apple.mpegurl') && !window.MediaSource) {
          video.src=url; begin(); return;
        }
        const Hls = await loadHls();
        if (revision !== id) return;
        if (!Hls.isSupported()) {
          if (!video.canPlayType('application/vnd.apple.mpegurl')) { error(); return; }
          video.src=url; begin(); return;
        }
        engine = new Hls({maxBufferLength:20,capLevelToPlayerSize:true});
        engine.on(Hls.Events.ERROR,(_,data) => { if (id === revision && data.fatal) error(); });
        engine.on(Hls.Events.SUBTITLE_TRACKS_UPDATED,selectHlsTrack);
        engine.on(Hls.Events.MANIFEST_PARSED,() => { if (id === revision) { selectHlsTrack(); begin(); } });
        engine.loadSource(url); engine.attachMedia(video);
      } catch { if (revision === id) error(); }
    }
    for (const [label,entries] of [['Nemis telekanallari',channels],['Rakuten TV',rakutenChannels]]) {
      const group = document.createElement('optgroup');
      group.label = label;
      for (const [name,url] of entries) group.append(new Option(name,url));
      select.append(group);
    }
    select.value = Array.from(select.options).find(option => option.text === prefs.channel).value;
    select.onchange = () => { remember(); start(); };
    play.onclick = () => failed ? start() : video.paused ? video.play().catch(error) : video.pause();
    video.onclick = () => play.click();
    video.onplaying = () => { message(''); refresh(); };
    video.onpause = refresh;
    video.onwaiting = () => { if (!failed) message('Efir yuklanmoqda…'); };
    video.onerror = error;
    mute.onclick = () => { video.muted = !video.muted; remember(); };
    volume.oninput = () => { video.volume = Number(volume.value); video.muted = video.volume === 0; remember(); };
    video.onvolumechange = refresh;
    const mobileView = mobileFullscreen(panel,listeners.signal);
    function fullscreenLabel() {
      mobileView.sync();
      const expanded = document.fullscreenElement === panel || panel.classList.contains('movie-expanded');
      label(full,expanded?'To‘liq ekrandan chiqish':'To‘liq ekran',expanded?'minimize':'maximize');
    }
    full.onclick = async () => {
      if (panel.classList.contains('movie-expanded')) panel.classList.remove('movie-expanded');
      else if (document.fullscreenElement === panel) await document.exitFullscreen();
      else {
        try { await panel.requestFullscreen(); }
        catch { if (!closed) panel.classList.add('movie-expanded'); }
      }
      if (!closed) fullscreenLabel();
    };
    panel.onfullscreenchange = fullscreenLabel;
    start();
    return () => {
      closed = true; revision++; listeners.abort(); useTrack(null);
      video.onplaying = video.onpause = video.onerror = video.onwaiting = null;
      engine?.destroy(); video.pause(); video.removeAttribute('src'); video.load();
    };
  }
  return {mount,settings};
})();
