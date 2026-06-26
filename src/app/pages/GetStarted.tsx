import React, { useState, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Eye, EyeOff, User as UserIcon, Mail, Phone, MapPin, Lock, ArrowRight, ArrowLeft, Users, Building, Briefcase, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
const logoImg = '/logo svg.svg';

// --- HELPER COMPONENTS (ICONS) ---

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s12-5.373 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
  </svg>
);

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm transition-all focus-within:border-blue-500 focus-within:bg-white shadow-sm">
    {children}
  </div>
);

export function GetStarted() {
  const location = useLocation();
  const queryType = new URLSearchParams(location.search).get('type');

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'parent' | 'school' | 'service' | 'educator' | 'special_educator' | null>(
    (location.state?.userType === 'school' || queryType === 'school') ? 'school' : null
  );
  const [serviceType, setServiceType] = useState<string>('');
  const [schoolType, setSchoolType] = useState<string>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    city: '',
  });

  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const updateFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setError('Please provide both email and password.');
    }
    setError('');
    setLoading(true);
    try {
      // Create user authentication in Supabase and pass user metadata
      await signUpWithEmail(formData.email, formData.password, {
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        userType: userType,
        serviceType: userType === 'service' ? serviceType : null,
        schoolType: userType === 'school' ? schoolType : null,
      });
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col md:flex-row font-geist w-[100dvw] bg-slate-50 dark:bg-zinc-950 overflow-hidden">
      {/* Left column: registration form steps */}
      <section className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-pink-50/20 dark:from-zinc-900/10 dark:via-zinc-900/5 dark:to-zinc-900/20 overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          <div className="flex flex-col gap-6">
            {/* Logo and Progress Bar */}
            <div className="animate-element animate-delay-100 flex items-center justify-between">
              <Link to="/">
                <img src={logoImg} alt="The School Expert" className="h-20 md:h-30 w-auto object-contain transition-transform duration-300 hover:scale-105" style={{ filter: 'url(#remove-white)' }} />
              </Link>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Step {step} of 3
              </div>
            </div>

            {/* Dynamic Step Headings */}
            {step === 1 && (
              <>
                <h1 className="animate-element animate-delay-200 text-3xl md:text-4xl font-bold leading-tight text-slate-900 dark:text-slate-50 tracking-tight">
                  Choose your profile
                </h1>
                <p className="animate-element animate-delay-300 text-slate-500 dark:text-slate-400">
                  Select how you will be using The School Expert to customize your experience.
                </p>
              </>
            )}

            {step === 2 && (
              <>
                <h1 className="animate-element animate-delay-100 text-3xl md:text-4xl font-bold leading-tight text-slate-900 dark:text-slate-50 tracking-tight">
                  Personal details
                </h1>
                <p className="animate-element animate-delay-200 text-slate-500 dark:text-slate-400">
                  Tell us a bit about yourself to help us guide your school search.
                </p>
              </>
            )}

            {step === 3 && (
              <>
                <h1 className="animate-element animate-delay-100 text-3xl md:text-4xl font-bold leading-tight text-slate-900 dark:text-slate-50 tracking-tight">
                  Secure your account
                </h1>
                <p className="animate-element animate-delay-200 text-slate-500 dark:text-slate-400">
                  Choose a password and finalize your verified access.
                </p>
              </>
            )}

            {/* Error Message */}
            {error && (
              <div className="animate-element p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm text-center font-medium">
                {error}
              </div>
            )}

            {/* Step 1: Select Profile */}
            {step === 1 && (
              <div className="space-y-4">
                <label className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1.5 block  tracking-wider">I'm...</label>

                <button
                  type="button"
                  onClick={() => setUserType('parent')}
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 active:scale-[0.99] flex items-center justify-between ${
                    userType === 'parent'
                      ? 'border-amber-600 bg-amber-500/10 shadow-sm'
                      : 'border-slate-200 bg-white/40 hover:border-amber-500/20 hover:bg-white/60'
                  }`}
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-[#F5EFEB]/60 border border-slate-200/60 rounded-xl flex items-center justify-center text-amber-600">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100">A Parent</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Search schools and read reviews</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${userType === 'parent' ? 'border-amber-600 bg-amber-600 text-slate-950' : 'border-slate-300'}`}>
                    {userType === 'parent' && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setUserType('school')}
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 active:scale-[0.99] flex items-center justify-between ${
                    userType === 'school'
                      ? 'border-amber-600 bg-amber-500/10 shadow-sm'
                      : 'border-slate-200 bg-white/40 hover:border-amber-500/20 hover:bg-white/60'
                  }`}
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-[#F5EFEB]/60 border border-slate-200/60 rounded-xl flex items-center justify-center text-amber-600">
                      <Building className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100">A School</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage details and admission requests</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${userType === 'school' ? 'border-amber-600 bg-amber-600 text-slate-950' : 'border-slate-300'}`}>
                    {userType === 'school' && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                </button>

                {userType === 'school' && (
                  <div className="animate-element mt-3">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 block">Select your School Type</label>
                    <div className="rounded-2xl border border-slate-200 bg-white/60 backdrop-blur-sm p-1.5">
                      <select
                        value={schoolType}
                        onChange={(e) => setSchoolType(e.target.value)}
                        className="w-full bg-transparent text-sm p-2.5 rounded-xl focus:outline-none text-slate-800 font-medium cursor-pointer"
                        required
                      >
                        <option value="" disabled>-- Select a School --</option>
                        <option value="Regular School">Regular School</option>
                        <option value="Alternative School">Alternative School</option>
                        <option value="Preschool/Nursery School">Preschool/Nursery School</option>
                        <option value="Special School">Special School</option>
                      </select>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setUserType('educator')}
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 active:scale-[0.99] flex items-center justify-between ${
                    userType === 'educator'
                      ? 'border-amber-600 bg-amber-500/10 shadow-sm'
                      : 'border-slate-200 bg-white/40 hover:border-amber-500/20 hover:bg-white/60'
                  }`}
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-[#F5EFEB]/60 border border-slate-200/60 rounded-xl flex items-center justify-center text-amber-600">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100">An Educator / A Teacher</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Connect with schools and students</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${userType === 'educator' ? 'border-amber-600 bg-amber-600 text-slate-950' : 'border-slate-300'}`}>
                    {userType === 'educator' && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setUserType('special_educator')}
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 active:scale-[0.99] flex items-center justify-between ${
                    userType === 'special_educator'
                      ? 'border-amber-600 bg-amber-500/10 shadow-sm'
                      : 'border-slate-200 bg-white/40 hover:border-amber-500/20 hover:bg-white/60'
                  }`}
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-[#F5EFEB]/60 border border-slate-200/60 rounded-xl flex items-center justify-center text-amber-600">
                      <GraduationCap className="w-6 h-6 text-purple-650" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100">A Special Educator</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Support and teach students with special needs</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${userType === 'special_educator' ? 'border-amber-600 bg-amber-600 text-slate-950' : 'border-slate-300'}`}>
                    {userType === 'special_educator' && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setUserType('service')}
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 active:scale-[0.99] flex items-center justify-between ${
                    userType === 'service'
                      ? 'border-amber-600 bg-amber-500/10 shadow-sm'
                      : 'border-slate-200 bg-white/40 hover:border-amber-500/20 hover:bg-white/60'
                  }`}
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-[#F5EFEB]/60 border border-slate-200/60 rounded-xl flex items-center justify-center text-amber-600">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100">A Service Provider</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Offer educational services and solutions</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${userType === 'service' ? 'border-amber-600 bg-amber-600 text-slate-950' : 'border-slate-300'}`}>
                    {userType === 'service' && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                </button>

                {userType === 'service' && (
                  <div className="animate-element mt-3">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 block">Select your Service Type</label>
                    <div className="rounded-2xl border border-slate-200 bg-white/60 backdrop-blur-sm p-1.5">
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full bg-transparent text-sm p-2.5 rounded-xl focus:outline-none text-slate-800 font-medium cursor-pointer"
                        required
                      >
                        <option value="" disabled>-- Select a Service --</option>
                        <option value="EdTech Companies">EdTech Companies</option>
                        <option value="School ERP Providers">School ERP Providers</option>
                        <option value="Educational Publishers">Educational Publishers</option>
                        <option value="Teacher Training Companies">Teacher Training Companies</option>
                        <option value="Skill Development Providers">Skill Development Providers</option>
                        <option value="International Education Consultants">International Education Consultants</option>
                        <option value="Infrastructure / School Equipment Vendors">Infrastructure / School Equipment Vendors</option>
                        <option value="Career Coaching & Counselling">Career Coaching & Counselling</option> 
                        <option value="Mental health professionals">Mental health professionals</option>
                        <option value="Individual course providers">Individual course providers</option>
                        
                      </select>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!userType || (userType === 'service' && !serviceType)}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-slate-900 text-white py-4 font-semibold hover:bg-slate-800 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-md mt-6"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Personal Details */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2 block">Full Name</label>
                  <GlassInputWrapper>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-transparent text-sm p-4 pl-11 rounded-2xl focus:outline-none text-slate-800 dark:text-slate-100"
                        required
                      />
                    </div>
                  </GlassInputWrapper>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2 block">Email Address</label>
                  <GlassInputWrapper>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-transparent text-sm p-4 pl-11 rounded-2xl focus:outline-none text-slate-800 dark:text-slate-100"
                        required
                      />
                    </div>
                  </GlassInputWrapper>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2 block">Phone Number</label>
                  <GlassInputWrapper>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-transparent text-sm p-4 pl-11 rounded-2xl focus:outline-none text-slate-800 dark:text-slate-100"
                        required
                      />
                    </div>
                  </GlassInputWrapper>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2 block">City</label>
                  <GlassInputWrapper>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => updateFormData('city', e.target.value)}
                        placeholder="Mumbai"
                        className="w-full bg-transparent text-sm p-4 pl-11 rounded-2xl focus:outline-none text-slate-800 dark:text-slate-100"
                        required
                      />
                    </div>
                  </GlassInputWrapper>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/70 py-4 font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.99] transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={!formData.name || !formData.email || !formData.phone || !formData.city}
                    className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-slate-900 text-white py-4 font-semibold hover:bg-slate-800 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-md"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Create Password & Finalize */}
            {step === 3 && (
              <form onSubmit={handleRegister} className="space-y-4">

                <div>
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2 block">Password</label>
                  <GlassInputWrapper>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => updateFormData('password', e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-transparent text-sm p-4 pl-11 pr-12 rounded-2xl focus:outline-none text-slate-800 dark:text-slate-100"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </GlassInputWrapper>
                </div>

                <div className="py-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required className="custom-checkbox mt-1" />
                    <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed select-none">
                      I agree to the{' '}
                      <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                    </span>
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/70 py-4 font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.99] transition-all disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !formData.password}
                    className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-slate-900 text-white py-4 font-semibold hover:bg-slate-800 active:scale-[0.99] transition-all disabled:opacity-50 shadow-md"
                  >
                    {loading ? 'Creating...' : 'Register'}
                  </button>
                </div>
              </form>
            )}

            <p className="animate-element animate-delay-1000 text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/signin" className="text-blue-600 dark:text-blue-400 font-bold hover:underline transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Right column: hero image */}
      <section className="hidden md:block flex-1 relative p-4 bg-slate-100 dark:bg-zinc-900">
        <div
          className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center shadow-xl overflow-hidden"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1000&auto=format&fit=crop&q=80')`,
          }}
        >
          {/* Subtle dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-slate-900/10 backdrop-brightness-[0.95]" />
        </div>
      </section>
    </div>
  );
}
