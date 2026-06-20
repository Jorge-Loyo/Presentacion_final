import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FileCheck, CloudUpload, Cog, UserCog } from 'lucide-react';

interface TrustIntelSlideProps {
  id: string;
  isActive: boolean;
}

export default function TrustIntelSlide({ id, isActive }: TrustIntelSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimated.current || !containerRef.current) return;
    hasAnimated.current = true;
    const el = containerRef.current;

    // Entrance animations
    gsap.from(el.querySelector("[data-anim='header']"), { y: -30, duration: 0.8, ease: "power3.out" });
    gsap.from(el.querySelector("[data-anim='center']"), { scale: 0, duration: 1.2, ease: "elastic.out(1, 0.6)", delay: 0.3 });
    gsap.from(el.querySelectorAll("[data-anim='step']"), { scale: 0.8, stagger: 0.2, duration: 1, ease: "power3.out", delay: 0.6 });

    // Loop animations
    gsap.to(el.querySelector("[data-anim='ring']"), { rotation: 360, duration: 30, repeat: -1, ease: "none" });
    gsap.to(el.querySelectorAll("[data-anim='step']"), { y: -3, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.5, delay: 2 });
    gsap.to(el.querySelector("[data-anim='center']"), { scale: 1.02, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });

    // Float file badges
    el.querySelectorAll("[data-anim='float']").forEach((badge, i) => {
      gsap.from(badge, { opacity: 0, scale: 0, duration: 0.5, delay: 1 + i * 0.15, ease: "back.out(1.7)" });
      gsap.to(badge, {
        y: "random(-60, 60)",
        x: "random(-50, 50)",
        duration: 3 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5 + i * 0.4
      });
    });

    el.querySelectorAll('.cpath').forEach((path, i) => {
      const length = (path as SVGPathElement).getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, { strokeDashoffset: -length, duration: 4 + i * 0.5, repeat: -1, ease: "none", delay: i * 0.6 });
    });
    gsap.to(el.querySelectorAll("[data-anim='cdot']"), { opacity: 1, scale: 1.5, duration: 1, stagger: { each: 0.3, repeat: -1, yoyo: true }, ease: "sine.inOut" });
  }, [isActive]);

  return (
    <div id={id} ref={containerRef} className="slide bg-[#060d1f] relative overflow-hidden font-sans">
      {/* Circuit background */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-30" xmlns="http://www.w3.org/2000/svg">
        <path className="cpath" d="M0,100 H350 L370,120 H600 L620,100 H900" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path className="cpath" d="M1400,220 H1000 L980,240 H700 L680,220 H400 L380,240 H100" stroke="#6366f1" strokeWidth="1" fill="none" />
        <path className="cpath" d="M0,450 H200 L220,470 H500 L520,450 H800" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path className="cpath" d="M1400,580 H1050 L1030,600 H750 L730,580 H450 L430,600 H150" stroke="#6366f1" strokeWidth="1" fill="none" />
        <path className="cpath" d="M200,0 V200 L220,220 V400 L200,420 V650" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path className="cpath" d="M900,800 V550 L920,530 V300 L900,280 V50" stroke="#6366f1" strokeWidth="1" fill="none" />
        <circle data-anim="cdot" cx="350" cy="100" r="3" fill="#3b82f6" opacity="0.4" />
        <circle data-anim="cdot" cx="700" cy="220" r="3" fill="#6366f1" opacity="0.4" />
        <circle data-anim="cdot" cx="500" cy="450" r="3" fill="#3b82f6" opacity="0.4" />
        <circle data-anim="cdot" cx="200" cy="400" r="3" fill="#6366f1" opacity="0.4" />
      </svg>

      {/* Floating file type badges */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div data-anim="float" className="absolute top-[5%] left-[3%] px-5 py-2.5 bg-red-500/15 border border-red-500/30 rounded-lg text-lg text-red-400 font-bold">PDF</div>
        <div data-anim="float" className="absolute top-[12%] right-[5%] px-5 py-2.5 bg-blue-500/15 border border-blue-500/30 rounded-lg text-lg text-blue-400 font-bold">DOC</div>
        <div data-anim="float" className="absolute top-[80%] left-[4%] px-5 py-2.5 bg-amber-500/15 border border-amber-500/30 rounded-lg text-lg text-amber-400 font-bold">Legal</div>
        <div data-anim="float" className="absolute top-[88%] right-[6%] px-5 py-2.5 bg-indigo-500/15 border border-indigo-500/30 rounded-lg text-lg text-indigo-400 font-bold">URL</div>
        <div data-anim="float" className="absolute top-[50%] left-[2%] px-5 py-2.5 bg-green-500/15 border border-green-500/30 rounded-lg text-lg text-green-400 font-bold">Excel</div>
        <div data-anim="float" className="absolute top-[60%] right-[3%] px-5 py-2.5 bg-teal-500/15 border border-teal-500/30 rounded-lg text-lg text-teal-400 font-bold">CSV</div>
        <div data-anim="float" className="absolute top-[30%] right-[4%] px-5 py-2.5 bg-orange-500/15 border border-orange-500/30 rounded-lg text-lg text-orange-400 font-bold">SQL</div>
        <div data-anim="float" className="absolute top-[70%] left-[6%] px-5 py-2.5 bg-purple-500/15 border border-purple-500/30 rounded-lg text-lg text-purple-400 font-bold">TXT</div>
        <div data-anim="float" className="absolute top-[40%] right-[5%] px-5 py-2.5 bg-cyan-500/15 border border-cyan-500/30 rounded-lg text-lg text-cyan-400 font-bold">JSON</div>
        <div data-anim="float" className="absolute top-[22%] left-[5%] px-5 py-2.5 bg-pink-500/15 border border-pink-500/30 rounded-lg text-lg text-pink-400 font-bold">PPT</div>
        <div data-anim="float" className="absolute top-[45%] left-[12%] px-5 py-2.5 bg-yellow-500/15 border border-yellow-500/30 rounded-lg text-lg text-yellow-400 font-bold">XML</div>
        <div data-anim="float" className="absolute top-[35%] left-[8%] px-5 py-2.5 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-lg text-emerald-400 font-bold">HTML</div>
        <div data-anim="float" className="absolute top-[65%] right-[10%] px-5 py-2.5 bg-rose-500/15 border border-rose-500/30 rounded-lg text-lg text-rose-400 font-bold">XLSX</div>
        <div data-anim="float" className="absolute top-[75%] right-[12%] px-5 py-2.5 bg-sky-500/15 border border-sky-500/30 rounded-lg text-lg text-sky-400 font-bold">MD</div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center p-5 md:p-8 z-10">
        
        {/* Header */}
        <div className="mb-14 text-center mt-28">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter">Aplicación Viva</h2>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-blue-400 font-bold italic">Compatible con variedad de documentos, aprende y evoluciona constantemente.</p>
        </div>

        {/* Cycle layout */}
        <div className="relative w-[900px] h-[600px] max-w-[95vw] max-h-[70vh] flex items-center justify-center">
          
          {/* Rotating ring (arrows) */}
          <svg data-anim="ring" className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
            <circle cx="350" cy="350" r="250" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="20 10" />
          </svg>

          {/* Center circle */}
          <div data-anim="center" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 bg-gradient-to-br from-blue-900 to-indigo-950 border-2 border-blue-500/40 rounded-full flex flex-col items-center justify-center text-center shadow-2xl shadow-blue-500/20">
            <span className="text-lg font-black text-white uppercase leading-tight">Motor de<br />Mejora<br />Continua</span>
          </div>

          {/* Step 1: Top - Fiabilidad Total */}
          <div data-anim="step" className="absolute -top-8 left-1/2 -translate-x-1/2 w-64">
            <div className="bg-gradient-to-br from-white/80 to-gray-300/70 border border-gray-300/60 rounded-xl p-5 shadow-2xl backdrop-blur-md flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/50 rounded-full flex items-center justify-center mb-2">
                <FileCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-base font-black uppercase text-black tracking-wider">Fiabilidad Total</h3>
            </div>
          </div>

          {/* Step 2: Right - Ingesta Inteligente */}
          <div data-anim="step" className="absolute right-0 top-1/2 -translate-y-1/2 w-64">
            <div className="bg-gradient-to-br from-white/80 to-gray-300/70 border border-gray-300/60 rounded-xl p-5 shadow-2xl backdrop-blur-md flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-indigo-500/20 border border-indigo-500/50 rounded-full flex items-center justify-center mb-2">
                <CloudUpload className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-base font-black uppercase text-black tracking-wider">Ingesta Inteligente</h3>
            </div>
          </div>

          {/* Step 3: Bottom - Aprende Solo */}
          <div data-anim="step" className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64">
            <div className="bg-gradient-to-br from-white/80 to-gray-300/70 border border-gray-300/60 rounded-xl p-5 shadow-2xl backdrop-blur-md flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-teal-500/20 border border-teal-500/50 rounded-full flex items-center justify-center mb-2">
                <Cog className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-base font-black uppercase text-black tracking-wider">Aprende Solo</h3>
            </div>
          </div>

          {/* Step 4: Left - Perfiles y Gobernanza */}
          <div data-anim="step" className="absolute left-0 top-1/2 -translate-y-1/2 w-64">
            <div className="bg-gradient-to-br from-white/80 to-gray-300/70 border border-gray-300/60 rounded-xl p-5 shadow-2xl backdrop-blur-md flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/50 rounded-full flex items-center justify-center mb-2">
                <UserCog className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-base font-black uppercase text-black tracking-wider">Perfiles y Gobernanza</h3>
            </div>
          </div>

          {/* Connecting arrows between steps */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
            {/* Top to Right */}
            <path d="M420,120 Q550,120 560,230" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.5" markerEnd="url(#arrow)" />
            {/* Right to Bottom */}
            <path d="M560,470 Q550,570 420,580" fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.5" markerEnd="url(#arrow)" />
            {/* Bottom to Left */}
            <path d="M280,580 Q150,570 140,470" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.5" markerEnd="url(#arrow)" />
            {/* Left to Top */}
            <path d="M140,230 Q150,120 280,120" fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.5" markerEnd="url(#arrow)" />
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#3b82f6" opacity="0.7" />
              </marker>
            </defs>
          </svg>

        </div>

        {/* Footer */}
        <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center text-[10px] tracking-widest font-bold text-gray-500 font-mono pt-3 border-t border-white/10">
          <span>FIABILIDAD & INTELIGENCIA</span><span>DIAPOSITIVA 4 / 5</span>
        </div>
      </div>
    </div>
  );
}
