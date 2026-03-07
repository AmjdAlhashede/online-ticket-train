'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid email or password. Please try again.');
            } else {
                router.push('/');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', padding: '20px' }}>
            <div style={{ maxWidth: '450px', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(20px)', padding: '40px', borderRadius: '30px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(255, 255, 255, 0.5)', margin: 'auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <Link href="/" style={{ fontSize: '28px', fontWeight: '900', color: '#2563eb', textDecoration: 'none', letterSpacing: '-1px' }}>
                        TrackLine
                    </Link>
                    <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginTop: '16px', marginBottom: '8px' }}>Welcome Back</h1>
                    <p style={{ color: '#64748b', fontSize: '15px', fontWeight: '500' }}>Please sign in to continue with your booking</p>
                </div>

                {error && (
                    <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', padding: '14px', borderRadius: '12px', fontSize: '14px', marginBottom: '24px', fontWeight: '600', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>Email Address</label>
                        <input
                            type="email"
                            required
                            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', transition: 'all 0.2s', fontSize: '16px' }}
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>Password</label>
                        <input
                            type="password"
                            required
                            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', transition: 'all 0.2s', fontSize: '16px' }}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{ width: '100%', padding: '16px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)', marginTop: '8px' }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div style={{ marginTop: '32px', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
                    <p style={{ color: '#64748b', fontSize: '15px' }}>
                        Don't have an account?{' '}
                        <Link href="/register" style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none' }}>
                            Create one now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
