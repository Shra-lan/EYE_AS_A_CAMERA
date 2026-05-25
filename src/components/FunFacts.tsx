import React from 'react';
import { Camera, Sun, Info, Target } from 'lucide-react';

export function FunFacts() {
  return (
    <section className="bg-slate-900 text-slate-200 pt-16 pb-20 w-full">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Fascinating Parallels</h2>
        <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">Our eyes act as advanced living cameras with performance characteristics that still rival high-end digital sensors.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Resolution Fact */}
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 hover:bg-slate-800 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 text-slate-700/30 group-hover:text-slate-600/30 transition-colors transform group-hover:scale-110 duration-500">
               <Camera size={120} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 text-balance">The 576 Megapixel Eye</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                If the human eye were a digital camera, it would have an "equivalent resolution" of approximately <strong className="text-blue-300">576 megapixels</strong>. This is based on the microscopic density of photoreceptors covering the retina and the wide field of view.
              </p>
            </div>
          </div>

          {/* Rods/High ISO Fact */}
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 hover:bg-slate-800 transition-colors relative overflow-hidden group">
             <div className="absolute top-0 right-0 -mr-6 -mt-6 text-slate-700/30 group-hover:text-amber-500/10 transition-colors transform group-hover:scale-110 duration-500">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[120px] h-[120px]">
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
               </svg>
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center mb-6">
                <Info size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Rods & High ISO Sensors</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Human eyes contain about 120 million <strong className="text-amber-300">rod cells</strong>. They are highly sensitive to light but cannot see color. They function exactly like a camera pushed to extremely <strong className="text-slate-200">High ISO</strong> settings: capturing images in near darkness, but in black-and-white.
              </p>
            </div>
          </div>

          {/* Cones/Daylight Fact */}
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 hover:bg-slate-800 transition-colors relative overflow-hidden group">
             <div className="absolute top-0 right-0 -mr-6 -mt-6 text-slate-700/30 group-hover:text-rose-500/10 transition-colors transform group-hover:scale-110 duration-500">
               <Sun size={120} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-xl flex items-center justify-center mb-6">
                <Sun size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Cones & Daylight Photography</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                 We have only about 6 million <strong className="text-rose-300">cone cells</strong> concentrated beautifully in the macula. They require bright light to function but provide rapid, sharp, full-color vision—much like a camera shooting at <strong className="text-slate-200">low ISO</strong> on a sunny day.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
