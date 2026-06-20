import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface CoverSlideProps {
  id: string;
  isActive: boolean;
}

const leftBubbles = [
  "¿Qué dice el artículo 12 del estatuto?",
  "¿Cuál es el plan de estudios vigente?",
  "¿Quién aprobó la resolución 45/2024?",
  "¿Cuáles son los requisitos de inscripción?",
  "¿Dónde encuentro el reglamento interno?",
  "¿Cómo se tramita una equivalencia?",
  "¿Qué establece la disposición 8/2023?",
];

const rightBubbles = [
  "¿Cuándo vence el plazo de presentación?",
  "¿Qué normativa aplica para equivalencias?",
  "¿Cuál es el régimen de correlatividades?",
  "¿Cómo se solicita una mesa especial?",
  "¿Qué dice la disposición 23/2025?",
  "¿Cuál es el protocolo de asistencia?",
  "¿Quién firma las actas de examen?",
];

export default function CoverSlide({ id, isActive }: CoverSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimated.current || !containerRef.current) return;
    hasAnimated.current = true;
    const el = containerRef.current;

    gsap.from(el.querySelector("[data-anim='logo']"), { scale: 0.8, opacity: 0, duration: 1.4, ease: "power3.out" });
    gsap.from(el.querySelector("[data-anim='title']"), { y: 40, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out" });
    gsap.from(el.querySelectorAll("[data-anim='dev']"), { x: -60, opacity: 0, duration: 0.8, stagger: 0.15, delay: 0.6, ease: "power3.out" });
    gsap.from(el.querySelectorAll("[data-anim='badge']"), { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, delay: 1, ease: "power2.out" });

    el.querySelectorAll('.cpath').forEach((path, i) => {
      const length = (path as SVGPathElement).getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, { strokeDashoffset: -length, duration: 3 + i * 0.5, repeat: -1, ease: "none", delay: i * 0.8 });
    });

    gsap.to(el.querySelectorAll("[data-anim='cdot']"), { opacity: 1, scale: 1.5, duration: 1, stagger: { each: 0.4, repeat: -1, yoyo: true }, ease: "sine.inOut" });

    const tlLeft = gsap.timeline({ repeat: -1, delay: 1 });
    el.querySelectorAll('.bl').forEach((bubble) => {
      tlLeft.fromTo(bubble, { opacity: 0, y: 0 }, { opacity: 1, y: -20, duration: 1, ease: "power2.out" })
        .to(bubble, { y: -80, opacity: 0, duration: 2, ease: "power1.in" }, "+=0.5");
    });

    const tlRight = gsap.timeline({ repeat: -1, delay: 2 });
    el.querySelectorAll('.br').forEach((bubble) => {
      tlRight.fromTo(bubble, { opacity: 0, y: 0 }, { opacity: 1, y: -20, duration: 1, ease: "power2.out" })
        .to(bubble, { y: -80, opacity: 0, duration: 2, ease: "power1.in" }, "+=0.5");
    });
  }, [isActive]);

  return (
    <div id={id} ref={containerRef} className="slide bg-[#060d1f] relative overflow-hidden font-sans">
      {/* Animated circuit SVG background */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-40" xmlns="http://www.w3.org/2000/svg">
        <path className="cpath" d="M0,100 H300 L320,120 H500 L520,100 H800" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path className="cpath" d="M900,200 H600 L580,220 H400 L380,200 H100" stroke="#6366f1" strokeWidth="1" fill="none" />
        <path className="cpath" d="M0,350 H200 L220,370 H450 L470,350 H700 L720,370 H1000" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path className="cpath" d="M1200,450 H900 L880,430 H650 L630,450 H300 L280,430 H0" stroke="#6366f1" strokeWidth="1" fill="none" />
        <path className="cpath" d="M0,550 H150 L170,570 H400 L420,550 H600" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path className="cpath" d="M1400,650 H1100 L1080,670 H800 L780,650 H500 L480,670 H200" stroke="#6366f1" strokeWidth="1" fill="none" />
        <path className="cpath" d="M200,0 V150 L220,170 V300 L200,320 V500" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path className="cpath" d="M500,700 V500 L520,480 V300 L500,280 V100" stroke="#6366f1" strokeWidth="1" fill="none" />
        <path className="cpath" d="M800,0 V200 L820,220 V400 L800,420 V600" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path className="cpath" d="M1100,800 V600 L1080,580 V350 L1100,330 V100" stroke="#6366f1" strokeWidth="1" fill="none" />
        <circle data-anim="cdot" cx="300" cy="100" r="3" fill="#3b82f6" opacity="0.5" />
        <circle data-anim="cdot" cx="500" cy="200" r="3" fill="#6366f1" opacity="0.5" />
        <circle data-anim="cdot" cx="200" cy="350" r="3" fill="#3b82f6" opacity="0.5" />
        <circle data-anim="cdot" cx="700" cy="350" r="3" fill="#6366f1" opacity="0.5" />
        <circle data-anim="cdot" cx="900" cy="450" r="3" fill="#3b82f6" opacity="0.5" />
        <circle data-anim="cdot" cx="400" cy="550" r="3" fill="#6366f1" opacity="0.5" />
        <circle data-anim="cdot" cx="800" cy="650" r="3" fill="#3b82f6" opacity="0.5" />
      </svg>

      {/* Left bubbles */}
      <div className="absolute left-2 md:left-3 top-[10%] bottom-[10%] w-56 md:w-64 flex flex-col justify-around pointer-events-none z-[1]">
        {leftBubbles.map((msg, i) => (
          <div key={i} className="bl opacity-0 bg-blue-600/10 border border-blue-500/25 rounded-lg px-4 py-3 text-sm text-blue-300/80 font-medium">
            {msg}
          </div>
        ))}
      </div>

      {/* Right bubbles */}
      <div className="absolute right-2 md:right-3 top-[10%] bottom-[10%] w-56 md:w-64 flex flex-col justify-around pointer-events-none z-[1]">
        {rightBubbles.map((msg, i) => (
          <div key={i} className="br opacity-0 bg-indigo-600/10 border border-indigo-500/25 rounded-lg px-4 py-3 text-sm text-indigo-300/80 font-medium text-right">
            {msg}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col justify-between items-center px-[15rem] py-3 z-10">
        <div className="w-full flex justify-between items-center">
          <div data-anim="badge"><img src="/img/Logo_IFTS11.jpg" alt="IFTS 11" className="h-28 object-contain rounded" /></div>
          <div data-anim="badge"><img src="/img/Umbrella_logo2.png" alt="Umbrella Devs" className="h-32 object-contain" /></div>
        </div>

        <div className="flex flex-col items-center text-center gap-4 -mt-32">
          <div data-anim="logo" className="w-full max-w-lg bg-gradient-to-br from-white/90 via-gray-100/85 to-gray-300/80 rounded-lg p-4 shadow-2xl">
            <img src="/img/Infodets_logo.png" alt="Infodets" className="w-full object-contain" />
          </div>
          <h1 data-anim="title" className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600 bg-clip-text text-transparent">
              La Memoria Institucional Cobra Vida
            </span>
          </h1>
        </div>

        <div className="flex flex-col items-center gap-2 mb-12">
          <span data-anim="dev" className="text-sm font-bold tracking-[0.3em] text-gray-400 uppercase font-mono">Desarrollado Por:</span>
          <div className="flex flex-wrap justify-center gap-3">
            {['Jorge Loyo', 'Fernando Moya', 'Santiago Isbanner'].map((dev, i) => (
              <div key={i} data-anim="dev" className="bg-white/5 border border-white/10 px-5 py-2.5 rounded-none text-base font-bold tracking-wider text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rotate-45" />
                <span>{dev}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
