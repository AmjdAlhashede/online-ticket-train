'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const [name, setName] = useState('');
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
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
            const res = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/login?registered=true');
            } else {
                setError(data.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6', padding: '20px' }}>
            <div style={{ maxWidth: '400px', width: '100%', backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', textDecoration: 'none' }}>
                        TrackLine
                    </Link>
                    <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginTop: '12px' }}>Register</h1>
                </div>

                {error && (
                    <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Full Name</label>
                        <input
                            type="text"
                            required
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Email</label>
                        <input
                            type="email"
                            required
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Password</label>
                        <input
                            type="password"
                            required
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{ width: '100%', padding: '12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}
                    >
                        {loading ? 'Processing...' : 'Register'}
                    </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px' }}>
                    <p style={{ color: '#6b7280' }}>
                        Already have an account?{' '}
                        <Link href="/login" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
