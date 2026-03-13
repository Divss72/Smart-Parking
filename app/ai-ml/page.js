'use client';
import { useState } from 'react';
import {
    Brain, Eye, ScanLine, TrendingUp, ShieldAlert, AlertTriangle,
    Camera, Target, Activity, Sparkles
} from 'lucide-react';
import { demandPrediction } from '@/data/analytics';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
    Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const anprResults = [
    { plate: 'CH01-AB-1234', confidence: 97, time: '10:15:03', action: 'Verified — Booking TK-7829', status: 'ok' },
    { plate: 'PB10-CD-5678', confidence: 94, time: '10:15:06', action: 'Verified — FASTag Auto', status: 'ok' },
    { plate: 'HR26-XX-9999', confidence: 92, time: '10:12:41', action: 'UNAUTHORIZED — No booking', status: 'alert' },
    { plate: 'DL08-MN-3456', confidence: 89, time: '10:10:22', action: 'Warning — Expired booking', status: 'warning' },
    { plate: 'CH02-EF-7890', confidence: 96, time: '10:08:15', action: 'Verified — Booking TK-7801', status: 'ok' },
    { plate: 'PB65-GH-2345', confidence: 91, time: '10:05:33', action: 'Verified — FASTag Auto', status: 'ok' },
];

const tamperingAlerts = [
    { camera: 'CAM-17-03', type: 'Lens covered', time: '09:42 AM', confidence: 95, severity: 'critical' },
    { camera: 'CAM-EL-02', type: 'Angle shifted', time: '09:38 AM', confidence: 82, severity: 'warning' },
    { camera: 'CAM-ISBT-01', type: 'Blurred lens', time: '08:15 AM', confidence: 78, severity: 'warning' },
];

const suspiciousEvents = [
    { id: 'SE-001', location: 'ISBT Zone A', type: 'Loitering detected', time: '08:50 AM', confidence: 72, resolved: false },
    { id: 'SE-002', location: 'Sec 17 Zone C', type: 'Unusual movement pattern', time: '07:30 AM', confidence: 65, resolved: true },
    { id: 'SE-003', location: 'Elante L2', type: 'Attempted vehicle break-in', time: '06:15 AM', confidence: 88, resolved: true },
];

export default function AIMLPage() {
    const predictionData = {
        labels: demandPrediction.labels,
        datasets: [
            {
                label: 'Actual',
                data: demandPrediction.actual,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59,130,246,0.1)',
                fill: false,
                tension: 0.4,
                pointRadius: 4,
                borderWidth: 3,
            },
            {
                label: 'Predicted',
                data: demandPrediction.predicted,
                borderColor: '#8b5cf6',
                borderDash: [6, 4],
                fill: false,
                tension: 0.4,
                pointRadius: 3,
                borderWidth: 2,
            },
            {
                label: 'Upper Bound',
                data: demandPrediction.confidence_upper,
                borderColor: 'transparent',
                backgroundColor: 'rgba(187,134,252,0.08)',
                fill: '+1',
                tension: 0.4,
                pointRadius: 0,
            },
            {
                label: 'Lower Bound',
                data: demandPrediction.confidence_lower,
                borderColor: 'transparent',
                backgroundColor: 'rgba(187,134,252,0.08)',
                fill: false,
                tension: 0.4,
                pointRadius: 0,
            },
        ],
    };

    const chartOpts = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: '#9ca3c7', font: { family: 'Inter', size: 11 } } },
        },
        scales: {
            x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148,163,184,0.12)' } },
            y: { min: 0, max: 100, ticks: { color: '#94a3b8', callback: v => `${v}%` }, grid: { color: 'rgba(148,163,184,0.12)' } },
        },
    };

    return (
        <div>
            <div className="page-header">
                <h1>AI & Machine Learning</h1>
                <p>ANPR, occupancy detection, demand forecasting, and security intelligence</p>
            </div>

            {/* AI Stats */}
            <div className="grid-4" style={{ marginBottom: '24px' }}>
                {[
                    { label: 'Plates Detected Today', value: '12,847', icon: ScanLine, color: 'blue' },
                    { label: 'Detection Accuracy', value: '96.3%', icon: Target, color: 'green' },
                    { label: 'Tampering Alerts', value: '3', icon: ShieldAlert, color: 'red' },
                    { label: 'Models Active', value: '5', icon: Brain, color: 'purple' },
                ].map((m, i) => {
                    const Icon = m.icon;
                    return (
                        <div key={i} className={`metric-card ${m.color} animate-fade-in`} style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <Icon size={14} style={{ opacity: 0.7 }} />
                                <span className="metric-label" style={{ marginBottom: 0 }}>{m.label}</span>
                            </div>
                            <div className={`metric-value ${m.color}`} style={{ fontSize: '1.8rem' }}>{m.value}</div>
                        </div>
                    );
                })}
            </div>

            <div className="grid-2" style={{ marginBottom: '24px' }}>
                {/* ANPR Results */}
                <div className="card-static">
                    <h3 className="section-title">
                        <ScanLine size={18} style={{ color: 'var(--accent-blue)' }} />
                        License Plate Recognition
                        <span className="chip" style={{ marginLeft: 'auto' }}>YOLOv8 + OCR</span>
                    </h3>

                    {/* Mock ANPR Visualization */}
                    <div style={{
                        background: '#000', borderRadius: 'var(--radius-sm)', padding: '20px',
                        marginBottom: '16px', position: 'relative', height: '140px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1px solid rgba(59,130,246,0.15)',
                    }}>
                        <div style={{
                            border: '2px solid var(--accent-green)',
                            borderRadius: '4px',
                            padding: '8px 20px',
                            position: 'relative',
                            boxShadow: '0 0 15px rgba(0,230,118,0.3)',
                        }}>
                            <div style={{ fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 700, color: '#fff', letterSpacing: '3px' }}>
                                CH01-AB-1234
                            </div>
                            <div style={{
                                position: 'absolute', top: '-12px', left: '8px',
                                background: 'var(--accent-green)', color: '#000',
                                padding: '1px 8px', borderRadius: '3px', fontSize: '0.65rem', fontWeight: 700,
                            }}>
                                97% confidence
                            </div>
                        </div>
                        <div style={{ position: 'absolute', top: '8px', right: '12px', fontSize: '0.7rem', color: 'var(--accent-red)' }}>
                            ● REC
                        </div>
                        <div style={{ position: 'absolute', bottom: '8px', left: '12px', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                            CAM-17-01 • 1080p • 30fps
                        </div>
                    </div>

                    <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                        {anprResults.map((r, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '10px 12px', borderRadius: '6px', marginBottom: '6px',
                                background: r.status === 'alert' ? 'var(--accent-red-dim)' : 'var(--bg-secondary)',
                                borderLeft: `3px solid ${r.status === 'alert' ? 'var(--accent-red)' : r.status === 'warning' ? 'var(--accent-amber)' : 'var(--accent-green)'}`,
                            }}>
                                <code style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent-blue)' }}>{r.plate}</code>
                                <div style={{ flex: 1, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{r.action}</div>
                                <span className="chip">{r.confidence}%</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{r.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Demand Prediction */}
                <div className="card-static">
                    <h3 className="section-title">
                        <TrendingUp size={18} style={{ color: 'var(--accent-purple)' }} />
                        Demand Prediction
                        <span className="chip" style={{ marginLeft: 'auto' }}>LSTM + Prophet</span>
                    </h3>
                    <div style={{ height: '180px', marginBottom: '16px' }}>
                        <Line data={predictionData} options={chartOpts} />
                    </div>
                    <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', padding: '14px' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: 'var(--accent-purple)' }}>
                            <Sparkles size={14} /> Forecast Summary
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            Demand expected to peak at <strong style={{ color: 'var(--accent-amber)' }}>95%</strong> in ~4 hours.
                            Recommend activating overflow parking at Sector 34 and Sector 7 by 2:00 PM.
                            EV charging demand up <strong style={{ color: 'var(--accent-green)' }}>23%</strong> vs last week.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid-2">
                {/* Camera Tampering */}
                <div className="card-static">
                    <h3 className="section-title"><Camera size={18} style={{ color: 'var(--accent-red)' }} /> Camera Tampering Detection</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: '16px' }}>CNN image classifier • Detects covering, spray paint, displacement, blur</p>
                    <div className="alert-feed">
                        {tamperingAlerts.map((a, i) => (
                            <div key={i} className={`alert-item ${a.severity}`}>
                                <span className={`status-dot ${a.severity === 'critical' ? 'red' : 'amber'}`} />
                                <div style={{ flex: 1 }}>
                                    <div className="alert-text"><strong>{a.camera}</strong> — {a.type}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Confidence: {a.confidence}%</div>
                                </div>
                                <span className="alert-time">{a.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Suspicious Behavior */}
                <div className="card-static">
                    <h3 className="section-title"><AlertTriangle size={18} style={{ color: 'var(--accent-amber)' }} /> Suspicious Behavior Detection</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: '16px' }}>Pose estimation + anomaly detection • Real-time analysis</p>
                    <div className="alert-feed">
                        {suspiciousEvents.map(e => (
                            <div key={e.id} className={`alert-item ${e.resolved ? 'info' : 'warning'}`}>
                                <span className={`status-dot ${e.resolved ? 'green' : 'amber'}`} />
                                <div style={{ flex: 1 }}>
                                    <div className="alert-text"><strong>{e.type}</strong></div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{e.location} • {e.confidence}% conf</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span className={`badge badge-${e.resolved ? 'green' : 'amber'}`}>{e.resolved ? 'Resolved' : 'Active'}</span>
                                    <div className="alert-time" style={{ marginTop: '4px' }}>{e.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
