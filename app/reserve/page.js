'use client';
import { useState } from 'react';
import { MapPin, Clock, CheckCircle, QrCode, ArrowRight, ArrowLeft, Car, Zap } from 'lucide-react';
import { parkingLots } from '@/data/parkingLots';
import { QRCodeSVG } from 'qrcode.react';

const timeSlots = ['30 min', '1 hour', '2 hours', '3 hours', '4 hours', 'Full Day'];

function generateSlots(lot) {
    const slots = [];
    const rows = ['A', 'B', 'C', 'D', 'E'];
    for (let r = 0; r < rows.length; r++) {
        for (let c = 1; c <= 10; c++) {
            const id = `${rows[r]}${c.toString().padStart(2, '0')}`;
            const rand = Math.random();
            let status = rand < 0.6 ? 'occupied' : 'available';
            if (rows[r] === 'E' && c <= 3) status = 'ev';
            slots.push({ id, status });
        }
    }
    return slots;
}

export default function ReservePage() {
    const [step, setStep] = useState(0);
    const [selectedLot, setSelectedLot] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [vehicleNum, setVehicleNum] = useState('CH01-AB-');
    const [slots, setSlots] = useState([]);
    const [token, setToken] = useState(null);

    const handleSelectLot = (lot) => {
        setSelectedLot(lot);
        setSlots(generateSlots(lot));
        setStep(1);
    };

    const handleSelectSlot = (slot) => {
        if (slot.status === 'occupied') return;
        setSelectedSlot(slot);
    };

    const handleConfirm = () => {
        const tkn = {
            id: `TK-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
            lot: selectedLot.name,
            slot: selectedSlot.id,
            vehicle: vehicleNum,
            duration: selectedTime,
            entry: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            amount: selectedLot.pricePerHour * (timeSlots.indexOf(selectedTime) + 1),
        };
        setToken(tkn);
        setStep(3);
    };

    const steps = ['Select Lot', 'Pick Slot', 'Details', 'Token'];

    return (
        <div>
            <div className="page-header">
                <h1>Reserve a Parking Slot</h1>
                <p>Book your spot in advance and get a QR token for seamless entry</p>
            </div>

            {/* Wizard Steps */}
            <div className="wizard-steps" style={{ marginBottom: '32px' }}>
                {steps.map((s, i) => (
                    <div key={i} style={{ display: 'contents' }}>
                        <div className={`wizard-step ${step === i ? 'active' : step > i ? 'completed' : ''}`}>
                            <span className="step-num">{step > i ? '✓' : i + 1}</span>
                            {s}
                        </div>
                        {i < steps.length - 1 && <div className={`wizard-connector ${step > i ? 'completed' : ''}`} />}
                    </div>
                ))}
            </div>

            {/* Step 0: Select Lot */}
            {step === 0 && (
                <div className="grid-3">
                    {parkingLots.slice(0, 9).map(lot => {
                        const available = lot.totalSlots - lot.occupied;
                        return (
                            <div key={lot.id} className="card" onClick={() => handleSelectLot(lot)} style={{ cursor: 'pointer' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>{lot.name}</h3>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>{lot.sector}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span className="badge badge-green">{available} available</span>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--accent-blue)' }}>₹{lot.pricePerHour}/hr</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill green" style={{ width: `${(lot.occupied / lot.totalSlots) * 100}%` }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Step 1: Pick Slot */}
            {step === 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
                    <div className="card-static">
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                            {selectedLot?.name} — Slot Map
                        </h3>
                        <div className="slot-grid">
                            {slots.map(slot => (
                                <div key={slot.id}
                                    className={`slot ${slot.status} ${selectedSlot?.id === slot.id ? 'selected' : ''}`}
                                    onClick={() => handleSelectSlot(slot)}
                                    title={slot.id}
                                >
                                    {slot.status === 'ev' ? <Zap size={12} /> : slot.id.substring(1)}
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '16px', marginTop: '16px', fontSize: '0.8rem' }}>
                            <span><span className="status-dot green" /> Available</span>
                            <span><span className="status-dot red" /> Occupied</span>
                            <span><span className="status-dot blue" /> Selected</span>
                            <span style={{ color: 'var(--accent-purple)' }}>⚡ EV Charging</span>
                        </div>
                    </div>
                    <div>
                        <div className="card-static" style={{ marginBottom: '16px' }}>
                            <h4 style={{ fontSize: '0.9rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>Selected</h4>
                            {selectedSlot ? (
                                <div>
                                    <div className="metric-value" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{selectedSlot.id}</div>
                                    <span className={`badge badge-${selectedSlot.status === 'ev' ? 'purple' : 'green'}`}>
                                        {selectedSlot.status === 'ev' ? '⚡ EV Charging Spot' : 'Regular Spot'}
                                    </span>
                                </div>
                            ) : (
                                <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Click a slot on the map</p>
                            )}
                        </div>
                        {selectedSlot && (
                            <button className="btn btn-primary" onClick={() => setStep(2)} style={{ width: '100%', justifyContent: 'center' }}>
                                Continue <ArrowRight size={16} />
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
                <div style={{ maxWidth: '500px' }}>
                    <div className="card-static">
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Booking Details</h3>

                        <div className="input-group">
                            <label>Vehicle Number</label>
                            <input value={vehicleNum} onChange={e => setVehicleNum(e.target.value)} placeholder="CH01-AB-1234" />
                        </div>

                        <div className="input-group">
                            <label>Duration</label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                {timeSlots.map(t => (
                                    <button key={t}
                                        className={`tab ${selectedTime === t ? 'active' : ''}`}
                                        onClick={() => setSelectedTime(t)}
                                        style={{ textAlign: 'center' }}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', padding: '16px', marginTop: '16px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                <span>Parking Lot</span>
                                <span>{selectedLot?.name}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                <span>Slot</span>
                                <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{selectedSlot?.id}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                <span>Duration</span>
                                <span>{selectedTime || '—'}</span>
                            </div>
                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8px', marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 600 }}>Total</span>
                                <span className="metric-value" style={{ fontSize: '1.2rem' }}>
                                    ₹{selectedTime ? selectedLot?.pricePerHour * (timeSlots.indexOf(selectedTime) + 1) : 0}
                                </span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="btn btn-secondary" onClick={() => setStep(1)}>
                                <ArrowLeft size={16} /> Back
                            </button>
                            <button className="btn btn-success" onClick={handleConfirm} disabled={!selectedTime}
                                style={{ flex: 1, justifyContent: 'center', opacity: selectedTime ? 1 : 0.5 }}>
                                <CheckCircle size={16} /> Confirm & Pay
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 3: Token */}
            {step === 3 && token && (
                <div style={{ maxWidth: '450px', margin: '0 auto', textAlign: 'center' }}>
                    <div className="card-static" style={{ padding: '40px' }}>
                        <div style={{
                            width: '60px', height: '60px', borderRadius: '50%',
                            background: 'var(--accent-green-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 20px',
                        }}>
                            <CheckCircle size={30} style={{ color: 'var(--accent-green)' }} />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Booking Confirmed!</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Show this QR at the entry gate</p>

                        <div style={{
                            background: '#fff', borderRadius: '12px', padding: '20px',
                            display: 'inline-block', marginBottom: '24px',
                        }}>
                            <QRCodeSVG value={JSON.stringify(token)} size={180} level="H" />
                        </div>

                        <div style={{ textAlign: 'left', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '4px' }}>Token ID</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px', color: 'var(--accent-blue)' }}>{token.id}</div>

                            {[
                                ['Parking Lot', token.lot],
                                ['Slot', token.slot],
                                ['Vehicle', token.vehicle],
                                ['Duration', token.duration],
                                ['Date', token.date],
                                ['Amount Paid', `₹${token.amount}`],
                            ].map(([k, v]) => (
                                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.85rem', borderBottom: '1px solid var(--border-color)' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                                    <span style={{ fontWeight: 500 }}>{v}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
