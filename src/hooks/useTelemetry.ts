// Production of Samuel.M.K also know as T756-Tech
import { useState, useEffect } from 'react';

export interface TelemetryData {
    timestamp: str;
    tower_id: string;
    region: string;
    utilization_pct: float;
    latency_ms: float;
    packet_loss_pct: float;
    status: 'NORMAL' | 'WARNING' | 'CRITICAL';
}

export function useTelemetry() {
    const [data, setData] = useState<TelemetryData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Refreshes data from the FastAPI simulation engine every 5 seconds
    const fetchTelemetry = async (eventTrigger?: string) => {
        try {
            let url = 'http://localhost:8000/api/v1/twin/status';
            if (eventTrigger) {
                url += `?event=${eventTrigger}`;
            }

            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch telemetry');

            const json = await res.json();
            setData(json);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTelemetry();
        const interval = setInterval(() => fetchTelemetry(), 5000);
        return () => clearInterval(interval);
    }, []);

    // Compute aggregate stats
    const activeTowers = data.length;
    const criticalTowers = data.filter(t => t.status === 'CRITICAL').length;
    const avgLatency = data.length ? (data.reduce((acc, curr) => acc + curr.latency_ms, 0) / data.length).toFixed(1) : 0;

    // Current top alert (highest utilization)
    const topAlert = data.length ? [...data].sort((a, b) => b.utilization_pct - a.utilization_pct)[0] : null;

    return {
        data,
        isLoading,
        error,
        stats: {
            activeTowers,
            criticalTowers,
            avgLatency,
            topAlert
        },
        triggerEvent: (eventName: string) => fetchTelemetry(eventName)
    };
}
