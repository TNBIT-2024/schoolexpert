import { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
const logoImg = '/logo svg.svg';

export function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  return (
    <footer className="bg-transparent text-slate-600 border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <img src={logoImg} alt="The School Expert" className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 hover:scale-105" />
            </div>
            <p className="text-slate-500 mb-6 leading-relaxed text-sm">
              Bridging the gap between parents and schools across India with AI-powered recommendations and community support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-200/60 text-slate-600 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-200/60 text-slate-600 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-200/60 text-slate-600 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-200/60 text-slate-600 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* For Parents */}
          <div>
            <h3 className="text-slate-800 font-semibold text-base mb-4">For Parents</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/schools" className="text-slate-500 hover:text-amber-600 transition-colors">Search Schools</Link></li>
              <li><Link to="/schools" className="text-slate-500 hover:text-amber-600 transition-colors">Read Reviews</Link></li>
              <li><Link to="/community" className="text-slate-500 hover:text-amber-600 transition-colors">Join Community</Link></li>

              <li><Link to="/schools" className="text-slate-500 hover:text-amber-600 transition-colors">School Directory</Link></li>
            </ul>
          </div>

          {/* For Schools */}
          <div>
            <h3 className="text-slate-800 font-semibold text-base mb-4">For Schools</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/get-started?type=school" className="text-slate-500 hover:text-amber-600 transition-colors">List Your School</Link></li>
              <li><Link to="/signin" className="text-slate-500 hover:text-amber-600 transition-colors">Manage Profile</Link></li>

              <li><Link to="/contact" className="text-slate-500 hover:text-amber-600 transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-slate-800 font-semibold text-base mb-4">Directory Services</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/contact" className="text-slate-500 hover:text-amber-600 transition-colors">EdTech Companies</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-amber-600 transition-colors">School ERP Providers</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-amber-600 transition-colors">Educational Publishers</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-amber-600 transition-colors">Teacher Training</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-amber-600 transition-colors">Skill Development</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-amber-600 transition-colors">Education Consultants</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-amber-600 transition-colors">Equipment Vendors</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-slate-800 font-semibold text-base mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
             
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span className="text-slate-600">info@schoolexpert.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © 2026 The School Expert. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <button 
                onClick={() => setIsPrivacyOpen(true)} 
                className="text-slate-500 hover:text-amber-600 transition-colors cursor-pointer bg-transparent border-none p-0 focus:outline-none text-sm font-normal"
              >
                Privacy Policy
              </button>
              <Link to="/contact" className="text-slate-500 hover:text-amber-600 transition-colors">Terms of Service</Link>
              <Link to="/contact" className="text-slate-500 hover:text-amber-600 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </footer>
  );
}