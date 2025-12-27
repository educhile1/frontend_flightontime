import React from 'react';

interface FlightFormProps {
    onSearch: (airline: string, origin: string, destination: string, date: string) => void;
    isLoading: boolean;
}

export const FlightForm: React.FC<FlightFormProps> = ({ onSearch, isLoading }) => {
    const [airline, setAirline] = React.useState('Latam');
    const [origin, setOrigin] = React.useState('GIG');
    const [destination, setDestination] = React.useState('GRU');
    const [date, setDate] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(airline, origin, destination, date);
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <div className="flex flex-col">
                    <label className="text-xs font-bold uppercase tracking-wider mb-1 text-gray-700">Aerolinea</label>
                    <input
                        type="text"
                        value={airline}
                        onChange={(e) => setAirline(e.target.value)}
                        className="border border-gray-400 p-2 text-sm outline-none focus:border-black transition-colors"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-xs font-bold uppercase tracking-wider mb-1 text-gray-700">Origen</label>
                    <input
                        type="text"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="border border-gray-400 p-2 text-sm outline-none focus:border-black transition-colors"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-xs font-bold uppercase tracking-wider mb-1 text-gray-700">Destino</label>
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="border border-gray-400 p-2 text-sm outline-none focus:border-black transition-colors"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-xs font-bold uppercase tracking-wider mb-1 text-gray-700">Fecha</label>
                    <input
                        type="text" // Using text to match the simple look, could be date
                        placeholder="01/01/2026"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border border-gray-400 p-2 text-sm outline-none focus:border-black transition-colors"
                    />
                </div>

                <div className="mt-10">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-black text-white px-8 py-2 text-sm font-bold uppercase tracking-wide hover:bg-gray-800 disabled:opacity-50 transition-colors"
                    >
                        {isLoading ? 'Cargando...' : 'Consultar'}
                    </button>
                </div>

            </form>
        </div>
    );
};
