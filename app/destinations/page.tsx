'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

const DESTINATIONS = [
    {
        id: '1',
        name: 'Riyadh Central',
        city: 'Riyadh',
        image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&q=80&w=800',
        description: 'The vibrant capital city, pulsating with business and modern attractions.'
    },
    {
        id: '2',
        name: 'Jeddah Gateway',
        city: 'Jeddah',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
        description: 'The beautiful coastal city known as the Gateway to the Two Holy Mosques.'
    },
    {
        id: '3',
        name: 'Dammam Station',
        city: 'Dammam',
        image: 'https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?auto=format&fit=crop&q=80&w=800',
        description: 'The heart of the Eastern Province, a major seaport and business hub.'
    },
    {
        id: '4',
        name: 'Makkah Transit',
        city: 'Makkah',
        image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&q=80&w=800',
        description: 'The holiest city in Islam, receiving millions of pilgrims annually.'
    },
    {
        id: '5',
        name: 'Madinah Station',
        city: 'Madinah',
        image: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=800',
        description: 'The second holiest city, offering peace and deep historical roots.'
    }
];

export default function DestinationsPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
            <Navbar />

            <div className="mobile-padding" style={{
                width: '100%',
                padding: '90px 20px',
                background: 'linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.95)), url("https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=2000")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                color: 'white',
                textAlign: 'center',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
            }}>
                <h1 className="responsive-hero-title" style={{ fontWeight: '800', marginBottom: '16px', letterSpacing: '-1px' }}>Our Destinations</h1>
                <p style={{ fontSize: '19px', color: '#cbd5e1', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
                    Connect seamlessly across the Kingdom. Explore our premium stations and fast routes designed explicitly for your ultimate comfort.
                </p>
            </div>

            <div style={{ maxWidth: '1200px', margin: '-40px auto 60px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                    {DESTINATIONS.map(dest => (
                        <div key={dest.id} style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                            border: '1px solid rgba(255,255,255,0.4)',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            cursor: 'pointer'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            className="dest-card">
                            <div style={{
                                width: '100%',
                                height: '240px',
                                backgroundImage: `url(${dest.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                flexShrink: 0
                            }}></div>
                            <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                <div style={{ fontSize: '12px', fontWeight: '800', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>
                                    {dest.name}
                                </div>
                                <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#0f172a', marginBottom: '12px', letterSpacing: '-0.5px' }}>
                                    {dest.city}
                                </h2>
                                <p style={{ color: '#475569', fontSize: '15.5px', lineHeight: '1.7', marginBottom: '30px', flexGrow: 1 }}>
                                    {dest.description}
                                </p>
                                <Link href={`/destinations/${dest.id}`} className="btn-primary" style={{ display: 'block', textAlign: 'center', padding: '14px', textDecoration: 'none', marginTop: 'auto', borderRadius: '12px', fontWeight: '600', fontSize: '16px' }}>
                                    View Details & Schedules
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
