const studyStats = (() => {
  const labels = {
    dashboard:"Bosh sahifa", lessons:"Darslar", exercises:"Dars mashqlari", mastery:"Dars testi",
    vocab:"Lug‘at", grammar:"Grammatika", reading:"O‘qish", listening:"Tinglab tushunish",
    writing:"Yozish", speaking:"Gapirish", goethe:"Goethe", movie:"Media", roadmap:"Reja",
    flashcards:"Fleshkartalar", articles:"Artikllar", match:"Juftlik topish", spell:"Yozib yodlash",
    quiz:"Tezkor test", srs:"SRS takrorlash", builder:"Gap konstruktori"
  };
  const idleMs = 60_000;
  let started = false, lastInput = -Infinity, lastTick = 0, eligibleUntil = 0, section = "", dirty = false;
  let savedAt = 0, selectedDay = "", selectedMonth = "";
  let observedCalendar, calendarObserver;

  function entry(date, type) {
    const log = state.studyStats ??= {};
    return (log[date] ??= {})[type] ??= {ms:0, correct:0, wrong:0, done:0};
  }
  function origin() {
    if (getOpenModal()?.id === "mastery-quiz-modal") return "mastery";
    if (state.activeTab === "practice") return ui.practiceMode;
    if (state.activeTab === "goethe" || state.activeTab === "lessons" && ui.lessonSubTab === "goethe") {
      if (state.activeTab === "goethe" && ui.goetheSubTab === "texts") return "reading";
      return state.activeTab === "goethe" ? ui.goetheSkill : ui.dayGoetheSkill;
    }
    if (state.activeTab === "lessons" && ["reading","exercises","vocab"].includes(ui.lessonSubTab)) return ui.lessonSubTab;
    return state.activeTab;
  }
  function mediaPlaying() {
    const player = document.querySelector("#movie-screen video");
    return !!(player && !player.paused && !player.seeking && player.readyState >= 3)
      || !!(activeSpeechSession && !activeSpeechSession.paused && window.speechSynthesis?.speaking)
      || !!ui.speakRunning;
  }
  function tick(now = Date.now()) {
    if (!started) return;
    const end = Math.min(now,eligibleUntil);
    if (section && now - lastTick <= 8000) {
      for (let from = lastTick; from < end;) {
        const day = new Date(from);
        const key = getLocalTodayStr(day);
        const until = Math.min(day.setHours(24,0,0,0),end);
        entry(key,section).ms += until - from;
        from = until;
        dirty = true;
      }
    }
    lastTick = now;
    const next = origin();
    section = document.getElementById("focus-rest")?.open || next === "dashboard" ? "" : next;
    eligibleUntil = document.visibilityState === "visible" && document.hasFocus()
      ? mediaPlaying() ? now + 2500 : lastInput + idleMs : 0;
  }
  function flush() {
    if (!dirty) return;
    writeState();
    dirty = false;
    savedAt = Date.now();
  }
  function start() {
    if (started) return;
    started = true;
    lastTick = Date.now(); tick(lastTick);
    for (const name of ["pointerdown","keydown","wheel","touchmove","click","input"]) {
      document.addEventListener(name, event => {
        if (!event.isTrusted || document.hidden || !document.hasFocus()) return;
        const now = Date.now();
        tick(now);
        lastInput = now;
        tick(now);
      },{capture:true,passive:true});
    }
    for (const name of ["playing","pause","waiting","seeking","seeked","ended"])
      document.addEventListener(name, event => { if (event.target instanceof HTMLVideoElement) tick(); }, true);
    document.addEventListener("visibilitychange",() => { tick(); if (document.hidden) { lastInput = -Infinity; flush(); } });
    window.addEventListener("blur",() => { tick(); lastInput = -Infinity; flush(); });
    window.addEventListener("focus",() => tick());
    window.addEventListener("pagehide",() => { tick(); flush(); });
    setInterval(() => {
      tick();
      if (dirty && Date.now() - savedAt >= 10000) { flush(); refresh(); refreshStudyChart(); }
    },2000);
  }
  function record(type, outcome = "done", item = "") {
    if (!started || document.hidden || !document.hasFocus()) return;
    const row = entry(getLocalTodayStr(),type || origin());
    if (item) {
      row.items ??= {};
      if (Object.hasOwn(row.items,item)) return;
      row.items[item] = true;
    }
    row[outcome] = (Number(row[outcome]) || 0) + 1;
    dirty = true;
    saveState();
  }
  function reportRows(date) {
    return Object.entries(state.studyStats?.[date] || {}).flatMap(([key,row]) => {
      if (key === "pomodoroCycles") return [];
      if (key !== "dashboard") return [[key,row]];
      // Older profiles include home-screen time. Keep any recorded outcomes.
      return row?.correct || row?.wrong || row?.done ? [[key,{...row,ms:0}]] : [];
    });
  }
  function totals(date) {
    return reportRows(date).reduce((total,[,row])=>{
      for (const key of ["ms","correct","wrong","done"]) total[key] += Number(row?.[key]) || 0;
      return total;
    }, {ms:0,correct:0,wrong:0,done:0});
  }
  function active(date) {
    const day = totals(date);
    const old = state.activityLog?.[date];
    return Object.keys(state.studyStats?.[date]?.pomodoroCycles || {}).length > 0 || day.ms >= 60000 || day.correct + day.wrong + day.done > 0 || !!(old?.words || old?.exercises);
  }
  function streaks() {
    const today = getLocalTodayStr();
    let date = active(today) ? today : addDaysStr(today,-1), current = 0;
    while (active(date)) { current++; date = addDaysStr(date,-1); }
    let best = 0, previous = "", run = 0;
    const dates = [...new Set([...Object.keys(state.activityLog || {}),...Object.keys(state.studyStats || {})])].sort();
    for (const day of dates) {
      if (!/^\d{4}-\d\d-\d\d$/.test(day) || !active(day)) continue;
      run = previous && addDaysStr(previous,1) === day ? run + 1 : 1;
      best = Math.max(run,best); previous = day;
    }
    return {current,best};
  }
  function duration(ms) {
    const seconds = Math.floor(ms / 1000), hours = Math.floor(seconds / 3600), minutes = Math.floor(seconds / 60) % 60;
    return hours ? `${hours} soat ${minutes} daq.` : minutes ? `${minutes} daq. ${seconds%60} s` : `${seconds} s`;
  }
  function dateLabel(date, includeDay = true) {
    const options = includeDay ? {day:"numeric",month:"long",year:"numeric"} : {month:"long",year:"numeric"};
    return new Intl.DateTimeFormat("uz-Latn",options).format(new Date(date + "T12:00:00"));
  }
  function pomodoroTotals(date, monthly) {
    const first = monthly ? selectedMonth + "-01" : date;
    const start = new Date(first + "T00:00:00");
    const end = new Date(start);
    if (monthly) end.setMonth(end.getMonth() + 1);
    else end.setDate(end.getDate() + 1);

    const runs = state.timerRuns || {};
    const current = activePomodoroRun();
    const startMs = start.getTime(), endMs = end.getTime();
    const overlap = (from, until) => Math.max(0, Math.min(endMs, until) - Math.max(startMs, from));
    let ms = 0, cycles = 0, estimated = 0;
    for (const [id,run] of Object.entries(runs)) {
      if (run?.pomodoro === true && id !== current?.id && Number.isFinite(run.start) && Number.isFinite(run.end)) {
        ms += overlap(run.start, run.end);
      }
    }
    if (current) ms += overlap(current.start, Math.min(Date.now(), current.end));

    const last = getLocalTodayStr(end);
    for (const [day,log] of Object.entries(state.studyStats || {})) {
      if (day < first || day >= last) continue;
      for (const id of Object.keys(log?.pomodoroCycles || {})) {
        cycles++;
        // Older profiles did not label timer runs. A recorded cycle implies 25 minutes of focus.
        if (runs[id]?.pomodoro !== true && current?.id !== id) estimated++;
      }
    }
    return {ms:ms + estimated * 1_500_000,cycles,estimated};
  }
  function pomodoroValues(date, monthly) {
    const {ms,cycles,estimated} = pomodoroTotals(date,monthly);
    return {note:estimated ? "Eski sikllar: 25 daq." : "Tanaffus vaqti kirmaydi",
      time:duration(ms), cycles:String(cycles)};
  }
  function pomodoroRow({note,time,cycles}) {
    return `<section class="study-pomo" aria-label="Pomodoro statistikasi">
      <div class="study-pomo-content">
        <div class="study-pomo-label"><strong>Pomodoro</strong><span data-study-pomo-note>${note}</span></div>
        <dl><div><dt>Dars vaqti</dt><dd data-study-pomo-time>${time}</dd></div>
          <div><dt>Yakunlangan sikllar</dt><dd data-study-pomo-cycles>${cycles}</dd></div></dl>
      </div>
    </section>`;
  }
  function refreshPomodoro() {
    const row = document.querySelector("#study-detail .study-pomo");
    if (!row) return;
    for (const [key,value] of Object.entries(pomodoroValues(selectedDay,ui.studyCalendarScope === "month"))) {
      const element = row.querySelector(`[data-study-pomo-${key}]`);
      if (element.textContent !== value) element.textContent = value;
    }
  }
  function detail(date) {
    const monthly = ui.studyCalendarScope === "month";
    const dates = monthly ? Object.keys(state.studyStats || {}).filter(day=>day.startsWith(selectedMonth + "-")) : [date];
    const sections = new Map();
    for (const day of dates) {
      for (const [key,row] of reportRows(day)) {
        const section = sections.get(key) || {ms:0,correct:0,wrong:0,done:0};
        for (const prop of Object.keys(section)) section[prop] += Number(row?.[prop]) || 0;
        sections.set(key,section);
      }
    }
    const total = dates.map(totals).reduce((sum,day)=>{
      for (const prop of Object.keys(sum)) sum[prop] += day[prop];
      return sum;
    },{ms:0,correct:0,wrong:0,done:0});
    const records = [...sections.entries()].sort(([,a],[,b])=>b.ms-a.ms);
    const old = monthly ? null : state.activityLog?.[date];
    const hasData = records.length || old?.words || old?.exercises;
    const accuracy = total.correct + total.wrong ? Math.round(total.correct * 100 / (total.correct + total.wrong)) + "%" : "—";
    return `<div class="study-detail-head"><h3>${esc(dateLabel(monthly ? selectedMonth + "-01" : date,!monthly))}</h3>
      <div class="study-scope" role="group" aria-label="Statistika davri">
        <button type="button" data-action="study-scope" data-scope="day" aria-pressed="${!monthly}">Kun</button>
        <button type="button" data-action="study-scope" data-scope="month" aria-pressed="${monthly}">Oy jami</button>
      </div></div>${pomodoroRow(pomodoroValues(date,monthly))}
      <div class="study-detail-data"><dl class="study-metrics">
        <div><dt>Faol vaqt</dt><dd>${duration(total.ms)}</dd></div>
        <div><dt>To‘g‘ri</dt><dd>${total.correct}</dd></div>
        <div><dt>Xato</dt><dd>${total.wrong}</dd></div>
        <div><dt>Aniqlik</dt><dd>${accuracy}</dd></div>
        <div><dt>Bahosiz amallar</dt><dd>${total.done}</dd></div>
      </dl>
      ${hasData ? `<div id="study-breakdown" class="study-breakdown" role="region"
        aria-label="Bo‘limlar bo‘yicha statistika" tabindex="0" data-study-scroll>
        ${records.map(([key,row])=>`<div class="study-record"><strong>${esc(labels[key] || key)}</strong><span>${duration(row.ms)}</span>
          <span>${row.correct} to‘g‘ri · ${row.wrong} xato${row.done ? ` · ${row.done} baholanmagan` : ""}</span></div>`).join("")}
        ${!records.length && old ? `<p>Avvalgi qaydlar · ${Number(old.words) || 0} so‘z, ${Number(old.exercises) || 0} mashq</p>` : ""}
      </div>` : ('<p class="study-empty">' + (monthly ? 'Bu oy uchun bo‘limlar bo‘yicha faollik qayd etilmagan.' : 'Bu kun uchun bo‘limlar bo‘yicha faollik qayd etilmagan.') + '</p>')}</div>`;
  }
  function monthSummary() {
    const dates = [...new Set([...Object.keys(state.activityLog || {}),...Object.keys(state.studyStats || {})])]
      .filter(date => date.startsWith(selectedMonth + "-"));
    const time = dates.reduce((sum,date)=>sum + totals(date).ms,0);
    return dates.filter(active).length + " faol kun · " + duration(time);
  }
  function render() {
    const today = getLocalTodayStr();
    if (!selectedDay) {
      const previous = ui.studyCalendarDay;
      selectedDay = /^\d{4}-\d\d-\d\d$/.test(previous) && previous <= today &&
        Number.isFinite(Date.parse(previous)) ? previous : today;
    }
    selectedMonth ||= selectedDay.slice(0,7);
    const first = new Date(selectedMonth + "-01T12:00:00");
    const before = (first.getDay() + 6) % 7;
    const size = new Date(first.getFullYear(),first.getMonth()+1,0).getDate();
    const {current,best} = streaks();
    return `<section class="study-report" id="study-report" aria-label="Kunlik statistika">
      <div class="study-head"><div><h2>Kunlik faollik</h2><p>Faol o‘qish vaqti va mashq natijalari</p></div>
        <div class="study-streak"><span><strong data-study-streak>${current}</strong> kun ketma-ket</span><span>Rekord <strong data-study-best>${best}</strong> kun</span></div></div>
      <div class="study-report-grid"><div class="study-calendar">
        <div class="study-calendar-head">
          <button type="button" data-action="study-month" data-step="-1" aria-label="Oldingi oy">‹</button>
          <strong>${esc(dateLabel(selectedMonth + "-01",false))}</strong>
          <button type="button" data-action="study-month" data-step="1" aria-label="Keyingi oy" ${selectedMonth >= today.slice(0,7) ? "disabled" : ""}>›</button></div>
        <div class="study-calendar-days">
          ${["Du","Se","Ch","Pa","Ju","Sh","Ya"].map(label=>`<span>${label}</span>`).join("")}
          ${'<span></span>'.repeat(before)}
          ${Array.from({length:size},(_,i)=>{
            const date = selectedMonth + "-" + String(i+1).padStart(2,"0");
            const data = totals(date), marked = data.ms > 0 || data.correct + data.wrong + data.done > 0 || active(date);
            return `<button type="button" data-action="study-day" data-date="${date}" data-marked="${marked}"
              aria-pressed="${selectedDay === date}" title="${esc(dateLabel(date))} · ${duration(data.ms)}"
              ${date === today ? 'aria-current="date"' : ""} ${date > today ? "disabled" : ""}>${i+1}</button>`;
          }).join("")}
        </div>
        <div class="study-calendar-foot"><span><i></i> <span data-study-month-summary>${monthSummary()}</span></span><button type="button" data-action="study-today">Bugun</button></div>
      </div><div id="study-detail" class="study-detail">${detail(selectedDay)}</div></div>
      <p class="study-foot">Bosh sahifadagi vaqt hisoblanmaydi. Boshqa bo‘limlarda vaqt sahifa oldinda turganda hisoblanadi. 1 daqiqa harakatsizlikdan so‘ng hisob pauzaga o‘tadi. Ovozli mashq yoki film ijro etilsa davom etadi. Kun seriyaga kamida 1 daqiqa faol vaqt yoki bitta mashq qayd etilganda qo‘shiladi.</p>
    </section>`;
  }
  function observeCalendarHeight() {
    const calendar = document.querySelector("#study-report .study-calendar");
    if (calendar === observedCalendar) return;
    calendarObserver?.disconnect();
    observedCalendar = calendar;
    if (!calendar) return;

    const matchHeight = () => {
      const height = calendar.getBoundingClientRect().height;
      if (height > 0) calendar.parentElement.style.setProperty("--study-calendar-height", height + "px");
    };
    matchHeight();
    calendarObserver = new ResizeObserver(matchHeight);
    calendarObserver.observe(calendar, {box:"border-box"});
  }

  function refresh() {
    if (!document.getElementById("study-report")) return;
    refreshPomodoro();
    const {current,best} = streaks();
    document.querySelector("[data-study-streak]").textContent = current;
    document.querySelector("[data-study-best]").textContent = best;
    document.querySelector("[data-study-month-summary]").textContent = monthSummary();
    const day = document.querySelector('[data-action="study-day"][data-date="' + getLocalTodayStr() + '"]');
    if (day) {
      const data = totals(day.dataset.date);
      day.dataset.marked = data.ms > 0 || active(day.dataset.date);
      day.title = dateLabel(day.dataset.date) + " · " + duration(data.ms);
    }
    if (selectedDay === getLocalTodayStr() || ui.studyCalendarScope === "month" && selectedMonth === getLocalTodayStr().slice(0,7)) {
      const current = document.querySelector("#study-detail .study-detail-data");
      const fresh = document.createElement("template");
      fresh.innerHTML = detail(selectedDay);
      const next = fresh.content.querySelector(".study-detail-data");
      if (current && !current.isEqualNode(next)) {
        const previousList = current.querySelector(".study-breakdown");
        const scrollTop = previousList?.scrollTop || 0;
        const hadFocus = !!previousList && document.activeElement === previousList;
        current.replaceWith(next);
        const nextList = next.querySelector(".study-breakdown");
        if (nextList) {
          nextList.scrollTop = scrollTop;
          if (hadFocus) nextList.focus({preventScroll:true});
        }
      }
    }
  }
  function refreshPeriod() {
    const next = document.createElement("template");
    next.innerHTML = detail(selectedDay);
    const detailPanel = document.getElementById("study-detail");
    for (const selector of [".study-detail-head", ".study-detail-data"]) {
      detailPanel.querySelector(selector).replaceWith(next.content.querySelector(selector));
    }
    refreshPomodoro();
  }
  function select(action, options) {
    const today = getLocalTodayStr();
    if (action === "study-scope") {
      ui.studyCalendarScope = options.scope === "month" ? "month" : "day";
      rememberWorkspace();
      refreshPeriod();
      document.querySelector('.study-scope button[aria-pressed="true"]')?.focus({preventScroll:true});
      return;
    }
    if (action === "study-day") {
      ui.studyCalendarScope = "day";
      selectedDay = ui.studyCalendarDay = options.date;
      rememberWorkspace();
      if (selectedMonth !== selectedDay.slice(0,7)) {
        selectedMonth = selectedDay.slice(0,7);
        document.getElementById("study-report").outerHTML = render();
        observeCalendarHeight();
        return;
      }
      document.querySelectorAll('[data-action="study-day"]').forEach(day => day.setAttribute("aria-pressed",String(day.dataset.date === selectedDay)));
      refreshPeriod();
      return;
    }
    if (action === "study-today") {
      ui.studyCalendarScope = "day";
      selectedDay = today; selectedMonth = today.slice(0,7);
    } else {
      const destination = new Date(selectedMonth + "-01T12:00:00");
      destination.setMonth(destination.getMonth() + Number(options.step));
      selectedMonth = getLocalTodayStr(destination).slice(0,7);
      selectedDay = selectedMonth === today.slice(0,7) ? today : selectedMonth + "-01";
    }
    ui.studyCalendarDay = selectedDay;
    rememberWorkspace();
    document.getElementById("study-report").outerHTML = render();
    observeCalendarHeight();
    document.querySelector('[data-action="study-day"][aria-pressed="true"]')?.focus({preventScroll:true});
  }
  return {start,tick,record,active,streaks,totals,render,select,refresh,refreshPomodoro,observeCalendarHeight};
})();
