import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import CustomCursor from './components/CustomCursor'
import AuraBackground from './components/AuraBackground'
import TopBar from './components/TopBar'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Process from './pages/Process'
import ProjectDetail from './pages/ProjectDetail'
import Faq from './pages/Faq'
import SahedChatbot from './components/SahedChatbot'
import Services from './pages/Services'
import FigmaDesign from './pages/FigmaDesign'
import WebflowDevelopment from './pages/WebflowDevelopment'
import WordPressDevelopment from './pages/WordPressDevelopment'
import FramerDevelopment from './pages/FramerDevelopment'
import CustomDevelopment from './pages/CustomDevelopment'
import AIAutomation from './pages/AIAutomation'
import SEOOptimization from './pages/SEOOptimization'
import Quote from './pages/Quote'
import NotFound from './pages/NotFound'
import SalahTrackerPrivacyPolicy from './pages/SalahTrackerPrivacyPolicy'
import SalahTrackerApp from './pages/SalahTrackerApp'
import SalahTrackerDataDeletion from './pages/SalahTrackerDataDeletion'
import SpaBurn from './LandingPages/SpaBurn'

// Standalone landing page routes (no header/footer/chatbot)
const STANDALONE_ROUTES = ['/spa-burn']

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
    } else {
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }

    // Google Analytics pageview tracking
    if (window.gtag) {
      window.gtag('config', 'G-0HJ38WFG8P', {
        page_path: pathname,
      })
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const isStandalone = STANDALONE_ROUTES.includes(pathname)

  return (
    <>
      <ScrollToTop />
      {!isStandalone && (
        <>
          <CustomCursor />
          <AuraBackground />
          <TopBar />
          <Header />
        </>
      )}
      <main>
        <Routes>
          {/* ── Standalone Landing Pages ── */}
          <Route path="/spa-burn" element={<SpaBurn />} />

          {/* ── Main Site Routes ── */}
          <Route path="/" element={<Home />} />
          <Route path="/process" element={<Process />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/figma-design" element={<FigmaDesign />} />
          <Route path="/services/webflow-development" element={<WebflowDevelopment />} />
          <Route path="/services/wordpress-development" element={<WordPressDevelopment />} />
          <Route path="/services/framer-development" element={<FramerDevelopment />} />
          <Route path="/services/custom-development" element={<CustomDevelopment />} />
          <Route path="/services/ai-automation" element={<AIAutomation />} />
          <Route path="/services/seo-optimization" element={<SEOOptimization />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/salah-tracker" element={<SalahTrackerApp />} />
          <Route path="/salah-tracker/privacy-policy" element={<SalahTrackerPrivacyPolicy />} />
          <Route path="/salah-tracker/data-deletion" element={<SalahTrackerDataDeletion />} />
          <Route path="/work" element={<Navigate to="/portfolio" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {!isStandalone && <SahedChatbot />}
      </main>
      {!isStandalone && <Footer />}
    </>
  )
}
