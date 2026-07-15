import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
const logoImg = '/schoolexpert_logo.png';
import { toast } from 'sonner';

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm transition-all focus-within:border-blue-500 focus-within:bg-white shadow-sm">
    {children}
  </div>
);

export function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      return setError('Please fill in both password fields.');
    }
    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }

    setError('');
    setLoading(true);
    try {
      await updatePassword(password);
      toast.success('Your password has been reset successfully!');
      // Navigate to home page as the user is automatically logged in after reset
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to reset password. The link may have expired.');
      toast.error(err.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col md:flex-row font-geist w-[100dvw] bg-slate-50 dark:bg-zinc-950 overflow-hidden">
      {/* Left column: form */}
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
              Set new password
            </h1>
            <p className="animate-element animate-delay-300 text-slate-500 dark:text-slate-400">
              Please enter your new password below.
            </p>

            {/* Error Message */}
            {error && (
              <div className="animate-element animate-delay-300 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm text-center font-medium">
                {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleResetPassword}>
              <div className="animate-element animate-delay-400">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2 block">New Password</label>
                <GlassInputWrapper>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full bg-transparent text-sm p-4 pl-11 pr-12 rounded-2xl focus:outline-none text-slate-800 dark:text-slate-100"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-500">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2 block">Confirm New Password</label>
                <GlassInputWrapper>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full bg-transparent text-sm p-4 pl-11 pr-12 rounded-2xl focus:outline-none text-slate-800 dark:text-slate-100"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </GlassInputWrapper>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="animate-element animate-delay-600 w-full rounded-2xl bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 py-4 font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-[0.99] transition-all disabled:opacity-50 shadow-md cursor-pointer"
              >
                {loading ? 'Updating Password...' : 'Reset Password'}
              </button>
            </form>

            <p className="animate-element animate-delay-800 text-center text-sm text-slate-500 dark:text-slate-400">
              Remember your password?{' '}
              <Link to="/signin" className="text-blue-600 dark:text-blue-400 font-bold hover:underline transition-colors">
                Back to Sign In
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
