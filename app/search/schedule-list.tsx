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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {schedules.map(schedule => (
                    <div key={schedule.id} className="schedule-card">
                        {/* Top: times and route */}
                        <div className="schedule-card-top">
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#0f172a' }}>
                                    {new Date(schedule.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                <div style={{ fontSize: '13px', color: '#64748b' }}>{schedule.route.originStation.city}</div>
                            </div>

                            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', margin: '0 12px' }}>
                                <div style={{ height: '2px', backgroundColor: '#e2e8f0', width: '100%', position: 'absolute' }}></div>
                                <div style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '4px 10px', fontSize: '11px', color: '#475569', zIndex: 1, margin: '0 auto' }}>
                                    {schedule.train.type}
                                </div>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#0f172a' }}>
                                    {new Date(schedule.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                <div style={{ fontSize: '13px', color: '#64748b' }}>{schedule.route.destinationStation.city}</div>
                            </div>
                        </div>

                        {/* Bottom: price and book */}
                        <div className="schedule-card-bottom">
                            <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#2563eb' }}>
                                ${schedule.price.toFixed(2)}
                            </div>
                            <button
                                onClick={() => setSelectedSchedule(schedule)}
                                className="btn-primary"
                                style={{ padding: '10px 28px', whiteSpace: 'nowrap' }}
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
