"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

/* ─── DATA ──────────────────────────────────── */
const TICKER_ITEMS = [
  "Logo Design", "Brand Identity", "Social Media",
  "WordPress Websites", "E-commerce", "Packaging Design",
  "Brochure Design", "Landing Pages", "Website Redesign",
  "Website Maintenance",
];

const SERVICES = [
  { cat: "design", idx: "01", icon: "✦", name: "Premium Logo & Brand Identity",     desc: "Strategic logo design with cohesive brand identity systems for long-term business positioning." },
  { cat: "design", idx: "02", icon: "◈", name: "Complete Branding Package",          desc: "Full brand system — logo, colours, typography, stationery and digital assets in one package." },
  { cat: "design", idx: "03", icon: "⬡", name: "Social Media Creative Design",       desc: "Professional social media creatives for engagement, consistency and strong brand visibility." },
  { cat: "design", idx: "04", icon: "▣", name: "Brochure / Company Profile",         desc: "Corporate brochures and company profiles designed for professional presentations and client impact." },
  { cat: "design", idx: "05", icon: "◉", name: "Packaging Design",                  desc: "Premium packaging that enhances product perception and strengthens brand recognition in market." },
  { cat: "web",    idx: "06", icon: "⬢", name: "WordPress Business Website",        desc: "Custom WordPress websites designed for performance, responsiveness and professional credibility." },
  { cat: "web",    idx: "07", icon: "◎", name: "E-commerce Website",                desc: "High-performance ecommerce stores optimised for sales, UX and secure transactions." },
  { cat: "web",    idx: "08", icon: "⊡", name: "Website Redesign & Optimisation",   desc: "Modern redesign improving aesthetics, speed, structure and overall conversion performance." },
  { cat: "web",    idx: "09", icon: "⊞", name: "High-Converting Landing Page",      desc: "Strategically structured landing pages designed to generate leads and maximise conversions." },
  { cat: "web",    idx: "10", icon: "⊟", name: "Website Maintenance & Support",     desc: "Reliable maintenance ensuring security, updates, backups and consistent site performance." },
];

const PROJECTS = [
  {
    emoji: "🏥",
    bg: "linear-gradient(135deg,#1a0a14 0%,#2a0e20 100%)",
    accent: "#881477",
    cat: "Healthcare · Web Design",
    name: "Shreeji Cancer Care",
    desc: "Compassionate digital presence for Nadiad's leading oncology centre by Dr. Shreyans Patel — built for trust, clarity and patient accessibility.",
    url: "https://shreejicancercare.in",
  },
  {
    emoji: "🦷",
    bg: "linear-gradient(135deg,#091518 0%,#0e2228 100%)",
    accent: "#0ea5c4",
    cat: "Healthcare · Web Design",
    name: "Radhe Dental Clinic",
    desc: "Cutting-edge robotic dentistry practice website with 10,000+ successful procedures showcased through a premium, modern digital experience.",
    url: "https://radhedental.com",
  },
  {
    emoji: "🏗️",
    bg: "linear-gradient(135deg,#141008 0%,#221a0e 100%)",
    accent: "#f97316",
    cat: "Manufacturing · Branding",
    name: "Power-Fix-O",
    desc: "Brand identity and website for Mittal Brothers Petrochem's premium tile adhesive line — built for industrial credibility and market reach.",
    url: "https://www.powerfixo.in",
  },
];

const WHY = [
  { icon: "🎯", title: "Strategy-First Approach",   desc: "Every design decision is rooted in brand strategy — not just aesthetics. We build brands that actually work in the real world." },
  { icon: "⚡", title: "Fast Turnaround",            desc: "Deadlines respected, always. Quick delivery without ever compromising on quality or attention to detail." },
  { icon: "🔁", title: "Unlimited Revisions",        desc: "We iterate until you're completely satisfied. Your vision is the target — we don't stop until we hit it." },
  { icon: "📈", title: "Results-Driven Design",      desc: "Our designs don't just look good — they convert, engage and grow your business metrics over time." },
];

type Tab = "all" | "design" | "web";

/* ─── COMPONENT ─────────────────────────────── */
export default function Home() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [tab, setTab]           = useState<Tab>("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState<"idle"|"sending"|"sent">("idle");

  /* cursor */
  useEffect(() => {
    let rafId: number;
    let mx = 0, my = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };

    const render = () => {
      if (dotRef.current)  { dotRef.current.style.left  = mx + "px"; dotRef.current.style.top  = my + "px"; }
      if (ringRef.current) { ringRef.current.style.left = mx + "px"; ringRef.current.style.top = my + "px"; }
      rafId = requestAnimationFrame(render);
    };

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(render);

    const addActive    = () => ringRef.current?.classList.add("active");
    const removeActive = () => ringRef.current?.classList.remove("active");
    const targets = document.querySelectorAll("a,button,.proj-card,.svc-card,.why-item,.c-card,.tag");
    targets.forEach(el => { el.addEventListener("mouseenter", addActive); el.addEventListener("mouseleave", removeActive); });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  /* scroll reveal */
  const initReveal = useCallback(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => { return initReveal(); }, [tab, initReveal]);

  const shown = tab === "all" ? SERVICES : SERVICES.filter(s => s.cat === tab);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setTimeout(() => setFormState("sent"), 1800);
  };

  /* ticker duplicated for seamless loop */
  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <>
      {/* CURSOR */}
      <div className="c-dot"  ref={dotRef}  aria-hidden />
      <div className="c-ring" ref={ringRef} aria-hidden />

      {/* MOBILE MENU */}
      <div className={`m-overlay${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        <button className="m-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
        {["About","Services","Work","Contact"].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
      </div>

      {/* NAV */}
      <nav className="nav" role="navigation">
        <a className="nav-logo" href="#top" aria-label="Marketing VisionX home">
          <Image src="/logo-light.png" alt="Marketing VisionX" width={140} height={34} style={{objectFit:"contain"}} priority />
        </a>
        <ul className="nav-links">
          {["About","Services","Work","Contact"].map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
          <li><a href="#contact" className="nav-cta-btn">Get a Quote</a></li>
        </ul>
        <button className="nav-burger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
          <span /><span /><span />
        </button>
      </nav>

      {/* TICKER */}
      <div className="ticker-wrap" aria-hidden>
        <div className="ticker-track">
          {tickerItems.map((t, i) => (
            <span className="ticker-item" key={i}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section id="top" className="hero">
        {/* Left: text */}
        <div className="hero-left">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            <span className="hero-eyebrow-text">Brand Strategist &amp; Digital Designer</span>
          </div>

          <h1 className="hero-h1">
            Harsh<br />
            <em>Patel</em>
          </h1>

          <p className="hero-body">
            Founder of <strong>Marketing VisionX</strong> — a design &amp; development
            studio in Gujarat, India. I craft identities, experiences and websites
            that make brands impossible to ignore.
          </p>

          <div className="hero-actions">
            <a href="#work" className="btn-fill">
              View Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#contact" className="btn-line">Let's Talk</a>
          </div>

          <div className="hero-stats">
            <div>
              <div className="stat-n">3<sup>+</sup></div>
              <div className="stat-l">Years</div>
            </div>
            <div>
              <div className="stat-n">50<sup>+</sup></div>
              <div className="stat-l">Clients</div>
            </div>
            <div>
              <div className="stat-n">100<sup>%</sup></div>
              <div className="stat-l">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Right: photo — no badge, bottom-aligned */}
        <div className="hero-right">
          <Image
            src="/harsh-patel.png"
            alt="Harsh Patel"
            fill
            className="hero-img"
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="about-sec">
        <div className="wrap">
          <span className="s-watermark">02</span>
          <div className="about-grid">
            {/* Logo frame — sticky */}
            <div className="about-logo-frame reveal">
              <div className="about-logo-inner">
                <span className="brkt brkt-tl" />
                <span className="brkt brkt-tr" />
                <span className="brkt brkt-bl" />
                <span className="brkt brkt-br" />
                <Image src="/logo-light.png" alt="Marketing VisionX" width={280} height={90} style={{objectFit:"contain"}} />
              </div>

              <div className="about-contact-row">
                {[
                  { lbl: "Phone",    val: "+91 89808 09394" },
                  { lbl: "Email",    val: "marketingvisionx@gmail.com" },
                  { lbl: "Location", val: "Anand, Gujarat, India" },
                  { lbl: "Website",  val: "marketingvisionx.com" },
                ].map(c => (
                  <div className="ac-item" key={c.lbl}>
                    <div className="ac-label">{c.lbl}</div>
                    <div className="ac-val">{c.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Text */}
            <div className="about-text">
              <div className="s-eyebrow reveal"><span className="s-eyebrow-line"/>About</div>
              <h2 className="s-title reveal d1">
                Design That<br /><em>Means Business</em>
              </h2>
              <p className="about-p reveal d2" style={{marginTop:28}}>
                I'm <strong>Harsh Patel</strong>, founder of Marketing VisionX — a
                design and development studio based in Anand, Gujarat. I partner with
                startups and growing businesses to build brands that command attention
                and websites that convert visitors into customers.
              </p>
              <p className="about-p reveal d3">
                From a first logo sketch to a full e-commerce launch, I handle the
                entire creative journey — strategy, design and development — under
                one roof, with a singular focus on your business outcomes.
              </p>

              <div className="about-tags reveal d4">
                {["Logo Design","Brand Identity","Social Media","WordPress","E-commerce","Packaging","UI/UX","Brochures","Company Profiles","Landing Pages"].map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="services-sec">
        <div className="wrap">
          <span className="s-watermark">03</span>
          <div className="services-head">
            <div>
              <div className="s-eyebrow reveal"><span className="s-eyebrow-line"/>Services</div>
              <h2 className="s-title reveal d1">What I<br /><em>Offer</em></h2>
            </div>
            <p className="s-sub reveal d2">
              End-to-end creative services — from first impression to full digital
              presence. Everything your brand needs to grow, under one roof.
            </p>
          </div>

          <div className="stabs reveal">
            {(["all","design","web"] as Tab[]).map(t => (
              <button
                key={t}
                className={`stab${tab===t?" on":""}`}
                onClick={() => setTab(t)}
              >
                {t === "all" ? "All" : t === "design" ? "Graphic Design" : "Web Development"}
              </button>
            ))}
          </div>

          <div className="svc-grid">
            {shown.map((s, i) => (
              <div className={`svc-card reveal d${(i%3)+1}`} key={s.idx}>
                <div className="svc-idx">#{s.idx}</div>
                <span className="svc-icon">{s.icon}</span>
                <div className="svc-name">{s.name}</div>
                <div className="svc-desc">{s.desc}</div>
                <span className="svc-arrow" aria-hidden>↗</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK ── */}
      <section id="work" className="work-sec">
        <div className="wrap">
          <span className="s-watermark">04</span>
          <div className="work-head">
            <div>
              <div className="s-eyebrow reveal"><span className="s-eyebrow-line"/>Portfolio</div>
              <h2 className="s-title reveal d1">Selected<br /><em>Work</em></h2>
            </div>
            <p className="s-sub reveal d2">
              Real projects, real results. Brands built from the ground up for
              clients across healthcare, manufacturing and beyond.
            </p>
          </div>

          <div className="work-grid">
            {PROJECTS.map((p, i) => (
              <div className={`proj-card reveal d${i+1}`} key={p.name}>
                <div className="proj-thumb" style={{background: p.bg}}>
                  <span style={{fontSize:64,position:"relative",zIndex:1}}>{p.emoji}</span>
                  {/* accent glow */}
                  <span style={{
                    position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)",
                    width:"60%", height:"40%",
                    background:`radial-gradient(ellipse, ${p.accent}55 0%, transparent 70%)`,
                    zIndex:0, pointerEvents:"none"
                  }} />
                </div>
                <div className="proj-body">
                  <div className="proj-cat">{p.cat}</div>
                  <div className="proj-name">{p.name}</div>
                  <div className="proj-desc">{p.desc}</div>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="proj-visit">
                    Visit Live Site
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY VISIONX ── */}
      <section id="why" className="why-sec">
        <div className="wrap">
          <span className="s-watermark">05</span>
          <div className="why-layout">
            <div className="why-left">
              <div className="s-eyebrow reveal"><span className="s-eyebrow-line"/>Why VisionX</div>
              <h2 className="s-title reveal d1">The Difference<br /><em>You'll Feel</em></h2>
              <p className="s-sub reveal d2">
                I don't just deliver files — I deliver outcomes. Here's what makes
                working with Marketing VisionX genuinely different.
              </p>
              <a href="#contact" className="btn-fill reveal d3" style={{marginTop:8, display:"inline-flex", width:"fit-content"}}>
                Start a Project
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>

            <div className="why-grid">
              {WHY.map((w, i) => (
                <div className={`why-item reveal d${i+1}`} key={w.title}>
                  <div className="why-icon">{w.icon}</div>
                  <div>
                    <div className="why-title">{w.title}</div>
                    <div className="why-desc">{w.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-sec">
        <div className="wrap">
          <span className="s-watermark">06</span>
          <div style={{textAlign:"center", marginBottom:72}}>
            <div className="s-eyebrow reveal" style={{justifyContent:"center"}}><span className="s-eyebrow-line"/>Contact</div>
            <h2 className="s-title reveal d1">
              Let's Build Something<br /><em>Great Together</em>
            </h2>
            <p className="s-sub reveal d2" style={{margin:"20px auto 0"}}>
              Ready to elevate your brand? Reach out and let's talk about your project.
            </p>
          </div>

          <div className="contact-layout">
            {/* Left — info */}
            <div className="contact-left reveal">
              <div className="c-cards">
                {[
                  { ico:"📞", lbl:"Phone / WhatsApp", val:"+91 89808 09394",              href:"tel:+918980809394" },
                  { ico:"📧", lbl:"Email",             val:"marketingvisionx@gmail.com",   href:"mailto:marketingvisionx@gmail.com" },
                  { ico:"🌐", lbl:"Website",           val:"marketingvisionx.com",         href:"https://marketingvisionx.com" },
                  { ico:"📍", lbl:"Location",          val:"Anand, Gujarat, India",        href:"#" },
                ].map(c => (
                  <a key={c.lbl} href={c.href} className="c-card"
                     target={c.href.startsWith("http") ? "_blank" : undefined}
                     rel="noopener noreferrer">
                    <div className="c-card-ico">{c.ico}</div>
                    <div>
                      <div className="c-card-lbl">{c.lbl}</div>
                      <div className="c-card-val">{c.val}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="reveal d2">
              {formState === "sent" ? (
                <div className="sent-box">
                  <span style={{fontSize:52}}>✅</span>
                  <h3>Message Sent!</h3>
                  <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form className="form" onSubmit={submit} noValidate>
                  <div className="f-row">
                    <div className="f-group">
                      <label className="f-label">Your Name</label>
                      <input className="f-input" type="text" placeholder="Rajesh Shah" required />
                    </div>
                    <div className="f-group">
                      <label className="f-label">Phone / WhatsApp</label>
                      <input className="f-input" type="tel" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  <div className="f-group">
                    <label className="f-label">Email Address</label>
                    <input className="f-input" type="email" placeholder="you@company.com" required />
                  </div>
                  <div className="f-group">
                    <label className="f-label">Service Needed</label>
                    <select className="f-select" defaultValue="" required>
                      <option value="" disabled>Select a service…</option>
                      <optgroup label="Graphic Design">
                        <option>Logo &amp; Brand Identity</option>
                        <option>Complete Branding Package</option>
                        <option>Social Media Design</option>
                        <option>Brochure / Company Profile</option>
                        <option>Packaging Design</option>
                      </optgroup>
                      <optgroup label="Web Development">
                        <option>WordPress Business Website</option>
                        <option>E-commerce Website</option>
                        <option>Website Redesign</option>
                        <option>Landing Page</option>
                        <option>Website Maintenance</option>
                      </optgroup>
                    </select>
                  </div>
                  <div className="f-group">
                    <label className="f-label">Tell Me About Your Project</label>
                    <textarea className="f-textarea" placeholder="Brief description, budget range, timeline…" required />
                  </div>
                  <button type="submit" className="f-submit" disabled={formState==="sending"}>
                    {formState === "sending" ? "Sending…" : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <a className="footer-logo" href="#top" aria-label="Back to top">
          <Image src="/logo-light.png" alt="Marketing VisionX" width={110} height={28} style={{objectFit:"contain"}} />
        </a>
        <p className="footer-copy">© {new Date().getFullYear()} Marketing VisionX · Harsh Patel · Anand, Gujarat, India</p>
        <ul className="footer-links">
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="mailto:marketingvisionx@gmail.com">Email</a></li>
        </ul>
      </footer>
    </>
  );
}
