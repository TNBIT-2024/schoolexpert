import { motion } from 'motion/react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router';

export function CTA() {
  return (
    <div className="py-24 bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-50 rounded-3xl p-12 lg:p-16 border border-slate-200 shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10">

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl text-slate-900 font-bold mb-6 tracking-tight">
              Ready to Find the Right School
              <br />
              <span className="text-amber-600">with Proof, Not Guesswork?</span>
            </h2>

            <p className="text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed">
              Get verified access to infrastructure scores, parent reviews, and live consultation support for informed school decisions.
            </p>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {[
                'Verified parent reviews',
                'Quantified infrastructure scores',
                'Live consultation support',
                'Compare schools with clarity',
                '48 schools verified',
                'CBSE | ICSE | State boards'
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-slate-700 font-medium text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/get-started" className="flex-1 sm:flex-none">
                <Button
                  size="lg"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-base font-semibold px-8 py-4 shadow-md rounded-xl transition-all duration-200 group flex items-center justify-center"
                >
                  Get Verified Access
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/schools" className="flex-1 sm:flex-none">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-slate-200 text-slate-700 hover:text-slate-950 hover:border-slate-800 hover:bg-slate-100 text-base font-semibold px-8 py-4 rounded-xl transition-all duration-200"
                >
                  Browse Schools
                </Button>
              </Link>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-slate-500 text-xs font-semibold tracking-wide uppercase">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-slate-400" />
                <span>Daily on-call advisors</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-slate-400" />
                <span>Verified reviews</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-slate-400" />
                <span>Infrastructure scores</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
