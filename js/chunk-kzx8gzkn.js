import{n,e,l,a,d,o,c,p,w,L,j,W,t,_,i,u,h,m,g,f,x,A,F,b,G,I,k,T,E,D,s}from"./app-y43yxmns.js";function Mt({hero:H,view:v,day:q}){if(h("strip"),u(0),g(!1),f(!1),m("","hidden"),H.innerHTML=`<div class="page-head"><h1>Keeper's office</h1><p>Admin · pick any day, test it, tune it</p></div>`,!s.unlocked)return ht(v);let z=p(),Y=t.area,O=(r)=>b(r,Y),C=Number.isInteger(q)&&q>=1?q:z,lt=[],P=null;v.innerHTML=`<div class="wrap">
    <div class="row" style="justify-content:flex-end;margin:14px 0"><button class="btn btn-small" type="button" id="lock">${i("lock")} Lock</button></div>

    <section class="card">
      <h2>Scene preview</h2>
      <p class="muted" style="font-size:14px;margin:0 0 10px">See every time of day and scene moment. Scroll up to look.</p>
      <div class="scene-btns" id="scene-btns">
        ${["Noon","Afternoon","Golden","Sunset","Dusk","Night"].map((r,y)=>`<button class="btn btn-small" type="button" data-t="${y}">${r}</button>`).join("")}
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
      <div style="margin-bottom:12px">${k()}</div>
      <div class="row wrap-row">
        <label class="field grow">Puzzle #<input type="number" id="day-num" min="1" step="1" /></label>
        <label class="field grow">Date<input type="date" id="day-date" /></label>
      </div>
      <div class="row wrap-row" style="margin-top:10px">
        <button class="btn btn-small" type="button" id="prev">‹ Prev</button>
        <button class="btn btn-small" type="button" id="today">Today (#${z})</button>
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
      <p class="muted" style="font-size:14px">Pick which part of the recording is played. The game uses the loudest ${n.CLIP_SECONDS}s automatically unless you paste an override into <code>answers.js</code>.</p>
      <canvas class="wave" id="wave"></canvas>
      <div class="row wrap-row" style="margin:10px 0">
        <label class="field grow">Start: <span id="start-out">0</span>s<input type="range" id="start" min="0" max="10" step="0.05" value="0" /></label>
        <label class="field grow">Length: <span id="len-out">3</span>s<input type="range" id="len" min="1" max="6" step="0.25" value="3" /></label>
      </div>
      <div class="row wrap-row" id="lab-play"></div>
      <pre class="code" id="lab-code"></pre>
      <div class="row wrap-row"><button class="btn btn-small" type="button" id="lab-copy">${i("copy")} Copy override</button><button class="btn btn-small" type="button" id="lab-auto">${i("replay")} Back to auto</button></div>
      <p class="credit" id="lab-credit"></p>
    </section>

    <section class="card">
      <h2>Global stats for this day</h2>
      <pre class="code" id="server-stats">…</pre>
    </section>

    <section class="card">
      <h2>Schedule</h2>
      <p class="muted" style="font-size:14px">${F} days are scheduled, then the list repeats. Regenerate it with <code>bun tools/build-schedule.mjs</code>.</p>
      <label class="field" style="margin-bottom:10px">Filter<input type="text" id="sched-filter" placeholder="owl, frog, #40…" /></label>
      <div class="table-wrap"><table class="schedule"><thead><tr><th>#</th><th>Date</th><th>Animal</th><th>Level</th></tr></thead><tbody id="sched-body"></tbody></table></div>
    </section>

    <section class="card">
      <h2>Your local data</h2>
      <dl class="kv"><dt>Player id</dt><dd><code>${a(t.player)}</code></dd></dl>
      <div class="row wrap-row" style="margin-top:10px">
        <button class="btn btn-small" type="button" id="export">${i("copy")} Copy local data</button>
        <button class="btn btn-small" type="button" id="wipe">Reset all local data</button>
      </div>
    </section></div>`;let it=!1;e("#scene-btns",v).addEventListener("click",(r)=>{let y=r.target.closest("button");if(!y)return;let M=O(C);if(y.dataset.t)u(Number(y.dataset.t));if(y.dataset.fx==="peek")m(M.animal.emoji,"peek");if(y.dataset.fx==="full")m(M.animal.emoji,"full");if(y.dataset.fx==="eyes")g(!1),requestAnimationFrame(()=>g(!0));if(y.dataset.fx==="lantern")f(!document.querySelector(".lamp-lit"));if(y.dataset.fx==="win")T(y.dataset.level,{x:innerWidth/2,y:innerHeight*0.45}),setTimeout(()=>E(y.dataset.level),1500);if(y.dataset.fx==="lose")D();if(y.dataset.fx==="tall")h((it=!it)?"tall":"strip");window.scrollTo({top:0,behavior:"smooth"})});let et=e("#day-num",v),Q=e("#day-date",v),at=e("#opt-reveal",v),nt=e("#opt-sample",v);at.checked=s.prefs.revealAnswer,nt.checked=s.prefs.sampleCrowd,at.addEventListener("change",()=>s.setPref("revealAnswer",at.checked)),nt.addEventListener("change",()=>s.setPref("sampleCrowd",nt.checked));function R(r){if(!Number.isInteger(r)||r<1)return;C=r,history.replaceState(null,"",`#/admin/${r}`),st(),dt(),yt(),bt()}function st(){let r=O(C);et.value=C,Q.value=L(C);let y=C===z?"today":C<z?`${z-C} days ago`:`in ${C-z} days`;e("#day-info",v).innerHTML=d`
      <dt>Date</dt><dd>${w(C,{weekday:"long",year:"numeric",month:"long",day:"numeric"})} (${y})</dd>
      <dt>Animal</dt><dd>${r.animal.emoji} ${r.animal.name} <span class="muted">· ${r.sci}</span></dd>
      <dt>Class</dt><dd>${r.animal.cls.label} · ${r.animal.family.label}</dd>
      <dt>Level</dt><dd>${"★".repeat(r.difficulty)}${"☆".repeat(3-r.difficulty)}</dd>`;let M=t.game(C,Y),S=C===z?"#/":C<z?`#/day/${C}`:null;e("#day-actions",v).innerHTML=`
      <a class="btn btn-primary" href="#/admin/play/${C}">${i("play")} Test play this day</a>
      ${S?`<a class="btn" href="${S}">Open as a player</a>`:`<span class="muted" style="font-size:13px">Players can't open future days.</span>`}
      ${M?`<button class="btn btn-small" type="button" id="reset-real">Reset my real game for #${C}</button>`:""}`,ut(r),e("#reset-real",v)?.addEventListener("click",()=>{t.deleteGame(C,Y),c(`Your game for #${C} was reset`),st()})}function ut(r){let y=e("#accept-box",v),M=I(r.id);if(!M.length){y.innerHTML='<p class="muted" style="font-size:13px;margin:0">No lookalike species for this animal, so there is nothing to accept as close enough.</p>';return}let S=new Set(G(r.id));y.innerHTML=d`<div class="kicker" style="margin-bottom:6px">Close enough (normal mode)</div>
      <p class="muted" style="font-size:13px;margin:0 0 8px">Tick the species that sound the same as this recording. They count as found. The rest still get "right kind", and the first of those is free.</p>
      ${o(M.map((N)=>`<label class="toggle"><input type="checkbox" value="${N.id}" ${S.has(N.id)?"checked":""}> ${a(N.name)}</label>`).join(""))}
      <div class="row wrap-row" style="margin-top:8px"><button class="btn btn-small" type="button" id="accept-copy">${o(i("copy"))} Copy accept line</button></div>`,e("#accept-copy",v).addEventListener("click",async()=>{let N=e("#accept-box input:checked",v).map((B)=>B.value),U=`"accept": ${JSON.stringify(N)},`;try{await navigator.clipboard.writeText(U),c(`Copied. Paste it into answers.js under "${r.id}"`)}catch{prompt(`Paste this into answers.js under "${r.id}":`,U)}})}function dt(){let r=e("#sched-filter",v).value.trim().toLowerCase().replace(/^#/,""),y=Math.max(z+60,F,C+10),M=[];for(let S=1;S<=y;S++){let N=O(S);if(r&&!String(S).startsWith(r)&&!N.animal.name.toLowerCase().includes(r))continue;M.push(`<tr data-day="${S}" class="${S===z?"is-today":""} ${S===C?"is-selected":""}">
        <td>${S}</td><td>${a(w(S))}</td><td>${a(N.animal.emoji)} ${a(N.animal.name)}</td><td>${"★".repeat(N.difficulty)}</td></tr>`)}e("#sched-body",v).innerHTML=M.join("")}async function bt(){let r=e("#server-stats",v);if(C>z+1){r.textContent="This day hasn't happened yet, so there are no stats.";return}r.textContent="Loading…";let y=await _(C,Y);r.textContent=y?JSON.stringify(y,null,1):"No stats server reachable (or stats are off in config.js)."}let X=e("#wave",v),V=e("#start",v),J=e("#len",v);function ot(){return{start:Number(V.value),len:Number(J.value)}}function mt(){if(!P)return;let r=window.devicePixelRatio||1,{width:y,height:M}=X.getBoundingClientRect();X.width=y*r,X.height=M*r;let S=X.getContext("2d");S.scale(r,r);let N=getComputedStyle(document.documentElement),U=P.base.envelope(Math.floor(y)),B=P.base.buffer.duration,{start:rt,len:ct}=ot();S.fillStyle=N.getPropertyValue("--yellow-soft"),S.fillRect(rt/B*y,0,ct/B*y,M),S.fillStyle=N.getPropertyValue("--green");let ft=M/2;for(let tt=0;tt<U.length;tt++){let pt=Math.max(1,U[tt]*(M-8));S.fillRect(tt,ft-pt/2,1,pt)}S.strokeStyle=N.getPropertyValue("--ink"),S.lineWidth=2,S.strokeRect(rt/B*y+1,1,ct/B*y-2,M-2)}function Z(){let r=O(C),{start:y,len:M}=ot();e("#start-out",v).textContent=y.toFixed(2),e("#len-out",v).textContent=M.toFixed(2),e("#lab-code",v).textContent=`// answers.js → "${r.id}" → sound
start: ${y.toFixed(2)}, len: ${M.toFixed(2)},`,mt()}async function yt(){P?.clip?.stop(),P=null;let r=O(C);e("#lab-credit",v).innerHTML=d`${r.sound.credit} · ${r.sound.license} · <a href="${r.sound.page}" target="_blank" rel="noopener">open on Wikimedia Commons</a>`,e("#lab-play",v).innerHTML='<span class="muted">Loading sound…</span>';try{let y=await x(r.sound);if(C!==r.day)return;P={base:y,clip:null},V.max=Math.max(0,y.buffer.duration-0.5).toFixed(2),J.max=Math.min(8,y.buffer.duration).toFixed(2),V.value=y.start.toFixed(2),J.value=y.len.toFixed(2),e("#lab-play",v).innerHTML=n.SPEEDS.slice(0,4).map((M)=>`<button class="btn btn-small" type="button" data-lab-speed="${M}">Play ${W(M)}</button>`).join("")+`<button class="btn btn-small" type="button" id="lab-stop">Stop</button>
        <span class="muted" style="font-size:13px">Recording is ${y.buffer.duration.toFixed(1)}s long</span>`,l("[data-lab-speed]",v).forEach((M)=>M.addEventListener("click",()=>{P.clip?.stop();let S=new A(y.buffer,{...r.sound,...ot()});P.clip=S,S.allReady.then(()=>P?.clip===S&&S.play(Number(M.dataset.labSpeed)))})),e("#lab-stop",v).addEventListener("click",()=>P?.clip?.stop()),Z()}catch(y){e("#lab-play",v).innerHTML=`<span class="muted">Couldn't load this sound (${a(y.message)}).</span>`}}V.addEventListener("input",Z),J.addEventListener("input",Z),e("#lab-copy",v).addEventListener("click",()=>navigator.clipboard.writeText(e("#lab-code",v).textContent).then(()=>c("Copied"))),e("#lab-auto",v).addEventListener("click",()=>{if(!P)return;let r=new A(P.base.buffer,{...O(C).sound,start:void 0,len:void 0});V.value=r.start.toFixed(2),J.value=r.len.toFixed(2),Z()}),lt.push(()=>P?.clip?.stop()),et.addEventListener("change",()=>R(Number(et.value))),Q.addEventListener("change",()=>Q.value&&R(j(Q.value))),e("#prev",v).addEventListener("click",()=>R(C-1)),e("#next",v).addEventListener("click",()=>R(C+1)),e("#today",v).addEventListener("click",()=>R(z)),e("#sched-filter",v).addEventListener("input",dt),e("#sched-body",v).addEventListener("click",(r)=>{let y=r.target.closest("tr[data-day]");if(y)R(Number(y.dataset.day)),v.scrollIntoView({behavior:"smooth"})}),e("#lock",v).addEventListener("click",()=>{s.lock(),location.hash="#/"}),e("#export",v).addEventListener("click",()=>navigator.clipboard.writeText(t.exportJson()).then(()=>c("Local data copied")));let K=null;return e("#wipe",v).addEventListener("click",(r)=>{let y=r.currentTarget;if(!K){y.textContent="Tap again to erase everything",y.classList.add("btn-primary"),K=setTimeout(()=>{K=null,y.textContent="Reset all local data",y.classList.remove("btn-primary")},3000);return}clearTimeout(K),K=null,y.textContent="Reset all local data",y.classList.remove("btn-primary"),t.reset(),c("Local data erased"),st()}),R(C),()=>lt.forEach((r)=>r())}function ht(H){H.innerHTML=`
    <div class="wrap"><section class="card" style="max-width:380px;margin:24px auto">
      <h2>Keepers only</h2>
      <p class="muted">Enter the admin passcode.</p>
      <form id="unlock" class="field">
        <input type="password" id="pass" autocomplete="current-password" aria-label="Passcode" required />
        <p id="pass-error" style="color:var(--accent);min-height:1.2em;margin:4px 0;font-size:13px"></p>
        <button class="btn btn-primary btn-block" type="submit">Unlock</button>
      </form>
    </section></div>`;let v=e("#pass",H);v.focus(),v.addEventListener("input",()=>e("#pass-error",H).textContent=""),e("#unlock",H).addEventListener("submit",async(q)=>{if(q.preventDefault(),!v.value){e("#pass-error",H).textContent="Enter the passcode first";return}if(await s.unlock(v.value))window.dispatchEvent(new Event("hashchange"));else e("#pass-error",H).textContent="That's not it. Try again",v.select()})}export{Mt as renderAdmin};

//# debugId=55233AAF103F685864756E2164756E21
//# sourceMappingURL=chunk-kzx8gzkn.js.map
