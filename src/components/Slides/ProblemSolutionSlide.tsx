import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { XCircle, CheckCircle, Brain, AlertTriangle, Hospital, Scale, Landmark, Building2 } from 'lucide-react';

interface ProblemSolutionSlideProps {
  id: string;
  isActive: boolean;
}

export default function ProblemSolutionSlide({ id, isActive }: ProblemSolutionSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimated.current || !containerRef.current) return;
    hasAnimated.current = true;
    const el = containerRef.current;

    gsap.from(el.querySelector("[data-anim='header']"), { y: -40, opacity: 0, duration: 1, ease: "power3.out" });
    gsap.from(el.querySelector("[data-anim='cleft']"), { x: -150, opacity: 0, rotateY: 15, duration: 1.4, ease: "power3.out", delay: 0.2 });
    gsap.from(el.querySelector("[data-anim='cright']"), { x: 150, opacity: 0, rotateY: -15, duration: 1.4, ease: "power3.out", delay: 0.4 });
    gsap.from(el.querySelector("[data-anim='vs']"), { scale: 0, rotation: -360, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 0.8 });
    gsap.from(el.querySelectorAll("[data-anim='pl']"), { x: -30, opacity: 0, duration: 0.6, stagger: 0.15, delay: 1, ease: "power2.out" });
    gsap.from(el.querySelectorAll("[data-anim='pr']"), { x: 30, opacity: 0, duration: 0.6, stagger: 0.15, delay: 1.2, ease: "power2.out" });
    gsap.to(el.querySelector("[data-anim='cleft']"), { y: -5, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(el.querySelector("[data-anim='cright']"), { y: 5, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
    gsap.to(el.querySelector("[data-anim='vsglow']"), { opacity: 0.6, scale: 1.3, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" });

    el.querySelectorAll('.cpath').forEach((path, i) => {
      const length = (path as SVGPathElement).getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, { strokeDashoffset: -length, duration: 4 + i * 0.6, repeat: -1, ease: "none", delay: i * 0.5 });
    });
    gsap.to(el.querySelectorAll("[data-anim='cdot']"), { opacity: 1, scale: 1.5, duration: 1, stagger: { each: 0.3, repeat: -1, yoyo: true }, ease: "sine.inOut" });
    gsap.from(el.querySelectorAll("[data-anim='usecase']"), { y: 20, opacity: 0, duration: 0.8, stagger: 0.15, delay: 1.5, ease: "power2.out" });
  }, [isActive]);

  return (
    <div id={id} ref={containerRef} className="slide bg-[#060d1f] relative overflow-hidden font-sans">
      {/* Animated circuit background */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-40" xmlns="http://www.w3.org/2000/svg">
        <path className="cpath" d="M0,80 H250 L270,100 H500 L520,80 H750 L770,100 H1000" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path className="cpath" d="M1400,180 H1100 L1080,200 H800 L780,180 H500 L480,200 H200" stroke="#6366f1" strokeWidth="1" fill="none" />
        <path className="cpath" d="M0,300 H180 L200,320 H400 L420,300 H650 L670,320 H900" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path className="cpath" d="M1400,400 H1000 L980,420 H700 L680,400 H400 L380,420 H100" stroke="#6366f1" strokeWidth="1" fill="none" />
        <path className="cpath" d="M0,500 H300 L320,520 H550 L570,500 H800 L820,520 H1100" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path className="cpath" d="M1400,600 H1150 L1130,620 H850 L830,600 H550 L530,620 H250" stroke="#6366f1" strokeWidth="1" fill="none" />
        <path className="cpath" d="M150,0 V120 L170,140 V280 L150,300 V450 L170,470 V600" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path className="cpath" d="M450,800 V600 L470,580 V400 L450,380 V200 L470,180 V0" stroke="#6366f1" strokeWidth="1" fill="none" />
        <path className="cpath" d="M750,0 V150 L770,170 V350 L750,370 V550" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path className="cpath" d="M1050,800 V650 L1030,630 V450 L1050,430 V250" stroke="#6366f1" strokeWidth="1" fill="none" />
        <circle data-anim="cdot" cx="250" cy="80" r="3" fill="#3b82f6" opacity="0.4" />
        <circle data-anim="cdot" cx="500" cy="180" r="3" fill="#6366f1" opacity="0.4" />
        <circle data-anim="cdot" cx="650" cy="300" r="3" fill="#3b82f6" opacity="0.4" />
        <circle data-anim="cdot" cx="400" cy="400" r="3" fill="#6366f1" opacity="0.4" />
        <circle data-anim="cdot" cx="800" cy="500" r="3" fill="#3b82f6" opacity="0.4" />
        <circle data-anim="cdot" cx="550" cy="600" r="3" fill="#6366f1" opacity="0.4" />
        <circle data-anim="cdot" cx="150" cy="280" r="3" fill="#3b82f6" opacity="0.4" />
        <circle data-anim="cdot" cx="750" cy="350" r="3" fill="#6366f1" opacity="0.4" />
      </svg>

      {/* Use-case icons - bottom bar */}
      <div className="absolute bottom-16 left-0 right-0 z-[2] flex justify-center gap-10 pointer-events-none">
        <div data-anim="usecase" className="flex flex-col items-center gap-1.5">
          <Hospital className="w-10 h-10 text-teal-400" />
          <span className="text-xs text-teal-400 font-bold uppercase tracking-wider">Hospitales</span>
        </div>
        <div data-anim="usecase" className="flex flex-col items-center gap-1.5">
          <Scale className="w-10 h-10 text-amber-400" />
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Bufetes legales</span>
        </div>
        <div data-anim="usecase" className="flex flex-col items-center gap-1.5">
          <Landmark className="w-10 h-10 text-indigo-400" />
          <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Gobierno</span>
        </div>
        <div data-anim="usecase" className="flex flex-col items-center gap-1.5">
          <Building2 className="w-10 h-10 text-blue-400" />
          <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">Empresas</span>
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10 z-10">
        
        <div data-anim="header" className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2 rounded-none">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-mono font-extrabold tracking-[0.25em] uppercase">El Dilema</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase">
            El problema y la solución
          </h2>
          <p className="mt-2 text-sm sm:text-base font-bold italic flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 not-italic">
              <span className="inline-block bg-white rounded-md p-1"><img src="/img/chatgpt-logo.png" alt="ChatGPT" className="h-5 inline" /></span>
              <span className="text-white font-extrabold">ChatGPT</span>
            </span>
            <span className="text-blue-400">es útil, pero no conoce los datos internos de tu empresa.</span>
          </p>
        </div>

        <div className="flex-grow flex items-center justify-center py-4">
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 lg:gap-8 items-stretch w-full max-w-6xl">
            
            <div data-anim="cleft" className="lg:col-span-5 bg-gradient-to-br from-red-950/30 to-black/50 border border-red-500/30 p-6 md:p-8 rounded-none flex flex-col justify-between shadow-2xl backdrop-blur-md">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">LA IA GENÉRICA</h3>
                    <span className="text-sm italic text-gray-400 flex items-center gap-1.5 mt-1">
                      <span className="inline-block bg-white rounded p-0.5"><img src="/img/chatgpt-logo.png" alt="ChatGPT" className="h-4 inline" /></span>
                      <span className="text-white font-bold not-italic">ChatGPT</span> y asistentes comunes
                    </span>
                  </div>
                  <div className="w-10 h-10 bg-red-500/10 border border-red-500/30 rounded-none flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {["No conoce tus estatutos ni normativas internas","Desconoce los documentos propios de tu empresa","Da respuestas generales, sin tu contexto real"].map((point, i) => (
                    <div key={i} data-anim="pl" className="flex gap-3 items-start bg-red-500/5 border border-red-500/10 p-3 rounded-none">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-200 font-bold">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div data-anim="vs" className="lg:col-span-1 flex justify-center items-center z-20 my-2 lg:my-0 relative">
              <div data-anim="vsglow" className="absolute w-16 h-16 bg-blue-500/20 rounded-full blur-xl" />
              <div className="w-12 h-12 bg-blue-600 rotate-45 flex items-center justify-center text-white font-black text-sm border border-white/20 shadow-xl shadow-blue-600/40 relative">
                <span className="-rotate-45">VS</span>
              </div>
            </div>

            <div data-anim="cright" className="lg:col-span-5 bg-gradient-to-br from-blue-950/30 to-black/50 border border-blue-500/30 p-6 md:p-8 rounded-none flex flex-col justify-between shadow-2xl backdrop-blur-md">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">INFODETS, LA SOLUCIÓN</h3>
                    <span className="text-sm italic text-blue-400 mt-1 block">El empleado fundador: la memoria viviente</span>
                  </div>
                  <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/30 rounded-none flex items-center justify-center">
                    <Brain className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {["La memoria viviente de tu institución","Domina estatutos y documentos internos","Responde con el conocimiento real de tu empresa"].map((point, i) => (
                    <div key={i} data-anim="pr" className="flex gap-3 items-start bg-blue-500/5 border border-blue-500/10 p-3 rounded-none">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-100 font-bold">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="flex justify-between items-center text-[10px] tracking-widest font-bold text-gray-500 font-mono pt-3 border-t border-white/10">
          <span>INFODETS - COMPARATIVA</span>
          <span>DIAPOSITIVA 2 / 5</span>
        </div>
      </div>
    </div>
  );
}
