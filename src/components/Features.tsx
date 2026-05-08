import { motion } from 'motion/react';
import { Link, Briefcase, FileText, Mail, Globe, ShieldCheck, Users, Zap, Target, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <Link className="w-6 h-6" />,
    title: "Link Scanner",
    description: "Real-time analysis of suspicious URLs using our global threat database and AI behavioral detection.",
    prompt: "Scan this URL: https://secure-bank-login-verify.com/account"
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Fake Job Detector",
    description: "Identify fraudulent work-from-home offers and phishing attempts disguised as recruitment.",
    prompt: "I received a job offer from 'Global Solutions Inc' on WhatsApp. They are asking for a $200 'home office setup fee' before I start. Is this safe?"
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Screenshot Analysis",
    description: "Upload screenshots of messages or emails. Our AI extracts and analyzes text for social engineering cues.",
    prompt: "Analyze the screenshot provided (Please use the camera icon in the scanner to capture the screenshot content)."
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Fraud Detection",
    description: "Advanced spoofing detection and header analysis to verify sender legitimacy instantly.",
    prompt: "Email from: security@micros0ft-support.ru. Subject: Urgent Security Violation on Your Account. Content: Please reset your password immediately."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Reports",
    description: "Verified crowd-sourced threat intelligence platform to track emerging scam patterns globally.",
    prompt: "What are the latest reported scams in my area?"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Real-Time Protection",
    description: "On-the-fly protection that blocks malicious requests before they can interact with your system.",
    prompt: "Verify system integrity and check for any active phishing attempts."
  }
];

export function Features({ onFeatureClick }: { onFeatureClick: (prompt: string) => void }) {
  return (
    <section id="features" className="py-24 relative z-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-cyber-blue text-sm font-bold tracking-[0.3em] uppercase mb-4 block"
          >
            Core Infrastructure
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 font-display"
          >
            Fortified Security for the Digital Age
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-white/50 max-w-2xl mx-auto text-lg"
          >
            Leverage billion-dollar AI algorithms designed to stay ten steps ahead of malicious entities.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.button
              key={i}
              onClick={() => onFeatureClick(feature.prompt)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-[2rem] border-white/5 hover:border-cyber-blue/30 transition-all duration-500 group relative text-left cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-cyber-blue transition-colors duration-500">
                <div className="text-cyber-blue group-hover:text-black transition-colors duration-500">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 font-display group-hover:text-cyber-blue transition-colors">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{feature.description}</p>
              
              <div className="flex items-center gap-2 text-cyber-blue font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                Try it now <ArrowRight className="w-4 h-4" />
              </div>

              {/* Highlight line */}
              <div className="absolute bottom-0 left-8 right-8 h-1 bg-cyber-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-full" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  const stats = [
    { label: "Scams Detected", value: "2M+", icon: <Target className="w-5 h-5" /> },
    { label: "Users Protected", value: "500K+", icon: <Users className="w-5 h-5" /> },
    { label: "AI Accuracy", value: "99%", icon: <Zap className="w-5 h-5" /> },
    { label: "Threats Blocked", value: "24/7", icon: <ShieldCheck className="w-5 h-5" /> }
  ];

  return (
    <section className="py-24 relative z-10 px-6">
      <div className="max-w-7xl mx-auto glass rounded-[3rem] p-12 md:p-20 grid grid-cols-2 md:grid-cols-4 gap-12 text-center border-white/5 shadow-2xl overflow-hidden relative">
        {/* Animated background glow */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyber-blue/10 blur-[120px] rounded-full pointer-events-none"
        />

        {stats.map((stat, i) => (
          <div key={i} className="relative z-10">
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-cyber-blue border border-white/10">
                {stat.icon}
              </div>
            </div>
            <div className="text-4xl md:text-5xl font-bold font-display mb-2 tracking-tight">{stat.value}</div>
            <div className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
