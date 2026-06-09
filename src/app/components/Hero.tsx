import { useState } from 'react';
import { Sparkles, ArrowRight, Flame, Phone, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { Link } from 'react-router';

export function Hero() {
  const [copiedText, setCopiedText] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('info@schoolexpert.in');
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-transparent pt-28 pb-16">
      {/* Decorative Background Gradients */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 lg:px-16 z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Hero Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-8 text-left"
          >
            {/* Top Tag/Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              Founding Partners Program Now Live
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-slate-900 font-extrabold tracking-tight">
                Find the right school with{' '}
                <span className="text-primary block sm:inline">
                  proof, not guesswork
                </span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl font-medium">
                SchoolExpert brings verified reviews, quantified infrastructure scores, and live consultation support so families can compare institutions with clarity.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/get-started">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-lg px-8 py-6 text-base font-bold rounded-2xl group transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 cursor-pointer">
                  Get Verified Access
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/schools">
                <Button size="lg" variant="outline" className="border-2 border-slate-300 hover:border-slate-900 hover:bg-slate-50 px-8 py-6 text-base font-bold rounded-2xl transition-all duration-300 active:scale-95 cursor-pointer">
                  Browse Directory
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Interactive Founding Partners Poster & Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            {/* Card Wrapper */}
            <div className="relative bg-[#FAF6F0]/70 border border-slate-200/60 rounded-[2.5rem] p-6 md:p-8 shadow-2xl backdrop-blur-md overflow-hidden max-w-lg mx-auto lg:mr-0 w-full">
              
              {/* Subtle Flame Badge */}
              <div className="absolute top-0 right-0 bg-amber-500/10 border-b border-l border-amber-500/20 text-amber-800 font-bold text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-bl-xl flex items-center gap-1 z-20">
                <Flame className="w-3 h-3 text-amber-600 fill-amber-600/30 animate-pulse" />
                Limited Slots
              </div>

              {/* Digital Founding Partner VIP Pass (Minimalist Design) */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-amber-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-900 p-5 text-white h-[260px] flex flex-col justify-between group transition-all duration-300 hover:shadow-2xl hover:border-amber-500/40">
                {/* Subtle Background Glow */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-500" />
                <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-primary/10 rounded-full blur-3xl" />
                
                {/* Top Section: Logo & Badge */}
                <div className="flex justify-between items-start z-10">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-[10px] font-bold tracking-[0.2em] text-amber-400 uppercase">
                        The School Expert
                      </span>
                    </div>
                    <div className="text-[9px] text-slate-400 tracking-wider">FOUNDING PARTNER</div>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider">
                    VIP Pass
                  </div>
                </div>

                {/* Middle Section: Hologram & Pass Title */}
                <div className="my-auto py-2 z-10 space-y-3">
                  <div className="relative">
                    <h3 className="text-lg font-bold tracking-tight text-slate-100 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                      FOUNDING PARTNERSHIP
                    </h3>
                    <p className="text-[9px] text-slate-400 font-medium tracking-wide">
                      Exclusive Institutional Access & Lifetime Benefits
                    </p>
                  </div>
                  
                  {/* Holographic Chip Mockup */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-6 rounded bg-gradient-to-br from-amber-400/80 to-amber-600/40 relative overflow-hidden border border-amber-300/30 flex items-center justify-center">
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(255,255,255,0.15)_50%)] bg-[length:4px_100%]" />
                      <div className="w-5 h-3.5 border border-amber-200/20 rounded-sm" />
                    </div>
                    <div className="font-mono text-[10px] text-amber-500/95 font-bold tracking-widest">
                      SE-FP-0042
                    </div>
                  </div>
                </div>

                {/* Bottom Section: Privileges & Barcode */}
                <div className="border-t border-slate-800/80 pt-3 flex justify-between items-end z-10">
                  <div className="space-y-1">
                    <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block">Privileges</span>
                    <div className="flex gap-1.5">
                      <span className="text-[8px] bg-slate-800 border border-slate-700/50 text-slate-300 px-1.5 py-0.5 rounded font-medium">
                        Lifetime Status
                      </span>
                      <span className="text-[8px] bg-slate-800 border border-slate-700/50 text-slate-300 px-1.5 py-0.5 rounded font-medium">
                        Locked Pricing
                      </span>
                    </div>
                  </div>
                  
                  {/* CSS Barcode */}
                  <div className="flex gap-[1.5px] h-6 items-end opacity-30 group-hover:opacity-50 transition-opacity">
                    <div className="w-[1px] h-full bg-slate-400" />
                    <div className="w-[2px] h-full bg-slate-400" />
                    <div className="w-[1px] h-3/4 bg-slate-400" />
                    <div className="w-[3px] h-full bg-slate-400" />
                    <div className="w-[1px] h-1/2 bg-slate-400" />
                    <div className="w-[2px] h-full bg-slate-400" />
                    <div className="w-[1px] h-full bg-slate-400" />
                    <div className="w-[3px] h-2/3 bg-slate-400" />
                    <div className="w-[1px] h-full bg-slate-400" />
                  </div>
                </div>
              </div>

              {/* Interactive Contact & Actions under the Image */}
              <div className="mt-6 space-y-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                    Be a Pioneer. Build the Future.
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed">
                    Join India's exclusive network of education innovators, EdTechs, and consultants.
                  </p>
                </div>

                {/* Contact Card Details */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {/* Email Copy Card */}
                  <div className="bg-white/80 border border-slate-200/50 rounded-xl p-3 flex flex-col justify-between gap-1 shadow-sm transition-all hover:shadow-md">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Email Us</span>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <a href="mailto:info@schoolexpert.in" className="text-xs font-bold text-amber-700 hover:underline truncate">
                        info@schoolexpert.in
                      </a>
                      <button 
                        onClick={copyEmail}
                        className="p-1 rounded-md hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700 cursor-pointer"
                        title="Copy Email"
                      >
                        {copiedText ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Phone Call Card */}
                  <div className="bg-white/80 border border-slate-200/50 rounded-xl p-3 flex flex-col justify-between gap-1 shadow-sm transition-all hover:shadow-md">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Call Directly</span>
                    <a href="tel:9515112405" className="text-xs font-bold text-slate-800 hover:underline flex items-center gap-1.5 mt-1">
                      <Phone className="w-3.5 h-3.5 text-amber-600" />
                      <span>9515112405</span>
                    </a>
                  </div>
                </div>

                {/* Direct Action Link */}
                <a 
                  href="mailto:info@schoolexpert.in?subject=Founding%20Partners%20Program%20Interest"
                  className="block w-full"
                >
                  <Button className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer">
                    Apply Via Email
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
