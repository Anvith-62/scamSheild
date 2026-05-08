import { motion } from 'motion/react';
import { AlertTriangle, ShieldCheck, Skull, Ban, Eye, HandMetal } from 'lucide-react';

const warnings = [
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: "Beware of Frauds",
    text: "Never share your OTP, password, or private keys with anyone. Officials will never ask for sensitive data via message or call."
  },
  {
    icon: <Skull className="w-6 h-6" />,
    title: "Avoid Betting Scams",
    text: "Refrain from 'get-rich-quick' betting schemes or investment apps promising unrealistic returns. They are designed to drain your wallet."
  },
  {
    icon: <Ban className="w-6 h-6" />,
    title: "Phishing Links",
    text: "Check URL spellings carefully. Scammers often use look-alike domains like 'micros0ft.com' instead of 'microsoft.com'."
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Emotional Manipulation",
    text: "Scammers use fear (account locked) or greed (lottery won) to bypass your logic. Stay calm and verify through official channels."
  },
  {
    icon: <HandMetal className="w-6 h-6" />,
    title: "Job Scams",
    text: "Legitimate employers never ask for payment or 'processing fees' before hiring you. If they ask for money, it's a scam."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Verify First",
    text: "Always use Nexlore to scan any suspicious message or link before taking action. Seconds of verification save years of regret."
  }
];

export function SecurityNotice() {
  return (
    <section className="py-24 px-6 relative z-10 bg-black/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
          >
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black font-display mb-4 uppercase tracking-tighter">
            Security <span className="text-red-500">Advisory</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto">
            The best defense is awareness. Follow these guidelines to stay protected in the digital wilderness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {warnings.map((warning, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl border-white/5 hover:border-red-500/20 transition-all group"
            >
              <div className="text-red-500/60 group-hover:text-red-500 transition-colors mb-4 transform group-hover:scale-110 duration-300">
                {warning.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-red-400 transition-colors">{warning.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{warning.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
