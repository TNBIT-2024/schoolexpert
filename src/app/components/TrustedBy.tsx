import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Globe, Landmark, Compass, Award } from 'lucide-react';

export function TrustedBy() {
  const partners = [
    {
      name: 'CBSE',
      fullName: 'Central Board',
      icon: BookOpen,
      color: 'text-amber-600 bg-[#F5EFEB]/60 border-slate-200/60',
      hoverColor: 'hover:border-amber-500/30 hover:shadow-amber-100/20'
    },
    {
      name: 'ICSE',
      fullName: 'Indian Certificate',
      icon: GraduationCap,
      color: 'text-amber-600 bg-[#F5EFEB]/60 border-slate-200/60',
      hoverColor: 'hover:border-amber-500/30 hover:shadow-amber-100/20'
    },
    {
      name: 'IB Schools',
      fullName: 'Baccalaureate',
      icon: Globe,
      color: 'text-amber-600 bg-[#F5EFEB]/60 border-slate-200/60',
      hoverColor: 'hover:border-amber-500/30 hover:shadow-amber-100/20'
    },
    {
      name: 'State Boards',
      fullName: 'State Level Curriculums',
      icon: Landmark,
      color: 'text-amber-600 bg-[#F5EFEB]/60 border-slate-200/60',
      hoverColor: 'hover:border-amber-500/30 hover:shadow-amber-100/20'
    },
    {
      name: 'International',
      fullName: 'Global Standards',
      icon: Compass,
      color: 'text-amber-600 bg-[#F5EFEB]/60 border-slate-200/60',
      hoverColor: 'hover:border-amber-500/30 hover:shadow-amber-100/20'
    },
    {
      name: 'NIOS',
      fullName: 'Open Schooling',
      icon: Award,
      color: 'text-amber-600 bg-[#F5EFEB]/60 border-slate-200/60',
      hoverColor: 'hover:border-amber-500/30 hover:shadow-amber-100/20'
    },
  ];

  return (
    <div className="py-20 bg-transparent border-y border-slate-200/50 relative overflow-hidden">
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-xl text-slate-800 font-semibold mb-2">Trusted Education Boards</h3>
          <p className="text-slate-500 max-w-xl mx-auto text-sm">Supporting schools and parents across all major boards in India with verified reviews and scores</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className={`bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-center group ${partner.hoverColor} cursor-pointer`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 border transition-transform duration-300 group-hover:scale-110 ${partner.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-slate-800 text-base group-hover:text-slate-900 transition-colors">{partner.name}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-snug">{partner.fullName}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
