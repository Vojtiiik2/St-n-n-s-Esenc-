const { useState, useEffect, useMemo } = React;
const MAIN_HERO =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1800&auto=format&fit=crop";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("reveal-visible");
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
  }, []);
}

const STR = {
  cs: {
    brand1: "Jana Segelberg",
    brand2: "Stínění s esencí",
    nav: ["Jak pracujeme", "Kolik zaplatíte", "Galerie", "Hotové stínění", "Esence", "Kontakt"],
    heroH1: "Kde se světlo setká s emocí",
    heroSub: "Záclony · Závěsy · Rolety · Esence",
    cta: "Nezávazná konzultace",

    homeAbout:
      "Navrhuji stínění, které ctí architekturu, rytmus dne a prostor. Každý detail ladím tak, aby látka, světlo a vůně tvořily harmonii vašeho domova. Jsme rodinná služba s více než dvaceti lety zkušeností s prací s látkou, jemností detailu a atmosférou interiéru. Každý projekt vnímáme individuálně — s respektem k prostoru, světlu i vašemu stylu. Věřím, že dobře navržené stínění dokáže proměnit domov v místo, kde se cítíte klidně, příjemně a sami sebou.",

    servicesH: "Služby",
    services: [
      { name: "Záclony", note: "Lehkost, jemnost a soukromí." },
      { name: "Závěsy", note: "Estetika, teplo a útulnost." },
      { name: "Rolety", note: "Praktičnost a čisté linie." },
      { name: "Technické systémy", note: "Minimalistické a funkční řešení." }
    ],

    benefitsH: "Proč my",
    benefits: [
      { name: "Individuální návrh", note: "Řešení vytvořené přesně pro váš prostor." },
      { name: "20 let zkušeností", note: "Znalost materiálů i technologií." },
      { name: "Jemnost detailu", note: "Každý šev a linie jsou promyšlené." }
    ],

    faqH: "Často se ptáte",
    faq: [
      { q: "Jak probíhá konzultace?", a: "Přijedu k vám, podívám se na prostor, zvolíme směr a materiály." },
      { q: "Jak dlouhá je výroba?", a: "Obvykle 3–6 týdnů podle materiálů a techniky." },
      { q: "Mohu vidět vzorky?", a: "Ano, přivezu vám je osobně při konzultaci." },
      { q: "Montujete i kolejnice?", a: "Ano, kompletní dodání na klíč." }
    ],

    inspH: "Atmosféra",
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
    name: "Jméno",
    email: "E-mail",
    message: "Zpráva",
    send: "Odeslat",
    rights: "Všechna práva vyhrazena."
  }
};

STR.en = STR.cs;

function useLang() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "cs");
  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);
  return { lang, setLang, t: STR[lang] };
}

function useRoute() {
  const [route, setRoute] = useState(() => location.hash.replace("#", "") || "/");
  useEffect(() => {
    const onHash = () => setRoute(location.hash.replace("#", "") || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return { route };
}

function go(path) {
  location.hash = path;
}

const Header = ({ t, lang, setLang }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 border-b border-[var(--line)]/70 bg-white/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between reveal">
        <div className="leading-4 cursor-pointer" onClick={() => go("/")}>
          <div className="script text-2xl -mb-0.5">{t.brand1}</div>
          <div className="text-xs tracking-wide text-[var(--muted)]">{t.brand2}</div>
        </div>

        <nav className="hidden md:flex gap-6 text-sm font-semibold">
          {t.nav.map((label, i) => {
            const path = ["/process", "/pricing", "/gallery", "/finished", "/essences", "/contact"][i];
            return (
              <button
                key={i}
                onClick={() => go(path)}
                className="relative group hover:text-[var(--text)]/90 text-[var(--text)]/75"
              >
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex gap-2">
          <button
            onClick={() => setLang("cs")}
            className={"px-3 py-1.5 text-sm rounded-lg border " + (lang === "cs" ? "border-[var(--sand)]" : "border-[var(--line)]")}
          >
            CZ
          </button>
          <button
            onClick={() => setLang("en")}
            className={"px-3 py-1.5 text-sm rounded-lg border " + (lang === "en" ? "border-[var(--sand)]" : "border-[var(--line)]")}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
};

function Hero({ t, small = false, bg, showCta = false }) {
  useReveal();
  return (
    <section
      className={(small ? "min-h-[42vh]" : "min-h-[92vh]") + " relative flex items-center reveal"}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,.20), rgba(0,0,0,.05)), url('${bg}')`,
        backgroundSize: "cover",
        backgroundPosition: "left center"
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/20"></div>
      <div className="relative max-w-6xl mx-auto px-4 w-full">
        <div className="max-w-2xl text-white drop-shadow-xl">
          <h1 className="script text-5xl md:text-6xl mb-3">{t.heroH1}</h1>
          <p className="text-lg opacity-95">{t.heroSub}</p>
          {!small && showCta && (
            <button
              onClick={() => go("/contact")}
              className="btn-cta inline-block mt-6 px-5 py-3 rounded-full bg-[var(--sand)] text-[var(--text)] font-bold border border-black/5"
            >
              {t.cta}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Home({ t }) {
  useReveal();

  return (
    <>
      <Hero t={t} bg={MAIN_HERO} showCta />

      <section className="py-16 max-w-4xl mx-auto px-4 reveal">
        <h2 className="script text-4xl mb-6">O nás</h2>
        <p className="text-[var(--muted)] text-lg leading-relaxed">{t.homeAbout}</p>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-4 reveal">
        <h2 className="script text-4xl mb-8">{t.servicesH}</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {t.services.map((s, i) => (
            <div key={i} className="service-card soft-shadow reveal">
              <div className="script text-3xl mb-2">{s.name}</div>
              <p className="text-[var(--muted)]">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-4 reveal">
        <h2 className="script text-4xl mb-8">{t.benefitsH}</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {t.benefits.map((b, i) => (
            <div key={i} className="benefit-card soft-shadow reveal">
              <div className="script text-3xl mb-2">{b.name}</div>
              <p className="text-[var(--muted)]">{b.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 reveal text-center">
        <button
          onClick={() => go("/contact")}
          className="btn-cta px-6 py-4 rounded-full bg-[var(--sand)] text-[var(--text)] font-bold border border-black/5 text-lg"
        >
          {t.cta}
        </button>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 reveal">
        <h2 className="script text-4xl mb-6">{t.faqH}</h2>
        {t.faq.map((f, i) => (
          <div key={i} className="faq-item">
            <div className="font-semibold mb-1">{f.q}</div>
            <div className="text-[var(--muted)]">{f.a}</div>
          </div>
        ))}
      </section>

      <section className="py-16 max-w-6xl mx-auto px-4 reveal">
        <h2 className="script text-4xl mb-8">{t.inspH}</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop"
          ].map((src, i) => (
            <div key={i} className="inspiration-img soft-shadow overflow-hidden">
              <img src={src} className="w-full h-full object-cover aspect-[4/3]" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Process({ t }) {
  useReveal();

  const IMGS = [
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505693416388-36a5ac3be353?q=80&w=1600&auto=format&fit=crop"
  ];

  return (
    <>
      <Hero t={t} small bg={IMGS[1]} />

      <section className="max-w-6xl mx-auto px-4 py-16 reveal">
        <h2 className="script text-4xl mb-10 text-left md:text-center">{t.processH}</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {t.steps.map((step, i) => (
            <div className="flex flex-col h-full reveal" key={i}>
              <img src={IMGS[i]} className="rounded-2xl soft-shadow w-full mb-4 object-cover aspect-[4/3]" />
              <div className="rounded-2xl bg-white border border-[var(--line)] p-6 soft-shadow flex-1 flex flex-col">
                <div className="script text-3xl mb-2">{step}</div>
                <p className="text-[var(--muted)] flex-1">{t.stepsTxt[i]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Pricing({ t }) {
  useReveal();

  return (
    <>
      <Hero
        t={t}
        small
        bg="https://images.unsplash.com/photo-1549187774-b4e9b0445b41?q=80&w=1800&auto=format&fit=crop"
      />
      <section className="max-w-6xl mx-auto px-4 py-16 reveal">
        <h2 className="script text-4xl mb-4">{t.priceH}</h2>
        <p className="text-[var(--muted)] max-w-3xl">{t.priceP}</p>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {["Voile / Záclona", "Závěs (blackout/dim-out)", "Kolejnice / systém"].map((name, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white border border-[var(--line)] p-6 soft-shadow reveal"
            >
              <div className="font-semibold mb-2">{name}</div>
              <div className="text-sm text-[var(--muted)]">Cena na míru po zaměření • materiál, rozměr, ušití</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Gallery({ t }) {
  useReveal();

  const GALLERY = [
    "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542326237-94b1c5a538d6?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521783988139-893ce3cdb4e8?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1600&auto=format&fit=crop"
  ];

  return (
    <>
      <Hero
        t={t}
        small
        bg="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1800&auto=format&fit=crop"
      />

      <section className="max-w-6xl mx-auto px-4 py-16 reveal">
        <h2 className="script text-4xl mb-6">{t.galleryH}</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY.map((src, i) => (
            <a key={i} href={src} className="relative group reveal" onClick={(e) => openLightbox(e, src)}>
              <img src={src} className="rounded-xl soft-shadow w-full h-full object-cover aspect-[4/3]" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition rounded-xl"></div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

function Finished({ t }) {
  useReveal();

  return (
    <>
      <Hero
        t={t}
        small
        bg="https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1800&auto=format&fit=crop"
      />

      <section className="max-w-6xl mx-auto px-4 py-16 reveal">
        <h2 className="script text-4xl mb-6">{t.finishedH}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.finished.map((f, i) => (
            <div key={i} className="rounded-2xl border border-[var(--line)] p-6 soft-shadow reveal bg-gradient-to-b from-white to-[var(--bg2)]">
              <div className="script text-3xl mb-2">{f.name}</div>
              <p className="text-[var(--muted)]">{f.note}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Essences({ t }) {
  useReveal();

  return (
    <>
      <Hero
        t={t}
        small
        bg="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1800&auto=format&fit=crop"
      />

      <section className="max-w-6xl mx-auto px-4 py-16 reveal">
        <h2 className="script text-4xl mb-6">{t.essenceH}</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.essences.map((e, i) => (
            <div key={i} className="rounded-2xl border border-[var(--line)] p-6 soft-shadow reveal bg-gradient-to-b from-white to-[var(--bg2)]">
              <h3 className="script text-3xl">{e.name}</h3>
              <p className="text-[var(--muted)] mt-2">{e.note}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Contact({ t }) {
  useReveal();

  return (
    <>
      <Hero
        t={t}
        small
        bg="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1800&auto=format&fit=crop"
      />

      <section className="max-w-6xl mx-auto px-4 py-16 reveal">
        <h2 className="script text-4xl mb-6">{t.contactH}</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p><strong>{t.name}</strong><br />Jana Segelberg</p>

            <p className="mt-3"><strong>E-mail</strong><br />
              <a href="mailto:hello@janasegelberg.com" className="underline">hello@janasegelberg.com</a></p>

            <p className="mt-3"><strong>Telefon</strong><br />
              <a href="tel:+420724379309" className="underline">+420 724 379 309</a></p>

            <p className="text-[var(--muted)] text-sm mt-6">
              Po schválení vizuálu napojíme formulář na Google Sheets + auto-reply (CZ/EN).
            </p>
          </div>

          <form className="rounded-2xl bg-white border border-[var(--line)] p-6 soft-shadow reveal">
            <div className="grid gap-4">
              <label className="text-sm">
                {t.name}
                <input className="mt-1 w-full border rounded-lg px-3 py-2 border-[var(--line)]" required />
              </label>

              <label className="text-sm">
                {t.email}
                <input type="email" className="mt-1 w-full border rounded-lg px-3 py-2 border-[var(--line)]" required />
              </label>

              <label className="text-sm">
                {t.message}
                <textarea rows="5" className="mt-1 w-full border rounded-lg px-3 py-2 border-[var(--line)]" required></textarea>
              </label>

              <button type="button" className="btn-cta px-5 py-3 rounded-full bg-[var(--sand)] text-[var(--text)] font-bold border border-black/5">
                {t.send}
              </button>

              <p className="text-[var(--muted)] text-sm">* Demo formulář – bez odesílání.</p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function App() {
  const { lang, setLang, t } = useLang();
  const { route } = useRoute();
  useReveal();

  const Page = useMemo(() => {
    switch (route) {
      case "/process":
        return <Process t={t} />;
      case "/pricing":
        return <Pricing t={t} />;
      case "/gallery":
        return <Gallery t={t} />;
      case "/finished":
        return <Finished t={t} />;
      case "/essences":
        return <Essences t={t} />;
      case "/contact":
        return <Contact t={t} />;
      default:
        return <Home t={t} />;
    }
  }, [route, t]);

  return (
    <>
      <Header t={t} lang={lang} setLang={setLang} />
      <main className="pt-16">{Page}</main>

      <footer className="bg-[#222] text-[#ddd] mt-10 reveal">
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
        <button className="absolute top-5 right-6 text-white text-3xl" aria-label="Close" onClick={closeLightbox}>
          &times;
        </button>
        <img id="lbimg" alt="preview" />
      </div>
    </>
  );
}

function openLightbox(e, src) {
  e.preventDefault();
  const lb = document.getElementById("lb");
  const img = document.getElementById("lbimg");
  img.src = src;
  lb.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lb").style.display = "none";
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);




