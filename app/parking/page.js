'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Navigation, Zap, Star, Car, ArrowRight } from 'lucide-react';
import { parkingLots, getAvailability, getAvailabilityColor } from '@/data/parkingLots';
import Link from 'next/link';

// Dynamic import for Leaflet (SSR not supported)
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

function ParkingCard({ lot }) {
    const available = lot.totalSlots - lot.occupied;
    const pct = Math.round((lot.occupied / lot.totalSlots) * 100);
    const avail = getAvailability(lot);
    const color = getAvailabilityColor(lot);

    return (
        <div className="card" style={{ padding: '16px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '4px' }}>{lot.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{lot.sector} • {lot.type}</p>
                </div>
                <span className={`badge badge-${avail === 'high' ? 'green' : avail === 'medium' ? 'amber' : 'red'}`}>
                    {available} free
                </span>
            </div>

            <div className="progress-bar" style={{ marginBottom: '10px' }}>
                <div className={`progress-fill ${avail === 'high' ? 'green' : avail === 'medium' ? 'amber' : 'red'}`}
                    style={{ width: `${pct}%` }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                <span>{lot.occupied}/{lot.totalSlots} occupied ({pct}%)</span>
                <span>₹{lot.pricePerHour}/hr</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                {lot.evChargers > 0 && <span className="chip"><Zap size={10} /> {lot.evChargers} EV</span>}
                <span className="chip"><Star size={10} /> {lot.rating}</span>
            </div>

            <Link href="/reserve" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: '0.85rem' }}>
                Reserve <ArrowRight size={14} />
            </Link>
        </div>
    );
}

export default function ParkingMapPage() {
    const [mounted, setMounted] = useState(false);
    const [selectedLot, setSelectedLot] = useState(null);

    useEffect(() => {
        setMounted(true);
        // Import leaflet CSS
        import('leaflet/dist/leaflet.css');
    }, []);

    return (
        <div>
            <div className="page-header">
                <h1>Find Parking</h1>
                <p>Real-time parking availability across Chandigarh</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px', height: 'calc(100vh - 160px)' }}>
                {/* Map */}
                <div className="card-static" style={{ padding: 0, overflow: 'hidden', minHeight: '500px' }}>
                    {mounted ? (
                        <MapContainer
                            center={[30.7333, 76.7794]}
                            zoom={13}
                            style={{ height: '100%', width: '100%', borderRadius: 'var(--radius)' }}
                            scrollWheelZoom={true}
                        >
                            <TileLayer
                                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                            />
                            {parkingLots.map(lot => (
                                <Marker key={lot.id} position={[lot.lat, lot.lng]}>
                                    <Popup>
                                        <div style={{ minWidth: '200px', fontFamily: 'Inter, sans-serif' }}>
                                            <h4 style={{ margin: '0 0 6px', fontSize: '0.95rem', color: '#111' }}>{lot.name}</h4>
                                            <p style={{ margin: '0 0 4px', fontSize: '0.8rem', color: '#555' }}>{lot.sector}</p>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0', fontSize: '0.85rem' }}>
                                                <span style={{ color: getAvailabilityColor(lot), fontWeight: 700 }}>
                                                    {lot.totalSlots - lot.occupied} slots free
                                                </span>
                                                <span style={{ color: '#888' }}>₹{lot.pricePerHour}/hr</span>
                                            </div>
                                            {lot.evChargers > 0 && (
                                                <p style={{ margin: '4px 0', fontSize: '0.8rem', color: '#7c4dff' }}>⚡ {lot.evChargers} EV chargers</p>
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

                {/* Sidebar list */}
                <div style={{ overflowY: 'auto', paddingRight: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <Car size={18} style={{ color: 'var(--accent-blue)' }} />
                        <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{parkingLots.length} Parking Lots</span>
                    </div>
                    {parkingLots.map(lot => (
                        <ParkingCard key={lot.id} lot={lot} />
                    ))}
                </div>
            </div>
        </div>
    );
}
