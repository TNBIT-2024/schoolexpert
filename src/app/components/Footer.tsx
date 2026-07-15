import { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
const logoImg = '/logo svg.svg';

export function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  return (
    <footer className="bg-slate-50/90 text-slate-600 border-t border-slate-200 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        
        {/* Footer Top CTA Banner (Zoho Style) */}
        <div className="border-b border-slate-200 pb-10 mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2">
            Ready to find the perfect school?
          </h2>
          <p className="text-slate-500 text-sm mb-6 font-semibold max-w-lg mx-auto leading-relaxed">
            Get expert guidance, personalized recommendations, and active community support to make the best decision for your child.
          </p>
          <Link to="/get-started">
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-extrabold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-xs uppercase tracking-wider cursor-pointer">
              Get Verified Access
            </button>
          </Link>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Column 1: Explore Directory */}
          <div>
            <h3 className="text-slate-800 font-extrabold text-sm uppercase tracking-wider mb-4 relative pb-1 inline-block group cursor-default">
              <span>Explore Directory</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/schools" className="text-slate-500 hover:text-amber-600 transition-colors">Search Schools</Link></li>
              <li><Link to="/schools" className="text-slate-500 hover:text-amber-600 transition-colors">Read Reviews</Link></li>
              <li><Link to="/schools" className="text-slate-500 hover:text-amber-600 transition-colors">School Directory</Link></li>
              <li><Link to="/schools" className="text-slate-500 hover:text-amber-600 transition-colors">Compare Board Options</Link></li>
            </ul>
          </div>

          {/* Column 2: For Institutions */}
          <div>
            <h3 className="text-slate-800 font-extrabold text-sm uppercase tracking-wider mb-4 relative pb-1 inline-block group cursor-default">
              <span>For Institutions</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/get-started?type=school" className="text-slate-500 hover:text-amber-600 transition-colors">List Your School</Link></li>
              <li><Link to="/signin" className="text-slate-500 hover:text-amber-600 transition-colors">Manage Profile</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-amber-600 transition-colors">Pricing & Plans</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h3 className="text-slate-800 font-extrabold text-sm uppercase tracking-wider mb-4 relative pb-1 inline-block group cursor-default">
              <span>Our Services</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/contact" className="text-slate-500 hover:text-amber-600 transition-colors">EdTech Companies</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-amber-600 transition-colors">School ERP Providers</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-amber-600 transition-colors">Educational Publishers</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-amber-600 transition-colors">Equipment Vendors</Link></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-slate-800 font-extrabold text-sm uppercase tracking-wider mb-4 relative pb-1 inline-block group cursor-default">
              <span>Company</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/AboutUs" className="text-slate-500 hover:text-amber-600 transition-colors">About Us</Link></li>
              <li><Link to="/AboutUs" className="text-slate-500 hover:text-amber-600 transition-colors">Meet Founders</Link></li>
              <li><Link to="/community" className="text-slate-500 hover:text-amber-600 transition-colors">Community Forum</Link></li>
            </ul>
          </div>

          {/* Column 5: Contact Support */}
          <div>
            <h3 className="text-slate-800 font-extrabold text-sm uppercase tracking-wider mb-4 relative pb-1 inline-block group cursor-default">
              <span>Contact Support</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-1">Email</span>
                <a href="mailto:info@schoolexpert.in" className="text-slate-700 hover:text-amber-600 font-semibold transition-colors">
                  info@schoolexpert.in
                </a>
              </div>
              <div className="pt-3 border-t border-slate-200">
                <Link to="/contact" className="text-amber-650 hover:text-amber-750 font-bold tracking-wide flex items-center gap-1 group">
                  <span>Book Consultation</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">&gt;</span>
                </Link>
                <Link to="/contact" className="text-amber-650 hover:text-amber-750 font-bold tracking-wide flex items-center gap-1 mt-2 group">
                  <span>Write to Us</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">&gt;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Logo and Description */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <img src={logoImg} alt="The School Expert" className="h-28 md:h-36 w-auto object-contain -ml-6 -my-6 transition-transform duration-300 hover:scale-105" />
              <div className="text-xs text-slate-400 max-w-md">
                <p>© 2026 The School Expert. All rights reserved.</p>
                <p className="mt-0.5">Bridging the gap between parents and schools across India.</p>
              </div>
            </div>

            {/* Socials & Policies */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Social icons */}
              <div className="flex space-x-3">
                <a 
                  href="https://www.facebook.com/share/1BHGfnCaai/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 bg-slate-200/60 text-slate-650 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-slate-200/60 text-slate-650 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.instagram.com/theschoolexpert.in?igsh=MXYyNjMwa2NyN3R6dg==" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 bg-slate-200/60 text-slate-650 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/the-school-expert/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 bg-slate-200/60 text-slate-650 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>

              {/* Policy Links */}
              <div className="flex space-x-4 text-xs font-medium text-slate-400">
                <button 
                  onClick={() => setIsPrivacyOpen(true)} 
                  className="text-slate-500 hover:text-amber-600 transition-colors cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                >
                  Privacy Policy
                </button>
                <Link to="/contact" className="text-slate-500 hover:text-amber-600 transition-colors">Terms</Link>
                <Link to="/contact" className="text-slate-500 hover:text-amber-600 transition-colors">Cookies</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </footer>
  );
}