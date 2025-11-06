const {useState, useEffect, useMemo} = React;

// -------- i18n --------
const STR = {
  cs: {
    brand1: "Jana Segelberg",
    brand2: "Stínění s esencí",
    nav: ["Galerie","Kolik zaplatíte","O nás","Jak pracujeme","Esence","Kontakt"],
    heroH1: "Kde se světlo setká s emocí",
    heroSub: "Záclony · Závěsy · Rolety · Esence",
    cta: "Nezávazná konzultace",
    priceH: "Kolik zaplatíte",
    priceP: "Ceny jsou orientační; závisí na materiálu, rozměrech a typu systému. Rámec sdělím na první schůzce.",
    aboutH:"O nás",
    aboutP:"Navrhuji stínění, které ctí architekturu i rytmus dne. Látka, světlo a jemná vůně tvoří domov.",
    processH:"Jak pracujeme",
    steps:["Konzultace","Návrh","Realizace"],
    stepsTxt:[
      "Poznáme váš prostor a očekávání, nastavíme rámec.",
      "Zvolíme látky a technologii, připravíme harmonogram.",
      "Precizní výroba, čistá montáž a hladké předání."
    ],
    essenceH:"Esence",
    essences:[
      { name:"Vanilka", note:"Hřejivá, uklidňující – ložnice, čtecí kout."},
      { name:"Peppermint", note:"Čistý, svěží – pracovna, kuchyně."},
      { name:"Citrus", note:"Lehký, radostný – obývák, koupelna."},
      { name:"Levandule", note:"Uvolňuje – ložnice, wellness."},
      { name:"Rozmarýn", note:"Čistí a posiluje – vstup, kuchyně."},
      { name:"Eukalyptus", note:"Osvěžuje dech – koupelna."},
      { name:"Sezónní", note:"Měsíční speciál – mění se automaticky."}
    ],
    galleryH:"Galerie",
    contactH:"Kontakt",
    name:"Jméno", email:"E-mail", message:"Zpráva", send:"Odeslat",
    rights:"Všechna práva vyhrazena."
  },
  en: {
    brand1:"Jana Segelberg",
    brand2:"Shade & Scent",
    nav:["Gallery","Pricing","About","Process","Essences","Contact"],
    heroH1:"Where light meets emotion",
    heroSub:"Curtains · Drapes · Blinds · Scents",
    cta:"Free Consultation",
    priceH:"Pricing",
    priceP:"Indicative only; depends on materials, sizes and systems. You'll get a budget frame at our first meeting.",
    aboutH:"About",
    aboutP:"We design shading that respects architecture and your daily rhythm. Fabric, light and a gentle scent create home.",
    processH:"Process",
    steps:["Consultation","Design","Installation"],
    stepsTxt:[
      "We discover your space and expectations.",
      "We select fabrics and systems, set a schedule.",
      "Made to measure, precise installation, clean handover."
    ],
    essenceH:"Essences",
    essences:[
      { name:"Vanilla", note:"Warm, soothing — bedroom, reading nook."},
      { name:"Peppermint", note:"Clean, fresh — home office, kitchen."},
      { name:"Citrus", note:"Light, uplifting — living room, bathroom."},
      { name:"Lavender", note:"Relaxing — bedroom, wellness."},
      { name:"Rosemary", note:"Cleansing, energizing — entry, kitchen."},
      { name:"Eucalyptus", note:"Refreshing — bathroom."},
      { name:"Seasonal", note:"Monthly special — changes automatically."}
    ],
    galleryH:"Gallery",
    contactH:"Contact",
    name:"Name", email:"E-mail", message:"Message", send:"Send",
    rights:"All rights reserved."
  }
};

function useLang(){
  const [lang,setLang] = useState(()=>localStorage.getItem("lang")||"cs");
  useEffect(()=>{ localStorage.setItem("lang",lang); document.documentElement.lang = lang; },[lang]);
  return {lang,setLang,t:STR[lang]};
}

// ---------- Router (hash-based, for GitHub Pages) ----------
const ROUTES = {
  "/": "Home",
  "/gallery":"Gallery",
  "/pricing":"Pricing",
  "/about":"About",
  "/process":"Process",
  "/essences":"Essences",
  "/contact":"Contact"
};
function useRoute(){
  const [route,setRoute]=useState(()=>location.hash.replace("#","")||"/");
  useEffect(()=>{
    const onHash=()=> setRoute(location.hash.replace("#","")||"/");
    window.addEventListener("hashchange", onHash);
    return ()=>window.removeEventListener("hashchange", onHash);
  },[]);
  return {route, setRoute};
}
function go(path){ location.hash = path; }

const Header=({t, lang,setLang})=>(
  <header className="fixed top-0 left-0 right-0 z-30 border-b border-[var(--line)]/70 bg-white/70 glass">
    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="leading-4 cursor-pointer" onClick={()=>go("/")}>
        <div className="script text-2xl -mb-0.5">{t.brand1}</div>
        <div className="text-xs tracking-wide text-[var(--muted)]">{t.brand2}</div>
      </div>
      <nav className="hidden md:flex gap-6 text-sm font-semibold">
        {t.nav.map((label,i)=>{
          const path = ["/gallery","/pricing","/about","/process","/essences","/contact"][i];
          return <a key={i} className="nav-link hover:text-[var(--text)]/90 text-[var(--text)]/75" onClick={()=>go(path)}>{label}</a>
        })}
      </nav>
      <div className="flex gap-2">
        <button onClick={()=>setLang("cs")} className={"px-3 py-1.5 text-sm rounded-lg border "+(lang==="cs"?"border-[var(--sand)]":"border-[var(--line)]")}>CZ</button>
        <button onClick={()=>setLang("en")} className={"px-3 py-1.5 text-sm rounded-lg border "+(lang==="en"?"border-[var(--sand)]":"border-[var(--line)]")}>EN</button>
      </div>
    </div>
  </header>
);

function Hero({t, small=false, bg}){
  const goNext = ()=>{
    const el = document.querySelector("[data-first]");
    if(el) el.scrollIntoView({behavior:"smooth", block:"start"});
  };
  return (
    <section className={"relative "+(small?"min-h-[42vh]":"min-h-[92vh]")+" flex items-center"} style={{
      backgroundImage: `linear-gradient( to right, rgba(0,0,0,.20), rgba(0,0,0,.05) ), url('${bg}')`,
      backgroundSize:"cover", backgroundPosition:"left center"
    }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15"></div>
      <div className="relative max-w-6xl mx-auto px-4 w-full">
        <div className="max-w-2xl text-white drop-shadow-[0_2px_14px_rgba(0,0,0,.35)]">
          <h1 className={"script "+(small?"text-3xl md:text-5xl":"text-4xl md:text-6xl")+" mb-3"}>{t.heroH1}</h1>
          <p className={(small?"text-sm md:text-base":"text-base md:text-lg")+" opacity-95"}>{t.heroSub}</p>
          {!small && (
            <button onClick={()=>go('/contact')} className="btn-cta inline-block mt-6 px-5 py-3 rounded-full bg-[var(--sand)] text-[var(--text)] font-bold border border-black/5">
              {t.cta}
            </button>
          )}
        </div>
      </div>
      {!small && (
        <button aria-label="Scroll down" onClick={goNext} className="absolute left-1/2 -translate-x-1/2 bottom-6">
          <span className="scroll-hint"></span>
        </button>
      )}
    </section>
  );
}

const HERO = "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1800&auto=format&fit=crop";
const HEROS = {
  gallery:"https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1800&auto=format&fit=crop",
  pricing:"https://images.unsplash.com/photo-1549187774-b4e9b0445b41?q=80&w=1800&auto=format&fit=crop",
  about:"https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1800&auto=format&fit=crop",
  process:"https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1800&auto=format&fit=crop",
  essences:"https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1800&auto=format&fit=crop",
  contact:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1800&auto=format&fit=crop"
};

function Home({t}){
  const FEEL_IMG=[
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop"
  ];
  return (<>
    <Hero t={t} small={false} bg={HERO} />
    <section className="section-swap" data-first>
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-6">
          {t.nav.slice(0,4).map((title,i)=>(
            <article key={i} className="overflow-hidden rounded-2xl bg-white border border-[var(--line)] soft-shadow">
              <div className="grid md:grid-cols-2 gap-0">
                <img src={FEEL_IMG[i]} alt="" className="w-full h-full object-cover aspect-[4/3] md:aspect-auto"/>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <h3 className="script text-3xl mb-2">{["Prostor","Textura","Esence","Harmonie"][i]||title}</h3>
                  <p className="text-[var(--muted)]">
                    {["Světlo, které dýchá – a prostor, který se vám přizpůsobí.",
                      "Dotek látky v detailu. Kvalita, která vydrží roky.",
                      "Jemná vůně jako závěrečná nota atmosféry.",
                      "Plynulost, klid, přirozené linie – bez kompromisu."][i]}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </>);
}

function Gallery({t}){
  const GALLERY=[
    "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542326237-94b1c5a538d6?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521783988139-893ce3cdb4e8?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1600&auto=format&fit=crop"
  ];
  return (<>
    <Hero t={t} small bg={HEROS.gallery} />
    <section className="section-swap" data-first>
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <h2 className="script text-4xl mb-6">{t.galleryH}</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY.map((src,i)=>(
            <a key={i} href={src} className="relative group" onClick={(e)=>openLightbox(e,src)}>
              <img src={src} className="rounded-xl soft-shadow w-full h-full object-cover aspect-[4/3]" />
              <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/10 transition"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  </>);
}

function Pricing({t}){
  return (<>
    <Hero t={t} small bg={HEROS.pricing} />
    <section className="section-swap" data-first>
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <h2 className="script text-4xl mb-4">{t.priceH}</h2>
        <p className="text-[var(--muted)] max-w-3xl">{t.priceP}</p>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {["Voile / Záclona","Závěs (blackout/dim-out)","Kolejnice / systém"].map((name,i)=>(
            <div key={i} className="rounded-2xl bg-white border border-[var(--line)] p-6 soft-shadow">
              <div className="font-semibold mb-2">{name}</div>
              <div className="text-sm text-[var(--muted)]">Cena na míru po zaměření • materiál, rozměr, ušití</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>);
}

function About({t}){
  return (<>
    <Hero t={t} small bg={HEROS.about} />
    <section className="section-swap" data-first>
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <h2 className="script text-4xl mb-4">{t.aboutH}</h2>
        <p className="max-w-3xl text-[var(--muted)]">{t.aboutP}</p>
      </div>
    </section>
  </>);
}

function Process({t}){
  return (<>
    <Hero t={t} small bg={HEROS.process} />
    <section className="section-swap" data-first>
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <h2 className="script text-4xl mb-8">{t.processH}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {t.steps.map((s,i)=>(
            <div key={i} className="rounded-2xl bg-white border border-[var(--line)] p-6 soft-shadow">
              <div className="script text-2xl mb-1">{s}</div>
              <div className="text-[var(--muted)]">{t.stepsTxt[i]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>);
}

function Essences({t}){
  return (<>
    <Hero t={t} small bg={HEROS.essences} />
    <section className="section-swap" data-first>
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <h2 className="script text-4xl mb-6">{t.essenceH}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.essences.map((e,i)=>(
            <div key={i} className="rounded-2xl border border-[var(--line)] p-6 soft-shadow bg-gradient-to-b from-white to-[var(--bg2)] hover:from-white hover:to-white transition">
              <div className="flex items-baseline justify-between">
                <h3 className="script text-3xl">{e.name}</h3>
                <span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: i===0?"#d7bfa3": i===1?"#bedad1": i===2?"#f1d28c": i===3?"#dac6e1": i===4?"#c9d1b9": i===5?"#c6e3e8":"#e8d9c8"}} />
              </div>
              <p className="text-[var(--muted)] mt-2">{e.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>);
}

function Contact({t}){
  return (<>
    <Hero t={t} small bg={HEROS.contact} />
    <section className="section-swap" data-first>
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <h2 className="script text-4xl mb-6">{t.contactH}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p><strong>{t.name}</strong><br/>Jana Segelberg</p>
            <p><strong>E-mail</strong><br/><a className="underline" href="mailto:hello@janasegelberg.com">hello@janasegelberg.com</a></p>
            <p><strong>Telefon</strong><br/><a className="underline" href="tel:+420724379309">+420 724 379 309</a></p>
            <div className="divider my-6"></div>
            <p className="text-[var(--muted)]">Po schválení vizuálu napojíme formulář na Google Sheets + auto-reply (CZ/EN).</p>
          </div>
          <form className="rounded-2xl bg-white border border-[var(--line)] p-6 soft-shadow">
            <div className="grid gap-4">
              <label className="text-sm">{t.name}<input className="mt-1 w-full border rounded-lg px-3 py-2 border-[var(--line)]" required /></label>
              <label className="text-sm">{t.email}<input type="email" className="mt-1 w-full border rounded-lg px-3 py-2 border-[var(--line)]" required /></label>
              <label className="text-sm">{t.message}<textarea rows="5" className="mt-1 w-full border rounded-lg px-3 py-2 border-[var(--line)]" required></textarea></label>
              <button type="button" className="btn-cta px-5 py-3 rounded-full bg-[var(--sand)] text-[var(--text)] font-bold border border-black/5">{t.send}</button>
              <p className="text-[var(--muted)] text-sm">* Demo formulář – bez odesílání.</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  </>);
}

function App(){
  const {lang,setLang,t} = useLang();
  const {route} = useRoute();
  useEffect(()=>{ document.documentElement.lang = lang; },[lang]);

  const Page = React.useMemo(()=>{
    switch(route){
      case "/gallery": return <Gallery t={t}/>;
      case "/pricing": return <Pricing t={t}/>;
      case "/about": return <About t={t}/>;
      case "/process": return <Process t={t}/>;
      case "/essences": return <Essences t={t}/>;
      case "/contact": return <Contact t={t}/>;
      default: return <Home t={t}/>;
    }
  },[route, t]);

  useEffect(()=>{
    const root = document.getElementById("page");
    if(!root) return;
    root.classList.remove("page-enter","page-enter-active");
    root.classList.add("page-enter");
    requestAnimationFrame(()=>root.classList.add("page-enter-active"));
  },[route]);

  return (
    <>
      <Header t={t} lang={lang} setLang={setLang} />
      <main className="pt-16" id="page">
        {Page}
      </main>
      <footer className="bg-[#222] text-[#ddd]">
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
          <div>
            <div className="script text-2xl">{t.brand1}</div>
            <div className="text-sm text-[#bdbdbd]">{t.brand2}</div>
          </div>
          <div className="grid gap-2">
            <div className="font-semibold">Osobní přístup</div>
            <div className="text-sm text-[#bdbdbd]">Řešení na míru vašemu stylu.</div>
            <div className="font-semibold mt-3">Prémiová kvalita</div>
            <div className="text-sm text-[#bdbdbd]">Pečlivé zpracování detailů.</div>
            <div className="font-semibold mt-3">Ověřená odbornost</div>
            <div className="text-sm text-[#bdbdbd]">Dvacet let zkušeností.</div>
          </div>
          <div className="text-sm text-[#bdbdbd]">
            <p>&copy; 2025 {t.brand1}. {t.rights}</p>
          </div>
        </div>
      </footer>
      <div id="lb" className="lb" onClick={closeLightbox} aria-hidden="true">
        <button className="absolute top-5 right-6 text-white text-3xl" aria-label="Close" onclick="closeLightbox()">&times;</button>
        <img id="lbimg" alt="preview"/>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
// ---- Lightbox ----
function openLightbox(e, src) {
  e.preventDefault();
  const lb = document.getElementById("lb");
  const img = document.getElementById("lbimg");
  if (lb && img) {
    img.src = src;
    lb.style.display = "flex";
    lb.setAttribute("aria-hidden", "false");
  }
}

function closeLightbox() {
  const lb = document.getElementById("lb");
  if (lb) {
    lb.style.display = "none";
    lb.setAttribute("aria-hidden", "true");
  }
}
