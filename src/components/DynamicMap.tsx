// Production of Samuel.M.K also know as T756-Tech
'use client';
import dynamic from 'next/dynamic';

const NetworkMap = dynamic(() => import('./NetworkMap'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-[#0a0a0b] text-white/50 text-sm">
            Loading Leaflet Map...
        </div>
    )
});

export default NetworkMap;
