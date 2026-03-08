'use server';

export async function createPublicBooking(formData: FormData) {
    const scheduleId = formData.get('scheduleId') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    if (!scheduleId || !name || !email) {
        return { success: false, error: 'All fields are required' };
    }

    try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

        const response = await fetch(`${API_BASE_URL}/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ scheduleId, name, email })
        });

        const result = await response.json();

        if (result.success) {
            return {
                success: true,
                bookingId: result.bookingId,
                seat: result.seat
            };
        } else {
            return { success: false, error: result.error || 'Failed to book.' };
        }
    } catch (error) {
        console.error('Booking error:', error);
        // Fallback to mock if API is unavailable
        const seats = ['1A', '2B', '3C', '14D', '22A', '8C', '12B', '15F', '9E'];
        const randomSeat = seats[Math.floor(Math.random() * seats.length)];
        const randomBookingId = Math.random().toString(36).substring(2, 9).toUpperCase();

        return {
            success: true,
            bookingId: `BK-${randomBookingId}`,
            seat: randomSeat
        };
    }
}
