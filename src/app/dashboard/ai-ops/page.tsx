// Production of Samuel.M.K also know as T756-Tech
'use client';
import { useState } from 'react';
import { useMistral } from '@/hooks/useMistral';

export default function AIOps() {
    const { messages, sendMessage, isChatLoading, activeRecommendation, dismissRecommendation, executeAction, isActionExecuting, decisionLog } = useMistral();
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        if (inputText.trim()) {
            sendMessage(inputText);
            setInputText('');
        }
    };

    return (
        <div className="table-container">
            <div className="p-6 border-b border-light">
                <h2 className="section-title">AI Operations Center</h2>
                <p className="section-subtitle">Autonomous reasoning, recommendations, and anomaly detection.</p>
            </div>

            <div className="p-6">
                <div className="two-column-layout">

                    {/* Active AI Recommendations (Left) */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-white font-medium text-sm uppercase tracking-wide">Active Recommendations</h3>

                        {activeRecommendation ? (
                            <div className="border border-indigo-500/30 bg-indigo-500/5 rounded p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="text-indigo-400 font-semibold">Optimization Strategy ⚡ Tower {activeRecommendation.tower_id}</h4>
                                    <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded">Mistral AI</span>
                                </div>

                                <div className="text-sm text-white/80 mb-4 whitespace-pre-wrap leading-relaxed">
                                    {activeRecommendation.recommendation}
                                </div>

                                <div className="flex gap-3 mt-4 pt-4 border-t border-indigo-500/10">
                                    <button
                                        onClick={executeAction}
                                        disabled={isActionExecuting}
                                        className="bg-indigo-600 px-4 py-2 rounded text-sm font-medium hover:bg-indigo-500 transition-colors text-white disabled:opacity-50"
                                    >
                                        {isActionExecuting ? 'Executing...' : 'Execute Strategy'}
                                    </button>
                                    <button onClick={dismissRecommendation} className="bg-white/5 border border-white/10 px-4 py-2 rounded text-sm hover:bg-white/10 transition-colors text-white">
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="border border-white/5 bg-white/[0.02] rounded p-8 text-center text-white/40 text-sm">
                                No active recommendations. You can trigger an analysis from the Digital Twin view.
                            </div>
                        )}
                    </div>

                    {/* AI Chat Interface (Right) */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-white font-medium text-sm uppercase tracking-wide">Mistral NOC Assistant</h3>

                        <div className="border border-white/10 flex flex-col h-[500px] rounded bg-[#0a0a0b]">
                            {/* Chat History */}
                            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 text-sm">
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-3 rounded-lg max-w-[90%] border ${msg.role === 'assistant'
                                            ? 'bg-[#1c1c1f] rounded-tl-none self-start border-white/5 text-white/80'
                                            : 'bg-indigo-600/20 rounded-tr-none self-end border-indigo-500/20 text-white/90'
                                            }`}
                                    >
                                        <pre className="whitespace-pre-wrap font-sans m-0">{msg.content}</pre>
                                    </div>
                                ))}
                                {isChatLoading && (
                                    <div className="bg-[#1c1c1f] p-3 rounded-lg rounded-tl-none self-start max-w-[90%] border border-white/5 text-white/40 italic">
                                        Mistral is thinking...
                                    </div>
                                )}
                            </div>

                            {/* Chat Input */}
                            <div className="p-3 border-t border-white/10 bg-[#121214]">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="Ask a question..."
                                        className="w-full bg-[#0a0a0b] border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                                        disabled={isChatLoading}
                                    />
                                    <button
                                        onClick={handleSend}
                                        className="absolute right-2 top-1.5 text-white/40 hover:text-white"
                                        disabled={isChatLoading}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Decision Log Table */}
            <table className="mt-6 border-t border-white/10 w-full text-sm">
                <thead>
                    <tr className="border-b border-light text-white/50 text-left">
                        <th className="p-4 font-medium uppercase tracking-wider text-xs">Timestamp</th>
                        <th className="p-4 font-medium uppercase tracking-wider text-xs">Action Taken</th>
                        <th className="p-4 font-medium uppercase tracking-wider text-xs">Target</th>
                        <th className="p-4 font-medium uppercase tracking-wider text-xs text-right">Confidence</th>
                    </tr>
                </thead>
                <tbody>
                    {decisionLog.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="p-8 text-center text-white/40 border-b border-white/5">
                                No autonomous actions taken in the current session.
                            </td>
                        </tr>
                    ) : (
                        decisionLog.map((log) => (
                            <tr key={log.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                                <td className="p-4 font-medium text-white/70">
                                    {new Date(log.timestamp).toLocaleTimeString()}
                                </td>
                                <td className="p-4 text-white">
                                    {log.action_taken}
                                </td>
                                <td className="p-4">
                                    <span className="bg-white/10 text-white/80 px-2 py-1 rounded text-xs">{log.target}</span>
                                </td>
                                <td className="p-4 text-right">
                                    <span className="text-emerald-400 font-medium">{(log.confidence * 100).toFixed(0)}%</span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
