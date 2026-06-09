import { motion } from 'motion/react';
import { MessageCircle, Users, TrendingUp, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router';

export function Community() {
  const stats = [
    { icon: Users, value: '50,000+', label: 'Active Parents', gradient: 'from-blue-500 to-cyan-500' },
    { icon: MessageCircle, value: '1M+', label: 'Discussions', gradient: 'from-purple-500 to-pink-500' },
    { icon: TrendingUp, value: '98%', label: 'Success Rate', gradient: 'from-green-500 to-emerald-500' },
    { icon: Heart, value: '4.9/5', label: 'Satisfaction', gradient: 'from-red-500 to-orange-500' },
  ];

  return (
    <div id="community" className="relative py-24 bg-transparent border-t border-slate-200/50 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl mb-6 font-bold tracking-tight text-slate-900">
              Join India's Largest
              <br />
              <span className="text-amber-600">Parent Community</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Connect with thousands of parents, share experiences, get advice, and make informed decisions together.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-card rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#F5EFEB]/60 border border-slate-200/60 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/community">
              <Button
                size="lg"
                className="bg-amber-500 text-slate-950 hover:bg-amber-600 text-base font-semibold px-8 py-4 shadow-md rounded-xl transition-all duration-200"
              >
                Join the Community
              </Button>
            </Link>
            <Link to="/community">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-200 text-slate-700 hover:text-slate-950 hover:border-slate-800 hover:bg-slate-50 text-base font-semibold px-8 py-4 rounded-xl transition-all duration-200"
              >
                Browse Discussions
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
