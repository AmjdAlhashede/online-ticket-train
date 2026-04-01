'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 5%',
                backgroundColor: 'transparent',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000
            }}>
                {/* Logo */}
                <div style={{ fontSize: '22px', fontWeight: '900', color: 'white', letterSpacing: '-1px' }}>
                    TrackLine
                </div>

                {/* Desktop Links */}
                <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <Link href="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}>Home</Link>
                        <Link href="/destinations" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}>Destinations</Link>
                        <Link href="/schedules" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}>Schedules</Link>
                    </div>
                    <div style={{ height: '24px', width: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
                    {session ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>Hi, {session.user?.name}</span>
                            <button onClick={() => signOut()} style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <Link href="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: '700', fontSize: '15px', padding: '8px 16px' }}>Sign In</Link>
                            <Link href="/register" style={{ backgroundColor: '#2563eb', color: 'white', textDecoration: 'none', fontWeight: '700', fontSize: '15px', padding: '8px 20px', borderRadius: '10px' }}>Join Now</Link>
                        </div>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="nav-hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{ display: 'none', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '20px' }}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? '✕' : '☰'}
                </button>
            </nav>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="nav-mobile-menu" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(10, 15, 30, 0.97)',
                    zIndex: 999,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '32px'
                }}>
                    <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer', padding: '8px 14px', borderRadius: '8px' }}>✕</button>
                    <div style={{ fontSize: '22px', fontWeight: '900', color: 'white' }}>TrackLine</div>
                    <Link href="/" onClick={() => setMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', fontWeight: '700', fontSize: '22px' }}>Home</Link>
                    <Link href="/destinations" onClick={() => setMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', fontWeight: '700', fontSize: '22px' }}>Destinations</Link>
                    <Link href="/schedules" onClick={() => setMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', fontWeight: '700', fontSize: '22px' }}>Schedules</Link>
                    <div style={{ width: '60px', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
                    {session ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px' }}>Hi, {session.user?.name}</span>
                            <button onClick={() => { signOut(); setMenuOpen(false); }} style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>Sign Out</button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                            <Link href="/login" onClick={() => setMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', fontWeight: '700', fontSize: '18px' }}>Sign In</Link>
                            <Link href="/register" onClick={() => setMenuOpen(false)} style={{ backgroundColor: '#2563eb', color: 'white', textDecoration: 'none', fontWeight: '700', fontSize: '18px', padding: '12px 32px', borderRadius: '10px' }}>Join Now</Link>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
