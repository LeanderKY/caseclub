/* CASECLUB experience layer
   Progressive enhancement only: if this file fails, the original shop still works. */

const clamp = (n, min=0, max=1) => Math.min(max, Math.max(min, n));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const STORY = {
  en: {
    chapters: [
      ['01 / THE OBJECT', 'Your phone is already a design object.', 'The case should protect the thing you carry all day without turning it into a brick. Shape first. Noise last.'],
      ['02 / THE HIT', 'Built around the moment it slips.', 'Corners take the hit. Raised edges keep glass off the floor. Grip belongs where your fingers actually land.'],
      ['03 / THE SWITCH', 'One phone. Eight different moods.', 'Armor, clear, floral, soft-touch, wallet — pick the shell that fits today. Change your mind tomorrow.']
    ],
    metrics:[['08','CASES, NO FILLER'],['11→17','IPHONE RANGE'],['30D','RETURN WINDOW']],
    credit:'3D OBJECT / FREE WEB ASSET'
  },
  de: {
    chapters: [
      ['01 / DAS OBJEKT', 'Dein Handy ist schon ein Designobjekt.', 'Die Hülle soll das Ding schützen, das du jeden Tag in der Hand hast — ohne daraus einen Ziegelstein zu machen. Form zuerst. Lärm zuletzt.'],
      ['02 / DER AUFPRALL', 'Gebaut für den Moment, in dem es rutscht.', 'Die Ecken fangen den Schlag. Erhöhte Kanten halten Glas vom Boden fern. Grip sitzt dort, wo deine Finger wirklich landen.'],
      ['03 / DER WECHSEL', 'Ein Handy. Acht verschiedene Moods.', 'Armor, transparent, floral, SoftTouch, Wallet — nimm die Hülle, die heute passt. Morgen darfst du anders denken.']
    ],
    metrics:[['08','HÜLLEN, KEIN FÜLLMATERIAL'],['11→17','IPHONE RANGE'],['30T','RÜCKGABE']],
    credit:'3D OBJEKT / FREIES WEB-ASSET'
  },
  fr: {
    chapters: [
      ['01 / L’OBJET', 'Ton téléphone est déjà un objet de design.', 'La coque doit protéger ce que tu portes toute la journée sans le transformer en brique. La forme d’abord. Le bruit ensuite.'],
      ['02 / LE CHOC', 'Pensée pour le moment où il glisse.', 'Les coins encaissent. Les bords surélevés éloignent le verre du sol. Le grip se place là où tes doigts tombent vraiment.'],
      ['03 / LE SWITCH', 'Un téléphone. Huit humeurs.', 'Armor, transparente, fleurie, SoftTouch, wallet — choisis celle qui te va aujourd’hui. Change demain.']
    ],
    metrics:[['08','COQUES, ZÉRO REMPLISSAGE'],['11→17','GAMME IPHONE'],['30J','RETOURS']],
    credit:'OBJET 3D / ASSET WEB GRATUIT'
  },
  es: {
    chapters: [
      ['01 / EL OBJETO', 'Tu móvil ya es un objeto de diseño.', 'La funda debe proteger lo que llevas todo el día sin convertirlo en un ladrillo. Primero la forma. Luego el ruido.'],
      ['02 / EL GOLPE', 'Diseñada para el momento en que se resbala.', 'Las esquinas reciben el impacto. Los bordes elevados alejan el cristal del suelo. El agarre va donde de verdad apoyas los dedos.'],
      ['03 / EL CAMBIO', 'Un móvil. Ocho moods.', 'Armor, transparente, floral, SoftTouch, cartera — elige la que encaje hoy. Mañana puedes cambiar.']
    ],
    metrics:[['08','FUNDAS, CERO RELLENO'],['11→17','GAMA IPHONE'],['30D','DEVOLUCIÓN']],
    credit:'OBJETO 3D / ASSET WEB GRATIS'
  },
  it: {
    chapters: [
      ['01 / L’OGGETTO', 'Il tuo telefono è già un oggetto di design.', 'La cover deve proteggere ciò che porti tutto il giorno senza trasformarlo in un mattone. Prima la forma. Poi il rumore.'],
      ['02 / L’URTO', 'Pensata per il momento in cui scivola.', 'Gli angoli prendono il colpo. I bordi rialzati tengono il vetro lontano dal pavimento. Il grip sta dove cadono davvero le dita.'],
      ['03 / IL CAMBIO', 'Un telefono. Otto mood.', 'Armor, clear, floreale, SoftTouch, wallet — scegli quella giusta oggi. Domani puoi cambiare idea.']
    ],
    metrics:[['08','COVER, ZERO RIEMPITIVI'],['11→17','GAMMA IPHONE'],['30G','RESO']],
    credit:'OGGETTO 3D / ASSET WEB GRATUITO'
  },
  pt: {
    chapters: [
      ['01 / O OBJETO', 'O teu telemóvel já é um objeto de design.', 'A capa deve proteger aquilo que levas o dia todo sem o transformar num tijolo. Primeiro a forma. Depois o ruído.'],
      ['02 / O IMPACTO', 'Feita para o momento em que escorrega.', 'Os cantos recebem o impacto. As bordas elevadas afastam o vidro do chão. A aderência fica onde os dedos realmente pousam.'],
      ['03 / A TROCA', 'Um telemóvel. Oito moods.', 'Armor, transparente, floral, SoftTouch, wallet — escolhe a capa de hoje. Amanhã podes mudar.']
    ],
    metrics:[['08','CAPAS, ZERO ENCHIMENTO'],['11→17','GAMA IPHONE'],['30D','DEVOLUÇÃO']],
    credit:'OBJETO 3D / ASSET WEB GRÁTIS'
  }
};

function currentCopy(){
  const lang = (document.documentElement.lang || 'en').slice(0,2).toLowerCase();
  return STORY[lang] || STORY.en;
}

function loadModelViewer(){
  if(customElements.get('model-viewer') || document.querySelector('script[data-cc-model-viewer]')) return;
  const script = document.createElement('script');
  script.type = 'module';
  script.dataset.ccModelViewer = '1';
  script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
  document.head.appendChild(script);
}

function buildStory(){
  if(document.querySelector('.cc-story')) return;
  const trust = document.querySelector('.trustbar');
  const quiz = document.getElementById('quiz');
  if(!trust && !quiz) return;

  const section = document.createElement('section');
  section.className = 'cc-story';
  section.setAttribute('aria-label','CaseClub product story');
  section.innerHTML = `
    <div class="cc-story-sticky">
      <div class="cc-story-grid" aria-hidden="true"></div>
      <div class="cc-story-glow" aria-hidden="true"></div>
      <div class="cc-story-copy" aria-live="polite"></div>
      <div class="cc-model-wrap" aria-hidden="true">
        <div class="cc-model-fallback"></div>
        <model-viewer
          id="ccPhoneModel"
          src="https://polyfork.dev/cdn/smartphone-5f05e5.glb"
          alt="Stylized smartphone 3D model"
          interaction-prompt="none"
          disable-zoom
          shadow-intensity="0"
          exposure="1.15"
          environment-image="neutral"
          camera-orbit="28deg 72deg 108%"
          field-of-view="24deg">
        </model-viewer>
      </div>
      <div class="cc-story-metrics"></div>
      <div class="cc-asset-credit"></div>
      <div class="cc-story-progress" aria-hidden="true"><i></i></div>
    </div>`;

  (trust || quiz.previousElementSibling)?.after(section);
  updateStoryText();
  loadModelViewer();
  initStoryScroll(section);
}

function updateStoryText(){
  const section = document.querySelector('.cc-story');
  if(!section) return;
  const copy = currentCopy();
  const copyWrap = section.querySelector('.cc-story-copy');
  copyWrap.innerHTML = copy.chapters.map((c,i)=>`
    <article class="cc-chapter${i===0?' is-active':''}" data-chapter="${i}">
      <span class="cc-chapter-no">${c[0]}</span>
      <h2>${c[1]}</h2>
      <p>${c[2]}</p>
    </article>`).join('');
  section.querySelector('.cc-story-metrics').innerHTML = copy.metrics.map(m=>`<div class="cc-metric"><b>${m[0]}</b><span>${m[1]}</span></div>`).join('');
  section.querySelector('.cc-asset-credit').textContent = copy.credit;
}

function initStoryScroll(section){
  const bar = section.querySelector('.cc-story-progress i');
  const model = section.querySelector('#ccPhoneModel');
  const fallback = section.querySelector('.cc-model-fallback');
  let raf = 0;
  let lastChapter = -1;

  const update = () => {
    raf = 0;
    const rect = section.getBoundingClientRect();
    const travel = Math.max(1, section.offsetHeight - innerHeight);
    const p = clamp(-rect.top / travel);
    const chapter = Math.min(2, Math.floor(p * 3.001));
    if(chapter !== lastChapter){
      lastChapter = chapter;
      section.querySelectorAll('.cc-chapter').forEach((el,i)=>el.classList.toggle('is-active',i===chapter));
    }
    bar.style.width = `${(p*100).toFixed(2)}%`;

    if(!reducedMotion){
      // Slow, weighted movement: one deliberate turn through the whole story.
      const azimuth = 24 + p * 302;
      const polar = 72 - Math.sin(p * Math.PI) * 15;
      const radius = 111 - Math.sin(p * Math.PI) * 13;
      model.setAttribute('camera-orbit', `${azimuth.toFixed(2)}deg ${polar.toFixed(2)}deg ${radius.toFixed(2)}%`);
      model.setAttribute('orientation', `${(-6 + p*12).toFixed(2)}deg ${(p*20).toFixed(2)}deg ${(Math.sin(p*Math.PI*2)*3).toFixed(2)}deg`);
      const scale = .96 + Math.sin(p * Math.PI) * .08;
      model.style.transform = `scale(${scale.toFixed(3)}) translateY(${(Math.sin(p*Math.PI*2)*-8).toFixed(1)}px)`;
      fallback.style.transform = `rotate(${(p*180).toFixed(1)}deg) scale(${(.92 + p*.08).toFixed(2)})`;
    }
  };

  const request = () => { if(!raf) raf = requestAnimationFrame(update); };
  addEventListener('scroll', request, {passive:true});
  addEventListener('resize', request, {passive:true});
  request();
}

function decorateProducts(){
  document.querySelectorAll('#productGrid .card').forEach((card,i)=>{
    card.dataset.ccIndex = String(i+1).padStart(2,'0');
  });
  document.querySelectorAll('.why-card').forEach((card,i)=>{
    card.dataset.ccIndex = String(i+1).padStart(2,'0');
  });
  document.querySelectorAll('.perk-ico').forEach((el,i)=>{ el.textContent = String(i+1).padStart(2,'0'); });
}

function watchDynamicContent(){
  const grid = document.getElementById('productGrid');
  if(grid) new MutationObserver(()=>decorateProducts()).observe(grid,{childList:true});
  const langObserver = new MutationObserver(()=>updateStoryText());
  langObserver.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
}

function initReveals(){
  const targets = [
    ...document.querySelectorAll('.sec-head'),
    ...document.querySelectorAll('.card'),
    ...document.querySelectorAll('.why-card'),
    document.querySelector('.club-wrap'),
    document.querySelector('.manifesto h2')
  ].filter(Boolean);
  targets.forEach(el=>el.classList.add('cc-reveal'));
  if(reducedMotion || !('IntersectionObserver' in window)){
    targets.forEach(el=>el.classList.add('is-in')); return;
  }
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); } });
  },{rootMargin:'0px 0px -8% 0px',threshold:.08});
  targets.forEach(el=>io.observe(el));
}

function initHeroParallax(){
  const hero = document.querySelector('.hero');
  if(!hero || reducedMotion || matchMedia('(pointer:coarse)').matches) return;
  const pieces = [...hero.querySelectorAll('.hero-visual .p')];
  const bases = [5,-8,10,-4];
  hero.addEventListener('pointermove', e=>{
    const r = hero.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5;
    const y = (e.clientY-r.top)/r.height-.5;
    pieces.forEach((p,i)=>{
      const depth = (i+1)*4;
      p.style.translate = `${(x*depth).toFixed(1)}px ${(y*depth).toFixed(1)}px`;
      p.style.rotate = `${(bases[i] + x*(i%2?2:-2)).toFixed(2)}deg`;
    });
  });
  hero.addEventListener('pointerleave',()=>pieces.forEach(p=>{p.style.translate='';p.style.rotate='';}));
}

function auditAndFixSmallScreens(){
  // Dynamic viewport + overflow guards for iOS homescreen / Safari.
  document.documentElement.style.setProperty('--cc-vh', `${innerHeight * .01}px`);
  document.querySelectorAll('img').forEach(img=>{
    if(!img.hasAttribute('decoding')) img.setAttribute('decoding','async');
  });
}

function initExperience(){
  document.body.classList.add('cc-experience');
  buildStory();
  decorateProducts();
  watchDynamicContent();
  initReveals();
  initHeroParallax();
  auditAndFixSmallScreens();
  addEventListener('resize',auditAndFixSmallScreens,{passive:true});
}

if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',initExperience,{once:true});
else initExperience();
