import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Bot, Smartphone, Lock, FileCheck, CloudUpload, Cog, UserCog, MessageSquare, Globe, Hospital, Scale, Landmark, Building2 } from 'lucide-react';

interface ActionDemoSlideProps {
  id: string;
  isActive: boolean;
}

export default function ActionDemoSlide({ id, isActive }: ActionDemoSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimated.current || !containerRef.current) return;
    hasAnimated.current = true;
    const el = containerRef.current;

    gsap.from(el.querySelector("[data-anim='title']"), { y: -50, duration: 1.2, ease: "power3.out" });
    gsap.from(el.querySelector("[data-anim='video']"), { scale: 0.9, duration: 1.2, delay: 0.3, ease: "power3.out" });
    gsap.from(el.querySelector("[data-anim='sub']"), { y: 30, duration: 1, delay: 0.6, ease: "power3.out" });
    gsap.to(el.querySelector("[data-anim='video']"), { y: -5, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });

    // Floating icons
    el.querySelectorAll("[data-anim='float']").forEach((icon, i) => {
      gsap.from(icon, { scale: 0, duration: 0.5, delay: 0.8 + i * 0.1, ease: "back.out(1.7)" });
      gsap.to(icon, {
        y: "random(-12, 12)",
        x: "random(-8, 8)",
        rotation: "random(-10, 10)",
        duration: 3 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5 + i * 0.3
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
      {/* Animated circuit background */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-40" xmlns="http://www.w3.org/2000/svg">
        <path className="cpath" d="M0,150 H300 L320,170 H600 L620,150 H950" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path className="cpath" d="M1400,300 H1050 L1030,320 H750 L730,300 H400 L380,320 H50" stroke="#6366f1" strokeWidth="1" fill="none" />
        <path className="cpath" d="M0,450 H250 L270,470 H500 L520,450 H800 L820,470 H1100" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path className="cpath" d="M1400,580 H1100 L1080,600 H800 L780,580 H450 L430,600 H100" stroke="#6366f1" strokeWidth="1" fill="none" />
        <path className="cpath" d="M200,0 V200 L220,220 V400 L200,420 V650" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <path className="cpath" d="M550,800 V550 L570,530 V350 L550,330 V100" stroke="#6366f1" strokeWidth="1" fill="none" />
        <path className="cpath" d="M900,0 V180 L920,200 V420 L900,440 V700" stroke="#3b82f6" strokeWidth="1" fill="none" />
        <circle data-anim="cdot" cx="300" cy="150" r="3" fill="#3b82f6" opacity="0.4" />
        <circle data-anim="cdot" cx="750" cy="300" r="3" fill="#6366f1" opacity="0.4" />
        <circle data-anim="cdot" cx="500" cy="450" r="3" fill="#3b82f6" opacity="0.4" />
        <circle data-anim="cdot" cx="200" cy="400" r="3" fill="#6366f1" opacity="0.4" />
        <circle data-anim="cdot" cx="550" cy="530" r="3" fill="#3b82f6" opacity="0.4" />
        <circle data-anim="cdot" cx="900" cy="200" r="3" fill="#6366f1" opacity="0.4" />
      </svg>

      {/* Floating icons from previous slides */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div data-anim="float" className="absolute top-[10%] left-[6%] w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center">
          <Smartphone className="w-6 h-6 text-blue-400" />
        </div>
        <div data-anim="float" className="absolute top-[15%] right-[8%] w-12 h-12 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6 text-indigo-400" />
        </div>
        <div data-anim="float" className="absolute top-[40%] left-[4%] w-12 h-12 bg-teal-500/10 border border-teal-500/30 rounded-full flex items-center justify-center">
          <Lock className="w-6 h-6 text-teal-400" />
        </div>
        <div data-anim="float" className="absolute top-[60%] left-[8%] w-12 h-12 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-green-400" />
        </div>
        <div data-anim="float" className="absolute top-[75%] left-[5%] w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center">
          <Hospital className="w-6 h-6 text-amber-400" />
        </div>
        <div data-anim="float" className="absolute top-[45%] right-[5%] w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center">
          <FileCheck className="w-6 h-6 text-blue-400" />
        </div>
        <div data-anim="float" className="absolute top-[65%] right-[7%] w-12 h-12 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center">
          <CloudUpload className="w-6 h-6 text-indigo-400" />
        </div>
        <div data-anim="float" className="absolute top-[80%] right-[12%] w-12 h-12 bg-teal-500/10 border border-teal-500/30 rounded-full flex items-center justify-center">
          <Cog className="w-6 h-6 text-teal-400" />
        </div>
        <div data-anim="float" className="absolute bottom-[12%] left-[15%] w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center">
          <Scale className="w-6 h-6 text-amber-400" />
        </div>
        <div data-anim="float" className="absolute top-[20%] left-[20%] w-12 h-12 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center">
          <Landmark className="w-6 h-6 text-indigo-400" />
        </div>
        <div data-anim="float" className="absolute top-[25%] right-[18%] w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center">
          <Building2 className="w-6 h-6 text-blue-400" />
        </div>
        <div data-anim="float" className="absolute bottom-[18%] right-[20%] w-12 h-12 bg-white/10 border border-white/30 rounded-full flex items-center justify-center">
          <Globe className="w-6 h-6 text-white" />
        </div>
        <div data-anim="float" className="absolute top-[55%] left-[18%] w-12 h-12 bg-teal-500/10 border border-teal-500/30 rounded-full flex items-center justify-center">
          <UserCog className="w-6 h-6 text-teal-400" />
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center p-6 md:p-10 z-10 text-center gap-8">
        
        <div data-anim="title" className="text-center mt-28">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase">
            Véalo en acción
          </h2>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-blue-400 font-bold italic">
            Una demostración vale más que mil palabras.
          </p>
        </div>

        <div data-anim="video" className="w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-xl">
          <video
            className="w-full h-full object-contain rounded-lg bg-black"
            controls
            poster=""
          >
            <source src="/img/0620.mp4" type="video/mp4" />
          </video>
        </div>

        <p data-anim="sub" className="text-base sm:text-lg font-black text-white uppercase tracking-wide">
          Solicita tu demo y dale vida a la memoria de tu institución.
        </p>

        {/* Logos */}
        <div data-anim="sub" className="flex items-center justify-center gap-6">
          <div className="bg-white rounded-lg p-3">
            <img src="/img/Infodets_logo.png" alt="Infodets" className="h-16 object-contain" />
          </div>
          <span className="text-white text-2xl font-black uppercase">BY</span>
          <img src="/img/Umbrella_logo2.png" alt="Umbrella Devs" className="h-24 object-contain" />
          <img src="/img/Logo_IFTS11.jpg" alt="IFTS 11" className="h-16 object-contain rounded" />
        </div>

        {/* Footer */}
        <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center text-[10px] tracking-widest font-bold text-gray-500 font-mono pt-3 border-t border-white/10">
          <span>INFODETS - UMBRELLA DEVS</span><span>DIAPOSITIVA 5 / 5</span>
        </div>
      </div>
    </div>
  );
}
