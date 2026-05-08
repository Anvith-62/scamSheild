import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Clock, ShieldCheck, ChevronDown, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

export function Alerts() {
  const recentAlerts = [
    { title: "New Phishing Campaign", type: "Email", threat: "High", time: "2m ago" },
    { title: "Suspicious PDF Attachment", type: "Malware", threat: "Critical", time: "15m ago" },
    { title: "Bank Redirect Scam", type: "URL", threat: "High", time: "44m ago" },
  ];

  return (
    <section id="threat-feed" className="py-24 relative z-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
            <h2 className="text-3xl font-bold font-display">Live Threat Feed</h2>
          </div>
          
          <div className="space-y-4">
            {recentAlerts.map((alert, i) => (
              <div key={i} className="glass p-5 rounded-2xl border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${alert.threat === 'Critical' ? 'bg-red-500' : 'bg-orange-500'}`} />
                  <div>
                    <h4 className="font-bold text-sm tracking-tight">{alert.title}</h4>
                    <p className="text-white/40 text-xs uppercase tracking-wider mt-1">{alert.type} • {alert.threat} Level</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/30 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-3xl font-bold font-display mb-8">Testimonials</h2>
          <div className="glass p-8 rounded-[2rem] relative">
            <p className="text-white/70 text-lg leading-relaxed mb-6 italic">
              "Nexlore caught a fake CEO fraud email that almost cost our company $50k. The accuracy is terrifyingly good. A must-have for every professional."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-cyber-blue/20 border border-cyber-blue/30 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
              </div>
              <div>
                <h4 className="font-bold">Marcus Sterling</h4>
                <p className="text-white/40 text-xs tracking-wider uppercase">Head of Security, TechCorp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { 
    q: "How does the AI detect scams?", 
    a: "Our AI uses large language models trained on millions of confirmed fraud cases, analyzing sentiment, urgency markers, and technical indicators (like URL obfuscation) in real-time."
  },
  {
    q: "Is my data stored during analysis?",
    a: "No. We utilize a 'Privacy-First' architecture. Data is analyzed in memory and immediately discarded. We only keep anonymized metadata to improve global detection patterns."
  },
  {
    q: "Does it work for WhatsApp messages?",
    a: "Yes. You can copy and paste any message from messaging apps like WhatsApp, Telegram, or Discord into our scanner for instant validation."
  },
  {
    q: "Can I use Nexlore for my enterprise?",
    a: "Absolutely. We offer API access and enterprise-grade integration for organizations through our Nexlore Pro program."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative z-10 px-6 max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold font-display text-center mb-16 underline decoration-cyber-blue underline-offset-8">Common Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="glass rounded-2xl overflow-hidden border-white/5">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <span className="font-bold tracking-tight">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-cyber-blue transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 text-white/60 text-sm leading-relaxed"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CyberHUD() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-20 flex items-center justify-center">
      <div className="w-[80vw] h-[80vw] border-[0.5px] border-cyber-blue/10 rounded-full absolute animate-[spin_60s_linear_infinite]" />
      <div className="w-[60vw] h-[60vw] border-[0.5px] border-cyber-blue/20 rounded-full absolute animate-[spin_40s_linear_infinite_reverse]" />
      <div className="w-[40vw] h-[40vw] border-[0.5px] border-cyber-blue/30 rounded-full absolute animate-[spin_20s_linear_infinite]" />
      
      {/* Corner Brackets */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-cyber-blue/40" />
      <div className="absolute top-10 right-10 w-20 h-20 border-t border-r border-cyber-blue/40" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b border-l border-cyber-blue/40" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-cyber-blue/40" />
      
      {/* HUD Gauges */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-1 w-4 bg-cyber-blue/20" />
        ))}
      </div>
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-1 w-4 bg-cyber-blue/20" />
        ))}
      </div>
    </div>
  );
}
