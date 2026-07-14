import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { CRAFTSMANSHIP_IMAGE } from '../data';

export default function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  // States for 3D card tilt and hover scanning
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  // Deep viewport scroll detection for cinematic parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Translates vertical position of the asset for high-impact smooth parallax
  const yParallax = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const textRevealY = useTransform(scrollYProgress, [0, 0.45], [60, 0]);
  const textRevealOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const dividerWidth = useTransform(scrollYProgress, [0.05, 0.5], ['0%', '100%']);

  // Handle 3D Mouse Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!posterRef.current) return;
    const rect = posterRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 16, y: y * -16 });
    setIsHovered(true);

    // Calculate Y-percentage for the laser scanner line
    const yPercent = Math.min(Math.max(((e.clientY - rect.top) / rect.height) * 100, 0), 100);
    setScanProgress(yPercent);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Main manifesto quote splits for premium editorial feel
  const headingWords = "Lahir dari Jalanan. Ditempa dengan Tangan. Grounded pada Bumi.".split(" ");

  return (
    <section 
      ref={containerRef}
      id="story-section"
      className="relative py-28 sm:py-40 bg-[#0c0d10] text-[#e2dfd2] overflow-hidden border-t border-white/5"
    >
      {/* Immersive subtle ambient glow */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#a68a5d]/[0.035] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#4a5d4e]/[0.025] rounded-full blur-[130px] pointer-events-none" />

      {/* Grid line accents */}
      <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-white/[0.015] pointer-events-none hidden xl:block" />
      <div className="absolute top-0 bottom-0 right-12 w-[1px] bg-white/[0.015] pointer-events-none hidden xl:block" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Block: Editorial Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[9px] tracking-[0.4em] font-mono font-bold uppercase text-[#a68a5d] mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#a68a5d]"></span>
              THE MANIFESTO ATELIER
            </span>

            {/* Dynamic scroll-linked animated divider line */}
            <div className="h-[1px] bg-white/5 w-full mb-8 relative overflow-hidden">
              <motion.div 
                style={{ width: dividerWidth }}
                className="absolute top-0 left-0 h-full bg-[#a68a5d]"
              />
            </div>

            <motion.h3 
              style={{ y: textRevealY, opacity: textRevealOpacity }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-light uppercase mb-8 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#e2dfd2] via-[#e2dfd2] to-[#938274]"
            >
              Lahir dari Jalanan.<br/>
              Ditempa dengan Tangan.<br/>
              Grounded pada Bumi.
            </motion.h3>

            <div className="space-y-6 text-[#938274] font-sans text-sm sm:text-base leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                PatuhCioks lahir bukan di meja korporat, melainkan di aspal basah malam hari kota Jakarta. Kami menyaksikan bagaimana budaya urban melaju dengan cepat, namun meninggalkan jejak limbah industri yang tak terhapuskan.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Kami menolak kompromi. Kami mengambil sol dari ban motorsport daur ulang yang memiliki ketahanan ekstrem, merakit bagian atasnya dengan tangan (atelier craftsmanship), dan menggunakan bahan serat organik bersumber lokal yang bersahabat dengan bumi.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[#e2dfd2] font-medium"
              >
                Hasilnya? Sepatu dengan identitas jalanan yang garang, kenyamanan kustomisasi butik, dan tanggung jawab penuh terhadap generasi depan.
              </motion.p>
            </div>

            {/* Micro-indicator numbers (Brutalist detail) with staggered hover highlights */}
            <div className="grid grid-cols-3 gap-6 pt-12 mt-12 border-t border-white/5">
              <motion.div 
                whileHover={{ y: -6, color: '#e2dfd2' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="cursor-pointer group"
              >
                <p className="font-mono text-[9px] text-[#938274] group-hover:text-[#a68a5d] tracking-widest uppercase mb-1 transition-colors">CULTURE</p>
                <p className="text-sm font-mono text-[#e2dfd2] font-semibold">100% STREET</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -6, color: '#e2dfd2' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="cursor-pointer group"
              >
                <p className="font-mono text-[9px] text-[#938274] group-hover:text-[#a68a5d] tracking-widest uppercase mb-1 transition-colors">ASSEMBLY</p>
                <p className="text-sm font-mono text-[#e2dfd2] font-semibold">BY HAND</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -6, color: '#e2dfd2' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="cursor-pointer group"
              >
                <p className="font-mono text-[9px] text-[#938274] group-hover:text-[#a68a5d] tracking-widest uppercase mb-1 transition-colors">ORIGIN</p>
                <p className="text-sm font-mono text-[#e2dfd2] font-semibold">INDONESIA</p>
              </motion.div>
            </div>
          </div>

          {/* Right Block: Parallax Visual Canvas with Interactive 3D Tilt */}
          <div className="lg:col-span-6">
            <div 
              className="relative w-full h-[450px] sm:h-[570px] rounded-none overflow-hidden border border-white/5 shadow-[0_30px_70px_rgba(0,0,0,0.85)] bg-[#0a0b0e] perspective-[1000px] cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              
              {/* Dynamic 3D tilted inner card wrapper */}
              <motion.div 
                ref={posterRef}
                style={{ 
                  rotateX: tilt.x, 
                  rotateY: tilt.y,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
                className="absolute inset-0 w-full h-full transition-transform duration-200 ease-out"
              >
                {/* Parallax Image inside */}
                <motion.div 
                  style={{ y: yParallax, willChange: 'transform' }}
                  className="absolute inset-0 w-full h-[140%] -top-[20%] pointer-events-none"
                >
                  <img
                    src={CRAFTSMANSHIP_IMAGE}
                    alt="PatuhCioks Raw Craftsmanship and Sustainable Materials Showcase"
                    className="w-full h-full object-cover filter brightness-[0.6] contrast-[1.2] grayscale-[15%] transition-all duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </motion.div>

                {/* Laser scan line overlay when hovered */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ top: `${scanProgress}%` }}
                      className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#a68a5d] to-transparent shadow-[0_0_12px_#a68a5d] pointer-events-none z-20"
                    />
                  )}
                </AnimatePresence>

                {/* Corner Brutalist bracket frame (technical theme) */}
                <div className="absolute inset-4 border border-white/5 pointer-events-none">
                  {/* Top Left Bracket */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#a68a5d]/40" />
                  {/* Top Right Bracket */}
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#a68a5d]/40" />
                  {/* Bottom Left Bracket */}
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#a68a5d]/40" />
                  {/* Bottom Right Bracket */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#a68a5d]/40" />
                </div>

                {/* Real-time coordinates scanner box */}
                {isHovered && (
                  <div 
                    style={{ 
                      top: `${Math.min(scanProgress + 2, 90)}%`,
                      left: '8%'
                    }}
                    className="absolute font-mono text-[7px] text-[#a68a5d] uppercase tracking-widest pointer-events-none z-20 bg-black/80 px-1.5 py-0.5 border border-[#a68a5d]/20"
                  >
                    SCAN_DEPTH // COMP_OK: {(scanProgress * 10).toFixed(0)}NM
                  </div>
                )}
              </motion.div>

              {/* Lens overlay & vignette */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0c0d10] via-transparent to-transparent opacity-95" />
              <div className="absolute inset-0 pointer-events-none border border-white/5" />

              {/* Interactive technical graphic line overlays */}
              <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none select-none">
                <div className="w-8 h-[1px] bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full border border-white/20" />
                <div className="w-8 h-[1px] bg-white/10" />
              </div>

              {/* Floating physical detail tag */}
              <motion.div 
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-6 left-6 right-6 p-6 rounded-none border border-white/5 bg-[#0c0d10]/95 backdrop-blur-md text-left shadow-2xl z-10"
              >
                <span className="text-[9px] font-mono tracking-[0.2em] text-[#a68a5d] uppercase block mb-1.5 font-bold">
                  DETAIL SPEC #014 / ATELIER
                </span>
                <p className="text-[11px] font-sans text-[#e2dfd2] leading-relaxed font-light">
                  Penggabungan material raw clay suede dengan jahitan benang daur ulang berlapis ganda, menghasilkan struktur atas berdaya tahan ekstrem namun sangat adaptif terhadap lekuk kaki.
                </p>
              </motion.div>

              {/* Small vertical coordinates label */}
              <div className="absolute top-6 left-6 font-mono text-[8px] text-[#938274]/50 uppercase tracking-[0.25em] writing-vertical select-none">
                LOC. ATELIER-JAKARTA // 2026
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
