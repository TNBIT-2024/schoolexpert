import { motion } from 'motion/react';
import { ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from './ui/button';

const values = [
  {
    icon: ShieldCheck,
    title: 'Trust & Verification',
    description:
      'Get information about schools that are  verified and updated regularly. Get accurate details about facilities,  student-teacher ratios to present verified datasets you can rely on.',
    color: 'from-amber-400/20 to-amber-600/5',
    border: 'border-amber-400/30',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-600',
  },
  {
    icon: Heart,
    title: 'Parent Communities',
    description:
      'An open space for unfiltered parent feedback, authentic ratings, and peer discussions that guide real decisions.',
    color: 'from-rose-400/20 to-rose-600/5',
    border: 'border-rose-400/30',
    iconBg: 'bg-rose-500/10',
    iconColor: 'text-rose-500',
  },
];

export function AboutUs() {
  return (
    <section id="about" className="relative py-28 overflow-hidden bg-transparent border-t border-slate-200/50">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-20 w-[420px] h-[420px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-700 text-[11px] font-black uppercase tracking-[0.2em] mb-5">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8 max-w-none mx-auto">
            Discover. Connect. Grow
          </h2>
          <div className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto font-medium space-y-6 text-center">
            <p>
              The School Expert™ is an integrated digital ecosystem designed to bring every stakeholder in education under one roof. We simplify the education journey by creating meaningful connections between parents, students, schools, educators, education partners, and service providers.
            </p>
            <p>
              Our platform empowers families to make informed decisions, helps institutions increase visibility and engagement, enables educators to collaborate and grow professionally, and provides education-focused businesses with opportunities to reach the right audience.
            </p>
            <p>
              Through trusted information, authentic reviews, data-driven insights, and seamless networking, The School Expert™ creates a transparent and collaborative education community where everyone can discover opportunities, build connections, and achieve growth.
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <Link to="/meet-the-founder">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2.5 text-xs uppercase tracking-wider cursor-pointer">
                Meet our Founders
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* ── Values Cards Grid ── */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {values.map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.1 }}
              className={`group relative bg-gradient-to-br ${val.color} border ${val.border} rounded-3xl p-7 overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-all duration-350`}
            >
              {/* subtle corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-500" />

              <div className="relative z-10 flex items-start gap-5">
                <div className={`flex-shrink-0 w-12 h-12 rounded-2xl ${val.iconBg} flex items-center justify-center border border-white/30 shadow-sm`}>
                  <val.icon className={`w-5 h-5 ${val.iconColor}`} />
                </div>
                <div className="space-y-2 pt-0.5">
                  <h4 className="text-lg font-bold text-slate-900 leading-tight">{val.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">{val.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}