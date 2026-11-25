// Use the same speech player for selected text and the lesson's reading button.
(() => {
  const menu = document.getElementById('text-menu');
  const preview = document.getElementById('menu-selection');
  const meaning = document.getElementById('text-meaning');
  const translateButton = menu.querySelector('[data-text-command="translate"]');
  let menuText = '', translation = '', lastRead = '', selectionTimer, dragging = false;
  let returnFocus, menuX, menuY, pointerStart, selectedByDrag = false;

  function selectedText() {
    const field = document.activeElement;
    if (field?.matches('input, textarea')) {
      if (field.type === 'password' || typeof field.selectionStart !== 'number') return '';
      return field.value.slice(field.selectionStart, field.selectionEnd).trim();
    }
    return String(window.getSelection() || '').trim();
  }

  function lookup(text) {
    const key = normalizeAnswer(text);
    if (!key) return '';
    const match = pair => pair && typeof pair.de === 'string' && normalizeAnswer(pair.de) === key;
    for (const w of getAllWords()) {
      if (match(w) || normalizeAnswer(fullGermanWord(w)) === key) return w.uz;
    }
    for (const entry of getAllReadingTexts()) {
      if (match(entry)) return entry.uz;
      for (const gloss of entry.vocab || []) {
        const [de, uz] = String(gloss).split(/\s+[—–-]\s+/);
        if (uz && [de, de.replace(/^(der|die|das) /i, '')].some(s => normalizeAnswer(s) === key)) return uz;
      }
    }
    for (const lesson of getAllLessons()) {
      const hit = [...(lesson.dialogue || []), ...(lesson.examples || [])].find(match);
      if (hit) return hit.uz;
    }
    return '';
  }

  function scheduleReading() {
    clearTimeout(selectionTimer);
    if (dragging || !menu.hidden) return;
    selectionTimer = setTimeout(() => {
      const selection = window.getSelection();
      const node = selection?.anchorNode;
      const parent = node?.nodeType === 1 ? node : node?.parentElement;
      if (parent?.closest('#text-menu, #speech-captions') || document.activeElement?.closest('#text-menu, #speech-captions')) return;
      const text = selectedText();
      if (!text) { lastRead = ''; return; }
      if (!/\p{L}/u.test(text) || text === lastRead) return;
      lastRead = text;
      speakGerman(text, null, true);
    }, 260);
  }
  document.addEventListener('selectionchange', scheduleReading);
  document.addEventListener('select', scheduleReading);
  document.addEventListener('pointerdown', event => {
    pointerStart = { x: event.clientX, y: event.clientY };
    selectedByDrag = false;
    dragging = true;
    clearTimeout(selectionTimer);
    if (!menu.contains(event.target)) closeMenu(false);
  });
  document.addEventListener('pointerup', event => {
    dragging = false;
    if (event.button === 0) {
      selectedByDrag = pointerStart && Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 4 && !!selectedText();
      scheduleReading();
    }
  });
  // A drag across a flashcard selects the words without also turning the card.
  document.addEventListener('click', event => {
    if (selectedByDrag && event.detail > 0) {
      selectedByDrag = false;
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
  document.addEventListener('pointercancel', () => { dragging = false; scheduleReading(); });

  function closeMenu(focus) {
    if (menu.hidden) return;
    menu.hidden = true;
    if (focus && returnFocus?.isConnected) returnFocus.focus({preventScroll: true});
  }
  function placeMenu() {
    menu.style.left = Math.max(6, Math.min(menuX, innerWidth - menu.offsetWidth - 6)) + 'px';
    menu.style.top = Math.max(6, Math.min(menuY, innerHeight - menu.offsetHeight - 6)) + 'px';
  }
  document.addEventListener('contextmenu', event => {
    if ((event.shiftKey && event.button === 2) || event.target.closest('input[type="password"]')) return;
    const text = menu.contains(event.target) ? menuText : selectedText();
    if (!text && event.target.closest('input, textarea, [contenteditable="true"]')) return;
    event.preventDefault();
    clearTimeout(selectionTimer);
    dragging = false;
    returnFocus = document.activeElement;
    menuText = text;
    lastRead = text;
    translation = text && lookup(text);
    preview.textContent = text.length > 120 ? text.slice(0, 119) + '…' : text;
    preview.hidden = !text;
    if (translation) {
      translateButton.setAttribute('aria-controls', 'text-meaning');
      translateButton.setAttribute('aria-expanded', 'false');
    } else {
      translateButton.removeAttribute('aria-controls');
      translateButton.removeAttribute('aria-expanded');
    }
    translateButton.querySelector('span').textContent = translation || !text ? 'O‘zbekchaga tarjima' : 'Google Tarjimonda tarjima ↗';
    meaning.hidden = true;
    menu.querySelectorAll('button').forEach(b => { b.disabled = !text && b.dataset.textCommand !== 'reload'; });
    menu.hidden = false;
    const rect = returnFocus.getBoundingClientRect();
    const keyboard = !event.clientX && !event.clientY && event.button !== 2;
    menuX = keyboard ? rect.left : event.clientX;
    menuY = keyboard ? rect.bottom : event.clientY;
    placeMenu();
    menu.querySelector('button:enabled').focus({preventScroll:true});
  });
  menu.addEventListener('click', async event => {
    const command = event.target.closest('[data-text-command]')?.dataset.textCommand;
    if (!command) return;
    const text = menuText;
    if (command === 'translate' && translation) {
      meaning.textContent = translation;
      meaning.hidden = !meaning.hidden;
      translateButton.setAttribute('aria-expanded', String(!meaning.hidden));
      placeMenu();
      return;
    }
    closeMenu(true);
    if (command === 'reload') location.reload();
    if (command === 'listen') speakGerman(text, null, true);
    if (command === 'translate') {
      const url = new URL('https://translate.google.com/');
      url.search = new URLSearchParams({sl:'de', tl:'uz', text, op:'translate'});
      window.open(url.href, '_blank', 'noopener,noreferrer');
    }
    if (command === 'copy') {
      try { await navigator.clipboard.writeText(text); showToast('Matn nusxalandi.', 'info'); }
      catch { showToast('Nusxalash uchun Ctrl+C tugmalarini bosing.', 'info'); }
    }
  });
  document.addEventListener('keydown', event => {
    if (menu.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu(true);
    } else if (['ArrowDown','ArrowUp'].includes(event.key)) {
      event.preventDefault();
      const buttons = [...menu.querySelectorAll('button:enabled')];
      const index = buttons.indexOf(document.activeElement);
      buttons[(index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length].focus();
    }
  }, true);
  menu.addEventListener('focusout', event => {
    if (event.relatedTarget && !menu.contains(event.relatedTarget)) closeMenu(false);
  });
  window.addEventListener('resize', () => { if (!menu.hidden) placeMenu(); });
  window.addEventListener('scroll', () => closeMenu(false), {passive:true});
})();
