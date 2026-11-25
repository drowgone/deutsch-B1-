// Browser storage is a cache. The loopback server shares the profile across browsers.
const profileSync = (() => {
  const endpoint = "/api/study-profile";
  const available = location.protocol === "http:" && ["localhost","127.0.0.1"].includes(location.hostname);
  const headers = {"X-Deutsch-Profile":"1","Content-Type":"application/json"};
  let baseline = {}, view = {}, pending, saveJournal, ready = false, loaded = false, flight, scheduled;

  const jsonCopy = value => value === undefined ? undefined : JSON.parse(JSON.stringify(value));
  const isRecord = value => value && typeof value === "object" && !Array.isArray(value);

  function changesBetween(before, after, path = [], changes = []) {
    if (before === after) return changes;
    if (isRecord(before) && isRecord(after) && path.length < 12 &&
        !(path[0] === "workspace" && ["ui","focusTimer","avatarRoute"].includes(path[1])) &&
        !(path[0] === "subtitles" && path.length === 2)) {
      for (const key of new Set([...Object.keys(before),...Object.keys(after)])) {
        if (["__proto__","prototype","constructor"].includes(key)) continue;
        changesBetween(Object.hasOwn(before,key) ? before[key] : undefined,
          Object.hasOwn(after,key) ? after[key] : undefined,[...path,key],changes);
      }
    } else if (JSON.stringify(before) !== JSON.stringify(after)) {
      changes.push({path,before,value:after});
    }
    return changes;
  }

  async function request(options = {}, query = "") {
    const response = await fetch(endpoint + query,{headers,cache:"no-store",signal:AbortSignal.timeout(4000),...options});
    if (!response.ok) throw Error("Profile sync failed: " + response.status);
    return response.json();
  }

  function schedule(delay = 260) {
    if (!ready || scheduled) return;
    scheduled = setTimeout(() => { scheduled = undefined; flush(); },delay);
  }

  function flush() {
    if (!available || !saveJournal) return Promise.resolve(false);
    if (flight) return flight;
    clearTimeout(scheduled);
    scheduled = undefined;
    if (!pending) {
      const changes = changesBetween(baseline,view);
      if (!changes.length) return Promise.resolve(true);
      const token = crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
      pending = {body:JSON.stringify({token,initial:!Object.keys(baseline).length,changes}),view};
    }

    flight = (async () => {
      try {
        await saveJournal({baseline,pending});
        await request({method:"POST",body:pending.body,keepalive:new Blob([pending.body]).size < 60000});
        baseline = pending.view;
        pending = undefined;
        await saveJournal({baseline});
        return true;
      } catch {
        return false;
      }
    })();
    flight.then(ok => {
      flight = undefined;
      if (!ok) schedule(4000);
      else if (baseline !== view) schedule();
    });
    return flight;
  }

  async function start(local, journal, write) {
    if (!available) return local;
    saveJournal = write;
    baseline = journal?.baseline || {};
    pending = journal?.pending;
    view = jsonCopy(local);
    try {
      let remote = await request();
      if (remote.workspace?.backupResume) {
        pending = undefined;
        baseline = view = jsonCopy(remote);
        await saveJournal({baseline});
        loaded = true;
        return remote;
      }
      // A pending request keeps its ID across retries. Then publish edits after that checkpoint.
      while (pending || changesBetween(baseline,view).length) {
        if (!await flush()) return local;
        remote = await request();
      }
      loaded = true;
      return {...local,...remote};
    } catch {
      return local;
    }
  }

  function activate(profile) {
    if (!available) return;
    view = jsonCopy(profile);
    if (loaded) {
      baseline = view;
      saveJournal({baseline});
    }
    ready = true;
    schedule();
  }

  function update(key, value) {
    if (!available || !ready) return;
    view = {...view,[key]:jsonCopy(value)};
    schedule();
  }

  async function snapshot(local) {
    if (!available) return jsonCopy(local);
    for (const [key,value] of Object.entries(local)) update(key,value);
    do { if (!await flush()) throw Error("Profil serverga saqlanmadi."); }
    while (pending || changesBetween(baseline,view).length);
    return {...jsonCopy(local),...await request()};
  }

  async function importProfile(profile) {
    if (!await flush()) throw Error("Pending profile changes could not be saved.");
    const previous = await request();
    const changes = Object.entries(profile).map(([key,value]) => ({path:[key],before:previous[key],value}));
    const token = crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
    await request({method:"POST",body:JSON.stringify({token,changes})});
    const remote = await request();
    baseline = view = jsonCopy(remote);
    await saveJournal({baseline});
    loaded = true;
    return remote;
  }

  async function refreshTimer() {
    if (!available || !await flush()) return;
    const checkpoint = view.workspace?.focusTimer;
    try {
      const result = await request({},"?focus-timer");
      if (!Object.hasOwn(result,"focusTimer")) return;
      const {focusTimer} = result;
      if (pending || flight || JSON.stringify(view.workspace?.focusTimer) !== JSON.stringify(checkpoint) ||
          JSON.stringify(checkpoint ?? null) === JSON.stringify(focusTimer)) return;
      baseline = {...baseline,workspace:{...baseline.workspace,focusTimer}};
      view = {...view,workspace:{...view.workspace,focusTimer}};
      saveJournal({baseline});
      return {focusTimer};
    } catch {}
  }

  window.addEventListener("online",flush);
  return {available,start,activate,update,flush,snapshot,importProfile,refreshTimer};
})();
