import { useEffect, useRef, useState, useCallback } from 'react';

import CoverSlide from './components/Slides/CoverSlide';
import ProblemSolutionSlide from './components/Slides/ProblemSolutionSlide';
import EaseSecuritySlide from './components/Slides/EaseSecuritySlide';
import TrustIntelSlide from './components/Slides/TrustIntelSlide';
import ActionDemoSlide from './components/Slides/ActionDemoSlide';

const totalSlides = 5;

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const isAnimating = useRef(false);

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= totalSlides || index === activeSlide || isAnimating.current) return;
    isAnimating.current = true;
    setActiveSlide(index);
    setTimeout(() => { isAnimating.current = false; }, 700);
  }, [activeSlide]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) goTo(activeSlide + 1);
      else if (e.deltaY < 0) goTo(activeSlide - 1);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(activeSlide + 1);
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goTo(activeSlide - 1);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeSlide, goTo]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#060d1f]">
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ width: `${totalSlides * 100}vw`, transform: `translateX(-${activeSlide * 100}vw)` }}
      >
        <CoverSlide id="slide-0" isActive={activeSlide === 0} />
        <ProblemSolutionSlide id="slide-1" isActive={activeSlide === 1} />
        <EaseSecuritySlide id="slide-2" isActive={activeSlide === 2} />
        <TrustIntelSlide id="slide-3" isActive={activeSlide === 3} />
        <ActionDemoSlide id="slide-4" isActive={activeSlide === 4} />
      </div>
    </div>
  );
}
