import stationsData from '@/data/stations.json';
import schedulesData from '@/data/schedules.json';
import destinationsData from '@/data/destinations.json';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const getStations = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/stations`, { next: { revalidate: 3600 } });
        if (!response.ok) throw new Error('Failed to fetch stations');
        return await response.json();
    } catch (error) {
        console.error('API Error (getStations), falling back to JSON:', error);
        return stationsData;
    }
};

export const getSchedules = async (from?: string, to?: string) => {
    try {
        const url = new URL(`${API_BASE_URL}/schedules`);
        if (from) url.searchParams.append('from', from);
        if (to) url.searchParams.append('to', to);

        const response = await fetch(url.toString(), { next: { revalidate: 3600 } });
        if (!response.ok) throw new Error('Failed to fetch schedules');
        const data = await response.json();

        // The API returns fully populated objects, so we just return them
        return data;
    } catch (error) {
        console.error('API Error (getSchedules), falling back to JSON:', error);
        let filtered = schedulesData;
        if (from && from !== 'all') {
            filtered = filtered.filter(s => s.route.originStationId === from);
        }
        if (to && to !== 'all') {
            filtered = filtered.filter(s => s.route.destinationStationId === to);
        }

        return filtered.map(s => ({
            ...s,
            route: {
                originStation: stationsData.find(st => st.id === s.route.originStationId),
                destinationStation: stationsData.find(st => st.id === s.route.destinationStationId)
            }
        }));
    }
};

export const getDestinations = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/destinations`, { next: { revalidate: 3600 } });
        if (!response.ok) throw new Error('Failed to fetch destinations');
        return await response.json();
    } catch (error) {
        console.error('API Error (getDestinations), falling back to JSON:', error);
        return destinationsData;
    }
};
