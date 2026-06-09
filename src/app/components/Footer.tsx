import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import logoImg from '../../../public/schoolexpert_logo.png';

export function Footer() {
  return (
    <footer className="bg-transparent text-slate-600 border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <img src={logoImg} alt="The School Expert" className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 hover:scale-105" style={{ filter: 'url(#remove-white)' }} />
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
              <li><a href="#" className="text-slate-500 hover:text-amber-600 transition-colors">Search Schools</a></li>
              <li><a href="#" className="text-slate-500 hover:text-amber-600 transition-colors">Read Reviews</a></li>
              <li><a href="#" className="text-slate-500 hover:text-amber-600 transition-colors">Join Community</a></li>
              <li><a href="#" className="text-slate-500 hover:text-amber-600 transition-colors">Ask AI</a></li>
              <li><a href="#" className="text-slate-500 hover:text-amber-600 transition-colors">School Directory</a></li>
            </ul>
          </div>

          {/* For Schools */}
          <div>
            <h3 className="text-slate-800 font-semibold text-base mb-4">For Schools</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-slate-500 hover:text-amber-600 transition-colors">List Your School</a></li>
              <li><a href="#" className="text-slate-500 hover:text-amber-600 transition-colors">Manage Profile</a></li>
              <li><a href="#" className="text-slate-500 hover:text-amber-600 transition-colors">Admission Management</a></li>
              <li><a href="#" className="text-slate-500 hover:text-amber-600 transition-colors">Analytics</a></li>
              <li><a href="#" className="text-slate-500 hover:text-amber-600 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-slate-800 font-semibold text-base mb-4">Our Services</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#edtech" className="text-slate-500 hover:text-amber-600 transition-colors">EdTech Companies</a></li>
              <li><a href="#erp" className="text-slate-500 hover:text-amber-600 transition-colors">School ERP Providers</a></li>
              <li><a href="#publishers" className="text-slate-500 hover:text-amber-600 transition-colors">Educational Publishers</a></li>
              <li><a href="#training" className="text-slate-500 hover:text-amber-600 transition-colors">Teacher Training</a></li>
              <li><a href="#skills" className="text-slate-500 hover:text-amber-600 transition-colors">Skill Development</a></li>
              <li><a href="#consultants" className="text-slate-500 hover:text-amber-600 transition-colors">Education Consultants</a></li>
              <li><a href="#infrastructure" className="text-slate-500 hover:text-amber-600 transition-colors">Equipment Vendors</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-slate-800 font-semibold text-base mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                <span className="text-slate-600">123 Education Hub, Bangalore, Karnataka 560001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span className="text-slate-600">+91 80 1234 5678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span className="text-slate-600">support@schoolexpert.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © 2026 SchoolExpert. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-slate-500 hover:text-amber-600 transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-500 hover:text-amber-600 transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-500 hover:text-amber-600 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
