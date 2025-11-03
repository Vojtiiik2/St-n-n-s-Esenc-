
(function(){
  const CS = 'cs', EN = 'en';
  const qs = s => document.querySelectorAll(s);
  const setLang = (lang) => {
    localStorage.setItem('lang', lang);
    const isEN = lang === EN;
    qs('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key.endsWith('_en')) { el.classList.toggle('hidden', !isEN); }
      if (key.endsWith('_cs')) { el.classList.toggle('hidden', isEN); }
    });
    const title = document.querySelector('title[data-i18n="title"]');
    if (title) { title.textContent = isEN ? 'Shade & Scent by Jana' : 'Jana Segelberg – Stínění s esencí'; }
    document.documentElement.lang = isEN ? 'en' : 'cs';
    const btnCs = document.getElementById('btn-cs');
    const btnEn = document.getElementById('btn-en');
    if (btnCs && btnEn){ btnCs.classList.toggle('active', !isEN); btnEn.classList.toggle('active', isEN); }
  };
  const initLang = () => setLang(localStorage.getItem('lang') || CS);

  // Lightbox
  const initLightbox = () => {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const close = document.querySelector('.lb-close');
    if (!lb || !img || !close) return;

    document.body.addEventListener('click', (e)=>{
      const a = e.target.closest('.lightboxable');
      if (!a) return;
      e.preventDefault();
      img.src = a.getAttribute('href');
      lb.classList.add('show');
      lb.setAttribute('aria-hidden', 'false');
    });
    const hide = () => {
      lb.classList.remove('show');
      lb.setAttribute('aria-hidden', 'true');
      img.src = '';
    };
    lb.addEventListener('click', (e)=>{ if (e.target === lb) hide(); });
    close.addEventListener('click', hide);
    document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') hide(); });
  };

  document.addEventListener('DOMContentLoaded', ()=>{
    initLang();
    document.getElementById('btn-cs')?.addEventListener('click', ()=>setLang(CS));
    document.getElementById('btn-en')?.addEventListener('click', ()=>setLang(EN));
    initLightbox();
  });
})();
