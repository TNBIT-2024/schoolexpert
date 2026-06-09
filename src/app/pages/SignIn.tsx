import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logoImg from '../../../public/schoolexpert_logo.png';

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

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signInWithEmail, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      return setError('Please enter both email and password.');
    }
    setError('');
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to sign in. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Google Sign-In failed.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="h-[100dvh] flex flex-col md:flex-row font-geist w-[100dvw] bg-slate-50 dark:bg-zinc-950 overflow-hidden">
      {/* Left column: sign-in form */}
      <section className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-pink-50/20 dark:from-zinc-900/10 dark:via-zinc-900/5 dark:to-zinc-900/20">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <div className="animate-element animate-delay-100 flex justify-start">
              <Link to="/">
                <img src={logoImg} alt="The School Expert" className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 hover:scale-105" style={{ filter: 'url(#remove-white)' }} />
              </Link>
            </div>

            <h1 className="animate-element animate-delay-200 text-4xl md:text-5xl font-bold leading-tight text-slate-900 dark:text-slate-50 tracking-tight">
              Welcome back
            </h1>
            <p className="animate-element animate-delay-300 text-slate-500 dark:text-slate-400">
              Access your account and continue your journey with us
            </p>

            {/* Error Message */}
            {error && (
              <div className="animate-element animate-delay-300 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm text-center font-medium">
                {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSignIn}>
              <div className="animate-element animate-delay-400">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2 block">Email Address</label>
                <GlassInputWrapper>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-slate-800 dark:text-slate-100"
                    required
                  />
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-500">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2 block">Password</label>
                <GlassInputWrapper>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none text-slate-800 dark:text-slate-100"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-600 flex items-center justify-between text-sm">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="rememberMe" className="custom-checkbox" />
                  <span className="text-slate-600 dark:text-slate-300 font-medium select-none">Keep me signed in</span>
                </label>
                <a href="#" className="hover:underline text-blue-600 dark:text-blue-400 font-semibold transition-colors">
                  Reset password
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="animate-element animate-delay-700 w-full rounded-2xl bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 py-4 font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-[0.99] transition-all disabled:opacity-50 shadow-md"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="animate-element animate-delay-800 relative flex items-center justify-center py-2">
              <span className="w-full border-t border-slate-200 dark:border-zinc-800"></span>
              <span className="px-4 text-xs font-semibold text-slate-400 bg-slate-50 dark:bg-zinc-950 uppercase tracking-wider absolute">
                Or continue with
              </span>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="animate-element animate-delay-900 w-full flex items-center justify-center gap-3 border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/50 rounded-2xl py-4 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-zinc-900 active:scale-[0.99] transition-all shadow-sm"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <p className="animate-element animate-delay-1000 text-center text-sm text-slate-500 dark:text-slate-400">
              New to our platform?{' '}
              <Link to="/get-started" className="text-blue-600 dark:text-blue-400 font-bold hover:underline transition-colors">
                Create Account
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
            backgroundImage: `url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1000&auto=format&fit=crop&q=80')`,
          }}
        >
          {/* Subtle dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-slate-900/10 backdrop-brightness-[0.95]" />
        </div>
      </section>

    </div>
  );
}
