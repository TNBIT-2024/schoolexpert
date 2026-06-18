import { motion } from 'motion/react';
import { Search, Users } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Search & Discover',
      description: 'Use our AI-powered search to find schools that match your criteria. Filter by location, board, fees, and facilities.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Connect & Learn',
      description: 'Read verified reviews, join parent communities, and get real insights from families who have been there.',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div id="how-it-works" className="py-32 bg-transparent border-y border-slate-200/50 relative overflow-hidden">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Modern Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest text-amber-600 uppercase bg-slate-100 rounded-full">
            The Journey
          </span>
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            How{' '}
            <span className="text-amber-600 italic">
              The School Expert
            </span>{' '}
            Works
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            A simplified pathway to your child's academic future, powered by smart intelligence.
          </p>
        </motion.div>

        {/* Steps - Modern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10 }}
              className="group relative h-full flex flex-col items-center"
            >
              {/* Card Container */}
              <div className="relative w-full bg-card backdrop-blur-xl border border-slate-200/50 p-10 rounded-[3rem] shadow-sm group-hover:shadow-2xl transition-all duration-500 mb-8 flex-1">
                {/* Step Index Watermark */}
                <div className="absolute top-6 right-8 text-6xl font-black text-gray-50 group-hover:text-amber-50 transition-colors pointer-events-none">
                  0{index + 1}
                </div>

                {/* Minimalist Icon Container */}
                <div className="relative mb-10 inline-block">
                  <div className="w-16 h-16 rounded-2xl bg-[#F5EFEB]/60 border border-slate-200/60 flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-105">
                    <step.icon className="w-7 h-7 text-amber-600" />
                  </div>
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-amber-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Bottom line accent */}
                <div className="h-1 w-0 group-hover:w-16 bg-amber-600 transition-all duration-500 rounded-full" />
              </div>

              {/* Minimalist connecting element (only on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                  <div className="w-8 h-8 rounded-full bg-card border border-slate-200/50 shadow-sm flex items-center justify-center group-hover:border-slate-300 group-hover:rotate-90 transition-all duration-500">
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}