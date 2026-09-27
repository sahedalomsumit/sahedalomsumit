import { Routes, Route, useLocation, Navigate, useParams } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import CustomCursor from "./components/CustomCursor";
import AuraBackground from "./components/AuraBackground";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Lazy-loaded routes for optimal bundle chunking and performance
const Home = lazy(() => import("./pages/Home"));
const Work = lazy(() => import("./pages/Work"));
const Process = lazy(() => import("./pages/Process"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Faq = lazy(() => import("./pages/Faq"));
const Services = lazy(() => import("./pages/Services"));
const UIUXDesign = lazy(() => import("./pages/UIUXDesign"));
const FullStackDevelopment = lazy(() => import("./pages/FullStackDevelopment"));
const LowNoCodeDevelopment = lazy(() => import("./pages/LowNoCodeDevelopment"));
const AppDevelopment = lazy(() => import("./pages/AppDevelopment"));
const FramerDevelopment = lazy(() => import("./pages/FramerDevelopment"));
const KajabiDevelopment = lazy(() => import("./pages/KajabiDevelopment"));
const ToolsServices = lazy(() => import("./pages/ToolsServices"));
const Estimate = lazy(() => import("./pages/Estimate"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPostDetail = lazy(() => import("./pages/BlogPostDetail"));
const BlogAdmin = lazy(() => import("./pages/BlogAdmin"));
const BlogAdminDashboard = lazy(() => import("./pages/BlogAdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy-load floating AI chatbot to keep initial bundle ultra-lean
const SahedChatbot = lazy(() => import("./components/SahedChatbot"));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20">
      <div className="relative flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin" />
        <div className="w-2 h-2 rounded-full bg-emerald-400 absolute animate-pulse" />
      </div>
      <p className="mt-4 font-mono text-[11px] text-violet-400 uppercase tracking-widest">
        Loading...
      </p>
    </div>
  );
}

function LegacyProjectRedirect() {
  const { slug } = useParams();
  return <Navigate to={slug ? `/work/${slug}` : "/work"} replace />;
}

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
      <main className="pt-20 md:pt-28" style={{ overflowX: 'clip' }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* ── Main Site Routes ── */}
            <Route path="/" element={<Home />} />
            <Route path="/process" element={<Process />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="/portfolio" element={<Navigate to="/work" replace />} />
            <Route path="/portfolio/:slug" element={<LegacyProjectRedirect />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/ui-ux-design" element={<UIUXDesign />} />
            <Route path="/services/full-stack-development" element={<FullStackDevelopment />} />
            <Route path="/services/low-no-code-development" element={<LowNoCodeDevelopment />} />
            <Route path="/services/framer" element={<FramerDevelopment />} />
            <Route path="/services/framer-development" element={<FramerDevelopment />} />
            <Route path="/services/kajabi" element={<KajabiDevelopment />} />
            <Route path="/services/kajabi-development" element={<KajabiDevelopment />} />
            <Route path="/services/app-development" element={<AppDevelopment />} />
            <Route path="/services/tools" element={<Navigate to="/services/app-development" replace />} />
            <Route path="/estimate" element={<Estimate />} />
            <Route path="/quote" element={<Navigate to="/estimate" replace />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/admin" element={<BlogAdminDashboard />} />
            <Route path="/blog/new" element={<BlogAdmin />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Suspense fallback={null}>
          <SahedChatbot />
        </Suspense>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
