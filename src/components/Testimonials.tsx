import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data';
import { Quote, User, Award, ShieldCheck } from 'lucide-react';

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const getArchetypeColor = (archetype: string) => {
    switch (archetype) {
      case 'Street Artist':
        return 'text-[#e2dfd2] bg-white/[0.03] border-white/10';
      case 'Sustainability Advocate':
        return 'text-[#4a5d4e] bg-[#4a5d4e]/[0.05] border-[#4a5d4e]/20';
      case 'Creative Director':
        return 'text-[#a68a5d] bg-[#a68a5d]/[0.04] border-[#a68a5d]/20';
      default:
        return 'text-[#938274] bg-[#0c0d10] border-white/5';
    }
  };

  return (
    <section 
      id="testimonials-section"
      className="py-28 sm:py-36 bg-[#0c0d10] text-[#e2dfd2] border-t border-white/5 relative overflow-hidden"
    >
      {/* Background visual detail */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#a68a5d]/[0.015] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#4a5d4e]/[0.012] rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 sm:mb-24">
          <span className="text-[9px] tracking-[0.4em] font-mono font-bold uppercase text-[#a68a5d] block mb-3 flex justify-center items-center gap-2">
            <span className="w-8 h-[1px] bg-[#a68a5d]"></span>
            COMMUNITY MANIFESTO
            <span className="w-8 h-[1px] bg-[#a68a5d]"></span>
          </span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-light uppercase leading-tight">
            Diuji Oleh Pionir.
          </h3>
          <p className="text-xs sm:text-sm text-[#938274] font-sans mt-4 leading-relaxed">
            Dari dinding beton Jakarta hingga studio kreatif terselubung, mereka yang membentuk masa depan memilih untuk berpijak di atas PatuhCioks.
          </p>
        </div>

        {/* Testimonials Grid Layout with 3D Spring interactive hover wrappers */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard 
              key={testimonial.id}
              testimonial={testimonial}
              getArchetypeColor={getArchetypeColor}
              itemVariants={itemVariants}
            />
          ))}
        </motion.div>

        {/* Bottom stats callout line */}
        <div className="mt-20 sm:mt-28 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-4 font-mono text-[9px] text-[#938274] uppercase tracking-widest">
          <span>COMPILED ON-CAMPUS ATELIER // JAKARTA // INDONESIA</span>
          <span className="flex items-center gap-2 text-[#a68a5d] font-bold">
            <ShieldCheck size={11} /> REPRESENTING THE NEW STREET WAVE
          </span>
        </div>

      </div>
    </section>
  );
}

/* Isolated interactive card to enable smooth spring tilt effects without general triggers */
function TestimonialCard({ 
  testimonial, 
  getArchetypeColor, 
  itemVariants 
}: { 
  testimonial: typeof TESTIMONIALS[0];
  getArchetypeColor: (arch: string) => string;
  itemVariants: any;
  key?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={isHovered ? { y: -8, scale: 1.01 } : { y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      className="flex flex-col justify-between p-7 sm:p-9 rounded-none bg-[#0a0b0e] border border-white/5 relative group shadow-2xl transition-all duration-300 hover:border-[#a68a5d]/30"
    >
      {/* Subtle radial glow inside card on hover */}
      <div className={`absolute inset-0 bg-radial-gradient from-[#a68a5d]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      {/* Quote Icon overlay */}
      <div className="absolute top-6 right-6 text-[#a68a5d]/10 group-hover:text-[#a68a5d]/20 transition-colors duration-300">
        <Quote size={28} />
      </div>

      <div className="relative z-10">
        {/* Archetype Label */}
        <span className={`inline-block px-3 py-1 rounded-none text-[9px] font-mono font-bold tracking-widest uppercase border mb-6 transition-colors duration-300 ${getArchetypeColor(testimonial.archetype)}`}>
          {testimonial.archetype}
        </span>

        {/* Testimonial Quote */}
        <blockquote className="text-sm text-[#938274] font-sans leading-relaxed mb-8 italic group-hover:text-[#e2dfd2] transition-colors duration-300">
          "{testimonial.quote}"
        </blockquote>
      </div>

      {/* Footer User Info */}
      <div className="flex items-center gap-4 pt-5 border-t border-white/5 mt-auto relative z-10">
        {/* Styled Monogram Avatar representing premium minimal design */}
        <div className="w-11 h-11 rounded-none bg-[#0c0d10] border border-white/5 flex items-center justify-center font-mono text-xs font-bold text-[#938274] group-hover:border-[#a68a5d]/40 group-hover:text-[#a68a5d] transition-all duration-300">
          {testimonial.name.split(' ').map(n => n[0]).join('')}
        </div>

        <div>
          <h5 className="text-xs font-sans font-medium text-[#e2dfd2] group-hover:text-[#a68a5d] transition-colors duration-300">
            {testimonial.name}
          </h5>
          <p className="text-[10px] font-mono text-[#938274] uppercase mt-0.5 tracking-wider">
            {testimonial.role}
          </p>
        </div>
      </div>

      {/* Corner visual brackets that glow slightly on hover */}
      <div className="absolute top-0 left-0 w-2.5 h-[1px] bg-[#a68a5d] opacity-0 group-hover:opacity-60 transition-opacity" />
      <div className="absolute top-0 left-0 w-[1px] h-2.5 bg-[#a68a5d] opacity-0 group-hover:opacity-60 transition-opacity" />
    </motion.div>
  );
}
