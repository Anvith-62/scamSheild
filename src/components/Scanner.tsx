import { motion, AnimatePresence } from 'motion/react';
import { Search, ShieldAlert, ShieldCheck, AlertCircle, ArrowRight, Loader2, Info, Skull, MapPin, Target, Zap, Camera, RefreshCw, X, Plus, Mic, Send } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analyzeScam, type AnalysisResult } from '../services/gemini';

export function Scanner({ externalPrompt }: { externalPrompt?: string }) {
  const location = useLocation();
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Camera State
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mic State (UI only)
  const [isRecording, setIsRecording] = useState(false);

  // React to external prompt changes or navigation state
  useEffect(() => {
    if (externalPrompt) {
      setContent(externalPrompt);
      setResult(null);
      setCapturedImage(null);
    } else if (location.state?.prompt) {
      setContent(location.state.prompt);
      setResult(null);
      setCapturedImage(null);
      // Optional: scroll to analyzer if it's dynamic
    }
  }, [externalPrompt, location.state]);

  const handleAnalyze = async () => {
    if (!content.trim() && !capturedImage) return;
    setIsAnalyzing(true);
    setResult(null);
    setError(null);

    try {
      const data = await analyzeScam(content, capturedImage || undefined);
      setResult(data);
    } catch (err) {
      setError('Failed to analyze. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const startCamera = async () => {
    setShowCamera(true);
    setCapturedImage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError('Could not access camera. Please check permissions.');
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const streams = (videoRef.current.srcObject as MediaStream).getTracks();
      streams.forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        stopCamera();
      }
    }
  };

  const getVerdictStyles = (verdict: string) => {
    switch (verdict) {
      case 'Safe': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Suspicious': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Unsafe': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Malicious': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-white/5 text-white/70 border-white/10';
    }
  };

  return (
    <div id="scanner" className="w-full max-w-5xl mx-auto px-6 mb-20 relative z-10">
      <div className="glass rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-blue/5 blur-[100px] pointer-events-none" />
        
        <div className="relative">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
              <Search className="w-5 h-5 text-cyber-blue" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display">Nexlore Forensic Intelligence</h3>
              <p className="text-white/40 text-xs">Run real-time deep scans on any suspected threat</p>
            </div>
          </div>

          {/* Forensic Visual Evidence Preview */}
          <AnimatePresence>
            {(showCamera || capturedImage) && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <div className="relative aspect-video max-h-[300px] w-full rounded-2xl overflow-hidden glass border-cyber-blue/20">
                  {showCamera ? (
                    <>
                      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                      <div className="absolute inset-0 border-2 border-cyber-blue/30 pointer-events-none" />
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
                        <button onClick={capturePhoto} className="w-12 h-12 rounded-full bg-cyber-blue flex items-center justify-center shadow-lg active:scale-90 transition-all">
                          <div className="w-8 h-8 rounded-full border-2 border-black/20" />
                        </button>
                        <button onClick={stopCamera} className="w-12 h-12 rounded-full bg-red-500/20 backdrop-blur-md flex items-center justify-center border border-red-500/40">
                          <X className="w-5 h-5 text-red-400" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <img src={capturedImage!} className="w-full h-full object-cover" />
                      <button onClick={() => setCapturedImage(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* New Chat-style Input Bar */}
          <div className="relative group">
            <div className="flex items-center gap-2 p-2 glass rounded-3xl border-white/10 group-hover:border-cyber-blue/30 transition-all focus-within:border-cyber-blue/50 focus-within:ring-1 focus-within:ring-cyber-blue/10">
              
              {/* Left Action: Plus */}
              <button 
                title="Attach"
                className="w-10 h-10 flex items-center justify-center rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                <Plus className="w-5 h-5" />
              </button>

              {/* Text Input Area */}
              <div className="flex-1 px-2">
                <input 
                  type="text" 
                  className="w-full bg-transparent border-none outline-none py-3 text-white placeholder:text-white/20 text-sm font-medium"
                  placeholder="Paste message, URL, or ask Nexlore..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                />
              </div>

              {/* Right Actions: Camera, Talk, Send */}
              <div className="flex items-center gap-1">
                <button 
                  onClick={startCamera}
                  title="Camera Scan"
                  className="w-10 h-10 flex items-center justify-center rounded-2xl text-white/40 hover:text-cyber-blue hover:bg-cyber-blue/5 transition-all cursor-pointer"
                >
                  <Camera className="w-5 h-5" />
                </button>
                
                <button 
                  onClick={() => setIsRecording(!isRecording)}
                  title="Voice Analysis"
                  className={`w-10 h-10 flex items-center justify-center rounded-2xl transition-all cursor-pointer ${isRecording ? 'text-red-500 bg-red-500/10 animate-pulse' : 'text-white/40 hover:text-cyber-blue hover:bg-cyber-blue/5'}`}
                >
                  <Mic className="w-5 h-5" />
                </button>

                <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || (!content.trim() && !capturedImage)}
                  className={`ml-2 w-10 h-10 flex items-center justify-center rounded-2xl bg-cyber-blue text-black hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-30 disabled:hover:scale-100 shadow-[0_0_15px_rgba(0,242,255,0.3)]`}
                >
                  {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      </div>


      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 space-y-8"
          >
            {/* Main Verdict Header */}
            <div className={`glass rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between border ${getVerdictStyles(result.verdict)}`}>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-current/10 border border-current shadow-[0_0_20px_rgba(currentColor,0.2)]">
                  {result.verdict === 'Safe' ? <ShieldCheck className="w-10 h-10" /> : <ShieldAlert className="w-10 h-10" />}
                </div>
                <div>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-60">Forensic Verdict</span>
                  <h2 className="text-4xl font-black font-display tracking-tight">{result.verdict}</h2>
                </div>
              </div>
              <div className="mt-6 md:mt-0 text-center md:text-right">
                <div className="text-6xl font-black font-display lining-nums">{result.scamProbability}%</div>
                <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Scam Confidence Score</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Analysis Details */}
              <div className="lg:col-span-7 space-y-8">
                <div className="glass rounded-[2rem] p-8 shadow-xl">
                  <h4 className="flex items-center gap-2 text-lg font-bold mb-6 font-display">
                    <Info className="w-5 h-5 text-cyber-blue" />
                    Technical Summary
                  </h4>
                  <p className="text-white/70 text-lg leading-relaxed mb-8">{result.summary}</p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Risk Indicators Detectsed</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.warningIndicators.map((indicator, i) => (
                          <span key={i} className="text-xs bg-red-500/5 border border-red-500/20 px-3 py-1.5 rounded-lg text-red-400">
                            {indicator}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Counter-Measures</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {result.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-white/60 bg-white/5 p-3 rounded-xl border border-white/10">
                            <ArrowRight className="w-3 h-3 text-cyber-blue mt-0.5 shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scammer Intelligence Profile */}
              <div className="lg:col-span-5">
                <div className="glass rounded-[2rem] p-8 bg-black/40 border-red-500/10 h-full relative overflow-hidden group hover:border-red-500/30 transition-all duration-500">
                  <div className="absolute top-0 right-0 p-8">
                    <Skull className="w-24 h-24 text-red-500/5 group-hover:text-red-500/10 transition-colors" />
                  </div>
                  
                  <div className="relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                      <Zap className="w-3 h-3" /> Scammer Intel Profile
                    </div>

                    <h3 className="text-2xl font-bold font-display mb-8">Forensic Profiling</h3>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5 text-cyber-blue" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">Likely Origin</div>
                          <div className="text-sm font-medium">{result.scammerIntelligence.likelyOrigin}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <Target className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">Target Persona</div>
                          <div className="text-sm font-medium">{result.scammerIntelligence.targetAudience}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <Skull className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">Core Tactic</div>
                          <div className="text-sm font-medium">{result.scammerIntelligence.tacticUsed}</div>
                        </div>
                      </div>

                      <div className="mt-8 pt-8 border-t border-white/10">
                        <div className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-2">Detailed Risk Score</div>
                        <div className="text-lg font-bold font-display text-cyber-blue">{result.scammerIntelligence.estimatedRiskScore}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="mt-6 p-4 glass border-red-500/20 text-red-400 text-sm text-center rounded-xl"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}
