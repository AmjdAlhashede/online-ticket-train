import Link from 'next/link';
import ScheduleList from '@/app/search/schedule-list';
import { getDestination, getSchedules } from '@/lib/data-service';

export const dynamic = 'force-dynamic';

export default async function DestinationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const destination = await getDestination(id);

    if (!destination) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', color: 'white' }}>
                <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '20px' }}>Destination not found</h2>
                <Link href="/destinations" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '600' }}>
                    &larr; Back to Destinations
                </Link>
            </div>
        );
    }

    // Fetch actual schedules arriving to this destination
    const schedules = await getSchedules(undefined, id);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <nav className="responsive-nav" style={{ padding: '20px 40px', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 50 }}>
                <Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>
                    TrackLine
                </Link>
                <div className="responsive-nav-links">
                    <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
                    <Link href="/destinations" style={{ color: '#0f172a', textDecoration: 'none', fontWeight: 600 }}>Destinations</Link>
                    <Link href="/schedules" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 500 }}>Schedules</Link>
                </div>
            </nav>

            {/* Premium Header */}
            <div className="responsive-hero-header mobile-padding" style={{
                width: '100%',
                backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 1), rgba(15, 23, 42, 0.3)), url("${destination.image}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                display: 'flex',
                alignItems: 'flex-end',
                paddingBottom: '60px'
            }}>
                <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 20px' }}>
                    <Link href="/destinations" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '15px', marginBottom: '20px', display: 'inline-block', fontWeight: '500' }}>
                        &larr; Back to Destinations
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                        <div>
                            <div style={{ color: '#3b82f6', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px', fontSize: '14px' }}>
                                {destination.name}
                            </div>
                            <h1 className="responsive-hero-title" style={{ fontWeight: '800', color: 'white', letterSpacing: '-2px', lineHeight: '1' }}>
                                {destination.city}
                            </h1>
                        </div>
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '20px 30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <div style={{ color: '#e2e8f0', fontSize: '14px', marginBottom: '5px' }}>Trains arriving today</div>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>{schedules.length} Trains</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="responsive-grid-sidebar mobile-padding" style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    <div>
                        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>About {destination.city}</h2>
                        <p style={{ fontSize: '18px', color: '#475569', lineHeight: '1.8' }}>
                            {destination.description} Experience the convenience of modern rail travel right into the heart of {destination.city}. Our premium stations offer world-class amenities ensuring your journey is seamless from start to finish.
                        </p>
                    </div>

                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            Popular Schedules to {destination.city}
                        </h2>
                        {schedules.length > 0 ? (
                            <ScheduleList schedules={schedules} />
                        ) : (
                            <div style={{ padding: '40px', backgroundColor: 'white', borderRadius: '20px', textAlign: 'center', border: '1px dashed #e2e8f0' }}>
                                <p style={{ color: '#64748b' }}>No direct schedules found to this station today.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Widget */}
                <div>
                    <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', position: 'sticky', top: '100px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', marginBottom: '20px' }}>Plan Your Trip</h3>
                        <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '24px', lineHeight: '1.6' }}>
                            Ready to travel to {destination.city}? Search for all available routes and book your premium ticket instantly.
                        </p>
                        <Link href={`/?to=${destination.id}`} className="btn-primary" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '16px', fontSize: '16px' }}>
                            Search all routes to {destination.city}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
