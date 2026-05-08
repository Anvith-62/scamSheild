import { Features } from '../components/Features';
import { Alerts } from '../components/Trust';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function Intelligence() {
  const navigate = useNavigate();

  const handleFeatureClick = (prompt: string) => {
    // Navigate to scan page with state
    navigate('/scan', { state: { prompt } });
  };

  return (
    <div className="pt-40">
      <div className="max-w-4xl mx-auto text-center px-6 mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black font-display mb-6 uppercase tracking-tighter"
        >
          Cyber <span className="text-cyber-blue">Intelligence</span>
        </motion.h1>
        <p className="text-white/50 text-lg">
          The comprehensive arsenal of Nexlore forensic tools designed to shield your digital presence.
        </p>
      </div>

      <Features onFeatureClick={handleFeatureClick} />
      <Alerts />
    </div>
  );
}
