import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FLAGSHIP_SHOES } from '../data';
import { ShoeProduct } from '../types';
import { X, Info, ShieldCheck, Zap, Scale } from 'lucide-react';

export default function CollectionShowcase() {
  const [selectedPillar, setSelectedPillar] = useState<'all' | 'street' | 'luxury' | 'earth'>('all');
  const [selectedShoe, setSelectedShoe] = useState<ShoeProduct | null>(null);

  const filteredShoes = selectedPillar === 'all' 
    ? FLAGSHIP_SHOES 
    : FLAGSHIP_SHOES.filter(shoe => shoe.pilar === selectedPillar);

  const getPillarColorClass = (pilar: 'street' | 'luxury' | 'earth') => {
    switch (pilar) {
      case 'street':
        return 'text-[#e2dfd2] border-white/10 bg-white/[0.03]';
      case 'luxury':
        return 'text-[#a68a5d] border-[#a68a5d]/20 bg-[#a68a5d]/[0.05]';
      case 'earth':
        return 'text-[#4a5d4e] border-[#4a5d4e]/30 bg-[#4a5d4e]/[0.05]';
    }
  };

  return (
    <section 
      id="collection-showcase-section"
      className="py-24 sm:py-36 bg-[#0c0d10] text-[#e2dfd2] border-t border-white/5 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
          <div>
            <span className="text-[9px] tracking-[0.4em] font-mono font-bold uppercase text-[#a68a5d] block mb-3 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#a68a5d]"></span>
              THE SHOWCASE GALLERY
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-light uppercase leading-none">
              Signature Collection
            </h3>
            <p className="text-xs sm:text-sm text-[#938274] max-w-md mt-4 font-sans leading-relaxed">
              Tiga pilar, tiga siluet, satu visi mutlak. Telusuri koleksi premium kami yang dirancang khusus untuk ketahanan tinggi. Klik untuk membedah blueprint material.
            </p>
          </div>

          {/* Filter Pills (Brutalist style) */}
          <div className="flex flex-wrap gap-1 bg-[#0a0b0e] p-1.5 rounded-none border border-white/5 font-mono text-[9px] uppercase tracking-widest">
            {(['all', 'street', 'luxury', 'earth'] as const).map((pillar) => (
              <button
                key={pillar}
                onClick={() => setSelectedPillar(pillar)}
                className={`px-5 py-2.5 rounded-none font-bold transition-all duration-300 cursor-pointer ${
                  selectedPillar === pillar
                    ? 'bg-[#a68a5d] text-[#0c0d10] shadow-[0_5px_15px_rgba(166,138,93,0.25)]'
                    : 'text-[#938274] hover:text-[#e2dfd2]'
                }`}
              >
                {pillar}
              </button>
            ))}
          </div>
        </div>

        {/* Shoes Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredShoes.map((shoe: ShoeProduct) => (
              <ShoeCard 
                key={shoe.id}
                shoe={shoe}
                getPillarColorClass={getPillarColorClass}
                onOpenSpecs={() => setSelectedShoe(shoe)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* 3. Immersive Cinematic Blueprint Detail Modal */}
      <AnimatePresence>
        {selectedShoe && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[#06070a]/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedShoe(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="w-full max-w-5xl bg-[#0c0d10] border border-white/10 rounded-none overflow-hidden relative grid grid-cols-1 lg:grid-cols-12 gap-0 my-auto text-left shadow-[0_40px_90px_rgba(0,0,0,0.9)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Absolutes decorative grid scanlines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(166,138,93,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(166,138,93,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

              {/* Close Button */}
              <button 
                onClick={() => setSelectedShoe(null)}
                className="absolute top-6 right-6 w-10 h-10 border border-white/10 hover:border-white/25 flex items-center justify-center rounded-none text-[#938274] hover:text-[#e2dfd2] transition-colors bg-[#0a0b0e]/90 cursor-pointer z-40"
                aria-label="Close schematic drawer"
              >
                <X size={16} />
              </button>

              {/* Left Column: Visual Blueprint Projection (lg:col-span-7) */}
              <div className="lg:col-span-7 relative h-[300px] sm:h-[450px] lg:h-[600px] border-b lg:border-b-0 lg:border-r border-white/5 bg-[#07080a] flex items-center justify-center overflow-hidden">
                <img 
                  src={selectedShoe.imageUrl} 
                  alt={selectedShoe.name}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] contrast-[1.3] grayscale-[30%] pointer-events-none"
                  referrerPolicy="no-referrer"
                />

                {/* Animated holographic circular compass overlays */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-30">
                  <div className="absolute w-[60%] aspect-square rounded-full border border-[#a68a5d]/10 border-dashed animate-spin" style={{ animationDuration: '40s' }} />
                  <div className="absolute w-[45%] aspect-square rounded-full border border-white/5 flex items-center justify-center">
                    <div className="w-full h-[1px] bg-white/5 absolute" />
                    <div className="h-full w-[1px] bg-white/5 absolute" />
                  </div>
                </div>

                {/* Vertical tech tags */}
                <div className="absolute left-6 top-6 font-mono text-[8px] text-[#938274] tracking-widest uppercase flex flex-col gap-1 z-20">
                  <span>MODEL: {selectedShoe.id.toUpperCase()}</span>
                  <span>ASSEMBLY_UNIT: ATELIER.ID</span>
                </div>

                {/* Corner bracket indicators */}
                <div className="absolute inset-6 border border-white/5 pointer-events-none z-10">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#a68a5d]/30" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#a68a5d]/30" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#a68a5d]/30" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#a68a5d]/30" />
                </div>

                {/* Focal Coordinate Markers on the shoe image */}
                <div className="absolute bottom-1/3 left-1/4 flex items-center gap-2 z-20">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#a68a5d] animate-ping" />
                  <span className="font-mono text-[7px] bg-[#0c0d10] px-1 py-0.5 border border-white/10 uppercase tracking-widest text-[#938274]">
                    FOCAL_POINT #01 [RECYCLED_SOLE]
                  </span>
                </div>

                <div className="absolute top-1/3 right-1/4 flex items-center gap-2 z-20">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4a5d4e] animate-ping" />
                  <span className="font-mono text-[7px] bg-[#0c0d10] px-1 py-0.5 border border-white/10 uppercase tracking-widest text-[#938274]">
                    FOCAL_POINT #02 [ORGANIC_MESH]
                  </span>
                </div>

                {/* Large visual watermarked numbering */}
                <div className="absolute bottom-6 right-6 font-mono text-[50px] font-black text-white/[0.015] leading-none select-none">
                  SPEC_D_0{selectedShoe.id === 're-street' ? '1' : selectedShoe.id === 're-luxury' ? '2' : '3'}
                </div>
              </div>

              {/* Right Column: In-depth Technical Specification Sheets (lg:col-span-5) */}
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between relative z-10 bg-[#0a0b0e]">
                <div>
                  {/* Micro header */}
                  <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
                    <span className={`text-[8px] font-mono tracking-[0.25em] uppercase font-bold px-2.5 py-1 border ${getPillarColorClass(selectedShoe.pilar)}`}>
                      {selectedShoe.pilar} pilar // {selectedShoe.recycledPercent}% Recycled
                    </span>
                    <span className="font-mono text-[9px] text-[#938274]">
                      KG_CO₂ // {selectedShoe.carbonFootprintKg}
                    </span>
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-display font-light uppercase tracking-tight text-[#e2dfd2] mb-1">
                    {selectedShoe.name}
                  </h4>
                  <p className="font-mono text-[10px] text-[#a68a5d] tracking-widest uppercase mb-6">
                    COLORWAY: {selectedShoe.colorway} // {selectedShoe.priceText}
                  </p>

                  <p className="text-xs sm:text-[13px] text-[#938274] font-sans leading-relaxed mb-8">
                    {selectedShoe.personality}
                  </p>

                  {/* Component Materials Specification Table */}
                  <div className="space-y-4 mb-8">
                    <div className="font-mono text-[9px] tracking-widest text-[#938274] uppercase flex items-center gap-2">
                      <Info size={10} className="text-[#a68a5d]" />
                      MATERIALS BREAKDOWN:
                    </div>

                    <ul className="space-y-3 font-sans text-xs">
                      {selectedShoe.materials.map((mat, idx) => (
                        <li key={idx} className="flex justify-between py-2 border-b border-white/[0.03] text-[#938274]">
                          <span className="flex items-center gap-2.5">
                            <span className="text-[#a68a5d]">―</span>
                            {mat.split(' - ')[0] || mat}
                          </span>
                          <span className="font-mono text-[10px] text-[#e2dfd2] uppercase">
                            {mat.split(' - ')[1] || 'ATELIER OK'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Diagnostic specs row */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 font-mono text-[8px] tracking-wider text-[#938274]">
                  <div>
                    <span className="block text-zinc-600 uppercase mb-1 flex items-center gap-1">
                      <ShieldCheck size={9} /> WEAR_INDEX
                    </span>
                    <span className="text-[#e2dfd2] text-xs font-semibold">9.8/10</span>
                  </div>
                  <div>
                    <span className="block text-zinc-600 uppercase mb-1 flex items-center gap-1">
                      <Zap size={9} /> SPRING_COEF
                    </span>
                    <span className="text-[#e2dfd2] text-xs font-semibold">140 N/M</span>
                  </div>
                  <div>
                    <span className="block text-zinc-600 uppercase mb-1 flex items-center gap-1">
                      <Scale size={9} /> WEIGHT_UNIT
                    </span>
                    <span className="text-[#e2dfd2] text-xs font-semibold">320G</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* Individual Card Component to prevent full re-renders on mouse spotlight hover */
function ShoeCard({ 
  shoe, 
  getPillarColorClass, 
  onOpenSpecs 
}: { 
  shoe: ShoeProduct; 
  getPillarColorClass: (pilar: 'street' | 'luxury' | 'earth') => string;
  onOpenSpecs: () => void;
  key?: string;
}) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between bg-[#0a0b0e] border border-white/5 rounded-none overflow-hidden transition-all duration-500 hover:border-[#a68a5d]/30 shadow-[0_15px_40px_rgba(0,0,0,0.55)] cursor-pointer"
      onClick={onOpenSpecs}
    >
      {/* 1. Interactive Spotlight Backlight Overlay */}
      {isHovered && (
        <div 
          style={{
            left: `${coords.x}px`,
            top: `${coords.y}px`,
            transform: 'translate(-50%, -50%)',
            willChange: 'left, top'
          }}
          className="absolute w-[280px] h-[280px] rounded-full bg-[#a68a5d]/[0.05] blur-[70px] pointer-events-none z-0 transition-transform duration-300"
        />
      )}

      {/* 2. Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#07080a] border-b border-white/5 z-10">
        <img
          src={shoe.imageUrl}
          alt={shoe.name}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04] filter brightness-[0.7] contrast-[1.15]"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        
        {/* Subtle grading overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10]/95 via-transparent to-transparent opacity-85 pointer-events-none" />

        {/* Pillar Badges */}
        <div className="absolute top-4 left-4 z-10 flex gap-2 font-mono text-[9px] tracking-widest uppercase font-bold">
          <span className={`px-2.5 py-1 rounded-none border ${getPillarColorClass(shoe.pilar)}`}>
            {shoe.pilar}
          </span>
          <span className="px-2.5 py-1 rounded-none border border-white/5 bg-[#0c0d10]/90 text-[#938274]">
            RECYCLED {shoe.recycledPercent}%
          </span>
        </div>

        {/* Carbon score badge right */}
        <div className="absolute top-4 right-4 z-10 font-mono text-[9px] tracking-widest uppercase font-bold px-2.5 py-1 rounded-none border border-white/5 bg-[#0c0d10]/90 text-[#938274]">
          CO₂ {shoe.carbonFootprintKg} KG
        </div>

        {/* Hover Blueprint Spec Outline Line */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#a68a5d]/80 to-transparent w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
      </div>

      {/* 3. Text Content & Action Footer */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between bg-gradient-to-b from-[#0a0b0e] to-[#0c0d10] relative z-10">
        <div className="mb-6">
          <div className="flex justify-between items-center gap-2 mb-2">
            <h4 className="text-lg sm:text-xl font-display font-light text-[#e2dfd2] tracking-tight group-hover:text-[#a68a5d] transition-colors duration-300">
              {shoe.name}
            </h4>
            <span className="text-xs font-mono font-bold text-[#a68a5d] whitespace-nowrap bg-[#0c0d10] px-2.5 py-1 border border-white/5 rounded-none">
              {shoe.priceText}
            </span>
          </div>

          <p className="text-[10px] font-mono text-[#938274] tracking-wider mb-3.5 uppercase">
            {shoe.colorway}
          </p>

          <p className="text-xs text-[#938274] font-sans leading-relaxed">
            {shoe.personality}
          </p>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-white/5 font-mono text-[9px] tracking-widest uppercase text-[#938274]">
          <span>STREET CREDIBLE / ECO-SENSITIVE</span>
          <span className="text-[#a68a5d] flex items-center gap-1 group-hover:text-white font-bold transition-colors">
            OPEN SPEC
            <span className="text-xs transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </span>
        </div>
      </div>

    </motion.div>
  );
}
