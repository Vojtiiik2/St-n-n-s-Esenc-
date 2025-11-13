const { useState, useEffect, useMemo } = React;

// -------- i18n --------
const STR = {
  cs: {
    brand1: "Jana Segelberg",
    brand2: "Stínění s esencí",
    nav: ["Jak pracujeme", "Kolik zaplatíte", "Galerie", "Hotové stínění", "Esence", "Kontakt"],
    heroH1: "Kde se světlo setká s emocí",
    heroSub: "Záclony · Závěsy · Rolety · Esence",
    cta: "Nezávazná konzultace",
    homeAbout: "Navrhuji stínění, které ctí architekturu, rytmus dne a prostor. Každý detail ladím tak, aby látka, světlo a vůně tvořily harmonii vašeho domova.",
    priceH: "Kolik zaplatíte",
    priceP: "Ceny jsou orientační; závisí na materiálu, rozměrech a typu systému. Rámec sdělím na první schůzce.",
    processH: "Jak pracujeme",
    steps: ["Konzultace", "Návrh", "Realizace"],
    stepsTxt: [
      "Poznáme váš prostor a očekávání, nastavíme rámec.",
      "Zvolíme látky a technologii, připravíme harmonogram.",
      "Precizní výroba, čistá montáž a hladké předání."
    ],
    finishedH: "Hotové stínění",
    finished: [
      { name: "Blackout", note: "Úplné zatemnění – ideální do ložnic a projekčních místností." },
      { name: "Záclona (Voál)", note: "Lehkost, která propouští světlo a zachovává soukromí." },
      { name: "Dekorační závěs", note: "Dodává prostoru hloubku a charakter." },
      { name: "Kombinované stínění", note: "Spojuje praktické i estetické vrstvy." },
      { name: "Technické stínění", note: "Minimalistické a funkční řešení." },
      { name: "Individuální řešení", note: "Na míru prostoru i atmosféře." }
    ],
    essenceH: "Esence",
    essences: [
      { name: "Vanilka", note: "Hřejivá, uklidňující – ložnice, čtecí kout." },
      { name: "Peppermint", note: "Čistý, svěží – pracovna, kuchyně." },
      { name: "Citrus", note: "Lehký, radostný – obývák, koupelna." },
      { name: "Levandule", note: "Uvolňuje – ložnice, wellness." },
      { name: "Rozmarýn", note: "Čistí a posiluje – vstup, kuchyně." },
      { name: "Eukalyptus", note: "Osvěžuje dech – koupelna." },
      { name: "Sezónní", note: "Měsíční speciál – mění se automaticky." }
    ],
    galleryH: "Galerie",
    contactH: "Kontakt",
    name: "Jméno", email: "E-mail", message: "Zpráva", send: "Odeslat",
    rights: "Všechna práva vyhrazena."
  },
  en: {
    brand1: "Jana Segelberg",
    brand2: "Shade & Scent",
    nav: ["Process", "Pricing", "Gallery", "Finished shading", "Essences", "Contact"],
    heroH1: "Where light meets emotion",
    heroSub: "Curtains · Drapes · Blinds · Scents",
    cta: "Free Consultation",
    homeAbout: "We design shading that respects architecture, rhythm and emotion. Every detail combines fabric, light and scent to create harmony at home.",
    priceH: "Pricing",
    priceP: "Indicative only; depends on materials, sizes and systems. You'll get a budget frame at our first meeting.",
    processH: "Process",
    steps: ["Consultation", "Design", "Installation"],
    stepsTxt: [
      "We discover your space and expectations.",
      "We select fabrics and systems, set a schedule.",
      "Made to measure, precise installation, clean handover."
    ],
    finishedH: "Finished shading",
    finished: [
      { name: "Blackout", note: "Full darkness for bedrooms and media rooms." },
      { name: "Voile curtain", note: "Soft light, privacy preserved." },
      { name: "Decorative drape", note: "Adds depth and character." },
      { name: "Layered shading", note: "Merges function and beauty." },
      { name: "Technical shading", note: "Minimalist and practical." },
      { name: "Custom solution", note: "Tailored to your space and mood." }
    ],
    essenceH: "Essences",
    essences: [
      { name: "Vanilla", note: "Warm, soothing — bedroom, reading nook." },
      { name: "Peppermint", note: "Clean, fresh — home office, kitchen." },
      { name: "Citrus", note: "Light, uplifting — living room, bathroom." },
      { name: "Lavender", note: "Relaxing — bedroom, wellness." },
      { name: "Rosemary", note: "Cleansing, energizing — entry, kitchen." },
      { name: "Eucalyptus", note: "Refreshing — bathroom." },
      { name: "Seasonal", note: "Monthly special — changes automatically." }
    ],
    galleryH: "Gallery",
    contactH: "Contact",
    name: "Name", email: "E-mail", message: "Message", send: "Send",
    rights: "All rights reserved."
  }
};

// jazykový hook
function useLang() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "cs");
  useEffect(() => { localStorage.setItem("lang", lang); document.documentElement.lang = lang; }, [lang]);
  return { lang, setLang, t: STR[lang] };
}

// router
const ROUTES = {
  "/": "Home",
  "/process": "Process",
  "/pricing": "Pricing",
  "/gallery": "Gallery",
  "/finished": "Finished",
  "/essences": "Essences",
  "/contact": "Contact"
};
function useRoute() {
  const [route, setRoute] = useState(() => location.hash.replace("#", "") || "/");
  useEffect(() => {
    const onHash = () => setRoute(location.hash.replace("#", "") || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return { route, setRoute };
}
function go(path) { location.hash = path; }

// --- header ---
const Header = ({ t, lang, setLang }) => (
  <header className="fixed top-0 left-0 right-0 z-30 border-b border-[var(--line)]/70 bg-white/70 glass">
    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="leading-4 cursor-pointer" onClick={() => go("/")}>
        <div className="script text-2xl -mb-0.5">{t.brand1}</div>
        <div className="text-xs tracking-wide text-[var(--muted)]">{t.brand2}</div>
      </div>
      <nav className="hidden md:flex gap-6 text-sm font-semibold">
        {t.nav.map((label, i) => {
          const path = ["/process", "/pricing", "/gallery", "/finished", "/essences", "/contact"][i];
          return <a key={i} className="nav-link hover:text-[var(--text)]/90 text-[var(--text)]/75" onClick={() => go(path)}>{label}</a>
        })}
      </nav>
      <div className="flex gap-2">
        <button onClick={() => setLang("cs")} className={"px-3 py-1.5 text-sm rounded-lg border " + (lang === "cs" ? "border-[var(--sand)]" : "border-[var(--line)]")}>CZ</button>
        <button onClick={() => setLang("en")} className={"px-3 py-1.5 text-sm rounded-lg border " + (lang === "en" ? "border-[var(--sand)]" : "border-[var(--line)]")}>EN</button>
      </div>
    </div>
  </header>
);

function Hero({ t, small = false, bg }) {
  return (
    <section className={"relative " + (small ? "min-h-[42vh]" : "min-h-[92vh]") + " flex items-center"} style={{
      backgroundImage: `linear-gradient(to right, rgba(0,0,0,.20), rgba(0,0,0,.05)), url('${bg}')`,
      backgroundSize: "cover", backgroundPosition: "left center"
    }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15"></div>
      <div className="relative max-w-6xl mx-auto px-4 w-full">
        <div className="max-w-2xl text-white drop-shadow-[0_2px_14px_rgba(0,0,0,.35)]">
          <h1 className={"script " + (small ? "text-3xl md:text-5xl" : "text-4xl md:text-6xl") + " mb-3"}>{t.heroH1}</h1>
          <p className={(small ? "text-sm md:text-base" : "text-base md:text-lg") + " opacity-95"}>{t.heroSub}</p>
        </div>
      </div>
    </section>
  );
}

const HEROS = {
  process: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1800&auto=format&fit=crop",
  pricing: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?q=80&w=1800&auto=format&fit=crop",
  gallery: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1800&auto=format&fit=crop",
  finished: "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1800&auto=format&fit=crop",
  essences: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1800&auto=format&fit=crop",
  contact: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1800&auto=format&fit=crop"
};

// --- sekce Hotové stínění ---
function Finished({ t }) {
  return (
    <>
      <Hero t={t} small bg={HEROS.finished} />
      <section className="section-swap" data-first>
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
          <h2 className="script text-4xl mb-6">{t.finishedH}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.finished.map((f, i) => (
              <div key={i} className="rounded-2xl border border-[var(--line)] p-6 soft-shadow bg-gradient-to-b from-white to-[var(--bg2)] hover:from-white hover:to-white transition">
                <div className="script text-3xl mb-2">{f.name}</div>
                <p className="text-[var(--muted)]">{f.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ostatní sekce zůstaly beze změn – Process, Pricing, Gallery, Essences, Contact (stejné jako předtím)

function App() {
  const { lang, setLang, t } = useLang();
  const { route } = useRoute();

  const Page = useMemo(() => {
    switch (route) {
      case "/process": return <Process t={t} />;
      case "/pricing": return <Pricing t={t} />;
      case "/gallery": return <Gallery t={t} />;
      case "/finished": return <Finished t={t} />;
      case "/essences": return <Essences t={t} />;
      case "/contact": return <Contact t={t} />;
      default: return <Home t={t} />;
    }
  }, [route, t]);

  return (
    <>
      <Header t={t} lang={lang} setLang={setLang} />
      <main className="pt-16">{Page}</main>
      <footer className="bg-[#222] text-[#ddd] mt-10">
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
        <button className="absolute top-5 right-6 text-white text-3xl" aria-label="Close" onClick={closeLightbox}>&times;</button>
        <img id="lbimg" alt="preview" />
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
