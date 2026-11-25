// Touch players share the same orientation and controls lifecycle.
function mobileFullscreen(panel, signal) {
  const touch = matchMedia('(pointer:coarse), (hover:none)');
  let active = false, timeout, swallowTap = false;
  const view = document.createElement('div');
  view.className = 'media-full-view';
  view.append(...panel.childNodes);
  panel.append(view);
  function hide() {
    if (!panel.classList.contains('movie-tools-open')) panel.classList.add('movie-idle');
  }
  function reveal() {
    if (!active) return;
    panel.classList.remove('movie-idle');
    clearTimeout(timeout);
    timeout = setTimeout(hide,2400);
  }
  function sync() {
    const next = touch.matches && (document.fullscreenElement === panel || panel.classList.contains('movie-expanded'));
    if (active === next) return;
    active = next;
    panel.classList.toggle('mobile-full',active);
    clearTimeout(timeout);
    if (active) {
      hide();
      if (document.fullscreenElement === panel) window.screen.orientation?.lock?.('landscape').catch(() => {});
    } else {
      swallowTap = false;
      panel.classList.remove('movie-idle');
      try { window.screen.orientation?.unlock?.(); } catch {}
    }
  }
  panel.addEventListener('pointerdown',e => {
    if (!active) return;
    swallowTap = panel.classList.contains('movie-idle') && !!e.target.closest('.movie-stage');
    reveal();
  },{signal,capture:true});
  panel.addEventListener('click',e => {
    if (active && swallowTap) { swallowTap = false; e.preventDefault(); e.stopImmediatePropagation(); }
  },{signal,capture:true});
  for (const type of ['pointermove','pointerup','keydown']) panel.addEventListener(type,reveal,{signal});
  document.addEventListener('fullscreenchange',sync,{signal});
  signal.addEventListener('abort',() => {
    clearTimeout(timeout);
    if (active) { try { window.screen.orientation?.unlock?.(); } catch {} }
  },{once:true});
  return {sync,reveal};
}
