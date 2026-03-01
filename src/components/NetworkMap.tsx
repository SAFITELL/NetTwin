// Production of Samuel.M.K also know as T756-Tech
'use client';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TelemetryData } from '@/hooks/useTelemetry';

interface MapProps {
    towers: TelemetryData[];
}

export default function NetworkMap({ towers }: MapProps) {
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const markersRef = useRef<{ [id: string]: L.CircleMarker }>({});

    useEffect(() => {
        if (typeof window === 'undefined' || !mapContainerRef.current) return;

        if (!mapRef.current) {
            // Initialize map centered roughly on San Francisco (from simulator.py base)
            mapRef.current = L.map(mapContainerRef.current).setView([37.7749, -122.4194], 12);

            // Use a dark theme tile layer to match Stripe-inspired design
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
                subdomains: 'abcd',
                maxZoom: 20
            }).addTo(mapRef.current);
        }

        const map = mapRef.current;

        // Cleanup old markers if towers disappear (though they don't in our simulation)
        const currentIds = new Set(towers.map(t => t.tower_id));
        Object.keys(markersRef.current).forEach(id => {
            if (!currentIds.has(id)) {
                map.removeLayer(markersRef.current[id]);
                delete markersRef.current[id];
            }
        });

        // Update or add towers
        towers.forEach(tower => {
            // Simulator places towers around 37.7749, -122.4194 randomly.
            // We don't have lat/lng in the telemetry tick response, so we need to either add it to the backend or hash the ID to get static coords.
            // Let's generate static deterministic coordinates based on tower ID for visualization
            const idNum = parseInt(tower.tower_id.replace('TWR-', ''));
            const lat = 37.7749 + (Math.sin(idNum * 12.5) * 0.08);
            const lng = -122.4194 + (Math.cos(idNum * 12.5) * 0.08);

            let color = '#34d399'; // emerlad-400
            let radius = 6;
            if (tower.status === 'WARNING') {
                color = '#fbbf24'; // amber-400
                radius = 8;
            } else if (tower.status === 'CRITICAL') {
                color = '#f87171'; // red-400
                radius = 12;
            }

            if (markersRef.current[tower.tower_id]) {
                // Update existing marker
                const marker = markersRef.current[tower.tower_id];
                marker.setStyle({ color, fillColor: color, radius });
                marker.setPopupContent(`
          <div style="font-family: Inter, sans-serif;">
            <strong>${tower.tower_id}</strong><br/>
            Region: ${tower.region}<br/>
            Load: ${tower.utilization_pct.toFixed(1)}%<br/>
            Latency: ${tower.latency_ms.toFixed(1)}ms
          </div>
        `);
            } else {
                // Create new marker
                const marker = L.circleMarker([lat, lng], {
                    radius,
                    color,
                    fillColor: color,
                    fillOpacity: 0.6,
                    weight: 2
                }).addTo(map);

                marker.bindPopup(`
          <div style="font-family: Inter, sans-serif;">
            <strong>${tower.tower_id}</strong><br/>
            Region: ${tower.region}<br/>
            Load: ${tower.utilization_pct.toFixed(1)}%<br/>
            Latency: ${tower.latency_ms.toFixed(1)}ms
          </div>
        `);

                markersRef.current[tower.tower_id] = marker;
            }
        });

    }, [towers]);

    return <div ref={mapContainerRef} className="w-full h-full" style={{ zIndex: 1 }} />;
}
