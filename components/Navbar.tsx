'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 40px',
            backgroundColor: 'transparent',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000
        }}>
            <div style={{
                fontSize: '24px',
                fontWeight: '900',
                color: 'white',
                letterSpacing: '-1px'
            }}>TrackLine</div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px'
            }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Link href="/destinations" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}>Destinations</Link>
                    <Link href="/schedules" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}>Schedules</Link>
                </div>

                <div style={{ height: '24px', width: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }}></div>

                {session ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>Hi, {session.user?.name}</span>
                        <button
                            onClick={() => signOut()}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.2)',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Link href="/login" style={{
                            color: 'white',
                            textDecoration: 'none',
                            fontWeight: '700',
                            fontSize: '15px',
                            padding: '8px 16px'
                        }}>Sign In</Link>
                        <Link href="/register" style={{
                            backgroundColor: '#2563eb',
                            color: 'white',
                            textDecoration: 'none',
                            fontWeight: '700',
                            fontSize: '15px',
                            padding: '8px 20px',
                            borderRadius: '10px',
                            boxShadow: '0 4px 14px 0 rgba(37,99,235,0.3)'
                        }}>Join Now</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
