// Production of Samuel.M.K also know as T756-Tech
'use client';
import { useTelemetry } from '@/hooks/useTelemetry';
import DynamicMap from '@/components/DynamicMap';

export default function DigitalTwin() {
    const { data, isLoading, error, stats, triggerEvent } = useTelemetry();

    return (
        <div className="table-container">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <div>
                    <h2 className="section-title">Network Digital Twin</h2>
                    <p className="section-subtitle">Real-time view of your simulated telecom infrastructure.</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => triggerEvent('STADIUM_MATCH')} className="bg-white/5 border border-white/10 px-4 py-2 rounded text-sm hover:bg-white/10 transition-colors text-white">
                        Simulate: Match
                    </button>
                    <button onClick={() => triggerEvent('PAYDAY')} className="bg-indigo-600 px-4 py-2 rounded text-sm font-medium hover:bg-indigo-500 transition-colors text-white">
                        Simulate: Payday Spikes
                    </button>
                </div>
            </div>

            <div className="p-6">
                <div className="two-column-layout">
                    {/* Main Map View (Left) */}
                    <div className="border border-white/10 rounded overflow-hidden aspect-video relative">
                        <DynamicMap towers={data} />
                    </div>

                    {/* Details Panel (Right) */}
                    <div className="flex flex-col gap-6">
                        <div className="border border-white/10 rounded p-4">
                            <h3 className="text-sm font-semibold mb-4 text-white">Network Status</h3>
                            <div className="flex flex-col gap-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-white/50">Active Towers</span>
                                    <span className="text-white">{stats.activeTowers} / 50</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/50">Total Throughput</span>
                                    <span className="text-white">Live Polling</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/50">Avg Latency</span>
                                    <span className="text-emerald-500">{stats.avgLatency}ms</span>
                                </div>
                            </div>
                        </div>

                        <div className="border border-white/10 rounded p-4">
                            <h3 className="text-sm font-semibold mb-4 text-white">Top Alert</h3>
                            {stats.topAlert && stats.topAlert.status !== 'NORMAL' ? (
                                <div className={`border rounded p-3 text-sm ${stats.topAlert.status === 'CRITICAL' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'}`}>
                                    <span className="font-medium block mb-1">Tower {stats.topAlert.tower_id} Near Capacity</span>
                                    <span className="text-white/70">Load reading at {stats.topAlert.utilization_pct}%. Recommend triggering Mistral AI for resolution payload.</span>
                                    <button className={`mt-3 px-3 py-1.5 rounded w-full border transition-colors ${stats.topAlert.status === 'CRITICAL' ? 'bg-red-500/20 border-red-500/30 hover:bg-red-500/30' : 'bg-amber-500/20 border-amber-500/30 hover:bg-amber-500/30'} text-white`}>
                                        Analyze deeply
                                    </button>
                                </div>
                            ) : (
                                <div className="text-sm text-white/50 py-4 text-center">No active alerts. Network operating normally.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            {error && <div className="p-4 bg-red-500/20 text-red-400 border-y border-red-500/30 text-sm">Connection Error: {error}</div>}

            <table className="mt-6 border-t border-white/10 w-full text-sm">
                <thead>
                    <tr className="border-b border-white/10 text-white/50 text-left">
                        <th className="p-4 font-medium uppercase tracking-wider text-xs">Tower ID</th>
                        <th className="p-4 font-medium uppercase tracking-wider text-xs">Region</th>
                        <th className="p-4 font-medium uppercase tracking-wider text-xs">Status</th>
                        <th className="p-4 font-medium uppercase tracking-wider text-xs text-right">Utilization</th>
                        <th className="p-4 font-medium uppercase tracking-wider text-xs text-right">Latency</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr><td colSpan={5} className="p-8 text-center text-white/40">Connecting to Simulator Engine...</td></tr>
                    ) : (
                        data.map((tower) => (
                            <tr key={tower.tower_id} className="border-b border-white/5 hover:bg-white/[0.02]">
                                <td className="p-4 font-medium text-white">{tower.tower_id}</td>
                                <td className="p-4 text-white/70">{tower.region}</td>
                                <td className="p-4">
                                    <span className={tower.status === 'CRITICAL' ? 'text-red-400' : tower.status === 'WARNING' ? 'text-amber-400' : 'text-emerald-400'}>
                                        {tower.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right text-white/90">{tower.utilization_pct.toFixed(1)}%</td>
                                <td className="p-4 text-right text-white/90">{tower.latency_ms.toFixed(1)}ms</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
