import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import CustomCursor from "./components/CustomCursor";
import AuraBackground from "./components/AuraBackground";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Process from "./pages/Process";
import ProjectDetail from "./pages/ProjectDetail";
import Faq from "./pages/Faq";
import SahedChatbot from "./components/SahedChatbot";
import Services from "./pages/Services";
import UIUXDesign from "./pages/UIUXDesign";
import FullStackDevelopment from "./pages/FullStackDevelopment";
import LowNoCodeDevelopment from "./pages/LowNoCodeDevelopment";
import AppDevelopment from "./pages/AppDevelopment";

import ToolsServices from "./pages/ToolsServices";
import Quote from "./pages/Quote";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const offset = 100; // Account for fixed header
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }

    // Google Analytics pageview tracking
    if (window.gtag) {
      window.gtag("config", "G-0HJ38WFG8P", {
        page_path: pathname,
      });
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <CustomCursor />
      <AuraBackground />
      <Header />
      <main className="pt-20 md:pt-28">
        <Routes>
          {/* ── Main Site Routes ── */}
          <Route path="/" element={<Home />} />
          <Route path="/process" element={<Process />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/ui-ux-design" element={<UIUXDesign />} />
          <Route path="/services/full-stack-development" element={<FullStackDevelopment />} />
          <Route path="/services/low-no-code-development" element={<LowNoCodeDevelopment />} />
          <Route path="/services/app-development" element={<AppDevelopment />} />

          <Route path="/services/tools" element={<ToolsServices />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/work" element={<Navigate to="/portfolio" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SahedChatbot />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
