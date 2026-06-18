import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Check,
  Mail,
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
  ArrowRight,
  Award,
  ShieldCheck,
  Star,
  Bookmark,
  Zap,
  Compass,
  Smile,
  Activity,
  Building,
  TrendingUp
} from 'lucide-react';
import { Button } from './ui/button';

export function FoundingPartners() {
  const [copiedText, setCopiedText] = useState(false);

  const benefits = [
    { text: 'Lifetime Recognition as a Founding Partner of The School Expert™️', icon: Award, desc: 'Your brand permanently etched as a pioneer in our ecosystem.' },
    { text: 'Locked-In Partnership Pricing for 3 Years', icon: ShieldCheck, desc: 'Complete immunity from inflation and future subscription rate increases.' },
    { text: 'Featured Placement on Our Official Website', icon: Star, desc: 'Prominent, high-traffic visibility on our homepage and primary directories.' },
    { text: 'Digital Founding Partner Certificate', icon: Bookmark, desc: 'Verified, shareable credentials representing your early institutional backing.' },
    { text: 'Priority Access to School Outreach & Engagement Initiatives', icon: Zap, desc: 'First-in-line access to active marketing campaigns and school events.' },
    { text: 'Enhanced Visibility Among Schools, Educators & Decision Makers', icon: Compass, desc: 'Direct placement in front of verified decision-makers across India.' },
    { text: 'Early Access to Collaboration and Partnership Opportunities', icon: Sparkles, desc: 'Exclusive previews and beta-testing of upcoming feature releases.' },
    { text: 'Recognition as an Early Supporter of Education Excellence', icon: Heart, desc: 'Positioned as an active stakeholder pushing student-first innovations.' }
  ];

  const applicantTypes = [
    { name: 'EdTech Companies', icon: Laptop, desc: 'LMS, virtual classroom, and digital learning innovators.' },
    { name: 'School ERP Providers', icon: Database, desc: 'Campus operations and administrative systems.' },
    { name: 'Educational Publishers', icon: BookOpen, desc: 'Curriculum design, textbook, and digital content providers.' },
    { name: 'Curriculum Development', icon: CheckSquare, desc: 'Custom curriculum planning, academic design, and learning resources.' },
    { name: 'Teacher Training Companies', icon: GraduationCap, desc: 'Educator upskilling and professional development.' },
    { name: 'Skill Development Providers', icon: TrendingUp, desc: 'Coding, communication, and vocational trainers.' },
    { name: 'International Education Consultants', icon: Globe, desc: 'Study abroad guidance, exchange programs, and admission advisers.' },
    { name: 'Infrastructure / School Equipment Vendors', icon: Building, desc: 'Lab equipment, classroom furniture, and school infrastructure specialists.' },
    { name: 'Career Coaching & Counselling', icon: Compass, desc: 'Career mapping, counseling, and guidance mentors.' },
    { name: 'Mental health professionals', icon: Heart, desc: 'Student wellbeing, counseling, and psychological support.' },
    { name: 'Individual course providers', icon: Award, desc: 'Independent educators, skill instructors, and academic tutors.' }
  ];

  const copyEmail = () => {
    navigator.clipboard.writeText('info@schoolexpert.in');
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <section id="founding-partners" className="py-32 bg-transparent relative overflow-hidden">
      {/* Decorative ambient lighting elements */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-700 text-[11px] font-black uppercase tracking-[0.2em]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Now Live
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
            Founding Partners <span className="text-amber-600">Program</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed font-medium">
            We are inviting visionary organizations, innovators, consultants, and education-focused professionals across India to become part of an exclusive community helping shape the future of school education.
          </p>
        </div>

        {/* Main Dashboard Box */}
        <div className="mb-24">

          {/* Benefits Grid (Modern Detailed Cards) */}
          <div className="w-full">
            <div className="bg-[#FAF7F2]/65 border border-slate-200/50 rounded-[2.5rem] p-8 md:p-10 shadow-xl flex flex-col justify-between">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200/50 pb-4">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  Exclusive Founding Partner Benefits
                </h3>

                <div className="grid sm:grid-cols-2 gap-6">
                  {benefits.map((b, index) => {
                    const Icon = b.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        className="flex gap-4 group"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                          <Icon className="w-4 h-4 text-amber-700 group-hover:text-white transition-colors" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-slate-900 leading-tight group-hover:text-amber-700 transition-colors">
                            {b.text}
                          </h4>
                          <p className="text-slate-500 text-xs leading-relaxed font-medium">
                            {b.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Section: Who Can Apply? */}
        <div className="border-t border-slate-250/50 pt-20 mb-24">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Who Can Apply?</h3>
            <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Open to visionary innovators, specialists, and service providers in the education ecosystem
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {applicantTypes.map((app, idx) => {
              const Icon = app.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04, duration: 0.35 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="flex flex-col justify-between p-5 bg-[#FAF7F2]/40 border border-slate-200/50 rounded-2xl hover:bg-white hover:border-amber-500/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900/5 border border-slate-950/5 flex items-center justify-center group-hover:bg-amber-600/10 group-hover:border-amber-600/20 transition-all">
                      <Icon className="w-4.5 h-4.5 text-slate-700 group-hover:text-amber-600 transition-colors" />
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900 tracking-tight group-hover:text-amber-700 transition-colors">
                      {app.name}
                    </h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed font-medium">
                      {app.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Footer Block */}
        <div className="relative bg-[#1A1614] border border-amber-950/20 rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden shadow-2xl">
          {/* Subtle gold glow effect */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/[0.05] rounded-full blur-[100px] pointer-events-none" />

          <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-7 space-y-4 text-center md:text-left">
              <h4 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-none">
                Express Your Interest Today
              </h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-lg">
                Get in touch with us to secure your locked-in pricing and lock down one of the remaining 8 Founding Partner slots.
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
              {/* Copy Email Button */}
              <button
                onClick={copyEmail}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-semibold hover:bg-slate-800 transition-all cursor-pointer shadow-inner w-full sm:w-auto"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span className="font-mono text-xs">info@schoolexpert.in</span>
                {copiedText ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-white flex-shrink-0" />
                )}
              </button>

              {/* Direct Mail Button */}
              <a
                href="mailto:info@schoolexpert.in?subject=Founding%20Partners%20Program%20Interest"
                className="w-full sm:w-auto"
              >
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-7 py-6 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all duration-300">
                  Apply Via Email
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}