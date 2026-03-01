// Production of Samuel.M.K also know as T756-Tech
'use client';
import { useState, useEffect } from 'react';

export default function Planning() {
    const [placementMode, setPlacementMode] = useState(false);
    const [newNodes, setNewNodes] = useState(0);
    const [roiData, setRoiData] = useState<any>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateBlueprint = async () => {
        setIsGenerating(true);
        try {
            const res = await fetch('http://localhost:8000/api/v1/planning/roi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ new_towers_count: newNodes || 3, region: 'Stadium Sector B' })
            });
            const data = await res.json();
            setRoiData(data);
        } catch (e) {
            console.error(e);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="table-container">
            <div className="p-6 border-b border-light flex justify-between items-center">
                <div>
                    <h2 className="section-title">Network Planning</h2>
                    <p className="section-subtitle">Forecast capacity and simulate new infrastructure rollout.</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => { setPlacementMode(!placementMode); setNewNodes(p => p + 1); }}
                        className={`${placementMode ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-500'} px-4 py-2 rounded text-sm font-medium transition-colors text-white`}
                    >
                        {placementMode ? `Simulating ${newNodes} New Node(s)` : '+ Place Node on Map'}
                    </button>
                </div>
            </div>

            <div className="p-6">
                <div className="two-column-layout">

                    {/* Map Placeholder for Planning */}
                    <div className="border border-white/10 rounded overflow-hidden aspect-video bg-[#0a0a0b] flex flex-col items-center justify-center relative cursor-crosshair">
                        <span className="text-white/30 font-medium tracking-widest uppercase mb-4">Topological Survey Map</span>
                        <div className="absolute inset-0 border-[4px] border-white/5 border-dashed m-10 pointer-events-none rounded-lg"></div>
                        {placementMode && (
                            <div className="absolute top-4 right-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded text-xs animate-pulse">
                                Placement Mode Active
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="border border-white/10 rounded p-5 bg-[#0a0a0b]">
                            <h3 className="text-white font-semibold text-sm mb-4">Coverage Gap Analysis</h3>
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-white/60 text-sm">Industrial Zone East</span>
                                    <span className="text-red-400 text-xs font-medium px-2 py-1 bg-red-400/10 rounded">High Priority</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-white/60 text-sm">Stadium Sector B</span>
                                    <span className="text-amber-400 text-xs font-medium px-2 py-1 bg-amber-400/10 rounded">Medium Priority</span>
                                </div>
                            </div>

                            <button
                                onClick={handleGenerateBlueprint}
                                disabled={isGenerating}
                                className="w-full mt-4 bg-white/5 hover:bg-white/10 transition-colors text-white/80 py-2 rounded text-sm border border-white/10 disabled:opacity-50"
                            >
                                {isGenerating ? 'Generating Analysis...' : 'Auto-Generate Blueprint via Mistral'}
                            </button>
                        </div>

                        <div className="border border-white/10 rounded p-5">
                            <h3 className="text-white font-semibold text-sm mb-3">ROI Estimator</h3>
                            <div className="text-sm text-white/50">
                                {roiData ? (
                                    <>
                                        <p className="mb-2">Adding {newNodes || 3} new small cell(s) in the highlighted zones will yield:</p>
                                        <ul className="list-disc pl-4 space-y-1 text-emerald-400/80 mb-4">
                                            <li>{roiData.latency_reduction_pct.toFixed(1)}% reduction in global latency</li>
                                            <li>Est. CapEx: ${roiData.capex.toLocaleString()}</li>
                                            <li>Payback period: {roiData.payback_months} months</li>
                                        </ul>
                                        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded text-indigo-200 text-xs leading-relaxed">
                                            <strong>Mistral AI Analysis:</strong> {roiData.ai_summary}
                                        </div>
                                    </>
                                ) : (
                                    <p>Select zones and click generate to build an AI-driven ROI case.</p>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
