// Production of Samuel.M.K also know as T756-Tech
'use client';
import { useState } from 'react';

export default function Predictions() {
    const [simulationRunning, setSimulationRunning] = useState(false);
    const [scenarioProps, setScenarioProps] = useState({
        eventType: "Major Sporting Event (High localized load)",
        region: "Downtown District",
        severity: 3
    });
    const [predictionResult, setPredictionResult] = useState<any>(null);

    const handleSimulate = async () => {
        setSimulationRunning(true);
        setPredictionResult(null);
        try {
            const res = await fetch('http://localhost:8000/api/v1/predictions/simulate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event_type: scenarioProps.eventType,
                    target_region: scenarioProps.region,
                    severity: scenarioProps.severity
                })
            });
            const data = await res.json();
            setPredictionResult(data);
        } catch (e) {
            console.error("Simulation failed", e);
        } finally {
            setSimulationRunning(false);
        }
    };

    return (
        <div className="table-container">
            <div className="p-6 border-b border-light">
                <h2 className="section-title">Congestion Prediction & Simulator</h2>
                <p className="section-subtitle">Stress-test the network topologies with synthetic events and disaster scenarios.</p>
            </div>

            <div className="p-6">
                <div className="two-column-layout">

                    <div className="flex flex-col gap-6">
                        <h3 className="text-white font-medium text-sm border-b border-white/10 pb-3">Scenario Builder</h3>

                        <div className="flex flex-col gap-4">
                            <div className="auth-input-group">
                                <label className="auth-label">Event Type</label>
                                <select
                                    value={scenarioProps.eventType}
                                    onChange={(e) => setScenarioProps({ ...scenarioProps, eventType: e.target.value })}
                                    className="bg-[#0a0a0b] border border-white/20 text-white text-sm rounded focus:border-indigo-500 w-full p-2.5"
                                >
                                    <option>Major Sporting Event (High localized load)</option>
                                    <option>Natural Disaster (Node cascading failure)</option>
                                    <option>Holiday Spike (Global high throughput)</option>
                                    <option>BGP Routing Error (Latency spike)</option>
                                </select>
                            </div>

                            <div className="auth-input-group">
                                <label className="auth-label">Target Region</label>
                                <select
                                    value={scenarioProps.region}
                                    onChange={(e) => setScenarioProps({ ...scenarioProps, region: e.target.value })}
                                    className="bg-[#0a0a0b] border border-white/20 text-white text-sm rounded focus:border-indigo-500 w-full p-2.5"
                                >
                                    <option>Downtown District</option>
                                    <option>Suburban Ring</option>
                                    <option>Industrial Zone</option>
                                    <option>Global (All Nodes)</option>
                                </select>
                            </div>

                            <div className="auth-input-group">
                                <label className="auth-label">Severity Multiplier</label>
                                <input
                                    type="range" min="1" max="5"
                                    value={scenarioProps.severity}
                                    onChange={(e) => setScenarioProps({ ...scenarioProps, severity: parseInt(e.target.value) })}
                                    className="w-full accent-indigo-500"
                                />
                                <div className="flex justify-between text-white/40 text-xs mt-1">
                                    <span>Low Impact</span>
                                    <span>Catastrophic</span>
                                </div>
                            </div>

                            <button
                                onClick={handleSimulate}
                                disabled={simulationRunning}
                                className="mt-4 bg-indigo-600 px-4 py-3 rounded text-sm font-medium hover:bg-indigo-500 transition-colors text-white disabled:opacity-50"
                            >
                                {simulationRunning ? 'Running Forecasting Models...' : 'Run Scenario Forecasting'}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h3 className="text-white font-medium text-sm border-b border-white/10 pb-3">Prediction Output</h3>

                        {simulationRunning ? (
                            <div className="border border-white/10 border-dashed rounded h-[300px] flex items-center justify-center bg-white/[0.02]">
                                <div className="text-center text-white/50 text-sm flex flex-col items-center gap-3">
                                    <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                    Generating predictive heatmap with Mistral AI...
                                </div>
                            </div>
                        ) : predictionResult ? (
                            <div className="border border-white/10 rounded bg-[#0a0a0b] p-6 text-sm">
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded">
                                        <div className="text-xs text-red-500/70 font-medium uppercase mb-1">Predicted Downtime</div>
                                        <div className="text-2xl text-red-400 font-light">{predictionResult.predicted_downtime_minutes}m</div>
                                    </div>
                                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded">
                                        <div className="text-xs text-amber-500/70 font-medium uppercase mb-1">Affected Users (Est)</div>
                                        <div className="text-2xl text-amber-400 font-light">{(predictionResult.affected_users / 1000).toFixed(1)}k</div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="text-white/70 font-medium text-xs uppercase mb-2">Critical Failure Nodes</h4>
                                    <div className="flex gap-2 flex-wrap">
                                        {predictionResult.critical_failures.map((node: string) => (
                                            <span key={node} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/80 font-mono">{node}</span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-white/70 font-medium text-xs uppercase mb-2">AI Root Cause Analysis</h4>
                                    <p className="text-white/60 leading-relaxed text-xs">
                                        {predictionResult.ai_analysis}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="border border-white/10 rounded bg-[#0a0a0b] p-6 text-sm">
                                <p className="text-white/60 text-center py-10">
                                    Select a scenario and click run to generate a forecasting model. <br /><br />
                                    The Mistral AI engine will predict node failures and suggest preemptive infrastructure upgrades.
                                </p>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
}
