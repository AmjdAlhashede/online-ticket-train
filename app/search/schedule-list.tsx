'use client';

import { useState } from 'react';
import BookModal from './book-modal';

export default function ScheduleList({ schedules }: { schedules: any[] }) {
    const [selectedSchedule, setSelectedSchedule] = useState<any | null>(null);

    if (schedules.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <h2 style={{ fontSize: '24px', color: '#0f172a', marginBottom: '10px' }}>No trains found</h2>
                <p style={{ color: '#64748b' }}>We couldn't find any direct trains for this route. Try another pair of stations.</p>
            </div>
        );
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {schedules.map(schedule => (
                    <div key={schedule.id} style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        padding: '24px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        border: '1px solid #f1f5f9'
                    }}>

                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>
                                    {new Date(schedule.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                <div style={{ fontSize: '14px', color: '#64748b' }}>{schedule.route.originStation.city}</div>
                            </div>

                            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', margin: '0 20px' }}>
                                <div style={{ height: '2px', backgroundColor: '#e2e8f0', width: '100%', position: 'absolute' }}></div>
                                <div style={{
                                    backgroundColor: '#f8fafc', border: '1px solid #cbd5e1',
                                    borderRadius: '20px', padding: '4px 12px', fontSize: '12px',
                                    color: '#475569', zIndex: 1, margin: '0 auto', textAlign: 'center'
                                }}>
                                    {schedule.train.type} Train
                                </div>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>
                                    {new Date(schedule.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                <div style={{ fontSize: '14px', color: '#64748b' }}>{schedule.route.destinationStation.city}</div>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
                            minWidth: '220px', paddingLeft: '20px', borderLeft: '1px solid #e2e8f0',
                            backgroundImage: 'linear-gradient(to left, rgba(255,255,255,0.1), rgba(255,255,255,0.9)), url("https://images.unsplash.com/photo-1541480601022-2308c0f0ce13?auto=format&fit=crop&q=80&w=800")',
                            backgroundSize: 'cover', backgroundPosition: 'right center',
                            borderRadius: '0 16px 16px 0', margin: '-24px -24px -24px 0', padding: '24px'
                        }}>
                            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2563eb', marginBottom: '10px', textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>
                                ${schedule.price.toFixed(2)}
                            </div>
                            <button
                                onClick={() => setSelectedSchedule(schedule)}
                                className="btn-primary"
                                style={{ padding: '10px 24px', width: '100%', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedSchedule && (
                <BookModal schedule={selectedSchedule} onClose={() => setSelectedSchedule(null)} />
            )}
        </>
    );
}
