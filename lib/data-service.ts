import stationsData from '@/data/stations.json';
import schedulesData from '@/data/schedules.json';
import destinationsData from '@/data/destinations.json';

export const getStations = async () => {
    // In a real production app, we would fetch from process.env.NEXT_PUBLIC_API_URL
    // For this transition, we use the local JSON files as a single source of truth
    return stationsData;
};

export const getSchedules = async (from?: string, to?: string) => {
    let filtered = schedulesData;
    if (from && from !== 'all') {
        filtered = filtered.filter(s => s.route.originStationId === from);
    }
    if (to && to !== 'all') {
        filtered = filtered.filter(s => s.route.destinationStationId === to);
    }

    // Map IDs to full station objects for compatibility with existing UI
    return filtered.map(s => ({
        ...s,
        route: {
            originStation: stationsData.find(st => st.id === s.route.originStationId),
            destinationStation: stationsData.find(st => st.id === s.route.destinationStationId)
        }
    }));
};

export const getDestinations = async () => {
    return destinationsData;
};
