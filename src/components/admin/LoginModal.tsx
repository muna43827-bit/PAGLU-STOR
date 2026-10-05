import React, { useState } from 'react';
import { Crown, Eye, EyeOff, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [identifier, setIdentifier] = useState('you@example.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your email or mobile number');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    onLoginSuccess(identifier.trim());
    onClose();
  };

  const handleForgot = () => {
    setForgotSent(true);
    setTimeout(() => setForgotSent(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Background glowing orb */}
      <div className="absolute w-72 h-72 rounded-full bg-[#FFC928]/10 blur-3xl pointer-events-none"></div>

      <div className="glass-card-elevated max-w-sm w-full rounded-3xl border border-[#292E3A] p-7 relative shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#A8ADBA] hover:text-[#F7F7F7] p-1.5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Crown Logo & Header matching Reference Screen 1 */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFDF67] to-[#FFC928] flex items-center justify-center text-[#07080C] shadow-xl shadow-[#FFC928]/30 mb-3">
            <Crown className="w-7 h-7 fill-current" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#F7F7F7] tracking-tight">
            QuickStore
          </h2>
          <p className="text-xs text-[#A8ADBA] mt-0.5">Your Business, Online.</p>
        </div>

        {error && (
          <div className="mb-4 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs text-center">
            {error}
          </div>
        )}

        {forgotSent && (
          <div className="mb-4 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center">
            Password reset link sent to your registered contact!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-[#A8ADBA] uppercase tracking-wider mb-1.5">
              Email / Mobile Number
            </label>
            <input
              type="text"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-[#10131A] border border-[#292E3A] text-xs text-[#F7F7F7] placeholder-[#A8ADBA]/40 focus:outline-none focus:border-[#FFC928] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#A8ADBA] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 pr-10 rounded-xl bg-[#10131A] border border-[#292E3A] text-xs text-[#F7F7F7] placeholder-[#A8ADBA]/40 focus:outline-none focus:border-[#FFC928] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-[#A8ADBA] hover:text-[#F7F7F7]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#FFC928] hover:bg-[#FFDF67] text-[#07080C] text-xs font-bold shadow-lg shadow-[#FFC928]/25 active:scale-95 transition-all cursor-pointer mt-2"
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center space-y-2">
          <button
            type="button"
            onClick={handleForgot}
            className="text-[11px] text-[#A8ADBA] hover:text-[#FFDF67] transition-colors cursor-pointer"
          >
            Forgot Password?
          </button>

          <p className="text-xs text-[#A8ADBA]">
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#FFC928] font-bold hover:underline cursor-pointer ml-1"
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
