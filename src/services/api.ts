
export interface FlightData {
    airline: string;
    onTimePercentage: number;
    delayPercentage: number;
    averageDelayMinutes: number;
}

export const fetchFlightData = async (
    airline: string,
    origin: string,
    destination: string,
    date: string
): Promise<FlightData> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(`Fetching data for: ${airline}, ${origin} -> ${destination} on ${date}`);

    // Mock response based on input (deterministic for testing)
    // In a real app, this would be an axios.get call
    return {
        airline: airline || "Latam",
        onTimePercentage: 28.6,
        delayPercentage: 71.4,
        averageDelayMinutes: 30,
    };
};
