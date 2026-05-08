import { motion } from 'motion/react';
import { Search, Info, MessageSquare, LogIn, Menu, X, UserPlus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthModal from './AuthModal';
import { NexloreLogo } from './Logo';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'signup' }>({
    open: false,
    mode: 'login',
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Scan', path: '/scan' },
    { name: 'Intelligence', path: '/intelligence' },
    { name: 'Help', path: '/help' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`glass rounded-full px-6 py-3 flex items-center justify-between border-white/5 shadow-2xl transition-all duration-300 ${isScrolled ? 'bg-black/60 backdrop-blur-2xl' : 'bg-white/5'}`}>
            {/* Logo */}
            <Link 
              to="/"
              className="flex items-center gap-2 group cursor-pointer"
            >
              <NexloreLogo className="group-hover:scale-105 transition-transform" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`transition-colors text-sm font-medium tracking-wide uppercase cursor-pointer ${location.pathname === link.path ? 'text-cyber-blue shadow-[0_2px_0_rgba(0,242,255,0.5)]' : 'text-white/70 hover:text-cyber-blue'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Actions (Top Right Modules) */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4 border-r border-white/10 pr-4">
                <button 
                  onClick={() => setAuthModal({ open: true, mode: 'login' })}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-medium text-sm cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button 
                  onClick={() => setAuthModal({ open: true, mode: 'signup' })}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-medium text-sm cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              </div>

              <button 
                onClick={() => navigate('/scan')}
                className="cyber-button !py-2 !px-5 text-sm"
              >
                Launch Analyzer
              </button>
              <button 
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 right-0 px-6 py-4 mt-2"
          >
            <div className="glass rounded-3xl p-6 flex flex-col gap-4 shadow-2xl">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium text-left transition-colors ${location.pathname === link.path ? 'text-cyber-blue' : 'text-white/70 hover:text-cyber-blue'}`}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-white/10" />
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => { setAuthModal({ open: true, mode: 'login' }); setMobileMenuOpen(false); }}
                  className="flex items-center justify-center gap-2 glass py-3 rounded-xl text-white/70 hover:text-white"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button 
                onClick={() => { setAuthModal({ open: true, mode: 'signup' }); setMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 glass py-3 rounded-xl text-white/70 hover:text-white"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      <AuthModal 
        isOpen={authModal.open} 
        onClose={() => setAuthModal({ ...authModal, open: false })}
        initialMode={authModal.mode}
      />
    </>
  );
}

export function Footer() {
  return (
    <footer id="footer" className="relative z-10 border-t border-white/10 pt-20 pb-10 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <NexloreLogo />
          </div>
          <p className="text-white/50 text-sm leading-relaxed">
            Advanced forensic intelligence dedicated to identifying and neutralizing digital threats globally.
          </p>
          <div className="mt-6 flex flex-col gap-1">
            <span className="text-white/30 text-[10px] uppercase font-bold">Contact Support</span>
            <a href="mailto:trendhut7997@gmail.com" className="text-cyber-blue hover:underline text-sm font-medium">trendhut7997@gmail.com</a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold mb-6 uppercase text-xs tracking-[0.2em] text-white/40">Product</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><Link to="/scan" className="hover:text-cyber-blue transition-colors cursor-pointer text-left">Analyzer</Link></li>
            <li><Link to="/intelligence" className="hover:text-cyber-blue transition-colors cursor-pointer text-left">Features</Link></li>
            <li><a href="#" className="hover:text-cyber-blue transition-colors">Enterprise</a></li>
            <li><a href="#" className="hover:text-cyber-blue transition-colors">API Access</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold mb-6 uppercase text-xs tracking-[0.2em] text-white/40">Company</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><a href="#" className="hover:text-cyber-blue transition-colors">About</a></li>
            <li><a href="#" className="hover:text-cyber-blue transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-cyber-blue transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-cyber-blue transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold mb-6 uppercase text-xs tracking-[0.2em] text-white/40">Newsletter</h4>
          <p className="text-white/50 text-sm mb-4">Stay ahead of threats.</p>
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Nexlore Intel!'); }}>
            <input 
              type="email" 
              required
              placeholder="Email address" 
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyber-blue/50 w-full"
            />
            <button type="submit" className="bg-cyber-blue p-2 rounded-lg text-black hover:scale-105 transition-transform cursor-pointer">
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 flex flex-col md:flex-row items-center justify-between text-white/30 text-xs gap-4">
        <p>© 2026 Nexlore. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

