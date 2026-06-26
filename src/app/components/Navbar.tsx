import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
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
  ArrowRight,
  Compass,
  Heart,
  Award,
  Calendar,
  Mail,
  Megaphone,
  Users,
  User as UserIcon,
  LogOut,
  Briefcase
} from 'lucide-react';
import { Button } from './ui/button';
const logoImg = '/logo svg.svg';
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
  { name: 'Career Coaching & Counselling', icon: Compass },
  { name: 'Mental health professionals', icon: Heart },
  { name: 'Individual course providers', icon: Award },
];

const othersList = [
  { name: 'Events', icon: Calendar },
  { name: 'Newsletters', icon: Mail },
  { name: 'Parents Corner', icon: Heart },
  { name: 'Homeschooling Resources', icon: BookOpen },
  { name: 'Announcements', icon: Megaphone },
];

function Banner3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D particle coordinates setup
    const particleCount = 100;
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      phase: number;
      speed: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 45,
        z: Math.random() * 400 - 200,
        baseX: 0,
        baseY: 0,
        phase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.4,
      });
      particles[i].baseX = particles[i].x;
      particles[i].baseY = particles[i].y;
    }

    const focalLength = 260;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.012;

      // Project and draw particles
      particles.forEach((p) => {
        // 3D Wave/Sine oscillations
        const z = p.z + Math.sin(time * p.speed + p.phase) * 60;
        const x = p.baseX + Math.cos(time * p.speed + p.phase) * 40;
        const y = p.baseY + Math.sin(time * 1.5 * p.speed + p.phase) * 12;

        // Slow rotation around the vertical Y axis
        const angle = time * 0.05;
        const rotX = x * Math.cos(angle) - z * Math.sin(angle);
        const rotZ = x * Math.sin(angle) + z * Math.cos(angle);

        // Perspective Projection calculation
        const scale = focalLength / (focalLength + rotZ + 250);
        const screenX = width / 2 + rotX * scale;
        const screenY = height / 2 + y * scale;

        // Render point if within bounds
        if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
          const size = Math.max(0.4, scale * 2.2);
          const opacity = Math.min(0.85, Math.max(0.08, scale * 0.7));

          ctx.beginPath();
          ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${opacity})`; // Warm amber/orange glow
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50" style={{ mixBlendMode: 'screen' }} />;
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [isOthersOpen, setIsOthersOpen] = useState(false);
  const [isMobileDirectoryOpen, setIsMobileDirectoryOpen] = useState(false);
  const [isMobileOthersOpen, setIsMobileOthersOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { currentUser, logOut } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    if (location.pathname === '/community') {
      setActiveTab('community');
    } else if (location.pathname === '/features') {
      setActiveTab('features');
    } else if (location.pathname === '/AboutUs' || location.pathname === '/about') {
      setActiveTab('about');
    } else if (location.pathname === '/contact') {
      setActiveTab('contact');
    } else {
      setActiveTab('');
    }
  }, [location]);

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
    <>
      {/* Announcement Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed top-0 left-0 right-0 z-[60] overflow-hidden"
          >
            <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-100 py-3 relative overflow-hidden flex items-center justify-center">
              {/* 3D Particle Canvas Background */}
              <Banner3DCanvas />

              {/* Custom Keyframe style injected directly */}
              <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scroll-marquee {
                  0% { transform: translate3d(0, 0, 0); }
                  100% { transform: translate3d(-33.3333%, 0, 0); }
                }
              `}} />

              {/* Seamless Marquee Loop */}
              <a
                href="/#founding-partners"
                onClick={() => setActiveTab('founding-partners')}
                className="w-full relative z-10 flex overflow-hidden cursor-pointer select-none group"
              >
                <div
                  className="flex whitespace-nowrap gap-16 font-black uppercase text-[10px] sm:text-xs tracking-[0.25em] text-amber-100/90 group-hover:text-white transition-colors duration-300"
                  style={{
                    animation: 'scroll-marquee 30s linear infinite',
                  }}
                >
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-center gap-16">
                      <span className="flex items-center gap-3">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                        FOUNDING PARTNERS PROGRAM NOW LIVE
                      </span>
                      <span className="flex items-center gap-1.5 text-amber-300">
                        APPLY VIA EMAIL <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                      </span>
                    </div>
                  ))}
                </div>
              </a>

              {/* Dismiss button */}
              <button
                onClick={() => setShowBanner(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-100 transition-colors duration-200 p-1 cursor-pointer z-20 bg-amber-950/80 rounded-full border border-amber-800/30 backdrop-blur-sm"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-card/85 backdrop-blur-lg shadow-md border-b border-slate-200/50'
            : 'bg-transparent'
          }`}
        style={{ top: showBanner ? '38px' : '0px' }}
      >
        <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex-1 flex justify-start">
              <Link to="/" className="flex items-center">
                <img
                  src={logoImg}
                  alt="The School Expert"
                  className="h-24 md:h-32 w-auto object-contain transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex flex-none items-center bg-[#FAF6F0]/65 border border-slate-200/40 rounded-full p-1 backdrop-blur-md mx-4 shadow-sm relative">

              {/* Features */}
              <Link
                to="/features"
                onClick={() => setActiveTab('features')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'features'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-amber-600/10 hover:text-amber-700'
                  }`}
              >
                Features
              </Link>

              {/* About Us */}
              <Link
                to="/meet-the-founder"
                onClick={() => setActiveTab('about')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'about'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-amber-600/10 hover:text-amber-700'
                  }`}
              >
                About Us
              </Link>


              {/* Directory Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsDirectoryOpen(true)}
                onMouseLeave={() => setIsDirectoryOpen(false)}
              >
                <button
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1 cursor-pointer ${activeTab.startsWith('directory-')
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
                          <Link
                            key={idx}
                            to="/contact"
                            onClick={() => {
                              setActiveTab(`directory-${idx}`);
                              setIsDirectoryOpen(false);
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-amber-600/10 hover:text-amber-700 transition-all duration-200"
                          >
                            <Icon className="w-4 h-4 text-amber-600 flex-shrink-0" />
                            <span>{service.name}</span>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Others Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsOthersOpen(true)}
                onMouseLeave={() => setIsOthersOpen(false)}
              >
                <button
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1 cursor-pointer ${activeTab.startsWith('others-')
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-amber-600/10 hover:text-amber-700'
                    }`}
                >
                  Others
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                <AnimatePresence>
                  {isOthersOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-card border border-slate-200/50 rounded-2xl p-2 shadow-xl backdrop-blur-md z-50 grid grid-cols-1 gap-1"
                    >
                      {othersList.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            to="/contact"
                            onClick={() => {
                              setActiveTab(`others-${idx}`);
                              setIsOthersOpen(false);
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-amber-600/10 hover:text-amber-700 transition-all duration-200"
                          >
                            <Icon className="w-4 h-4 text-amber-600 flex-shrink-0" />
                            <span>{item.name}</span>
                          </Link>
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
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'community'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-amber-600/10 hover:text-amber-700'
                  }`}
              >
                Community
              </Link>



              {/* Contact */}
              <Link
                to="/contact"
                onClick={() => setActiveTab('contact')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'contact'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-amber-600/10 hover:text-amber-700'
                  }`}
              >
                Contact
              </Link>


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
                    className="flex items-center gap-1.5 focus:outline-none cursor-pointer relative z-50 transition-all duration-200"
                  >
                    {currentUser.avatarUrl ? (
                      <img
                        src={currentUser.avatarUrl}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border border-amber-600/25 shadow-sm hover:scale-105 transition-all duration-200"
                      />
                    ) : (
                      <span className="text-sm text-amber-700 font-black bg-amber-600/10 hover:bg-amber-600/20 px-3.5 py-1.5 rounded-full tracking-wider border border-amber-600/20 shadow-sm transition-all select-none hover:scale-105 active:scale-95">
                        {getFirstAndLastLetter(currentUser.displayName || currentUser.email || '')}
                      </span>
                    )}
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
                          {currentUser.avatarUrl ? (
                            <img
                              src={currentUser.avatarUrl}
                              alt="Profile"
                              className="w-12 h-12 rounded-xl object-cover shadow-md border border-slate-100 dark:border-zinc-800"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-base font-extrabold shadow-md">
                              {getFirstAndLastLetter(currentUser.displayName || currentUser.email || '')}
                            </div>
                          )}
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
                <Link
                  to="/features"
                  className="text-gray-700 hover:text-amber-600 font-bold text-sm transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  to="/AboutUs"
                  className="text-gray-700 hover:text-amber-600 font-bold text-sm transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>


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
                        <Link
                          key={idx}
                          to="/contact"
                          className="block py-1 text-gray-600 hover:text-amber-600 text-xs font-semibold"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Others Accordion */}
                <div>
                  <button
                    onClick={() => setIsMobileOthersOpen(!isMobileOthersOpen)}
                    className="w-full flex items-center justify-between text-gray-700 hover:text-amber-600 font-bold text-sm transition-colors cursor-pointer"
                  >
                    <span>Others</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileOthersOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isMobileOthersOpen && (
                    <div className="pl-4 mt-2 space-y-2 border-l-2 border-amber-600/20">
                      {othersList.map((item, idx) => (
                        <Link
                          key={idx}
                          to="/contact"
                          className="block py-1 text-gray-600 hover:text-amber-600 text-xs font-semibold"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
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

                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-amber-600 font-bold text-sm transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>

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
                            className="flex items-center justify-center cursor-pointer transition-transform duration-200"
                          >
                            {currentUser.avatarUrl ? (
                              <img
                                src={currentUser.avatarUrl}
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover border border-amber-600/25 shadow-sm"
                              />
                            ) : (
                              <span className="text-sm text-amber-700 font-black bg-amber-600/10 px-3 py-1 rounded-full tracking-wider border border-amber-600/20 hover:bg-amber-600/20 transition-colors select-none">
                                {getFirstAndLastLetter(currentUser.displayName || currentUser.email || '')}
                              </span>
                            )}
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
        </div>
        <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      </nav>
    </>
  );
}