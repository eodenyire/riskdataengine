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
  status: 'completed' | 'running' | 'queued' | 'failed' | 'paused';
  source: string;
  target: string;
  progress: number;
  timestamp: string;
}

// --- Components ---

const JobWizard = ({ isOpen, onClose, onCreated }: { isOpen: boolean, onClose: () => void, onCreated: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Database Ingestion', // 'Database Ingestion' (Leg 1) or 'File Ingestion' (Leg 2)
    source: '',
    target: '',
    transformations: ['Data Cleaning', 'Format Normalization'],
    distributions: ['Local Download'],
    outputFormat: 'JSON'
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
      setFormData({ name: '', type: 'Database Ingestion', source: '', target: '', transformations: ['Data Cleaning'], distributions: ['Local Download'], outputFormat: 'JSON' });
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-surface-bg/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface-card border border-surface-line w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl"
      >
        <div className="p-10 border-b border-surface-line flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">Configure Ingestion Engine</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Leg 1: DB to Target | Leg 2: File to Target</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-500"><X /></button>
        </div>

        <div className="p-10 bg-surface-bg/30 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <div className="flex gap-4 mb-10">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-1.5 flex-1 rounded-full ${step >= i ? 'bg-brand-500' : 'bg-surface-line'}`} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-3 text-center">Pipeline Architecture Selection</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setFormData({...formData, type: 'Database Ingestion'})}
                      className={`p-6 rounded-3xl border transition-all text-left group ${formData.type === 'Database Ingestion' ? 'border-brand-500 bg-brand-500/5' : 'border-surface-line bg-surface-bg/20 opacity-50 hover:opacity-100'}`}
                    >
                      <Database className={`w-6 h-6 mb-4 transition-colors ${formData.type === 'Database Ingestion' ? 'text-accent-gold' : 'text-slate-500'}`} />
                      <p className="text-white font-bold text-sm tracking-tight">Leg 1: DB Sync</p>
                      <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Connect to any DB, query tables, transform, and write to target DBs or Files.</p>
                    </button>
                    <button 
                      onClick={() => setFormData({...formData, type: 'File Ingestion'})}
                      className={`p-6 rounded-3xl border transition-all text-left group ${formData.type === 'File Ingestion' ? 'border-brand-500 bg-brand-500/5' : 'border-surface-line bg-surface-bg/20 opacity-50 hover:opacity-100'}`}
                    >
                      <FileCode2 className={`w-6 h-6 mb-4 transition-colors ${formData.type === 'File Ingestion' ? 'text-accent-gold' : 'text-slate-500'}`} />
                      <p className="text-white font-bold text-sm tracking-tight">Leg 2: File Ingestion</p>
                      <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Ingest diverse file formats into databases or convert formats for distribution.</p>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-3">Job Alias</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Sanctions List Daily Delta" 
                    className="w-full bg-surface-card border border-surface-line rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-brand-500"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-3">
                    {formData.type === 'Database Ingestion' ? 'Source Database Path' : 'Source File Repository'}
                  </label>
                  <input 
                    type="text" 
                    placeholder={formData.type === 'Database Ingestion' ? 'SQLServer://legacy-db-001/risk' : 'SFTP://data-intake-hubs/files/daily/'}
                    className="w-full bg-surface-card border border-surface-line rounded-2xl p-4 text-white text-sm font-mono focus:outline-none focus:border-brand-500"
                    value={formData.source}
                    onChange={e => setFormData({...formData, source: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-3">Target Destination / Data Hub</label>
                  <input 
                    type="text" 
                    placeholder="Oracle://compliance-data-warehouse:1521/vault" 
                    className="w-full bg-surface-card border border-surface-line rounded-2xl p-4 text-white text-sm font-mono focus:outline-none focus:border-brand-500"
                    value={formData.target}
                    onChange={e => setFormData({...formData, target: e.target.value})}
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-3 italic">Cleaning & Transformation Rules</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Data Cleaning', 'PII Masking', 'Null Verification', 'DataType Normalization'].map(t => (
                      <button 
                        key={t}
                        onClick={() => toggleTransform(t)}
                        className={`p-3 rounded-xl border text-[10px] font-bold uppercase tracking-wider text-left transition-all ${formData.transformations.includes(t) ? 'bg-brand-500/20 border-brand-500 text-white' : 'bg-surface-bg/20 border-surface-line text-slate-500'}`}
                      >
                        {formData.transformations.includes(t) ? 'Active: ' : ''}{t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-3 italic">Output Conversion Format</label>
                  <div className="flex gap-2">
                    {['JSON', 'XML', 'CSV', 'EXCEL'].map(format => (
                      <button 
                        key={format}
                        onClick={() => setFormData({...formData, outputFormat: format})}
                        className={`flex-1 py-3 rounded-xl border text-[10px] font-bold transition-all ${formData.outputFormat === format ? 'bg-white/10 border-white text-white' : 'bg-surface-bg/20 border-surface-line text-slate-500'}`}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                 <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-3 text-emerald-500">Global Distribution Channels</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'Email Group', icon: <Mail className="w-4 h-4" /> },
                      { id: 'OneDrive Remote', icon: <Cloud className="w-4 h-4" /> },
                      { id: 'Local File System', icon: <Download className="w-4 h-4" /> },
                      { id: 'Remote Server (FTP/SSH)', icon: <ExternalLink className="w-4 h-4" /> },
                      { id: 'Departmental Shared Folder', icon: <Server className="w-4 h-4" /> }
                    ].map(d => (
                      <button 
                        key={d.id}
                        onClick={() => toggleDist(d.id)}
                        className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${formData.distributions.includes(d.id) ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20' : 'bg-surface-bg/20 border-surface-line text-slate-500'}`}
                      >
                        {d.icon}
                        <span className="text-[10px] font-bold uppercase tracking-wider">{d.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl">
                  <p className="text-[11px] text-emerald-500 font-bold leading-relaxed flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5" /> All distribution events are recorded in the compliance audit trail.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-10 border-t border-surface-line bg-surface-inner/50 flex justify-between">
          <button 
            onClick={() => step > 1 && setStep(step - 1)}
            disabled={step === 1}
            className="px-8 py-3 rounded-xl text-xs font-bold text-slate-400 hover:text-white disabled:opacity-30"
          >
            Go Back
          </button>
          
          {step < 4 ? (
            <button 
              onClick={() => setStep(step + 1)}
              disabled={!formData.name || (step === 2 && (!formData.source || !formData.target))}
              className="bg-brand-500 text-white px-10 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brand-600 shadow-lg shadow-brand-500/20 disabled:opacity-50"
            >
              Next Phase
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              className="bg-brand-500 text-white px-10 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brand-600 shadow-lg shadow-brand-500/20"
            >
              Authorize & Deploy Pipeline
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
    <aside className="w-64 border-r border-surface-line bg-surface-bg flex flex-col h-screen fixed top-0 left-0 z-50">
      <div className="p-8 border-b border-surface-line flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 border border-brand-400">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-display font-black text-white tracking-[0.2em] leading-none">EQUITY</span>
            <span className="text-[9px] font-mono font-bold text-accent-gold uppercase tracking-[0.1em] mt-1.5">Risk & Compliance</span>
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
                : 'text-slate-400 hover:bg-surface-card hover:text-slate-200'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-surface-line">
        <div className="bg-surface-card rounded-2xl p-4 border border-surface-line">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest">v4.3 Engine</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed font-mono">Sync active on 12 nodes. Integrity verified.</p>
        </div>
      </div>
    </aside>
  );
};

const Header = () => {
  return (
    <header className="h-24 border-b border-surface-line bg-surface-bg/80 backdrop-blur-xl sticky top-0 z-40 pl-64">
      <div className="h-full px-8 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            <div className="h-12 px-5 py-2 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-xl border border-white/10 ring-4 ring-brand-500/5">
               <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Equity_Bank_Logo.svg/1024px-Equity_Bank_Logo.svg.png" 
                 alt="Equity Group Holdings" 
                 className="h-full object-contain"
                 referrerPolicy="no-referrer"
               />
            </div>
            <div className="h-8 w-px bg-surface-line mx-2" />
            <div className="flex flex-col">
              <h1 className="text-sm font-display font-black text-white tracking-widest leading-none">RISK ENGINE</h1>
              <span className="text-[9px] font-mono font-bold text-brand-500 tracking-[0.2em] mt-1.5 uppercase">Data Ingestion v4.3</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-surface-card px-5 py-2.5 rounded-2xl border border-surface-line w-80 group focus-within:border-brand-500/50 transition-all">
            <Search className="w-4 h-4 text-slate-500 group-focus-within:text-brand-500" />
            <input 
              type="text" 
              placeholder="Query database records..." 
              className="bg-transparent border-none text-xs text-slate-200 focus:outline-none w-full placeholder:text-slate-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 px-4 py-2 border-r border-surface-line">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Mainframe Active</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[11px] font-bold text-white">Risk Analyst</p>
              <p className="text-[9px] text-brand-500 font-mono uppercase tracking-widest font-bold">compliance.unit@equity.com</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-card border border-surface-line flex items-center justify-center overflow-hidden">
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
      case 'completed': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'running': return 'bg-brand-500/10 text-brand-500 border-brand-500/20';
      case 'failed': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'paused': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  return (
    <div className="bg-surface-card border border-surface-line p-6 rounded-3xl hover:border-brand-500/30 transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className={`inline-block px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-[0.15em] border ${getStatusStyle(job.status)}`}>
            {job.status}
          </div>
          <h4 className="mt-3 text-lg font-display font-bold text-white leading-tight">{job.name}</h4>
          <p className="text-[11px] text-slate-500 font-mono mt-1 uppercase tracking-widest">{job.type}</p>
        </div>
        <button className="text-slate-500 hover:text-white p-1">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2 text-slate-400 font-medium">
            <Database className="w-3.5 h-3.5" />
            {job.source}
          </div>
          <ArrowRight className="w-3 h-3 text-brand-500" />
          <div className="flex items-center gap-2 text-slate-400 font-medium text-right">
            {job.target}
            <Server className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="h-1.5 w-full bg-surface-bg rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${job.progress}%` }}
            className={`h-full ${job.status === 'running' ? 'bg-brand-500' : 'bg-emerald-500'}`}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-surface-line/50">
        <span className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">{new Date(job.timestamp).toLocaleDateString()}</span>
        {job.status === 'queued' && (
          <button 
            onClick={() => onStart(job.id)}
            className="flex items-center gap-2 text-[10px] font-extrabold text-brand-500 uppercase tracking-widest hover:text-white transition-colors"
          >
            <Play className="w-3 h-3" /> Execute Job
          </button>
        )}
        {job.status === 'completed' && (
           <span className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
             <CheckCircle2 className="w-3 h-3" /> Validated
           </span>
        )}
        {job.status === 'running' && (
           <div className="flex items-center gap-3">
             <span className="text-[10px] font-extrabold text-brand-500 uppercase tracking-widest animate-pulse">Processing...</span>
             <div className="flex gap-1">
               <button onClick={() => onPause(job.id)} title="Pause Sync" className="p-1 text-slate-500 hover:text-amber-500 transition-colors">
                  <Pause className="w-3.5 h-3.5" />
               </button>
               <button onClick={() => onCancel(job.id)} title="Cancel Job" className="p-1 text-slate-500 hover:text-red-500 transition-colors">
                  <CircleStop className="w-3.5 h-3.5" />
               </button>
             </div>
           </div>
        )}
        {job.status === 'paused' && (
           <button 
             onClick={() => onStart(job.id)}
             className="flex items-center gap-2 text-[10px] font-extrabold text-amber-500 uppercase tracking-widest hover:text-white transition-colors"
           >
             <Play className="w-3 h-3" /> Resume Sync
           </button>
        )}
        {(job.status === 'completed' || job.status === 'failed') && (
           <button 
             onClick={() => onViewLogs(job.id)}
             className="flex items-center gap-2 text-[10px] font-extrabold text-slate-500 hover:text-brand-500 uppercase tracking-widest transition-colors"
           >
             <ScrollText className="w-3 h-3" /> View Trace
           </button>
        )}
        {job.status === 'failed' && (
          <button 
            onClick={() => onRetry(job.id)}
            className="flex items-center gap-2 text-[10px] font-extrabold text-red-500 uppercase tracking-widest hover:text-white transition-colors animate-pulse"
          >
            <RotateCcw className="w-3 h-3" /> Retry Sync
          </button>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      setJobs(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 2000);
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
                    <h2 className="text-3xl font-display font-extrabold text-white tracking-tight">Group Risk Command</h2>
                    <p className="text-sm text-slate-500 font-medium">Enterprise Data Orchestration for Equity Group Holdings Risk & Compliance.</p>
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
                    { label: 'Active Syncs', val: '12', icon: <RefreshCw />, color: 'text-brand-500' },
                    { label: 'Data Ingested', val: '1.2TB', icon: <Database />, color: 'text-white' },
                    { label: 'Integrity Rating', val: '99.98%', icon: <ShieldCheck />, color: 'text-emerald-500' },
                    { label: 'System Health', val: 'Optimal', icon: <Zap />, color: 'text-blue-500' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-surface-card border border-surface-line p-6 rounded-[2rem] relative overflow-hidden group">
                      <div className={`absolute top-0 right-0 p-6 opacity-5 scale-150 ${stat.color} group-hover:scale-[1.7] transition-transform`}>
                        {stat.icon}
                      </div>
                      <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.25em] mb-2">{stat.label}</p>
                      <p className={`text-2xl font-display font-bold ${stat.color}`}>{stat.val}</p>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between mb-2 px-2">
                       <h3 className="text-xs font-extrabold text-white uppercase tracking-[0.3em]">Critical Ingestion Pipeline</h3>
                       <button className="text-[10px] font-bold text-brand-500 uppercase tracking-widest hover:text-white">View All Jobs</button>
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
                    <div className="bg-surface-card border border-surface-line rounded-[2.5rem] p-8 overflow-hidden relative">
                       <div className="absolute top-0 right-0 p-8 opacity-5">
                          <Share2 className="w-32 h-32" />
                       </div>
                       <h3 className="text-xs font-extrabold text-white uppercase tracking-[0.3em] mb-6">Distribution Nodes</h3>
                       <div className="space-y-6">
                          {[
                            { name: 'OneDrive (Enterprise)', usage: '82%', status: 'active' },
                            { name: 'S3 Regulatory Vault', usage: '14%', status: 'active' },
                            { name: 'Local Regional Folders', usage: '92%', status: 'warning' },
                            { name: 'Risk Email Group Sync', usage: 'Active', status: 'active' },
                          ].map((node, i) => (
                            <div key={i} className="space-y-2">
                               <div className="flex justify-between items-center text-[11px] font-bold">
                                 <span className="text-slate-200">{node.name}</span>
                                 <span className={node.status === 'warning' ? 'text-brand-500' : 'text-emerald-500'}>{node.usage}</span>
                               </div>
                               <div className="h-1 w-full bg-surface-bg rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${node.status === 'warning' ? 'bg-brand-500' : 'bg-emerald-500'}`} 
                                    style={{ width: parseInt(node.usage) ? node.usage : '100%' }}
                                  ></div>
                               </div>
                            </div>
                          ))}
                       </div>
                       <button className="w-full mt-8 border border-white/5 bg-white/5 py-4 rounded-2xl text-[10px] font-extrabold text-white uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3">
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
                     <h2 className="text-3xl font-display font-extrabold text-white tracking-tight leading-none mb-4">Ingestion Registry</h2>
                     <p className="text-sm text-slate-500 font-medium leading-none">Comprehensive catalog of all data ingestion and transformation tasks.</p>
                   </div>
                   <div className="flex gap-4 items-center">
                      <div className="flex bg-surface-card border border-surface-line rounded-2xl p-1 gap-1">
                         {['All', 'queued', 'running', 'completed', 'failed'].map((status) => (
                           <button
                             key={status}
                             onClick={() => setStatusFilter(status)}
                             className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                               statusFilter === status 
                                 ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
                                 : 'text-slate-500 hover:text-slate-300'
                             }`}
                           >
                             {status}
                           </button>
                         ))}
                      </div>
                      <button 
                        onClick={() => setIsWizardOpen(true)}
                        className="px-6 py-3 rounded-2xl bg-brand-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-600 shadow-lg shadow-brand-500/20 flex items-center gap-3"
                      >
                         <Plus className="w-4 h-4" /> Create Workflow
                      </button>
                   </div>
                </div>

                <div className="bg-surface-card border border-surface-line rounded-[3rem] overflow-hidden shadow-2xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-inner/50 border-b border-surface-line">
                        <th className="px-8 py-6 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Job Identity</th>
                        <th className="px-8 py-6 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Path Flow</th>
                        <th className="px-8 py-6 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest text-center">Status</th>
                        <th className="px-8 py-6 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest text-right">Execution</th>
                        <th className="px-8 py-6 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-line/50">
                      {jobs
                        .filter(job => statusFilter === 'All' || job.status === statusFilter)
                        .map(job => (
                        <tr key={job.id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-8 py-6">
                            <p className="text-white font-bold text-sm mb-1">{job.name}</p>
                            <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">{job.id} | {job.type}</p>
                          </td>
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400">
                               <span className="truncate max-w-[120px]">{job.source}</span>
                               <ArrowRight className="w-3 h-3 text-brand-500" />
                               <span className="truncate max-w-[120px]">{job.target}</span>
                             </div>
                          </td>
                          <td className="px-8 py-6 text-center">
                             <span className={`px-4 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest border border-current ${
                               job.status === 'completed' ? 'text-emerald-500 bg-emerald-500/5' : 
                               job.status === 'running' ? 'text-brand-500 bg-brand-500/5 animate-pulse' :
                               'text-slate-500 bg-slate-500/5'
                             }`}>
                               {job.status}
                             </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <div className="flex flex-col items-end gap-1.5">
                                <span className="text-[10px] font-mono text-slate-300 font-bold">{job.progress}%</span>
                                <div className="w-24 h-1 bg-surface-bg rounded-full overflow-hidden">
                                   <div className={`h-full transition-all duration-1000 ${job.status === 'completed' ? 'bg-emerald-500' : 'bg-brand-500'}`} style={{ width: `${job.progress}%` }}></div>
                                </div>
                             </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                {job.status === 'completed' && (
                                  <button title="Download Output Artifact" className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-all">
                                    <Download className="w-4 h-4" />
                                  </button>
                                )}
                                {job.status === 'failed' && (
                                  <button 
                                    onClick={() => handleRetryJob(job.id)}
                                    title="Retry Failed Job" 
                                    className="p-2 text-brand-500 hover:bg-brand-500/10 rounded-xl transition-all animate-pulse"
                                  >
                                    <RotateCcw className="w-4 h-4" />
                                  </button>
                                )}
                                {job.status === 'running' && (
                                  <>
                                    <button onClick={() => handlePauseJob(job.id)} title="Pause Job" className="p-2 text-amber-500 hover:bg-amber-500/10 rounded-xl transition-all"><Pause className="w-4 h-4" /></button>
                                    <button onClick={() => handleCancelJob(job.id)} title="Cancel Job" className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><CircleStop className="w-4 h-4" /></button>
                                  </>
                                )}
                                <button onClick={() => handleViewLogs(job.id)} title="View Logs" className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-xl transition-all"><ScrollText className="w-4 h-4" /></button>
                                <button onClick={() => handleStartJob(job.id)} className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-xl transition-all"><Play className="w-4 h-4" /></button>
                                <button className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-xl transition-all"><RotateCcw className="w-4 h-4" /></button>
                                <button className="p-2 text-slate-500 hover:text-brand-500 hover:bg-brand-500/10 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
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
                      <h2 className="text-3xl font-display font-extrabold text-white tracking-tight leading-none mb-4">Enterprise Nodes</h2>
                      <p className="text-sm text-slate-500 font-medium leading-none">Status of persistent database tunnels and file-system hooks.</p>
                    </div>
                    <button className="bg-brand-500 text-white px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brand-600 shadow-lg shadow-brand-500/20 flex items-center gap-3">
                       <Database className="w-4 h-4" /> Scan New Repositories
                    </button>
                 </div>

                 <div className="grid grid-cols-3 gap-6">
                    {[
                      { name: 'On-Prem Core SQL', type: 'Database', status: 'Online', latency: '14ms', icon: <Database className="text-brand-500" /> },
                      { name: 'UAT Oracle Vault', type: 'Database', status: 'Online', latency: '42ms', icon: <Database className="text-brand-500" /> },
                      { name: 'Compliant Hub 1', type: 'Data Hub', status: 'Standby', latency: '-', icon: <HardDrive className="text-slate-500" /> },
                      { name: 'Group OneDrive', type: 'Cloud Storage', status: 'Online', latency: '112ms', icon: <Cloud className="text-sky-500" /> },
                      { name: 'S3 Sanctions Hub', type: 'Cloud Storage', status: 'Online', latency: '88ms', icon: <Cloud className="text-sky-500" /> },
                      { name: 'Email Dispatcher', type: 'Service', status: 'Online', latency: '4ms', icon: <Mail className="text-emerald-500" /> },
                    ].map((node, i) => (
                      <div key={i} className="bg-surface-card border border-surface-line p-6 rounded-[2.5rem] hover:border-brand-500/30 transition-all group">
                         <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 bg-surface-bg rounded-2xl flex items-center justify-center border border-surface-line group-hover:bg-brand-500/10 group-hover:border-brand-500/30 transition-all">
                               {node.icon}
                            </div>
                            <span className={`text-[8px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${node.status === 'Online' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' : 'text-slate-500 border-slate-500/20 bg-slate-500/5'}`}>
                               {node.status}
                            </span>
                         </div>
                         <h4 className="text-white font-bold text-sm mb-1">{node.name}</h4>
                         <div className="flex items-center justify-between mt-4">
                            <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">{node.type}</span>
                            <span className="text-[10px] font-bold text-slate-300">{node.latency}</span>
                         </div>
                      </div>
                    ))}
                 </div>

                 <div className="bg-surface-card border border-surface-line rounded-[3rem] p-10 flex items-center justify-between overflow-hidden relative">
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
                 className="bg-surface-card border border-surface-line rounded-[3rem] p-10 font-mono text-xs text-slate-400 space-y-4"
               >
                 <div className="flex items-center gap-4 text-brand-500 font-bold uppercase tracking-widest mb-8 text-sm">
                    <Activity className="w-5 h-5" /> Ingestion Audit Trail
                 </div>
                 {[
                   `[${new Date().toISOString()}] ENGINE_INIT: Handshake successful with SQL_SERVER_UAT`,
                   `[${new Date().toISOString()}] SECURITY_CHECK: Token v4.1 validated for user Analyst_07`,
                   `[${new Date().toISOString()}] JOB_J-001: 4.2M rows ingested. Sync complete.`,
                   `[${new Date().toISOString()}] LEG2_INGEST: XML source converted to JSON for dest node 12`,
                   `[${new Date().toISOString()}] DISPATCHER: Email group 'Risk-Mgt-Daily' sent 14 report artifacts.`,
                   `[${new Date().toISOString()}] STORAGE_SYNC: 42 files pushed to OneDrive://Compliance/Internal/RiskAssessments`,
                 ].map((log, i) => (
                   <div key={i} className="flex gap-4 border-b border-surface-line/30 pb-4 last:border-0 hover:text-white transition-colors">
                     <span className="text-slate-600">[{i+1}]</span>
                     <span>{log}</span>
                   </div>
                 ))}
                 <div className="pt-10 flex gap-4">
                    <button className="text-brand-500 font-bold uppercase tracking-widest hover:underline px-2">Download Audit.log</button>
                    <button className="text-slate-600 font-bold uppercase tracking-widest hover:underline px-2">Clear Logs</button>
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
      />
    </div>
  );
}
