'use client';
import { BarChart3, TrendingUp, Zap, DollarSign, MapPin, Clock } from 'lucide-react';
import { sectorHeatmap, weeklyRevenue, monthlyRevenue, paymentBreakdown, evAdoptionTrend, congestionData } from '@/data/analytics';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, ArcElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const chartOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { labels: { color: '#9ca3c7', font: { family: 'Inter', size: 11 } } },
    },
    scales: {
        x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148,163,184,0.12)' } },
        y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148,163,184,0.12)' } },
    },
};

const doughnutOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { color: '#9ca3c7', font: { family: 'Inter', size: 11 }, padding: 16 } } },
    cutout: '65%',
};

export default function AnalyticsPage() {
    const revenueData = {
        labels: weeklyRevenue.labels,
        datasets: [{
            label: 'Revenue (₹)',
            data: weeklyRevenue.data,
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: '#3b82f6',
            borderWidth: 2,
            borderRadius: 6,
        }],
    };

    const monthlyRevenueData = {
        labels: monthlyRevenue.labels,
        datasets: [{
            label: 'Monthly Revenue (₹)',
            data: monthlyRevenue.data,
            borderColor: '#00e676',
            backgroundColor: 'rgba(0,230,118,0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 3,
        }],
    };

    const paymentData = {
        labels: paymentBreakdown.labels,
        datasets: [{
            data: paymentBreakdown.data,
            backgroundColor: paymentBreakdown.colors,
            borderWidth: 0,
        }],
    };

    const evData = {
        labels: evAdoptionTrend.labels,
        datasets: [
            {
                label: 'EV Vehicles Registered',
                data: evAdoptionTrend.evVehicles,
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(187,134,252,0.1)',
                fill: true,
                tension: 0.4,
                yAxisID: 'y',
            },
            {
                label: 'Charging Sessions',
                data: evAdoptionTrend.evCharging,
                borderColor: '#00e676',
                backgroundColor: 'rgba(0,230,118,0.1)',
                fill: true,
                tension: 0.4,
                yAxisID: 'y1',
            },
        ],
    };

    const evChartOpts = {
        ...chartOpts,
        scales: {
            x: chartOpts.scales.x,
            y: { ...chartOpts.scales.y, position: 'left', title: { display: true, text: 'Vehicles', color: '#9ca3c7' } },
            y1: { ...chartOpts.scales.y, position: 'right', title: { display: true, text: 'Sessions', color: '#9ca3c7' }, grid: { drawOnChartArea: false } },
        },
    };

    const congestionChartData = {
        labels: congestionData.labels,
        datasets: Object.entries(congestionData.sectors).map(([sector, data], i) => ({
            label: sector,
            data,
            borderColor: ['#3b82f6', '#f59e0b', '#ef4444'][i],
            backgroundColor: [`rgba(59,130,246,0.1)`, `rgba(245,158,11,0.1)`, `rgba(239,68,68,0.1)`][i],
            fill: true,
            tension: 0.4,
        })),
    };

    return (
        <div>
            <div className="page-header">
                <h1>Analytics & Smart City Insights</h1>
                <p>Parking demand heatmaps, revenue analytics, congestion patterns, and EV trends</p>
            </div>

            {/* Sector Heatmap */}
            <div className="card-static" style={{ marginBottom: '24px' }}>
                <h3 className="section-title"><MapPin size={18} style={{ color: 'var(--accent-blue)' }} /> Sector Occupancy Heatmap</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
                    {sectorHeatmap.map(s => {
                        const bg = s.occupancy > 90 ? 'var(--accent-red)'
                            : s.occupancy > 75 ? 'var(--accent-amber)'
                                : s.occupancy > 50 ? 'var(--accent-blue)'
                                    : 'var(--accent-green)';
                        return (
                            <div key={s.sector} style={{
                                background: `${bg}15`,
                                border: `1px solid ${bg}40`,
                                borderRadius: 'var(--radius-sm)',
                                padding: '16px',
                                textAlign: 'center',
                                transition: 'transform 0.2s',
                            }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>{s.sector}</div>
                                <div style={{ fontSize: '1.8rem', fontFamily: 'Outfit', fontWeight: 800, color: bg }}>{s.occupancy}%</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                    {s.trend === 'up' ? '↑' : s.trend === 'down' ? '↓' : '→'} {s.trend}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid-2" style={{ marginBottom: '24px' }}>
                {/* Weekly Revenue */}
                <div className="card-static">
                    <h3 className="section-title"><DollarSign size={18} style={{ color: 'var(--accent-green)' }} /> Weekly Revenue</h3>
                    <div style={{ height: '280px' }}>
                        <Bar data={revenueData} options={{ ...chartOpts, plugins: { ...chartOpts.plugins, legend: { display: false } } }} />
                    </div>
                </div>

                {/* Payment Breakdown */}
                <div className="card-static">
                    <h3 className="section-title"><DollarSign size={18} style={{ color: 'var(--accent-purple)' }} /> Payment Methods</h3>
                    <div style={{ height: '280px' }}>
                        <Doughnut data={paymentData} options={doughnutOpts} />
                    </div>
                </div>
            </div>

            <div className="grid-2" style={{ marginBottom: '24px' }}>
                {/* Congestion Patterns */}
                <div className="card-static">
                    <h3 className="section-title"><Clock size={18} style={{ color: 'var(--accent-amber)' }} /> Congestion Patterns</h3>
                    <div style={{ height: '280px' }}>
                        <Line data={congestionChartData} options={chartOpts} />
                    </div>
                </div>

                {/* Monthly Revenue Trend */}
                <div className="card-static">
                    <h3 className="section-title"><TrendingUp size={18} style={{ color: 'var(--accent-green)' }} /> Monthly Revenue Trend</h3>
                    <div style={{ height: '280px' }}>
                        <Line data={monthlyRevenueData} options={{ ...chartOpts, plugins: { ...chartOpts.plugins, legend: { display: false } } }} />
                    </div>
                </div>
            </div>

            {/* EV Adoption */}
            <div className="card-static">
                <h3 className="section-title"><Zap size={18} style={{ color: 'var(--accent-purple)' }} /> EV Adoption Trend — Chandigarh</h3>
                <div style={{ height: '300px' }}>
                    <Line data={evData} options={evChartOpts} />
                </div>
            </div>
        </div>
    );
}
