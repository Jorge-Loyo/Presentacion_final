import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavigationProps {
  activeSlide: number;
  totalSlides: number;
  onNavigate: (index: number) => void;
}

export default function Navigation({ activeSlide, totalSlides, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Navbar - minimal */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6 px-8 md:px-16 flex justify-between items-center ${
          scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => onNavigate(0)}>
          <img src="/img/Infodets_logo.png" alt="Infodets" className="h-8 object-contain" />
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="lg:hidden flex items-center text-slate-400 hover:text-white p-2 rounded-none hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop: slide counter */}
        <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">
          <span>{activeSlide + 1} / {totalSlides}</span>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-0 bg-black/95 z-40 lg:hidden flex flex-col justify-center px-10 transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-4 max-w-sm mx-auto w-full">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => { onNavigate(idx); setMobileMenuOpen(false); }}
              className={`px-6 py-4 rounded-none text-left transition-all text-xs uppercase font-extrabold tracking-widest ${
                activeSlide === idx 
                  ? 'bg-blue-600 text-white border-l-4 border-white' 
                  : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              Diapositiva {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-black z-50">
        <div 
          className="h-full bg-blue-500 transition-all duration-100 shadow-[0_0_12px_#3b82f6]"
          style={{ width: `${(activeSlide / (totalSlides - 1)) * 100}%` }}
        />
      </div>
    </>
  );
}
