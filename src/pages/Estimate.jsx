import { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import RevealOnScroll from "../components/RevealOnScroll";
import { useSEO } from "../hooks/useSEO";
import ContactSection from "../components/ContactSection";
import { submitEstimateLead, uploadBlueprintPdf } from "../lib/supabase";

export default function Estimate() {
  // Estimate Calculator State
  const [scope, setScope] = useState("full"); // 'design', 'dev', 'full'
  const [projectType, setProjectType] = useState("business"); // 'landing', 'business', 'custom'
  const [additionalPages, setAdditionalPages] = useState(0);

  // PDF Generator State
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [projectName, setProjectName] = useState("");
  const [refNumber, setRefNumber] = useState("");
  const pdfRef = useRef();

  useSEO({
    title: "Project Estimate Calculator | Sahed Alom Sumit",
    description:
      "Get an instant project estimate for your web build. Transparent pricing at €30/h for high-end Webflow, WordPress, and Custom development.",
    canonical: "/estimate",
  });

  // Calculator Logic
  const estimateData = useMemo(() => {
    const HOURLY_RATE = 30;

    // Fixed Hour Definitions (Per Service)
    const BASE_HOME_H = 10;
    const BASE_PAGE_H = 5;

    let pageCount = 0;
    if (projectType === "landing") pageCount = 0;
    else if (projectType === "business") pageCount = 4;
    else pageCount = additionalPages;

    // Hours for current scope
    // 'full' (Design+Dev) is 1.5x instead of 2.0x (Separate services) -> "Save 50% on second service"
    const factor = scope === "full" ? 1.5 : 1.0;

    // Core Logic
    const homeH = BASE_HOME_H * factor;
    const pageH = BASE_PAGE_H * factor;

    // Range Logic (+/- 20% as per user example: 10h -> 8-12h)
    const homeMinH = Math.floor(homeH * 0.8);
    const homeMaxH = Math.ceil(homeH * 1.2);

    const pageTotalH = pageCount * pageH;
    const pageMinH = Math.floor(pageTotalH * 0.8);
    const pageMaxH = Math.ceil(pageTotalH * 1.2);

    const totalH = homeH + pageTotalH;
    const totalMinH = homeMinH + pageMinH;
    const totalMaxH = homeMaxH + pageMaxH;

    const fixedPrice = Math.round(totalH * HOURLY_RATE);
    const minPrice = totalMinH * HOURLY_RATE;
    const maxPrice = totalMaxH * HOURLY_RATE;

    // Pricing Context (for PDF estimation range)
    // We show what it would cost to buy them separately vs the bundle
    const separatedH = (BASE_HOME_H + pageCount * BASE_PAGE_H) * 2;
    const separatedPrice = separatedH * HOURLY_RATE;

    const labelMap = {
      design: "UI/UX Design",
      dev: "Custom Development",
      full: "Design + Development",
    };

    const typeMap = {
      landing: "Landing Page (1 Page)",
      business: "Business Website (5 Pages)",
      custom: `Custom Website (${1 + pageCount} Pages)`,
    };

    return {
      totalH,
      totalMinH,
      totalMaxH,
      fixedPrice,
      minPrice,
      maxPrice,
      separatedPrice,
      label: `${labelMap[scope]}: ${typeMap[projectType]}`,
      pageCount,
      homeH,
      homeMinH,
      homeMaxH,
      pageH,
      pageMinH,
      pageMaxH,
    };
  }, [scope, projectType, additionalPages]);

  const handleGeneratePdf = async () => {
    if (!clientName.trim() || !clientEmail.trim() || !projectName.trim()) {
      return alert("All fields are required.");
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(clientEmail.trim())) {
      return;
    }

    setIsGenerating(true);

    try {
      const element = pdfRef.current;
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#050505",
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.75);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width / 2, canvas.height / 2],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, canvas.width / 2, canvas.height / 2);

      const safeProjectName = projectName.toLowerCase().replace(/\s+/g, "_");
      const fileName = `estimate-${safeProjectName}-${refNumber}-sahedalomsumit.pdf`;

      // 1. Local View/Download
      pdf.save(fileName);

      // 2. Binary Extraction & Cloud Persistence
      const pdfBlob = pdf.output("blob");
      const { data: uploadData, error: uploadError } = await uploadBlueprintPdf(
        pdfBlob,
        fileName,
      );

      if (uploadError) {
        console.error("SUPABASE STORAGE ERROR:", uploadError);
      }

      // 3. Database Synchronization (linking binary to record)
      const leadPayload = {
        first_name: clientName,
        email: clientEmail,
        project_name: projectName,
        reference_number: refNumber,
        pdf_path: uploadData?.path || null,
        selected_service: scope,
        blueprint_model: projectType,
        additional_pages: additionalPages,
        hours_min: estimateData.totalMinH,
        hours_max: estimateData.totalMaxH,
        price_min: estimateData.minPrice,
        price_max: estimateData.maxPrice,
        fixed_price: estimateData.fixedPrice,
      };

      const { error: dbError } = await submitEstimateLead(leadPayload);

      if (dbError) {
        console.error("SUPABASE DATABASE ERROR:", dbError);
        throw new Error(`Database Error: ${dbError.message}`);
      }

      if (uploadError) {
        alert(
          "Partial Sync: Estimate saved to database, but PDF upload failed. Please check Supabase Storage Policies.",
        );
      }

      setShowPrompt(false);
      setProjectName("");
      setClientName("");
      setClientEmail("");
    } catch (err) {
      console.error("Lead sync failed:", err);
      alert(
        `Backend Sync Failed: ${err.message || "Check browser console for RLS/Network errors."}`,
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
        <RevealOnScroll>
          <header className="mb-14">
            <nav
              aria-label="breadcrumb"
              className="text-xs tracking-wider mb-6 flex items-center gap-2"
              style={{ color: 'var(--text-dim)' }}
            >
              <Link
                to="/"
                className="hover:text-violet-400 transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <span style={{ color: 'var(--text-main)' }} className="font-semibold">Project Estimator</span>
            </nav>
            <span className="pill-badge text-emerald-400 border-emerald-500/20 bg-emerald-500/10 mb-4 inline-flex">
              Instant Pricing Engine
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight uppercase leading-none"
                style={{ color: 'var(--text-main)' }}>
              Project <br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
                Estimator & Blueprint
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg max-w-2xl font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Configure your scope and page footprint for an immediate timeline, estimated hours, and official investment blueprint.
            </p>
          </header>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Columns */}
          <RevealOnScroll
            className="lg:col-span-1"
            delay={0.1}
            direction="left"
          >
            <div className="space-y-6">
              <div className="bento-card p-8">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-3">
                  Current Availability
                </span>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>
                    Open for Selected Projects
                  </span>
                </div>
                <p className="text-xs leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
                  Currently scheduling builds for{" "}
                  <span className="font-semibold text-violet-400">
                    {new Date(
                      new Date().setMonth(new Date().getMonth() + 1),
                    ).toLocaleString("en-US", { month: "long", year: "numeric" })}
                  </span>
                  .
                </p>
              </div>

              <div className="bento-card p-8 hidden md:block">
                <span className="text-xs font-mono uppercase tracking-wider text-violet-400 block mb-3">
                  Formal Documentation
                </span>
                <p className="text-xs font-light leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                  Receive a formalized PDF blueprint with detailed milestone breakdown and deliverables.
                </p>
                <button
                  onClick={() => {
                    const d = new Date();
                    const yy = d.getFullYear().toString().slice(-2);
                    const mm = (d.getMonth() + 1).toString().padStart(2, "0");
                    const dd = d.getDate().toString().padStart(2, "0");
                    const rrrr = Math.random()
                      .toString(36)
                      .substring(2, 6)
                      .toUpperCase();
                    setRefNumber(`${yy}${mm}${dd}${rrrr}`);
                    setShowPrompt(true);
                  }}
                  className="shimmer-button w-full py-3.5 bg-violet-600 text-white font-semibold text-xs tracking-wider uppercase rounded-xl hover:bg-violet-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-600/25"
                >
                  <span>Generate PDF Blueprint</span>
                  <span>→</span>
                </button>
              </div>

              {/* Contact Card */}
              <div className="bento-card p-8 border-white/5 bg-white/[0.02] border-l-4 border-l-violet-500 hidden md:block">
                <div className="font-mono text-gray-400 text-[10px] uppercase tracking-widest mb-4 font-bold">
                  / Project_Launch
                </div>
                <p className="text-gray-200 text-xs font-light mb-6">
                  Ready to transform your vision into code? Skip the calculator
                  and start a direct conversation.
                </p>
                <a
                  href="#contact"
                  className="w-full py-4 bg-white/5 border border-white/10 text-white font-mono text-[10px] tracking-[0.2em] uppercase rounded-xl hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 group"
                >
                  Bridge_Direct_Contact
                  <span className="group-hover:translate-x-2 transition-transform font-bold">
                    →
                  </span>
                </a>
              </div>

              <div className="bento-card p-8 border-white/5">
                <div className="font-mono text-gray-400 text-[10px] uppercase tracking-widest mb-6 font-bold">
                  / Information
                </div>
                <div className="space-y-4 font-mono text-[10px] text-gray-200 uppercase">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Rate_Scale</span>{" "}
                    <span className="text-white font-bold font-mono">
                      €30/H
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right: Calculator */}
          <RevealOnScroll
            className="lg:col-span-2"
            delay={0.15}
            direction="right"
          >
            <div className="bento-card p-8 md:p-12">
              <div className="space-y-12">
                <div className="space-y-6">
                  <label className="text-xs font-mono text-violet-400 uppercase tracking-wider font-semibold block">
                    01 // Select Service Scope
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      {
                        id: "design",
                        label: "UI/UX Design",
                        desc: "Figma UI & Prototypes",
                      },
                      {
                        id: "dev",
                        label: "Development",
                        desc: "Webflow, React & Code",
                      },
                      {
                        id: "full",
                        label: "Full Product",
                        desc: "Design + Development",
                        badge: "Save 25%",
                      },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setScope(s.id)}
                        className={`p-5 rounded-2xl border transition-all text-left relative overflow-hidden ${
                          scope === s.id
                            ? "bg-violet-600/15 border-violet-500 text-white shadow-lg shadow-violet-500/15"
                            : "border-white/10 hover:border-white/25"
                        }`}
                        style={scope !== s.id ? { backgroundColor: 'var(--card-bg)', color: 'var(--text-muted)', borderColor: 'var(--border)' } : {}}
                      >
                        {s.badge && (
                          <div className="absolute top-0 right-0 bg-emerald-500 text-black font-mono text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider rounded-bl-lg">
                            {s.badge}
                          </div>
                        )}
                        <div className="text-xs font-bold uppercase tracking-tight mb-1" style={{ color: scope === s.id ? 'var(--accent-light)' : 'var(--text-main)' }}>
                          {s.label}
                        </div>
                        <div className="text-[11px] opacity-75 font-mono">
                          {s.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                  <label className="text-xs font-mono text-violet-400 uppercase tracking-wider font-semibold block">
                    02 // Select Website Scale
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: "landing", label: "Landing Page (1 Page)" },
                      { id: "business", label: "Standard Web (5 Pages)" },
                      { id: "custom", label: "Custom Scale Web" },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setProjectType(p.id)}
                        className={`p-5 rounded-2xl border transition-all text-left ${
                          projectType === p.id
                            ? "bg-violet-600/15 border-violet-500 text-white shadow-md shadow-violet-500/15"
                            : "hover:border-white/20"
                        }`}
                        style={projectType !== p.id ? { backgroundColor: 'var(--card-bg)', color: 'var(--text-muted)', borderColor: 'var(--border)' } : {}}
                      >
                        <div className="text-xs font-bold uppercase tracking-tight" style={{ color: projectType === p.id ? 'var(--accent-light)' : 'var(--text-main)' }}>
                          {p.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {projectType === "custom" && (
                  <div className="space-y-4 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-violet-400 uppercase tracking-wider font-semibold">
                        Additional Subpages
                      </label>
                      <span className="font-mono text-emerald-400 text-xs font-bold">
                        {additionalPages} Pages + Homepage
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="1"
                      value={additionalPages}
                      onChange={(e) =>
                        setAdditionalPages(parseInt(e.target.value))
                      }
                      className="w-full accent-violet-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                )}

                <div className="bento-card p-6 sm:p-8 relative overflow-hidden">
                  <div className="mb-6 border-b pb-4" style={{ borderColor: 'var(--border)' }}>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold block mb-1">
                      Estimated Scope & Investment
                    </span>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold" style={{ color: 'var(--text-main)' }}>
                      {estimateData.label}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider block mb-1" style={{ color: 'var(--text-dim)' }}>
                        Estimated Timeline Range
                      </span>
                      <div className="text-lg font-heading font-bold" style={{ color: 'var(--text-main)' }}>
                        {estimateData.totalMinH} – {estimateData.totalMaxH} Hours
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider block mb-1" style={{ color: 'var(--text-dim)' }}>
                        Estimated Budget Range
                      </span>
                      <div className="text-lg font-heading font-bold text-emerald-400">
                        €{estimateData.minPrice.toLocaleString()} – €{estimateData.maxPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 border"
                       style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}>
                    <div>
                      <span className="text-[10px] font-mono text-violet-400 uppercase tracking-wider block mb-1">
                        Fixed Target Investment (€30/h)
                      </span>
                      <div className="text-3xl font-heading font-extrabold tracking-tight" style={{ color: 'var(--text-main)' }}>
                        €{estimateData.fixedPrice.toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const d = new Date();
                        const yy = d.getFullYear().toString().slice(-2);
                        const mm = (d.getMonth() + 1)
                          .toString()
                          .padStart(2, "0");
                        const dd = d.getDate().toString().padStart(2, "0");
                        const rrrr = Math.random()
                          .toString(36)
                          .substring(2, 6)
                          .toUpperCase();
                        setRefNumber(`${yy}${mm}${dd}${rrrr}`);
                        setShowPrompt(true);
                      }}
                      className="shimmer-button px-6 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs rounded-xl tracking-wider uppercase shadow-lg shadow-violet-600/30 transition-all"
                    >
                      Generate PDF Blueprint
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* --- Advanced Estimate PDF Generator Using Tailwind --- */}
        <div className="fixed -left-[4000px] top-0 pointer-events-none">
          <div
            ref={pdfRef}
            className="w-[820px] bg-black text-white font-sans relative overflow-hidden"
            style={{
              fontFamily: "'Inter', sans-serif",
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          >
            {/* Custom Background Logic for Capture */}
            <div
              className="absolute top-0 left-0 w-full h-[500px]"
              style={{
                background:
                  "radial-gradient(circle at 0% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
              }}
            ></div>

            <div className="px-[48px] py-[64px] relative z-10 font-sans">
              {/* Scanline Engine */}
              <div className="h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mb-12 relative">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-[5px] h-[11px] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]"></div>
              </div>

              {/* Header Grid */}
              <div className="grid grid-cols-[auto_1fr_auto] items-start justify-center gap-8 mb-9">
                <div className="bg-accent rounded-xl w-[68px] h-[68px] flex items-center justify-center shadow-[0_0_28px_rgba(139,92,246,0.3)]">
                  <img
                    src="/img/logo-sahed-alom-sumit.png"
                    alt="Logo"
                    className="w-32 h-auto object-contain"
                  />
                </div>
                <div className="flex flex-col gap-4 -mt-2">
                  <h1 className="text-3xl font-semibold leading-[1.05] tracking-tighter font-mono">
                    Project Estimate
                  </h1>
                  <div className="text-xs tracking-[0.22em] text-emerald-500 font-semibold font-mono">
                    Product Designer & AI-Enhanced Web Developer
                  </div>
                </div>
                <div className="text-right text-[10.5px] text-gray-400 leading-loose font-normal mt-4">
                  <strong className="text-[14px] font-bold text-white block mb-1 font-mono">
                    Sahed Alom Sumit
                  </strong>
                  DATE: {new Date().toLocaleDateString("en-GB")}
                </div>
              </div>

              {/* Contact Strip */}
              <div className="grid grid-cols-3 border border-white/10 rounded-lg bg-black/40 mb-9">
                <div className="p-3.5 border-r border-white/10">
                  <span className="text-[8.5px] tracking-[0.16em] uppercase text-emerald-400 block mb-1 font-mono">
                    Email
                  </span>
                  <span className="text-[12.5px] text-white">
                    sahedalomsumit@gmail.com
                  </span>
                </div>
                <div className="p-3.5 border-r border-white/10">
                  <span className="text-[8.5px] tracking-[0.16em] uppercase text-emerald-400 block mb-1 font-mono">
                    WhatsApp
                  </span>
                  <span className="text-[12.5px] text-white">
                    +358 41 576 5539
                  </span>
                </div>
                <div className="p-3.5">
                  <span className="text-[8.5px] tracking-[0.16em] uppercase text-emerald-400 block mb-1 font-mono">
                    Website
                  </span>
                  <span className="text-[12.5px] text-white">
                    sahedalomsumit.com
                  </span>
                </div>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-3 gap-3 mb-9">
                <div className="bg-white/[0.02] border border-white/10 rounded-lg p-3.5">
                  <span className="text-[8.5px] tracking-[0.16em] uppercase text-gray-400 block mb-1 font-mono">
                    Client Contact
                  </span>
                  <strong className="text-[13px] text-white block">
                    {clientName || "Valued Client"}
                  </strong>
                  <span className="text-[10px] text-gray-400">
                    {clientEmail || "Contact Pending"}
                  </span>
                </div>
                <div className="bg-white/[0.02] border border-white/10 rounded-lg p-3.5">
                  <span className="text-[8.5px] tracking-[0.16em] uppercase text-gray-400 block mb-1 font-mono">
                    Target Deployment
                  </span>
                  <strong className="text-[13px] text-white block">
                    {projectName || "Confidential Project"}
                  </strong>
                  <span className="text-[10px] text-gray-400">
                    Standard Track
                  </span>
                </div>
                <div className="bg-white/[0.02] border border-white/10 rounded-lg p-3.5">
                  <span className="text-[8.5px] tracking-[0.16em] uppercase text-gray-400 block mb-1 font-mono">
                    Ref Sequence
                  </span>
                  <strong className="text-[13px] text-white font-mono block">
                    #{refNumber || "GEN-EST"}
                  </strong>
                  <span className="text-[10px] text-gray-400">
                    Locked Estimate Model
                  </span>
                </div>
              </div>

              {/* Itemized Deliverables Table */}
              <table className="w-full border-collapse mb-9">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-[8.5px] tracking-[0.2em] uppercase text-gray-400 py-2.5 font-mono">
                      Phase Item
                    </th>
                    <th className="text-left text-[8.5px] tracking-[0.2em] uppercase text-gray-400 py-2.5 font-mono">
                      Description
                    </th>
                    <th className="text-right text-[8.5px] tracking-[0.2em] uppercase text-gray-400 py-2.5 font-mono">
                      Est. Effort
                    </th>
                    <th className="text-right text-[8.5px] tracking-[0.2em] uppercase text-gray-400 py-2.5 font-mono">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-4 text-[13px] font-bold text-white leading-relaxed font-mono">
                      {estimateData.label.replace(":", ":\n")}
                    </td>
                    <td className="py-4 text-[11px] text-gray-400 leading-relaxed font-normal">
                      Complete technical breakdown for a {estimateData.totalMinH}–
                      {estimateData.totalMaxH} hours build cycle with €30 / hour
                      rate allocation.
                    </td>
                    <td className="py-4 text-right text-[12px] font-mono text-gray-300">
                      {estimateData.totalMinH}–{estimateData.totalMaxH} Hours
                    </td>
                    <td className="py-4 text-right text-[13px] font-mono font-bold text-white">
                      €{estimateData.minPrice.toLocaleString()} — €
                      {estimateData.maxPrice.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-[11px] text-gray-300 font-mono">Target Investment Calculation</td>
                    <td className="py-3 text-[10px] text-gray-400">Mean effort evaluation benchmark (€30/hour fixed standard)</td>
                    <td className="py-3 text-right text-[11px] font-mono text-gray-300">{estimateData.totalH} Hours</td>
                    <td className="py-3 text-right text-[12px] font-mono font-bold text-emerald-400">€{estimateData.fixedPrice.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>

              {/* Scope Breakdown */}
              <div className="border border-white/10 rounded-lg p-5 bg-white/[0.01] mb-9">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-violet-400 font-bold mb-4">
                  / Effort_Allocation_Matrix
                </div>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-300">Foundation & Primary Architecture (Homepage)</span>
                    <span className="text-white font-bold">{estimateData.homeMinH} – {estimateData.homeMaxH} Hours</span>
                  </div>
                  {estimateData.pageCount > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-300">{estimateData.pageCount} Additional Pages</span>
                      <span className="text-white font-bold">{estimateData.pageMinH} – {estimateData.pageMaxH} Hours</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-emerald-400 font-bold">Total Estimated Effort</span>
                    <span className="text-emerald-400 font-bold">{estimateData.totalMinH} – {estimateData.totalMaxH} Hours</span>
                  </div>
                </div>
              </div>

              {/* Totals Summary */}
              <div className="border-t-2 border-white/10 pt-4 flex justify-between items-center">
                <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                  Estimate Total
                </div>
                <div className="text-right flex items-baseline gap-4">
                  <span className="text-[18px] font-black text-white tracking-tight">
                    {estimateData.totalMinH} – {estimateData.totalMaxH} Hours
                  </span>
                  <span className="text-gray-600 font-light text-lg opacity-40">
                    ~
                  </span>
                  <span className="text-[18px] font-black text-white tracking-tight">
                    €{estimateData.minPrice.toLocaleString()} – €
                    {estimateData.maxPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-11 pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="text-[10px] text-gray-500">
                  © {new Date().getFullYear()}{" "}
                  <strong className="text-gray-400 font-bold">
                    Sahed Alom Sumit
                  </strong>{" "}
                  // Built with good vibes and clean code
                </div>
                <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">
                  Estimate generated by SAS
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Project Intake Prompt Modal --- */}
        {showPrompt && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-black/60 font-sans">
            <div className="bento-card p-5 sm:p-8 max-w-lg w-full max-h-[92vh] overflow-y-auto border-violet-500/20 bg-black shadow-[0_0_80px_rgba(139,92,246,0.15)]">
              <div className="font-mono text-violet-500 text-[10px] uppercase tracking-[0.3em] mb-4 sm:mb-6 font-bold italic">
                ./ Initializing_Proposal
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter mb-3 sm:mb-4 leading-none italic">
                Formalize_Estimate
              </h3>
              <p className="text-gray-400 text-xs font-light mb-6 sm:mb-8 leading-relaxed max-w-xs tracking-tighter">
                Provide your identification context to synchronize with the PDF
                estimate.
              </p>

              <div className="space-y-4 mb-8 sm:mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[8px] font-mono text-gray-400 uppercase tracking-widest font-bold">
                      01 First_Name
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Loki"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-violet-500 focus:outline-none transition-all placeholder:text-gray-700 shadow-inner"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] font-mono text-gray-400 uppercase tracking-widest font-bold">
                      02 Sync_Email
                    </label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="lokione@gmail.com"
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none transition-all placeholder:text-gray-700 shadow-inner ${
                        clientEmail.trim() === ""
                          ? "border-white/10"
                          : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                                clientEmail,
                              )
                            ? "border-emerald-500/50 focus:border-emerald-500"
                            : "border-red-500/50 focus:border-red-500"
                      }`}
                    />
                    {clientEmail.trim() !== "" && (
                      <div
                        className={`text-[8px] font-mono uppercase tracking-widest font-bold ${
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                            clientEmail,
                          )
                            ? "text-emerald-500"
                            : "text-red-500"
                        }`}
                      >
                        {/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                          clientEmail,
                        )
                          ? "[ Valid_Identification ]"
                          : "[ Invalid_Format ]"}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[8px] font-mono text-gray-400 uppercase tracking-widest font-bold">
                    03 Project_Title
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Team Loki"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-violet-500 focus:outline-none transition-all placeholder:text-gray-700 shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowPrompt(false)}
                  className="py-4 font-mono text-[10px] uppercase tracking-widest text-gray-400 border border-white/5 rounded-xl hover:bg-white/5 transition-all font-black"
                >
                  Abort_Process
                </button>
                <button
                  onClick={handleGeneratePdf}
                  disabled={
                    isGenerating ||
                    !projectName.trim() ||
                    !clientName.trim() ||
                    !clientEmail.trim() ||
                    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      clientEmail,
                    )
                  }
                  className="py-4 font-mono text-[10px] uppercase tracking-widest bg-violet-500 text-white font-black rounded-xl hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.25)]"
                >
                  {isGenerating ? "Compiling..." : "Execute_PDF"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <RevealOnScroll>
        <ContactSection />
      </RevealOnScroll>
    </>
  );
}
