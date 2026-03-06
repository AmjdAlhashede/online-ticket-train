'use server';

export async function createPublicBooking(formData: FormData) {
    const scheduleId = formData.get('scheduleId') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    if (!scheduleId || !name || !email) {
        return { success: false, error: 'All fields are required' };
    }

    try {
        // Generate random seat number for simplicity
        const seats = ['1A', '2B', '3C', '14D', '22A', '8C', '12B', '15F', '9E'];
        const randomSeat = seats[Math.floor(Math.random() * seats.length)];

        // Generate a random booking ID
        const randomBookingId = Math.random().toString(36).substring(2, 9).toUpperCase();

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        return {
            success: true,
            bookingId: `BK-${randomBookingId}`,
            seat: randomSeat
        };

    } catch (error) {
        console.error('Booking error:', error);
        return { success: false, error: 'Failed to create booking. Please try again.' };
    }
}
