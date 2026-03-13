'use client';
import { useState, useEffect } from 'react';
import {
    LayoutDashboard, Car, MapPin, AlertTriangle, DollarSign,
    Activity, Camera, Wifi, TrendingUp, TrendingDown, Minus,
    ShieldAlert, Eye
} from 'lucide-react';
import { parkingLots } from '@/data/parkingLots';
import { violationAlerts } from '@/data/sensors';
import { systemStats, sectorHeatmap, hourlyOccupancy } from '@/data/analytics';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, ArcElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { labels: { color: '#9ca3c7', font: { family: 'Inter', size: 11 } } },
        tooltip: { backgroundColor: '#ffffff', borderColor: 'rgba(59,130,246,0.2)', borderWidth: 1 },
    },
    scales: {
        x: { ticks: { color: '#94a3b8', font: { size: 10 } }, grid: { color: 'rgba(148,163,184,0.12)' } },
        y: { ticks: { color: '#94a3b8', font: { size: 10 } }, grid: { color: 'rgba(148,163,184,0.12)' } },
    },
};

export default function DashboardPage() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const metrics = [
        { label: 'Total Slots', value: systemStats.totalSlots.toLocaleString(), color: 'blue', icon: MapPin },
        { label: 'Occupied', value: systemStats.totalOccupied.toLocaleString(), color: 'amber', icon: Car },
        { label: 'Available', value: (systemStats.totalSlots - systemStats.totalOccupied).toLocaleString(), color: 'green', icon: Activity },
        { label: "Today's Revenue", value: `₹${(systemStats.todayRevenue / 1000).toFixed(0)}K`, color: 'purple', icon: DollarSign },
        { label: 'Violations', value: systemStats.todayViolations, color: 'red', icon: AlertTriangle },
    ];

    const occupancyChartData = {
        labels: hourlyOccupancy.labels,
        datasets: hourlyOccupancy.datasets.map((ds, i) => ({
            label: ds.label,
            data: ds.data,
            borderColor: ['#3b82f6', '#10b981', '#8b5cf6'][i],
            backgroundColor: [`rgba(59,130,246,0.1)`, `rgba(16,185,129,0.1)`, `rgba(139,92,246,0.1)`][i],
            fill: true,
            tension: 0.4,
            pointRadius: 2,
        })),
    };

    const sectorBarData = {
        labels: sectorHeatmap.map(s => s.sector),
        datasets: [{
            label: 'Occupancy %',
            data: sectorHeatmap.map(s => s.occupancy),
            backgroundColor: sectorHeatmap.map(s =>
                s.occupancy > 90 ? 'rgba(255,82,82,0.7)' : s.occupancy > 70 ? 'rgba(255,193,7,0.7)' : 'rgba(0,230,118,0.7)'
            ),
            borderRadius: 4,
        }],
    };

    return (
        <div>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1>City Operator Dashboard</h1>
                    <p>Real-time parking monitoring — Chandigarh Smart City</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontFamily: 'Outfit', fontWeight: 700, color: 'var(--accent-blue)' }}>{time}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                        <span className="status-dot green" style={{ marginRight: '6px' }} />All systems operational
                    </div>
                </div>
            </div>

            {/* Metrics Row */}
            <div className="grid-5" style={{ marginBottom: '24px' }}>
                {metrics.map((m, i) => {
                    const Icon = m.icon;
                    return (
                        <div key={i} className={`metric-card ${m.color} animate-fade-in`} style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <Icon size={14} style={{ opacity: 0.6 }} />
                                <span className="metric-label" style={{ marginBottom: 0 }}>{m.label}</span>
                            </div>
                            <div className={`metric-value ${m.color}`} style={{ fontSize: '1.8rem' }}>{m.value}</div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid-2" style={{ marginBottom: '24px' }}>
                <div className="card-static">
                    <h3 className="section-title"><TrendingUp size={18} style={{ color: 'var(--accent-blue)' }} /> Hourly Occupancy</h3>
                    <div style={{ height: '280px' }}>
                        <Line data={occupancyChartData} options={chartOptions} />
                    </div>
                </div>
                <div className="card-static">
                    <h3 className="section-title"><LayoutDashboard size={18} style={{ color: 'var(--accent-blue)' }} /> Sector Occupancy</h3>
                    <div style={{ height: '280px' }}>
                        <Bar data={sectorBarData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } } }} />
                    </div>
                </div>
            </div>

            {/* Parking Lots + Violations */}
            <div className="grid-2">
                {/* Lot Status Table */}
                <div className="card-static">
                    <h3 className="section-title"><Car size={18} style={{ color: 'var(--accent-blue)' }} /> Parking Lot Status</h3>
                    <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Location</th>
                                    <th>Slots</th>
                                    <th>Occupancy</th>
                                    <th>Sensors</th>
                                    <th>Cameras</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parkingLots.map(lot => {
                                    const pct = Math.round((lot.occupied / lot.totalSlots) * 100);
                                    return (
                                        <tr key={lot.id}>
                                            <td>
                                                <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>{lot.name}</div>
                                                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{lot.sector}</div>
                                            </td>
                                            <td style={{ fontSize: '0.82rem' }}>{lot.occupied}/{lot.totalSlots}</td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <div className="progress-bar" style={{ width: '60px' }}>
                                                        <div className={`progress-fill ${pct > 90 ? 'red' : pct > 70 ? 'amber' : 'green'}`}
                                                            style={{ width: `${pct}%` }} />
                                                    </div>
                                                    <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{pct}%</span>
                                                </div>
                                            </td>
                                            <td>
                                                {lot.sensorsFaulty > 0 ? (
                                                    <span className="badge badge-amber">{lot.sensorsFaulty} fault</span>
                                                ) : (
                                                    <span className="badge badge-green">OK</span>
                                                )}
                                            </td>
                                            <td>
                                                {lot.camerasOffline > 0 ? (
                                                    <span className="badge badge-red">{lot.camerasOffline} offline</span>
                                                ) : (
                                                    <span className="badge badge-green">OK</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Violations Feed */}
                <div className="card-static">
                    <h3 className="section-title"><ShieldAlert size={18} style={{ color: 'var(--accent-red)' }} /> Violation Alerts</h3>
                    <div className="alert-feed">
                        {violationAlerts.map(v => (
                            <div key={v.id} className={`alert-item ${v.severity}`}>
                                <div>
                                    <span className={`status-dot ${v.severity === 'critical' ? 'red' : v.severity === 'warning' ? 'amber' : 'blue'}`} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div className="alert-text">
                                        <strong>{v.type.replace('_', ' ').toUpperCase()}</strong>
                                        {v.plate && <> — {v.plate}</>}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                                        {v.location}
                                    </div>
                                </div>
                                <span className="alert-time">{v.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sector 17 Highlight Card */}
            <div style={{ marginTop: '24px' }}>
                <div className="card-static" style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.03))',
                    border: '1px solid rgba(59, 130, 246, 0.15)',
                }}>
                    <h3 className="section-title"><Eye size={18} style={{ color: 'var(--accent-blue)' }} /> Spotlight: Sector 17 Parking</h3>
                    <div className="grid-5" style={{ marginTop: '16px' }}>
                        {[
                            { label: 'Total Slots', value: '320', color: 'blue' },
                            { label: 'Occupied', value: '247', color: 'amber' },
                            { label: 'Sensors Faulty', value: '3', color: 'red' },
                            { label: 'Cameras Offline', value: '1', color: 'red' },
                            { label: 'Violations Today', value: '12', color: 'amber' },
                        ].map((m, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div className="metric-label">{m.label}</div>
                                <div className={`metric-value ${m.color}`} style={{ fontSize: '2rem' }}>{m.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
