import { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import RevealOnScroll from "../components/RevealOnScroll";
import { useSEO } from "../hooks/useSEO";
import ContactSection from "../components/ContactSection";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { submitQuoteLead, uploadBlueprintPdf } from "../lib/supabase";

export default function Quote() {
  // Quote Calculator State
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
    title: "Project Quote Calculator",
    description:
      "Get an instant project quote for your web build. Transparent pricing at €30/h for high-end Webflow, WordPress, and Custom development.",
    canonical: "/quote",
  });

  // Calculator Logic
  const quoteData = useMemo(() => {
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
      const fileName = `quote-${safeProjectName}-${refNumber}-sahedalomsumit.pdf`;

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
        // We continue but log it, or you can throw an error here to stop the DB sync
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
        hours_min: quoteData.totalMinH,
        hours_max: quoteData.totalMaxH,
        price_min: quoteData.minPrice,
        price_max: quoteData.maxPrice,
        fixed_price: quoteData.fixedPrice,
      };

      const { error: dbError } = await submitQuoteLead(leadPayload);

      if (dbError) {
        console.error("SUPABASE DATABASE ERROR:", dbError);
        throw new Error(`Database Error: ${dbError.message}`);
      }

      if (uploadError) {
        alert(
          "Partial Sync: Quote saved to database, but PDF upload failed. Please check Supabase Storage Policies.",
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
          <header className="mb-16">
            <nav
              aria-label="breadcrumb"
              className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-8 flex items-center justify-start gap-2"
            >
              <Link
                to="/"
                className="hover:text-violet-500 transition font-bold"
              >
                Home
              </Link>
              <span>/</span>
              <span className="text-white font-bold">Get a Quote</span>
            </nav>
            <div className="font-mono text-emerald-500 text-xs tracking-[0.4em] font-bold uppercase mb-4">
              Quote_Calculator
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none">
              Get a <br />
              <span className="text-violet-500">Quote</span>
            </h1>
            <p className="mt-6 text-gray-300 text-lg max-w-2xl font-light">
              Premium estimation engine. Select your service scope and project
              footprint for a professional pricing blueprint.
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
              <div className="bento-card p-8 border-violet-500/10 bg-violet-500/5">
                <div className="font-mono text-gray-400 text-[10px] uppercase tracking-widest mb-4 font-bold">
                  / Availability
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
                  <span className="text-white font-black text-sm uppercase">
                    Open for collaborations
                  </span>
                </div>
                <p className="text-gray-200 text-xs font-light leading-relaxed font-mono">
                  Currently booking projects for{" "}
                  {new Date(
                    new Date().setMonth(new Date().getMonth() + 1),
                  ).toLocaleString("en-US", { month: "long", year: "numeric" })}
                  .
                </p>
              </div>

              <div className="bento-card p-8 border-white/5 bg-white/[0.02] hidden md:block">
                <div className="font-mono text-gray-400 text-[10px] uppercase tracking-widest mb-6 font-bold">
                  / Documentation
                </div>
                <p className="text-gray-200 text-xs font-light mb-6">
                  Receive a formalized PDF quote with detailed time and cost
                  breakdown for your project.
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
                  className="w-full py-4 bg-violet-500 text-white font-mono text-[10px] tracking-[0.2em] font-black uppercase rounded-xl hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 group shadow-lg"
                >
                  Generate_Quote_PDF
                  <span className="group-hover:translate-x-1 transition-transform font-bold">
                    →
                  </span>
                </button>
              </div>

              {/* New Contact Card */}
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
                  <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">
                    ./ Service_Selection
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      {
                        id: "design",
                        label: "UI/UX Design",
                        desc: "UX/UI & Prototypes",
                      },
                      {
                        id: "dev",
                        label: "Development",
                        desc: "Codebase & Systems",
                      },
                      {
                        id: "full",
                        label: "Full Product",
                        desc: "The Complete Build",
                        badge: "Save 25%",
                      },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setScope(s.id)}
                        className={`p-5 rounded-2xl border transition-all text-left relative overflow-hidden ${scope === s.id ? "bg-violet-500/10 border-violet-500/40 text-white shadow-[0_0_20px_rgba(139,92,246,0.15)]" : "bg-white/[0.02] border-white/5 text-gray-400 hover:border-white/20"}`}
                      >
                        {s.badge && (
                          <div className="absolute top-0 right-0 bg-emerald-500 text-black font-mono text-[10px] px-2 py-0.5 font-bold uppercase tracking-tighter rounded-bl-lg">
                            {s.badge}
                          </div>
                        )}
                        <div className="text-xs font-black uppercase tracking-tight mb-1">
                          {s.label}
                        </div>
                        <div className="text-[10px] opacity-70 lowercase font-mono">
                          {s.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-white/5">
                  <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">
                    ./ Blueprint_Model
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: "landing", label: "Landing Page" },
                      { id: "business", label: "Business Web" },
                      { id: "custom", label: "Custom Web" },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setProjectType(p.id)}
                        className={`p-6 rounded-2xl border transition-all text-left group ${projectType === p.id ? "bg-violet-500/10 border-violet-500/40 text-white" : "bg-white/[0.02] border-white/5 text-gray-400 hover:border-white/20"}`}
                      >
                        <div className="text-xs font-bold uppercase tracking-tight">
                          {p.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {projectType === "custom" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500 pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">
                        ./ Additional_Pages
                      </label>
                      <span className="font-mono text-violet-400 text-xs font-bold">
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

                <div className="bento-card p-8 bg-white/[0.02] border-white/5 relative overflow-hidden group">
                  <div className="mb-6 border-b border-white/5 pb-6">
                    <div className="font-mono text-violet-400 text-[9px] uppercase tracking-widest mb-2 font-black">
                      Estimate_Result
                    </div>
                    <h3 className="text-white font-black text-xl md:text-2xl uppercase tracking-tighter">
                      {quoteData.label}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <div className="font-mono text-gray-300 text-[8px] uppercase tracking-widest mb-1 font-bold">
                        Estimated Project Range
                      </div>
                      <div className="text-white font-mono text-lg font-black">
                        {quoteData.totalMinH} – {quoteData.totalMaxH} Hours
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-gray-300 text-[8px] uppercase tracking-widest mb-1 font-bold">
                        Estimated Value Range
                      </div>
                      <div className="text-white font-mono text-lg font-black">
                        €{quoteData.minPrice.toLocaleString()} – €
                        {quoteData.maxPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white/5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/5 group-hover:border-violet-500/30 transition-all shadow-inner">
                    <div>
                      <div className="font-mono text-violet-400 text-[8px] uppercase tracking-widest mb-1 font-black leading-none">
                        Fixed_Project_Budget
                      </div>
                      <div className="text-2xl md:text-3xl font-black text-white tracking-tighter italic leading-none">
                        €{quoteData.fixedPrice.toLocaleString()}
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
                      className="w-full md:w-auto px-6 py-4 md:py-2 bg-violet-500 text-white font-black text-[10px] rounded-lg tracking-widest uppercase hover:bg-white hover:text-black transition-all shadow-violet-500/20 shadow-lg"
                    >
                      Generate_PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* --- Advanced Quote PDF Generator Using Tailwind --- */}
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
                    Project Quote
                  </h1>
                  <div className="text-xs tracking-[0.22em] text-emerald-500 font-semibold font-mono">
                    Web Designer & Developer
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
                <div className="p-4 border-r border-white/10 flex flex-col gap-1">
                  <span className="text-[9px] tracking-widest text-gray-500 uppercase font-bold">
                    Website
                  </span>
                  <span className="text-[11px] text-white font-medium">
                    sahedalomsumit.com
                  </span>
                </div>
                <div className="p-4 border-r border-white/10 flex flex-col gap-1">
                  <span className="text-[9px] tracking-widest text-gray-500 uppercase font-bold">
                    Email
                  </span>
                  <span className="text-[11px] text-white font-medium">
                    sahedalomsumit@gmail.com
                  </span>
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <span className="text-[9px] tracking-widest text-gray-500 uppercase font-bold">
                    WhatsApp
                  </span>
                  <span className="text-[11px] text-white font-medium">
                    +358 41 576 5539
                  </span>
                </div>
              </div>

              {/* Meta Row */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  {
                    label: "Client Identification",
                    value: clientName || "GUEST_USER",
                    sub: clientEmail || "REDACTED@ANON.COM",
                  },
                  {
                    label: "Project Identifier",
                    value: projectName || "BLUEPRINT_V02",
                    sub: `${refNumber}`,
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="bg-black/40 border border-white/10 rounded-xl p-5 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-[3px] h-full bg-accent opacity-60"></div>
                    <div className="text-[8.5px] tracking-[0.2em] text-gray-500 uppercase mb-2 font-bold">
                      {card.label}
                    </div>
                    <div className="text-[18px] font-black text-white leading-none mb-1 capitalize tracking-tight">
                      {card.value}
                    </div>
                    <div className="text-[10px] text-gray-500 font-normal leading-tight italic">
                      {card.sub}
                    </div>
                  </div>
                ))}
              </div>

              {/* Proposal Card */}
              <div
                className="bg-black border border-white/10 rounded-2xl p-10 mb-9 relative overflow-hidden"
                style={{ width: "724px" }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-emerald-500/50 via-violet-500 to-emerald-500/50 opacity-30"></div>

                <div className="flex justify-between items-end relative z-10">
                  <div style={{ width: "400px" }}>
                    <div className="text-[10px] tracking-[0.25em] text-emerald-500 uppercase mb-5 flex items-center gap-2 font-bold">
                      <span className="w-5 h-[1px] bg-emerald-500"></span>{" "}
                      Proposal
                    </div>
                    <h2 className="text-[28px] font-black leading-tight text-white mb-5 capitalize tracking-tighter">
                      {quoteData.label.replace(":", ":\n")}
                    </h2>
                    <p className="text-[12px] text-gray-400 leading-relaxed">
                      Complete technical breakdown for a {quoteData.totalMinH}–
                      {quoteData.totalMaxH} hours build cycle with €30 / hour
                      rate for project scope.
                    </p>
                  </div>
                  <div className="text-right" style={{ width: "280px" }}>
                    <div className="text-[9px] tracking-widest text-gray-500 uppercase mb-2 font-bold">
                      Estimated Value
                    </div>
                    <div className="text-[14px] text-gray-400 mb-2 font-bold tracking-tight opacity-60">
                      €{quoteData.minPrice.toLocaleString()} — €
                      {quoteData.maxPrice.toLocaleString()}
                    </div>
                    <div className="text-[64px] font-black text-white leading-none tracking-[-0.05em] mb-8 pr-2">
                      <span className="text-[24px] font-bold mr-1 align-top inline-block mt-2">
                        €
                      </span>
                      {quoteData.fixedPrice.toLocaleString()}
                    </div>
                    <div className="text-[10px] tracking-[0.22em] uppercase text-violet-500 font-bold">
                      Fixed Project Budget
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Section */}
              <div
                className="flex items-center gap-4 mb-6"
                style={{ width: "724px" }}
              >
                <div className="text-[9px] tracking-[0.3em] text-gray-500 uppercase font-bold">
                  Timeline Analysis
                </div>
                <div className="h-[1px] flex-1 bg-white/[0.1]"></div>
              </div>

              <div
                className="border border-white/10 rounded-xl bg-black/40 overflow-hidden mb-8"
                style={{ width: "724px" }}
              >
                {/* Phase 01 */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center gap-6">
                    <div className="text-[10px] text-violet-500 uppercase flex items-center gap-3 font-bold w-[100px]">
                      <span className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.6)]"></span>{" "}
                      Phase 01
                    </div>
                    <div className="text-[16px] font-bold text-white tracking-tight">
                      Homepage
                    </div>
                  </div>
                  <div className="text-[14px] font-black text-white text-right font-mono w-[180px]">
                    {quoteData.homeMinH} – {quoteData.homeMaxH} Hours
                  </div>
                </div>

                {/* Phase 02 */}
                {quoteData.pageCount > 0 && (
                  <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center gap-6">
                      <div className="text-[10px] text-violet-500 uppercase flex items-center gap-3 font-bold w-[100px]">
                        <span className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.6)]"></span>{" "}
                        Phase 02
                      </div>
                      <div className="text-[16px] font-bold text-white tracking-tight">
                        {quoteData.pageCount} Additional Pages
                      </div>
                    </div>
                    <div className="text-[14px] font-black text-white text-right font-mono w-[180px]">
                      {quoteData.pageMinH} – {quoteData.pageMaxH} Hours
                    </div>
                  </div>
                )}

                {/* Phase 03 */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center gap-6">
                    <div className="text-[10px] text-violet-500 uppercase flex items-center gap-3 font-bold w-[100px]">
                      <span className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.6)]"></span>{" "}
                      Phase 03
                    </div>
                    <div className="text-[16px] font-bold text-white tracking-tight">
                      SEO & Speed Optimization
                    </div>
                  </div>
                  <div className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.25em] text-right w-[180px]">
                    Included
                  </div>
                </div>

                {/* Total Row */}
                <div className="flex items-center justify-between p-7 bg-white/[0.02]">
                  <div className="text-[11px] text-violet-500 uppercase tracking-[0.35em] font-black">
                    Estimate Total
                  </div>
                  <div className="text-right flex items-baseline gap-4">
                    <span className="text-[18px] font-black text-white tracking-tight">
                      {quoteData.totalMinH} – {quoteData.totalMaxH} Hours
                    </span>
                    <span className="text-gray-600 font-light text-lg opacity-40">
                      ~
                    </span>
                    <span className="text-[18px] font-black text-white tracking-tight">
                      €{quoteData.minPrice.toLocaleString()} – €
                      {quoteData.maxPrice.toLocaleString()}
                    </span>
                  </div>
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
                  Quote generated by SAS
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Project Intake Prompt Modal --- */}
        {showPrompt && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/60 font-sans">
            <div className="bento-card p-8 max-w-lg w-full border-violet-500/20 bg-black shadow-[0_0_80px_rgba(139,92,246,0.15)]">
              <div className="font-mono text-violet-500 text-[10px] uppercase tracking-[0.3em] mb-6 font-bold italic">
                ./ Initializing_Proposal
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 leading-none italic">
                Formalize_Quote
              </h3>
              <p className="text-gray-400 text-xs font-light mb-8 leading-relaxed max-w-xs tracking-tighter">
                Provide your identification context to synchronize with the PDF
                quote.
              </p>

              <div className="space-y-4 mb-10">
                <div className="grid grid-cols-2 gap-4">
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
