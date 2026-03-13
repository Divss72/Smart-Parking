'use client';
import { useState } from 'react';
import {
    Network, Layers, Smartphone, Radio, Wifi, Server, Brain,
    Database, BarChart3, Globe, Shield, Cloud, ChevronRight,
    Monitor, Cpu, Camera, CreditCard, Bell, MapPin, Lock,
    HardDrive, Activity, Zap
} from 'lucide-react';

const layers = [
    {
        id: 'ux', name: 'User Experience Layer', icon: Smartphone, color: '#00d4ff',
        desc: 'Web & mobile interfaces for drivers and city operators',
        details: [
            'React / Next.js web application',
            'Flutter mobile app',
            'Driver App: parking discovery, reservation, navigation, payments',
            'Operator Dashboard: occupancy monitoring, sensor health, violation alerts',
            'Map integration via OpenStreetMap / Leaflet',
        ],
        tech: ['React', 'Next.js', 'Flutter', 'Leaflet', 'PWA'],
    },
    {
        id: 'iot', name: 'Edge & IoT Layer', icon: Cpu, color: '#ff9800',
        desc: 'Physical sensors, cameras, and smart entry gates',
        details: [
            'Ultrasonic & magnetic parking sensors (ESP32, LoRaWAN)',
            'Camera systems with ANPR capability',
            'Smart entry gates with QR scanner and FASTag reader',
            'Edge processing units (NVIDIA Jetson Nano, Raspberry Pi)',
            'Local preprocessing: vehicle detection, noise filtering',
        ],
        tech: ['ESP32', 'Raspberry Pi', 'Jetson Nano', 'LoRaWAN', 'OpenCV'],
    },
    {
        id: 'conn', name: 'Connectivity Layer', icon: Wifi, color: '#00e676',
        desc: 'Communication protocols between devices and cloud',
        details: [
            'MQTT for lightweight sensor messaging',
            'HTTP REST for API communication',
            'WebSockets for real-time dashboard updates',
            'Network: 4G/5G, LoRaWAN, WiFi',
            'IoT gateway aggregates messages before cloud transmission',
        ],
        tech: ['MQTT', 'REST', 'WebSocket', '4G/5G', 'LoRaWAN'],
    },
    {
        id: 'platform', name: 'Core Platform (Microservices)', icon: Server, color: '#bb86fc',
        desc: '8 independent microservices handling all business logic',
        details: [
            'API Gateway: auth, routing, rate limiting (Kong/NGINX)',
            'User Service: profiles, vehicles, preferences',
            'Parking Management: lots, slots, occupancy status',
            'Reservation & Token Service: booking, QR generation, validation',
            'Payment Service: UPI, cards, wallets, FASTag',
            'Navigation Service: route calculation via map APIs',
            'Notification Service: SMS, push, email alerts',
            'Security Monitoring: unauthorized vehicles, vandalism detection',
        ],
        tech: ['Node.js', 'Kong', 'Docker', 'gRPC', 'REST'],
    },
    {
        id: 'ai', name: 'AI & Machine Learning', icon: Brain, color: '#e040fb',
        desc: 'Computer vision, prediction models, and anomaly detection',
        details: [
            'ANPR: License plate recognition (YOLO + OCR)',
            'Occupancy Detection: Empty/occupied slot detection (YOLOv8)',
            'Camera Tampering: CNN classifier for covering/spray/blur',
            'Suspicious Behavior: Pose estimation + anomaly detection',
            'Demand Prediction: LSTM + Prophet time-series forecasting',
        ],
        tech: ['YOLOv8', 'OpenCV', 'TensorFlow', 'LSTM', 'Prophet'],
    },
    {
        id: 'data', name: 'Data & Storage Layer', icon: Database, color: '#ffc107',
        desc: 'Operational database, real-time cache, and data lake',
        details: [
            'PostgreSQL: users, vehicles, reservations, payments, parking_lots',
            'Redis: live_slot_status, sensor_health, camera_status',
            'Data Lake (S3/Hadoop): AI training datasets',
            '50+ database tables across operational stores',
            'Automated backups and multi-region replication',
        ],
        tech: ['PostgreSQL', 'Redis', 'S3', 'Hadoop', 'Snowflake'],
    },
    {
        id: 'streaming', name: 'Event Streaming', icon: Activity, color: '#00bcd4',
        desc: 'High-volume real-time data processing pipeline',
        details: [
            'Apache Kafka for event streaming',
            'Topics: sensor_updates, camera_alerts, reservation_events, payment_events',
            'Enables real-time analytics and system scalability',
            'Event sourcing for audit trail',
        ],
        tech: ['Apache Kafka', 'Kafka Streams', 'Zookeeper'],
    },
    {
        id: 'analytics', name: 'Analytics & Smart City', icon: BarChart3, color: '#4caf50',
        desc: 'Data visualization and insights for city authorities',
        details: [
            'Parking demand heatmaps by sector/hour',
            'Congestion pattern analysis',
            'EV adoption trends',
            'Revenue analytics and forecasting',
            'Visualization via PowerBI, Grafana, Tableau',
        ],
        tech: ['PowerBI', 'Grafana', 'Tableau', 'D3.js'],
    },
    {
        id: 'twin', name: 'Digital Twin (Advanced)', icon: Globe, color: '#9c27b0',
        desc: 'Virtual model of city parking infrastructure',
        details: [
            'Simulate traffic flows and parking patterns',
            'Test parking expansion plans virtually',
            'Congestion reduction strategy modeling',
            'Technologies: Unity, Three.js, GIS systems',
        ],
        tech: ['Unity', 'Three.js', 'GIS', 'WebGL'],
    },
    {
        id: 'cloud', name: 'Cloud Infrastructure', icon: Cloud, color: '#2196f3',
        desc: 'Scalable cloud deployment with Kubernetes',
        details: [
            'Load Balancer → API Gateway → K8s Cluster',
            'Auto-scaling microservices pods',
            'AI compute nodes with GPU support',
            'Multi-region deployment for disaster recovery',
            'Providers: AWS, Azure, Google Cloud',
        ],
        tech: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'GCP'],
    },
    {
        id: 'security', name: 'Security Architecture', icon: Shield, color: '#f44336',
        desc: 'End-to-end security from devices to cloud',
        details: [
            'OAuth2 + JWT authentication',
            'TLS encryption for all communications',
            'Encrypted storage at rest',
            'IoT device certificates and secure firmware updates',
            'Role-based access control (RBAC)',
        ],
        tech: ['OAuth2', 'JWT', 'TLS', 'X.509', 'RBAC'],
    },
];

const microservices = [
    { name: 'API Gateway', status: 'healthy', latency: '12ms', requests: '4.2K/min' },
    { name: 'User Service', status: 'healthy', latency: '18ms', requests: '890/min' },
    { name: 'Parking Service', status: 'healthy', latency: '8ms', requests: '2.1K/min' },
    { name: 'Reservation Service', status: 'healthy', latency: '22ms', requests: '1.5K/min' },
    { name: 'Payment Service', status: 'healthy', latency: '45ms', requests: '780/min' },
    { name: 'Navigation Service', status: 'healthy', latency: '95ms', requests: '420/min' },
    { name: 'Notification Service', status: 'healthy', latency: '15ms', requests: '1.1K/min' },
    { name: 'Security Monitor', status: 'healthy', latency: '35ms', requests: '3.8K/min' },
];

const dbTables = [
    { table: 'users', rows: '145,230', size: '42MB' },
    { table: 'vehicles', rows: '189,560', size: '28MB' },
    { table: 'parking_lots', rows: '12', size: '1MB' },
    { table: 'parking_slots', rows: '3,760', size: '5MB' },
    { table: 'reservations', rows: '2,847,100', size: '890MB' },
    { table: 'payments', rows: '2,654,800', size: '1.2GB' },
    { table: 'sensor_readings', rows: '48M+', size: '12GB' },
    { table: 'camera_events', rows: '8.5M+', size: '4.2GB' },
    { table: 'violations', rows: '34,200', size: '18MB' },
    { table: 'audit_log', rows: '12M+', size: '5.8GB' },
];

export default function ArchitecturePage() {
    const [expandedLayer, setExpandedLayer] = useState(null);

    return (
        <div>
            <div className="page-header">
                <h1>System Architecture</h1>
                <p>13-layer architecture powering Chandigarh's smart parking infrastructure</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px' }}>
                {/* Architecture Layers */}
                <div>
                    <h3 className="section-title" style={{ marginBottom: '16px' }}>
                        <Layers size={18} style={{ color: 'var(--accent-blue)' }} /> Architecture Layers
                    </h3>
                    {layers.map((layer, i) => {
                        const Icon = layer.icon;
                        const isExpanded = expandedLayer === layer.id;
                        return (
                            <div key={layer.id}
                                className="arch-layer animate-fade-in"
                                style={{ animationDelay: `${i * 0.05}s`, opacity: 0, borderLeftColor: isExpanded ? layer.color : 'transparent', borderLeftWidth: '3px' }}
                                onClick={() => setExpandedLayer(isExpanded ? null : layer.id)}
                            >
                                <h3>
                                    <div style={{
                                        width: '32px', height: '32px', borderRadius: '8px',
                                        background: `${layer.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <Icon size={16} style={{ color: layer.color }} />
                                    </div>
                                    {layer.name}
                                    <ChevronRight size={16} style={{
                                        marginLeft: 'auto', color: 'var(--text-dim)',
                                        transition: 'transform 0.3s',
                                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                                    }} />
                                </h3>
                                <p>{layer.desc}</p>

                                {isExpanded && (
                                    <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--border-color)' }}>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 12px' }}>
                                            {layer.details.map((d, j) => (
                                                <li key={j} style={{
                                                    fontSize: '0.82rem', color: 'var(--text-secondary)',
                                                    padding: '4px 0 4px 16px', position: 'relative',
                                                }}>
                                                    <span style={{ position: 'absolute', left: 0, color: layer.color }}>›</span>
                                                    {d}
                                                </li>
                                            ))}
                                        </ul>
                                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                            {layer.tech.map(t => (
                                                <span key={t} className="chip" style={{ borderColor: `${layer.color}40` }}>{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Right Column */}
                <div>
                    {/* Microservices Status */}
                    <div className="card-static" style={{ marginBottom: '20px' }}>
                        <h3 className="section-title"><Server size={18} style={{ color: 'var(--accent-green)' }} /> Microservices Status</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {microservices.map(ms => (
                                <div key={ms.name} style={{
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    padding: '10px 12px', borderRadius: '6px',
                                    background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                                }}>
                                    <span className="status-dot green" />
                                    <div style={{ flex: 1, fontSize: '0.82rem', fontWeight: 500 }}>{ms.name}</div>
                                    <span className="chip">{ms.latency}</span>
                                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{ms.requests}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Database Schema */}
                    <div className="card-static">
                        <h3 className="section-title"><Database size={18} style={{ color: 'var(--accent-amber)' }} /> Key Database Tables</h3>
                        <table className="data-table">
                            <thead>
                                <tr><th>Table</th><th>Rows</th><th>Size</th></tr>
                            </thead>
                            <tbody>
                                {dbTables.map(t => (
                                    <tr key={t.table}>
                                        <td style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--accent-blue)' }}>{t.table}</td>
                                        <td style={{ fontSize: '0.82rem' }}>{t.rows}</td>
                                        <td style={{ fontSize: '0.82rem' }}>{t.size}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
