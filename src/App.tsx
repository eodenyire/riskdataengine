import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  RefreshCw, 
  Share2, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Settings, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  Menu,
  X,
  Server,
  Cloud,
  FileCode2,
  FileUp,
  FileDown,
  Mail,
  HardDrive,
  ExternalLink,
  ShieldAlert,
  Search,
  Filter,
  ArrowUpRight,
  LayoutDashboard,
  ClipboardList,
  Network,
  Activity,
  Play,
  RotateCcw,
  MoreVertical,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Pause,
  CircleStop,
  ScrollText
} from 'lucide-react';
import { useState, useEffect } from 'react';

// --- Types ---
interface Job {
  id: string;
  name: string;
  type: string;
  scenario: 'copy' | 'sync' | 'convert';
  status: 'completed' | 'running' | 'queued' | 'failed' | 'paused' | 'scheduled';
  source: string;
  target: string;
  progress: number;
  timestamp: string;
  threads: number;
  outputFormat?: string;
  scheduledAt?: string;
}

interface Connection {
  id: string;
  name: string;
  type: string;
  host: string;
  port: string;
  username: string;
  status: 'Online' | 'Standby' | 'Offline';
}

// --- Components ---

const ConnectionWizard = ({ isOpen, onClose, onCreated, connections }: { isOpen: boolean, onClose: () => void, onCreated: () => void, connections: Connection[] }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'PostgreSQL',
    host: '',
    port: '',
    username: '',
    password: ''
  });

  const handleSubmit = async () => {
    try {
      await fetch('/api/connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      onCreated();
      onClose();
      setFormData({ name: '', type: 'PostgreSQL', host: '', port: '', username: '', password: '' });
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-surface-line w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl"
      >
        <div className="p-8 border-b border-surface-line flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-xl font-display font-bold text-slate-900 uppercase tracking-tight">Add Persistence Node</h3>
            <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-widest">Configure Secure Database Tunnel</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"><X /></button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2">Connection Identifier</label>
              <input 
                type="text" 
                placeholder="e.g., Regional Core SQL" 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2">Node Type</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 text-sm focus:outline-none focus:border-brand-500"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option value="PostgreSQL">PostgreSQL</option>
                <option value="MySQL">MySQL</option>
                <option value="Oracle">Oracle</option>
                <option value="SQL Server">SQL Server</option>
                <option value="MongoDB">MongoDB</option>
                <option value="Azure SQL">Azure SQL</option>
              </select>
            </div>
            <div>
                 <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2">Port</label>
                 <input 
                  type="text" 
                  placeholder="e.g., 5432" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 text-sm focus:outline-none focus:border-brand-500"
                  value={formData.port}
                  onChange={e => setFormData({...formData, port: e.target.value})}
                />
            </div>
            <div className="col-span-2">
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2">Host Endpoint</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g., db.equity.internal" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 text-sm focus:outline-none focus:border-brand-500 transition-all pl-12"
                  value={formData.host}
                  onChange={e => setFormData({...formData, host: e.target.value})}
                />
                <Server className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2">Auth Username</label>
              <input 
                type="text" 
                placeholder="svc_risk_engine" 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 text-sm focus:outline-none focus:border-brand-500"
                value={formData.username}
                onChange={e => setFormData({...formData, username: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2">Auth Secret</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 text-sm focus:outline-none focus:border-brand-500"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-slate-100 bg-slate-50 flex justify-end gap-4">
          <button onClick={onClose} className="px-6 py-3 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">Cancel</button>
          <button 
            onClick={handleSubmit}
            disabled={!formData.name || !formData.host}
            className="bg-brand-500 text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-600 shadow-lg shadow-brand-500/20 disabled:opacity-50 transition-all font-display"
          >
            Encrypt & Save Node
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const JobWizard = ({ isOpen, onClose, onCreated, connections }: { isOpen: boolean, onClose: () => void, onCreated: () => void, connections: Connection[] }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Database Migration', 
    scenario: 'copy',
    source: '',
    target: '',
    transformations: ['Data Cleaning'],
    distributions: ['Local Folder'],
    outputFormat: 'JSON',
    threads: 4,
    dataFilter: '',
    isScheduled: false,
    scheduledAt: new Date(Date.now() + 86400000).toISOString().slice(0, 16) // Default to tomorrow
  });

  const toggleTransform = (t: string) => {
    setFormData(prev => ({
      ...prev,
      transformations: prev.transformations.includes(t) 
        ? prev.transformations.filter(x => x !== t) 
        : [...prev.transformations, t]
    }));
  };

  const toggleDist = (d: string) => {
    setFormData(prev => ({
      ...prev,
      distributions: prev.distributions.includes(d) 
        ? prev.distributions.filter(x => x !== d) 
        : [...prev.distributions, d]
    }));
  };

  const handleSubmit = async () => {
    try {
      await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      onCreated();
      onClose();
      setStep(1);
      setFormData({ 
        name: '', 
        type: 'Database Migration', 
        scenario: 'copy',
        source: '', 
        target: '', 
        transformations: ['Data Cleaning'], 
        distributions: ['Local Folder'], 
        outputFormat: 'JSON',
        threads: 4,
        dataFilter: '',
        isScheduled: false,
        scheduledAt: new Date(Date.now() + 86400000).toISOString().slice(0, 16)
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-surface-line w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl"
      >
        <div className="p-10 border-b border-surface-line flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-2xl font-display font-bold text-slate-900 uppercase tracking-tight">Configure Ingestion Engine</h3>
            <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-widest font-bold">DB Sync | File Convert</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><X /></button>
        </div>

        <div className="p-10 bg-white max-h-[60vh] overflow-y-auto custom-scrollbar">
          <div className="flex gap-4 mb-10">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`h-1.5 flex-1 rounded-full ${step >= i ? 'bg-brand-500' : 'bg-slate-200'}`} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-3 text-center">Pipeline Architecture Selection</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'sync', label: 'DB Sync', icon: <Zap />, desc: 'One-way or bidirectional alignment.' },
                      { id: 'convert', label: 'File Convert', icon: <FileCode2 />, desc: 'Format conversion (JSON/XML/Excel).' },
                      { id: 'copy', label: 'Migration', icon: <RefreshCw />, desc: 'One-source, one-destination move.' },
                    ].map(s => (
                      <button 
                        key={s.id}
                        onClick={() => setFormData({...formData, scenario: s.id as any})}
                        className={`p-6 rounded-3xl border transition-all text-left group ${formData.scenario === s.id ? 'border-brand-500 bg-brand-50 scale-[1.02]' : 'border-slate-200 bg-white opacity-60 hover:opacity-100'}`}
                      >
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 transition-colors ${formData.scenario === s.id ? 'bg-brand-500 text-white' : 'bg-slate-50 text-slate-400'}`}>
                          {s.icon}
                        </div>
                        <p className={`font-bold text-sm tracking-tight ${formData.scenario === s.id ? 'text-brand-600' : 'text-slate-700'}`}>{s.label}</p>
                        <p className="text-[9px] text-slate-500 mt-1 leading-tight">{s.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-3">Job Identity Tag</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="e.g., RISK_ASSESSMENT_SYNC_01" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-all pl-12"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                    <Settings className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="p-4 bg-brand-50 border border-brand-100 rounded-2xl flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white shrink-0">
                      <Database className="w-4 h-4" />
                   </div>
                   <p className="text-[10px] font-bold text-brand-700 uppercase tracking-tight">Scenario: {formData.scenario.toUpperCase()} MODE ACTIVE</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                       SOURCE <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </label>
                    <div className="space-y-3">
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 text-sm focus:outline-none focus:border-brand-500"
                        onChange={e => setFormData({...formData, source: e.target.value})}
                        value={formData.source}
                      >
                        <option value="">Select Connection...</option>
                        {connections.map(c => (
                          <option key={c.id} value={c.name}>{c.name} ({c.type})</option>
                        ))}
                      </select>
                      <button className="text-[9px] font-bold text-brand-500 underline ml-2 hover:text-brand-700">Add New Connection +</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                       TARGET <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                    </label>
                    <div className="space-y-3">
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 text-sm focus:outline-none focus:border-brand-500"
                        onChange={e => setFormData({...formData, target: e.target.value})}
                        value={formData.target}
                      >
                        <option value="">Select Destination...</option>
                        {connections.map(c => (
                          <option key={c.id} value={c.name}>{c.name} ({c.type})</option>
                        ))}
                      </select>
                      {formData.scenario === 'convert' && (
                        <div className="flex gap-2 pt-2">
                          {['JSON', 'XML', 'CSV', 'EXCEL'].map(format => (
                            <button 
                              key={format}
                              onClick={() => setFormData({...formData, outputFormat: format})}
                              className={`flex-1 py-2 rounded-lg border text-[10px] font-bold transition-all ${formData.outputFormat === format ? 'bg-brand-500 text-white border-brand-600' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}`}
                            >
                              {format}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-200">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-[0.2em] flex items-center gap-3">
                      <Cpu className="w-4 h-4 text-brand-500" /> Parallel Engine Configuration
                    </h4>
                    <span className="bg-brand-500 text-white px-3 py-1 rounded-full text-[10px] font-bold">{formData.threads} Threads</span>
                  </div>
                  <input 
                    type="range" min="1" max="32" step="1"
                    value={formData.threads}
                    onChange={(e) => setFormData({...formData, threads: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
                  />
                  <div className="flex justify-between text-[8px] font-bold text-slate-400 mt-2 uppercase tracking-widest">
                    <span>Low Priority</span>
                    <span>Multi-Core Optimization Active</span>
                    <span>High Concurrency</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-3">Custom Data Filters (WHERE)</label>
                    <textarea 
                      placeholder="e.g. status = 'active' AND last_sync > '2023-01-01'"
                      className="w-full h-32 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 text-xs font-mono focus:outline-none focus:border-brand-500 focus:bg-white resize-none"
                      value={formData.dataFilter}
                      onChange={e => setFormData({...formData, dataFilter: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Post-Processing Scripts</label>
                    <div className="grid grid-cols-1 gap-2">
                      {['PII Masking', 'Null Mapping', 'Field Normalization', 'Trigger Update'].map(t => (
                        <button 
                          key={t}
                          onClick={() => toggleTransform(t)}
                          className={`p-3 rounded-xl border text-[10px] font-bold uppercase tracking-wider text-left transition-all flex items-center justify-between ${formData.transformations.includes(t) ? 'bg-brand-50 border-brand-500 text-brand-600' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                        >
                          {t}
                          {formData.transformations.includes(t) && <Check className="w-4 h-4 text-brand-500" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                 <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-3 text-brand-600 flex items-center gap-2">
                    <Share2 className="w-4 h-4" /> Distribution Logic (Fan-out)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'Risk Email Group', icon: <Mail className="w-4 h-4" /> },
                      { id: 'Regional OneDrive', icon: <Cloud className="w-4 h-4" /> },
                      { id: 'Local SMB Share', icon: <HardDrive className="w-4 h-4" /> },
                      { id: 'Remote FTP Node', icon: <ExternalLink className="w-4 h-4" /> },
                    ].map(d => (
                      <button 
                        key={d.id}
                        onClick={() => toggleDist(d.id)}
                        className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${formData.distributions.includes(d.id) ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}`}
                      >
                        {d.icon}
                        <span className="text-[10px] font-bold uppercase tracking-wider">{d.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-8 bg-slate-50 border border-slate-200 rounded-[2rem] space-y-4">
                   <h4 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-3">Operational Summary</h4>
                   <div className="grid grid-cols-2 gap-y-4 text-[11px] font-bold">
                      <div className="text-slate-400 uppercase">Scenario:</div> <div className="text-brand-600 uppercase italic">{formData.scenario}</div>
                      <div className="text-slate-400 uppercase">Parallelism:</div> <div className="text-slate-900">{formData.threads} Thread Engine</div>
                      <div className="text-slate-400 uppercase">Audit Trail:</div> <div className="text-emerald-600">Compliance Verified</div>
                   </div>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-200">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col">
                      <h4 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-[0.2em] flex items-center gap-3">
                        <Settings className="w-4 h-4 text-brand-500" /> Operational Schedule
                      </h4>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Set execution window for ingestion logic</p>
                    </div>
                    <button 
                      onClick={() => setFormData({...formData, isScheduled: !formData.isScheduled})}
                      className={`relative w-12 h-6 rounded-full transition-colors ${formData.isScheduled ? 'bg-brand-500' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${formData.isScheduled ? 'translate-x-6' : ''}`} />
                    </button>
                  </div>

                  <AnimatePresence>
                    {formData.isScheduled && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="space-y-4 pt-4 border-t border-slate-200">
                          <div className="flex gap-4">
                            <div className="flex-1">
                               <label className="block text-[8px] font-extrabold text-slate-500 uppercase tracking-widest mb-2">Target Implementation Window</label>
                               <input 
                                type="datetime-local" 
                                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-mono focus:outline-none focus:border-brand-500"
                                value={formData.scheduledAt}
                                onChange={e => setFormData({...formData, scheduledAt: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {!formData.isScheduled && (
                    <div className="flex items-center gap-3 text-emerald-600 text-[10px] font-bold uppercase tracking-widest bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                       <Play className="w-3.5 h-3.5" /> Execute Immediately after authorization
                    </div>
                  )}
                </div>

                <div className="bg-white border border-surface-line rounded-3xl p-8 space-y-4">
                  <h4 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-widest pb-4 border-b border-slate-100">Final Validation Summary</h4>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-[11px]">
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                       <span className="text-slate-400 font-bold uppercase tracking-widest">Execute At:</span>
                       <span className="text-slate-900 font-black">{formData.isScheduled ? new Date(formData.scheduledAt).toLocaleString() : 'Immediate Deployment'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                       <span className="text-slate-400 font-bold uppercase tracking-widest">Auth:</span>
                       <span className="text-emerald-500 font-black flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Approved</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-10 border-t border-slate-100 bg-slate-50 flex justify-between">
          <button 
            onClick={() => step > 1 && setStep(step - 1)}
            disabled={step === 1}
            className="px-8 py-3 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-900 disabled:opacity-30 transition-all"
          >
            Go Back
          </button>
          
          {step < 5 ? (
            <button 
              onClick={() => setStep(step + 1)}
              disabled={!formData.name || (step === 2 && (!formData.source || !formData.target))}
              className="bg-brand-500 text-white px-10 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brand-600 shadow-lg shadow-brand-500/20 disabled:opacity-50 transition-all font-display"
            >
              Next Phase
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              className="bg-brand-500 text-white px-10 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brand-600 shadow-lg shadow-brand-500/20 transition-all font-display"
            >
              {formData.isScheduled ? 'Confirm & Schedule' : 'Authorize & Deploy Pipeline'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'jobs', label: 'Ingestion Jobs', icon: <ClipboardList className="w-5 h-5" /> },
    { id: 'connectivity', label: 'Connectivity', icon: <Network className="w-5 h-5" /> },
    { id: 'logs', label: 'System Logs', icon: <ShieldAlert className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 border-r border-surface-line bg-white flex flex-col h-screen fixed top-0 left-0 z-50">
      <div className="p-8 border-b border-surface-line flex items-center justify-center bg-slate-50/50">
        <div className="flex flex-col items-center">
          <div className="h-10 flex items-center justify-center mb-2">
             <img 
               src="https://logo.clearbit.com/equitygroupholdings.com" 
               alt="Equity Logo" 
               className="h-full object-contain"
               referrerPolicy="no-referrer"
             />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-mono font-bold text-brand-600 uppercase tracking-[0.2em]">Risk & Compliance</span>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === item.id 
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-surface-line">
        <div className="bg-slate-50 rounded-2xl p-4 border border-surface-line">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-extrabold text-slate-600 uppercase tracking-widest">v4.3 Engine</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed font-mono">Sync active on 12 nodes. Integrity verified.</p>
        </div>
      </div>
    </aside>
  );
};

const Header = () => {
  return (
    <header className="h-24 border-b border-surface-line bg-white/80 backdrop-blur-xl sticky top-0 z-40 pl-64">
      <div className="h-full px-8 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            <div className="h-10 flex items-center shrink-0">
               <img 
                 src="https://logo.clearbit.com/equitygroupholdings.com" 
                 alt="Equity Group Holdings" 
                 className="h-full object-contain"
                 referrerPolicy="no-referrer"
               />
            </div>
            <div className="h-8 w-px bg-surface-line mx-2" />
            <div className="flex flex-col">
              <h1 className="text-sm font-display font-black text-slate-900 tracking-widest leading-none">RISK ENGINE</h1>
              <span className="text-[9px] font-mono font-bold text-brand-500 tracking-[0.2em] mt-1.5 uppercase">Data Ingestion v4.3</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl border border-surface-line w-80 group focus-within:border-brand-500/50 shadow-sm transition-all">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-brand-500" />
            <input 
              type="text" 
              placeholder="Query database records..." 
              className="bg-transparent border-none text-xs text-slate-800 focus:outline-none w-full placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 px-4 py-2 border-r border-surface-line">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Mainframe Active</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[11px] font-bold text-slate-900">Risk Analyst</p>
              <p className="text-[9px] text-brand-600 font-mono uppercase tracking-widest font-bold">compliance.unit@equity.com</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 border border-surface-line flex items-center justify-center overflow-hidden shadow-sm">
               <img src="https://picsum.photos/seed/equity/100/100" alt="Avatar" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const JobCard = ({ job, onStart, onRetry, onPause, onCancel, onViewLogs, ...props }: { 
  job: Job, 
  onStart: (id: string) => any, 
  onRetry: (id: string) => any,
  onPause: (id: string) => any,
  onCancel: (id: string) => any,
  onViewLogs: (id: string) => any,
  [key: string]: any 
}) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'running': return 'bg-brand-50 text-brand-600 border-brand-100';
      case 'failed': return 'bg-red-50 text-red-600 border-red-100';
      case 'paused': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'scheduled': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getScenarioIcon = (scenario: string) => {
    switch (scenario) {
      case 'copy': return <RefreshCw className="w-4 h-4" />;
      case 'sync': return <Zap className="w-4 h-4" />;
      case 'convert': return <FileCode2 className="w-4 h-4" />;
      default: return <RefreshCw className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white border border-surface-line p-6 rounded-3xl hover:border-brand-500/30 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-[0.15em] border ${getStatusStyle(job.status)}`}>
              {job.status}
            </div>
            <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
               {getScenarioIcon(job.scenario)}
               {job.scenario}
            </div>
          </div>
          <h4 className="text-lg font-display font-bold text-slate-900 leading-tight">{job.name}</h4>
          <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-widest flex items-center gap-2">
            {job.type} <span className="w-1 h-1 rounded-full bg-slate-300" /> {job.threads} Threads Engaged
          </p>
        </div>
        <button className="text-slate-400 hover:text-slate-600 p-1">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2 text-slate-400 font-medium">
            <Database className="w-3.5 h-3.5 text-emerald-500" />
            {job.source}
          </div>
          <ArrowRight className="w-3 h-3 text-brand-500" />
          <div className="flex items-center gap-2 text-slate-400 font-medium text-right">
            {job.target}
            <Server className="w-3.5 h-3.5 text-brand-500" />
          </div>
        </div>
        <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${job.progress}%` }}
            className={`h-full transition-all duration-500 ${job.status === 'running' ? 'bg-gradient-to-r from-brand-500 to-brand-400' : 'bg-emerald-500'}`}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{new Date(job.timestamp).toLocaleDateString()}</span>
        {job.status === 'scheduled' && (
           <div className="flex items-center justify-between w-full">
             <div className="flex flex-col">
               <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-widest mb-1">Execution Window:</span>
               <span className="text-[10px] font-mono text-indigo-700 font-bold">{new Date(job.scheduledAt!).toLocaleString()}</span>
             </div>
             <button 
               onClick={() => onStart(job.id)}
               className="flex items-center gap-2 text-[10px] font-extrabold text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors bg-indigo-50 px-4 py-2 rounded-xl"
             >
               <Play className="w-3 h-3 fill-current" /> Deploy Now
             </button>
           </div>
        )}
        {job.status === 'queued' && (
          <button 
            onClick={() => onStart(job.id)}
            className="flex items-center gap-2 text-[10px] font-extrabold text-brand-600 uppercase tracking-widest hover:text-brand-800 transition-colors bg-brand-50 px-4 py-2 rounded-xl"
          >
            <Play className="w-3 h-3 fill-current" /> Execute
          </button>
        )}
        {job.status === 'completed' && (
           <span className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
             <CheckCircle2 className="w-3.5 h-3.5" /> Validated
           </span>
        )}
        {job.status === 'running' && (
           <div className="flex items-center gap-3">
             <span className="text-[10px] font-extrabold text-brand-600 uppercase tracking-widest animate-pulse">In Flight...</span>
             <div className="flex gap-1">
               <button onClick={() => onPause(job.id)} title="Pause Sync" className="p-1.5 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors">
                  <Pause className="w-3.5 h-3.5" />
               </button>
               <button onClick={() => onCancel(job.id)} title="Cancel Job" className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                  <CircleStop className="w-3.5 h-3.5" />
               </button>
             </div>
           </div>
        )}
        {job.status === 'paused' && (
           <button 
             onClick={() => onStart(job.id)}
             className="flex items-center gap-2 text-[10px] font-extrabold text-amber-600 uppercase tracking-widest hover:text-amber-800 transition-colors bg-amber-50 px-4 py-2 rounded-xl"
           >
             <Play className="w-3 h-3 fill-current" /> Resume
           </button>
        )}
        {(job.status === 'completed' || job.status === 'failed') && (
           <div className="flex gap-4">
             <button 
               onClick={() => onViewLogs(job.id)}
               className="flex items-center gap-2 text-[10px] font-extrabold text-slate-500 hover:text-brand-600 uppercase tracking-widest transition-colors"
             >
               <ScrollText className="w-3.5 h-3.5" /> Inspect Trace
             </button>
             {job.status === 'completed' && (
                <button 
                  onClick={() => onStart(job.id)}
                  className="flex items-center gap-2 text-[10px] font-extrabold text-brand-600 uppercase tracking-widest hover:text-brand-800 transition-colors bg-brand-50 px-3 py-1.5 rounded-lg border border-brand-100"
                >
                  <RefreshCw className="w-3 h-3" /> Test Run
                </button>
             )}
           </div>
        )}
        {job.status === 'failed' && (
          <button 
            onClick={() => onRetry(job.id)}
            className="flex items-center gap-2 text-[10px] font-extrabold text-red-600 uppercase tracking-widest hover:text-red-800 transition-colors bg-red-50 px-4 py-2 rounded-xl animate-pulse"
          >
            <RotateCcw className="w-3 h-3" /> Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isConnWizardOpen, setIsConnWizardOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchConnections = async () => {
    try {
      const res = await fetch('/api/connections');
      const data = await res.json();
      setConnections(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteConnection = async (id: string) => {
    try {
      await fetch(`/api/connections/${id}`, { method: 'DELETE' });
      fetchConnections();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchConnections();
    const interval = setInterval(() => {
      fetchJobs();
      fetchConnections();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStartJob = async (id: string) => {
    try {
      await fetch(`/api/jobs/${id}/start`, { method: 'POST' });
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRetryJob = async (id: string) => {
    try {
      await fetch(`/api/jobs/${id}/retry`, { method: 'POST' });
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePauseJob = async (id: string) => {
    try {
      await fetch(`/api/jobs/${id}/pause`, { method: 'POST' });
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelJob = async (id: string) => {
    try {
      await fetch(`/api/jobs/${id}/cancel`, { method: 'POST' });
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewLogs = (id: string) => {
    setActiveTab('logs');
    // Simplified: Just switch to logs tab
  };

  return (
    <div className="min-h-screen bg-surface-bg flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 min-w-0 flex flex-col">
        <Header />
        
        <main className="flex-1 p-8 ml-64 overflow-y-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">Group Risk Command</h2>
                    <p className="text-sm text-slate-600 font-medium">Enterprise Data Orchestration for Equity Group Holdings Risk & Compliance.</p>
                  </div>
                  <button 
                    onClick={() => setIsWizardOpen(true)}
                    className="bg-brand-500 text-white px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/20 flex items-center gap-3"
                  >
                    <Plus className="w-4 h-4" /> New Ingestion Job
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Active Syncs', val: '12', icon: <RefreshCw />, color: 'text-brand-600', bg: 'bg-brand-50' },
                    { label: 'Data Ingested', val: '1.2TB', icon: <Database />, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Integrity Rating', val: '99.98%', icon: <ShieldCheck />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'System Health', val: 'Optimal', icon: <Zap />, color: 'text-amber-600', bg: 'bg-amber-50' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white border border-surface-line p-6 rounded-[2rem] relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                      <div className={`absolute top-0 right-0 p-6 opacity-10 scale-150 ${stat.color} group-hover:scale-[1.7] transition-transform`}>
                        {stat.icon}
                      </div>
                      <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.25em] mb-2">{stat.label}</p>
                      <p className={`text-2xl font-display font-bold ${stat.color}`}>{stat.val}</p>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between mb-2 px-2 border-l-4 border-brand-500 pl-4">
                       <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-[0.3em]">Critical Ingestion Pipeline</h3>
                       <button className="text-[10px] font-bold text-brand-500 uppercase tracking-widest hover:text-brand-700">View All Jobs</button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {jobs.map(job => (
                        <JobCard 
                          key={job.id} 
                          job={job} 
                          onStart={handleStartJob} 
                          onRetry={handleRetryJob}
                          onPause={handlePauseJob}
                          onCancel={handleCancelJob}
                          onViewLogs={handleViewLogs}
                        />
                      ))}
                    </div>
                  </div>

                    <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white border border-surface-line rounded-[2.5rem] p-8 overflow-hidden relative shadow-sm">
                       <div className="absolute top-0 right-0 p-8 opacity-5">
                          <Share2 className="w-32 h-32" />
                       </div>
                       <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-[0.3em] mb-6">Distribution Nodes</h3>
                       <div className="space-y-6">
                          {[
                            { name: 'OneDrive (Enterprise)', usage: '82%', status: 'active' },
                            { name: 'S3 Regulatory Vault', usage: '14%', status: 'active' },
                            { name: 'Local Regional Folders', usage: '92%', status: 'warning' },
                            { name: 'Risk Email Group Sync', usage: 'Active', status: 'active' },
                          ].map((node, i) => (
                            <div key={i} className="space-y-2">
                               <div className="flex justify-between items-center text-[11px] font-bold">
                                 <span className="text-slate-700">{node.name}</span>
                                 <span className={node.status === 'warning' ? 'text-brand-500' : 'text-emerald-600'}>{node.usage}</span>
                               </div>
                               <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${node.status === 'warning' ? 'bg-amber-500' : 'bg-brand-500'}`} 
                                    style={{ width: parseInt(node.usage) ? node.usage : '100%' }}
                                  ></div>
                               </div>
                            </div>
                          ))}
                       </div>
                       <button className="w-full mt-8 border border-slate-200 bg-slate-50 py-4 rounded-2xl text-[10px] font-extrabold text-slate-800 uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-3">
                         Manage Remote Folders <ArrowUpRight className="w-3 h-3" />
                       </button>
                    </div>

                    <div className="bg-brand-500/10 border border-brand-500/20 rounded-[2.5rem] p-8 relative overflow-hidden group">
                       <div className="relative z-10">
                          <AlertCircle className="w-8 h-8 text-brand-500 mb-6 group-hover:scale-110 transition-transform" />
                          <h4 className="text-white font-bold mb-2">Compliance Action Required</h4>
                          <p className="text-xs text-brand-300/70 leading-relaxed mb-6 font-medium">3 tables in "Quarterly Risk Assessment" pending manual transformation schema validation.</p>
                          <button className="bg-brand-500 text-white px-6 py-3 rounded-full text-[10px] font-extrabold uppercase tracking-widest hover:bg-brand-600 shadow-xl shadow-brand-500/20">Review Now</button>
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'jobs' && (
               <motion.div 
                key="jobs"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-end">
                   <div>
                     <h2 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight leading-none mb-4">Ingestion Registry</h2>
                     <p className="text-sm text-slate-600 font-medium font-mono uppercase tracking-tight">Enterprise Ingestion Audit Trail</p>
                   </div>
                   <button 
                     onClick={() => setIsWizardOpen(true)}
                     className="px-6 py-3 rounded-2xl bg-brand-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-600 shadow-lg shadow-brand-500/20 flex items-center gap-3"
                   >
                      <Plus className="w-4 h-4" /> Create Workflow
                   </button>
                </div>

                {/* Filter & Command Suite */}
                <div className="bg-white border border-surface-line p-5 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row gap-6 items-center">
                   <div className="flex-1 relative w-full">
                      <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Search IDs or pipeline names..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-14 pr-6 text-xs text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white transition-all shadow-inner"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                      />
                   </div>
                   
                   <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                      <div className="flex bg-slate-100 border border-slate-200 rounded-2xl p-1 gap-1">
                         {['All', 'queued', 'scheduled', 'running', 'completed', 'failed'].map((status) => (
                           <button
                             key={status}
                             onClick={() => setStatusFilter(status)}
                             className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                               statusFilter === status 
                                 ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
                                 : 'text-slate-500 hover:text-slate-900 hover:bg-white'
                             }`}
                           >
                             {status}
                           </button>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="bg-white border border-surface-line rounded-[3rem] overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-surface-line">
                        <th className="px-8 py-6 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">ID & Name</th>
                        <th className="px-8 py-6 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest text-center">Scenario</th>
                        <th className="px-8 py-6 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Flow Path</th>
                        <th className="px-8 py-6 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest text-center">Status</th>
                        <th className="px-8 py-6 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest text-right">Capacity</th>
                        <th className="px-8 py-6 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest text-right">Progress</th>
                        <th className="px-8 py-6 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {jobs
                        .filter(job => {
                           const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
                           const matchesQuery = job.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                               job.id.toLowerCase().includes(searchQuery.toLowerCase());
                           return matchesStatus && matchesQuery;
                        })
                        .map(job => (
                        <tr key={job.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-8 py-6">
                            <p className="text-slate-900 font-bold text-sm mb-1">{job.name}</p>
                            <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">{job.id}</p>
                          </td>
                          <td className="px-8 py-6 text-center">
                             <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1.5 rounded-lg w-fit mx-auto">
                                {job.scenario === 'copy' && <RefreshCw className="w-3 h-3" />}
                                {job.scenario === 'sync' && <Zap className="w-3 h-3" />}
                                {job.scenario === 'convert' && <FileCode2 className="w-3 h-3" />}
                                {job.scenario}
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
                               <span className="truncate max-w-[120px]">{job.source}</span>
                               <ArrowRight className="w-3 h-3 text-brand-500" />
                               <span className="truncate max-w-[120px]">{job.target}</span>
                             </div>
                          </td>
                          <td className="px-8 py-6 text-center">
                             <span className={`px-4 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest border border-current ${
                               job.status === 'completed' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 
                               job.status === 'running' ? 'text-brand-600 bg-brand-50 border-brand-100 animate-pulse' :
                               job.status === 'scheduled' ? 'text-indigo-600 bg-indigo-50 border-indigo-100' :
                               'text-slate-500 bg-slate-50 border-slate-100'
                             }`}>
                               {job.status}
                             </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <span className="text-[11px] font-mono text-slate-600 font-bold italic">x{job.threads || 4} Parallel</span>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <div className="flex flex-col items-end gap-1.5">
                                <span className="text-[10px] font-mono text-slate-600 font-bold">{job.progress}%</span>
                                <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                                   <div className={`h-full transition-all duration-1000 ${job.status === 'completed' ? 'bg-emerald-500' : 'bg-brand-500'}`} style={{ width: `${job.progress}%` }}></div>
                                </div>
                             </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                {job.status === 'completed' && (
                                  <button title="Download Output Artifact" className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
                                    <Download className="w-4 h-4" />
                                  </button>
                                )}
                                {job.status === 'failed' && (
                                  <button 
                                    onClick={() => handleRetryJob(job.id)}
                                    title="Retry Failed Job" 
                                    className="p-2 text-brand-600 hover:bg-brand-50 rounded-xl transition-all animate-pulse"
                                  >
                                    <RotateCcw className="w-4 h-4" />
                                  </button>
                                )}
                                {job.status === 'running' && (
                                  <>
                                    <button onClick={() => handlePauseJob(job.id)} title="Pause Job" className="p-2 text-amber-600 hover:bg-amber-50 rounded-xl transition-all"><Pause className="w-4 h-4" /></button>
                                    <button onClick={() => handleCancelJob(job.id)} title="Cancel Job" className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"><CircleStop className="w-4 h-4" /></button>
                                  </>
                                )}
                                <button onClick={() => handleViewLogs(job.id)} title="View Logs" className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"><ScrollText className="w-4 h-4" /></button>
                                <button onClick={() => handleStartJob(job.id)} title="Start Job" className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"><Play className="w-4 h-4" /></button>
                                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'connectivity' && (
               <motion.div 
                 key="connectivity"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="space-y-8"
               >
                 <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight leading-none mb-4">Enterprise Nodes</h2>
                      <p className="text-sm text-slate-600 font-medium leading-none">Manage persistent database tunnels and identity hooks.</p>
                    </div>
                    <button 
                      onClick={() => setIsConnWizardOpen(true)}
                      className="bg-brand-500 text-white px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brand-600 shadow-lg shadow-brand-500/20 flex items-center gap-3 transition-all"
                    >
                       <Plus className="w-4 h-4" /> Add Persistence Node
                    </button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {connections.map((node) => (
                      <div key={node.id} className="bg-white border border-surface-line p-6 rounded-[2.5rem] hover:border-brand-500/30 shadow-sm transition-all group relative">
                         <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-surface-line group-hover:bg-brand-500/10 group-hover:border-brand-500/30 transition-all font-bold">
                               {node.type.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="flex gap-2">
                               <span className={`text-[8px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${node.status === 'Online' ? 'text-emerald-600 border-emerald-100 bg-emerald-50' : node.status === 'Standby' ? 'text-amber-600 border-amber-100 bg-amber-50' : 'text-slate-500 border-slate-200 bg-slate-50'}`}>
                                  {node.status}
                               </span>
                               <button 
                                 onClick={() => handleDeleteConnection(node.id)}
                                 className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-500 transition-all"
                               >
                                 <Trash2 className="w-4 h-4" />
                               </button>
                            </div>
                         </div>
                         <h4 className="text-slate-900 font-bold text-sm mb-1">{node.name}</h4>
                         <p className="text-[10px] text-slate-400 font-mono mb-4">{node.host}:{node.port}</p>
                         <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                            <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">{node.type}</span>
                            <span className="text-[10px] font-bold text-brand-500 flex items-center gap-1">
                               <ShieldCheck className="w-3 h-3" /> Encrypted
                            </span>
                         </div>
                      </div>
                    ))}
                    {connections.length === 0 && (
                      <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-300">
                         <Database className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                         <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No active nodes registered</p>
                         <button onClick={() => setIsConnWizardOpen(true)} className="mt-4 text-brand-500 font-bold text-[10px] uppercase underline">Register First Node</button>
                      </div>
                    )}
                 </div>

                 <div className="bg-white border border-surface-line rounded-[3rem] p-10 flex items-center justify-between overflow-hidden relative shadow-sm">
                    <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
                       <Network className="w-64 h-64" />
                    </div>
                    <div className="relative z-10">
                       <h3 className="text-lg font-display font-bold text-white mb-2">Network Security Protocols</h3>
                       <p className="text-sm text-slate-500 max-w-xl">All database connections utilize AES-256 encrypted tunnels. Handshaking occurs every 300 seconds to ensure token persistence.</p>
                    </div>
                    <button className="relative z-10 px-8 py-4 rounded-2xl border border-surface-line text-xs font-bold text-white hover:bg-white/5">View Certificate Logs</button>
                 </div>
               </motion.div>
            )}

            {activeTab === 'logs' && (
               <motion.div 
                 key="logs"
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="bg-white border border-surface-line rounded-[3rem] p-10 font-mono text-xs text-slate-600 space-y-4 shadow-sm"
               >
                 <div className="flex items-center gap-4 text-brand-600 font-bold uppercase tracking-widest mb-8 text-sm">
                    <Activity className="w-5 h-5" /> Ingestion Audit Trail
                 </div>
                 {[
                   `[${new Date().toISOString()}] ENGINE_INIT: Handshake successful with SQL_SERVER_UAT`,
                   `[${new Date().toISOString()}] SECURITY_CHECK: Token v4.1 validated for user Analyst_07`,
                   `[${new Date().toISOString()}] JOB_J-001: 4.2M rows ingested. Sync complete.`,
                   `[${new Date().toISOString()}] FILE_CONVERT: XML source converted to JSON for dest node 12`,
                   `[${new Date().toISOString()}] DISPATCHER: Email group 'Risk-Mgt-Daily' sent 14 report artifacts.`,
                   `[${new Date().toISOString()}] STORAGE_SYNC: 42 files pushed to OneDrive://Compliance/Internal/RiskAssessments`,
                 ].map((log, i) => (
                   <div key={i} className="flex gap-4 border-b border-slate-100 pb-4 last:border-0 hover:text-slate-900 transition-colors">
                     <span className="text-slate-400">[{i+1}]</span>
                     <span>{log}</span>
                   </div>
                 ))}
                 <div className="pt-10 flex gap-4 border-t border-slate-100">
                    <button className="text-brand-600 font-bold uppercase tracking-widest hover:underline px-2">Download Audit.log</button>
                    <button className="text-slate-400 font-bold uppercase tracking-widest hover:underline px-2">Clear Logs</button>
                 </div>
               </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <JobWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
        onCreated={fetchJobs} 
        connections={connections}
      />

      <ConnectionWizard
        isOpen={isConnWizardOpen}
        onClose={() => setIsConnWizardOpen(false)}
        onCreated={fetchConnections}
        connections={connections}
      />
    </div>
  );
}
