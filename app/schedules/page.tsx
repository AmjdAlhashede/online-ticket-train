import Link from 'next/link';
import ScheduleList from '@/app/search/schedule-list';
import Navbar from '@/components/Navbar';
import { getSchedules } from '@/lib/data-service';

export default async function AllSchedulesPage() {
    const schedules = await getSchedules();

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
