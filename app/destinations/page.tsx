import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getDestinations } from '@/lib/data-service';

export default async function DestinationsPage() {
    const destinations = await getDestinations();
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
                    {destinations.map((dest: any) => (
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
