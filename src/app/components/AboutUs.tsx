import { motion } from 'motion/react';
import { ShieldCheck, Heart, Eye, LineChart } from 'lucide-react';

export function AboutUs() {
  const values = [
    {
      icon: ShieldCheck,
      title: 'Trust & Verification',
      description: 'We personally audit campus facilities, boards, and student-teacher ratios to present verified datasets.'
    },
    {
      icon: Heart,
      title: 'Parent Communities',
      description: 'An open space for unfiltered parent feedback, ratings, and peer discussions.'
    },
    {
      icon: Eye,
      title: 'Future-Ready AI',
      description: 'Modern discovery profiles matching a child\'s capabilities with the ideal educational structure.'
    },
    {
      icon: LineChart,
      title: 'Admission Tracking',
      description: 'Track your admission applications, deadlines, and requirements all in one place.'
    }
  ];

  return (
    <div id="about" className="py-32 bg-transparent border-t border-slate-200/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Minimalist Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="mb-6">
            <span className="text-xs font-black tracking-widest text-amber-600 uppercase">
              Who We Are
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
            Bridging the gap between families and verified educational excellence.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            SchoolExpert was founded on a simple premise: finding the right school should be guided by verified proof, not guesswork. We empower parents across India with comparative datasets, authentic peer reviews, and interactive digital features.
          </p>
        </motion.div>

        {/* Professional Features Grid */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {values.map((val, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
              className="flex items-start space-x-6"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#F5EFEB] flex items-center justify-center border border-slate-200/60">
                <val.icon className="w-5 h-5 text-amber-600" />
              </div>
              <div className="space-y-3 pt-1">
                <h4 className="text-xl font-bold text-slate-900 leading-none">{val.title}</h4>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {val.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
