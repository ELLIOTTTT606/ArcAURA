import { attachTabs } from '../core/tabs.js';
import { fmt, gc }    from '../utils/format.js';
import { actionDetails } from '../data/budget-actions.js';

let currentChart = null;
let fullData = [];

// Verbatim copy of the original 20-year projection generator (index.html l.358-393).
// Business logic — do not modify numbers or formulas.
export function generateData20Years(){
  const data=[];
  // PHASE 1
  const ph1=[
    {investments:-12000,opexMarketing:-3000,opexAutres:-2000},
    {investments:-35000,opexMarketing:-2000,opexAutres:-3000},
    {investments:-34500,opexMarketing:-3000,opexAutres:-4000},
    {investments:-28500,opexMarketing:-6000,opexAutres:-6000},
    {investments:-27000,opexMarketing:-4000,opexAutres:-2000}
  ];
  ph1.forEach((d,m)=>{data.push({month:m,year:1,phase:'Phase 1',investments:d.investments,revAbonnements:0,revFranchises:0,revSolaire:0,opexSalaires:0,opexMaintenance:0,opexEnergie:0,opexMarketing:d.opexMarketing,opexAutres:d.opexAutres})});

  // PHASE 2
  const ph2=[
    {inv:-530000,rev:0,sol:0,sal:-25000,maint:-1000,energ:-500,mark:-10000,autres:-8000},
    {inv:-1150000,rev:0,sol:0,sal:-30000,maint:-2500,energ:-2000,mark:-20000,autres:-10000},
    {inv:-1607500,rev:0,sol:0,sal:-35000,maint:-4000,energ:-4000,mark:-25000,autres:-12000},
    {inv:-1437250,rev:5130,sol:5700,sal:-30000,maint:-5250,energ:-5000,mark:-20000,autres:-15000}
  ];
  ph2.forEach((d,i)=>{const m=i+5;data.push({month:m,year:1,phase:'Phase 2',investments:d.inv,revAbonnements:d.rev,revFranchises:0,revSolaire:d.sol,opexSalaires:d.sal,opexMaintenance:d.maint,opexEnergie:d.energ,opexMarketing:d.mark,opexAutres:d.autres})});

  // PHASE 3
  let abonnes=30, solaire=5700;
  for(let m=9;m<21;m++){const mi=m-9;abonnes+=mi<6?10:20;solaire=mi<6?5700+(mi*1183):19800;data.push({month:m,year:m<12?1:2,phase:'Phase 3',investments:mi<6?-1650000:-500000,revAbonnements:Math.round(abonnes*171),revFranchises:0,revSolaire:solaire,opexSalaires:-130000-(mi*1500),opexMaintenance:-12000-(mi*400),opexEnergie:-10000-(mi*300),opexMarketing:-29166,opexAutres:-20000-(mi*400)})}
  for(let m=21;m<33;m++){const mi=m-21;abonnes+=mi<6?50:80;solaire=mi<6?19800+(mi*1200):34000;data.push({month:m,year:m<24?2:3,phase:'Phase 3',investments:mi<6?-1650000:-500000,revAbonnements:Math.round(abonnes*171),revFranchises:0,revSolaire:solaire,opexSalaires:-160000-(mi*917),opexMaintenance:-17000-(mi*300),opexEnergie:-14000-(mi*250),opexMarketing:-29166,opexAutres:-27000-(mi*300)})}
  for(let m=33;m<36;m++){const mi=m-33;let inv=-2600000;if(m===34)inv=-3770000;if(m===35)inv=-2857500;abonnes+=150;if(m===33)solaire=34000;if(m===34)solaire=38250;if(m===35)solaire=42500;data.push({month:m,year:3,phase:'Phase 3',investments:inv,revAbonnements:Math.round(abonnes*171),revFranchises:0,revSolaire:solaire,opexSalaires:-180000-(mi*667),opexMaintenance:-21000,opexEnergie:-17000,opexMarketing:-29166,opexAutres:-31000})}

  // PHASE 4
  abonnes=2500;
  for(let m=36;m<60;m++){const mi=m-36;let inv=-50000;if(m===36)inv=-950000;if(m===42)inv=-950000;if(m===48)inv=-500000;if(m===54)inv=-550000;let fr=0;if(m>=42)fr+=15000;if(m>=48)fr+=15000;if(m>=54)fr+=15000;const cr=Math.min(abonnes+(mi*8),2850);data.push({month:m,year:Math.floor(m/12)+1,phase:'Phase 4',investments:inv,revAbonnements:Math.round(cr*171),revFranchises:fr,revSolaire:42500,opexSalaires:-195000-(mi*150),opexMaintenance:-23000-(mi*40),opexEnergie:-17000,opexMarketing:-10000-(mi*80),opexAutres:-38000-(mi*120)})}

  // ANNÉES 6-20
  abonnes=2850;
  for(let m=60;m<240;m++){const y=Math.floor(m/12)+1;const mi=m-60;const reg=Math.min(4+Math.floor(mi/12),12);const cr=Math.min(abonnes+(mi*2),3300);data.push({month:m,year:y,phase:'An '+y,investments:y<=10?-120000:-55000,revAbonnements:Math.round(cr*171),revFranchises:reg*15000,revSolaire:42500,opexSalaires:-208000-(y*2375),opexMaintenance:-28000-(y*208),opexEnergie:-18000,opexMarketing:-10500-(y*188),opexAutres:-46000-(y*500)})}
  return data;
}

export function calculateAggregates(data){let c=0;return data.map(r=>{const tR=r.revAbonnements+r.revFranchises+r.revSolaire;const tO=r.opexSalaires+r.opexMaintenance+r.opexEnergie+r.opexMarketing+r.opexAutres;const net=tR+tO+r.investments;c+=net;return{...r,totalRev:tR,totalOpex:tO,netRevenue:net,cumul:c}})}

function generateGlobalView(){
  const yd=[];
  for(let y=1;y<=20;y++){const yr=fullData.filter(r=>r.year===y);yd.push({year:y,investments:yr.reduce((s,r)=>s+r.investments,0),revAbonnements:yr.reduce((s,r)=>s+r.revAbonnements,0),revFranchises:yr.reduce((s,r)=>s+r.revFranchises,0),revSolaire:yr.reduce((s,r)=>s+r.revSolaire,0),totalRev:yr.reduce((s,r)=>s+r.totalRev,0),totalOpex:yr.reduce((s,r)=>s+r.totalOpex,0),netRevenue:yr.reduce((s,r)=>s+r.netRevenue,0),cumul:yr[yr.length-1].cumul})}
  let h='<thead><tr><th>Année</th><th>Investissements</th><th>Rev. Abonnements</th><th>Rev. Franchises</th><th>Rev. Solaire</th><th>Total Revenus</th><th>Dépenses</th><th>Résultat Net</th><th>Cumul</th></tr></thead><tbody>';
  yd.forEach(y=>{h+=`<tr class="year-header"><td>An ${y.year}</td><td class="${gc(y.investments)}">${fmt(y.investments)} €</td><td class="${gc(y.revAbonnements)}">${fmt(y.revAbonnements)} €</td><td class="${gc(y.revFranchises)}">${fmt(y.revFranchises)} €</td><td class="${gc(y.revSolaire)}">${fmt(y.revSolaire)} €</td><td class="${gc(y.totalRev)}"><strong>${fmt(y.totalRev)} €</strong></td><td class="${gc(y.totalOpex)}">${fmt(y.totalOpex)} €</td><td class="${gc(y.netRevenue)}"><strong>${fmt(y.netRevenue)} €</strong></td><td class="${gc(y.cumul)}"><strong>${fmt(y.cumul)} €</strong></td></tr>`});
  const t={investments:yd.reduce((s,y)=>s+y.investments,0),revAbonnements:yd.reduce((s,y)=>s+y.revAbonnements,0),revFranchises:yd.reduce((s,y)=>s+y.revFranchises,0),revSolaire:yd.reduce((s,y)=>s+y.revSolaire,0),totalRev:yd.reduce((s,y)=>s+y.totalRev,0),totalOpex:yd.reduce((s,y)=>s+y.totalOpex,0),netRevenue:yd.reduce((s,y)=>s+y.netRevenue,0),cumul:yd[yd.length-1].cumul};
  h+=`<tr class="total-row"><td><strong>TOTAL 20 ANS</strong></td><td class="${gc(t.investments)}">${fmt(t.investments)} €</td><td class="${gc(t.revAbonnements)}">${fmt(t.revAbonnements)} €</td><td class="${gc(t.revFranchises)}">${fmt(t.revFranchises)} €</td><td class="${gc(t.revSolaire)}">${fmt(t.revSolaire)} €</td><td class="${gc(t.totalRev)}"><strong>${fmt(t.totalRev)} €</strong></td><td class="${gc(t.totalOpex)}">${fmt(t.totalOpex)} €</td><td class="${gc(t.netRevenue)}"><strong>${fmt(t.netRevenue)} €</strong></td><td class="${gc(t.cumul)}"><strong>${fmt(t.cumul)} €</strong></td></tr></tbody>`;
  document.getElementById('tableGlobal').innerHTML=h;
  const bei=yd.findIndex(y=>y.cumul>0)+1;
  document.getElementById('kpiGlobal').innerHTML=`<div class="kpi-card"><div class="kpi-label">Investissement Total</div><div class="kpi-value negative">${fmt(Math.abs(t.investments))} €</div></div><div class="kpi-card"><div class="kpi-label">Revenus Totaux 20 ans</div><div class="kpi-value">${fmt(t.totalRev)} €</div></div><div class="kpi-card"><div class="kpi-label">Résultat Net 20 ans</div><div class="kpi-value ${t.netRevenue<0?'negative':''}">${fmt(t.netRevenue)} €</div></div><div class="kpi-card"><div class="kpi-label">ROI (Break-even)</div><div class="kpi-value">${bei>0?bei:'>20'} ans</div></div><div class="kpi-card"><div class="kpi-label">Cumul Final An 20</div><div class="kpi-value ${t.cumul<0?'negative':''}">${fmt(t.cumul)} €</div></div>`;
  createChart('chartGlobal',yd);
}

function generatePhaseTable(phaseId,phaseData){
  if(!phaseData.length)return;
  const pk=phaseData[0].phase;const acts=actionDetails[pk]||{};
  let h='<thead><tr><th>Mois</th><th style="min-width:380px">Actions</th><th>Invest.</th><th>Rev. Abo.</th><th>Rev. Fra.</th><th>Rev. Sol.</th><th>Total Rev.</th><th>Salaires</th><th>Maint.</th><th>Énergie</th><th>Marketing</th><th>Autres</th><th>Total Dép.</th><th>Résultat</th><th>Cumul</th></tr></thead><tbody>';
  phaseData.forEach(r=>{
    const ma=acts[r.month];let at='';
    if(Array.isArray(ma)){at='<ul style="margin:0;padding-left:18px;text-align:left">';ma.forEach(a=>{at+=`<li style="margin:3px 0;font-size:11px">${a}</li>`});at+='</ul>'}
    else if(ma){at=`<div style="text-align:left;font-size:11px;padding:4px">${ma}</div>`}
    else{at='<div style="color:#666;font-size:10px;text-align:center">Opérations courantes</div>'}
    h+=`<tr><td><strong>M${r.month}</strong><br><small style="color:#666">An ${r.year}</small></td><td style="background:rgba(0,245,255,.02)">${at}</td><td class="${gc(r.investments)}">${fmt(r.investments)} €</td><td class="${gc(r.revAbonnements)}">${fmt(r.revAbonnements)} €</td><td class="${gc(r.revFranchises)}">${fmt(r.revFranchises)} €</td><td class="${gc(r.revSolaire)}">${fmt(r.revSolaire)} €</td><td class="${gc(r.totalRev)}"><strong>${fmt(r.totalRev)} €</strong></td><td class="${gc(r.opexSalaires)}">${fmt(r.opexSalaires)} €</td><td class="${gc(r.opexMaintenance)}">${fmt(r.opexMaintenance)} €</td><td class="${gc(r.opexEnergie)}">${fmt(r.opexEnergie)} €</td><td class="${gc(r.opexMarketing)}">${fmt(r.opexMarketing)} €</td><td class="${gc(r.opexAutres)}">${fmt(r.opexAutres)} €</td><td class="${gc(r.totalOpex)}">${fmt(r.totalOpex)} €</td><td class="${gc(r.netRevenue)}"><strong>${fmt(r.netRevenue)} €</strong></td><td class="${gc(r.cumul)}"><strong>${fmt(r.cumul)} €</strong></td></tr>`
  });
  h+='</tbody>';
  document.getElementById('table'+phaseId).innerHTML=h;
}

function createChart(cid,data){
  const ctx=document.getElementById(cid);if(!ctx)return;
  if(currentChart)currentChart.destroy();
  currentChart=new Chart(ctx,{type:'line',data:{labels:data.map(d=>'An '+d.year),datasets:[{label:'Cumul (€)',data:data.map(d=>d.cumul),borderColor:'#00f5ff',backgroundColor:'rgba(0,245,255,0.1)',tension:.4,fill:true,borderWidth:3},{label:'Revenus Totaux (€)',data:data.map(d=>d.totalRev),borderColor:'#00ff88',backgroundColor:'rgba(0,255,136,0.1)',tension:.4,borderWidth:2},{label:'Résultat Net Annuel (€)',data:data.map(d=>d.netRevenue),borderColor:'#ff6b35',backgroundColor:'rgba(255,107,53,0.1)',tension:.4,borderWidth:2}]},options:{responsive:true,maintainAspectRatio:true,interaction:{mode:'index',intersect:false},plugins:{title:{display:true,text:'Évolution Financière sur 20 ans',font:{size:18,weight:'bold'},color:'#00f5ff'},legend:{display:true,position:'top',labels:{color:'#8892b0'}}},scales:{y:{ticks:{color:'#8892b0',callback:v=>fmt(v)+' €'},grid:{color:'rgba(255,255,255,.05)'}},x:{ticks:{color:'#8892b0'},grid:{color:'rgba(255,255,255,.05)'}}}}});
}

export function initBudget(){
  attachTabs('budget-tabs');
  fullData=calculateAggregates(generateData20Years());
  generateGlobalView();
  generatePhaseTable('Phase1',fullData.filter(r=>r.phase==='Phase 1'));
  generatePhaseTable('Phase2',fullData.filter(r=>r.phase==='Phase 2'));
  generatePhaseTable('Phase3',fullData.filter(r=>r.phase==='Phase 3'));
  generatePhaseTable('Phase4',fullData.filter(r=>r.phase==='Phase 4'));
  generatePhaseTable('Post',fullData.filter(r=>r.year>5));
}
