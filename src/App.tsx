/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AnatomyMapper } from './components/AnatomyMapper';
import { OcularOpticsSimulator } from './components/OcularOpticsSimulator';
import { FunFacts } from './components/FunFacts';
import { Eye } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-blue-200">
      
      {/* Header Section */}
      <header className="bg-slate-950 border-b border-slate-800 pt-16 pb-12 w-full px-6 shadow-md relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1/2 bg-blue-500/10 blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
           <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-900/50 text-blue-400 mb-4 shadow-inner border border-blue-800/50">
             <Eye size={32} />
           </div>
           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">The Eye as a Camera</h1>
           <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
             An interactive journey exploring the brilliant engineering shared by biological vision and digital photography.
           </p>
        </div>
      </header>

      {/* Main Content Areas */}
      <main className="w-full flex flex-col items-center py-12 px-4 md:px-8 space-y-16 max-w-7xl mx-auto">
         <AnatomyMapper />
         
         {/* Combined Math Core / Optics Simulator from OcularOptics */}
         <OcularOpticsSimulator />
      </main>

      <FunFacts />

    </div>
  );
}
