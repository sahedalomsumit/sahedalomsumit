import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  EyeOff,
  NavigationOff,
  LayoutTemplate,
  Smartphone,
  MousePointerClick,
  ShieldCheck,
  Zap,
  Link,
  Search,
  CheckCircle,
  Palette,
  Star,
  Send,
  XCircle,
  Mail,
  Phone,
  Plus,
} from "lucide-react";
const heroImg = "/img/landing/hero_spa_sage.png";
const profileImg = "/img/landing/sahedalomsumit-profile-removebg-preview.png";
const blobSvg = "/img/landing/blob.svg";
import "./SpaBern.css";

/* ─────────────────── Scroll Reveal Hook ─────────────────── */
function Reveal({ children, delay = 0, className = "", style = {} }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1],
        delay: delay ? delay / 1000 : 0,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────── Hero ─────────────────── */
const Hero = () => (
  <section
    className="section"
    style={{
      paddingTop: "100px",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <Reveal>
      <div className="badge">Con sede a Helsinki, Finlandia</div>
    </Reveal>

    <Reveal delay={100}>
      <h1 style={{ marginTop: "16px", maxWidth: "900px" }}>
        Ottieni più prenotazioni Spa a Berna —{" "}
        <span className="text-italic" style={{ color: "var(--primary)" }}>
          Senza pagare per le pubblicità
        </span>
      </h1>
    </Reveal>

    <Reveal delay={200}>
      <p
        style={{
          marginTop: "32px",
          fontSize: "1.4rem",
          lineHeight: 1.5,
          maxWidth: "700px",
        }}
      >
        I redesign spa websites for businesses a Berna so visitors instantly{" "}
        <strong style={{ color: "var(--text)" }}>trust you</strong>, feel
        relaxed, and actually book — instead of leaving.
      </p>
    </Reveal>

    <Reveal delay={300}>
      <div
        style={{
          marginTop: "48px",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <a
          href="#audit"
          className="btn btn-primary"
          id="hero-cta"
          aria-label="Get a free homepage audit"
        >
          Richiedi un Audit Gratuito della Homepage{" "}
          <ArrowRight size={20} style={{ marginLeft: "10px" }} />
        </a>
        <div className="offer-pill">
          <Star size={16} style={{ color: "var(--secondary)" }} />
          <span>
            Sconto del 25% sul tuo primo progetto — posti limitati a Berna
          </span>
        </div>
      </div>
    </Reveal>

    <Reveal delay={400}>
      <div
        style={{
          marginTop: "80px",
          borderRadius: "40px",
          overflow: "hidden",
          height: "520px",
          width: "100%",
          position: "relative",
        }}
      >
        <img
          src={heroImg}
          alt="Premium spa interior showcasing a calm, minimalist design aesthetic a Berna"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          className="glass"
          style={{
            position: "absolute",
            bottom: "40px",
            right: "40px",
            padding: "32px",
            borderRadius: "24px",
            maxWidth: "280px",
          }}
        >
          <h3 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>
            A servizio di Berna
          </h3>
          <p style={{ fontSize: "0.95rem", margin: 0, maxWidth: "none" }}>
            Strategia specializzata per il mercato del benessere bernese.
          </p>
        </div>
      </div>
    </Reveal>
  </section>
);

/* ─────────────────── Problem ─────────────────── */
const Problem = () => (
  <section className="section">
    <Reveal>
      <h2 style={{ maxWidth: "720px" }}>
        Molti siti web spa a Berna sembrano "ok"…{" "}
        <span className="text-italic" style={{ color: "var(--secondary)" }}>
          ma silenziosamente perdono clienti ogni giorno.
        </span>
      </h2>
    </Reveal>

    <div className="grid-bento" style={{ marginTop: "56px" }}>
      <Reveal
        delay={0}
        className="bento-card"
        style={{
          gridColumn: "span 8",
          background: "var(--primary)",
          color: "white",
        }}
      >
        <EyeOff
          size={40}
          style={{ marginBottom: "24px", color: "var(--secondary)" }}
        />
        <h3 style={{ color: "white", fontSize: "2rem", marginBottom: "16px" }}>
          Differenziazione invisibile
        </h3>
        <p
          style={{
            color: "rgba(255,255,255,0.82)",
            fontSize: "1.15rem",
            maxWidth: "none",
          }}
        >
          I visitatori non vedono chiaramente cosa rende la tua spa diversa da
          quella tre strade più in là. Se ne vanno senza prenotare — e scelgono
          qualcun altro.
        </p>
      </Reveal>

      <Reveal
        delay={80}
        className="bento-card"
        style={{ gridColumn: "span 4" }}
      >
        <Smartphone
          size={32}
          style={{ marginBottom: "24px", color: "var(--primary)" }}
        />
        <h3 style={{ fontSize: "1.5rem", marginBottom: "12px" }}>
          Problemi su dispositivi mobili
        </h3>
        <p>
          L'esperienza mobile è frustrante — e la maggior parte dei clienti
          proviene dal proprio telefono.
        </p>
      </Reveal>

      <Reveal
        delay={160}
        className="bento-card"
        style={{ gridColumn: "span 4" }}
      >
        <NavigationOff
          size={32}
          style={{ marginBottom: "24px", color: "var(--primary)" }}
        />
        <h3 style={{ fontSize: "1.5rem", marginBottom: "12px" }}>
          Prenotazione nascosta
        </h3>
        <p>
          La prenotazione è nascosta o confusa — quindi i visitatori si
          arrendono prima di agire.
        </p>
      </Reveal>

      <Reveal
        delay={240}
        className="bento-card"
        style={{ gridColumn: "span 8", borderColor: "var(--secondary)" }}
      >
        <LayoutTemplate
          size={32}
          style={{ marginBottom: "24px", color: "var(--primary)" }}
        />
        <h3 style={{ fontSize: "1.5rem", marginBottom: "12px" }}>
          Estetica non allineata
        </h3>
        <p style={{ fontSize: "1.1rem" }}>
          Il design non riflette un'esperienza calma e premium — così le persone
          non percepiscono la qualità della tua spa prima di entrare.
        </p>
      </Reveal>
    </div>

    <Reveal delay={200}>
      <div className="callout-bar" style={{ marginTop: "48px" }}>
        <p
          style={{
            margin: 0,
            color: "var(--primary)",
            fontWeight: 600,
            fontSize: "1.15rem",
            maxWidth: "none",
          }}
        >
          Quindi le persone se ne vanno — e scelgono un'altra spa a Berna.
        </p>
      </div>
    </Reveal>
  </section>
);

/* ─────────────────── Solution ─────────────────── */
const Solution = () => (
  <section
    className="section"
    style={{
      background: "var(--primary)",
      borderRadius: "60px",
      color: "white",
    }}
  >
    <div className="grid-bento">
      <Reveal style={{ gridColumn: "span 5" }}>
        <div style={{ gridColumn: "span 5" }}>
          <div
            className="badge"
            style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
          >
            La Soluzione
          </div>
          <h2 style={{ color: "white", marginTop: "16px" }}>
            Trasforma il tuo sito web in{" "}
            <span className="text-italic" style={{ color: "var(--secondary)" }}>
              un'esperienza di prenotazione per clienti.
            </span>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              marginTop: "24px",
              maxWidth: "none",
            }}
          >
            Aiuto le aziende spa e wellness a Berna a riprogettare il loro sito
            web da una brochure passiva in un motore di prenotazione attivo.
          </p>
          <a
            href="#audit"
            className="btn"
            style={{
              marginTop: "40px",
              background: "var(--secondary)",
              color: "var(--text)",
            }}
          >
            Inizia ora <ArrowRight size={18} style={{ marginLeft: "8px" }} />
          </a>
        </div>
      </Reveal>

      <div
        className="solution-grid"
        style={{
          gridColumn: "span 7",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}
      >
        {[
          {
            icon: <ArrowRight size={24} />,
            title: "Percorso Visita → Prenotazione Chiaro",
            text: "Un viaggio senza intoppi dal primo clic alla prenotazione confermata.",
          },
          {
            icon: <ShieldCheck size={24} />,
            title: "Una forte prima impressione",
            text: "Un design premium e calmo stabilisce fiducia in pochi secondi.",
          },
          {
            icon: <Palette size={24} />,
            title: "Design allineato al brand",
            text: "Un design che riflette autenticamente l'identità e l'atmosfera della tua spa.",
          },
          {
            icon: <Smartphone size={24} />,
            title: "Esperienza mobile fluida",
            text: "Impeccabile su tutti i dispositivi — specialmente sui telefoni che usano i tuoi clienti.",
          },
        ].map((item, i) => (
          <Reveal key={i} delay={i * 80}>
            <div
              style={{
                borderLeft: "2px solid var(--secondary)",
                paddingLeft: "20px",
              }}
            >
              <div style={{ color: "var(--secondary)", marginBottom: "12px" }}>
                {item.icon}
              </div>
              <h4
                style={{
                  fontSize: "1.15rem",
                  marginBottom: "8px",
                  color: "white",
                }}
              >
                {item.title}
              </h4>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "rgba(255,255,255,0.72)",
                  margin: 0,
                  maxWidth: "none",
                }}
              >
                {item.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>

    <Reveal delay={200}>
      <div
        style={{
          marginTop: "56px",
          padding: "28px 36px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "20px",
          borderLeft: "4px solid var(--secondary)",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "white",
            fontSize: "1.2rem",
            fontWeight: 600,
            maxWidth: "none",
          }}
        >
          Risultato: Più visitatori diventano clienti paganti.
        </p>
      </div>
    </Reveal>
  </section>
);

/* ─────────────────── Limited Offer ─────────────────── */
const LimitedOffer = () => (
  <section className="section">
    <Reveal>
      <div className="offer-card">
        <div
          className="badge"
          style={{ background: "var(--secondary)", color: "white" }}
        >
          Offerta Limitata
        </div>
        <h2 style={{ marginTop: "16px", maxWidth: "700px" }}>
          Sconto del 25% per Aziende Spa{" "}
          <span className="text-italic" style={{ color: "var(--primary)" }}>
            a Berna
          </span>
        </h2>
        <p style={{ fontSize: "1.2rem", marginTop: "24px" }}>
          Per facilitare l'inizio senza alcun rischio:
        </p>
        <ul className="offer-list">
          <li>
            <CheckCircle
              size={20}
              style={{ color: "var(--primary)", flexShrink: 0 }}
            />
            <span>Sconto del 25% sul tuo primo progetto</span>
          </li>
          <li>
            <CheckCircle
              size={20}
              style={{ color: "var(--primary)", flexShrink: 0 }}
            />
            <span>Disponibile per un numero limitato di spa locali</span>
          </li>
          <li>
            <CheckCircle
              size={20}
              style={{ color: "var(--primary)", flexShrink: 0 }}
            />
            <span>
              Un modo semplice per migliorare il tuo sito senza pieno rischio
            </span>
          </li>
        </ul>
        <a
          href="#audit"
          className="btn btn-primary"
          style={{ marginTop: "40px" }}
        >
          Prenota il tuo posto{" "}
          <ArrowRight size={18} style={{ marginLeft: "8px" }} />
        </a>
      </div>
    </Reveal>
  </section>
);

/* ─────────────────── Outcomes ─────────────────── */
const Outcomes = () => (
  <section className="section">
    <Reveal>
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <h2>
          Quello che{" "}
          <span className="text-italic" style={{ color: "var(--primary)" }}>
            ottieni realmente.
          </span>
        </h2>
        <p style={{ margin: "16px auto 0", textAlign: "center" }}>
          Risultati reali e misurabili — non solo un sito web più bello.
        </p>
      </div>
    </Reveal>

    <div className="grid-bento">
      {[
        {
          icon: <MousePointerClick size={36} />,
          title: "Più prenotazioni dal tuo sito web",
          text: "I tuoi visitatori non esitano — agiscono. CTA chiare e persuasive li guidano dall'interesse all'appuntamento.",
          size: "span 6",
          accent: true,
        },
        {
          icon: <ShieldCheck size={36} />,
          title: "Fiducia Immediata",
          text: "Il tuo sito web riflette la vera qualità della tua spa — prima ancora che entrino dalla porta.",
          size: "span 6",
        },
        {
          icon: <Smartphone size={36} />,
          title: "Migliore esperienza mobile",
          text: "Prenotazione semplice dal telefono — da dove proviene la maggior parte dei clienti. Nessuna frizione, nessuna confusione.",
          size: "span 4",
        },
        {
          icon: <Zap size={36} />,
          title: "Maggiore Indipendenza",
          text: "Minore dipendenza dalle piattaforme di prenotazione di terze parti che prendono i tuoi margini e dati.",
          size: "span 4",
        },
        {
          icon: <Link size={36} />,
          title: "Presenza locale più forte",
          text: "Distinguiti tra le aziende spa a Berna con un sito che sembra appartenere alla vetta.",
          size: "span 4",
        },
      ].map((item, i) => (
        <Reveal
          key={i}
          delay={i * 80}
          className="bento-card outcome-card"
          style={{
            gridColumn: item.size,
            background: item.accent ? "var(--primary)" : undefined,
            color: item.accent ? "white" : undefined,
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: item.accent ? "var(--secondary)" : "var(--primary)",
              marginBottom: "20px",
            }}
          >
            {item.icon}
          </div>
          <h3
            style={{
              fontSize: "1.25rem",
              marginBottom: "12px",
              color: item.accent ? "white" : undefined,
            }}
          >
            {item.title}
          </h3>
          <p
            style={{
              fontSize: "0.95rem",
              margin: 0,
              maxWidth: "none",
              color: item.accent ? "rgba(255,255,255,0.8)" : undefined,
            }}
          >
            {item.text}
          </p>
        </Reveal>
      ))}
    </div>
  </section>
);

/* ─────────────────── Audit Form ─────────────────── */
const AuditForm = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    url: "",
    phone: "",
    notes: "",
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    if (name === "name" && !value) {
      error = "Il nome è obbligatorio";
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        error = "L'email è obbligatoria";
      } else if (!emailRegex.test(value)) {
        error = "Inserisci un indirizzo email valido";
      }
    } else if (name === "url") {
      const urlRegex =
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/;
      if (!value) {
        error = "L'URL del sito web è obbligatorio";
      } else if (!urlRegex.test(value)) {
        error = "Inserisci un URL valido (es. www.esempio.it)";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const validate = () => {
    const isNameValid = validateField("name", state.name);
    const isEmailValid = validateField("email", state.email);
    const isUrlValid = validateField("url", state.url);
    return isNameValid && isEmailValid && isUrlValid;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const SHEETDB_URL = import.meta.env.VITE_SHEETDB_URL;

    try {
      const response = await fetch(SHEETDB_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              ...state,
              date: new Date().toLocaleString("it-IT"),
            },
          ],
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Invio fallito");
      }
    } catch (error) {
      console.error("Errore durante l'invio del lead:", error);
      alert("Qualcosa è andato storto. Riprova o contattami direttamente.");
    } finally {
      setLoading(false);
    }
  };

  const clearField = (field) => {
    setState({ ...state, [field]: "" });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  if (submitted) {
    return (
      <div
        style={{
          padding: "48px",
          background: "var(--primary)",
          borderRadius: "24px",
          textAlign: "center",
          color: "white",
        }}
      >
        <CheckCircle
          size={48}
          style={{
            color: "var(--secondary)",
            marginBottom: "16px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <h3 style={{ color: "white", fontSize: "1.5rem", marginBottom: "8px" }}>
          Sei nella lista!
        </h3>
        <p
          style={{
            color: "rgba(255,255,255,0.8)",
            margin: 0,
            maxWidth: "none",
          }}
        >
          Esaminerò il tuo sito web e ti ricontatterò entro 48 ore con spunti
          chiari.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: "4px" }}
    >
      <div className="form-field">
        <fieldset className={errors.name ? "has-error" : ""}>
          <legend>
            Nome Completo <span className="required">*</span>
          </legend>
          <div className="input-wrapper">
            <input
              type="text"
              name="name"
              placeholder="es. Jakob Berner"
              value={state.name}
              onBlur={handleBlur}
              onChange={(e) => {
                setState({ ...state, name: e.target.value });
                if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
              }}
            />
            {state.name && (
              <button
                type="button"
                className="clear-btn"
                onClick={() => clearField("name")}
              >
                <XCircle size={16} />
              </button>
            )}
          </div>
        </fieldset>
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-field">
        <fieldset className={errors.email ? "has-error" : ""}>
          <legend>
            Email <span className="required">*</span>
          </legend>
          <div className="input-wrapper">
            <input
              type="email"
              name="email"
              placeholder="es. jakob@spa-bern.ch"
              value={state.email}
              onBlur={handleBlur}
              onChange={(e) => {
                setState({ ...state, email: e.target.value });
                if (errors.email)
                  setErrors((prev) => ({ ...prev, email: null }));
              }}
            />
            {state.email && (
              <button
                type="button"
                className="clear-btn"
                onClick={() => clearField("email")}
              >
                <XCircle size={16} />
              </button>
            )}
          </div>
        </fieldset>
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-field">
        <fieldset className={errors.url ? "has-error" : ""}>
          <legend>
            URL del sito web <span className="required">*</span>
          </legend>
          <div className="input-wrapper">
            <input
              type="text"
              name="url"
              placeholder="es. www.spabern-wellness.ch"
              value={state.url}
              onBlur={handleBlur}
              onChange={(e) => {
                setState({ ...state, url: e.target.value });
                if (errors.url) setErrors((prev) => ({ ...prev, url: null }));
              }}
            />
            {state.url && (
              <button
                type="button"
                className="clear-btn"
                onClick={() => clearField("url")}
              >
                <XCircle size={16} />
              </button>
            )}
          </div>
        </fieldset>
        {errors.url && <span className="form-error">{errors.url}</span>}
      </div>

      {!isExpanded ? (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="expand-btn"
        >
          <Plus size={16} /> Aggiungi numero WhatsApp e note
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          <div className="form-field">
            <fieldset>
              <legend>Numero WhatsApp</legend>
              <div className="input-wrapper">
                <input
                  type="tel"
                  name="phone"
                  placeholder="es. +41 79 123 45 67"
                  value={state.phone}
                  onChange={(e) => {
                    setState({ ...state, phone: e.target.value });
                  }}
                />
                {state.phone && (
                  <button
                    type="button"
                    className="clear-btn"
                    onClick={() => clearField("phone")}
                  >
                    <XCircle size={16} />
                  </button>
                )}
              </div>
            </fieldset>
          </div>

          <div className="form-field">
            <fieldset>
              <legend>Note specifiche?</legend>
              <div className="input-wrapper">
                <textarea
                  name="notes"
                  placeholder="Raccontami di più sui tuoi obiettivi o dubbi specifici..."
                  value={state.notes}
                  onChange={(e) =>
                    setState({ ...state, notes: e.target.value })
                  }
                />
              </div>
            </fieldset>
          </div>
        </motion.div>
      )}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
        style={{ width: "100%", marginTop: "16px", opacity: loading ? 0.7 : 1 }}
      >
        {loading ? (
          "Invio in corso…"
        ) : (
          <>
            Richiedi il tuo Audit gratuito{" "}
            <Send size={20} style={{ marginLeft: "10px" }} />
          </>
        )}
      </button>
      <div className="form-subtext">
        No spam. Nessuna pressione commerciale. Solo approfondimenti chiari.
      </div>
    </form>
  );
};

/* ─────────────────── Sections ─────────────────── */
const FreeAudit = () => (
  <section id="audit" className="section" style={{ paddingBottom: "0" }}>
    <Reveal>
      <div
        style={{
          background:
            "linear-gradient(135deg, var(--bg-card) 0%, #fef0f6 100%)",
          border: "1px solid var(--stone)",
          borderRadius: "40px",
          padding: "80px 5vw",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "center",
        }}
        className="audit-grid"
      >
        <div>
          <div className="badge">Gratuito — Senza vincoli</div>
          <h2 style={{ marginTop: "16px", maxWidth: "580px" }}>
            Esaminerò personalmente la tua homepage e ti mostrerò{" "}
            <span className="text-italic" style={{ color: "var(--primary)" }}>
              esattamente cosa ti sta costando prenotazioni.
            </span>
          </h2>
          <div style={{ marginTop: "40px", display: "grid", gap: "24px" }}>
            {[
              { icon: <Search size={20} />, text: "Dove perdi clienti" },
              {
                icon: <NavigationOff size={20} />,
                text: "Cosa blocca le prenotazioni",
              },
              {
                icon: <Zap size={20} />,
                text: "Cosa può essere migliorato rapidamente",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: "16px", alignItems: "center" }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "var(--stone)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--primary)",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    color: "var(--text)",
                    maxWidth: "none",
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div
            className="badge"
            style={{ background: "var(--secondary)", color: "white" }}
          >
            Posti limitati a Berna
          </div>
          <h3
            style={{
              fontSize: "1.8rem",
              marginTop: "16px",
              marginBottom: "8px",
            }}
          >
            Richiedi il tuo Audit gratuito
          </h3>
          <p style={{ marginBottom: "32px", fontSize: "1rem" }}>
            Invia il tuo sito web e ti ricontatterò con idee di miglioramento
            chiare.
          </p>
          <AuditForm />
        </div>
      </div>
    </Reveal>
  </section>
);

const Process = () => (
  <section id="process" className="section">
    <Reveal>
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <h2>
          Come{" "}
          <span className="text-italic" style={{ color: "var(--primary)" }}>
            funziona.
          </span>
        </h2>
        <p style={{ margin: "16px auto 0", textAlign: "center" }}>
          Quattro semplici passaggi. Nessun impegno finché non sei pronto.
        </p>
      </div>
    </Reveal>
    <div className="grid-bento">
      {[
        {
          step: "01",
          icon: <Send size={28} />,
          title: "Invia il tuo sito",
          text: "Inserisci il link del tuo sito — ci vogliono 30 secondi.",
        },
        {
          step: "02",
          icon: <Search size={28} />,
          title: "Lo esamino",
          text: "Analizzo personalmente la tua homepage per scovare i gap di conversione.",
        },
        {
          step: "03",
          icon: <CheckCircle size={28} />,
          title: "Ottieni idee chiare",
          text: "Un'analisi concisa e pratica su cosa sistemare e perché.",
        },
        {
          step: "04",
          icon: <Zap size={28} />,
          title: "Miglioriamo insieme",
          text: "Se vuoi — lo realizziamo (con il 25% di sconto sul primo progetto).",
        },
      ].map((item, i) => (
        <Reveal key={i} delay={i * 100} style={{ gridColumn: "span 3" }}>
          <div
            className="bento-card"
            style={{ textAlign: "center", alignItems: "center" }}
          >
            <div className="step-number">{item.step}</div>
            <div style={{ color: "var(--primary)", margin: "20px 0 16px" }}>
              {item.icon}
            </div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
              {item.title}
            </h3>
            <p style={{ fontSize: "0.95rem", margin: 0, maxWidth: "none" }}>
              {item.text}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

const VisualPreview = () => (
  <section
    className="section"
    style={{
      background: "linear-gradient(135deg, var(--primary) 0%, #3a4f34 100%)",
      borderRadius: "60px",
      color: "white",
      textAlign: "center",
    }}
  >
    <Reveal>
      <div
        className="badge"
        style={{
          background: "rgba(255,255,255,0.15)",
          color: "var(--secondary)",
        }}
      >
        Per aziende selezionate a Berna
      </div>
      <h2
        style={{
          color: "white",
          marginTop: "20px",
          maxWidth: "680px",
          margin: "20px auto 0",
        }}
      >
        Guarda il miglioramento{" "}
        <span className="text-italic" style={{ color: "var(--secondary)" }}>
          prima di decidere.
        </span>
      </h2>
      <p
        style={{
          color: "rgba(255,255,255,0.8)",
          textAlign: "center",
          margin: "24px auto 0",
        }}
      >
        Per aziende selezionate a Berna, creo una rapida anteprima del redesign
        della homepage — così puoi vedere la trasformazione prima di impegnarti
        in qualsiasi cosa.
      </p>
      <a
        href="#audit"
        className="btn"
        style={{
          marginTop: "40px",
          background: "var(--secondary)",
          color: "var(--text)",
        }}
      >
        Richiedi la TUA Anteprima{" "}
        <Palette size={18} style={{ marginLeft: "8px" }} />
      </a>
    </Reveal>

    <Reveal delay={200}>
      <div
        style={{
          marginTop: "64px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          maxWidth: "900px",
          margin: "64px auto 0",
        }}
        className="preview-grid"
      >
        <div className="preview-card-simple before">
          <p className="preview-label">Prima</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              "Homepage generica",
              "Prenotazioni difficili da trovare",
              "Servizi poco chiari",
              "Nessun segnale di fiducia",
            ].map((t, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "rgba(255,100,100,0.6)",
                    flexShrink: 0,
                  }}
                />
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.95rem",
                    color: "rgba(255,255,255,0.65)",
                    maxWidth: "none",
                  }}
                >
                  {t}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="preview-card-simple after">
          <p className="preview-label active">Dopo</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              "Design premium e calmo",
              "Percorso di prenotazione in 1 clic",
              "Offerta unica e chiara",
              "Segnali di fiducia istantanei",
            ].map((t, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <CheckCircle
                  size={16}
                  style={{ color: "var(--secondary)", flexShrink: 0 }}
                />
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.95rem",
                    color: "rgba(255,255,255,0.9)",
                    maxWidth: "none",
                  }}
                >
                  {t}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  </section>
);

/* ─────────────────── About ─────────────────── */
const About = () => (
  <section id="about" className="section">
    <div className="grid-bento">
      <div
        style={{
          gridColumn: "span 5",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Reveal
          delay={0}
          className="bento-card"
          style={{
            overflow: "hidden",
            padding: 0,
            minHeight: "420px",
            background: "var(--bg-tint)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <img
            src={blobSvg}
            style={{
              position: "absolute",
              width: "120%",
              height: "120%",
              opacity: 0.15,
              transform: "scale(1.2)",
              filter: "blur(40px)",
            }}
            alt=""
          />
          <img
            src={blobSvg}
            style={{
              position: "absolute",
              width: "130%",
              height: "130%",
              opacity: 0.8,
              zIndex: 1,
            }}
            alt=""
          />
          <img
            src={profileImg}
            alt="Sahed Alom Sumit, web designer specializzato nel mercato di Berna"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              position: "relative",
              zIndex: 2,
              marginTop: "20px",
            }}
          />
        </Reveal>

        <Reveal delay={100}>
          <div
            className="contact-card bento-card"
            style={{ cursor: "default" }}
          >
            <div className="contact-header">
              <div className="badge">CONTATTO DIRETTO</div>
            </div>
            <div className="contact-content">
              <a
                href="mailto:sahedalomsumit@gmail.com"
                className="contact-item"
              >
                <div className="contact-icon">
                  <Mail size={18} />
                </div>
                sahedalomsumit@gmail.com
              </a>
              <a
                href="https://wa.me/358415765539"
                className="contact-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contact-icon">
                  <Phone size={18} />
                </div>
                +358 41 576 5539 (WhatsApp)
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal
        delay={150}
        className="bento-card"
        style={{
          gridColumn: "span 7",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="badge">Informazioni</div>
        <h2 style={{ marginTop: "16px", marginBottom: "16px" }}>
          Ciao, sono Sahed.
        </h2>
        <p
          style={{
            maxWidth: "none",
            fontSize: "1.3rem",
            lineHeight: 1.4,
            fontWeight: 600,
            color: "var(--primary)",
            marginBottom: "24px",
          }}
        >
          Web design moderno. Sviluppo pulito. <br />
          Automazione IA che ha senso.
        </p>

        <p style={{ maxWidth: "none", fontSize: "1.1rem", lineHeight: 1.7 }}>
          Il problema del tuo sito web diventa il mio problema nel momento in
          cui lo condividi. Non mi fermo finché non è risolto: è così che sono
          fatto. Ecco perché la chiamo la mia passione, non il mio lavoro.
        </p>

        <p
          style={{
            maxWidth: "none",
            fontSize: "1.1rem",
            lineHeight: 1.7,
            marginTop: "16px",
          }}
        >
          Da oltre 5 anni lavoro con founder, brand e agenzie in tutto il mondo,
          trasformando idee grezze in siti che caricano velocemente, hanno
          l'aspetto giusto e convertono davvero. Lavoro all'intersezione tra
          design e sviluppo full-stack. Mi occupo del "vibe" di una pagina tanto
          quanto del codice che c'è dietro.
        </p>

        <p
          style={{
            maxWidth: "none",
            fontSize: "1.1rem",
            lineHeight: 1.7,
            marginTop: "16px",
          }}
        >
          Capisco anche il lato business grazie alla mia laurea in Business IT.
          Con base a Helsinki, lavoro con clienti a Berna e in tutto il mondo
          per assicurarmi che nulla di ciò che costruisco sia solo carino, ma
          lavori per i tuoi obiettivi.
        </p>
        <a
          href="#audit"
          className="btn btn-primary"
          style={{ marginTop: "32px", alignSelf: "flex-start" }}
        >
          Lavora con me <ArrowRight size={18} style={{ marginLeft: "8px" }} />
        </a>
      </Reveal>
    </div>
  </section>
);

const FinalCTA = () => (
  <section
    className="section"
    style={{
      textAlign: "center",
      background: "var(--primary)",
      borderRadius: "60px 60px 0 0",
      color: "white",
      paddingBottom: "160px",
    }}
  >
    <Reveal>
      <h2 style={{ color: "white", maxWidth: "800px", margin: "0 auto" }}>
        Se il tuo sito non ti porta prenotazioni,{" "}
        <span className="text-italic" style={{ color: "var(--secondary)" }}>
          ti sta costando clienti.
        </span>
      </h2>
      <p
        style={{
          color: "rgba(255,255,255,0.8)",
          textAlign: "center",
          margin: "24px auto 0",
        }}
      >
        Risolviamolo — con un piano chiaro e il 25% di sconto sul tuo primo
        progetto.
      </p>
      <div
        style={{
          marginTop: "48px",
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <a
          href="#audit"
          className="btn"
          style={{ background: "var(--secondary)", color: "var(--text)" }}
        >
          Ottieni il tuo Audit gratuito della Homepage{" "}
          <ArrowRight size={20} style={{ marginLeft: "10px" }} />
        </a>
      </div>
      <p
        style={{
          margin: "24px auto 0",
          fontSize: "0.9rem",
          color: "rgba(255,255,255,0.5)",
          maxWidth: "none",
        }}
      >
        Nessuna carta di credito. Nessun impegno. Solo chiarezza.
      </p>
    </Reveal>
  </section>
);

/* ─────────────────── Main App Component ─────────────────── */
export default function SpaBernIt() {
  return (
    <div className="spabern-landing">
      <Hero />
      <Problem />
      <Solution />
      <LimitedOffer />
      <Outcomes />
      <FreeAudit />
      <Process />
      <VisualPreview />
      <About />
      <FinalCTA />
    </div>
  );
}
