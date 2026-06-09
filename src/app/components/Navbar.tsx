import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Laptop, 
  Database, 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  Globe, 
  Building,
  Users,
  User as UserIcon,
  LogOut,
  Briefcase
} from 'lucide-react';
import { Button } from './ui/button';
import logoImg from '../../../public/schoolexpert_logo.png';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { EditProfileModal } from './EditProfileModal';

const servicesList = [
  { name: 'EdTech Companies', icon: Laptop },
  { name: 'School ERP Providers', icon: Database },
  { name: 'Educational Publishers', icon: BookOpen },
  { name: 'Teacher Training Companies', icon: GraduationCap },
  { name: 'Skill Development Providers', icon: TrendingUp },
  { name: 'International Education Consultants', icon: Globe },
  { name: 'Infrastructure / School Equipment Vendors', icon: Building },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isForOpen, setIsForOpen] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [isMobileForOpen, setIsMobileForOpen] = useState(false);
  const [isMobileDirectoryOpen, setIsMobileDirectoryOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const { currentUser, logOut } = useAuth();
  const [activeTab, setActiveTab] = useState('features');

  const getFirstAndLastLetter = (nameOrEmail: string) => {
    if (!nameOrEmail) return '';
    const name = nameOrEmail.split('@')[0];
    if (name.length <= 1) return name.toUpperCase();
    return (name[0] + name[name.length - 1]).toUpperCase();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-card/85 backdrop-blur-lg shadow-md border-b border-slate-200/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="flex items-center">
              <img 
                src={logoImg} 
                alt="The School Expert" 
                className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 hover:scale-105" 
                style={{ filter: 'url(#remove-white)' }} 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex flex-none items-center bg-[#FAF6F0]/65 border border-slate-200/40 rounded-full p-1 backdrop-blur-md mx-4 shadow-sm relative">
            
            {/* Features */}
            <a 
              href="#features" 
              onClick={() => setActiveTab('features')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'features' 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'text-slate-700 hover:bg-amber-600/10 hover:text-amber-700'
              }`}
            >
              Features
            </a>

            {/* About Us */}
            <a 
              href="#about" 
              onClick={() => setActiveTab('about')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'about' 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'text-slate-700 hover:bg-amber-600/10 hover:text-amber-700'
              }`}
            >
              About Us
            </a>

            {/* For Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsForOpen(true)}
              onMouseLeave={() => setIsForOpen(false)}
            >
              <button
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1 cursor-pointer ${
                  activeTab === 'for-parents' || activeTab === 'for-schools'
                    ? 'bg-amber-600 text-white shadow-sm' 
                    : 'text-slate-700 hover:bg-amber-600/10 hover:text-amber-700'
                }`}
              >
                For
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              
              <AnimatePresence>
                {isForOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-card border border-slate-200/50 rounded-2xl p-2 shadow-xl backdrop-blur-md z-50"
                  >
                    <a
                      href="#features"
                      onClick={() => { setActiveTab('for-parents'); setIsForOpen(false); }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-700 hover:bg-amber-600/10 hover:text-amber-700 transition-all duration-200"
                    >
                      <Users className="w-4 h-4 text-amber-600" />
                      Parents
                    </a>
                    <a
                      href="#contact"
                      onClick={() => { setActiveTab('for-schools'); setIsForOpen(false); }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-700 hover:bg-amber-600/10 hover:text-amber-700 transition-all duration-200"
                    >
                      <Building className="w-4 h-4 text-amber-600" />
                      Schools
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Directory Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDirectoryOpen(true)}
              onMouseLeave={() => setIsDirectoryOpen(false)}
            >
              <button
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1 cursor-pointer ${
                  activeTab.startsWith('directory-')
                    ? 'bg-amber-600 text-white shadow-sm' 
                    : 'text-slate-700 hover:bg-amber-600/10 hover:text-amber-700'
                }`}
              >
                Directory Services
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              
              <AnimatePresence>
                {isDirectoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-card border border-slate-200/50 rounded-2xl p-2 shadow-xl backdrop-blur-md z-50 grid grid-cols-1 gap-1"
                  >
                    {servicesList.map((service, idx) => {
                      const Icon = service.icon;
                      return (
                        <a
                          key={idx}
                          href="#contact"
                          onClick={() => { 
                            setActiveTab(`directory-${idx}`); 
                            setIsDirectoryOpen(false); 
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-amber-600/10 hover:text-amber-700 transition-all duration-200"
                        >
                          <Icon className="w-4 h-4 text-amber-600 flex-shrink-0" />
                          <span>{service.name}</span>
                        </a>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Community */}
            <Link 
              to="/community" 
              onClick={() => setActiveTab('community')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'community' 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'text-slate-700 hover:bg-amber-600/10 hover:text-amber-700'
              }`}
            >
              Community
            </Link>

            {/* Contact */}
            <a 
              href="#contact" 
              onClick={() => setActiveTab('contact')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'contact' 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'text-slate-700 hover:bg-amber-600/10 hover:text-amber-700'
              }`}
            >
              Contact
            </a>

            {/* Book a Demo */}
            <a 
              href="#demo" 
              onClick={() => setActiveTab('demo')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'demo' 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'text-slate-700 hover:bg-amber-600/10 hover:text-amber-700'
              }`}
            >
              Events & Newsletters
            </a>

          </div>

          {/* Desktop CTA */}
          <div className="hidden xl:flex flex-1 justify-end items-center space-x-4">
            {currentUser ? (
              <div className="relative">
                {/* Transparent click-outside overlay */}
                {isProfileOpen && (
                  <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsProfileOpen(false)} />
                )}
                
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-1.5 focus:outline-none cursor-pointer relative z-50"
                >
                  <span className="text-sm text-amber-700 font-black bg-amber-600/10 hover:bg-amber-600/20 px-3.5 py-1.5 rounded-full tracking-wider border border-amber-600/20 shadow-sm transition-all select-none hover:scale-105 active:scale-95">
                    {getFirstAndLastLetter(currentUser.displayName || currentUser.email || '')}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-3 w-72 bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800 rounded-2xl p-4 shadow-xl backdrop-blur-md z-50 flex flex-col gap-3"
                    >
                      {/* Profile Header */}
                      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-zinc-800 pb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-base font-extrabold shadow-md">
                          {getFirstAndLastLetter(currentUser.displayName || currentUser.email || '')}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{currentUser.displayName || 'User'}</div>
                          <div className="text-xs text-slate-400 truncate">{currentUser.email}</div>
                        </div>
                      </div>

                      {/* User Type Badge */}
                      {currentUser.user_metadata?.user_type && (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-600/10 px-2.5 py-1 rounded-lg border border-amber-600/20 self-start capitalize">
                          {currentUser.user_metadata.user_type === 'parent' && <Users className="w-3.5 h-3.5" />}
                          {currentUser.user_metadata.user_type === 'school' && <Building className="w-3.5 h-3.5" />}
                          {currentUser.user_metadata.user_type === 'service' && <Briefcase className="w-3.5 h-3.5" />}
                          {(currentUser.user_metadata.user_type === 'educator' || currentUser.user_metadata.user_type === 'special_educator') && <GraduationCap className="w-3.5 h-3.5" />}
                          <span>{currentUser.user_metadata.user_type.replace('_', ' ')}</span>
                        </div>
                      )}

                      <div className="h-px bg-slate-100 dark:bg-zinc-800" />

                      {/* Actions */}
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          setIsEditModalOpen(true);
                        }}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-amber-600/10 hover:text-amber-700 transition-all text-left cursor-pointer w-full"
                      >
                        <UserIcon className="w-4 h-4 text-amber-600" />
                        Edit Profile Details
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          logOut();
                        }}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-red-650 hover:bg-red-50 hover:text-red-700 transition-all text-left cursor-pointer w-full border border-transparent hover:border-red-100"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="ghost" className="text-gray-700 hover:text-amber-600 font-bold">
                    Sign In
                  </Button>
                </Link>
                <Link to="/get-started">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-full px-6 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300">
                    Get Verified Access
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex-1 flex justify-end">
            <button
              className="text-gray-700 p-2 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden py-6 border-t border-gray-200 max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col space-y-4 px-2">
              <a 
                href="#features" 
                className="text-gray-700 hover:text-amber-600 font-bold text-sm transition-colors" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#about" 
                className="text-gray-700 hover:text-amber-600 font-bold text-sm transition-colors" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </a>
              
              {/* For Accordion */}
              <div>
                <button 
                  onClick={() => setIsMobileForOpen(!isMobileForOpen)}
                  className="w-full flex items-center justify-between text-gray-700 hover:text-amber-600 font-bold text-sm transition-colors cursor-pointer"
                >
                  <span>For</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileForOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileForOpen && (
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-amber-600/20">
                    <a 
                      href="#features" 
                      className="block py-1 text-gray-600 hover:text-amber-600 text-xs font-semibold" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Parents
                    </a>
                    <a 
                      href="#contact" 
                      className="block py-1 text-gray-600 hover:text-amber-600 text-xs font-semibold" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Schools
                    </a>
                  </div>
                )}
              </div>

              {/* Directory Services Accordion */}
              <div>
                <button 
                  onClick={() => setIsMobileDirectoryOpen(!isMobileDirectoryOpen)}
                  className="w-full flex items-center justify-between text-gray-700 hover:text-amber-600 font-bold text-sm transition-colors cursor-pointer"
                >
                  <span>Directory Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileDirectoryOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileDirectoryOpen && (
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-amber-600/20">
                    {servicesList.map((service, idx) => (
                      <a 
                        key={idx}
                        href="#contact" 
                        className="block py-1 text-gray-600 hover:text-amber-600 text-xs font-semibold" 
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {service.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                to="/community" 
                className="text-gray-700 hover:text-amber-600 font-bold text-sm transition-colors" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Community
              </Link>
              <a 
                href="#contact" 
                className="text-gray-700 hover:text-amber-600 font-bold text-sm transition-colors" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <a 
                href="#demo" 
                className="text-gray-700 hover:text-amber-600 font-bold text-sm transition-colors" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book a Demo
              </a>
              
              {/* Account CTAs */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                {currentUser ? (
                  <>
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Signed In As:</span>
                        <button 
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsEditModalOpen(true);
                          }}
                          className="text-sm text-amber-700 font-black bg-amber-600/10 px-3 py-1 rounded-full tracking-wider border border-amber-600/20 hover:bg-amber-600/20 transition-colors cursor-pointer"
                        >
                          {getFirstAndLastLetter(currentUser.displayName || currentUser.email || '')}
                        </button>
                      </div>
                      <button 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsEditModalOpen(true);
                        }}
                        className="text-xs text-amber-600 font-bold hover:bg-amber-55 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        Edit Profile
                      </button>
                    </div>
                    <Button 
                      onClick={() => {
                        logOut();
                        setIsMobileMenuOpen(false);
                      }} 
                      variant="outline" 
                      className="w-full border-2 border-red-200 hover:border-red-500 text-red-700 rounded-full"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full rounded-full">Sign In</Button>
                    </Link>
                    <Link to="/get-started" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-full">
                        Get Verified Access
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      </div>
    </nav>
  );
}
