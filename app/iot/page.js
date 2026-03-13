'use client';
import { useState, useEffect } from 'react';
import {
    Cpu, Wifi, WifiOff, Battery, Camera, Radio, Activity,
    Thermometer, Gauge, HardDrive, AlertTriangle, CheckCircle
} from 'lucide-react';
import { sensorDevices, gateControllers, cameraFeeds, mqttMessages } from '@/data/sensors';

export default function IoTPage() {
    const [liveFeed, setLiveFeed] = useState([]);
    const [feedIndex, setFeedIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFeedIndex(prev => {
                const next = (prev + 1) % mqttMessages.length;
                setLiveFeed(prevFeed => {
                    const msg = mqttMessages[next];
                    const line = `[${new Date().toLocaleTimeString()}] ${msg.topic} → ${JSON.stringify(msg.payload)}`;
                    return [line, ...prevFeed].slice(0, 20);
                });
                return next;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const sensorStats = {
        online: sensorDevices.filter(s => s.status === 'online').length,
        warning: sensorDevices.filter(s => s.status === 'warning').length,
        offline: sensorDevices.filter(s => s.status === 'offline').length,
    };

    return (
        <div>
            <div className="page-header">
                <h1>IoT & Edge Computing</h1>
                <p>Real-time monitoring of sensors, cameras, gates, and edge processing units</p>
            </div>

            {/* Stats Row */}
            <div className="grid-4" style={{ marginBottom: '24px' }}>
                <div className="metric-card green">
                    <span className="metric-label">Sensors Online</span>
                    <div className="metric-value green" style={{ fontSize: '2rem' }}>{sensorStats.online}</div>
                </div>
                <div className="metric-card amber">
                    <span className="metric-label">Warnings</span>
                    <div className="metric-value amber" style={{ fontSize: '2rem' }}>{sensorStats.warning}</div>
                </div>
                <div className="metric-card red">
                    <span className="metric-label">Offline</span>
                    <div className="metric-value red" style={{ fontSize: '2rem' }}>{sensorStats.offline}</div>
                </div>
                <div className="metric-card blue">
                    <span className="metric-label">Edge Nodes</span>
                    <div className="metric-value" style={{ fontSize: '2rem' }}>{sensorDevices.filter(s => s.type === 'edge').length}</div>
                </div>
            </div>

            <div className="grid-2" style={{ marginBottom: '24px' }}>
                {/* Sensor Devices */}
                <div className="card-static">
                    <h3 className="section-title"><Radio size={18} style={{ color: 'var(--accent-blue)' }} /> Sensor Devices</h3>
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <table className="data-table">
                            <thead>
                                <tr><th>Device</th><th>Type</th><th>Location</th><th>Battery</th><th>Status</th></tr>
                            </thead>
                            <tbody>
                                {sensorDevices.filter(s => s.type !== 'edge').map(dev => (
                                    <tr key={dev.id}>
                                        <td style={{ fontWeight: 500, fontSize: '0.82rem', fontFamily: 'monospace' }}>{dev.id}</td>
                                        <td><span className="chip">{dev.type}</span></td>
                                        <td style={{ fontSize: '0.82rem' }}>{dev.location}</td>
                                        <td>
                                            {dev.battery !== null ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <Battery size={14} style={{ color: dev.battery < 20 ? 'var(--accent-red)' : 'var(--accent-green)' }} />
                                                    <span style={{ fontSize: '0.82rem' }}>{dev.battery}%</span>
                                                </div>
                                            ) : '—'}
                                        </td>
                                        <td>
                                            <span className={`badge badge-${dev.status === 'online' ? 'green' : dev.status === 'warning' ? 'amber' : 'red'}`}>
                                                {dev.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Camera Feeds */}
                <div className="card-static">
                    <h3 className="section-title"><Camera size={18} style={{ color: 'var(--accent-blue)' }} /> Camera System</h3>
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <table className="data-table">
                            <thead>
                                <tr><th>Camera</th><th>Location</th><th>Resolution</th><th>ANPR</th><th>Status</th></tr>
                            </thead>
                            <tbody>
                                {cameraFeeds.map(cam => (
                                    <tr key={cam.id}>
                                        <td style={{ fontWeight: 500, fontSize: '0.82rem', fontFamily: 'monospace' }}>{cam.id}</td>
                                        <td style={{ fontSize: '0.82rem' }}>{cam.location}</td>
                                        <td><span className="chip">{cam.resolution}</span></td>
                                        <td>
                                            {cam.anpr ? (
                                                <span className="badge badge-purple">ANPR</span>
                                            ) : (
                                                <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>—</span>
                                            )}
                                        </td>
                                        <td>
                                            <span className={`badge badge-${cam.status === 'online' ? 'green' : cam.status === 'warning' ? 'amber' : 'red'}`}>
                                                {cam.fps > 0 ? `${cam.fps}fps` : cam.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="grid-2">
                {/* Gate Controllers */}
                <div className="card-static">
                    <h3 className="section-title"><Gauge size={18} style={{ color: 'var(--accent-green)' }} /> Smart Entry Gates</h3>
                    <div style={{ display: 'grid', gap: '12px' }}>
                        {gateControllers.map(gate => (
                            <div key={gate.id} style={{
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-sm)',
                                padding: '14px 18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                border: '1px solid var(--border-color)',
                            }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>{gate.id}</div>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{gate.location}</div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <span className={`badge badge-${gate.qrScanner === 'online' ? 'green' : 'amber'}`}>QR</span>
                                    <span className={`badge badge-${gate.fastagReader === 'online' ? 'green' : 'red'}`}>FASTag</span>
                                    <span className={`badge badge-${gate.barrier === 'open' ? 'blue' : 'amber'}`}>{gate.barrier}</span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-blue)' }}>{gate.vehiclesProcessed}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>vehicles</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* MQTT Live Feed */}
                <div className="card-static">
                    <h3 className="section-title">
                        <Activity size={18} style={{ color: 'var(--accent-green)' }} />
                        Live MQTT Feed
                        <span className="badge badge-green" style={{ marginLeft: 'auto' }}>
                            <span className="status-dot green animate-pulse" /> Live
                        </span>
                    </h3>
                    <div className="live-feed">
                        {liveFeed.length === 0 ? (
                            <div style={{ color: 'var(--text-dim)', padding: '20px', textAlign: 'center' }}>
                                Connecting to MQTT broker...
                            </div>
                        ) : (
                            liveFeed.map((line, i) => (
                                <div key={i} className="feed-line" style={{ opacity: i === 0 ? 1 : 0.6 + (0.4 * (1 - i / liveFeed.length)) }}>
                                    {line}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Edge Processing Units */}
            <div style={{ marginTop: '24px' }}>
                <div className="card-static">
                    <h3 className="section-title"><HardDrive size={18} style={{ color: 'var(--accent-purple)' }} /> Edge Processing Units</h3>
                    <div className="grid-2">
                        {sensorDevices.filter(s => s.type === 'edge').map(node => (
                            <div key={node.id} style={{
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-sm)',
                                padding: '20px',
                                border: '1px solid var(--border-color)',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '1rem', fontFamily: 'monospace' }}>{node.id}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{node.location}</div>
                                    </div>
                                    <span className="badge badge-green">{node.status}</span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '4px' }}>GPU Usage</div>
                                        <div className="progress-bar">
                                            <div className="progress-fill blue" style={{ width: node.gpu }} />
                                        </div>
                                        <div style={{ fontSize: '0.8rem', marginTop: '4px', color: 'var(--accent-blue)' }}>{node.gpu}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '4px' }}>CPU Usage</div>
                                        <div className="progress-bar">
                                            <div className="progress-fill green" style={{ width: node.cpu }} />
                                        </div>
                                        <div style={{ fontSize: '0.8rem', marginTop: '4px', color: 'var(--accent-green)' }}>{node.cpu}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
