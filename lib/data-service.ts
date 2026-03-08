import stationsData from '@/data/stations.json';
import schedulesData from '@/data/schedules.json';
import destinationsData from '@/data/destinations.json';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://online-ticket-train-dashboard.vercel.app/api';

export const getStations = async () => {
    try {
        console.log(`Fetching stations from: ${API_BASE_URL}/stations`);
        const response = await fetch(`${API_BASE_URL}/stations`, { next: { revalidate: 0 } });
        if (!response.ok) throw new Error(`Failed to fetch stations: ${response.status}`);
        const data = await response.json();
        console.log(`Fetched ${data.length} stations`);
        return data;
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

        console.log(`Fetching schedules from: ${url.toString()}`);
        const response = await fetch(url.toString(), { next: { revalidate: 0 } });
        if (!response.ok) throw new Error(`Failed to fetch schedules: ${response.status}`);
        const data = await response.json();
        console.log(`Fetched ${data.length} schedules`);
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
        console.log(`Fetching destinations from: ${API_BASE_URL}/destinations`);
        const response = await fetch(`${API_BASE_URL}/destinations`, { next: { revalidate: 0 } });
        if (!response.ok) throw new Error(`Failed to fetch destinations: ${response.status}`);
        const data = await response.json();
        console.log(`Fetched ${data.length} destinations`);
        return data;
    } catch (error) {
        console.error('API Error (getDestinations), falling back to JSON:', error);
        return destinationsData;
    }
};
export const getDestination = async (id: string) => {
    try {
        console.log(`Fetching destination ${id} from: ${API_BASE_URL}/destinations/${id}`);
        const response = await fetch(`${API_BASE_URL}/destinations/${id}`, { next: { revalidate: 0 } });
        if (!response.ok) throw new Error(`Failed to fetch destination: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`API Error (getDestination ${id}), falling back to JSON:`, error);
        return destinationsData.find(d => d.id === id);
    }
};
