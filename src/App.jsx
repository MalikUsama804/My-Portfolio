import {
  motion, useScroll, useSpring, useMotionValue, useMotionTemplate,
  useTransform, useInView, animate, AnimatePresence,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  FaGithub, FaLinkedin, FaEnvelope, FaCode, FaReact, FaNodeJs,
  FaExternalLinkAlt, FaMapMarkerAlt, FaSun, FaMoon, FaArrowUp,
  FaServer, FaLaptopCode, FaMicrochip, FaRocket, FaCopy, FaCheck,
} from "react-icons/fa";
import { SiMongodb, SiExpress, SiJavascript, SiTailwindcss, SiCplusplus, SiGit } from "react-icons/si";

const EMAIL = "56340@students.riphah.edu.pk";
const GITHUB = "https://github.com/MalikUsama804";
const LINKEDIN = "https://www.linkedin.com/in/usama-bin-ahmed-427ba12a6/";
const GMAIL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent("Hello Usama")}`;

const ACCENT_TEXT = "text-indigo-600 dark:text-indigo-400";
const GRAD_TEXT =
  "bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 dark:from-indigo-400 dark:via-sky-400 dark:to-cyan-300 bg-clip-text text-transparent";
const GRAD_TEXT_HERO =
  "bg-gradient-to-r from-indigo-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent";
const GRAD_BG = "bg-gradient-to-br from-indigo-600 to-sky-500 dark:from-indigo-500 dark:to-cyan-400";
const BTN =
  "bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full transition shadow-lg shadow-indigo-600/25";
const CARD =
  "bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm shadow-slate-200/70 dark:shadow-none";
const CARD_HOVER = "hover:border-indigo-400/70 dark:hover:border-indigo-400/50 hover:shadow-xl hover:shadow-indigo-500/10";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" } }),
};

/* ---------- Helpers ---------- */

function useTypewriter(words, speed = 70, pause = 1400) {
  const [text, setText] = useState("");
  const [w, setW] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[w];
    let t;
    if (!del && text === word) t = setTimeout(() => setDel(true), pause);
    else if (del && text === "") { setDel(false); setW((w + 1) % words.length); }
    else t = setTimeout(() => setText(word.slice(0, text.length + (del ? -1 : 1))), del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, del, w, words, speed, pause]);
  return text;
}

function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function TiltCard({ children, className = "", href }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 18 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const Comp = href ? motion.a : motion.div;
  const linkProps = href ? { href, target: "_blank", rel: "noreferrer" } : {};
  return (
    <Comp
      {...linkProps}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </Comp>
  );
}

function SectionTitle({ tag, title }) {
  return (
    <div className="mb-10">
      <p className={`${ACCENT_TEXT} font-mono text-sm mb-2`}>{tag}</p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">{title}</h2>
      <div className={`mt-4 h-1 w-16 rounded-full ${GRAD_BG}`} />
    </div>
  );
}

/* ---------- App ---------- */

export default function App() {
  const [imgError, setImgError] = useState(false);
  const [dark, setDark] = useState(true);
  const [showTop, setShowTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const role = useTypewriter(["MERN Stack Developer", "Software Engineer", "C++ Problem Solver", "Lifelong Learner"]);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const spotlight = useMotionTemplate`radial-gradient(460px circle at ${mx}px ${my}px, rgba(99,102,241,0.18), transparent 70%)`;
  const onHeroMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);

  useEffect(() => {
    const scroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", scroll);
    return () => window.removeEventListener("scroll", scroll);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard blocked */ }
  };

  const projects = [
    {
      title: "Smart RAM Monitor & Auto Cleaner",
      desc: "A C++ system utility that monitors RAM usage in real-time and automatically cleans memory for better performance.",
      tech: ["C++", "System Programming", "Windows API"],
      link: "https://github.com/MalikUsama804/Smart-RAM-Monitor-Auto-Cleaner",
      icon: <FaMicrochip />,
    },
    {
      title: "MERN Project",
      desc: "A full-stack MERN application currently in development. Will be added soon.",
      tech: ["React", "Node.js", "MongoDB"],
      link: null, icon: <FaLaptopCode />,
    },
    {
      title: "Next Big Thing",
      desc: "Another exciting project on the way. Stay tuned!",
      tech: ["Express", "MongoDB", "Tailwind"],
      link: null, icon: <FaRocket />,
    },
  ];

  const skills = [
    { icon: <FaReact />, name: "React", color: "text-cyan-500", mcolor: "text-cyan-400" },
    { icon: <FaNodeJs />, name: "Node.js", color: "text-green-600 dark:text-green-400", mcolor: "text-green-400" },
    { icon: <SiExpress />, name: "Express", color: "text-slate-700 dark:text-slate-300", mcolor: "text-slate-300" },
    { icon: <SiMongodb />, name: "MongoDB", color: "text-emerald-600 dark:text-emerald-400", mcolor: "text-emerald-400" },
    { icon: <SiJavascript />, name: "JavaScript", color: "text-yellow-500", mcolor: "text-yellow-400" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS", color: "text-sky-500", mcolor: "text-sky-400" },
    { icon: <SiCplusplus />, name: "C++", color: "text-blue-600 dark:text-blue-400", mcolor: "text-blue-400" },
    { icon: <SiGit />, name: "Git", color: "text-orange-500", mcolor: "text-orange-400" },
  ];

  const whatIDo = [
    { icon: <FaLaptopCode />, title: "Frontend", text: "Smooth, responsive interfaces with React and Tailwind CSS." },
    { icon: <FaServer />, title: "Backend", text: "REST APIs and databases with Node.js, Express and MongoDB." },
    { icon: <FaMicrochip />, title: "System Level", text: "Fast, low-level tools and utilities written in C++." },
  ];

  const stats = [
    { n: 8, s: "+", label: "Technologies" },
    { n: 3, s: "", label: "Projects (1 live)" },
    { n: 100, s: "%", label: "Passion" },
  ];

  const floaters = [
    { icon: <FaReact />, cls: "-top-4 -left-6 text-cyan-400", d: 0 },
    { icon: <FaNodeJs />, cls: "top-16 -right-7 text-green-400", d: 0.8 },
    { icon: <SiMongodb />, cls: "bottom-24 -left-7 text-emerald-400", d: 1.6 },
    { icon: <SiCplusplus />, cls: "-bottom-4 -right-5 text-blue-400", d: 2.4 },
  ];

  return (
    <div
      className="bg-slate-50 dark:bg-[#070a14] text-slate-900 dark:text-slate-100 overflow-x-hidden transition-colors duration-300 selection:bg-indigo-500/30"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        html { scroll-behavior: smooth; }
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes gradMove { 0%,100% { background-position: 0% 50% } 50% { background-position: 100% 50% } }
        @keyframes blink { 50% { opacity: 0 } }
        .marquee { animation: marquee 30s linear infinite; }
        .marquee:hover { animation-play-state: paused; }
        .grad-anim { background-size: 200% 200%; animation: gradMove 6s ease infinite; }
        .caret { animation: blink 1s step-end infinite; }
        @media (prefers-reduced-motion: reduce) { .marquee, .grad-anim, .caret { animation: none; } }
      `}</style>

      {/* Scroll progress */}
      <motion.div style={{ scaleX: progress }} className={`fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] ${GRAD_BG}`} />

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-[3px] w-full bg-[#070a14]/80 text-white backdrop-blur-xl z-50 border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
          <a href="#" className="font-extrabold text-base sm:text-xl tracking-tight truncate">
            Usama <span className="text-indigo-400">Bin Ahmed</span>
          </a>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
            {["About", "Skills", "Projects", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="relative group hover:text-white transition">
                {l}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full bg-indigo-400 transition-all duration-300" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark(!dark)}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={dark ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {dark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-slate-200" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* TOP BLOCK (hero + skills strip) */}
      <header className="relative bg-[#070a14] text-white overflow-hidden" onMouseMove={onHeroMove}>
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />
        <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-[130px] bg-indigo-500/25" />
        <div className="absolute bottom-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-[130px] bg-cyan-500/10" />
        <motion.div className="pointer-events-none absolute inset-0 hidden md:block" style={{ background: spotlight }} />

        <section className="relative min-h-screen flex items-center px-4 sm:px-6 pt-24 sm:pt-28 pb-12 overflow-hidden">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center w-full">
            <motion.div initial="hidden" animate="show" variants={fadeUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium mb-6">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative w-2 h-2 bg-emerald-400 rounded-full" />
                </span>
                Available for opportunities
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] mb-5 tracking-tight">
                Hi, I'm <br />
                <span className={`grad-anim ${GRAD_TEXT_HERO}`}>Usama Bin Ahmed</span>
              </h1>
              <p className="text-base sm:text-xl md:text-2xl font-mono text-slate-200 mb-4 h-8 sm:h-9 whitespace-nowrap overflow-hidden">
                <span className="text-indigo-400">&gt; </span>
                {role}
                <span className="caret ml-0.5 text-indigo-400">|</span>
              </p>
              <p className="text-slate-400 mb-8 max-w-md leading-relaxed text-sm sm:text-base">
                A dedicated software engineer with a strong passion for technology.
                I enjoy learning and creating innovative solutions.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} href="#projects" className={`group px-6 sm:px-7 py-3 sm:py-3.5 flex items-center gap-2 text-sm sm:text-base ${BTN}`}>
                  View My Work <span className="group-hover:translate-x-1 transition">→</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} href="#contact"
                  className="border border-white/20 hover:border-indigo-400 hover:text-indigo-300 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-medium transition flex items-center gap-2 text-sm sm:text-base"
                >
                  <FaEnvelope /> Contact Me
                </motion.a>
              </div>
              <div className="flex gap-3 mt-8 text-lg sm:text-xl text-slate-400">
                {[
                  { href: GITHUB, icon: <FaGithub />, label: "GitHub" },
                  { href: LINKEDIN, icon: <FaLinkedin />, label: "LinkedIn" },
                  { href: GMAIL, icon: <FaEnvelope />, label: "Email" },
                ].map((s) => (
                  <motion.a
                    key={s.label} whileHover={{ y: -4 }} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                    className="p-3 rounded-full bg-white/5 border border-white/10 hover:text-indigo-300 hover:border-indigo-400 transition"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* PHOTO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative w-60 sm:w-72 md:w-80">
                <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-indigo-500/35 to-sky-400/25 blur-3xl" />
                <div className="absolute inset-0 translate-x-3 sm:translate-x-4 translate-y-3 sm:translate-y-4 rounded-[2rem] border-2 border-indigo-400/40" />

                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-white/15 bg-gradient-to-b from-indigo-100 via-sky-100 to-slate-100">
                  {!imgError ? (
                    <img
                      src="/profile.png"
                      alt="Usama Bin Ahmed"
                      className="w-full h-full object-cover object-top mix-blend-multiply"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <span className={`text-6xl sm:text-7xl font-bold ${GRAD_TEXT}`}>UB</span>
                      <span className="text-xs text-slate-500 mt-2">Add profile.png to /public</span>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/85 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 shadow-lg flex items-center gap-3">
                    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-sky-500 text-white flex items-center justify-center text-xs sm:text-sm"><FaCode /></span>
                    <div className="leading-tight">
                      <p className="text-xs sm:text-sm font-bold text-slate-900">Usama Bin Ahmed</p>
                      <p className="text-[10px] sm:text-[11px] text-slate-600">Software Engineer</p>
                    </div>
                  </div>
                </div>

                {floaters.map((f, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5, delay: f.d, ease: "easeInOut" }}
                    className={`hidden sm:flex absolute ${f.cls} w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 shadow-xl items-center justify-center text-2xl`}
                  >
                    {f.icon}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* skills strip */}
        <div className="relative py-4 sm:py-5 border-t border-white/10 bg-white/[0.03] overflow-hidden">
          <div className="marquee flex w-max gap-8 sm:gap-12 text-slate-300">
            {[...skills, ...skills].map((s, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-semibold whitespace-nowrap">
                <span className={`text-xl sm:text-2xl ${s.mcolor}`}>{s.icon}</span>
                {s.name}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Dark-mode ambient glow */}
      <div className="fixed inset-0 -z-10 hidden dark:block pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full blur-[140px] bg-indigo-500/10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[140px] bg-cyan-500/10" />
      </div>

      {/* ABOUT */}
      <section id="about" className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <SectionTitle tag="01. ABOUT ME" title="Who I Am" />
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="md:col-span-2 text-slate-600 dark:text-slate-400 leading-relaxed space-y-4 text-base sm:text-lg">
              <p>
                I am a dedicated software engineer with a strong passion for technology.
                I work with the MERN stack (MongoDB, Express, React, Node.js) and enjoy
                building innovative solutions.
              </p>
              <p>
                I am a student at Riphah University, and continuous learning is my priority.
                Exploring new technologies and solving real-world problems is my passion.
              </p>
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-300 pt-2 text-base">
                <FaMapMarkerAlt className={ACCENT_TEXT} /> Pakistan
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                {stats.map((s) => (
                  <div key={s.label} className={`${CARD} p-4 text-center`}>
                    <div className={`text-3xl md:text-4xl font-extrabold ${GRAD_TEXT}`}>
                      <Counter to={s.n} suffix={s.s} />
                    </div>
                    <div className="text-xs mt-1 text-slate-600 dark:text-slate-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <TiltCard className={`${CARD} p-6 h-fit`}>
              <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Quick Info</h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 break-words">
                <li><span className={`font-semibold ${ACCENT_TEXT}`}>Name:</span> Usama Bin Ahmed</li>
                <li><span className={`font-semibold ${ACCENT_TEXT}`}>Degree:</span> Software Engineering</li>
                <li>
                  <span className={`font-semibold ${ACCENT_TEXT}`}>Email:</span>{" "}
                  <a href={GMAIL} target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 underline-offset-2 hover:underline break-all">{EMAIL}</a>
                </li>
                <li><span className={`font-semibold ${ACCENT_TEXT}`}>Focus:</span> MERN Stack</li>
              </ul>
            </TiltCard>
          </div>
        </motion.div>
      </section>

      {/* WHAT I DO */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {whatIDo.map((w, i) => (
            <motion.div key={w.title} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <TiltCard className={`${CARD} ${CARD_HOVER} p-6 sm:p-7 h-full group transition`}>
                <div className={`w-12 sm:w-14 h-12 sm:h-14 rounded-2xl ${GRAD_BG} text-white text-xl sm:text-2xl flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/30 group-hover:rotate-6 transition`}>
                  {w.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-900 dark:text-white">{w.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{w.text}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <div className="bg-white dark:bg-white/[0.02] border-y border-slate-200 dark:border-white/5">
        <section id="skills" className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <SectionTitle tag="02. SKILLS" title="Tech Stack" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {skills.map((s, i) => (
                <motion.div
                  key={s.name} custom={i} variants={fadeUp} whileHover={{ y: -6 }}
                  className={`group ${CARD} ${CARD_HOVER} p-4 sm:p-6 flex flex-col items-center gap-3 transition cursor-default`}
                >
                  <span className={`text-4xl sm:text-5xl ${s.color} group-hover:scale-110 transition duration-300`}>{s.icon}</span>
                  <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-300 text-center">{s.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>

      {/* PROJECTS */}
      <section id="projects" className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <SectionTitle tag="03. PROJECTS" title="Things I've Built" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div key={p.title} custom={i} variants={fadeUp} className="h-full">
                <TiltCard
                  href={p.link || undefined}
                  className={`group relative ${CARD} ${p.link ? `${CARD_HOVER} cursor-pointer` : "cursor-default"} p-5 sm:p-6 flex flex-col h-full transition overflow-hidden`}
                >
                  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-indigo-400/20 dark:bg-indigo-500/20 blur-2xl group-hover:scale-150 transition duration-500" />
                  <div className="relative flex justify-between items-start mb-4">
                    <div className={`w-11 sm:w-12 h-11 sm:h-12 rounded-xl bg-indigo-500/10 ${ACCENT_TEXT} text-xl sm:text-2xl flex items-center justify-center`}>
                      {p.icon || <FaCode />}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${p.link
                        ? "text-emerald-700 dark:text-emerald-400 border-emerald-500/40 bg-emerald-500/10"
                        : "text-slate-500 dark:text-slate-400 border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-white/5"}`}>
                        {p.link ? "Live" : "Coming soon"}
                      </span>
                      {p.link && <FaExternalLinkAlt className="text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition" />}
                    </div>
                  </div>
                  <h3 className={`relative text-base sm:text-lg font-bold mb-2 text-slate-900 dark:text-white ${p.link ? "group-hover:text-indigo-600 dark:group-hover:text-indigo-400" : ""} transition`}>{p.title}</h3>
                  <p className="relative text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow leading-relaxed">{p.desc}</p>
                  <div className="relative flex flex-wrap gap-2 mt-auto">
                    {p.tech.map((t) => (
                      <span key={t} className="text-xs font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded">{t}</span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CONTACT */}
      <div className="bg-white dark:bg-white/[0.02] border-t border-slate-200 dark:border-white/5">
        <section id="contact" className="relative max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-24 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <p className={`${ACCENT_TEXT} font-mono text-sm mb-2`}>04. WHAT'S NEXT?</p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
              Let's Work <span className={`grad-anim ${GRAD_TEXT}`}>Together</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto leading-relaxed text-sm sm:text-base">
              Got a project idea, want to collaborate, or just want to say hello? My inbox is always open.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 mb-6">
              <motion.a
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }} href={GMAIL} target="_blank" rel="noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base ${BTN}`}
              >
                <FaEnvelope /> Say Hello
              </motion.a>
              <button
                onClick={copyEmail}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3.5 sm:py-4 rounded-full border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-xs sm:text-sm font-medium max-w-full"
              >
                {copied ? <FaCheck className="text-emerald-500 shrink-0" /> : <FaCopy className="shrink-0" />}
                <span className="truncate">{copied ? "Copied!" : EMAIL}</span>
              </button>
            </div>
            <div className="flex justify-center gap-6 text-xl sm:text-2xl text-slate-500 dark:text-slate-400 mt-8 sm:mt-10">
              <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-y-1 transition"><FaGithub /></a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-y-1 transition"><FaLinkedin /></a>
              <a href={GMAIL} target="_blank" rel="noreferrer" aria-label="Email" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-y-1 transition"><FaEnvelope /></a>
            </div>
          </motion.div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="relative text-center py-8 px-4 border-t border-slate-200 dark:border-white/10 text-slate-500 text-xs sm:text-sm">
        <p>© {new Date().getFullYear()} Usama Bin Ahmed. Designed & Built with React + Tailwind.</p>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }} whileHover={{ scale: 1.1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className={`fixed bottom-6 right-4 sm:right-6 z-50 w-11 sm:w-12 h-11 sm:h-12 rounded-full ${GRAD_BG} text-white flex items-center justify-center shadow-xl`}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}