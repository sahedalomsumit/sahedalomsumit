import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHARS = "ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789§$%&/()=?*#+~";

export default function ScrambleText({ text, delay = 0, duration = 1.5, className = "" }) {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      onEnter: () => setHasStarted(true),
      once: true
    });
  }, []);

  useEffect(() => {
    if (!hasStarted) {
      // Set initial state to scrambled or empty
      setDisplayText(text.split('').map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join(''));
      return;
    }

    let iteration = 0;
    const totalSteps = text.length * 2;
    
    const tl = gsap.timeline({ delay });

    tl.to({}, {
      duration: duration,
      onUpdate: function() {
        const progress = this.progress();
        const revealedCount = Math.floor(progress * text.length);
        
        const currentText = text.split('').map((char, i) => {
          if (i < revealedCount) return text[i];
          if (char === " ") return " ";
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('');
        
        setDisplayText(currentText);
      },
      onComplete: () => setDisplayText(text)
    });

    return () => tl.kill();
  }, [hasStarted, text, delay, duration]);

  return <span ref={ref} className={className}>{displayText}</span>;
}
