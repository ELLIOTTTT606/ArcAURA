import { attachTabs } from '../core/tabs.js';
import { labelMap }   from '../data/gantt/labels.js';
import { gGlobal }    from '../data/gantt/global.js';
import { gP1 }        from '../data/gantt/phase1.js';
import { gP2 }        from '../data/gantt/phase2.js';
import { gP3 }        from '../data/gantt/phase3.js';
import { gP4 }        from '../data/gantt/phase4.js';

// Verbatim Gantt renderer (index.html l.579-602).
// Accepts a list of actions grouped by sub-phase (sp) and draws a table with timeline bars.
function renderGantt(containerId,legendId,actions,totalUnits,unitLabel,showActors){
  const container=document.getElementById(containerId);
  const legendEl=document.getElementById(legendId);
  if(!container)return;
  const groups={},order=[];
  actions.forEach(a=>{const sp=a.sp||'Général';if(!groups[sp]){groups[sp]=[];order.push(sp)}groups[sp].push(a)});
  let h='<table class="g-table"><thead><tr><th style="min-width:300px">Action</th><th style="min-width:90px">Budget</th>'+( showActors ? '<th style="min-width:140px">Acteurs</th>' : '')+' <th style="min-width:60px">Début</th><th style="min-width:60px">Durée</th><th style="min-width:500px">Timeline</th></tr></thead><tbody>';
  const used=new Set();
  order.forEach(sp=>{
    h+=`<tr class="sp-row"><td colspan="${showActors?6:5}"><span>${sp}</span></td></tr>`;
    groups[sp].forEach(a=>{
      used.add(a.cls);
      const lp=(a.start/totalUnits)*100;
      const wp=Math.max((a.dur/totalUnits)*100,1.2);
      const u=unitLabel==='mois'?'M':'S';
      const label=a.dur>=2?`${u}${a.start}–${u}${a.start+a.dur}`:u+a.start;
      const durL=unitLabel==='mois'?`${a.dur} mois`:`${a.dur} sem`;
      h+=`<tr><td><div class="task-name">${a.name}</div><div class="task-budget">${a.budget}</div></td><td><span style="color:var(--green);font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600">${a.budget}</span></td>${showActors?`<td><span style="display:inline-block;background:rgba(0,245,255,0.13);border:1px solid rgba(0,245,255,0.28);color:#d4f1f4;font-size:11px;font-weight:600;padding:3px 8px;border-radius:6px;line-height:1.5;font-family:Outfit,sans-serif">${a.actors||'—'}</span></td>`:''}<td><span style="color:var(--t2);font-family:'JetBrains Mono',monospace;font-size:12px">${u}${a.start}</span></td><td><span style="color:var(--orange);font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600">${durL}</span></td><td><div class="bar-cell"><div class="bar ${a.cls}" style="left:${lp}%;width:${wp}%">${wp>3.5?label:''}</div>${wp<=3.5?`<span style="position:absolute;left:calc(${lp}% + ${wp}% + 4px);top:50%;transform:translateY(-50%);font-size:10px;font-weight:700;color:var(--orange);font-family:'JetBrains Mono',monospace;white-space:nowrap">${durL}</span>`:''}</div></td></tr>`
    })
  });
  h+='</tbody></table>';
  container.innerHTML=h;
  if(legendEl){let lh='';used.forEach(c=>{lh+=`<div class="leg-item"><div class="leg-c ${c}"></div><span class="leg-l">${labelMap[c]||c}</span></div>`});legendEl.innerHTML=lh}
}

function renderStats(id,items){
  const el=document.getElementById(id);if(!el)return;
  let h='';items.forEach(it=>{h+=`<div class="kpi-card" style="padding:18px"><div class="kpi-label">${it.l}</div><div class="kpi-value" style="font-size:22px">${it.v}</div></div>`});
  el.innerHTML=h;
}

export function initGantt(){
  attachTabs('gantt-tabs');
  renderStats('g-ov-stats',[{l:'Durée totale',v:'240 mois'},{l:'Budget phases 1–4',v:'61,35 M€'},{l:'Sites déployés',v:'15'},{l:'Franchises',v:'3 régions'},{l:'Break-even',v:'An 17'}]);
  renderStats('g-p1-stats',[{l:'Durée',v:'21 sem'},{l:'Budget',v:'103 K€'},{l:'Actions',v:'22'},{l:'Critique',v:'2'}]);
  renderStats('g-p2-stats',[{l:'Durée',v:'17 sem'},{l:'Budget',v:'4,54 M€'},{l:'Véhicules',v:'50'},{l:'Sites',v:'2'}]);
  renderStats('g-p3-stats',[{l:'Durée',v:'117 sem'},{l:'Budget',v:'39,38 M€'},{l:'Sites',v:'15'},{l:'Abonnés',v:'2 500'}]);
  renderStats('g-p4-stats',[{l:'Durée',v:'104 sem'},{l:'Budget',v:'17,33 M€'},{l:'Franchises',v:'3'},{l:'Rev. franchises',v:'45 K€/m'}]);
  renderGantt('g-overview-gantt','g-overview-legend',gGlobal,240,'mois',false);
  renderGantt('g-p1-gantt','g-p1-legend',gP1,21,'sem',true);
  renderGantt('g-p2-gantt','g-p2-legend',gP2,17,'sem',true);
  renderGantt('g-p3-gantt','g-p3-legend',gP3,117,'sem',true);
  renderGantt('g-p4-gantt','g-p4-legend',gP4,104,'sem',true);
}
