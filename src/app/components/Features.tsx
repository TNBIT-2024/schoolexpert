import { motion } from 'motion/react';
import { Users, Star, Shield } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Users,
      title: 'Parent Community',
      description: 'Connect with thousands of parents, share experiences, and get real insights about schools from those who know best.',
      gradient: 'from-purple-500 to-pink-500',
      delay: 0.2,
    },
    {
      icon: Star,
      title: 'Reviews',
      description: 'Read authentic reviews from real parents. All reviews are verified to ensure genuine feedback.',
      gradient: 'from-yellow-500 to-orange-500',
      delay: 0.5,
    },
    {
      icon: Shield,
      title: 'Information',
      description: 'All school information is verified and updated regularly. Get accurate details about facilities.',
      gradient: 'from-teal-500 to-cyan-500',
      delay: 0.7,
    },
  ];

  return (
    <div id="features" className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimalist Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Our Platform <span className="text-amber-600">Features</span>
          </h2>
          <div className="h-1 w-20 bg-amber-600 mx-auto rounded-full" />
        </motion.div>

        {/* Clean Square Flex Grid with Centered Bottom Row */}
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-1.125rem)] aspect-square bg-card border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              {/* Outline element that appears on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-600/20 rounded-3xl transition-all duration-500 pointer-events-none z-30" />
              
              {/* Default State: Light Accent Icon and Title */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center group-hover:opacity-0 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {feature.title}
                </h3>
              </div>

              {/* Hover State: Soft Background + Description + Outline */}
              <div className="absolute inset-0 bg-[#F5EFEB]/30 opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-card shadow-sm flex items-center justify-center mb-6 border border-slate-200/60">
                  <feature.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {feature.description}
                </p>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}