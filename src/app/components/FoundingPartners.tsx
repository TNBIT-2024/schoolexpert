import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  Mail, 
  Phone, 
  Copy, 
  CheckCircle2, 
  Laptop, 
  Database, 
  CheckSquare, 
  GraduationCap, 
  BookOpen, 
  Cpu, 
  Briefcase, 
  Globe, 
  Sparkles, 
  Heart, 
  UserCheck,
  Flame,
  ExternalLink
} from 'lucide-react';
import { Button } from './ui/button';

export function FoundingPartners() {
  const [copiedText, setCopiedText] = useState(false);

  const benefits = [
    'Lifetime Recognition as a Founding Partner of The School Expert™️',
    'Locked-In Partnership Pricing for 3 Years',
    'Featured Placement on Our Official Website',
    'Digital Founding Partner Certificate',
    'Priority Access to School Outreach & Engagement Initiatives',
    'Enhanced Visibility Among Schools, Educators & Decision Makers',
    'Early Access to Collaboration and Partnership Opportunities',
    'Recognition as an Early Supporter of Innovation and Excellence in Education'
  ];

  const applicantTypes = [
    { name: 'EdTech Companies', icon: Laptop },
    { name: 'School ERP Providers', icon: Database },
    { name: 'Assessment & Testing Platforms', icon: CheckSquare },
    { name: 'Teacher Training Organizations', icon: GraduationCap },
    { name: 'Publishers & Content Providers', icon: BookOpen },
    { name: 'STEM, Robotics & AI Companies', icon: Cpu },
    { name: 'School Consultants', icon: Briefcase },
    { name: 'Education Service Providers', icon: Globe },
    { name: 'Skill Development Organizations', icon: Sparkles },
    { name: 'Mental Health & Student Wellness Organizations', icon: Heart },
    { name: 'Individual Education Experts', icon: UserCheck }
  ];

  const copyEmail = () => {
    navigator.clipboard.writeText('info@schoolexpert.in');
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <section id="founding-partners" className="py-24 bg-transparent relative overflow-hidden">
      {/* Visual Background Elements */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Main Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-card border border-slate-200/60 rounded-[2.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden"
        >
          {/* Limited Slot Banner/Header */}
          <div className="absolute top-0 right-0 bg-primary text-white font-bold text-xs uppercase tracking-widest px-6 py-2 rounded-bl-2xl flex items-center gap-1.5 shadow-md">
            <Flame className="w-3.5 h-3.5 fill-white animate-pulse" />
            Limited Slots Only
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Heading & Description & Urgency Badge */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                Now Live
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                Founding Partners <br />
                <span className="text-primary font-black">Program</span>
              </h2>

              <p className="text-slate-600 text-base leading-relaxed font-medium">
                We are inviting visionary organizations, innovators, consultants, and education-focused professionals across India to become part of an exclusive community helping shape the future of school education.
              </p>

              {/* Urgency / Counter Widget */}
              <div className="bg-[#FAF7F2] border border-slate-200/50 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-800">Enrollment Progress</span>
                  <span className="text-xs font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Only 8 slots left!
                  </span>
                </div>
                {/* Custom Minimalist Progress Bar */}
                <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '84%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="h-full bg-primary rounded-full" 
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>42 Partners Enrolled</span>
                  <span>50 Max Slots</span>
                </div>
              </div>

              {/* Callout */}
              <p className="text-xs text-slate-400 font-medium italic">
                *Once all 50 positions are filled, enrollment will be permanently closed.
              </p>
            </div>

            {/* Right Column: Benefits Checklist (Minimalist Tick Design) */}
            <div className="lg:col-span-7 space-y-8 bg-[#FAF7F2]/40 border border-slate-200/40 rounded-3xl p-6 md:p-8">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200/60 pb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                Exclusive Founding Partner Benefits
              </h3>

              <div className="grid sm:grid-cols-1 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="flex items-start gap-3.5 group"
                  >
                    {/* The "Minimiltick" (Minimalist Tick Container) */}
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mt-0.5 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
                      <Check className="w-3.5 h-3.5 text-amber-600 group-hover:text-primary transition-colors stroke-[3]" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 leading-snug group-hover:text-slate-900 transition-colors">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Section: Who Can Join? */}
          <div className="mt-16 pt-12 border-t border-slate-200/60">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Who Can Apply?</h3>
              <p className="text-slate-500 text-xs font-semibold">
                Open to visionary innovators, specialists, and service providers in the education ecosystem
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {applicantTypes.map((app, idx) => {
                const Icon = app.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.03, duration: 0.3 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#FAF7F2] border border-slate-200/50 rounded-xl hover:bg-white hover:border-amber-500/30 hover:shadow-md transition-all duration-200 cursor-default"
                  >
                    <Icon className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span className="text-xs font-bold text-slate-700">{app.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA Footer: Contact Details */}
          <div className="mt-14 p-6 md:p-8 bg-[#151210] rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-2 text-center md:text-left z-10">
              <h4 className="text-lg font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
                Express Your Interest Today
              </h4>
              <p className="text-xs text-slate-400 font-medium max-w-md">
                Get in touch with us to secure your locked-in pricing and lock down one of the remaining 8 Founding Partner slots.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 z-10 w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {/* Email Copy/Click Button */}
                <button 
                  onClick={copyEmail}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm font-semibold hover:bg-slate-700 hover:text-white transition-all w-full sm:w-auto"
                >
                  <Mail className="w-4 h-4 text-amber-500" />
                  <span className="font-mono text-xs">info@schoolexpert.in</span>
                  {copiedText ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-white flex-shrink-0" />
                  )}
                </button>

                {/* Direct Contact Button */}
                <a 
                  href="mailto:info@schoolexpert.in?subject=Founding%20Partners%20Program%20Interest"
                  className="w-full sm:w-auto"
                >
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold px-6 py-5 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all">
                    Apply Via Email
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
