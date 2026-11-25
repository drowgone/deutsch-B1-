(() => {
  const cards = {timer:['Dars taymeri',12],stats:['Kunlik statistika',12],lesson:['Faol dars',8],word:['Tasodifiy so‘z',4],chart:['Oxirgi 7 kun',8],rules:['Oltin qoidalar',4],plan:['Dars bloklari',8]};
  const GAP=16, MAX_GAP=36, clamp=(n,a,b)=>Math.min(Math.max(a,n),b), keys=Object.keys(cards);
  const collide=(a,b)=>a.x<b.x+b.w+GAP-.75 && b.x<a.x+a.w+GAP-.75 && a.y<b.y+b.h+GAP-.75 && b.y<a.y+a.h+GAP-.75;
  const profile=()=>matchMedia('(max-width:760px)').matches?'compact':'wide';
  let editing=false,dispose;
  // Resolve collisions from a single frozen layout. Cards that already fit stay put.
  function arrange(wishes,width,priority,origin){
    const placed={},pending=[];
    for(const k of priority){const r={...wishes[k]};r.x=clamp(r.x,0,width-r.w);if(!Object.values(placed).some(p=>collide(r,p)))placed[k]=r;else pending.push(k)}
    for(const k of pending){const r=wishes[k],others=Object.values(placed);
      const xs=[r.x,0,width-r.w,...others.flatMap(p=>[p.x+p.w+GAP,p.x-r.w-GAP])];
      const ys=[r.y,0,...others.flatMap(p=>[p.y+p.h+GAP,p.y-r.h-GAP])];
      const candidates=ys.flatMap(y=>xs.map(x=>({...r,x,y}))).filter(p=>p.x>=-.01&&p.x+p.w<=width+.01&&p.y>=0);
      candidates.sort((a,b)=>Math.hypot(a.x-r.x,a.y-r.y)-Math.hypot(b.x-r.x,b.y-r.y));
      if(origin)candidates.unshift({...r,x:clamp(origin.x,0,width-r.w),y:origin.y});
      placed[k]=candidates.find(c=>!others.some(p=>collide(c,p)));
    }return closeWideGaps(placed);
  }
  // Reorder a vertical run as a list. Keep the other columns and deliberate gaps.
  function insertInLane(frozen, key, target, after, width) {
    const from = frozen[key], to = frozen[target];
    const inLane = r => Math.abs(r.x - to.x) < 8 && Math.abs(r.w - to.w) < 8;
    if (!inLane(from)) return null;
    const lane = Object.keys(frozen).filter(id => inLane(frozen[id]))
      .sort((a, b) => frozen[a].y - frozen[b].y);
    const first = Math.min(lane.indexOf(key), lane.indexOf(target));
    const last = Math.max(lane.indexOf(key), lane.indexOf(target));
    const run = lane.slice(first, last + 1);
    for (let i = 1; i < run.length; i++) {
      const previous = frozen[run[i - 1]];
      if (frozen[run[i]].y - previous.y - previous.h > MAX_GAP) return null;
    }
    const sequence = run.filter(id => id !== key);
    sequence.splice(sequence.indexOf(target) + Number(after), 0, key);
    const wishes = {...frozen};
    let y = frozen[run[0]].y;
    for (const id of sequence) {
      wishes[id] = {...frozen[id], y};
      y += frozen[id].h + GAP;
    }
    return arrange(wishes, width, [...sequence, ...Object.keys(frozen).filter(id => !run.includes(id))]);
  }

  // Only local neighbours participate; distant cards on the same axis give no hints.
  const SNAP=6, NEAR=MAX_GAP;
  function neighbours(r,others,axis){
    const [a,n,b,m]=axis==='x'?['x','w','y','h']:['y','h','x','w'];
    return others.map(p=>({p,overlap:Math.min(r[b]+r[m],p[b]+p[m])-Math.max(r[b],p[b]),
      before:r[a]-p[a]-p[n],after:p[a]-r[a]-r[n]}));
  }
  // Close oversized gutters from the top and left, retaining card sizes and order.
  function closeWideGaps(layout) {
    const cards = Object.values(layout);
    for (const axis of ['x','y']) {
      for (const r of [...cards].sort((a,b) => a[axis]-b[axis])) {
        const behind = neighbours(r,cards,axis).filter(v => v.before >= 0 && v.overlap > -GAP+.75);
        if (!behind.some(v => v.overlap > 0)) continue;
        const gap = Math.min(...behind.map(v => v.before));
        if (gap > MAX_GAP+.01) r[axis] -= gap-GAP;
      }
    }
    return layout;
  }

  function freeDrop(raw, peers, width, sx, sy) {
    const r = {...raw,x:sx?.start??raw.x,y:sy?.start??raw.y};
    const candidates = [];
    for (const axis of ['x','y']) {
      const n = axis === 'x' ? 'w' : 'h';
      const aligned = neighbours(r,peers,axis).filter(v => v.overlap>0);
      if (!aligned.length || aligned.some(v => Math.max(v.before,v.after)<=MAX_GAP+.01)) continue;
      for (const {p,before} of aligned) {
        const at = before>=0 ? p[axis]+p[n]+GAP : p[axis]-r[n]-GAP;
        candidates.push({...r,[axis]:at});
      }
    }
    // When the pointer is diagonally outside the layout, use the closest open edge.
    if (!['x','y'].some(axis => neighbours(r,peers,axis).some(v => v.overlap>0))) {
      for (const p of peers) {
        for (const y of [p.y-r.h-GAP,p.y+p.h+GAP]) candidates.push({...r,x:clamp(p.x,0,width-r.w),y});
        for (const x of [p.x-r.w-GAP,p.x+p.w+GAP]) candidates.push({...r,x,y:p.y});
      }
    }
    const valid = candidates.filter(c => c.x>=0 && c.x+c.w<=width+.01 && c.y>=0 && !peers.some(p=>collide(c,p)));
    const distance = c => Math.hypot(c.x-r.x,c.y-r.y);
    return valid.sort((a,b)=>distance(a)-distance(b))[0] || r;
  }
  function snapAxis(r,others,axis,width){
    const [a,n]=axis==='x'?['x','w']:['y','h'];let best=null;
    function offer(start,priority,align){const d=Math.abs(start-r[a]);if(d>SNAP||start<0||(a==='x'&&start+r[n]>width+.01))return;
      if(!best||d<best.d||(d===best.d&&priority<best.priority))best={start,d,priority,align};}
    const peers=neighbours(r,others,axis),near=peers.filter(v=>v.overlap>0);
    for(const v of peers){const p=v.p;
      if(v.overlap>=-NEAR && Math.max(v.before,v.after)<=NEAR){for(const f of [0,1,.5])offer(p[a]+(p[n]-r[n])*f,2,{p,f})}
      if(v.overlap<=0)continue;
      offer(p[a]+p[n]+GAP,1);offer(p[a]-r[n]-GAP,1);
    }
    const left=near.filter(v=>v.before>=GAP-SNAP).sort((u,v)=>u.before-v.before)[0];
    const right=near.filter(v=>v.after>=GAP-SNAP).sort((u,v)=>u.after-v.after)[0];
    if(left&&right){const gap=(left.before+right.after)/2;if(gap>=GAP&&gap<=NEAR)offer(r[a]+(right.after-left.before)/2,0)}
    return best;
  }
  // The corner handle moves only the far edge on each axis. The opposite
  // corner stays anchored; use the measured box because wrapped content sets its minimum height.
  function resizeEdge(r,others,axis,min,max,tolerance=SNAP){
    const [a,n]=axis==='x'?['x','w']:['y','h'];let best=null;
    for(const {p,overlap} of neighbours(r,others,axis)){
      if(overlap < -NEAR)continue;
      for(const peerFraction of [1,0]){
        const size=p[a]+peerFraction*p[n]-r[a],d=Math.abs(size-r[n]);
        if(size<min||size>max||d>tolerance)continue;
        if(!best||d<best.d||(d===best.d&&overlap>best.overlap))best={size,d,overlap,align:{p,f:1,peerFraction}};
      }
    }return best;
  }
  function guideLines(r,others,axis,snap){
    const [a,n,b,m]=axis==='x'?['x','w','y','h']:['y','h','x','w'];const lines=[];
    const peers=neighbours(r,others,axis).filter(v=>v.overlap>1);
    for(const side of ['before','after']){
      const v=peers.filter(v=>v[side]>0&&v[side]<=NEAR).sort((u,v)=>u[side]-v[side])[0];if(!v)continue;
      const across=Math.max(r[b],v.p[b])+v.overlap/2,along=side==='before'?v.p[a]+v.p[n]:r[a]+r[n];
      lines.push({horizontal:a==='x',x:a==='x'?along:across,y:a==='x'?across:along,length:v[side],text:`${Math.round(v[side])} px`});
    }
    if(snap?.align){const {p,f,peerFraction=f}=snap.align,lineAt=r[a]+r[n]*f;
      if(others.some(q=>Math.abs(q[a]+q[n]*peerFraction-lineAt)<.6&&Math.abs(q[b]-p[b])<.6)){
        const lo=Math.min(p[b],r[b]),hi=Math.max(p[b]+p[m],r[b]+r[m]);
        lines.push({horizontal:a==='y',x:a==='x'?lineAt:lo,y:a==='x'?lo:lineAt,length:hi-lo,text:''});
      }
    }return lines;
  }
  // Reuse the six possible guides throughout a drag (two gaps and one ruler per axis).
  function guideOverlay(grid){const layer=document.createElement('div');layer.className='db-guides';layer.setAttribute('aria-hidden','true');grid.append(layer);
    const bars=Array.from({length:6},()=>{const el=document.createElement('i');el.hidden=true;el.append(document.createElement('span'));layer.append(el);return el});
    return {remove:()=>layer.remove(),show(lines){bars.forEach((el,i)=>{const l=lines[i];el.hidden=!l;if(!l)return;
      el.className=(l.horizontal?'db-horizontal':'db-vertical')+(l.text?' db-gap':' db-ruler');el.style.left=l.x+'px';el.style.top=l.y+'px';el.style.setProperty('--length',l.length+'px');el.firstChild.textContent=l.text;
    })}};
  }
  window.mountDashboardLayout=(root,saved,save,savedSnapshots,saveSnapshot)=>{
    dispose?.();const tools=root.querySelector('.db-layout-tools'),toggle=tools.firstElementChild,reset=tools.lastElementChild,columns=root.querySelector('[data-layout-columns]');
    const snapshots = {...savedSnapshots};
    const keep = tools.querySelector('[data-layout-save]');
    const restore = tools.querySelector('[data-layout-restore]');
    const nodes={timer:root.querySelector('.focus-dashboard'),stats:root.querySelector('#study-report')};for(const n of columns.querySelectorAll('[data-layout-card]'))nodes[n.dataset.layoutCard]=n;
    const homes=new Map();for(const n of Object.values(nodes).filter(Boolean)){const m=document.createComment('widget');n.before(m);homes.set(n,m)}
    let order=[...new Set([...(Array.isArray(saved?.order)?saved.order:[]),...keys])].filter(k=>keys.includes(k)&&nodes[k]);
    let layouts=structuredClone(saved?.layouts||{}),legacy=saved,grid,boxes={},observer,gesture,rects={},frame=0;
    let initialLayout = {};
    const spot=(el,r)=>{el.style.left=r.x+'px';el.style.top=r.y+'px'};
    function measure(k,width,height){const box=boxes[k];box.style.width=width+'px';box.style.setProperty('--db-h',Math.max(0,height||0)+'px');return {w:box.offsetWidth,h:box.offsetHeight}}
    function naturalMin(k){const box=boxes[k],old=box.style.width;box.classList.add('db-measure');box.style.width='min-content';const min=box.offsetWidth;box.style.width=old;box.classList.remove('db-measure');return min}
    function base(){
      const W=grid.clientWidth,mode=profile(),data=layouts[mode]||initialLayout[mode]||{};
      const wishes={},minimum={},placed={};let x=0,y=0,bottom=0;
      const reference=layouts[mode]||initialLayout[mode]||layouts.wide||layouts.compact||(mode==='compact'?legacy?.positions:null)||{};
      const readingOrder=[...order].sort((a,b)=>(reference[a]?.y??Infinity)-(reference[b]?.y??Infinity)||(reference[a]?.x??Infinity)-(reference[b]?.x??Infinity));
      for(const k of readingOrder){
        const s=data[k],v=legacy?.sizes?.[k],old=mode==='wide'&&legacy?.positions?.[k];
        const fraction=s?.width??(mode==='compact'?1:(v?.w||cards[k][1])/12);
        minimum[k]=Math.min(naturalMin(k),W);
        const size=measure(k,clamp(s?fraction*W:(W+GAP)*fraction-GAP,minimum[k],W),s?.height??v?.h);
        if(x+size.w>W+1){x=0;y=bottom+GAP}
        wishes[k]={...size,x:s?s.x*W:old?old.x*W:x,y:s?s.y:old?old.y:y};
        x+=size.w+GAP;bottom=Math.max(bottom,y+size.h);
      }
      // Percentage columns shrink their gutter as well. Recover the missing pixels
      // from the left card instead of treating its neighbour as a dragged obstacle.
      for(const k of readingOrder){
        const r=wishes[k];let limit=r.w;
        for(const q of Object.values(wishes))if(q.x>=r.x+r.w-1 && r.y<q.y+q.h && q.y<r.y+r.h)
          limit=Math.min(limit,q.x-r.x-GAP);
        if(limit<r.w-.75 && limit>=minimum[k])Object.assign(r,measure(k,Math.floor(limit+.01),data[k]?.height??legacy?.sizes?.[k]?.h));
        r.x=clamp(r.x,0,W-r.w);
      }
      // Reflow in visual row order, never search for an empty spot in another column.
      // Keep a row aligned if content above it grows; stack only if neighbours cannot fit.
      const sorted=readingOrder.sort((a,b)=>wishes[a].y-wishes[b].y||wishes[a].x-wishes[b].x);
      for(let i=0;i<sorted.length;){
        const row=[],top=wishes[sorted[i]].y;
        while(i<sorted.length && Math.abs(wishes[sorted[i]].y-top)<.5)row.push(sorted[i++]);
        let rowTop=top;
        for(const k of row)for(const p of Object.values(placed)){
          const r=wishes[k];if(r.x<p.x+p.w+GAP-.75 && p.x<r.x+r.w+GAP-.75)rowTop=Math.max(rowTop,p.y+p.h+GAP);
        }
        for(const k of row){const r={...wishes[k],y:rowTop};for(const p of Object.values(placed))if(collide(r,p))r.y=p.y+p.h+GAP;placed[k]=r}
      }
      return closeWideGaps(placed);
    }
    function draw(layout,held,dragHeight){rects=layout;for(const k of order)if(k!==held)spot(boxes[k],layout[k]);const end=Math.max(...Object.values(layout).map(r=>r.y+r.h));grid.style.height=(dragHeight ? Math.max(end,dragHeight) : end+(editing?Math.min(560,innerHeight*.65):0))+'px'}
    function refresh(){
      keep.hidden = !editing;
      restore.hidden = !editing || !snapshots[profile()];
      if(grid?.isConnected&&!gesture&&grid.clientWidth)draw(base());
    }
    function schedule(){if(!frame)frame=requestAnimationFrame(()=>{frame=0;refresh()})}
    function capture(layout) {
      const width = grid.clientWidth;
      return Object.fromEntries(order.map(k => {
        const r = layout[k];
        return [k,{x:r.x/width,y:r.y,width:r.w/width,height:parseFloat(boxes[k].style.getPropertyValue('--db-h'))||0}];
      }));
    }
    function commit(layout){
      layouts[profile()] = capture(layout);
      order.sort((a,b)=>layout[a].y-layout[b].y||layout[a].x-layout[b].x);
      save({version:2,order:[...order],layouts:structuredClone(layouts),...(legacy?.sizes?{sizes:legacy.sizes,positions:legacy.positions}:{})});
    }
    function pose(frozen,k,anchor,size,swap){const wishes={...frozen,[k]:{...anchor,...size}};return arrange(wishes,grid.clientWidth,[k,...order.filter(id=>id!==k)],swap?frozen[k]:null)}
    function start(e,pressedBox){if(!editing||e.button!==0||gesture||!e.isPrimary)return;const box=pressedBox||e.target.closest('.db-layout-card');if(!box||e.target.closest('button:not(.db-size):not(.db-grip),a,input,select,textarea,[contenteditable="true"]'))return;
      const k=box.dataset.key,resize=!!e.target.closest('.db-size');e.preventDefault();refresh();const frozen=structuredClone(rects),r=frozen[k],oldH=parseFloat(box.style.getPropertyValue('--db-h'))||0,minW=naturalMin(k),W=grid.clientWidth;
      const br=box.getBoundingClientRect(),dx=e.clientX-br.left,dy=e.clientY-br.top,startY=scrollY,mode=profile(),control=e.target.closest('button');control?.focus({preventScroll:true});
      const dragHeight=grid.clientHeight;
      let px=e.clientX,py=e.clientY,active=false,preview=frozen,scrollFrame,mark,guides,lastTarget,insertAfter;grid.setPointerCapture(e.pointerId);
      function paint(){if(!active)return;const g=grid.getBoundingClientRect(),x=px-g.left,y=py-g.top;
        if(resize){
          const dw=px-e.clientX,dh=py-e.clientY+scrollY-startY,min=Math.min(minW,W),peers=order.filter(id=>id!==k).map(id=>frozen[id]);
          const requestedW=clamp(r.w+dw,min,W-r.x),requestedH=Math.abs(dh)<1?oldH:Math.max(0,r.h+dh);
          let size=measure(k,requestedW,requestedH);
          const sx=dw&&resizeEdge({...r,...size},peers,'x',min,W-r.x);
          const width=sx?sx.size:requestedW;
          if(sx&&sx.d)size=measure(k,width,requestedH);
          const sy=Math.abs(dh)>=1&&resizeEdge({...r,...size},peers,'y',1,Infinity);
          if(sy&&sy.d)size=measure(k,width,sy.size);
          preview=pose(frozen,k,r,size,false);draw(preview);box.dataset.measure=`${size.w} × ${size.h}`;
          // Recheck after reflow: never draw a matching edge that the user can't see.
          const actual=preview[k],adjacent=order.filter(id=>id!==k).map(id=>preview[id]);
          guides.show(['x','y'].flatMap(axis=>guideLines(actual,adjacent,axis,resizeEdge(actual,adjacent,axis,0,Infinity,.51))));
          return;
        }
        const raw = {...r, x:clamp(x-dx,0,W-r.w), y:clamp(y-dy,0,Math.max(0,dragHeight-r.h))};
        const others = order.filter(id => id !== k).map(id => frozen[id]);
        // An inset hit area prevents a neighbour stealing the drop at a shared edge.
        const target = order.find(id => {
          if (id === k) return false;
          const p = frozen[id], insetX = Math.min(16,p.w*.1), insetY = Math.min(14,p.h*.12);
          return x >= p.x+insetX && x <= p.x+p.w-insetX && y >= p.y+insetY && y <= p.y+p.h-insetY;
        });
        const sx = !target && snapAxis(raw,others,'x',W);
        const sy = !target && snapAxis(raw,others,'y',W);
        const anchor = target ? frozen[target] : freeDrop(raw,others,W,sx,sy);
        let insertion = null;
        if (target) {
          const p = frozen[target];
          // When dragging down, crossing into the next card advances the widget.
          // Near the middle, retain that choice until the pointer clearly crosses back.
          const midpoint = p.y + p.h/2;
          if (target !== lastTarget) insertAfter = Math.abs(y-midpoint)<10 ? r.y<p.y : y>=midpoint;
          else if (Math.abs(y-midpoint)>10) insertAfter = y>=midpoint;
          insertion = insertInLane(frozen,k,target,insertAfter,W);
        }
        lastTarget = target;
        preview = insertion || pose(frozen,k,anchor,{w:r.w,h:r.h},Boolean(target));
        draw(preview,k,dragHeight);
        spot(box,raw);
        spot(mark,preview[k]);
        const adjacent=order.filter(id=>id!==k).map(id=>preview[id]);
        const close=!target||(Math.abs(raw.x-preview[k].x)<=SNAP&&Math.abs(raw.y-preview[k].y)<=SNAP);
        guides.show(close?[...guideLines(preview[k],adjacent,'x',sx),...guideLines(preview[k],adjacent,'y',sy)]:[]);
      }
      function tick(){if(!grid?.isConnected||mode!==profile()||grid.clientWidth!==W){finish(false);return}const step=py<50?-Math.ceil((50-py)/4):py>innerHeight-50?Math.ceil((py-innerHeight+50)/4):0;if(active&&step){const prev=scrollY;window.scrollBy({top:clamp(step,-22,22),behavior:'instant'});if(scrollY!==prev)paint()}scrollFrame=requestAnimationFrame(tick)}
      function move(p){if(p.pointerId!==e.pointerId)return;px=p.clientX;py=p.clientY;if(!active&&Math.hypot(px-e.clientX,py-e.clientY)<4)return;
        if(!active){active=true;box.classList.add(resize?'db-sizing':'db-held');guides=guideOverlay(grid);if(!resize){mark=document.createElement('div');mark.className='db-drop-mark';mark.style.width=r.w+'px';mark.style.height=r.h+'px';grid.append(mark)}}paint()}
      function finish(keep){if(!gesture)return;gesture=null;cancelAnimationFrame(scrollFrame);grid.onpointermove=grid.onpointerup=grid.onpointercancel=grid.onlostpointercapture=null;window.removeEventListener('keydown',escape);if(grid.hasPointerCapture(e.pointerId))grid.releasePointerCapture(e.pointerId);mark?.remove();guides?.remove();box.classList.remove('db-held','db-sizing');delete box.dataset.measure;
        if(keep&&active&&mode===profile()&&grid.clientWidth===W){
          const released=box.getBoundingClientRect();
          commit(preview);refresh();
          if(!resize&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
            const end=box.getBoundingClientRect();
            box.animate([{transform:`translate(${released.left-end.left}px,${released.top-end.top}px)`},{transform:'none'}],{duration:180,easing:'cubic-bezier(.2,.75,.3,1)'});
          }
        }else{measure(k,r.w,oldH);refresh()}}
      function escape(p){if(p.key==='Escape')finish(false)}gesture=()=>finish(false);window.addEventListener('keydown',escape);grid.onpointermove=move;grid.onpointerup=p=>{if(p.pointerId===e.pointerId){move(p);finish(true)}};grid.onlostpointercapture=grid.onpointercancel=p=>{if(p.pointerId===e.pointerId)finish(false)};scrollFrame=requestAnimationFrame(tick);
    }
    function keyboard(e){const btn=e.target.closest('.db-size,.db-grip');if(!btn||!editing||gesture||!/^Arrow(Left|Right|Up|Down)$/.test(e.key))return;e.preventDefault();refresh();const k=btn.parentElement.dataset.key,r=rects[k],dx=(e.key==='ArrowRight')-(e.key==='ArrowLeft'),dy=(e.key==='ArrowDown')-(e.key==='ArrowUp');let next;
      if(btn.classList.contains('db-size')){const size=measure(k,clamp(r.w+dx*12,Math.min(naturalMin(k),grid.clientWidth),grid.clientWidth),dy?Math.max(0,r.h+dy*12):parseFloat(boxes[k].style.getPropertyValue('--db-h')));next=pose(rects,k,r,size,false)}
      else{const other=order[order.indexOf(k)+dx+dy];if(!other)return;next=pose(rects,k,rects[other],{w:r.w,h:r.h},true)}commit(next);refresh();}
    function mount(){if(grid)return;
      if (!legacy && !Object.keys(layouts).length) {
        const bounds = {};
        for (const k of order) {
          // Entrance animations can transform the painted box during a long press.
          let top = 0, left = 0;
          for (let n = nodes[k]; n; n = n.offsetParent) {
            top += n.offsetTop;
            left += n.offsetLeft;
          }
          bounds[k] = {top,left,width:nodes[k].offsetWidth};
        }
        const origin = bounds.timer;
        if (origin.width) initialLayout[profile()] = Object.fromEntries(order.map(k => {
          const b = bounds[k];
          return [k,{x:(b.left-origin.left)/origin.width,y:b.top-origin.top,width:b.width/origin.width,height:0}];
        }));
      }
      grid=document.createElement('div');grid.className='db-layout-grid';tools.after(grid);columns.hidden=true;
      for(const k of order){const b=document.createElement('div');b.className='db-layout-card';b.dataset.key=k;b.innerHTML=`<button type="button" class="db-grip" aria-label="${cards[k][0]}: joyini o‘zgartirish" title="Sudrang yoki strelkalarni bosing">⠿ ${cards[k][0]}</button><div class="db-content"></div><button type="button" class="db-size" aria-label="${cards[k][0]}: o‘lchamini o‘zgartirish" title="Sudrang yoki strelkalarni bosing">⤡</button>`;b.children[1].append(nodes[k]);grid.append(b);boxes[k]=b}
      grid.onpointerdown=start;grid.onkeydown=keyboard;grid.ondragstart=e=>{if(editing)e.preventDefault()};observer=new ResizeObserver(schedule);observer.observe(grid);Object.values(nodes).filter(Boolean).forEach(n=>observer.observe(n));}
    // A deliberate hold on the card body enters editing. A tap, a scroll or a
    // press on a learning control keeps its usual behavior.
    let stopHold=()=>{};
    // Touch-action is resolved at touchstart, before a long press can open the editor.
    // Only consume a move once that hold has actually captured a card.
    const blockCapturedPan=e=>{if(gesture&&e.cancelable)e.preventDefault()};
    root.addEventListener('touchmove',blockCapturedPan,{passive:false});
    const hold=e=>{
      if(editing||!e.isPrimary||e.button!==0||e.target.closest('button,a,input,select,textarea,[contenteditable="true"]'))return;
      const k=order.find(id=>nodes[id].contains(e.target));if(!k)return;stopHold();
      const moved=p=>{if(p.pointerId===e.pointerId&&Math.hypot(p.clientX-e.clientX,p.clientY-e.clientY)>6)stopHold()};
      const timer=setTimeout(()=>{stopHold();if(!tools.isConnected)return;editing=true;sync();start(e,boxes[k])},420);
      stopHold=()=>{clearTimeout(timer);window.removeEventListener('pointermove',moved);for(const name of ['pointerup','pointercancel','scroll','blur'])window.removeEventListener(name,stopHold,true);stopHold=()=>{}};
      window.addEventListener('pointermove',moved);for(const name of ['pointerup','pointercancel','scroll','blur'])window.addEventListener(name,stopHold,true);
    };
    root.addEventListener('pointerdown',hold);
    const stopGrid=()=>{gesture?.();observer?.disconnect();cancelAnimationFrame(frame);frame=0};
    dispose=()=>{stopHold();root.removeEventListener('pointerdown',hold);root.removeEventListener('touchmove',blockCapturedPan);stopGrid()};
    function sync(){if(editing||legacy||Object.keys(layouts).length)mount();else if(grid){stopGrid();for(const [n,m] of homes)m.after(n);grid.remove();grid=null;boxes={};columns.hidden=false}grid?.classList.toggle('db-editing',editing);refresh();toggle.textContent=editing?'Tayyor':'Joylashuvni sozlash';toggle.setAttribute('aria-pressed',String(editing));reset.hidden=!editing}
    keep.onclick = () => {
      if (!editing || gesture) return;
      refresh();
      const mode = profile();
      snapshots[mode] = capture(rects);
      saveSnapshot(mode,snapshots[mode]);
      restore.hidden = false;
      showToast('Kartalarning joyi va o‘lchami saqlandi.');
    };
    restore.onclick = () => {
      const mode = profile();
      if (!editing || gesture || !snapshots[mode]) return;
      layouts[mode] = structuredClone(snapshots[mode]);
      refresh();
      commit(rects);
      showToast('Saqlangan joylashuv qaytarildi.');
    };
    toggle.onclick=()=>{editing=!editing;sync()};reset.onclick=()=>{editing=false;legacy=null;layouts={};order=keys.filter(k=>nodes[k]);save(null);sync();toggle.focus()};sync();
  };
})();
