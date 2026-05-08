import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CyberBackground from './components/CyberBackground';
import { Navbar, Footer } from './components/Layout';
import { CyberHUD } from './components/Trust';
import { Chatbox } from './components/Chatbox';

// Pages
import Home from './pages/Home';
import Analyzer from './pages/Analyzer';
import Intelligence from './pages/Intelligence';
import Help from './pages/Help';

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen selection:bg-cyber-blue/30">
        <CyberBackground />
        <CyberHUD />
        <Navbar />
        <Chatbox />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<Analyzer />} />
            <Route path="/intelligence" element={<Intelligence />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

