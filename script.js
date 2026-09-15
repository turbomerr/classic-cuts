const data={herren:[['Trockenschnitt','18,00 €'],['Waschen und Schneiden','22,00 €'],['Nassrasur','15,00 €'],['Bartschneiden','ab 13,00 €'],['Bart färben mit Pflanzenfarbe','9,00 €'],['Haare färben mit Pflanzenfarbe','12,00 €'],['Gesichtsreinigung mit Dampf','15,00 €'],['Augenbrauen mit Faden zupfen','7,00 €'],['Gesicht, Nase und Ohren wachsen','10,00 €']],damen:[['Schneiden','ab 25,00 €','Kurz 25,00 € · Mittel 28,00 € · Lang 32,00 €'],['Waschen, Schneiden, Föhnen','ab 38,00 €','Kurz 38,00 € · Mittel 41,00 € · Lang 46,00 €'],['Waschen, Föhnen / Legen','ab 23,00 €','Kurz 23,00 € · Mittel 27,00 € · Lang 35,00 €'],['Ansatzfärbung','ab 46,00 €'],['Tönen / Glossing','ab 41,00 €'],['Foliensträhnen (Blondierung)','45,00 € / 70,00 €','Oberkopf 45,00 € · Ganzer Kopf 70,00 €'],['Pflege-Dauerwelle','ab 45,00 €'],['Wimpern färben','8,00 €'],['Augenbrauen färben','8,00 €'],['Augenbrauen zupfen','ab 7,00 €'],['Wimpern & Augenbrauen komplett','20,00 €'],['Hochsteckfrisur / Brautfrisur','ab 100,00 €','Je nach Haarlänge'],['Make-up','ab 25,00 €']],kinder:[['Bis einschließlich 11 Jahre','ab 15,00 €'],['Ab 12 Jahren','ab 18,00 €']]};
const buttons=[...document.querySelectorAll('[role=tab]')];function select(category){buttons.forEach(b=>{const active=b.dataset.category===category;b.setAttribute('aria-selected',active);b.tabIndex=active?0:-1});const panel=document.getElementById('price-panel');panel.setAttribute('aria-labelledby','tab-'+category);panel.innerHTML=(category==='kinder'?'<p class="price-subhead">Kinderhaarschnitte ohne Waschen.</p>':'')+data[category].map(r=>`<div class="price-row"><div>${r[0]}${r[2]?`<small>${r[2]}</small>`:''}</div><b>${r[1]}</b></div>`).join('')};buttons.forEach((b,i)=>{b.addEventListener('click',()=>select(b.dataset.category));b.addEventListener('keydown',e=>{let next;if(['ArrowRight','ArrowDown'].includes(e.key))next=(i+1)%buttons.length;if(['ArrowLeft','ArrowUp'].includes(e.key))next=(i+buttons.length-1)%buttons.length;if(e.key==='Home')next=0;if(e.key==='End')next=buttons.length-1;if(next!==undefined){e.preventDefault();select(buttons[next].dataset.category);buttons[next].focus()}})});select('herren');
const reviews=[['A L','AL','Absolut empfehlenswert! Hervorragender Service, kompetente Beratung und ein tolles Ergebnis. Man fühlt sich vom ersten Moment an wohl. Vielen Dank an das ganze Team!'],['Mario Vorfaj','MV','Der Laden ist sehr sauber, die Mitarbeiter sind pünktlich und freundlich. Die Arbeit ist wirklich hervorragend. Sehr zu empfehlen.'],['Kosta Ruzic','KR','Ich war mit meinem Salonbesuch rundum zufrieden. Haarschnitt und Bartpflege wurden sehr sorgfältig und genau nach meinen Wünschen gemacht.']];document.getElementById('review-track').innerHTML=[0,1].map(copy=>reviews.map(r=>`<article class="review-card" ${copy?'aria-hidden="true"':''}><div><span class="stars" aria-label="5 von 5 Sternen">★★★★★</span><blockquote>„${r[2]}“</blockquote></div><div class="review-person"><span class="avatar">${r[1]}</span><div><b>${r[0]}</b><small>Google-Bewertung</small></div></div></article>`).join('')).join('');const pause=document.getElementById('pause-reviews');pause.addEventListener('click',()=>{const paused=document.querySelector('.marquee').classList.toggle('paused');pause.setAttribute('aria-pressed',paused);pause.setAttribute('aria-label',paused?'Bewertungsanimation fortsetzen':'Bewertungsanimation pausieren');pause.textContent=paused?'▶ Fortsetzen':'Ⅱ Pause'});

// Content remains visible if motion is disabled or IntersectionObserver is unavailable.
(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !('IntersectionObserver' in window)) return;
  const sections = [...document.querySelectorAll('main > section:not(.hero)')];
  const show = section => {
    section.classList.remove('reveal-pending');
    section.classList.add('reveal-visible');
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting || entry.target.contains(document.activeElement)) {
        show(entry.target);
      } else {
        entry.target.classList.remove('reveal-visible');
        entry.target.classList.add('reveal-pending');
      }
    });
  }, { threshold: 0 });
  sections.forEach(section => {
    section.classList.add('scroll-reveal', 'reveal-pending');
    observer.observe(section);
    section.addEventListener('focusin', () => show(section));
  });
  motion.addEventListener('change', event => {
    if (event.matches) { sections.forEach(show); observer.disconnect(); }
  });
})();
