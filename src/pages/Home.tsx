import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Stats } from '../components/Features';
import { SecurityNotice } from '../components/SecurityNotice';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-cyber-blue/10 blur-[150px] rounded-full -z-10" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 flex items-center gap-2 glass px-4 py-1.5 rounded-full border-white/10"
        >
          <ShieldCheck className="w-4 h-4 text-cyber-blue" />
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/70">
            Trusted by 500k+ global users
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black font-display mb-8 tracking-tighter leading-[0.9]"
        >
          Detect Scams <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-white to-blue-500 animate-gradient">
            Before They Detect You
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12"
        >
          Nexlore provides instant forensic intelligence to identify fraudulent links, messages, and social engineering threats.
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate('/scan')}
            className="cyber-button text-lg px-10 py-5 flex items-center gap-3 cursor-pointer"
          >
            Launch Analyzer <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => navigate('/intelligence')}
            className="glass px-10 py-5 rounded-full font-bold hover:bg-white/10 transition-colors cursor-pointer"
          >
            Explore Intelligence
          </button>
        </div>
      </section>

      <Stats />

      <SecurityNotice />

      {/* Final CTA */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto relative group">
          <div className="absolute inset-0 bg-cyber-blue/20 blur-[100px] rounded-full group-hover:bg-cyber-blue/30 transition-all duration-700" />
          <div className="glass rounded-[3rem] p-12 md:p-24 text-center border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <ShieldCheck className="w-32 h-32 text-cyber-blue/5" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black font-display mb-8">Ready to shield yourself?</h2>
            <p className="text-white/60 mb-12 text-lg max-w-xl mx-auto">Join the 500k+ users who trust Nexlore to protect their digital legacy every single day.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/scan')}
                className="cyber-button text-lg px-10 py-5 flex items-center gap-3 cursor-pointer"
              >
                Start Scanning Free <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
