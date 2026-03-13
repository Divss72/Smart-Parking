'use client';
import Link from 'next/link';
import {
  MapPin, CalendarCheck, Zap, CreditCard, LayoutDashboard,
  Cpu, Brain, BarChart3, Network, Shield, Car, Radio,
  TrendingUp, Eye, CloudLightning
} from 'lucide-react';
import { systemStats } from '@/data/analytics';

const features = [
  { icon: MapPin, title: 'Smart Parking Discovery', desc: 'Find nearest parking with real-time availability across all Chandigarh sectors', color: '#00d4ff', href: '/parking' },
  { icon: CalendarCheck, title: 'Instant Reservation', desc: 'Reserve your slot in advance with QR code tokens for seamless entry', color: '#00e676', href: '/reserve' },
  { icon: Zap, title: 'EV Charging & Fuel', desc: 'Discover EV chargers, petrol pumps, and CNG stations near your route', color: '#bb86fc', href: '/ev-stations' },
  { icon: CreditCard, title: 'Digital Payments', desc: 'Pay via UPI, FASTag, cards, or digital wallets — cashless & instant', color: '#ffc107', href: '/payments' },
  { icon: LayoutDashboard, title: 'Operator Dashboard', desc: 'City-wide monitoring with real-time occupancy, sensor health, and alerts', color: '#ff5252', href: '/dashboard' },
  { icon: Cpu, title: 'IoT & Edge Computing', desc: 'ESP32 sensors, Jetson Nano edge nodes, and LoRaWAN connectivity', color: '#ff9800', href: '/iot' },
  { icon: Brain, title: 'AI Intelligence', desc: 'ANPR, occupancy detection, demand prediction using YOLO & LSTM', color: '#e040fb', href: '/ai-ml' },
  { icon: BarChart3, title: 'Smart City Analytics', desc: 'Parking heatmaps, congestion patterns, revenue analysis, and EV trends', color: '#00bcd4', href: '/analytics' },
];

const stats = [
  { label: 'Parking Lots', value: systemStats.totalParkingLots, icon: Car },
  { label: 'Total Slots', value: systemStats.totalSlots.toLocaleString(), icon: MapPin },
  { label: 'Active Sensors', value: systemStats.activeSensors.toLocaleString(), icon: Radio },
  { label: 'AI Cameras', value: systemStats.totalCameras, icon: Eye },
  { label: 'Today\'s Vehicles', value: systemStats.todayVehicles.toLocaleString(), icon: TrendingUp },
  { label: 'EV Sessions', value: systemStats.evChargingSessions, icon: CloudLightning },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        position: 'relative',
        padding: '60px 40px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.06) 0%, rgba(139, 92, 246, 0.04) 50%, rgba(16, 185, 129, 0.04) 100%)',
        border: '1px solid var(--border-color)',
        marginBottom: '40px',
        overflow: 'hidden',
      }}>
        {/* Animated background dots */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 50%), radial-gradient(circle at 60% 80%, rgba(16,185,129,0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '50px',
            background: 'var(--accent-green-dim)',
            color: 'var(--accent-green)',
            fontSize: '0.75rem',
            fontWeight: 600,
            marginBottom: '20px',
          }}>
            <span className="status-dot green" /> Live System — Chandigarh Smart City
          </div>

          <h1 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '3rem',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 50%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Intelligent Parking<br />Management System
          </h1>

          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}>
            AI-powered parking infrastructure for Chandigarh — real-time occupancy tracking,
            automated entry via FASTag & QR, EV charging discovery, and predictive analytics
            across {systemStats.totalParkingLots} parking facilities.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/parking" className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
              <MapPin size={18} /> Find Parking
            </Link>
            <Link href="/dashboard" className="btn btn-secondary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
              <LayoutDashboard size={18} /> Operator Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '16px',
        }}>
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="metric-card blue animate-fade-in" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Icon size={16} style={{ color: 'var(--accent-blue)', opacity: 0.7 }} />
                  <span className="metric-label" style={{ marginBottom: 0 }}>{stat.label}</span>
                </div>
                <div className="metric-value" style={{ fontSize: '1.6rem' }}>{stat.value}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Cards */}
      <section>
        <h2 style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '1.5rem',
          marginBottom: '24px',
          color: 'var(--text-primary)',
        }}>
          System Capabilities
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}>
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Link key={i} href={feature.href} className="card animate-fade-in" style={{
                animationDelay: `${(i + 6) * 0.08}s`,
                opacity: 0,
                cursor: 'pointer',
                textDecoration: 'none',
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: `${feature.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}>
                  <Icon size={22} style={{ color: feature.color }} />
                </div>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: 'var(--text-primary)',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                }}>
                  {feature.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Architecture Preview */}
      <section style={{ marginTop: '40px', marginBottom: '40px' }}>
        <div className="card-static" style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.04), rgba(139, 92, 246, 0.03))',
          textAlign: 'center',
          padding: '40px',
        }}>
          <Network size={36} style={{ color: 'var(--accent-blue)', marginBottom: '16px' }} />
          <h3 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '1.3rem',
            marginBottom: '12px',
          }}>
            13-Layer Architecture
          </h3>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            maxWidth: '500px',
            margin: '0 auto 20px',
          }}>
            From IoT sensors to AI processing, microservices to digital twins —
            explore the complete system architecture powering smart parking in Chandigarh.
          </p>
          <Link href="/architecture" className="btn btn-secondary">
            <Network size={16} /> View Architecture
          </Link>
        </div>
      </section>
    </div>
  );
}
