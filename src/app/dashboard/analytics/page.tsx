// Production of Samuel.M.K also know as T756-Tech
'use client';
import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function Analytics() {
    const [historicalData, setHistoricalData] = useState<any[]>([]);
    const [kpis, setKpis] = useState({ uptime: '99.98%', interventions: 0, saved_tb: '0.0' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [historyRes, kpiRes] = await Promise.all([
                    fetch('http://localhost:8000/api/v1/analytics/24h-load'),
                    fetch('http://localhost:8000/api/v1/analytics/kpis')
                ]);
                setHistoricalData(await historyRes.json());
                setKpis(await kpiRes.json());
            } catch (e) {
                console.error('Failed to load real Analytics DB data', e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="table-container">
            <div className="p-6 border-b border-light flex justify-between items-center">
                <div>
                    <h2 className="section-title">Network Analytics Room</h2>
                    <p className="section-subtitle">Real historical performance and KPI dashboards from PostgreSQL.</p>
                </div>
                <button className="bg-white/5 border border-white/10 px-4 py-2 rounded text-sm hover:bg-white/10 transition-colors text-white">
                    Export .CSV Report
                </button>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="border border-white/10 rounded p-5 bg-[#0a0a0b]">
                        <h3 className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2">System Uptime</h3>
                        <p className="text-3xl font-light text-white tracking-tight">{kpis.uptime}</p>
                    </div>
                    <div className="border border-white/10 rounded p-5 bg-[#0a0a0b]">
                        <h3 className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2">AI Interventions</h3>
                        <p className="text-3xl font-light text-indigo-400 tracking-tight">{kpis.interventions}<span className="text-sm text-white/40 ml-2 font-normal">Actions Taken</span></p>
                    </div>
                    <div className="border border-white/10 rounded p-5 bg-[#0a0a0b]">
                        <h3 className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2">Congestion Prevented</h3>
                        <p className="text-3xl font-light text-emerald-400 tracking-tight">{kpis.saved_tb}TB<span className="text-sm text-white/40 ml-2 font-normal">Data Saved</span></p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="h-[400px] flex items-center justify-center text-white/50 border border-white/10 rounded bg-[#0a0a0b]">
                        Querying PostgreSQL metrics database...
                    </div>
                ) : (
                    <div className="two-column-layout">
                        <div className="border border-white/10 rounded p-6 bg-[#0a0a0b]">
                            <h3 className="text-sm font-semibold mb-6 text-white text-center">Global Network Load History</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={historicalData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                        <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" fontSize={12} tickMargin={10} />
                                        <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickFormatter={(val) => `${val}%`} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1c1c1f', borderColor: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px' }}
                                            itemStyle={{ color: '#818cf8' }}
                                        />
                                        <Area type="monotone" dataKey="load" stroke="#818cf8" fill="#818cf8" fillOpacity={0.1} strokeWidth={2} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="border border-white/10 rounded p-6 bg-[#0a0a0b]">
                            <h3 className="text-sm font-semibold mb-6 text-white text-center">Hardware Faults Log</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={historicalData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                        <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" fontSize={12} tickMargin={10} />
                                        <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                            contentStyle={{ backgroundColor: '#1c1c1f', borderColor: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px' }}
                                            itemStyle={{ color: '#fbbf24' }}
                                        />
                                        <Bar dataKey="faults" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
