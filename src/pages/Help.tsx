import { FAQ } from '../components/Trust';
import { motion } from 'motion/react';
import { ShieldCheck, Mail, MessageSquare } from 'lucide-react';

export default function Help() {
  return (
    <div className="pt-40">
      <div className="max-w-4xl mx-auto text-center px-6 mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black font-display mb-6 uppercase"
        >
          Security <span className="text-cyber-blue">Support</span>
        </motion.h1>
        <p className="text-white/50 text-lg">
          Need assistance or reported a false positive? Our team is available 24/7.
        </p>
      </div>

      <FAQ />

      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-[2rem] border-white/5 text-center group hover:border-cyber-blue/30 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-cyber-blue transition-colors">
              <Mail className="w-8 h-8 text-cyber-blue group-hover:text-black" />
            </div>
            <h3 className="text-xl font-bold mb-2">Priority Support</h3>
            <p className="text-white/40 text-sm mb-4">Email our response team directly for enterprise escalations.</p>
            <span className="text-cyber-blue font-bold">support@nexlore.cyber</span>
          </div>

          <div className="glass p-8 rounded-[2rem] border-white/5 text-center group hover:border-cyber-blue/30 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-cyber-blue transition-colors">
              <MessageSquare className="w-8 h-8 text-cyber-blue group-hover:text-black" />
            </div>
            <h3 className="text-xl font-bold mb-2">Community Shield</h3>
            <p className="text-white/40 text-sm mb-4">Join 50k+ security experts sharing threat intelligence.</p>
            <span className="text-cyber-blue font-bold">discord.gg/nexlore</span>
          </div>

          <div className="glass p-8 rounded-[2rem] border-white/5 text-center group hover:border-cyber-blue/30 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-cyber-blue transition-colors">
              <ShieldCheck className="w-8 h-8 text-cyber-blue group-hover:text-black" />
            </div>
            <h3 className="text-xl font-bold mb-2">Security Status</h3>
            <p className="text-white/40 text-sm mb-4">Real-time status of our global scanning network.</p>
            <span className="text-green-500 font-bold uppercase text-xs">All Systems Operational</span>
          </div>
        </div>
      </section>
    </div>
  );
}
