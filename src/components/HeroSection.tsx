import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import ThreeShoeCanvas from './ThreeShoeCanvas';

export default function HeroSection() {
  const [showTitleCard, setShowTitleCard] = useState(true);
  const [skipCard, setSkipCard] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Check if user prefers reduced motion or is on mobile to speed up/skip animations
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setSkipCard(true);
      setShowTitleCard(false);
    } else {
      // Extended cinematic delay to give a truly premium experience
      const timer = setTimeout(() => {
        setShowTitleCard(false);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, []);

  // Track mouse movement to create subtle interactive lens/gyro drift
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 35,
        y: (e.clientY / window.innerHeight - 0.5) * 35,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax elements with useScroll & useTransform (Extended multipliers for longer transitions)
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1200], [0, 280]);
  const yContent = useTransform(scrollY, [0, 1200], [0, -140]);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const bgScale = useTransform(scrollY, [0, 1200], [1, 1.18]);

  const tagline = "Wear the streets. Own the future.";
  const words = tagline.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: skipCard ? 0.1 : 1.7,
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const scrollToCollection = () => {
    const section = document.getElementById('collection-showcase-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const brandLetters = "PATUHCIOKS".split("");

  return (
    <section 
      id="hero-cinematic-section"
      className="relative min-h-screen flex items-center justify-center bg-[#0c0d10] overflow-hidden text-[#e2dfd2]"
    >
      {/* 1. Cinematic Black Title Card (Opening Transition with AnimatePresence) */}
      <AnimatePresence>
        {showTitleCard && !skipCard && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
            }}
            className="fixed inset-0 bg-[#06070a] z-50 flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="text-center overflow-hidden px-4">
              {/* Cinematic Staggered Letters Revealing and then Expanding apart on exit */}
              <div className="flex gap-1 sm:gap-3 justify-center mb-6 overflow-hidden">
                {brandLetters.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 60, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ 
                      y: -50, 
                      scale: 1.15,
                      opacity: 0,
                      transition: { duration: 0.9, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }
                    }}
                    transition={{ 
                      duration: 0.95, 
                      delay: 0.15 + index * 0.05, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    className="text-3xl sm:text-5xl md:text-7xl font-mono uppercase font-bold tracking-widest text-[#e2dfd2] inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              {/* Subtitle Line */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.95 }}
                className="font-mono text-[9px] tracking-[0.4em] text-[#a68a5d] uppercase"
              >
                STREET • LUXURY • EARTH ATELIER
              </motion.div>
              
              {/* Cinematic loading line sweep */}
              <div className="w-48 h-[1px] bg-white/5 mx-auto mt-6 relative overflow-hidden">
                <motion.div 
                  initial={{ left: '-100%' }}
                  animate={{ left: '100%' }}
                  transition={{ duration: 1.6, ease: "easeInOut", repeat: 0 }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#a68a5d]/60 to-transparent"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Vignette Overlay from Immersive UI design */}
      <div className="pointer-events-none absolute inset-0 z-40 shadow-[inset_0_0_200px_rgba(0,0,0,0.95)]"></div>

      {/* Interactive Flashlight/Lens Flare following the mouse */}
      <div 
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          willChange: 'transform'
        }}
        className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] rounded-full bg-[#a68a5d]/[0.018] blur-[150px] pointer-events-none z-10 transition-transform duration-700 ease-out" 
      />

      {/* 2. Static Cinematic Letterbox Bars */}
      <div className="absolute top-0 left-0 w-full h-4 bg-black/95 z-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-4 bg-black/95 z-40 pointer-events-none" />

      {/* 3. Parallax Background Layer */}
      <motion.div 
        style={{ y: yBg, scale: bgScale, willChange: 'transform' }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Subtle radial vignette grading background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(21,23,28,0.85)_0%,rgba(12,13,16,1)_100%)]" />
        
        {/* Cinematic light streaks configured with Immersive UI earthy brass hues */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#a68a5d22] to-transparent transform -rotate-12 animate-light-streak-1" />
          <div className="absolute top-0 right-1/3 w-[1px] h-full bg-gradient-to-b from-transparent via-[#a68a5d11] to-transparent transform rotate-12 animate-light-streak-2" />
          <div className="absolute top-0 left-[55%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#93827415] to-transparent transform -rotate-6 animate-light-streak-3" />
        </div>
      </motion.div>

      {/* 4. Active Main Content Container (Parallax Content Layer) */}
      <motion.div 
        style={{ 
          y: yContent, 
          opacity: textOpacity,
          willChange: 'transform, opacity' 
        }}
        className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 w-full max-w-7xl pt-24 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        {/* Left: Branding & Cinematic Tagline */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          {/* Streetwear / Luxury / Earth label */}
          <div className="inline-flex items-center gap-2 mb-6 text-[9px] uppercase tracking-[0.4em] text-[#a68a5d]">
            <span className="w-8 h-[1px] bg-[#a68a5d]"></span>
            STREET. LUXURY. EARTH.
          </div>

          <h2 className="text-5xl sm:text-7xl md:text-[85px] font-display leading-[0.85] font-black uppercase tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-br from-[#e2dfd2] via-[#e2dfd2] to-[#938274] mb-6">
            PATUHCIOKS
          </h2>

          {/* Staggered text reveal with Serif style */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-serif italic text-2xl sm:text-3xl text-[#938274] leading-relaxed mb-8 max-w-lg"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block mr-2"
              >
                {word === 'future.' ? <span className="text-[#a68a5d] opacity-90">{word}</span> : word}
              </motion.span>
            ))}
          </motion.div>

          <p className="text-xs sm:text-sm text-[#938274] leading-relaxed font-sans max-w-md mb-10">
            Menggabungkan energi kultur jalanan, craftsmanship luxury pudar, dan material daur ulang motorsport dalam satu sol abadi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={scrollToCollection}
              className="px-8 py-4 bg-[#a68a5d] text-[#0c0d10] text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#c4a675] transition-all duration-300 border border-transparent cursor-pointer shadow-[0_10px_30px_rgba(166,138,93,0.15)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Collection
            </button>
            <button
              onClick={() => {
                const section = document.getElementById('story-section');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 text-xs font-mono font-bold uppercase tracking-widest text-[#e2dfd2] bg-black/40 hover:bg-[#15171b] transition-all duration-300 border border-white/10 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              The Manifesto
            </button>
          </div>
        </div>

        {/* Right: Interactive 3D Shoe Renders (Takes 3D canvas and fallback) */}
        <div className="lg:col-span-6 h-[45vh] sm:h-[55vh] lg:h-[70vh] w-full relative flex items-center justify-center">
          
          {/* Animated circular motion graphic HUD system surrounding the 3D shoe */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            {/* Outer Slow Rotating Dotted Ring */}
            <div className="absolute w-[80%] aspect-square rounded-full border border-[#a68a5d]/10 border-dashed animate-spin" style={{ animationDuration: '60s' }} />
            
            {/* Middle Fast Rotating Tech HUD Arc */}
            <div className="absolute w-[68%] aspect-square rounded-full border-2 border-transparent border-t-[#a68a5d]/30 border-b-[#938274]/20 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
            
            {/* Inner Static crosshairs */}
            <div className="absolute w-[45%] aspect-square rounded-full border border-white/5 flex items-center justify-center">
              <div className="w-full h-[1px] bg-white/5 absolute" />
              <div className="h-full w-[1px] bg-white/5 absolute" />
              {/* Core technical focal tick */}
              <div className="w-4 h-4 border border-[#a68a5d]/30 rounded-none" />
            </div>

            {/* Glowing ambient radial sphere */}
            <div className="absolute w-[60%] aspect-square bg-[#a68a5d]/[0.025] blur-[80px] rounded-full" />
          </div>

          <div className="relative w-full h-full z-10">
            <ThreeShoeCanvas colorway="phantom" />
          </div>

          {/* Side floating specification indicators (Brutalist Style) */}
          <div className="absolute bottom-4 left-4 font-mono text-[9px] tracking-widest text-[#938274] bg-[#0c0d10]/80 backdrop-blur-md p-3.5 border border-white/5 rounded-none uppercase space-y-1.5 z-20 pointer-events-none hidden sm:block">
            <p><span className="text-zinc-600 font-bold">ENGINE:</span> ROT_AUTO.MAPPED</p>
            <p><span className="text-zinc-600 font-bold">SHAPE:</span> POLY.CUSTOM_LOW</p>
            <p><span className="text-[#a68a5d] font-bold">CIRCULAR:</span> SUPPLY_TREE.OK</p>
          </div>

          <div className="absolute top-4 right-4 font-mono text-[9px] tracking-widest text-[#938274] bg-[#0c0d10]/80 backdrop-blur-md p-3.5 border border-white/5 rounded-none uppercase space-y-1.5 z-20 pointer-events-none hidden sm:block">
            <p className="text-[#a68a5d] font-bold">● ACTIVE SENSOR VIEW</p>
            <p><span className="text-zinc-600 font-bold">SOLE:</span> RECYCLED_TIRE_TREAD</p>
          </div>
        </div>
      </motion.div>

      {/* 5. Elegant Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[9px] font-mono tracking-[0.25em] text-[#938274] uppercase animate-pulse">
          SCROLL TO UNCOVER
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#a68a5d]/30 to-transparent animate-pulse" />
      </div>

      {/* Styled light streak animation loops in style tag for performance */}
      <style>{`
        @keyframes lightStreak1 {
          0% { transform: translateY(-30%) rotate(-12deg); opacity: 0; }
          20% { opacity: 0.5; }
          80% { opacity: 0.5; }
          100% { transform: translateY(30%) rotate(-12deg); opacity: 0; }
        }
        @keyframes lightStreak2 {
          0% { transform: translateY(20%) rotate(12deg); opacity: 0; }
          15% { opacity: 0.3; }
          75% { opacity: 0.3; }
          100% { transform: translateY(-20%) rotate(12deg); opacity: 0; }
        }
        @keyframes lightStreak3 {
          0% { transform: translateY(-15%) rotate(-6deg); opacity: 0; }
          30% { opacity: 0.25; }
          70% { opacity: 0.25; }
          100% { transform: translateY(15%) rotate(-6deg); opacity: 0; }
        }
        .animate-light-streak-1 {
          animation: lightStreak1 12s infinite linear;
        }
        .animate-light-streak-2 {
          animation: lightStreak2 15s infinite linear;
        }
        .animate-light-streak-3 {
          animation: lightStreak3 18s infinite linear;
        }
      `}</style>
    </section>
  );
}
