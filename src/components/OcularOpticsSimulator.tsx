import React, { useState, useEffect } from 'react';
import { Camera, Eye, Plus, Minus, MoveHorizontal, Aperture, Activity } from 'lucide-react';
import { motion } from 'motion/react';

type Mode = 'EYE' | 'CAMERA';

export function OcularOpticsSimulator() {
  const [mode, setMode] = useState<Mode>('EYE');
  
  // Primary parameters
  const [uDistance, setUDistance] = useState(500); // Object distance
  const [vActual, setVActual] = useState(100); // Sensor/Retina distance 
  const [lensPower, setLensPower] = useState(0); // Corrective lens power (Diopters)
  const [aperture, setAperture] = useState(2.8); // f-stop
  const [patientAge, setPatientAge] = useState(25); // For presbyopia

  // Derived optics physics (simplified for visual simulation)
  // Eye mode: Eye tries to adjust f to keep v_focused == vActual.
  // Base optical power of human eye is around 60D. 
  // Let's abstract this into "focus error"
  // f_target = (u * v) / (u + v)
  
  const f_target = (uDistance * 100) / (uDistance + 100); 

  // Accommodation capability declines with age
  const maxAccommodation = Math.max(0, 14 - (patientAge - 10) * 0.25); // Diopters of extra power
  
  // Calculate blur
  const v_focused = 100; // simplified
  let focusError = 0;
  
  if (mode === 'EYE') {
    // Normal eye (v=100) needs base power.
    // Myopia (v>100), Hyperopia (v<100)
    const requiredExtraPower = (100 - vActual) / 2; // rough abstraction
    const availablePower = maxAccommodation;
    
    let netError = requiredExtraPower - lensPower;
    
    // Close objects require even more power
    const nearAccomodationReq = (1000 / uDistance) * 2;
    netError += nearAccomodationReq;
    
    // Can eye accommodate? 
    if (netError > 0 && netError <= availablePower) {
        // Eye accommodated successfully
        focusError = 0;
    } else if (netError > availablePower) {
        // Can't accommodate enough (hyperopia / presbyopia / near object)
        focusError = netError - availablePower;
    } else {
        // Net error < 0: Overpowered (myopia) - eye can't relax more than 0
        focusError = Math.abs(netError);
    }
  } else {
    // CAMERA MODE
    // Lens is fixed. We adjust vActual to focus.
    const f_cam = 83.3; // matches infinity focus for v=100
    const v_ideal = (f_cam * uDistance) / (uDistance - f_cam);
    focusError = Math.abs(vActual - v_ideal) / 5;
  }
  
  const blurRadius = Math.min(20, focusError * (8 / aperture));
  const isFocused = blurRadius < 0.5;

  // Preset handlers
  const applyPreset = (preset: string) => {
    setMode(preset === 'CAMERA' ? 'CAMERA' : 'EYE');
    setLensPower(0);
    setPatientAge(25);
    setUDistance(500);
    
    if (preset === 'NORMAL') setVActual(100);
    else if (preset === 'MYOPIA') setVActual(115);
    else if (preset === 'HYPEROPIA') setVActual(85);
    else if (preset === 'PRESBYOPIA') {
      setVActual(100);
      setPatientAge(65);
      setUDistance(200); // Near object to show issue
    }
    else if (preset === 'CAMERA') {
      setVActual(100);
    }
  };

  const getRayPath = () => {
    // Calculate path for rays entering the system
    const focalPointX = mode === 'CAMERA' 
                        ? (83.3 * uDistance) / (uDistance - 83.3) 
                        : 100 + (focusError * (vActual < 100 ? 10 : -10));
                        
    const renderFocalX = 150 + focalPointX; // Lens is at 150
    const renderRetinaX = 150 + vActual;
    
    // Draw top ray
    // Refracts at lens (150, 50) towards focal point
    const extYTop = 100 + ((100 - 50) / (renderFocalX - 150)) * (renderRetinaX - 150);
    const topRay = `M 0 50 L 150 50 L ${renderRetinaX} ${extYTop}`;

    // Bottom ray
    const extYBot = 100 + ((100 - 150) / (renderFocalX - 150)) * (renderRetinaX - 150);
    const botRay = `M 0 150 L 150 150 L ${renderRetinaX} ${extYBot}`;

    return { topRay, botRay, renderRetinaX, renderFocalX };
  };

  const { topRay, botRay, renderRetinaX, renderFocalX } = getRayPath();

  return (
    <section className="bg-slate-900 text-slate-200 rounded-3xl shadow-xl w-full max-w-6xl mx-auto overflow-hidden font-sans border border-slate-700">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-slate-950 p-4 px-6 border-b border-slate-800">
         <div className="flex items-center gap-3">
           <Activity className="text-emerald-400" />
           <h2 className="text-xl font-bold tracking-widest text-slate-100 uppercase">OcularOptics Sim</h2>
         </div>
         <div className="flex gap-2">
            <button onClick={() => setMode('EYE')} className={`px-4 py-1.5 rounded text-sm font-bold tracking-wider transition-colors ${mode==='EYE' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>EYE MODE</button>
            <button onClick={() => setMode('CAMERA')} className={`px-4 py-1.5 rounded text-sm font-bold tracking-wider transition-colors ${mode==='CAMERA' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>CAMERA MODE</button>
         </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left Side: Controls */}
        <div className="w-full lg:w-80 bg-slate-900 border-r border-slate-800 p-6 flex flex-col gap-6 overflow-y-auto max-h-[800px]">
          
          <div className="space-y-4">
             <h3 className="text-xs uppercase text-slate-500 font-bold tracking-wider mb-2">Presets</h3>
             <div className="grid grid-cols-2 gap-2 text-xs">
                <button onClick={() => applyPreset('NORMAL')} className="bg-slate-800 hover:bg-slate-700 p-2 rounded border border-slate-700 transition">Normal Vision</button>
                <button onClick={() => applyPreset('MYOPIA')} className="bg-slate-800 hover:bg-slate-700 p-2 rounded border border-slate-700 transition">Myopia</button>
                <button onClick={() => applyPreset('HYPEROPIA')} className="bg-slate-800 hover:bg-slate-700 p-2 rounded border border-slate-700 transition">Hypermetropia</button>
                <button onClick={() => applyPreset('PRESBYOPIA')} className="bg-slate-800 hover:bg-slate-700 p-2 rounded border border-slate-700 transition">Presbyopia (Age 65)</button>
             </div>
          </div>

          <hr className="border-slate-800" />

          {/* Sliders */}
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <span>Object Distance (u)</span>
                <span className="text-blue-400">{uDistance} px</span>
              </div>
              <input type="range" min="100" max="2000" value={uDistance} onChange={(e) => setUDistance(Number(e.target.value))} className="accent-blue-500" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <span>{mode === 'EYE' ? 'Eyeball Length (v)' : 'Sensor Distance (v)'}</span>
                <span className={vActual === 100 ? 'text-emerald-400' : 'text-rose-400'}>{vActual} px</span>
              </div>
              <input type="range" min="70" max="130" value={vActual} onChange={(e) => setVActual(Number(e.target.value))} className="accent-rose-500" />
              {mode === 'EYE' && (
                <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                  <span>Hyperopic</span>
                  <span>Normal</span>
                  <span>Myopic</span>
                </div>
              )}
            </div>

            {mode === 'EYE' && (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span>Corrective Lens Power</span>
                  <span className="text-amber-400">{lensPower > 0 ? '+' : ''}{lensPower} D</span>
                </div>
                <input type="range" min="-15" max="15" step="0.5" value={lensPower} onChange={(e) => setLensPower(Number(e.target.value))} className="accent-amber-500" />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <span>Aperture (f-stop)</span>
                <span className="text-purple-400">f/{aperture}</span>
              </div>
              <input type="range" min="1.4" max="16" step="0.1" value={aperture} onChange={(e) => setAperture(Number(e.target.value))} className="accent-purple-500" />
            </div>

             {mode === 'EYE' && (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span>Patient Age (Presbyopia)</span>
                  <span className="text-slate-300">{patientAge} yrs</span>
                </div>
                <input type="range" min="10" max="80" value={patientAge} onChange={(e) => setPatientAge(Number(e.target.value))} className="accent-slate-400" />
                <div className="text-xs text-slate-500">Accommodation: {Math.max(0, 14 - (patientAge - 10) * 0.25).toFixed(1)} D remaining</div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Visualization */}
        <div className="flex-1 flex flex-col relative bg-slate-950 p-6 overflow-hidden">
          
          <div className="flex justify-between items-start mb-6 z-10 relative">
            <div className="bg-slate-900 border border-slate-700 font-mono text-xs px-3 py-2 rounded text-slate-300 shadow-lg">
                <div className="text-emerald-400 mb-1 font-bold">GAUSSIAN OPTICS DATA</div>
                <div>u (Object): {uDistance.toFixed(1)} px</div>
                <div>v (Image): {vActual.toFixed(1)} px</div>
                {mode === 'EYE' && <div>Correction: {lensPower > 0 ? '+' : ''}{lensPower} D</div>}
            </div>

             <div className="flex flex-col gap-2 items-end">
               <div className={`px-4 py-2 font-mono text-sm font-bold rounded shadow-lg border ${isFocused ? 'bg-emerald-900/50 text-emerald-400 border-emerald-800' : 'bg-red-900/50 text-red-400 border-red-800'}`}>
                  {isFocused ? 'SYSTEM IN FOCUS' : 'OUT OF FOCUS'}
               </div>
                <div className="text-xs font-mono text-slate-500 bg-slate-900 border border-slate-800 px-2 py-1 rounded">
                  BLUR RADIUS: {blurRadius.toFixed(1)}px
                </div>
             </div>
          </div>

          {/* Retinal Projection Preview */}
          <div className="w-full flex-1 min-h-[160px] flex items-center justify-center bg-black rounded-2xl border border-slate-800 overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)_inset] mb-6 isolation-auto z-10">
             <div className="absolute top-2 left-3 text-[10px] tracking-widest text-slate-600 font-mono">RETINAL PROJECTION PREVIEW</div>
             
             {/* Simulated blurred image on retina */}
             <div className="relative flex items-center justify-center w-full h-full">
                <span className="text-white font-serif text-6xl tracking-widest transition-all duration-300 pointer-events-none"
                      style={{ 
                          filter: `blur(${blurRadius}px)`,
                          opacity: Math.max(0.2, 1 - (blurRadius / 30))
                      }}>
                   VISION
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent mix-blend-multiply pointer-events-none"/>
             </div>
          </div>

          {/* Ray Tracing SVG */}
           <div className="w-full h-48 bg-slate-900 rounded-2xl border border-slate-800 relative z-10 overflow-hidden">
               <span className="absolute top-2 left-3 text-[10px] tracking-widest text-slate-600 font-mono">THROUGH THE LENS DIAGRAM</span>
               <svg viewBox="0 0 400 200" className="w-full h-full drop-shadow-lg">
                  {/* Grid lines */}
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="150" y1="0" x2="150" y2="200" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Rays */}
                  <g stroke="rgba(250, 204, 21, 0.8)" strokeWidth="2.5" fill="none" className="transition-all duration-500 ease-out">
                     <path d={topRay} />
                     <path d={botRay} />
                     <path d={`M 0 100 L ${renderRetinaX} 100`} stroke="rgba(250, 204, 21, 0.4)" strokeWidth="1" />
                  </g>

                  {/* Cornea / Lens Object */}
                  <ellipse cx="150" cy="100" rx={mode === 'EYE' ? 12 : 8} ry="60" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="2" />
                  
                  {/* Corrective Lens (Optional) */}
                  {mode === 'EYE' && lensPower !== 0 && (
                     <ellipse cx="120" cy="100" rx={Math.abs(lensPower)/2 + 2} ry="50" fill="rgba(167, 139, 250, 0.3)" stroke="#8b5cf6" strokeWidth="2" />
                  )}

                  {/* Retina / Sensor plane */}
                  <line x1={renderRetinaX} y1="20" x2={renderRetinaX} y2="180" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" className="transition-all duration-500 ease-out" />
                  <text x={renderRetinaX + 10} y="30" fill="#94a3b8" fontSize="10" fontFamily="monospace" className="transition-all duration-500 ease-out">
                     {mode === 'EYE' ? 'Retina' : 'Sensor'}
                  </text>
                  
                  {/* Object distance indicator (simplified ray source direction) */}
                  <text x="10" y="20" fill="#94a3b8" fontSize="10" fontFamily="monospace">From Object ({uDistance}px)</text>
               </svg>
           </div>
           
           <div className="absolute text-[10px] text-slate-700 right-4 bottom-4 font-mono">
              λ = 555nm (Green-Peak)
           </div>
        </div>
      </div>
    </section>
  );
}
