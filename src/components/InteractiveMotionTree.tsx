import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { HelpCircle, Layers, Cpu, Compass, RefreshCw, Activity, Layers3, CheckSquare } from 'lucide-react';

interface TreeNode {
  id: string;
  label: string;
  type: 'source' | 'process' | 'product';
  pillar: 'street' | 'luxury' | 'earth' | 'universal';
  shortDesc: string;
  detailedCopy: string;
  x: number; // percentage coordinate
  y: number; // percentage coordinate
  stats?: { label: string; value: string }[];
}

const TREE_NODES: TreeNode[] = [
  // Level 1: Raw Sources (Left)
  {
    id: 'tire-scrap',
    label: 'Motorsport Tire Scrap',
    type: 'source',
    pillar: 'street',
    shortDesc: 'Karet ban balap bekas dari sirkuit lokal.',
    detailedCopy: 'Bukan sekadar karet daur ulang biasa. Kami mengumpulkan ban luar bekas mobil balap dari sirkuit Sentul yang telah kehilangan daya cengkeram kompetitifnya. Karet kompon keras ini dihancurkan secara mekanis tanpa bahan kimia tambahan untuk mempertahankan kepadatan vulkanisir aslinya, memberikan ketahanan gesekan ekstrem di atas aspal jalanan.',
    x: 12,
    y: 20,
    stats: [
      { label: 'Ketahanan Gesek', value: 'Kelas Industri' },
      { label: 'Suhu Vulkanisasi', value: '180°C Alami' },
      { label: 'Penghematan Emisi', value: '74% vs Karet Baru' }
    ]
  },
  {
    id: 'ballistic-nylon',
    label: 'Discarded Ballistic Nylon',
    type: 'source',
    pillar: 'street',
    shortDesc: 'Limbah anyaman militer berkekuatan tinggi.',
    detailedCopy: 'Serat nilon balistik tebal sisa produksi perlengkapan outdoor dan taktis militer. Alih-alih membiarkannya menumpuk di tempat pembuangan akhir, benang nilon ini kami urai kembali dan tenun ulang menjadi struktur jaring luar sepatu yang tahan robek tajam, tahan air, namun tetap memberikan sirkulasi udara yang optimal.',
    x: 12,
    y: 40,
    stats: [
      { label: 'Kekuatan Tarik', value: '1200 Denier' },
      { label: 'Tahan Air', value: 'Uji Lab DWR' },
      { label: 'Komposisi Daur Ulang', value: '100% Limbah Industri' }
    ]
  },
  {
    id: 'seaweed-mesh',
    label: 'Marine Kelp Fibers',
    type: 'source',
    pillar: 'earth',
    shortDesc: 'Serat organik rumput laut pesisir.',
    detailedCopy: 'Diambil dari budidaya rumput laut berkelanjutan di perairan tropis Nusa Penida. Serat selulosa rumput laut diekstraksi secara biologis dan dipintal bersama katun organik tanpa zat pemutih kimia. Menghasilkan rajutan bernapas ultra-ringan yang ramah kulit sensitif dan sepenuhnya dapat terurai secara alami.',
    x: 12,
    y: 60,
    stats: [
      { label: 'Kecepatan Degradasi', value: '180 Hari di Tanah' },
      { label: 'Sifat Antibakteri', value: '99.8% Alami' },
      { label: 'Sumber Energi', value: 'Fotosintesis Pesisir' }
    ]
  },
  {
    id: 'bark-tannins',
    label: 'Natural Plant Tannins',
    type: 'source',
    pillar: 'luxury',
    shortDesc: 'Ekstrak kulit kayu samak alami bebas racun.',
    detailedCopy: 'Proses penyamakan kulit tradisional menggunakan ekstrak alami dari kulit kayu Mimosa dan Chestnut. Bebas dari logam berat kromium beracun yang biasa mencemari sungai. Kulit sapi lokal sisa industri pangan disamak perlahan selama 40 hari, menghasilkan tekstur kaku yang anggun, beraroma kayu alami, dan akan menua secara artistik (patina) bersama pemakainya.',
    x: 12,
    y: 80,
    stats: [
      { label: 'Bahan Kimia Kromium', value: '0% (Mutlak)' },
      { label: 'Waktu Proses', value: '40 Hari Tradisional' },
      { label: 'Sertifikasi Tanaman', value: 'Hutan Berkelanjutan FSC' }
    ]
  },

  // Level 2: Synthesis Processes (Middle)
  {
    id: 'cryo-grinding',
    label: 'Cryo-Mechanical Shredding',
    type: 'process',
    pillar: 'universal',
    shortDesc: 'Penggilingan suhu beku pembentuk partikel mikro.',
    detailedCopy: 'Proses pemecahan karet ban balap menggunakan nitrogen cair pada suhu -196°C. Dalam keadaan sangat beku, karet menjadi rapuh seperti kaca, sehingga dapat digiling menjadi bubuk mikro yang sangat halus. Partikel mikro inilah yang kemudian dicampur dengan pengikat berbasis nabati untuk dicetak kembali menjadi sol luar sepatu yang lentur namun abadi.',
    x: 50,
    y: 30,
    stats: [
      { label: 'Suhu Penggilingan', value: '-196°C Nitrogen Cair' },
      { label: 'Konsumsi Energi', value: 'Sirkuit Tertutup' },
      { label: 'Konsistensi Sol', value: 'Kepadatan Tinggi' }
    ]
  },
  {
    id: 'organic-spinning',
    label: 'Bio-Polymer Synthesis',
    type: 'process',
    pillar: 'universal',
    shortDesc: 'Peleburan polimer organik hibrida kekuatan tinggi.',
    detailedCopy: 'Penyatuan serat selulosa rumput laut pesisir dan nilon taktis daur ulang ke dalam ekstruder suhu stabil. Menghasilkan senyawa jaring hibrida baru (Bio-Knit) yang tahan tarikan keras, lembut bersentuhan dengan kulit, sekaligus memberikan ventilasi silang internal yang luar biasa.',
    x: 50,
    y: 50,
    stats: [
      { label: 'Kapasitas Ekstrusi', value: '380 Meter/Jam' },
      { label: 'Suhu Peleburan', value: '142°C Terkendali' },
      { label: 'Struktur Benang', value: 'Hibrida Bio-Sintetis' }
    ]
  },
  {
    id: 'vegetable-curing',
    label: 'Artisan Veg-Tan Curing',
    type: 'process',
    pillar: 'universal',
    shortDesc: 'Pematangan kulit lokal secara organik di atelier.',
    detailedCopy: 'Proses pematangan kulit lokal menggunakan tanin nabati kayu alami di dalam tangki sirkulasi berventilasi. Kulit diangin-anginkan secara bertahap pada tingkat kelembapan terkontrol untuk mencegah jamur secara alami tanpa senyawa sintetis merusak, menghasilkan rupa earthy berkelas butik.',
    x: 50,
    y: 70,
    stats: [
      { label: 'Tingkat Kelembapan', value: '45% Konstan' },
      { label: 'Penyusutan Kulit', value: 'Kurang Dari 1.5%' },
      { label: 'Aroma Alami', value: 'Mimosa & Cedar' }
    ]
  },

  // Level 3: Products (Right)
  {
    id: 're-street',
    label: 'RE-STREET (Phantom)',
    type: 'product',
    pillar: 'street',
    shortDesc: 'Siluet jalanan asimetris, tahan gesekan liar.',
    detailedCopy: 'Model avant-garde asimetris yang memadukan jaring nilon balistik militer dan sol ban balap vulkanisasi beku. Didesain untuk menghadapi aspal jalanan kota Jakarta, gesekan skateboard, dan pergerakan taktis yang agresif.',
    x: 88,
    y: 30,
    stats: [
      { label: 'Target Pengguna', value: 'Kultur Urban & Skaters' },
      { label: 'Bobot Pasang', value: '340 Gram' },
      { label: 'Daur Ulang Ban', value: '1.2 Ban Bekas / Pasang' }
    ]
  },
  {
    id: 're-luxury',
    label: 'RE-LUXURY (Desert Clay)',
    type: 'product',
    pillar: 'luxury',
    shortDesc: 'Keanggunan minimalis kulit samak organik hand-tailored.',
    detailedCopy: 'Siluet low-profile mewah yang menampilkan detail panel kulit sapi lokal penyamakan Mimosa alami. Setiap panel dipotong secara presisi dan dijahit manual dengan benang linen organik berkekuatan tinggi di atelier kami.',
    x: 88,
    y: 50,
    stats: [
      { label: 'Target Pengguna', value: 'Kreator Seni & Direktur' },
      { label: 'Waktu Jahit', value: '4.5 Jam / Pasang' },
      { label: 'Patina Gradation', value: 'Emas Tembaga Alami' }
    ]
  },
  {
    id: 're-earth',
    label: 'RE-EARTH (Moss)',
    type: 'product',
    pillar: 'earth',
    shortDesc: 'Siluet slip-on super-bernapas dari rumput laut.',
    detailedCopy: 'Model ramah lingkungan revolusioner yang dirancang dengan serat rajutan rumput laut selulosa utuh. Sepenuhnya biodegradable pada akhir siklus pakainya, memberikan kenyamanan ultra-ringan bersirkulasi maksimal.',
    x: 88,
    y: 70,
    stats: [
      { label: 'Target Pengguna', value: 'Eco-Activists & Minimalists' },
      { label: 'Degradasi Sol', value: '100% Organik Kompos' },
      { label: 'Sirkulasi Udara', value: 'Nilai Maksimum Lab' }
    ]
  }
];

interface Connection {
  from: string;
  to: string;
}

const TREE_CONNECTIONS: Connection[] = [
  // Level 1 to Level 2
  { from: 'tire-scrap', to: 'cryo-grinding' },
  { from: 'ballistic-nylon', to: 'organic-spinning' },
  { from: 'seaweed-mesh', to: 'organic-spinning' },
  { from: 'bark-tannins', to: 'vegetable-curing' },
  
  // Level 2 to Level 3
  { from: 'cryo-grinding', to: 're-street' },
  { from: 'organic-spinning', to: 're-street' },
  { from: 'organic-spinning', to: 're-earth' },
  { from: 'vegetable-curing', to: 're-luxury' }
];

export default function InteractiveMotionTree() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('tire-scrap');
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax elements with useScroll & useTransform
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const activeNode = TREE_NODES.find(n => n.id === selectedNodeId) || TREE_NODES[0];

  const getPillarAccent = (pillar: TreeNode['pillar']) => {
    switch (pillar) {
      case 'street':
        return { 
          color: '#e2dfd2', 
          border: 'border-zinc-300', 
          text: 'text-zinc-100', 
          glow: 'shadow-[0_0_20px_rgba(226,223,210,0.3)]' 
        };
      case 'luxury':
        return { 
          color: '#a68a5d', 
          border: 'border-[#a68a5d]', 
          text: 'text-[#a68a5d]', 
          glow: 'shadow-[0_0_25px_rgba(166,138,93,0.35)]' 
        };
      case 'earth':
        return { 
          color: '#4a5d4e', 
          border: 'border-[#4a5d4e]', 
          text: 'text-[#4a5d4e]', 
          glow: 'shadow-[0_0_20px_rgba(74,93,78,0.3)]' 
        };
      default:
        return { 
          color: '#a68a5d', 
          border: 'border-[#a68a5d]/50', 
          text: 'text-[#a68a5d]', 
          glow: 'shadow-[0_0_20px_rgba(166,138,93,0.2)]' 
        };
    }
  };

  const activeNodeAccent = getPillarAccent(activeNode.pillar);

  return (
    <section 
      ref={sectionRef}
      id="motion-tree-section"
      className="relative py-28 sm:py-40 bg-[#0c0d10] text-[#e2dfd2] border-t border-white/5 overflow-hidden"
    >
      {/* 1. Coordinate grid background with slow parallax translation */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-[0.06] pointer-events-none select-none z-0"
      >
        <div className="w-full h-full bg-[linear-gradient(rgba(166,138,93,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(166,138,93,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0c0d10_90%)]" />
      </motion.div>

      {/* Subtle light vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(166,138,93,0.015)_0%,transparent_100%)] z-0" />

      {/* Floating technical coordinates markers */}
      <div className="absolute top-8 left-8 font-mono text-[8px] text-[#938274]/40 uppercase tracking-widest hidden md:block select-none pointer-events-none">
        MATRIX_SYS_RENDER: ACTIVE_TREE_GRAPH v2.100 // FLOW: ACTIVE // LATENCY: 0.05ms
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <span className="text-[9px] tracking-[0.4em] font-mono font-bold uppercase text-[#a68a5d] block mb-3 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-[#a68a5d]"></span>
            CIRCULAR SUPPLY-CHAIN SYSTEM
          </span>
          <h3 className="text-3xl sm:text-5xl font-display font-light uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#e2dfd2] via-[#e2dfd2] to-[#938274]">
            Pohon Sirkularitas Material
          </h3>
          <p className="text-xs sm:text-sm text-[#938274] font-sans mt-4 leading-relaxed max-w-xl">
            Dari limbah mentah perkotaan hingga sepasang siluet presisi di kaki Anda. Telusuri bagaimana material kasar kami disatukan melalui diagram alur interaktif di bawah ini.
          </p>
        </div>

        {/* Core Interactive Workspace Grid */}
        <motion.div 
          style={{ y: contentY }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch"
        >
          
          {/* Left/Middle Column: The Motion Graphic SVG Connection Tree (lg:col-span-8) */}
          <div className="lg:col-span-8 relative min-h-[480px] sm:min-h-[580px] bg-[#0a0b0e] border border-white/5 p-6 flex items-center justify-center overflow-hidden">
            
            {/* Visual technical markings */}
            <div className="absolute top-4 left-4 flex gap-1.5 items-center font-mono text-[8px] text-[#938274]/50 z-25">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a68a5d] animate-pulse"></span>
              LIVE CONNECTIVITY SCHEMATIC
            </div>
            
            <div className="absolute bottom-4 right-4 font-mono text-[8px] text-[#938274]/40 z-25">
              SCALE: AUTO-FIT_GRID // FLUX: TRUE
            </div>

            {/* SVG Link lines between nodes */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              {TREE_CONNECTIONS.map((conn, index) => {
                const fromNode = TREE_NODES.find(n => n.id === conn.from);
                const toNode = TREE_NODES.find(n => n.id === conn.to);
                
                if (!fromNode || !toNode) return null;

                // Absolute positions based on percentages
                const x1 = `${fromNode.x}%`;
                const y1 = `${fromNode.y}%`;
                const x2 = `${toNode.x}%`;
                const y2 = `${toNode.y}%`;

                // Determine connection active styling (if either endpoint is selected)
                const isConnectionActive = selectedNodeId === conn.from || selectedNodeId === conn.to;
                const connectionPillar = fromNode.pillar !== 'universal' ? fromNode.pillar : toNode.pillar;
                const pillarColor = getPillarAccent(connectionPillar).color;

                return (
                  <g key={index}>
                    {/* Background faint guide path */}
                    <line 
                      x1={x1} 
                      y1={y1} 
                      x2={x2} 
                      y2={y2} 
                      stroke="rgba(255,255,255,0.03)" 
                      strokeWidth="1.5" 
                    />
                    
                    {/* Continuous baseline energy dash flow representing material flux */}
                    <motion.line 
                      x1={x1} 
                      y1={y1} 
                      x2={x2} 
                      y2={y2} 
                      stroke={pillarColor} 
                      strokeWidth={isConnectionActive ? "2" : "0.8"} 
                      strokeOpacity={isConnectionActive ? "0.75" : "0.25"}
                      strokeDasharray="4, 12"
                      animate={{
                        strokeDashoffset: [-64, 0]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: isConnectionActive ? 1.2 : 4,
                        ease: "linear"
                      }}
                    />

                    {/* Highly aesthetic electrical impulse glowing dots traveling along active connections */}
                    {isConnectionActive && (
                      <>
                        <motion.circle 
                          r="3"
                          fill={pillarColor}
                          animate={{ 
                            cx: [x1, x2],
                            cy: [y1, y2]
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.8,
                            ease: "easeInOut"
                          }}
                        />
                        <motion.circle 
                          r="1.5"
                          fill="#ffffff"
                          animate={{ 
                            cx: [x1, x2],
                            cy: [y1, y2]
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.8,
                            ease: "easeInOut",
                            delay: 0.1
                          }}
                        />
                      </>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Tree Nodes Container overlay */}
            <div className="absolute inset-0 z-20">
              {TREE_NODES.map((node) => {
                const isSelected = selectedNodeId === node.id;
                const nodeAccent = getPillarAccent(node.pillar);
                
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    style={{ 
                      left: `${node.x}%`, 
                      top: `${node.y}%`,
                      transform: 'translate(-50%, -50%)',
                      willChange: 'transform'
                    }}
                    className="absolute group focus:outline-none cursor-pointer"
                    aria-label={`Interact with node: ${node.label}`}
                  >
                    {/* Rotating external HUD target ring around the active node bubble */}
                    <div className={`absolute -inset-2.5 sm:-inset-3 rounded-full border border-dashed transition-all duration-500 animate-spin ${
                      isSelected 
                        ? 'border-[#a68a5d]/40 opacity-100 scale-100' 
                        : 'border-white/[0.03] opacity-35 group-hover:border-white/20 group-hover:scale-95'
                    }`} style={{ animationDuration: isSelected ? '12s' : '25s' }} />

                    {/* Ripple ring on select */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.span 
                          layoutId="node-ripple-ring"
                          initial={{ opacity: 0.8, scale: 0.5 }}
                          animate={{ opacity: 0, scale: 2.2 }}
                          exit={{ opacity: 0 }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                          className={`absolute inset-[-10px] rounded-full border border-white/20 pointer-events-none ${
                            node.pillar === 'luxury' ? 'border-[#a68a5d]/35' : node.pillar === 'earth' ? 'border-[#4a5d4e]/35' : 'border-white/15'
                          }`}
                        />
                      )}
                    </AnimatePresence>

                    {/* Node Core Bubble */}
                    <div className={`relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full border transition-all duration-300 bg-[#0c0d10] ${
                      isSelected 
                        ? `${nodeAccent.border} ${nodeAccent.glow} scale-110` 
                        : 'border-white/5 hover:border-white/20'
                    }`}>
                      
                      {/* Decorative inner symbol representation based on node type */}
                      <span className={`font-mono text-[9px] font-bold ${
                        isSelected ? nodeAccent.text : 'text-[#938274]'
                      }`}>
                        {node.type === 'source' && 'IN'}
                        {node.type === 'process' && 'PR'}
                        {node.type === 'product' && 'OUT'}
                      </span>

                      {/* Small node label popup on mouse hover */}
                      <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 whitespace-nowrap text-[8px] font-mono tracking-widest uppercase text-[#938274] bg-[#0c0d10] border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30 shadow-2xl">
                        {node.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Left/Middle/Right Columns Header Labels inside Workspace */}
            <div className="absolute top-10 left-6 sm:left-10 font-mono text-[8px] text-zinc-600 uppercase tracking-widest pointer-events-none font-bold">
              [ 01 // RAW_INPUT_SOURCES ]
            </div>
            <div className="absolute top-10 left-[48%] sm:left-[49%] -translate-x-1/2 font-mono text-[8px] text-zinc-600 uppercase tracking-widest pointer-events-none font-bold">
              [ 02 // ECO_SYNTHESIS ]
            </div>
            <div className="absolute top-10 right-6 sm:right-10 font-mono text-[8px] text-zinc-600 uppercase tracking-widest pointer-events-none font-bold">
              [ 03 // SILHOUETTES ]
            </div>

          </div>

          {/* Right Column: Narrative Detail Display Panel (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-8 bg-[#0a0b0e] border border-white/5 relative overflow-hidden">
            
            {/* Visual detail lines */}
            <div className="absolute top-0 right-0 w-[1px] h-16 bg-gradient-to-b from-[#a68a5d]/30 to-transparent" />
            <div className="absolute top-0 right-0 w-16 h-[1px] bg-gradient-to-l from-[#a68a5d]/30 to-transparent" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 relative"
              >
                {/* Micro branding header */}
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className={`text-[8px] font-mono tracking-[0.25em] uppercase font-bold px-2.5 py-1 border ${activeNodeAccent.text} ${activeNodeAccent.border}`}>
                    {activeNode.pillar} pilar // {activeNode.type}
                  </span>
                  
                  <span className="font-mono text-[9px] text-[#938274] uppercase">
                    Ref #{activeNode.id.toUpperCase().substring(0,6)}
                  </span>
                </div>

                {/* Main Label Title */}
                <div>
                  <div className="flex items-center gap-2 text-[#a68a5d] mb-1.5">
                    <Activity size={12} className="animate-pulse" />
                    <span className="font-mono text-[8px] uppercase tracking-widest text-[#a68a5d] font-bold">TELEMETRY_STREAM</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-display font-light uppercase tracking-tight text-[#e2dfd2]">
                    {activeNode.label}
                  </h4>
                  <p className="text-xs font-mono text-[#938274] uppercase tracking-wider mt-1.5">
                    {activeNode.shortDesc}
                  </p>
                </div>

                {/* Narrative Copy (100% Anti-AI-Slop, extremely raw and precise) */}
                <p className="text-xs sm:text-[13px] text-[#938274] font-sans leading-relaxed">
                  {activeNode.detailedCopy}
                </p>

                {/* Performance Metrics Table */}
                {activeNode.stats && (
                  <div className="pt-5 border-t border-white/5 space-y-3">
                    <span className="text-[8px] font-mono tracking-[0.2em] text-[#a68a5d] uppercase block font-bold flex items-center gap-1.5">
                      <Layers3 size={10} />
                      TECHNICAL LABMETRICS:
                    </span>
                    
                    <div className="space-y-2 font-mono text-[10px]">
                      {activeNode.stats.map((stat, idx) => (
                        <div key={idx} className="flex justify-between py-1.5 border-b border-white/[0.03] text-[#938274]">
                          <span className="uppercase text-zinc-600">{stat.label}:</span>
                          <span className="text-[#e2dfd2] font-semibold">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

            {/* Panel Interactive Guide Hint */}
            <div className="mt-8 pt-6 border-t border-white/5 flex gap-3.5 items-center">
              <div className="w-10 h-10 rounded-full bg-[#0c0d10] border border-white/5 flex items-center justify-center text-[#a68a5d] shrink-0">
                <RefreshCw size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <p className="text-[10px] font-sans text-zinc-600 leading-snug">
                Sistem mendeteksi aktivitas pengguna. Pilih node lingkaran di diagram kiri untuk membedah formula material dan data telemetri.
              </p>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
