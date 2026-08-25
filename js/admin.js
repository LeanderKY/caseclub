/* ===== CASECLUB ADMIN PANEL =====
   Öffnen: #admin in der URL, oder Ctrl/Cmd + Shift + A
   Bestellungen liegen in localStorage (Schlüssel cc_orders) — sie werden
   automatisch gespeichert, wenn eine Bestellung über den Shop abgeschlossen
   wird. Bestellungen, die auf ANDEREN Geräten aufgegeben wurden, kommen per
   E-Mail — die trägst du hier über "+ Bestellung erfassen" nach. */

const ADMIN_KEY = 'cc_orders';
const MEMBER_KEY = 'cc_members';
/* Einkaufspreise aus SOURCING.md (für die Gewinnrechnung) */
const COST = {1:5.00, 2:8.00, 3:3.50, 4:3.00, 5:4.50, 6:2.50, 7:6.00, 8:5.50};
const FEE_PCT = 0.029, FEE_FIX = 0.30, SHIP_COST_REAL = 2.00;

function loadOrders(){
  try { return JSON.parse(localStorage.getItem(ADMIN_KEY) || '[]'); }
  catch(e){ return []; }
}
function saveOrders(list){ localStorage.setItem(ADMIN_KEY, JSON.stringify(list)); }

/* wird vom Shop nach erfolgreicher Zahlung aufgerufen */
function recordOrder(o){
  const list = loadOrders();
  list.unshift(o);
  saveOrders(list);
}

/* Club-Mitglieder */
function loadMembers(){ try { return JSON.parse(localStorage.getItem(MEMBER_KEY) || '[]'); } catch(e){ return []; } }
function recordMember(email){
  const list = loadMembers();
  if(list.some(m=>m.email.toLowerCase() === email.toLowerCase())) return;
  list.unshift({email, ts: Date.now()});
  localStorage.setItem(MEMBER_KEY, JSON.stringify(list));
}
function exportMembers(){
  const list = loadMembers();
  if(!list.length){ alert('Noch keine Club-Anmeldungen auf diesem Gerät.'); return; }
  const csv = ['Datum,E-Mail', ...list.map(m=>`${new Date(m.ts).toISOString().slice(0,10)},${m.email}`)].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
  a.download = `caseclub-club-${new Date().toISOString().slice(0,10)}.csv`;
  a.click(); URL.revokeObjectURL(a.href);
}

function orderCost(o){
  let goods = 0;
  (o.items||[]).forEach(it => { goods += (COST[it.pid] ?? 0) * it.qty; });
  return goods + (o.total * FEE_PCT + FEE_FIX) + SHIP_COST_REAL;
}
function orderProfit(o){ return o.total - orderCost(o); }

/* ---------- UI ---------- */
function buildAdmin(){
  if(document.getElementById('adminModal')) return;
  const style = document.createElement('style');
  style.textContent = `
  #adminModal{position:fixed;inset:0;z-index:900;background:rgba(28,25,19,.55);display:none;overflow-y:auto;padding:24px}
  #adminModal.open{display:block}
  .ad-card{width:min(1080px,100%);margin:0 auto;background:var(--paper);border:1px solid var(--line2);border-radius:14px;box-shadow:0 30px 80px rgba(28,25,19,.35);overflow:hidden}
  .ad-head{display:flex;align-items:center;justify-content:space-between;padding:20px 26px;border-bottom:1px solid var(--line)}
  .ad-head h3{font-size:1.25rem}
  .ad-head .ad-sub{font-size:.76rem;color:var(--faint);margin-top:3px}
  .ad-body{padding:22px 26px 28px;display:flex;flex-direction:column;gap:20px}
  .ad-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}
  .ad-kpi{border:1px solid var(--line2);border-radius:9px;padding:14px 16px;background:var(--card)}
  .ad-kpi b{display:block;font-size:1.5rem;line-height:1.2}
  .ad-kpi span{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--faint)}
  .ad-tools{display:flex;flex-wrap:wrap;gap:8px}
  .ad-btn{padding:9px 16px;border-radius:6px;border:1px solid var(--line2);background:var(--card);color:var(--ink);font-size:.84rem;font-weight:600;font-family:inherit;cursor:pointer}
  .ad-btn:hover{border-color:var(--ink)}
  .ad-btn.primary{background:var(--ink);color:var(--paper);border-color:var(--ink)}
  .ad-btn.primary:hover{background:var(--rust);border-color:var(--rust)}
  .ad-table{width:100%;border-collapse:collapse;font-size:.86rem}
  .ad-table th{text-align:left;font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:var(--faint);font-weight:600;padding:8px 10px;border-bottom:1px solid var(--line2)}
  .ad-table td{padding:11px 10px;border-bottom:1px solid var(--line);vertical-align:top}
  .ad-table tr:hover td{background:var(--card)}
  .ad-items{color:var(--ink2);font-size:.8rem;line-height:1.5}
  .ad-status{padding:4px 10px;border-radius:20px;font-size:.72rem;font-weight:600;border:1px solid var(--line2);background:var(--card);color:var(--ink2);font-family:inherit;cursor:pointer}
  .ad-status[data-s="paid"]{border-color:var(--sage);color:var(--sage)}
  .ad-status[data-s="shipped"]{border-color:var(--rust);color:var(--rust)}
  .ad-status[data-s="unpaid"]{border-color:#c2543f;color:#c2543f}
  .ad-status[data-s="pending"]{border-color:#c2543f;color:#c2543f}
  .ad-paid{color:var(--sage);font-weight:600;font-size:.8rem}
  .ad-track{margin-top:6px;width:130px;padding:5px 8px;border-radius:5px;border:1px solid var(--line2);background:var(--paper);color:var(--ink);font-family:inherit;font-size:.76rem}
  .ad-empty{padding:38px 10px;text-align:center;color:var(--faint);font-size:.9rem;line-height:1.7}
  .ad-del{color:var(--faint);font-size:1rem;background:none;border:none;cursor:pointer}
  .ad-del:hover{color:var(--rust)}
  .ad-form{display:none;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;border:1px dashed var(--line2);border-radius:9px;padding:16px}
  .ad-form.open{display:grid}
  .ad-form label{display:flex;flex-direction:column;gap:5px;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--faint)}
  .ad-form input,.ad-form select{padding:10px 12px;border-radius:5px;border:1px solid var(--line2);background:var(--paper);color:var(--ink);font-family:inherit;font-size:.9rem}
  .ad-note{font-size:.78rem;color:var(--ink2);line-height:1.65;border-left:2px solid var(--line2);padding-left:12px}
  .ad-profit{color:var(--sage);font-weight:600}
  .ad-pp{display:flex;flex-wrap:wrap;align-items:center;gap:12px;border:1px solid var(--line2);border-radius:9px;padding:14px 16px;background:var(--card);font-size:.84rem}
  .ad-pp b{font-family:inherit}
  .ad-pp .warn{color:var(--rust);font-weight:600}
  @media(max-width:700px){.ad-table thead{display:none}.ad-table td{display:block;border:none;padding:4px 0}.ad-table tr{display:block;border-bottom:1px solid var(--line2);padding:12px 0}}
  `;
  document.head.appendChild(style);

  const wrap = document.createElement('div');
  wrap.id = 'adminModal';
  wrap.innerHTML = `
  <div class="ad-card">
    <div class="ad-head">
      <div><h3>Admin — Bestellungen</h3><div class="ad-sub" id="adSub">Lokal auf diesem Gerät gespeichert · keine Cloud</div></div>
      <button class="ad-btn" onclick="closeAdmin()">Schliessen ✕</button>
    </div>
    <div class="ad-body">
      <div class="ad-kpis" id="adKpis"></div>
      <div class="ad-pp" id="adPaypal"></div>
      <div class="ad-tools">
        <button class="ad-btn primary" onclick="toggleAdForm()">+ Bestellung erfassen</button>
        <button class="ad-btn" onclick="exportCsv()">CSV exportieren</button>
        <button class="ad-btn" onclick="exportMembers()">Club-Mails exportieren</button>
        <button class="ad-btn" onclick="setFilter('all')" id="fAll">Alle</button>
        <button class="ad-btn" onclick="setFilter('paid')" id="fPaid">Nur bezahlt</button>
        <button class="ad-btn" onclick="setFilter('open')" id="fOpen">Offen</button>
        <button class="ad-btn" onclick="purgeStale()">Alte unbezahlte löschen</button>
        <button class="ad-btn" onclick="clearOrders()">Alle löschen</button>
      </div>
      <div class="ad-form" id="adForm">
        <label>Produkt<select id="adfProduct"></select></label>
        <label>Modell<input id="adfModel" placeholder="iPhone 17 Pro"></label>
        <label>Menge<input id="adfQty" type="number" min="1" value="1"></label>
        <label>Bezahlt ($)<input id="adfTotal" type="number" step="0.01" placeholder="19.90"></label>
        <label>Kunden-E-Mail<input id="adfEmail" placeholder="kunde@mail.com"></label>
        <label>&nbsp;<button class="ad-btn primary" onclick="addManualOrder()">Speichern</button></label>
      </div>
      <table class="ad-table">
        <thead><tr><th>Datum</th><th>Bestellung</th><th>Kunde</th><th>Betrag</th><th>Zahlung</th><th>Gewinn</th><th>Versand</th><th></th></tr></thead>
        <tbody id="adRows"></tbody>
      </table>
      <p class="ad-note">Automatisch erfasst wird jede Bestellung, die in <b>diesem</b> Browser abgeschlossen wird.
      Bestellungen echter Kunden landen in deinem Posteingang (Bestell-Mail) — trage sie hier per
      „+ Bestellung erfassen" nach, dann stimmen Umsatz und Gewinn.
      Gewinn = Verkaufspreis − Einkauf (SOURCING.md) − 2,9 % + $0.30 Zahlungsgebühr − $2 Versand.<br><br>
      <b>Zahlungsprüfung:</b> Mit <b>PAYPAL_CLIENT_ID</b> (index.html) schliesst der Kunde die Zahlung im Shop ab und
      PayPal meldet „bezahlt" samt Transaktions-ID zurück — dann steht hier automatisch ✓ Bezahlt.
      Nur mit PayPal.Me-Link erfährt der Shop nichts: die Bestellung bleibt „Offen", bis du in deinem
      PayPal-Konto nachsiehst und hier auf „als bezahlt markieren" klickst. Umsatz und Gewinn zählen
      ausschliesslich bezahlte Bestellungen.</p>
    </div>
  </div>`;
  document.body.appendChild(wrap);
  wrap.addEventListener('click', e => { if(e.target === wrap) closeAdmin(); });
}

function openAdmin(){ buildAdmin(); document.getElementById('adminModal').classList.add('open'); renderAdmin(); }
function closeAdmin(){ const m = document.getElementById('adminModal'); if(m) m.classList.remove('open'); }
function toggleAdForm(){
  const f = document.getElementById('adForm');
  f.classList.toggle('open');
  const sel = document.getElementById('adfProduct');
  if(!sel.options.length && typeof PRODUCTS !== 'undefined')
    sel.innerHTML = PRODUCTS.map(p=>`<option value="${p.id}">${p.name} — $${p.price.toFixed(2)}</option>`).join('');
}

function renderAdmin(){
  const list = loadOrders();
  const paidList = list.filter(o=>o.paid || o.status==='paid' || o.status==='shipped');
  const revenue = paidList.reduce((s,o)=>s+o.total,0);
  const profit  = paidList.reduce((s,o)=>s+orderProfit(o),0);
  const aov     = paidList.length ? revenue/paidList.length : 0;
  const open    = paidList.filter(o=>o.status!=='shipped').length;
  const unpaid  = list.length - paidList.length;
  const unpaidSum = list.filter(o=>!(o.paid||o.status==='paid'||o.status==='shipped')).reduce((s,o)=>s+o.total,0);
  document.getElementById('adKpis').innerHTML = `
    <div class="ad-kpi"><span>Bestellungen</span><b>${list.length}</b></div>
    <div class="ad-kpi"><span>Umsatz (bezahlt)</span><b>$${revenue.toFixed(2)}</b></div>
    <div class="ad-kpi"><span>Zahlung offen</span><b${unpaid?' style="color:var(--rust)"':''}>${unpaid}</b><span style="font-size:.68rem">$${unpaidSum.toFixed(2)}</span></div>
    <div class="ad-kpi"><span>Gewinn</span><b class="ad-profit">$${profit.toFixed(2)}</b></div>
    <div class="ad-kpi"><span>Ø Bestellwert</span><b>$${aov.toFixed(2)}</b></div>
    <div class="ad-kpi"><span>Zu versenden</span><b>${open}</b></div>
    <div class="ad-kpi"><span>Club-Mitglieder</span><b>${loadMembers().length}</b></div>`;

  const pp = document.getElementById('adPaypal');
  const cfg = (typeof CONFIG !== 'undefined') ? CONFIG : {};
  if(typeof SELLER_IS_PLACEHOLDER !== 'undefined' && SELLER_IS_PLACEHOLDER){
    pp.insertAdjacentHTML('beforebegin', document.getElementById('adPlaceholderWarn') ? '' :
      `<div id="adPlaceholderWarn" class="ad-pp" style="border-color:#c2543f;background:#fdf1ee">
         <span class="warn">Rechtstexte enthalten noch Platzhalter-Daten</span>
         <span>— „PLATZHALTER Muster-Handel, Musterstrasse 1, 8000 Musterstadt" steht in AGB und Datenschutz.
         Vor dem ersten echten Verkauf in <b>js/legal.js</b> (SELLER) durch deinen Namen und deine Adresse ersetzen.</span>
       </div>`);
  }
  pp.innerHTML = cfg.PAYPAL_ME
    ? `<span>${cfg.PAYPAL_CLIENT_ID ? '<b style="color:var(--sage)">Zahlung wird automatisch bestätigt</b> (PayPal-Checkout aktiv)' : '<b class="warn">Zahlung wird NICHT automatisch bestätigt</b> — nur PayPal.Me-Link'} · Empfänger <b>paypal.me/${cfg.PAYPAL_ME}</b> · Bestellmails an <b>${cfg.EMAIL}</b> · Währung <b>${cfg.CURRENCY}</b></span>
       <button class="ad-btn" onclick="testPaypal()">Link mit $1.00 testen</button>
       <span style="width:100%;color:var(--ink2)">Club-Anmeldungen: ${cfg.SIGNUP_ENDPOINT ? 'gehen per E-Mail an <b>'+cfg.EMAIL+'</b> (erste Anmeldung bei formsubmit.co bestätigen)' : '<b class=\"warn\">nur lokal</b> — SIGNUP_ENDPOINT in index.html setzen'}</span>`
    : `<span class="warn">PayPal.Me-Name fehlt</span><span>— in index.html bei <b>CONFIG.PAYPAL_ME</b> eintragen, sonst kann niemand bezahlen.</span>`;

  ['fAll','fPaid','fOpen'].forEach(id=>{ const b=document.getElementById(id); if(b) b.style.borderColor='var(--line2)'; });
  const active = {all:'fAll', paid:'fPaid', open:'fOpen'}[adFilter];
  if(document.getElementById(active)) document.getElementById(active).style.borderColor='var(--ink)';
  const view = adFilter==='paid' ? list.filter(isPaid) : adFilter==='open' ? list.filter(o=>!isPaid(o)) : list;
  const sub = document.getElementById('adSub');
  if(sub) sub.textContent = `${paidList.length} von ${list.length} bezahlt · lokal auf diesem Gerät gespeichert`;
  const rows = document.getElementById('adRows');
  if(!view.length){
    rows.innerHTML = `<tr><td colspan="7" class="ad-empty">Noch keine Bestellungen.<br>
      Sobald jemand über den Shop kauft, erscheint die Bestellung hier.</td></tr>`;
    return;
  }
  const LABEL = {pending:'Wartet auf Zahlung', new:'Zu versenden', paid:'Zu versenden', shipped:'Versendet'};
  rows.innerHTML = view.map(o=>{ const i = list.indexOf(o); return `
    <tr>
      <td>${new Date(o.ts).toLocaleDateString('de-CH')}<br><span style="color:var(--faint);font-size:.75rem">${new Date(o.ts).toLocaleTimeString('de-CH',{hour:'2-digit',minute:'2-digit'})}</span></td>
      <td><div class="ad-items">${(o.items||[]).map(it=>`${it.qty}× ${it.name}<br><span style="color:var(--faint)">${it.model}</span>`).join('<br>')}</div>
          <span style="color:var(--faint);font-size:.72rem">${o.id||''}</span></td>
      <td>${o.email ? `<a href="mailto:${o.email}" style="color:var(--rust)">${o.email}</a>` : '<span style="color:var(--faint)">—</span>'}</td>
      <td>$${o.total.toFixed(2)}${o.discount ? `<br><span style="color:var(--faint);font-size:.75rem">−$${o.discount.toFixed(2)} Rabatt</span>` : ''}</td>
      <td>${isPaid(o)
        ? `<span class="ad-paid">✓ Bezahlt</span>${o.txn ? `<br><span style="color:var(--faint);font-size:.7rem">${o.txn}</span>` : `<br><span style="color:var(--faint);font-size:.7rem">manuell</span>`}`
        : `<button class="ad-status" data-s="unpaid" onclick="markPaid(${i})" title="Erst klicken, wenn das Geld auf deinem PayPal-Konto ist">Offen — als bezahlt markieren</button>
           <br><span style="color:var(--faint);font-size:.7rem">${o.declared ? 'Kunde sagt „bezahlt" — im PayPal-Konto prüfen' : 'keine Zahlungsmeldung'}</span>`}</td>
      <td class="ad-profit">${isPaid(o) ? '$'+orderProfit(o).toFixed(2) : '<span style="color:var(--faint)">—</span>'}</td>
      <td><button class="ad-status" data-s="${o.status||'pending'}" onclick="cycleStatus(${i})">${LABEL[o.status||'pending']}</button>
        ${isPaid(o) ? `<br><input class="ad-track" value="${o.tracking||''}" placeholder="Sendungsnr." onchange="setTracking(${i}, this.value)">` : ''}
        ${o.tracking && o.email ? `<br><a href="${trackMail(o)}" style="color:var(--rust);font-size:.72rem">Kunde informieren</a>` : ''}</td>
      <td><button class="ad-del" onclick="deleteOrder(${i})" title="Löschen">✕</button></td>
    </tr>`; }).join('');
}

function testPaypal(){
  if(!CONFIG.PAYPAL_ME) return;
  window.open(`https://www.paypal.me/${CONFIG.PAYPAL_ME}/1.00${CONFIG.CURRENCY}`,'_blank');
}
let adFilter = 'all';
function setFilter(f){ adFilter = f; renderAdmin(); }
function purgeStale(){
  const list = loadOrders();
  const grenze = Date.now() - 7*24*3600*1000;
  const rest = list.filter(o=>isPaid(o) || o.ts > grenze);
  const weg = list.length - rest.length;
  if(!weg){ alert('Keine unbezahlten Bestellungen älter als 7 Tage.'); return; }
  if(!confirm(weg + ' unbezahlte Bestellung(en) älter als 7 Tage löschen?')) return;
  saveOrders(rest); renderAdmin();
}
function isPaid(o){ return !!(o.paid || o.status==='paid' || o.status==='shipped'); }
function markPaid(i){
  const list = loadOrders();
  if(!confirm('Ist der Betrag wirklich auf deinem PayPal-Konto eingegangen?\n\nNur dann als bezahlt markieren — PayPal.Me meldet dem Shop nichts zurück.')) return;
  list[i].paid = true; list[i].status = 'paid';
  saveOrders(list); renderAdmin();
}
function setTracking(i, val){
  const list = loadOrders();
  list[i].tracking = val.trim();
  if(list[i].tracking && isPaid(list[i])) list[i].status = 'shipped';
  saveOrders(list); renderAdmin();
}
function trackMail(o){
  const body = `Deine CaseClub-Bestellung ${o.id} ist unterwegs.\n\nSendungsnummer: ${o.tracking}\n\nLieferzeit üblicherweise 7–14 Tage.\n\nDanke und viel Freude mit deiner Hülle!`;
  return `mailto:${o.email}?subject=${encodeURIComponent('Deine CaseClub-Bestellung ist unterwegs')}&body=${encodeURIComponent(body)}`;
}
function cycleStatus(i){
  const list = loadOrders();
  if(!isPaid(list[i])){ alert('Diese Bestellung ist noch nicht bezahlt — erst die Zahlung bestätigen.'); return; }
  list[i].status = list[i].status === 'shipped' ? 'paid' : 'shipped';
  saveOrders(list); renderAdmin();
}
function deleteOrder(i){
  if(!confirm('Diese Bestellung löschen?')) return;
  const list = loadOrders(); list.splice(i,1); saveOrders(list); renderAdmin();
}
function clearOrders(){
  if(!confirm('Wirklich ALLE Bestellungen löschen? Das lässt sich nicht rückgängig machen.')) return;
  saveOrders([]); renderAdmin();
}
function addManualOrder(){
  const pid  = parseInt(document.getElementById('adfProduct').value,10);
  const p    = PRODUCTS.find(x=>x.id===pid);
  const qty  = Math.max(1, parseInt(document.getElementById('adfQty').value,10) || 1);
  const tRaw = parseFloat(document.getElementById('adfTotal').value);
  const total = isNaN(tRaw) ? p.price*qty : tRaw;
  recordOrder({
    id: 'MAN-' + Date.now().toString(36).toUpperCase(),
    ts: Date.now(),
    items: [{pid, name:p.name, model: document.getElementById('adfModel').value || '—', qty, price:p.price}],
    subtotal: p.price*qty, discount: Math.max(0, p.price*qty-total), ship: 0, total,
    email: document.getElementById('adfEmail').value.trim(),
    paid: true, txn: '', method: 'manuell', tracking: '', status: 'paid'
  });
  document.getElementById('adfModel').value=''; document.getElementById('adfTotal').value=''; document.getElementById('adfEmail').value='';
  document.getElementById('adForm').classList.remove('open');
  renderAdmin();
}
function exportCsv(){
  const list = loadOrders();
  const head = 'Datum,BestellID,Artikel,Menge,Betrag,Bezahlt,TransaktionsID,Gewinn,Kunde,Sendungsnr,Status';
  const lines = list.map(o=>{
    const it = (o.items||[]).map(x=>`${x.qty}x ${x.name} (${x.model})`).join(' | ');
    return [new Date(o.ts).toISOString().slice(0,10), o.id||'', `"${it}"`,
            (o.items||[]).reduce((s,x)=>s+x.qty,0), o.total.toFixed(2),
            isPaid(o)?'ja':'nein', o.txn||'', isPaid(o)?orderProfit(o).toFixed(2):'0.00',
            o.email||'', o.tracking||'', o.status||'pending'].join(',');
  });
  const blob = new Blob([[head,...lines].join('\n')], {type:'text/csv'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `caseclub-bestellungen-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

/* Öffnen: #admin oder Ctrl/Cmd+Shift+A */
if(location.hash === '#admin') window.addEventListener('load', openAdmin);
window.addEventListener('hashchange', ()=>{ if(location.hash === '#admin') openAdmin(); });
document.addEventListener('keydown', e=>{
  if((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')){ e.preventDefault(); openAdmin(); }
});
