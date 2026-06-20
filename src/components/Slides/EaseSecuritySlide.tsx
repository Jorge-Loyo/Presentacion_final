import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Smartphone, MessageSquare, Lock, Eye, Key, ShieldAlert, Bot, Globe } from 'lucide-react';

interface EaseSecuritySlideProps {
  id: string;
  isActive: boolean;
}

export default function EaseSecuritySlide({ id, isActive }: EaseSecuritySlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimated.current || !containerRef.current) return;
    hasAnimated.current = true;
    const el = containerRef.current;

    // Entrance animations
    gsap.from(el.querySelector("[data-anim='header']"), { y: -30, duration: 0.8, ease: "power3.out" });
    gsap.from(el.querySelectorAll("[data-anim='card']"), { y: 50, scale: 0.9, stagger: 0.2, duration: 1.2, ease: "power3.out", delay: 0.3 });
    gsap.from(el.querySelector("[data-anim='plus']"), { scale: 0, rotation: 180, duration: 1, ease: "elastic.out(1, 0.5)", delay: 0.8 });
    gsap.from(el.querySelector("[data-anim='phone']"), { y: -40, scale: 0.8, duration: 1, ease: "power3.out", delay: 0.5 });
    gsap.from(el.querySelector("[data-anim='bot']"), { y: -40, scale: 0.8, duration: 1, ease: "power3.out", delay: 0.7 });

    // Loop animations
    gsap.to(el.querySelectorAll("[data-anim='card']"), { y: -4, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.5, delay: 1.5 });
    gsap.to(el.querySelector("[data-anim='phone']"), { y: -6, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });
    gsap.to(el.querySelector("[data-anim='bot']"), { rotate: 3, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });

    el.querySelectorAll('.cpath').forEach((path, i) => {
      const length = (path as SVGPathElement).getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, { strokeDashoffset: -length, duration: 4 + i * 0.5, repeat: -1, ease: "none", delay: i * 0.6 });
    });
    gsap.to(el.querySelectorAll("[data-anim='cdot']"), { opacity: 1, scale: 1.5, duration: 1, stagger: { each: 0.3, repeat: -1, yoyo: true }, ease: "sine.inOut" });
  }, [isActive]);

  return (
    <div id={id} ref={containerRef} className="slide bg-[#060d1f] relative overflow-hidden font-sans">
      <svg className="absolute inset-0 w-full h-full z-0 opacity-40" xmlns="http://www.w3.org/2000/svg">
        <path className="cpath" d="M0,120 H200 L220,140 H450 L470,120 H700 L720,140 H1000" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path className="cpath" d="M1400,250 H1100 L1080,270 H800 L780,250 H500 L480,270 H150" stroke="#6366f1" strokeWidth="1" fill="none" />
        <path className="cpath" d="M0,400 H250 L270,420 H500 L520,400 H800" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path className="cpath" d="M1400,530 H900 L880,550 H600 L580,530 H300 L280,550 H0" stroke="#6366f1" strokeWidth="1" fill="none" />
        <path className="cpath" d="M300,0 V180 L320,200 V380 L300,400 V580" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path className="cpath" d="M700,800 V600 L720,580 V400 L700,380 V150" stroke="#6366f1" strokeWidth="1" fill="none" />
        <circle data-anim="cdot" cx="450" cy="120" r="3" fill="#3b82f6" opacity="0.4" />
        <circle data-anim="cdot" cx="800" cy="250" r="3" fill="#6366f1" opacity="0.4" />
        <circle data-anim="cdot" cx="500" cy="400" r="3" fill="#3b82f6" opacity="0.4" />
        <circle data-anim="cdot" cx="300" cy="530" r="3" fill="#6366f1" opacity="0.4" />
      </svg>

      <div className="absolute inset-0 flex flex-col p-5 md:p-8 z-10">
        
        {/* Header */}
        <div className="mb-3 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 mb-1 rounded-none">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-mono font-extrabold tracking-[0.25em] uppercase">ROBUSTEZ TECNOLÓGICA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter">Facilidad de uso y seguridad</h2>
          <p className="mt-1 text-sm sm:text-base text-blue-400 font-bold italic">Multicanal, 100% responsivo y blindado de extremo a extremo.</p>
        </div>

        {/* Top: 2 columns - Movilidad + Omnicanal */}
        <div className="flex items-stretch justify-center gap-6 max-w-5xl mx-auto w-full">
          
          {/* Col 1: MOVILIDAD con phone mockup */}
          <div data-anim="card" className="bg-gradient-to-br from-white/10 to-gray-300/10 border border-white/20 p-6 rounded-lg flex flex-col items-center hover:border-blue-500/30 transition-all duration-300 shadow-xl flex-1">
            {/* Phone mockup grande */}
            <div data-anim="phone" className="mb-4">
              <div className="w-28 h-52 bg-[#0a0a0b] rounded-xl border-2 border-slate-600 p-1.5 flex flex-col justify-between shadow-2xl">
                <div className="w-10 h-1 bg-slate-700 mx-auto rounded-full" />
                <div className="flex-grow bg-[#060d1f] rounded-lg border border-slate-800 m-0.5 p-1.5 flex flex-col justify-between">
                  <div className="bg-blue-600/30 text-blue-400 p-1 rounded text-[6px] font-mono font-bold flex justify-between items-center">
                    <span>INFODETS</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex flex-col gap-0.5 my-1">
                    <div className="bg-slate-800 p-0.5 rounded text-[5px] text-slate-300 max-w-[80%]">¿Art. 12?</div>
                    <div className="bg-blue-600/40 p-0.5 rounded text-[5px] text-white max-w-[85%] self-end">Según el estatuto...</div>
                  </div>
                  <div className="bg-slate-800 rounded h-3 flex items-center px-1">
                    <div className="w-1 h-1 rounded-full bg-blue-400" />
                  </div>
                </div>
                <div className="w-8 h-1 bg-slate-700 mx-auto rounded-full" />
              </div>
            </div>
            {/* Text */}
            <div className="text-center">
              <span className="text-lg font-mono text-blue-400 uppercase tracking-widest font-bold">MOVILIDAD</span>
              <h3 className="text-xl font-black uppercase text-white tracking-wider">100% Responsivo</h3>
              <p className="text-gray-200 text-sm leading-relaxed font-medium mt-1">
                Pensado para el celular: úsalo desde cualquier dispositivo, en cualquier lugar y a cualquier hora.
              </p>
            </div>
          </div>

          {/* + symbol */}
          <div data-anim="plus" className="flex items-center justify-center px-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600/30 to-indigo-600/30 border-2 border-blue-400/50 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-3xl font-black text-white">+</span>
            </div>
          </div>

          {/* Col 2: OMNICANAL con bot y logos */}
          <div data-anim="card" className="bg-gradient-to-br from-white/10 to-gray-300/10 border border-white/20 p-6 rounded-lg flex flex-col items-center hover:border-indigo-500/30 transition-all duration-300 shadow-xl flex-1">
            {/* Bot con canales grande */}
            <div data-anim="bot" className="flex flex-col items-center gap-3 mb-4">
              <div className="w-36 h-36 bg-indigo-600/20 border border-indigo-500/40 rounded-full flex items-center justify-center">
                <Bot className="w-20 h-20 text-indigo-400" />
              </div>
              <div className="flex gap-3">
                <div className="w-14 h-14 bg-green-600/20 border border-green-500/40 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-7 h-7 text-green-400" />
                </div>
                <div className="w-14 h-14 bg-blue-500/20 border border-blue-400/40 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.13l-1.97 9.28c-.15.67-.54.83-1.09.52l-3.02-2.22-1.46 1.4c-.16.16-.3.3-.61.3l.22-3.06 5.57-5.03c.24-.22-.05-.33-.38-.13l-6.88 4.34-2.96-.93c-.65-.2-.66-.65.13-.96l11.57-4.46c.54-.2 1.01.13.83.95z"/></svg>
                </div>
                <div className="w-14 h-14 bg-white/10 border border-white/30 rounded-full flex items-center justify-center">
                  <Globe className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
            {/* Text */}
            <div className="text-center">
              <span className="text-lg font-mono text-indigo-400 uppercase tracking-widest font-bold">OMNICANAL</span>
              <h3 className="text-xl font-black uppercase text-white tracking-wider">Chatbot ágil</h3>
              <p className="text-gray-200 text-sm leading-relaxed font-medium mt-1">
                Se integra como un bot conversacional en su Web, Telegram y WhatsApp. Mayor accesibilidad.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: Security section full width */}
        <div data-anim="card" className="bg-gradient-to-br from-white/10 to-gray-300/10 border border-white/20 rounded-lg p-5 mt-4 shadow-xl">
          <h3 className="text-sm font-black uppercase text-white tracking-wider mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-teal-400" />
            Seguridad y privacidad de extremo a extremo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center">
                <Lock className="w-7 h-7 text-blue-400" />
              </div>
              <h4 className="font-bold text-blue-400 text-base uppercase">Datos protegidos</h4>
              <p className="text-gray-300 text-sm">Información cifrada y resguardada en todo momento.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center">
                <Eye className="w-7 h-7 text-indigo-400" />
              </div>
              <h4 className="font-bold text-blue-400 text-base uppercase">Control total</h4>
              <p className="text-gray-300 text-sm">Tu conocimiento interno se mantiene dentro de tu organización.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-14 h-14 bg-teal-500/10 border border-teal-500/30 rounded-full flex items-center justify-center">
                <Key className="w-7 h-7 text-teal-400" />
              </div>
              <h4 className="font-bold text-blue-400 text-base uppercase">Accesos confiables</h4>
              <p className="text-gray-300 text-sm">Permisos definidos y consultas trazables y auditables.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-[10px] tracking-widest font-bold text-gray-500 font-mono pt-3 mt-3 border-t border-white/10">
          <span>ARQUITECTURA SEGURA</span><span>DIAPOSITIVA 3 / 5</span>
        </div>
      </div>
    </div>
  );
}
