import { motion } from 'motion/react';
import { Scanner } from '../components/Scanner';
import { Info } from 'lucide-react';

export default function Analyzer() {
  return (
    <div className="pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black font-display mb-6"
        >
          Nexlore <span className="text-cyber-blue">Forensic</span> Analyzer
        </motion.h1>
        <p className="text-white/50 text-lg">
          Deploy our advanced intelligence matrix to dissect suspicious message, URLs, and images.
        </p>
      </div>

      <Scanner />

      <div className="max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass p-6 rounded-2xl border-white/5">
          <div className="w-10 h-10 rounded-lg bg-cyber-blue/10 flex items-center justify-center mb-4">
            <Info className="w-5 h-5 text-cyber-blue" />
          </div>
          <h3 className="font-bold mb-2">Textual Forensics</h3>
          <p className="text-white/40 text-sm">Our AI analyzes linguistic patterns, urgency cues, and social engineering tactics in real-time.</p>
        </div>
        <div className="glass p-6 rounded-2xl border-white/5">
          <div className="w-10 h-10 rounded-lg bg-cyber-blue/10 flex items-center justify-center mb-4">
            <Info className="w-5 h-5 text-cyber-blue" />
          </div>
          <h3 className="font-bold mb-2">Visual intelligence</h3>
          <p className="text-white/40 text-sm">Use the forensic camera to scan QR codes, suspicious login screens, or printed documents.</p>
        </div>
        <div className="glass p-6 rounded-2xl border-white/5">
          <div className="w-10 h-10 rounded-lg bg-cyber-blue/10 flex items-center justify-center mb-4">
            <Info className="w-5 h-5 text-cyber-blue" />
          </div>
          <h3 className="font-bold mb-2">URL Sandbox</h3>
          <p className="text-white/40 text-sm">Each link is scanned against 50+ global blacklists and analyzed for hidden redirects.</p>
        </div>
      </div>
    </div>
  );
}
