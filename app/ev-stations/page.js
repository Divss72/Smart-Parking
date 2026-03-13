'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Zap, Fuel, MapPin, Filter, Battery, Plug } from 'lucide-react';
import { evStations } from '@/data/parkingLots';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

const typeConfig = {
    ev: { icon: Zap, color: '#bb86fc', label: 'EV Charging' },
    petrol: { icon: Fuel, color: '#ff9800', label: 'Petrol / Diesel' },
    cng: { icon: Fuel, color: '#00e676', label: 'CNG' },
};

export default function EVStationsPage() {
    const [mounted, setMounted] = useState(false);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        setMounted(true);
        import('leaflet/dist/leaflet.css');
    }, []);

    const filtered = filter === 'all' ? evStations : evStations.filter(s => s.type === filter);

    return (
        <div>
            <div className="page-header">
                <h1>EV Charging & Fuel Stations</h1>
                <p>Discover charging and refueling points across Chandigarh</p>
            </div>

            {/* Filters */}
            <div className="tabs" style={{ maxWidth: '500px', marginBottom: '24px' }}>
                {[
                    { key: 'all', label: 'All Stations' },
                    { key: 'ev', label: '⚡ EV Charging' },
                    { key: 'petrol', label: '⛽ Petrol/Diesel' },
                    { key: 'cng', label: '🟢 CNG' },
                ].map(f => (
                    <button key={f.key} className={`tab ${filter === f.key ? 'active' : ''}`} onClick={() => setFilter(f.key)}>
                        {f.label}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px', height: 'calc(100vh - 220px)' }}>
                {/* Map */}
                <div className="card-static" style={{ padding: 0, overflow: 'hidden', minHeight: '400px' }}>
                    {mounted ? (
                        <MapContainer center={[30.7333, 76.7794]} zoom={13}
                            style={{ height: '100%', width: '100%', borderRadius: 'var(--radius)' }}>
                            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                                attribution='&copy; CARTO' />
                            {filtered.map(station => (
                                <Marker key={station.id} position={[station.lat, station.lng]}>
                                    <Popup>
                                        <div style={{ minWidth: '180px', fontFamily: 'Inter' }}>
                                            <h4 style={{ margin: '0 0 4px', fontSize: '0.9rem', color: '#111' }}>{station.name}</h4>
                                            <p style={{ margin: '0 0 6px', fontSize: '0.8rem', color: '#666' }}>{station.provider}</p>
                                            {station.type === 'ev' && (
                                                <>
                                                    <p style={{ fontSize: '0.8rem', color: '#7c4dff' }}>
                                                        {station.available}/{station.total} chargers available
                                                    </p>
                                                    <p style={{ fontSize: '0.8rem', color: '#555' }}>₹{station.pricePerKwh}/kWh</p>
                                                </>
                                            )}
                                            {station.type === 'petrol' && (
                                                <p style={{ fontSize: '0.8rem', color: '#555' }}>₹{station.pricePerLitre}/L</p>
                                            )}
                                            {station.type === 'cng' && (
                                                <p style={{ fontSize: '0.8rem', color: '#555' }}>₹{station.pricePerKg}/kg</p>
                                            )}
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)' }}>
                            Loading map...
                        </div>
                    )}
                </div>

                {/* Station List */}
                <div style={{ overflowY: 'auto' }}>
                    {filtered.map(station => {
                        const cfg = typeConfig[station.type];
                        const Icon = cfg.icon;
                        return (
                            <div key={station.id} className="card" style={{ padding: '16px', marginBottom: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '10px',
                                        background: `${cfg.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        <Icon size={20} style={{ color: cfg.color }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '2px' }}>{station.name}</h3>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px' }}>{station.provider}</p>

                                        {station.type === 'ev' && (
                                            <>
                                                <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                                                    {station.connectors.map(c => (
                                                        <span key={c} className="chip"><Plug size={10} /> {c}</span>
                                                    ))}
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                                                    <span className="badge badge-green">{station.available}/{station.total} available</span>
                                                    <span style={{ color: 'var(--accent-blue)' }}>₹{station.pricePerKwh}/kWh</span>
                                                </div>
                                            </>
                                        )}

                                        {station.type === 'petrol' && (
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ display: 'flex', gap: '6px' }}>
                                                    {station.fuels.map(f => (
                                                        <span key={f} className="chip">{f}</span>
                                                    ))}
                                                </div>
                                                <span style={{ color: 'var(--accent-amber)', fontWeight: 600, fontSize: '0.85rem' }}>₹{station.pricePerLitre}/L</span>
                                            </div>
                                        )}

                                        {station.type === 'cng' && (
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span className="badge badge-green">CNG Available</span>
                                                <span style={{ color: 'var(--accent-green)', fontWeight: 600, fontSize: '0.85rem' }}>₹{station.pricePerKg}/kg</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
