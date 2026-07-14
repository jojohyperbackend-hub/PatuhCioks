import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import HeroSection from './components/HeroSection';
import BrandStory from './components/BrandStory';
import CollectionShowcase from './components/CollectionShowcase';
import InteractiveMotionTree from './components/InteractiveMotionTree';
import SustainabilityProfile from './components/SustainabilityProfile';
import Testimonials from './components/Testimonials';
import NewsletterCTA from './components/NewsletterCTA';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Track viewport scroll and calculate integer percentage
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercent(Math.min(Math.round((window.scrollY / totalHeight) * 100), 100));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set up mouse coordinates tracking and check device capabilities
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    setIsMobile(isTouchDevice);

    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Determine if cursor is hovering over an interactive element for visual morphing
      const target = e.target as HTMLElement;
      if (target) {
        const isInteractive = 
          target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.closest('button') || 
          target.closest('a') || 
          target.classList.contains('cursor-pointer');
        setIsHoveringClickable(!!isInteractive);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Spring animations for custom cursor lag effect
  const cursorX = useSpring(mousePos.x - 4, { stiffness: 600, damping: 45 });
  const cursorY = useSpring(mousePos.y - 4, { stiffness: 600, damping: 45 });
  const ringX = useSpring(mousePos.x - 24, { stiffness: 180, damping: 28 });
  const ringY = useSpring(mousePos.y - 24, { stiffness: 180, damping: 28 });

  return (
    <div 
      id="landing-page-root" 
      className="min-h-screen bg-[#0c0d10] text-[#e2dfd2] selection:bg-[#a68a5d]/35 selection:text-[#e2dfd2] relative overflow-hidden"
    >
      {/* Cinematic CRT Scanlines and Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015] mix-blend-overlay bg-repeat bg-[size:4px_4px]" style={{ backgroundImage: 'linear-gradient(rgba(166,138,93,0.3) 50%, transparent 50%), linear-gradient(90deg, rgba(166,138,93,0.3) 50%, transparent 50%)' }} />

      {/* 1. Global Brutalist Scroll Telemetry HUD Bar */}
      <div className="fixed top-0 left-0 right-0 h-10 bg-[#0c0d10]/95 backdrop-blur-md border-b border-white/5 z-40 flex items-center justify-between px-6 sm:px-10 font-mono text-[9px] tracking-[0.25em] text-[#938274] select-none pointer-events-none">
        <div className="flex items-center gap-4">
          <span className="text-[#a68a5d] font-bold">● SYS_READY</span>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <span className="hidden sm:inline">LATENCY // 0.08MS</span>
        </div>

        {/* Scaled visual line connecting */}
        <div className="flex-1 max-w-[200px] h-[1px] bg-white/5 mx-6 relative overflow-hidden hidden md:block">
          <motion.div 
            style={{ scaleX: smoothProgress }}
            className="absolute inset-0 bg-gradient-to-r from-[#938274]/10 via-[#a68a5d]/60 to-[#938274]/10 origin-left"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-zinc-600 font-bold">[</span>
          <span className="text-[#e2dfd2] w-8 text-right font-bold">
            {scrollPercent.toString().padStart(3, '0')}%
          </span>
          <span className="text-zinc-600 font-bold">]</span>
          <span className="text-[#a68a5d]">DEPTH_UNIT</span>
        </div>
      </div>

      {/* 2. Global Interactive Kinetic HUD Cursor (Hidden on Touch Screen) */}
      {!isMobile && (
        <>
          {/* Core Focus Center Dot */}
          <motion.div
            style={{ x: cursorX, y: cursorY }}
            animate={{
              scale: isHoveringClickable ? 1.8 : 1,
              backgroundColor: isHoveringClickable ? '#e2dfd2' : '#a68a5d',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed w-2 h-2 rounded-full pointer-events-none z-50 mix-blend-difference"
          />

          {/* Lagged Outer HUD Tracking Ring */}
          <motion.div
            style={{ x: ringX, y: ringY }}
            animate={{
              width: isHoveringClickable ? 64 : 48,
              height: isHoveringClickable ? 64 : 48,
              borderColor: isHoveringClickable ? '#e2dfd2' : '#a68a5d',
              borderWidth: isHoveringClickable ? '2px' : '1px',
              rotate: isHoveringClickable ? 90 : 0
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 25 }}
            className="fixed rounded-full pointer-events-none z-50 flex items-center justify-center opacity-40"
          >
            {/* Compass ticks on tracking ring */}
            <div className="absolute top-0 w-[1px] h-1.5 bg-[#a68a5d]" />
            <div className="absolute bottom-0 w-[1px] h-1.5 bg-[#a68a5d]" />
            <div className="absolute left-0 h-[1px] w-1.5 bg-[#a68a5d]" />
            <div className="absolute right-0 h-[1px] w-1.5 bg-[#a68a5d]" />

            {/* Trailing precise coordinate values label */}
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[7px] text-[#938274]/80 uppercase tracking-widest whitespace-nowrap select-none pointer-events-none scale-90">
              X:{mousePos.x} Y:{mousePos.y}
            </span>
          </motion.div>
        </>
      )}

      {/* Main Sections wrapped beautifully */}
      <div className="pt-10">
        {/* 1. Hero Cinematic Opening */}
        <HeroSection />

        {/* 2. Brand Story / Manifesto */}
        <BrandStory />

        {/* 3. Collection Showcase Grid */}
        <CollectionShowcase />

        {/* 4. Interactive Material Supply Chain Node Tree */}
        <InteractiveMotionTree />

        {/* 5. Circular Sustainability Profile */}
        <SustainabilityProfile />

        {/* 6. Testimonial Persona Profiles */}
        <Testimonials />

        {/* 7. CTA & Newsletter */}
        <NewsletterCTA />
      </div>

    </div>
  );
}
