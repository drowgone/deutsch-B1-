const captionDisplay = (() => {
  const key = 'deutsch-b1.caption-mode';
  const modes = ['flow', 'line', 'word'];
  let mode = 'flow';
  try {
    const value = localStorage.getItem(key);
    if (modes.includes(value)) mode = value;
  } catch {}

  function applyProfile(value) {
    if (!modes.includes(value)) return;
    mode = value;
    try { localStorage.setItem(key, mode); } catch {}
    document.dispatchEvent(new Event('caption-display-change'));
  }

  function bind(select, update, signal) {
    select.value = mode;
    select.addEventListener('change', () => {
      if (!modes.includes(select.value)) return;
      applyProfile(select.value);
      profileSync.update('captions',mode);
    }, {signal});
    document.addEventListener('caption-display-change', () => {
      select.value = mode;
      update();
    }, {signal});
  }

  function renderer(target) {
    let previous = [], previousMode, rendered = [];
    return (lines, activeIndex) => {
      if (mode !== previousMode || lines.length !== previous.length || lines.some((line,i) => line !== previous[i])) {
        target.replaceChildren();
        rendered = lines.map((line, i) => {
          const row = document.createElement('span');
          row.className = 'caption-line-row';
          if (i) target.append('\n');
          target.append(row);
          if (mode !== 'flow' || !line.segments?.length) return {row, words:[]};
          const words = line.segments.map((part, j) => {
            const span = document.createElement('span');
            span.className = 'caption-token';
            span.textContent = part.text;
            if (j && !line.preserveSpacing) row.append(' ');
            row.append(span);
            return span;
          });
          return {row,words,active:-1};
        });
        previous = lines;
        previousMode = mode;
      }

      let visible = false;
      lines.forEach((line,i) => {
        const view = rendered[i];
        const {row,words} = view;
        const timed = !!line.segments?.length;
        const active = timed && mode !== 'line' ? activeIndex(line) : -1;
        if (words.length) {
          if (view.active !== active) {
            words[view.active]?.removeAttribute('aria-current');
            words[active]?.setAttribute('aria-current','true');
            view.active = active;
          }
          visible = true;
        } else {
          const text = mode === 'word' && timed ? line.segments[active]?.text.trim() || '' : line.text;
          if (row.textContent !== text) row.textContent = text;
          visible ||= !!text.trim();
        }
      });
      return visible;
    };
  }
  return {bind,renderer,applyProfile,profileData:()=>mode};
})();
