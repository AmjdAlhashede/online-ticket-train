import Link from 'next/link';
import ScheduleList from '@/app/search/schedule-list';

// Reusing same mock data for consistency
const DESTINATIONS = [
    {
        id: '1',
        name: 'Riyadh Central',
        city: 'Riyadh',
        image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&q=80&w=2000',
        description: 'The vibrant capital city, pulsating with business and modern attractions.'
    },
    {
        id: '2',
        name: 'Jeddah Gateway',
        city: 'Jeddah',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000',
        description: 'The beautiful coastal city known as the Gateway to the Two Holy Mosques.'
    },
    {
        id: '3',
        name: 'Dammam Station',
        city: 'Dammam',
        image: 'https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?auto=format&fit=crop&q=80&w=2000',
        description: 'The heart of the Eastern Province, a major seaport and business hub.'
    },
    {
        id: '4',
        name: 'Makkah Transit',
        city: 'Makkah',
        image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&q=80&w=2000',
        description: 'The holiest city in Islam, receiving millions of pilgrims annually.'
    },
    {
        id: '5',
        name: 'Madinah Station',
        city: 'Madinah',
        image: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=2000',
        description: 'The second holiest city, offering peace and deep historical roots.'
    }
];

export default async function DestinationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const destination = DESTINATIONS.find(d => d.id === id);

    if (!destination) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h2>Destination not found</h2>
            </div>
        );
    }

    // Mock schedules arriving to this destination
    const randomOrigin = DESTINATIONS.find(d => d.id !== id) || DESTINATIONS[0];
    const schedules = [
        {
            id: `sch-${id}-1`,
            price: 120.50,
            departureTime: new Date(new Date().setHours(8, 0, 0, 0)).toISOString(),
            arrivalTime: new Date(new Date().setHours(10, 30, 0, 0)).toISOString(),
            train: { name: 'Express 101', type: 'High Speed', capacity: 300 },
            route: { originStation: randomOrigin, destinationStation: destination }
        },
        {
            id: `sch-${id}-2`,
            price: 85.00,
            departureTime: new Date(new Date().setHours(14, 15, 0, 0)).toISOString(),
            arrivalTime: new Date(new Date().setHours(17, 0, 0, 0)).toISOString(),
            train: { name: 'Regional 202', type: 'Regional', capacity: 150 },
            route: { originStation: randomOrigin, destinationStation: destination }
        }
    ];

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
                        <ScheduleList schedules={schedules} />
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
