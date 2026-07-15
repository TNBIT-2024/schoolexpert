import { motion } from 'motion/react';
import { Button } from './ui/button';

export function Community() {
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



          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-amber-500 text-slate-950 hover:bg-amber-600 text-base font-semibold px-8 py-4 shadow-md rounded-xl transition-all duration-200"
            >
              Join the Community
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-slate-200 text-slate-700 hover:text-slate-950 hover:border-slate-800 hover:bg-slate-50 text-base font-semibold px-8 py-4 rounded-xl transition-all duration-200"
            >
              Browse Discussions
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}