import Link from 'next/link';
import ScheduleList from './schedule-list';

// Mock Data
const STATIONS = [
    { id: '1', name: 'Riyadh Central', city: 'Riyadh' },
    { id: '2', name: 'Jeddah Gateway', city: 'Jeddah' },
    { id: '3', name: 'Dammam Station', city: 'Dammam' },
    { id: '4', name: 'Makkah Transit', city: 'Makkah' },
    { id: '5', name: 'Madinah Station', city: 'Madinah' }
];

export default async function SearchResults({
    searchParams,
}: {
    searchParams: Promise<{ from?: string; to?: string; date?: string }>;
}) {
    const { from, to, date } = await searchParams;

    if (!from || !to) {
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
                <div style={{ padding: '100px 20px' }}>
                    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', backgroundColor: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
                        <h2 style={{ fontSize: '32px', color: '#0f172a', marginBottom: '16px' }}>Invalid Search</h2>
                        <p style={{ color: '#64748b', fontSize: '18px', marginBottom: '24px' }}>Please provide both departure and arrival stations.</p>
                        <Link href="/" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>Back to homepage</Link>
                    </div>
                </div>
            </div>
        );
    }

    // If user selected "All" for BOTH from and to, just show them all schedules
    if (from === 'all' && to === 'all') {
        const { redirect } = await import('next/navigation');
        redirect('/schedules');
    }

    if (from === to && from !== 'all') {
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
                <div style={{ padding: '100px 20px' }}>
                    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', backgroundColor: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</div>
                        <h2 style={{ fontSize: '32px', color: '#0f172a', marginBottom: '16px', fontWeight: '800' }}>Invalid Route</h2>
                        <p style={{ color: '#475569', fontSize: '18px', marginBottom: '32px', lineHeight: '1.6' }}>
                            Your departure and arrival stations cannot be the exact same city. Please select a different destination to continue.
                        </p>
                        <Link href="/" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none', padding: '14px 28px' }}>Start New Search</Link>
                    </div>
                </div>
            </div>
        );
    }

    const origin = from === 'all' ? { id: 'all', name: 'All Stations', city: 'Any City' } : STATIONS.find(s => s.id === from);
    const destination = to === 'all' ? { id: 'all', name: 'All Destinations', city: 'Any City' } : STATIONS.find(s => s.id === to);

    if (!origin || !destination) return <div>Missing stations</div>

    // Generate some fake schedules based on the query
    const schedules = [
        {
            id: 'sch-1',
            price: 120.50,
            departureTime: new Date(new Date().setHours(8, 0, 0, 0)).toISOString(),
            arrivalTime: new Date(new Date().setHours(10, 30, 0, 0)).toISOString(),
            train: { name: 'Express 101', type: 'High Speed', capacity: 300 },
            route: { originStation: origin.id === 'all' ? STATIONS[0] : origin, destinationStation: destination.id === 'all' ? STATIONS[1] : destination }
        },
        {
            id: 'sch-2',
            price: 85.00,
            departureTime: new Date(new Date().setHours(14, 15, 0, 0)).toISOString(),
            arrivalTime: new Date(new Date().setHours(17, 0, 0, 0)).toISOString(),
            train: { name: 'Regional 202', type: 'Regional', capacity: 150 },
            route: { originStation: origin.id === 'all' ? STATIONS[2] : origin, destinationStation: destination.id === 'all' ? STATIONS[3] : destination }
        },
        {
            id: 'sch-3',
            price: 150.00,
            departureTime: new Date(new Date().setHours(19, 45, 0, 0)).toISOString(),
            arrivalTime: new Date(new Date().setHours(21, 50, 0, 0)).toISOString(),
            train: { name: 'Night Express', type: 'Express', capacity: 200 },
            route: { originStation: origin.id === 'all' ? STATIONS[4] : origin, destinationStation: destination.id === 'all' ? STATIONS[0] : destination }
        }
    ];

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
