import React, { useState } from 'react';

type ComponentId = 'pupil' | 'retina' | 'iris' | 'lens' | 'nerve' | null;

interface PartInfo {
  id: ComponentId;
  nameEye: string;
  nameCam: string;
  desc: string;
}

const PARTS: PartInfo[] = [
  { id: 'pupil', nameEye: 'Pupil', nameCam: 'Aperture', desc: 'Allows light to enter; changes size based on light intensity.' },
  { id: 'iris', nameEye: 'Iris', nameCam: 'Diaphragm', desc: 'Regulates the size of the opening.' },
  { id: 'lens', nameEye: 'Cornea/Lens', nameCam: 'Camera Lens', desc: 'Focuses incoming light onto the sensing surface.' },
  { id: 'retina', nameEye: 'Retina', nameCam: 'Image Sensor', desc: 'Captures the light and converts it to electrical signals.' },
  { id: 'nerve', nameEye: 'Optic Nerve', nameCam: 'Processor/Cables', desc: 'Transmits signals to be processed into an image.' },
];

export function AnatomyMapper() {
  const [activePart, setActivePart] = useState<ComponentId>(null);

  const getStyle = (id: ComponentId) => {
    const isActive = activePart === id;
    const isMuted = activePart !== null && !isActive;
    return {
      opacity: isMuted ? 0.3 : 1,
      filter: isActive ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))' : 'none',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    };
  };

  const EyeSVG = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full" overflow="visible">
      <defs>
        <radialGradient id="eyeShadow" cx="50%" cy="50%" r="50%">
          <stop offset="80%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
        </radialGradient>
      </defs>
      
      {/* Sclera & Cornea */}
      <path d="M40 100 A 60 60 0 1 1 160 100 A 60 60 0 0 1 40 100 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" style={getStyle('lens')} onMouseEnter={() => setActivePart('lens')} onMouseLeave={() => setActivePart(null)} />
      <path d="M 40 100 C 20 80, 20 120, 40 100 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" style={getStyle('lens')} onMouseEnter={() => setActivePart('lens')} onMouseLeave={() => setActivePart(null)}/>
      
      {/* Optic Nerve */}
      <path d="M 158 90 L 190 90 A 10 10 0 0 1 190 110 L 158 110" fill="#f8babf" stroke="#e11d48" strokeWidth="2" style={getStyle('nerve')} onMouseEnter={() => setActivePart('nerve')} onMouseLeave={() => setActivePart(null)} />

      {/* Retina */}
      <path d="M 100 40 A 60 60 0 0 1 160 100 A 60 60 0 0 1 100 160" fill="none" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" style={getStyle('retina')} onMouseEnter={() => setActivePart('retina')} onMouseLeave={() => setActivePart(null)} />

      {/* Lens */}
      <ellipse cx="65" cy="100" rx="8" ry="25" fill="#bae6fd" stroke="#38bdf8" strokeWidth="2" style={getStyle('lens')} onMouseEnter={() => setActivePart('lens')} onMouseLeave={() => setActivePart(null)} />

      {/* Iris */}
      <path d="M 45 70 L 55 85 L 50 70 Z M 45 130 L 55 115 L 50 130 Z" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" style={getStyle('iris')} onMouseEnter={() => setActivePart('iris')} onMouseLeave={() => setActivePart(null)} />
      
      {/* Pupil (Empty space, we'll draw a phantom shape to capture hover) */}
       <ellipse cx="45" cy="100" rx="5" ry="12" fill="#1e293b" style={getStyle('pupil')} onMouseEnter={() => setActivePart('pupil')} onMouseLeave={() => setActivePart(null)} />
    </svg>
  );

  const CameraSVG = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full" overflow="visible">
      {/* Camera Body */}
      <rect x="70" y="50" width="100" height="100" rx="8" fill="#334155" stroke="#0f172a" strokeWidth="3" />
      <rect x="90" y="40" width="30" height="10" rx="2" fill="#64748b" />
      <circle cx="150" cy="70" r="15" fill="#475569" />

      {/* Image Sensor */}
      <rect x="155" y="65" width="5" height="70" fill="#fbbf24" style={getStyle('retina')} onMouseEnter={() => setActivePart('retina')} onMouseLeave={() => setActivePart(null)} />

      {/* Cables/Processor */}
      <path d="M 155 100 L 195 100 M 155 110 L 195 110" stroke="#f43f5e" strokeWidth="3" strokeDasharray="4 2" style={getStyle('nerve')} onMouseEnter={() => setActivePart('nerve')} onMouseLeave={() => setActivePart(null)} />
      
      {/* Lens Barrel */}
      <rect x="30" y="65" width="40" height="70" fill="#94a3b8" stroke="#475569" strokeWidth="2" style={getStyle('lens')} onMouseEnter={() => setActivePart('lens')} onMouseLeave={() => setActivePart(null)} />
      <rect x="10" y="60" width="20" height="80" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" style={getStyle('lens')} onMouseEnter={() => setActivePart('lens')} onMouseLeave={() => setActivePart(null)} />

      {/* Diaphragm / Iris */}
      <path d="M 40 65 L 40 85 L 60 75 Z M 40 135 L 40 115 L 60 125 Z" fill="#475569" style={getStyle('iris')} onMouseEnter={() => setActivePart('iris')} onMouseLeave={() => setActivePart(null)} />

      {/* Aperture / Pupil */}
      <rect x="38" y="85" width="5" height="30" fill="#020617" style={getStyle('pupil')} onMouseEnter={() => setActivePart('pupil')} onMouseLeave={() => setActivePart(null)} />
    </svg>
  );

  return (
    <section className="py-12 bg-slate-950 rounded-3xl shadow-lg border border-slate-800 flex flex-col items-center max-w-5xl mx-auto w-full mb-12">
      <div className="text-center mb-8 px-6">
        <h2 className="text-3xl font-bold text-slate-100 mb-4">The Interactive Anatomy Mapper</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">Hover over the list or the diagrams to see how the parts of a human eye corresponding conceptually to a digital camera.</p>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-around px-8 gap-8 mb-12">
        <div className="w-64 h-64 relative">
          <h3 className="text-center font-semibold text-slate-300 mb-2 uppercase tracking-wider text-sm">Human Eye</h3>
          <div className="w-full h-full bg-slate-900 rounded-full border border-slate-700 shadow-[0_0_20px_rgba(0,0,0,0.5)_inset] flex items-center justify-center p-4">
             <EyeSVG />
          </div>
        </div>
        
        <div className="hidden md:flex flex-col items-center text-slate-500">
           {/* Decorative linkage */}
           <div className="h-px w-16 bg-slate-700 mb-2"></div>
           <span className="text-xs font-mono uppercase tracking-widest text-slate-500">Analogous</span>
           <div className="h-px w-16 bg-slate-700 mt-2"></div>
        </div>

        <div className="w-64 h-64 relative">
          <h3 className="text-center font-semibold text-slate-300 mb-2 uppercase tracking-wider text-sm">Digital Camera</h3>
           <div className="w-full h-full bg-slate-900 rounded-2xl border border-slate-700 shadow-[0_0_20px_rgba(0,0,0,0.5)_inset] flex items-center justify-center p-4">
             <CameraSVG />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-8 w-full">
        {PARTS.map((part) => (
          <div 
            key={part.id}
            onMouseEnter={() => setActivePart(part.id)}
            onMouseLeave={() => setActivePart(null)}
            className={`p-4 rounded-xl border transition-all cursor-default flex flex-col h-full
              ${activePart === part.id ? 'bg-blue-900/30 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)] transform -translate-y-1' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'}`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className={`font-bold text-lg ${activePart === part.id ? 'text-blue-400' : 'text-slate-200'}`}>{part.nameEye}</span>
              <span className="text-slate-600 mx-2">↔</span>
              <span className={`font-semibold ${activePart === part.id ? 'text-indigo-400' : 'text-slate-400'}`}>{part.nameCam}</span>
            </div>
            <p className="text-sm text-slate-500 mt-auto">{part.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
