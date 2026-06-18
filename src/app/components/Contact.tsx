import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

export function Contact() {

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    schoolName: '',
    preferredDate: '',
    preferredTime: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        schoolName: '',
        preferredDate: '',
        preferredTime: ''
      });
    }, 4000);
  };

  return (
    <div id="contact" className="py-32 bg-transparent border-t border-slate-200/50 relative overflow-hidden">
      
      {/* Target Anchor for Demo button */}
      <div id="demo" className="absolute -top-20" />

      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-black tracking-widest text-amber-600 uppercase bg-[#F5EFEB]/80 border border-slate-200/60 rounded-full">
            Connect With Us
          </span>
          <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            How Can We <span className="text-amber-600">Help?</span>
          </h2>
          <div className="h-1.5 w-24 bg-amber-600 mx-auto rounded-full" />
        </div>

        {/* Form & Info Section Grid */}
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-slate-900 leading-tight">
                Let's start a conversation.
              </h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Whether you are a parent seeking the ideal curriculum or a school representative looking to claim your audited profile, we're here to assist.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4 pt-4">
              
              <div className="group bg-card border border-slate-200/60 rounded-2xl p-6 flex items-center space-x-5 shadow-sm hover:shadow-md hover:border-amber-600/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#F5EFEB]/60 border border-slate-200/60 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-amber-600 group-hover:border-amber-600">
                  <Mail className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Us</div>
                  <a href="mailto:info@schoolexpert.in" className="text-slate-800 font-black hover:text-amber-600 transition-colors">
                    info@schoolexpert.in
                  </a>
                </div>
              </div>

              <div className="group bg-card border border-slate-200/60 rounded-2xl p-6 flex items-center space-x-5 shadow-sm hover:shadow-md hover:border-amber-600/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#F5EFEB]/60 border border-slate-200/60 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-amber-600 group-hover:border-amber-600">
                  <MapPin className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Headquarters</div>
                  <span className="text-slate-850 font-black">
                    Indiranagar, Bangalore, KA, India
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Side: Interactive Toggle Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-card border border-slate-200/65 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
              


              {/* Form Content Area */}
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-16 text-center space-y-4"
                  >
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
                    <h4 className="text-2xl font-black text-slate-900">Request Received!</h4>
                    <p className="text-slate-500 font-medium max-w-sm">
                      Thank you for getting in touch! Our support specialists will respond within the next 24 business hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="message"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Common fields */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. John Doe"
                          className="w-full px-5 py-3.5 bg-[#F5EFEB]/20 border border-slate-200 rounded-2xl focus:outline-none focus:border-amber-600 text-slate-900 font-medium placeholder-slate-400/80 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. john@domain.com"
                          className="w-full px-5 py-3.5 bg-[#F5EFEB]/20 border border-slate-200 rounded-2xl focus:outline-none focus:border-amber-600 text-slate-900 font-medium placeholder-slate-400/80 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Contact form fields */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="How can we assist you?"
                        className="w-full px-5 py-3.5 bg-[#F5EFEB]/20 border border-slate-200 rounded-2xl focus:outline-none focus:border-amber-600 text-slate-900 font-medium placeholder-slate-400/80 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Your Message</label>
                      <textarea
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Write your query details here..."
                        className="w-full px-5 py-3.5 bg-[#F5EFEB]/20 border border-slate-200 rounded-2xl focus:outline-none focus:border-amber-600 text-slate-900 font-medium placeholder-slate-400/80 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Action */}
                    <Button
                      type="submit"
                      className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
                    >
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}