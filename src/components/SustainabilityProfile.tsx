import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { SNEAKER_SHOWCASE_IMAGE } from '../data';
import { Activity, ShieldCheck, Compass, Anchor } from 'lucide-react';

export default function SustainabilityProfile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // State values for counters
  const [recycledAvg, setRecycledAvg] = useState(0);
  const [carbonSaved, setCarbonSaved] = useState(0);
  const [oceanPlastic, setOceanPlastic] = useState(0);

  // States for interactive hotspots on the poster
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  // Trigger counters when element enters view
  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds high accuracy

    const targets = {
      recycledAvg: 84.56,
      carbonSaved: 4.36,
      oceanPlastic: 12.84
    };

    const animateCounters = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function (out-expo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setRecycledAvg(easeProgress * targets.recycledAvg);
      setCarbonSaved(easeProgress * targets.carbonSaved);
      setOceanPlastic(easeProgress * targets.oceanPlastic);

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      } else {
        // High fidelity final lock
        setRecycledAvg(targets.recycledAvg);
        setCarbonSaved(targets.carbonSaved);
        setOceanPlastic(targets.oceanPlastic);
      }
    };

    requestAnimationFrame(animateCounters);
  }, [isInView]);

  return (
    <section 
      ref={containerRef}
      id="sustainability-section"
      className="py-28 sm:py-36 bg-[#0c0d10] text-[#e2dfd2] border-t border-white/5 overflow-hidden relative"
    >
      {/* Visual decorative matrix nodes in background */}
      <div className="absolute top-10 right-10 font-mono text-[7px] text-zinc-800 tracking-[0.3em] uppercase select-none pointer-events-none hidden md:block">
        LAB_STREAM_STABILITY // COMP_CHECK: PASS
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Block: Cinematic Interactive Hotspot Poster */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-none overflow-hidden border border-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.8)] bg-[#0a0b0e] group">
              <img
                src={SNEAKER_SHOWCASE_IMAGE}
                alt="PatuhCioks Eco-conscious Materials Showcase"
                className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.2] grayscale-[10%] transition-transform duration-1000 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/20 to-transparent opacity-95 pointer-events-none" />

              {/* Dynamic Interactive Hotspot Pointers */}
              
              {/* Hotspot 1 */}
              <div 
                className="absolute top-[28%] left-[38%] z-25 group/hot"
                onMouseEnter={() => setActiveHotspot(1)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                <span className="absolute -inset-2.5 rounded-full bg-[#a68a5d]/30 animate-ping pointer-events-none" />
                <span className="relative flex h-3 w-3 bg-[#a68a5d] rounded-full border border-white/80 cursor-crosshair" />
                
                {/* Float specs tooltip */}
                <div className={`absolute bottom-5 -left-10 w-44 p-2 bg-[#0c0d10]/95 border border-[#a68a5d]/30 font-mono text-[8px] tracking-wider text-[#938274] transition-all duration-300 pointer-events-none ${
                  activeHotspot === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}>
                  <span className="text-[#e2dfd2] block font-bold mb-0.5">HEEL REINFORCEMENT</span>
                  100% Recycled TPU weave, vulcanized under hydraulic compression.
                </div>
              </div>

              {/* Hotspot 2 */}
              <div 
                className="absolute top-[68%] left-[55%] z-25 group/hot"
                onMouseEnter={() => setActiveHotspot(2)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                <span className="absolute -inset-2.5 rounded-full bg-[#4a5d4e]/30 animate-ping pointer-events-none" />
                <span className="relative flex h-3 w-3 bg-[#4a5d4e] rounded-full border border-white/80 cursor-crosshair" />
                
                {/* Float specs tooltip */}
                <div className={`absolute bottom-5 -left-10 w-44 p-2 bg-[#0c0d10]/95 border border-[#4a5d4e]/40 font-mono text-[8px] tracking-wider text-[#938274] transition-all duration-300 pointer-events-none ${
                  activeHotspot === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}>
                  <span className="text-[#e2dfd2] block font-bold mb-0.5">ECO_TREAD SOLE</span>
                  92.4% Motorsport ban luar scrap, vulcanized under nitrogen compound.
                </div>
              </div>

              {/* Interactive specs overlay text depending on active hotspot */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-none border border-white/5 bg-[#0c0d10]/95 backdrop-blur-md text-left shadow-2xl z-20">
                <p className="font-mono text-[9px] tracking-widest text-[#a68a5d] uppercase mb-1.5 font-bold flex items-center gap-1.5">
                  <Activity size={11} className="text-[#a68a5d] animate-pulse" />
                  {activeHotspot === 1 ? 'DETECTION: UPPER CODES' : activeHotspot === 2 ? 'DETECTION: ECO TREADS' : 'ECOLOGICAL ATELIER STATUS'}
                </p>
                <p className="text-[11px] font-sans text-[#938274] leading-relaxed font-light transition-all duration-300">
                  {activeHotspot === 1 
                    ? 'Sistem merajut nilon balistik 1200D bekas militer lokal, memberikan struktur luar tahan gesek ekstrem dan kedap air alami.'
                    : activeHotspot === 2
                    ? 'Campuran karet ban motorsport diurai beku pada suhu -196°C untuk mempertahankan susunan kimia asli ban tanpa zat pengencer kimia sintetis.'
                    : 'Setiap pasang dilaporkan secara terbuka di blockchain sirkular publik kami. Transparansi absolut adalah komitmen mutlak.'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Right Block: Infographics, Counters & High Tech Radial Gauges */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
            <span className="text-[9px] tracking-[0.4em] font-mono font-bold uppercase text-[#a68a5d] mb-3 block flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#a68a5d]"></span>
              ECOLOGICAL IMPACT REPORT
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-light uppercase mb-6 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#e2dfd2] to-[#938274]">
              Sirkularitas Tanpa Retorika.
            </h3>
            <p className="text-xs sm:text-sm text-[#938274] font-sans leading-relaxed max-w-xl mb-12">
              Kebanyakan brand menyembunyikan limbah mereka di balik slogan hijau. Kami mengukur setiap gram karbon, serat, dan karet daur ulang agar Anda tahu persis apa yang Anda pijak.
            </p>

            {/* High Tech Radial Gauges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-14">
              
              {/* Gauge 1: Recycled avg */}
              <div className="flex flex-col items-start border-l border-white/5 pl-4 py-2">
                <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-3 font-semibold">RECYCLED COMPOSITION</span>
                <div className="flex items-center gap-4">
                  {/* Circular progress loop */}
                  <div className="relative w-12 h-12 shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.03)" strokeWidth="3" fill="transparent" />
                      <motion.circle 
                        cx="24" 
                        cy="24" 
                        r="20" 
                        stroke="#a68a5d" 
                        strokeWidth="3" 
                        fill="transparent" 
                        strokeDasharray="125.6"
                        initial={{ strokeDashoffset: 125.6 }}
                        animate={isInView ? { strokeDashoffset: 125.6 - (125.6 * 84.56) / 100 } : {}}
                        transition={{ duration: 1.8, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-[8px] text-[#a68a5d] font-bold">
                      RE
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-0.5 font-mono text-2xl sm:text-3xl font-bold text-[#e2dfd2]">
                      <span>{recycledAvg.toFixed(1)}</span>
                      <span className="text-[#a68a5d] text-base">%</span>
                    </div>
                    <p className="text-[10px] text-[#938274] font-sans mt-0.5">Rata-rata daur ulang.</p>
                  </div>
                </div>
              </div>

              {/* Gauge 2: Carbon Footprint saved */}
              <div className="flex flex-col items-start border-l border-white/5 pl-4 py-2">
                <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-3 font-semibold">CARBON METRIC / PAIR</span>
                <div className="flex items-center gap-4">
                  {/* Circular progress loop */}
                  <div className="relative w-12 h-12 shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.03)" strokeWidth="3" fill="transparent" />
                      <motion.circle 
                        cx="24" 
                        cy="24" 
                        r="20" 
                        stroke="#4a5d4e" 
                        strokeWidth="3" 
                        fill="transparent" 
                        strokeDasharray="125.6"
                        initial={{ strokeDashoffset: 125.6 }}
                        animate={isInView ? { strokeDashoffset: 125.6 - (125.6 * 72) / 100 } : {}}
                        transition={{ duration: 1.8, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-[8px] text-[#4a5d4e] font-bold">
                      CO₂
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-0.5 font-mono text-2xl sm:text-3xl font-bold text-[#e2dfd2]">
                      <span>{carbonSaved.toFixed(2)}</span>
                      <span className="text-[#4a5d4e] text-[10px] font-semibold">KG</span>
                    </div>
                    <p className="text-[10px] text-[#938274] font-sans mt-0.5">Standar industri 14.2kg.</p>
                  </div>
                </div>
              </div>

              {/* Gauge 3: Ocean Plastic Recovered */}
              <div className="flex flex-col items-start border-l border-white/5 pl-4 py-2">
                <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-3 font-semibold">PLASTIC RECOVERED</span>
                <div className="flex items-center gap-4">
                  {/* Circular progress loop */}
                  <div className="relative w-12 h-12 shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.03)" strokeWidth="3" fill="transparent" />
                      <motion.circle 
                        cx="24" 
                        cy="24" 
                        r="20" 
                        stroke="#e2dfd2" 
                        strokeWidth="3" 
                        fill="transparent" 
                        strokeDasharray="125.6"
                        initial={{ strokeDashoffset: 125.6 }}
                        animate={isInView ? { strokeDashoffset: 125.6 - (125.6 * 95) / 100 } : {}}
                        transition={{ duration: 1.8, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-[8px] text-[#e2dfd2] font-bold">
                      NET
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-0.5 font-mono text-2xl sm:text-3xl font-bold text-[#e2dfd2]">
                      <span>{oceanPlastic.toFixed(1)}</span>
                      <span className="text-zinc-500 text-[9px] font-semibold">OZ</span>
                    </div>
                    <p className="text-[10px] text-[#938274] font-sans mt-0.5">Dari laut Nusa Penida.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Custom Interactive Liquid Progress Bars */}
            <div className="space-y-6">
              
              {/* Progress 1 */}
              <div>
                <div className="flex justify-between items-end mb-2 font-mono text-[9px] tracking-wider text-[#938274]">
                  <span className="uppercase font-bold">RECYCLED MOTORSPORT TREAD SOLES</span>
                  <span className="text-[#a68a5d] font-bold">92.4% // STABLE</span>
                </div>
                <div className="h-[4px] bg-[#121418] rounded-none overflow-hidden w-full relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '92.4%' } : {}}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-0 left-0 h-full bg-[#a68a5d]"
                  />
                </div>
              </div>

              {/* Progress 2 */}
              <div>
                <div className="flex justify-between items-end mb-2 font-mono text-[9px] tracking-wider text-[#938274]">
                  <span className="uppercase font-bold">ORGANIC LINEN & SEAWEED FIBERS</span>
                  <span className="text-[#4a5d4e] font-bold">86.2% // ORGANIC_RAW</span>
                </div>
                <div className="h-[4px] bg-[#121418] rounded-none overflow-hidden w-full relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '86.2%' } : {}}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                    className="absolute top-0 left-0 h-full bg-[#4a5d4e]"
                  />
                </div>
              </div>

              {/* Progress 3 */}
              <div>
                <div className="flex justify-between items-end mb-2 font-mono text-[9px] tracking-wider text-[#938274]">
                  <span className="uppercase font-bold">NATURAL PLANT VEG-TANNING PROCESS</span>
                  <span className="text-[#e2dfd2] font-bold">100% TOXIN-FREE // APEX_GRADE</span>
                </div>
                <div className="h-[4px] bg-[#121418] rounded-none overflow-hidden w-full relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '100%' } : {}}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    className="absolute top-0 left-0 h-full bg-[#e2dfd2]"
                  />
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
