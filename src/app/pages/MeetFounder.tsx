import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowLeft, Compass, Target } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function MeetFounder() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col font-geist">
      <Navbar />

      <main className="flex-grow pt-40 pb-24 relative overflow-hidden">
        {/* Decorative background gradients */}
        <div className="absolute top-20 -left-48 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-[40%] -right-48 w-[600px] h-[600px] bg-rose-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 relative z-20"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-amber-600 text-sm font-bold uppercase tracking-wider transition-all duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform stroke-[2.5]" />
              Back to Home
            </Link>
          </motion.div>

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-4"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-700 text-[10px] font-black uppercase tracking-[0.2em]">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Meet the Founders
            </h1>
            <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
          </motion.div>

          {/* Founder 1: Shalini Santhosh */}
          <div className="grid md:grid-cols-12 gap-12 items-start mb-20">
            {/* Left Column: Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="md:col-span-4 flex justify-center md:sticky md:top-28"
            >
              <div className="relative group max-w-xs w-full">
                {/* Decorative borders */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-500 to-rose-500 rounded-[2.5rem] blur opacity-30 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-500 to-rose-500 rounded-[2.5rem] opacity-10 group-hover:opacity-15 transition-opacity duration-300" />
                
                {/* Image Box */}
                <div className="relative bg-[#FAF7F2] border border-slate-200/60 rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <img
                    src="/founder.png"
                    alt="Shalini Santhosh - Founder & CEO"
                    className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Leadership Badge */}
                <div className="absolute -bottom-4 -right-4 bg-slate-900 border border-slate-800 text-white rounded-2xl px-5 py-3 shadow-xl max-w-[200px] backdrop-blur-md">
                  <div className="text-[10px] text-amber-500 font-black tracking-[0.15em] uppercase mb-0.5 animate-pulse">
                    Founder & CEO
                  </div>
                  <div className="text-xs font-bold text-slate-100">
                    Shalini Santhosh
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className="md:col-span-8 space-y-6 text-slate-700 font-medium text-base leading-relaxed text-justify"
            >
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                  Shalini Santhosh
                </h2>
                <p className="text-amber-700 text-sm md:text-base font-extrabold tracking-wide uppercase text-left">
                  Founder & CEO, The School Expert™ · Trained Montessorian
                </p>
              </div>

              <div className="h-px bg-slate-200/60 w-24 my-2" />

              <p>
                Shalini Santhosh is the Founder and CEO of The School Expert™, a parent-centric education platform dedicated to helping families make informed educational decisions.
              </p>
              
              <p>
                A trained Montessorian, wonderful storyteller, and passionate advocate for child-centric learning, Shalini has always been deeply interested in education, literature, music, and the arts. Her belief that every child deserves access to enriching learning experiences has been the driving force behind her professional journey.
              </p>
              
              <p>
                Her commitment to fostering a love for learning led her to establish <strong>The Ever-hungry Bookworms</strong>, an initiative focused on encouraging children to explore the world of books through reading, storytelling, and creative engagement.
              </p>
              
              <p>
                Recognizing a significant gap in the education ecosystem, she created a community-driven platform where parents could exchange authentic experiences and insights about schools.
              </p>
              
              <p>
                The success of this initiative led to the creation of <strong>The School Expert</strong>.
              </p>
              
              <p>
                Today, under Shalini's leadership, The School Expert™ is working towards becoming India's most trusted destination for school discovery, educational guidance, and parent engagement.
              </p>
            </motion.div>
          </div>

          {/* Vision & Mission Section */}
          <div className="grid md:grid-cols-2 gap-8 border-t border-slate-200/60 pt-16 mb-24">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-[2rem] p-8 md:p-10 flex flex-col sm:flex-row gap-6 relative overflow-hidden group hover:shadow-md hover:border-amber-500/30 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center text-amber-700">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest block">Our Horizon</span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                    Vision
                  </h3>
                </div>
                <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed font-semibold">
                  To become the most trusted education discovery and engagement platform for parents and families.
                </p>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-[2rem] p-8 md:p-10 flex flex-col sm:flex-row gap-6 relative overflow-hidden group hover:shadow-md hover:border-rose-500/30 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/15 flex items-center justify-center text-rose-700">
                <Target className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-[9px] font-black text-rose-700 uppercase tracking-widest block">Our Commitment</span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                    Mission
                  </h3>
                </div>
                <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed font-semibold">
                  To empower parents with reliable information, authentic community insights, and meaningful educational connections, enabling informed decisions and better educational outcomes for every child.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Founder 2: Santhosh Srikant */}
          <div className="grid md:grid-cols-12 gap-12 items-start border-t border-slate-200/50 pt-20 mb-10">
            {/* Left Column: Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="md:col-span-8 space-y-6 text-slate-700 font-medium text-base leading-relaxed order-2 md:order-1 text-justify"
            >
              <div className="space-y-2 text-left md:text-right">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                  Santhosh Srikant
                </h2>
                <p className="text-amber-700 text-sm md:text-base font-extrabold tracking-wide uppercase">
                  Director, The School Expert™
                </p>
              </div>

              <div className="h-px bg-slate-200/60 w-24 my-2 md:ml-auto" />

              <p>
                Santhosh Srikant is a strategic architect in the B2B technology landscape, dedicated to bridging the gap between high-level innovation and real-world sales execution. As the Founder and CEO of GTM Axis, he has pioneered first of it's kind fully integrated GTM Builder and Execution Engine, leveraging "Metacortex" intelligence to help companies achieve market dominance.
              </p>
              
              <p>
                Beyond product innovation, Santhosh is a community builder and industry advocate. He is the Founder of the <strong>Association of Indian Technology Sales Professionals [AITSP]</strong>, a premier organization focused on elevating the tech sales profession in India through standardized frameworks and professional enablement. His work is rooted in <strong>TNBIT [The Next Big Idea Technologies]</strong>, a "Moonshot Factory" designed to solve complex global problems through radical engineering and strategic disruption.
              </p>
              
              <p>
                With a deep focus on the intersection of Human Intelligence and Agentic AI, Santhosh is a frequent voice on the "Founder’s Sales Mindset," GTM strategy for the next decade, and the evolution of B2B sales in the Indian and global technology ecosystems.
              </p>
            </motion.div>

            {/* Right Column: Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="md:col-span-4 flex justify-center md:sticky md:top-28 order-1 md:order-2"
            >
              <div className="relative group max-w-xs w-full">
                {/* Decorative borders */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-500 to-rose-500 rounded-[2.5rem] blur opacity-30 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-500 to-rose-500 rounded-[2.5rem] opacity-10 group-hover:opacity-15 transition-opacity duration-300" />
                
                {/* Image Box */}
                <div className="relative bg-[#FAF7F2] border border-slate-200/60 rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <img
                    src="/director.jpg"
                    alt="Santhosh Srikant - Director"
                    className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Director Badge */}
                <div className="absolute -bottom-4 -right-4 bg-slate-900 border border-slate-800 text-white rounded-2xl px-5 py-3 shadow-xl max-w-[200px] backdrop-blur-md">
                  <div className="text-[10px] text-amber-500 font-black tracking-[0.15em] uppercase mb-0.5">
                    Director
                  </div>
                  <div className="text-xs font-bold text-slate-100">
                    Santhosh Srikant
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Join Our Journey CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-12 mt-20 bg-slate-900 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3 text-center md:text-left z-10 max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1">
                Collaborate & Connect
              </span>
              <p className="text-lg md:text-xl font-bold leading-relaxed text-slate-100">
                Join our community of forward-thinking parents, educators, and schools building the future of education together.
              </p>
            </div>

            <div className="flex-shrink-0 z-10">
              <Link to="/get-started">
                <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xs uppercase tracking-widest cursor-pointer">
                  Join Our Journey
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}