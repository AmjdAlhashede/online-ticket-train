import Link from 'next/link';
import ScheduleList from './schedule-list';

import { getStations, getSchedules } from '@/lib/data-service';

export default async function SearchResults({
    searchParams,
}: {
    searchParams: Promise<{ from?: string; to?: string; date?: string }>;
}) {
    const { from, to, date } = await searchParams;
    const stations = await getStations();

    if (!from || !to) {
        // ... (rest of search validation)
    }

    if (from === 'all' && to === 'all') {
        const { redirect } = await import('next/navigation');
        redirect('/schedules');
    }

    if (from === to && from !== 'all') {
        // ... (rest of search validation)
    }

    const origin = from === 'all' ? { id: 'all', name: 'All Stations', city: 'Any City' } : stations.find(s => s.id === from);
    const destination = to === 'all' ? { id: 'all', name: 'All Destinations', city: 'Any City' } : stations.find(s => s.id === to);

    if (!origin || !destination) return <div>Missing stations</div>

    const schedules = await getSchedules(from, to);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <nav className="responsive-nav" style={{ padding: '20px 40px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 50 }}>
                <Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>
                    TrackLine
                </Link>
                <div className="responsive-nav-links">
                    <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
                    <Link href="/destinations" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 500 }}>Destinations</Link>
                    <Link href="/schedules" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 500 }}>Schedules</Link>
                </div>
            </nav>

            <div className="responsive-hero-header mobile-padding" style={{
                width: '100%',
                backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.8)), url("https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?auto=format&fit=crop&q=80&w=2000")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'flex-end',
                paddingBottom: '30px',
                height: '350px'
            }}>
                <div style={{ maxWidth: '900px', width: '100%', margin: '0 auto', padding: '0 20px' }}>
                    <Link href="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px', marginBottom: '10px', display: 'inline-block' }}>
                        &larr; Back to Search
                    </Link>
                    <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                        {origin.city} to {destination.city}
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>Showing available premium trains</p>
                </div>
            </div>

            <div style={{ maxWidth: '900px', margin: '-20px auto 40px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
                <ScheduleList schedules={schedules} />
            </div>

        </div>
    );
}
