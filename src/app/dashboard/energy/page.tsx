// Production of Samuel.M.K also know as T756-Tech
'use client';
import { useState, useEffect } from 'react';

export default function Energy() {
    const [powerSavings, setPowerSavings] = useState(0);
    const [sleepingCount, setSleepingCount] = useState(0);
    const [nodes, setNodes] = useState({ sleeping_nodes: [], candidates: [] });
    const [isLoading, setIsLoading] = useState(true);

    const fetchStatus = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/v1/energy/status');
            const data = await res.json();
            setPowerSavings(data.total_savings_kwh);
            setSleepingCount(data.sleeping_count);
            setNodes({ sleeping_nodes: data.sleeping_nodes, candidates: data.candidates });
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 5000);
        return () => clearInterval(interval);
    }, []);

    const toggleSleepState = async (id: string, currentlySleeping: boolean) => {
        try {
            await fetch('http://localhost:8000/api/v1/energy/toggle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tower_id: id, is_sleeping: !currentlySleeping })
            });
            fetchStatus();
        } catch (e) {
            console.error("Failed to toggle tower state", e);
        }
    };

    return (
        <div className="table-container">
            <div className="p-6 border-b border-light flex justify-between items-center">
                <div>
                    <h2 className="section-title">Energy Optimization</h2>
                    <p className="section-subtitle">Power consumption monitoring and smart sleep suggestions.</p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded text-emerald-400 font-medium text-sm flex gap-2 items-center">
                    <span>⚡</span>
                    <span>Est. Savings: {powerSavings.toFixed(1)} kW/h</span>
                </div>
            </div>

            <div className="p-6">
                <div className="two-column-layout">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-white font-medium text-sm uppercase tracking-wide">Smart Sleep Candidates</h3>
                        <p className="text-white/50 text-xs mb-2">Mistral AI has identified these nodes for low-power sleep state based on historical traffic patterns.</p>

                        <div className="border border-white/10 rounded overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-[#0a0a0b] text-white/50 text-left border-b border-white/10">
                                        <th className="p-3 font-medium">Node</th>
                                        <th className="p-3 font-medium">Current Load</th>
                                        <th className="p-3 font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {nodes.candidates.map((node: any) => (
                                        <tr key={node.id} className="border-b border-white/5 text-white">
                                            <td className="p-3 text-white/80">{node.name}</td>
                                            <td className="p-3 font-mono text-xs text-emerald-400">Low Utilization</td>
                                            <td className="p-3">
                                                <button onClick={() => toggleSleepState(node.id, false)} className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors text-white">Force Sleep</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {nodes.candidates.length === 0 && (
                                        <tr><td colSpan={3} className="p-4 flex items-center justify-center text-white/50 text-sm italic">No towers are eligible for sleep right now.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-white font-medium text-sm uppercase tracking-wide">Currently Sleeping ({sleepingCount})</h3>
                        <div className="border border-white/10 rounded overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-[#0a0a0b] text-white/50 text-left border-b border-white/10">
                                        <th className="p-3 font-medium">Node</th>
                                        <th className="p-3 font-medium">Sleep Duration</th>
                                        <th className="p-3 font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {nodes.sleeping_nodes.map((node: any) => (
                                        <tr key={node.id} className="border-b border-white/5 text-white">
                                            <td className="p-3 text-white/80">{node.name}</td>
                                            <td className="p-3 text-white/60">Active Power Save</td>
                                            <td className="p-3">
                                                <button onClick={() => toggleSleepState(node.id, true)} className="text-xs text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 px-2 py-1 rounded transition-colors">Wake Up</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {nodes.sleeping_nodes.length === 0 && (
                                        <tr><td colSpan={3} className="p-4 flex items-center justify-center text-white/50 text-sm italic">All towers are active.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
