import Link from 'next/link';
import ScheduleList from '@/app/search/schedule-list';
import Navbar from '@/components/Navbar';

// Mock Data
const STATIONS = [
    { id: '1', name: 'Riyadh Central', city: 'Riyadh' },
    { id: '2', name: 'Jeddah Gateway', city: 'Jeddah' },
    { id: '3', name: 'Dammam Station', city: 'Dammam' },
    { id: '4', name: 'Makkah Transit', city: 'Makkah' },
    { id: '5', name: 'Madinah Station', city: 'Madinah' }
];

export default function AllSchedulesPage() {
    // Generate a master list of fake schedules across all routes
    const schedules = [
        {
            id: 'sch-1', price: 120.50,
            departureTime: new Date(new Date().setHours(8, 0, 0, 0)).toISOString(),
            arrivalTime: new Date(new Date().setHours(10, 30, 0, 0)).toISOString(),
            train: { name: 'Express 101', type: 'High Speed', capacity: 300 },
            route: { originStation: STATIONS[0], destinationStation: STATIONS[1] }
        },
        {
            id: 'sch-2', price: 85.00,
            departureTime: new Date(new Date().setHours(14, 15, 0, 0)).toISOString(),
            arrivalTime: new Date(new Date().setHours(17, 0, 0, 0)).toISOString(),
            train: { name: 'Regional 202', type: 'Regional', capacity: 150 },
            route: { originStation: STATIONS[0], destinationStation: STATIONS[2] }
        },
        {
            id: 'sch-3', price: 150.00,
            departureTime: new Date(new Date().setHours(9, 30, 0, 0)).toISOString(),
            arrivalTime: new Date(new Date().setHours(11, 45, 0, 0)).toISOString(),
            train: { name: 'Bullet 303', type: 'High Speed', capacity: 400 },
            route: { originStation: STATIONS[3], destinationStation: STATIONS[4] }
        },
        {
            id: 'sch-4', price: 95.00,
            departureTime: new Date(new Date().setHours(16, 0, 0, 0)).toISOString(),
            arrivalTime: new Date(new Date().setHours(18, 10, 0, 0)).toISOString(),
            train: { name: 'Intercity 404', type: 'Express', capacity: 250 },
            route: { originStation: STATIONS[1], destinationStation: STATIONS[4] }
        },
        {
            id: 'sch-5', price: 110.00,
            departureTime: new Date(new Date().setHours(19, 45, 0, 0)).toISOString(),
            arrivalTime: new Date(new Date().setHours(21, 50, 0, 0)).toISOString(),
            train: { name: 'Night Express', type: 'Express', capacity: 200 },
            route: { originStation: STATIONS[2], destinationStation: STATIONS[0] }
        }
    ];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <Navbar />

            <div style={{
                width: '100%',
                padding: '60px 20px',
                backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9)), url("https://images.unsplash.com/photo-1623000845353-81b37f374384?auto=format&fit=crop&q=80&w=2000")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '16px' }}>Network Timetable</h1>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto' }}>
                    View all active premium high-speed trains running across our network today.
                </p>
            </div>

            <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
                <ScheduleList schedules={schedules} />
            </div>
        </div>
    );
}
