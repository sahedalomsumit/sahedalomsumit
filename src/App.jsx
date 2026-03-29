import { Routes, Route, useLocation } from 'react-router-dom'
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

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <AuraBackground />
      <TopBar />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/process" element={<Process />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
        <SahedChatbot />
      </main>
      <Footer />
    </>
  )
}
