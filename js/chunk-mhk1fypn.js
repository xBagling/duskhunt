import{s,e,l,a,u,o,d,c,b,P,j,I,i,_,m,t,h,p,g,y,w,x,T,G,k,H,N,M,D,L,F,r}from"./app-xrm3t3pb.js";function Ft({hero:W,view:v,day:V}){if(p("strip"),h(0),y(!1),w(!1),g(null,"hidden"),W.innerHTML=`<div class="page-head"><h1>Keeper's office</h1><p>Admin · pick any day, test it, tune it</p></div>`,!r.unlocked)return gt(v);let R=c(),Q=i.area,B=(n)=>k(n,Q),E=Number.isInteger(V)&&V>=1?V:R,it=[],z=null;v.innerHTML=`<div class="wrap">
    <div class="row" style="justify-content:flex-end;margin:14px 0"><button class="btn btn-small" type="button" id="lock">${t("lock")} Lock</button></div>

    <section class="card">
      <h2>Scene preview</h2>
      <p class="muted" style="font-size:14px;margin:0 0 10px">See every time of day and scene moment. Scroll up to look.</p>
      <div class="scene-btns" id="scene-btns">
        ${["Noon","Afternoon","Golden","Sunset","Dusk","Night"].map((n,f)=>`<button class="btn btn-small" type="button" data-t="${f}">${n}</button>`).join("")}
        <button class="btn btn-small" type="button" data-fx="peek">Animal peeks</button>
        <button class="btn btn-small" type="button" data-fx="full">Animal steps out</button>
        <button class="btn btn-small" type="button" data-fx="eyes">Eyes in the dark</button>
        <button class="btn btn-small" type="button" data-fx="lantern">Lantern</button>
        <button class="btn btn-small" type="button" data-fx="win" data-level="legend">Win: 1st try</button>
        <button class="btn btn-small" type="button" data-fx="win" data-level="great">Win: 2nd–3rd</button>
        <button class="btn btn-small" type="button" data-fx="win" data-level="good">Win: 4th</button>
        <button class="btn btn-small" type="button" data-fx="win" data-level="phew">Win: dusk/night</button>
        <button class="btn btn-small" type="button" data-fx="lose">Got away</button>
        <button class="btn btn-small" type="button" data-fx="tall">Tall scene</button>
      </div>
    </section>

    <section class="card">
      <h2>Pick any day</h2>
      <div style="margin-bottom:12px">${M()}</div>
      <div class="row wrap-row">
        <label class="field grow">Puzzle #<input type="number" id="day-num" min="1" step="1" /></label>
        <label class="field grow">Date<input type="date" id="day-date" /></label>
      </div>
      <div class="row wrap-row" style="margin-top:10px">
        <button class="btn btn-small" type="button" id="prev">‹ Prev</button>
        <button class="btn btn-small" type="button" id="today">Today (#${R})</button>
        <button class="btn btn-small" type="button" id="next">Next ›</button>
      </div>
      <dl class="kv" id="day-info" style="margin:14px 0"></dl>
      <div class="row wrap-row" id="day-actions"></div>
      <div id="accept-box" style="margin-top:16px"></div>
    </section>

    <section class="card">
      <h2>Settings</h2>
      <label class="toggle"><input type="checkbox" id="opt-reveal" /> Show the answer while test playing</label>
      <label class="toggle"><input type="checkbox" id="opt-sample" /> Use a sample crowd for stats (preview only, in this tab)</label>
    </section>

    <section class="card">
      <h2>Sound lab</h2>
      <p class="muted" style="font-size:14px">Pick which part of the recording is played. The game uses the loudest ${s.CLIP_SECONDS}s automatically unless you paste an override into <code>answers.js</code>.</p>
      <canvas class="wave" id="wave"></canvas>
      <div class="row wrap-row" style="margin:10px 0">
        <label class="field grow">Start: <span id="start-out">0</span>s<input type="range" id="start" min="0" max="10" step="0.05" value="0" /></label>
        <label class="field grow">Length: <span id="len-out">3</span>s<input type="range" id="len" min="1" max="6" step="0.25" value="3" /></label>
      </div>
      <div class="row wrap-row" id="lab-play"></div>
      <pre class="code" id="lab-code"></pre>
      <div class="row wrap-row"><button class="btn btn-small" type="button" id="lab-copy">${t("copy")} Copy override</button><button class="btn btn-small" type="button" id="lab-auto">${t("replay")} Back to auto</button></div>
      <p class="credit" id="lab-credit"></p>
    </section>

    <section class="card">
      <h2>Global stats for this day</h2>
      <pre class="code" id="server-stats">…</pre>
    </section>

    <section class="card">
      <h2>Schedule</h2>
      <p class="muted" style="font-size:14px">${G} days are scheduled, then the list repeats. Regenerate it with <code>bun tools/build-schedule.mjs</code>.</p>
      <label class="field" style="margin-bottom:10px">Filter<input type="text" id="sched-filter" placeholder="owl, frog, #40…" /></label>
      <div class="table-wrap"><table class="schedule"><thead><tr><th>#</th><th>Date</th><th>Animal</th><th>Level</th></tr></thead><tbody id="sched-body"></tbody></table></div>
    </section>

    <section class="card">
      <h2>Your local data</h2>
      <dl class="kv"><dt>Player id</dt><dd><code>${a(i.player)}</code></dd></dl>
      <div class="row wrap-row" style="margin-top:10px">
        <button class="btn btn-small" type="button" id="export">${t("copy")} Copy local data</button>
        <button class="btn btn-small" type="button" id="wipe">Reset all local data</button>
      </div>
    </section></div>`;let dt=!1;e("#scene-btns",v).addEventListener("click",(n)=>{let f=n.target.closest("button");if(!f)return;let S=B(E);if(f.dataset.t)h(Number(f.dataset.t));if(f.dataset.fx==="peek")g(S.animal,"peek");if(f.dataset.fx==="full")g(S.animal,"full");if(f.dataset.fx==="eyes")y(!1),requestAnimationFrame(()=>y(!0));if(f.dataset.fx==="lantern")w(!document.querySelector(".lamp-lit"));if(f.dataset.fx==="win")D(f.dataset.level,{x:innerWidth/2,y:innerHeight*0.45}),setTimeout(()=>L(f.dataset.level),1500);if(f.dataset.fx==="lose")F();if(f.dataset.fx==="tall")p((dt=!dt)?"tall":"strip");window.scrollTo({top:0,behavior:"smooth"})});let at=e("#day-num",v),X=e("#day-date",v),nt=e("#opt-reveal",v),st=e("#opt-sample",v);nt.checked=r.prefs.revealAnswer,st.checked=r.prefs.sampleCrowd,nt.addEventListener("change",()=>r.setPref("revealAnswer",nt.checked)),st.addEventListener("change",()=>r.setPref("sampleCrowd",st.checked));function O(n){if(!Number.isInteger(n)||n<1)return;E=n,history.replaceState(null,"",`#/admin/${n}`),lt(),rt(),ft(),mt()}function lt(){let n=B(E);at.value=E,X.value=P(E);let f=E===R?"today":E<R?`${R-E} days ago`:`in ${E-R} days`;e("#day-info",v).innerHTML=u`
      <dt>Date</dt><dd>${b(E,{weekday:"long",year:"numeric",month:"long",day:"numeric"})} (${f})</dd>
      <dt>Animal</dt><dd>${o(m(n.animal,"inline"))} ${n.animal.name} <span class="muted">· ${n.sci}</span></dd>
      <dt>Class</dt><dd>${n.animal.cls.label} · ${n.animal.family.label}</dd>
      <dt>Level</dt><dd>${"★".repeat(n.difficulty)}${"☆".repeat(3-n.difficulty)}</dd>`;let S=i.game(E,Q),C=E===R?"#/":E<R?`#/day/${E}`:null;e("#day-actions",v).innerHTML=`
      <a class="btn btn-primary" href="#/admin/play/${E}">${t("play")} Test play this day</a>
      ${C?`<a class="btn" href="${C}">Open as a player</a>`:`<span class="muted" style="font-size:13px">Players can't open future days.</span>`}
      ${S?`<button class="btn btn-small" type="button" id="reset-real">Reset my real game for #${E}</button>`:""}`,bt(n),e("#reset-real",v)?.addEventListener("click",()=>{i.deleteGame(E,Q),d(`Your game for #${E} was reset`),lt()})}function bt(n){let f=e("#accept-box",v),S=N(n.id);if(!S.length){f.innerHTML='<p class="muted" style="font-size:13px;margin:0">No lookalike species for this animal, so there is nothing to accept as close enough.</p>';return}let C=new Set(H(n.id));f.innerHTML=u`<div class="kicker" style="margin-bottom:6px">Close enough (normal mode)</div>
      <p class="muted" style="font-size:13px;margin:0 0 8px">Tick the species that sound the same as this recording. They count as found. The rest still get "right kind", and the first of those is free.</p>
      ${o(S.map((A)=>`<label class="toggle"><input type="checkbox" value="${A.id}" ${C.has(A.id)?"checked":""}> ${a(A.name)}</label>`).join(""))}
      <div class="row wrap-row" style="margin-top:8px"><button class="btn btn-small" type="button" id="accept-copy">${o(t("copy"))} Copy accept line</button></div>`,e("#accept-copy",v).addEventListener("click",async()=>{let A=e("#accept-box input:checked",v).map((q)=>q.value),Y=`"accept": ${JSON.stringify(A)},`;try{await navigator.clipboard.writeText(Y),d(`Copied. Paste it into answers.js under "${n.id}"`)}catch{prompt(`Paste this into answers.js under "${n.id}":`,Y)}})}function rt(){let n=e("#sched-filter",v).value.trim().toLowerCase().replace(/^#/,""),f=Math.max(R+60,G,E+10),S=[];for(let C=1;C<=f;C++){let A=B(C);if(n&&!String(C).startsWith(n)&&!A.animal.name.toLowerCase().includes(n))continue;S.push(`<tr data-day="${C}" class="${C===R?"is-today":""} ${C===E?"is-selected":""}">
        <td>${C}</td><td>${a(b(C))}</td><td>${a(A.animal.name)}</td><td>${"★".repeat(A.difficulty)}</td></tr>`)}e("#sched-body",v).innerHTML=S.join("")}async function mt(){let n=e("#server-stats",v);if(E>R+1){n.textContent="This day hasn't happened yet, so there are no stats.";return}n.textContent="Loading…";let f=await _(E,Q);n.textContent=f?JSON.stringify(f,null,1):"No stats server reachable (or stats are off in config.js)."}let Z=e("#wave",v),J=e("#start",v),K=e("#len",v);function ot(){return{start:Number(J.value),len:Number(K.value)}}function yt(){if(!z)return;let n=window.devicePixelRatio||1,{width:f,height:S}=Z.getBoundingClientRect();Z.width=f*n,Z.height=S*n;let C=Z.getContext("2d");C.scale(n,n);let A=getComputedStyle(document.documentElement),Y=z.base.envelope(Math.floor(f)),q=z.base.buffer.duration,{start:ct,len:pt}=ot();C.fillStyle=A.getPropertyValue("--yellow-soft"),C.fillRect(ct/q*f,0,pt/q*f,S),C.fillStyle=A.getPropertyValue("--green");let ht=S/2;for(let et=0;et<Y.length;et++){let ut=Math.max(1,Y[et]*(S-8));C.fillRect(et,ht-ut/2,1,ut)}C.strokeStyle=A.getPropertyValue("--ink"),C.lineWidth=2,C.strokeRect(ct/q*f+1,1,pt/q*f-2,S-2)}function tt(){let n=B(E),{start:f,len:S}=ot();e("#start-out",v).textContent=f.toFixed(2),e("#len-out",v).textContent=S.toFixed(2),e("#lab-code",v).textContent=`// answers.js → "${n.id}" → sound
start: ${f.toFixed(2)}, len: ${S.toFixed(2)},`,yt()}async function ft(){z?.clip?.stop(),z=null;let n=B(E);e("#lab-credit",v).innerHTML=u`${n.sound.credit} · ${n.sound.license} · <a href="${n.sound.page}" target="_blank" rel="noopener">open on Wikimedia Commons</a>`,e("#lab-play",v).innerHTML='<span class="muted">Loading sound…</span>';try{let f=await x(n.sound);if(E!==n.day)return;z={base:f,clip:null},J.max=Math.max(0,f.buffer.duration-0.5).toFixed(2),K.max=Math.min(8,f.buffer.duration).toFixed(2),J.value=f.start.toFixed(2),K.value=f.len.toFixed(2),e("#lab-play",v).innerHTML=s.SPEEDS.slice(0,4).map((S)=>`<button class="btn btn-small" type="button" data-lab-speed="${S}">Play ${I(S)}</button>`).join("")+`<button class="btn btn-small" type="button" id="lab-stop">Stop</button>
        <span class="muted" style="font-size:13px">Recording is ${f.buffer.duration.toFixed(1)}s long</span>`,l("[data-lab-speed]",v).forEach((S)=>S.addEventListener("click",()=>{z.clip?.stop();let C=new T(f.buffer,{...n.sound,...ot()});z.clip=C,C.allReady.then(()=>z?.clip===C&&C.play(Number(S.dataset.labSpeed)))})),e("#lab-stop",v).addEventListener("click",()=>z?.clip?.stop()),tt()}catch(f){e("#lab-play",v).innerHTML=`<span class="muted">Couldn't load this sound (${a(f.message)}).</span>`}}J.addEventListener("input",tt),K.addEventListener("input",tt),e("#lab-copy",v).addEventListener("click",()=>navigator.clipboard.writeText(e("#lab-code",v).textContent).then(()=>d("Copied"))),e("#lab-auto",v).addEventListener("click",()=>{if(!z)return;let n=new T(z.base.buffer,{...B(E).sound,start:void 0,len:void 0});J.value=n.start.toFixed(2),K.value=n.len.toFixed(2),tt()}),it.push(()=>z?.clip?.stop()),at.addEventListener("change",()=>O(Number(at.value))),X.addEventListener("change",()=>X.value&&O(j(X.value))),e("#prev",v).addEventListener("click",()=>O(E-1)),e("#next",v).addEventListener("click",()=>O(E+1)),e("#today",v).addEventListener("click",()=>O(R)),e("#sched-filter",v).addEventListener("input",rt),e("#sched-body",v).addEventListener("click",(n)=>{let f=n.target.closest("tr[data-day]");if(f)O(Number(f.dataset.day)),v.scrollIntoView({behavior:"smooth"})}),e("#lock",v).addEventListener("click",()=>{r.lock(),location.hash="#/"}),e("#export",v).addEventListener("click",()=>navigator.clipboard.writeText(i.exportJson()).then(()=>d("Local data copied")));let U=null;return e("#wipe",v).addEventListener("click",(n)=>{let f=n.currentTarget;if(!U){f.textContent="Tap again to erase everything",f.classList.add("btn-primary"),U=setTimeout(()=>{U=null,f.textContent="Reset all local data",f.classList.remove("btn-primary")},3000);return}clearTimeout(U),U=null,f.textContent="Reset all local data",f.classList.remove("btn-primary"),i.reset(),d("Local data erased"),lt()}),O(E),()=>it.forEach((n)=>n())}function gt(W){W.innerHTML=`
    <div class="wrap"><section class="card" style="max-width:380px;margin:24px auto">
      <h2>Keepers only</h2>
      <p class="muted">Enter the admin passcode.</p>
      <form id="unlock" class="field">
        <input type="password" id="pass" autocomplete="current-password" aria-label="Passcode" required />
        <p id="pass-error" style="color:var(--accent);min-height:1.2em;margin:4px 0;font-size:13px"></p>
        <button class="btn btn-primary btn-block" type="submit">Unlock</button>
      </form>
    </section></div>`;let v=e("#pass",W);v.focus(),v.addEventListener("input",()=>e("#pass-error",W).textContent=""),e("#unlock",W).addEventListener("submit",async(V)=>{if(V.preventDefault(),!v.value){e("#pass-error",W).textContent="Enter the passcode first";return}if(await r.unlock(v.value))window.dispatchEvent(new Event("hashchange"));else e("#pass-error",W).textContent="That's not it. Try again",v.select()})}export{Ft as renderAdmin};

//# debugId=0D17E82188B79F9964756E2164756E21
//# sourceMappingURL=chunk-mhk1fypn.js.map
