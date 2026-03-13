'use client';
import { useState } from 'react';
import { CreditCard, Smartphone, Wallet, Radio, CheckCircle, Clock, ArrowRight, Shield } from 'lucide-react';

const transactions = [
    { id: 'TXN-8291', lot: 'Sector 17 Plaza', slot: 'A15', amount: 120, method: 'UPI', time: '10:12 AM', status: 'success' },
    { id: 'TXN-8290', lot: 'Elante Mall', slot: 'C07', amount: 180, method: 'FASTag', time: '09:45 AM', status: 'success' },
    { id: 'TXN-8289', lot: 'Sector 35 Mall', slot: 'B22', amount: 100, method: 'Card', time: '09:20 AM', status: 'success' },
    { id: 'TXN-8288', lot: 'ISBT Sec 43', slot: 'D03', amount: 70, method: 'Wallet', time: '08:55 AM', status: 'pending' },
    { id: 'TXN-8287', lot: 'Sukhna Lake', slot: 'A08', amount: 160, method: 'UPI', time: '08:30 AM', status: 'success' },
    { id: 'TXN-8286', lot: 'Rock Garden', slot: 'B11', amount: 90, method: 'FASTag', time: '08:10 AM', status: 'success' },
    { id: 'TXN-8285', lot: 'Sector 22 Market', slot: 'A19', amount: 60, method: 'UPI', time: '07:45 AM', status: 'failed' },
];

const methods = [
    { key: 'upi', label: 'UPI', icon: Smartphone, desc: 'Google Pay, PhonePe, Paytm', color: '#00d4ff' },
    { key: 'card', label: 'Card', icon: CreditCard, desc: 'Credit / Debit Card', color: '#bb86fc' },
    { key: 'wallet', label: 'Wallet', icon: Wallet, desc: 'Paytm, Amazon Pay', color: '#ffc107' },
    { key: 'fastag', label: 'FASTag', icon: Radio, desc: 'Auto-deduct via RFID', color: '#00e676' },
];

export default function PaymentsPage() {
    const [selectedMethod, setSelectedMethod] = useState('upi');
    const [paymentStatus, setPaymentStatus] = useState(null);

    const handlePay = () => {
        setPaymentStatus('processing');
        setTimeout(() => setPaymentStatus('success'), 2000);
    };

    return (
        <div>
            <div className="page-header">
                <h1>Payments</h1>
                <p>Secure digital payments for parking — UPI, cards, wallets, and FASTag</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Payment Form */}
                <div>
                    <div className="card-static" style={{ marginBottom: '20px' }}>
                        <h3 className="section-title"><CreditCard size={18} style={{ color: 'var(--accent-blue)' }} /> Pay for Parking</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px' }}>
                            {methods.map(m => {
                                const Icon = m.icon;
                                return (
                                    <div key={m.key}
                                        className={selectedMethod === m.key ? 'card' : 'card'}
                                        onClick={() => { setSelectedMethod(m.key); setPaymentStatus(null); }}
                                        style={{
                                            padding: '14px',
                                            cursor: 'pointer',
                                            borderColor: selectedMethod === m.key ? m.color : 'var(--border-color)',
                                            background: selectedMethod === m.key ? `${m.color}10` : 'var(--bg-secondary)',
                                        }}
                                    >
                                        <Icon size={20} style={{ color: m.color, marginBottom: '6px' }} />
                                        <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '2px' }}>{m.label}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{m.desc}</div>
                                    </div>
                                );
                            })}
                        </div>

                        {selectedMethod === 'upi' && (
                            <div className="input-group">
                                <label>UPI ID</label>
                                <input placeholder="yourname@paytm" />
                            </div>
                        )}
                        {selectedMethod === 'card' && (
                            <>
                                <div className="input-group">
                                    <label>Card Number</label>
                                    <input placeholder="4111 1111 1111 1111" />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    <div className="input-group">
                                        <label>Expiry</label>
                                        <input placeholder="MM/YY" />
                                    </div>
                                    <div className="input-group">
                                        <label>CVV</label>
                                        <input placeholder="***" type="password" />
                                    </div>
                                </div>
                            </>
                        )}
                        {selectedMethod === 'wallet' && (
                            <div className="input-group">
                                <label>Mobile Number</label>
                                <input placeholder="+91 98765 43210" />
                            </div>
                        )}
                        {selectedMethod === 'fastag' && (
                            <div className="input-group">
                                <label>Vehicle Number</label>
                                <input placeholder="CH01-AB-1234" />
                            </div>
                        )}

                        <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Amount</span>
                            <span className="metric-value" style={{ fontSize: '1.5rem' }}>₹120.00</span>
                        </div>

                        {paymentStatus === 'success' ? (
                            <div style={{ textAlign: 'center', padding: '20px' }}>
                                <CheckCircle size={48} style={{ color: 'var(--accent-green)', marginBottom: '12px' }} />
                                <h3 style={{ color: 'var(--accent-green)', marginBottom: '4px' }}>Payment Successful!</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Transaction ID: TXN-8292</p>
                            </div>
                        ) : (
                            <button className="btn btn-success" onClick={handlePay} style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                                disabled={paymentStatus === 'processing'}>
                                {paymentStatus === 'processing' ? (
                                    <><span className="animate-pulse">Processing...</span></>
                                ) : (
                                    <>Pay ₹120.00 <ArrowRight size={16} /></>
                                )}
                            </button>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                            <Shield size={12} /> Secured with 256-bit TLS encryption
                        </div>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="card-static">
                    <h3 className="section-title"><Clock size={18} style={{ color: 'var(--accent-blue)' }} /> Recent Transactions</h3>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Location</th>
                                <th>Method</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(tx => (
                                <tr key={tx.id}>
                                    <td style={{ fontWeight: 500, color: 'var(--accent-blue)', fontSize: '0.82rem' }}>{tx.id}</td>
                                    <td>
                                        <div style={{ fontSize: '0.82rem' }}>{tx.lot}</div>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{tx.time}</div>
                                    </td>
                                    <td style={{ fontSize: '0.82rem' }}>{tx.method}</td>
                                    <td style={{ fontWeight: 600, fontSize: '0.85rem' }}>₹{tx.amount}</td>
                                    <td>
                                        <span className={`badge badge-${tx.status === 'success' ? 'green' : tx.status === 'pending' ? 'amber' : 'red'}`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
