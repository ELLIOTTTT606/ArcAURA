import { carbonPhases, endOfLifeCreditT, carbonDetails } from '../data/carbon-data.js';

// showCarbonDetail is also exposed globally because initCarbon/renderCarbonCircle
// generate inline onclick handlers pointing at it.

export function initCarbon() {
  const c = document.getElementById('carbonContent');
  if (!c) return;

  const data = carbonPhases;
  const total = data.reduce((s, d) => s + d.value, 0);
  const netTotal = total - endOfLifeCreditT;

  let h = '<div style="background:var(--card);border:2px solid var(--bdr);border-radius:20px;padding:40px;margin-bottom:40px">';
  h += '<h2 style="text-align:center;margin-bottom:40px">Diagramme Cycle de Vie</h2>';
  h += '<div style="display:grid;grid-template-columns:500px 1fr;gap:50px">';
  h += '<div id="carbonCircle"></div>';
  h += '<div style="display:flex;flex-direction:column;gap:12px">';

  data.forEach((d, i) => {
    const pct = Math.round((d.value / total) * 100);
    h += '<div class="carbon-legend" data-idx="' + i + '" onclick="showCarbonDetail(' + i + ')" style="display:flex;align-items:center;gap:12px;padding:12px;background:rgba(255,255,255,0.03);border-radius:10px;cursor:pointer;border:2px solid transparent;transition:all 0.3s">';
    h += '<div style="width:45px;height:45px;border-radius:10px;background:' + d.color + ';display:flex;align-items:center;justify-content:center;font-size:22px">' + d.icon + '</div>';
    h += '<div style="flex:1"><div style="font-size:13px;font-weight:600">' + d.label + '</div>';
    h += '<div style="font-size:10px;color:var(--t2)">+' + d.value + ' t (' + pct + '%)</div></div></div>';
  });

  h += '<div class="carbon-legend" data-idx="6" onclick="showCarbonDetail(6)" style="display:flex;align-items:center;gap:12px;padding:12px;background:rgba(255,255,255,0.03);border-radius:10px;cursor:pointer;border:2px solid transparent;transition:all 0.3s">';
  h += '<div style="width:45px;height:45px;border-radius:10px;background:#66bb6a;display:flex;align-items:center;justify-content:center;font-size:22px">♻️</div>';
  h += '<div style="flex:1"><div style="font-size:13px;font-weight:600">Fin de Vie</div>';
  h += '<div style="font-size:10px;color:var(--t2)">-127 t (crédit)</div></div></div>';

  h += '</div></div></div>';
  h += '<div id="carbonDetail" style="background:var(--card);border:2px solid var(--bdr);border-radius:20px;padding:40px;margin-bottom:40px;display:none"></div>';
  h += '<div style="background:var(--card);border:2px solid var(--bdr);border-radius:20px;padding:40px;text-align:center">';
  h += '<h2 style="margin-bottom:25px">Bilan Net</h2>';
  h += '<div style="padding:35px;background:linear-gradient(135deg,rgba(0,245,255,0.15),rgba(76,175,80,0.1));border-radius:16px">';
  h += '<div style="font-size:16px;color:#94a3b8;margin-bottom:12px">EMPREINTE TOTALE 10 ANS</div>';
  h += '<div style="font-size:64px;font-weight:900;color:#00f5ff">' + netTotal + ' t CO₂</div>';
  h += '<div style="font-size:14px;color:#94a3b8;margin-top:8px">soit ' + Math.round(netTotal/10) + ' t/an • ' + (netTotal/50).toFixed(1) + ' t/véhicule</div></div></div>';

  c.innerHTML = h;
  renderCarbonCircle();
}

function renderCarbonCircle() {
  const el = document.getElementById('carbonCircle');
  if (!el) return;

  const data = [
    { v: 12, c: '#9c27b0' }, { v: 28, c: '#ff5722' }, { v: 199, c: '#4caf50' },
    { v: 1260, c: '#ff9800' }, { v: 45, c: '#2196f3' }, { v: 47, c: '#ffca28' },
  ];

  const total = data.reduce((s, d) => s + d.v, 0);
  const sz = 480, ctr = sz / 2, r = 180, ir = 100;
  let svg = '<svg width="' + sz + '" height="' + sz + '">';
  let ang = -90;

  data.forEach((d, i) => {
    const a = (d.v / total) * 360;
    const s = ang * Math.PI / 180, e = (ang + a) * Math.PI / 180;
    const x1 = ctr + r  * Math.cos(s), y1 = ctr + r  * Math.sin(s);
    const x2 = ctr + r  * Math.cos(e), y2 = ctr + r  * Math.sin(e);
    const x3 = ctr + ir * Math.cos(e), y3 = ctr + ir * Math.sin(e);
    const x4 = ctr + ir * Math.cos(s), y4 = ctr + ir * Math.sin(s);
    const la = a > 180 ? 1 : 0;
    const p = 'M'+x1+','+y1+' A'+r+','+r+' 0 '+la+',1 '+x2+','+y2+' L'+x3+','+y3+' A'+ir+','+ir+' 0 '+la+',0 '+x4+','+y4+' Z';
    svg += '<path d="'+p+'" fill="'+d.c+'" opacity="0.85" style="cursor:pointer" onmouseover="this.setAttribute(\'opacity\',\'1\')" onmouseout="this.setAttribute(\'opacity\',\'0.85\')" onclick="showCarbonDetail('+i+')" />';
    ang += a;
  });

  svg += '<circle cx="'+ctr+'" cy="'+ctr+'" r="'+ir+'" fill="rgba(0,0,0,0.6)" />';
  svg += '<text x="'+ctr+'" y="'+(ctr-20)+'" text-anchor="middle" font-size="16" fill="#94a3b8">TOTAL</text>';
  svg += '<text x="'+ctr+'" y="'+ctr+'" text-anchor="middle" font-size="32" font-weight="800" fill="#00f5ff">1 464 t</text>';
  svg += '<text x="'+ctr+'" y="'+(ctr+25)+'" text-anchor="middle" font-size="14" fill="#94a3b8">CO₂ net</text>';
  svg += '</svg>';

  el.innerHTML = svg;
}

export function showCarbonDetail(i) {
  const d = carbonDetails[i];
  if (!d) return;

  const div = document.getElementById('carbonDetail');
  let h = '<h2 style="margin-bottom:25px">'+d.t+'</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:12px">';
  d.items.forEach(it => {
    const neg = it.v.includes('-');
    const col = neg ? '#4caf50' : '#00f5ff';
    h += '<div style="display:flex;justify-content:space-between;padding:14px;background:rgba(255,255,255,0.03);border-radius:8px;border-left:3px solid '+col+'"><span style="font-size:12px;color:#94a3b8">'+it.l+'</span><span style="font-size:14px;font-weight:700;color:'+col+'">'+it.v+'</span></div>';
  });
  h += '</div>';
  div.innerHTML = h;
  div.style.display = 'block';

  document.querySelectorAll('.carbon-legend').forEach((el, idx) => {
    if (idx === i) {
      el.style.borderColor = '#00f5ff';
      el.style.background = 'rgba(0,245,255,0.1)';
    } else {
      el.style.borderColor = 'transparent';
      el.style.background = 'rgba(255,255,255,0.03)';
    }
  });
}
