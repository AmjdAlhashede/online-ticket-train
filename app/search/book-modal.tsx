'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { createPublicBooking } from '@/app/actions/booking';

export default function BookModal({ schedule, onClose }: { schedule: any, onClose: () => void }) {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<{ bookingId: string, seat: string } | null>(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();

        if (!session?.user) {
            signIn();
            return;
        }

        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('scheduleId', schedule.id);
        formData.append('name', session.user.name || 'User');
        formData.append('email', session.user.email || '');

        const result = await createPublicBooking(formData);

        setLoading(false);

        if (result.success) {
            setSuccess({ bookingId: result.bookingId!, seat: result.seat! });
        } else {
            setError(result.error || 'Failed to book.');
        }
    };

    if (status === 'loading') return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.4)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 9999,
            backdropFilter: 'blur(8px)'
        }}>
            <div style={{
                maxWidth: '450px',
                width: '90%',
                padding: '36px',
                position: 'relative',
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.05)'
            }}>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', cursor: 'pointer', color: '#64748b', transition: 'all 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                >
                    &times;
                </button>

                {success ? (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <div style={{ fontSize: '48px', color: '#10b981', marginBottom: '10px' }}>✓</div>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '10px' }}>Ticket Confirmed!</h2>
                        <p style={{ color: '#475569', marginBottom: '20px' }}>Have a great journey!</p>
                        <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'left' }}>
                            <div style={{ marginBottom: '8px' }}><strong>Seat:</strong> {success.seat}</div>
                            <div style={{ fontSize: '13px', color: '#64748b' }}>Booking Ref: #{success.bookingId.split('-')[0].toUpperCase()}</div>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#0f172a', marginBottom: '5px' }}>Fast Booking</h2>
                        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
                            {schedule.route.originStation.city} &rarr; {schedule.route.destinationStation.city} <br />
                            <strong style={{ color: '#0f172a' }}>${schedule.price.toFixed(2)}</strong>
                        </p>

                        {!session ? (
                            <div style={{ textAlign: 'center', padding: '10px 0' }}>
                                <p style={{ fontSize: '14px', color: '#475569', marginBottom: '20px' }}>Please sign in to complete your booking.</p>
                                <button onClick={() => signIn()} className="btn-primary" style={{ width: '100%', padding: '14px' }}>
                                    Sign In to Book
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {error && <div style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '10px', borderRadius: '6px', fontSize: '14px' }}>{error}</div>}

                                <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Booking for:</p>
                                    <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a' }}>{session.user?.name}</p>
                                    <p style={{ fontSize: '14px', color: '#64748b' }}>{session.user?.email}</p>
                                </div>

                                <button onClick={() => handleSubmit()} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1.05rem', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)' }} disabled={loading}>
                                    {loading ? 'Confirming...' : 'Complete Booking'}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
