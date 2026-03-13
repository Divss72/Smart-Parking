'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, MapPin, CalendarCheck, Fuel, CreditCard,
    Monitor, Cpu, Brain, BarChart3, Network, Settings, Car
} from 'lucide-react';

const navItems = [
    { label: 'Home', href: '/', icon: Car },
    { label: 'Find Parking', href: '/parking', icon: MapPin },
    { label: 'Reserve Slot', href: '/reserve', icon: CalendarCheck },
    { label: 'EV & Fuel', href: '/ev-stations', icon: Fuel },
    { label: 'Payments', href: '/payments', icon: CreditCard },
    { divider: true, label: 'Operator' },
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'IoT & Edge', href: '/iot', icon: Cpu },
    { label: 'AI / ML', href: '/ai-ml', icon: Brain },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 },
    { label: 'Architecture', href: '/architecture', icon: Network },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 'var(--sidebar-width)',
            height: '100vh',
            background: '#ffffff',
            borderRight: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            overflowY: 'auto',
        }}>
            {/* Logo */}
            <Link href="/" style={{
                padding: '20px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderBottom: '1px solid var(--border-color)',
                textDecoration: 'none',
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'var(--gradient-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
                }}>
                    P
                </div>
                <div>
                    <div style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: 'var(--text-primary)',
                        lineHeight: 1.2,
                    }}>SmartPark</div>
                    <div style={{
                        fontSize: '0.65rem',
                        color: 'var(--text-dim)',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                    }}>Chandigarh</div>
                </div>
            </Link>

            {/* Navigation */}
            <nav style={{ padding: '12px 10px', flex: 1 }}>
                {navItems.map((item, i) => {
                    if (item.divider) {
                        return (
                            <div key={i} style={{
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                color: 'var(--text-dim)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                padding: '16px 12px 8px',
                                marginTop: '8px',
                            }}>
                                {item.label}
                            </div>
                        );
                    }

                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link key={item.href} href={item.href} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            fontSize: '0.88rem',
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                            background: isActive ? 'var(--accent-blue-dim)' : 'transparent',
                            transition: 'all 0.2s',
                            marginBottom: '2px',
                            textDecoration: 'none',
                        }}>
                            <Icon size={18} style={{ opacity: isActive ? 1 : 0.6 }} />
                            {item.label}
                            {isActive && (
                                <div style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: 'var(--accent-blue)',
                                    marginLeft: 'auto',
                                    boxShadow: '0 0 8px var(--accent-blue)',
                                }} />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div style={{
                padding: '16px 20px',
                borderTop: '1px solid var(--border-color)',
                fontSize: '0.7rem',
                color: 'var(--text-dim)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <span className="status-dot green" /> System Online
                </div>
                <div>v2.1.0 • Chandigarh Smart City</div>
            </div>
        </aside>
    );
}
