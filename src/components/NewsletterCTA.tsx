import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Standard email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError('Masukkan alamat email Anda.');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Format email tidak valid.');
      return;
    }

    setIsSubmitting(true);

    // Simulate server request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
    }, 1200);
  };

  return (
    <section 
      id="newsletter-section"
      className="py-24 sm:py-32 bg-[#0c0d10] text-[#e2dfd2] border-t border-white/5 relative overflow-hidden"
    >
      {/* Background vignette & visual line details */}
      <div className="absolute inset-0 bg-radial-gradient from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl relative z-10 text-center">
        
        {/* Newsletter Box Container */}
        <div className="p-8 sm:p-12 md:p-16 rounded-none border border-white/5 bg-[#0a0b0e] shadow-[0_30px_70px_rgba(0,0,0,0.7)] max-w-3xl mx-auto">
          
          <span className="text-[9px] tracking-[0.4em] font-mono font-bold uppercase text-[#a68a5d] block mb-3 flex justify-center items-center gap-2">
            <span className="w-6 h-[1px] bg-[#a68a5d]"></span>
            JOIN THE MOVEMENT
            <span className="w-6 h-[1px] bg-[#a68a5d]"></span>
          </span>
          <h3 className="text-3xl sm:text-4xl font-display font-light uppercase mb-4 tracking-tight">
            Own the Future.
          </h3>
          <p className="text-xs sm:text-sm text-[#938274] font-sans max-w-md mx-auto mb-10 leading-relaxed">
            Dapatkan informasi rilis koleksi terbatas (drops), pelacakan sirkular bahan, dan akses prioritas ke showroom PatuhCioks.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
            <div className="relative flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                disabled={isSuccess || isSubmitting}
                className="flex-1 px-5 py-3.5 rounded-none border border-white/5 bg-[#0c0d10] text-[#e2dfd2] text-xs sm:text-sm placeholder-zinc-600 focus:outline-none focus:border-[#a68a5d]/50 focus:ring-1 focus:ring-[#a68a5d]/20 font-sans transition-all duration-300 disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={isSuccess || isSubmitting}
                className={`relative px-6 py-3.5 sm:py-0 rounded-none text-[11px] font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 min-w-[140px] cursor-pointer ${
                  isSuccess 
                    ? 'bg-emerald-600 text-[#0c0d10] border-emerald-500' 
                    : 'bg-[#a68a5d] hover:bg-[#c4a675] text-[#0c0d10] hover:scale-[1.02] active:scale-[0.98]'
                }`}
                aria-label={isSuccess ? 'Subscribed successfully' : 'Subscribe to newsletter'}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      key="submitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-4 h-4 rounded-full border-2 border-[#0c0d10] border-t-transparent animate-spin"
                    />
                  ) : isSuccess ? (
                    <motion.span
                      key="success"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center gap-1.5"
                    >
                      <Check size={14} className="stroke-[3]" /> Added
                    </motion.span>
                  ) : (
                    <motion.span
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5"
                    >
                      Subscribe <ArrowRight size={13} className="stroke-[2.5]" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-left text-[11px] font-mono text-rose-500 mt-2 ml-1">
                {error}
              </p>
            )}

            {/* Success micro-message */}
            {isSuccess && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0.8, y: 0 }}
                className="text-center text-[11px] font-mono text-emerald-400 mt-3"
              >
                Selamat bergabung. Manifesto pertama Anda telah dikirimkan.
              </motion.p>
            )}
          </form>

        </div>

        {/* Footer info brand */}
        <div className="mt-24 pt-16 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <h4 className="text-sm font-mono font-bold uppercase tracking-widest text-[#e2dfd2]">
              PATUHCIOKS
            </h4>
            <p className="text-[10px] font-mono text-[#938274] uppercase mt-1">
              © {new Date().getFullYear()} PatuhCioks Footwear. All rights reserved.
            </p>
          </div>

          {/* Social connections or branding lists (Brutalist style) */}
          <div className="flex flex-wrap gap-6 font-mono text-[10px] text-[#938274] uppercase tracking-widest">
            <a href="#hero-cinematic-section" className="hover:text-[#a68a5d] transition-colors">BACK TO APEX</a>
            <span className="text-zinc-800">/</span>
            <a href="#story-section" className="hover:text-[#a68a5d] transition-colors">THE MANIFESTO</a>
            <span className="text-zinc-800">/</span>
            <a href="#collection-showcase-section" className="hover:text-[#a68a5d] transition-colors">THE GALLERY</a>
          </div>
        </div>

      </div>
    </section>
  );
}
