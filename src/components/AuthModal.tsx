import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, Github, Chrome, ArrowRight, User } from 'lucide-react';
import { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass w-full max-w-md rounded-[2.5rem] p-8 md:p-10 relative border-white/10 shadow-2xl bg-black"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-display mb-2">
                {mode === 'login' ? 'Welcome Back' : 'Join the Shield'}
              </h2>
              <p className="text-white/50 text-sm">
                {mode === 'login' 
                  ? 'Access your personalized threat dashboard' 
                  : 'Start your journey to zero-scam digital life'}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <button className="w-full flex items-center justify-center gap-3 glass py-3 rounded-2xl hover:bg-white/10 transition-colors border-white/5 cursor-pointer">
                <Chrome className="w-5 h-5 text-cyber-blue" />
                <span className="font-medium text-sm">Continue with Google</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 glass py-3 rounded-2xl hover:bg-white/10 transition-colors border-white/5 cursor-pointer">
                <Github className="w-5 h-5" />
                <span className="font-medium text-sm">Continue with GitHub</span>
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-white/30 tracking-widest font-bold">Or email</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {mode === 'signup' && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="cyber-input !py-3 !pl-12 !text-sm"
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="cyber-input !py-3 !pl-12 !text-sm"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="cyber-input !py-3 !pl-12 !text-sm"
                />
              </div>
              
              <button className="cyber-button w-full flex items-center justify-center gap-2 mt-4 cursor-pointer">
                <span>{mode === 'login' ? 'Secure Login' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-8 text-center text-sm">
              <span className="text-white/40">
                {mode === 'login' ? "Don't have an account? " : "Already shielded? "}
              </span>
              <button 
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-cyber-blue font-bold hover:underline cursor-pointer"
              >
                {mode === 'login' ? 'Sign Up' : 'Log In'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
