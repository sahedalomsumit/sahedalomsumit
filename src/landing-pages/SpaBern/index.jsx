import { useState, useEffect } from "react";
import SpaBernEn from "./SpaBernEn";
import SpaBernDe from "./SpaBernDe";
import SpaBernIt from "./SpaBernIt";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Globe } from "lucide-react";

const FloatingAuditButton = ({ lang }) => {
  const content = {
    en: { top: "Get Your", bottom: "Free Audit" },
    de: { top: "Kostenloses", bottom: "Audit anfordern" },
    it: { top: "Ottieni il tuo", bottom: "Audit gratuito" },
  };

  const { top, bottom } = content[lang] || content.en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.5,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        zIndex: 1000,
        perspective: "1000px",
      }}
    >
      <motion.a
        href="#audit"
        className="glass"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 24px",
          borderRadius: "100px",
          textDecoration: "none",
          boxShadow: "0 20px 40px rgba(75, 99, 68, 0.15)",
          border: "1.5px solid var(--secondary)",
          color: "var(--text)",
          fontWeight: 600,
          whiteSpace: "nowrap",
          cursor: "pointer",
          willChange: "transform",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          scale: 1.02,
          borderColor: "var(--primary)",
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.98 }}
        animate={{
          y: [0, -6, 0],
          translateZ: 0
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            background: "var(--primary)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            boxShadow: "0 4px 12px rgba(75, 99, 68, 0.2)",
            backfaceVisibility: "hidden",
          }}
        >
          <Search size={22} />
        </div>
        <div
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            lineHeight: 1.2,
            backfaceVisibility: "hidden"
          }}
        >
          <span
            style={{
              fontSize: "0.80rem",
              display: "block",
              color: "var(--text-muted)",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}
          >
            {top}
          </span>
          <span
            style={{
              fontSize: "1.1rem",
              color: "var(--primary)",
              fontWeight: 700,
            }}
          >
            {bottom}
          </span>
        </div>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "var(--bg-tint)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "4px",
            backfaceVisibility: "hidden",
          }}
        >
          <ArrowRight size={18} style={{ color: "var(--secondary)" }} />
        </div>
      </motion.a>
    </motion.div>
  );
};

export default function SpaBern() {
  const [lang, setLang] = useState("en");
  const [isOpen, setIsOpen] = useState(false);

  // Close language menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClose = () => setIsOpen(false);
    window.addEventListener("click", handleClose);
    return () => window.removeEventListener("click", handleClose);
  }, [isOpen]);

  const CurrentApp = {
    en: SpaBernEn,
    de: SpaBernDe,
    it: SpaBernIt,
  }[lang];

  const flags = {
    en: "https://flagcdn.com/gb.svg",
    de: "https://flagcdn.com/de.svg",
    it: "https://flagcdn.com/it.svg",
  };

  const labels = {
    en: "English",
    de: "Deutsch",
    it: "Italiano"
  };

  return (
    <div className="spabern-landing" style={{ position: "relative" }}>
      <CurrentApp />
      
      <FloatingAuditButton lang={lang} />

      {/* Language Switcher */}
      <div
        className="language-switcher-container"
        style={{
          position: "fixed",
          bottom: "40px",
          left: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "12px",
          zIndex: 9999,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              className="glass"
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "20px",
                padding: "8px",
                gap: "4px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
                border: "1px solid var(--stone)",
                minWidth: "160px",
                overflow: "hidden"
              }}
            >
              {[
                { id: "en", label: "English" },
                { id: "de", label: "Deutsch" },
                { id: "it", label: "Italiano" },
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    setLang(l.id);
                    setIsOpen(false);
                  }}
                  style={{
                    background: lang === l.id ? "var(--primary)" : "transparent",
                    color: lang === l.id ? "white" : "var(--text)",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "14px",
                    cursor: "pointer",
                    fontWeight: lang === l.id ? 600 : 500,
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "var(--sans)",
                    fontSize: "0.95rem",
                    transition: "all 0.2s cubic-bezier(0.23, 1, 0.32, 1)"
                  }}
                >
                  <img src={flags[l.id]} alt="" style={{ width: "20px", height: "14px", objectFit: "cover", borderRadius: "2px", flexShrink: 0 }} />
                  {l.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="glass"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            height: "56px",
            borderRadius: "100px",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            gap: "10px",
            border: "1.5px solid var(--stone)",
            cursor: "pointer",
            color: "var(--text)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            fontFamily: "var(--sans)",
            fontWeight: 600,
            willChange: "transform",
            WebkitFontSmoothing: "antialiased",
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
          }}
          aria-label="Change Language"
        >
          <img 
            src={flags[lang]} 
            alt="" 
            style={{ 
              width: "22px", 
              height: "15px", 
              objectFit: "cover", 
              borderRadius: "2px",
              backfaceVisibility: "hidden"
            }} 
          />
          <span style={{ fontSize: "0.9rem", backfaceVisibility: "hidden" }}>{labels[lang]}</span>
        </motion.button>
      </div>
    </div>
  );
}
