
import React from 'react';
import type { WeatherResponse, AnalisisDiario } from '../services/WeatherService';
import clsx from 'clsx'; // tailwind-merge y clsx están en package.json, usamos clsx para condicionales limpios

// Interface para las props del componente
interface WeatherDisplayProps {
    data: WeatherResponse | null;
}

// Mapa de colores para los estados del clima
const STATUS_COLORS: Record<string, string> = {
    'ROJO': 'bg-red-100 text-red-800 border-red-200',
    'AMARILLO': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'VERDE': 'bg-green-100 text-green-800 border-green-200',
    // Default fallback
    'DEFAULT': 'bg-gray-100 text-gray-800 border-gray-200'
};

const getStatusColor = (status: string) => {
    return STATUS_COLORS[status.toUpperCase()] || STATUS_COLORS['DEFAULT'];
};

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
    if (!data || !data.aiAnalysis || !data.aiAnalysis.analisis_diario) {
        return null;
    }

    return (
        <div className="w-full mt-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">Análisis Climático por Día</h2>

            <div className="grid grid-cols-1 gap-6">
                {data.aiAnalysis.analisis_diario.map((dia, index) => (
                    <DailyCard key={`${dia.fecha}-${index}`} dia={dia} />
                ))}
            </div>
        </div>
    );
};

// Subcomponente para la tarjeta de cada día
const DailyCard: React.FC<{ dia: AnalisisDiario }> = ({ dia }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md">
            {/* Cabecera del Día */}
            <div className="bg-gray-50 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">
                        {new Date(dia.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 capitalize">{dia.estado_general_dia.replace('_', ' ')}</p>
                </div>
                <div className="mt-2 md:mt-0 flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Probabilidad Promedio:</span>
                    <span className={clsx(
                        "px-3 py-1 rounded-full text-sm font-bold",
                        dia.probabilidad_promedio_dia > 70 ? "bg-red-100 text-red-700" :
                            dia.probabilidad_promedio_dia > 30 ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                    )}>
                        {dia.probabilidad_promedio_dia}%
                    </span>
                </div>
            </div>

            {/* Contenido Principal */}
            <div className="p-6">
                {/* Resumen Ejecutivo */}
                <div className="mb-6 bg-blue-50 p-4 rounded-md border border-blue-100">
                    <h4 className="text-sm font-bold text-blue-900 mb-1 uppercase tracking-wider">Resumen Ejecutivo</h4>
                    <p className="text-blue-800 text-sm leading-relaxed">
                        {dia.resumen_ejecutivo_dia}
                    </p>
                </div>

                {/* Tabla de Bloques Horarios */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Horario</th>
                                <th className="px-4 py-3 font-semibold">Estado</th>
                                <th className="px-4 py-3 font-semibold">Factor Principal</th>
                                <th className="px-4 py-3 font-semibold text-right">Probabilidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dia.bloques_horarios.map((bloque, idx) => (
                                <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                        {bloque.hora_inicio} - {bloque.hora_fin}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={clsx("px-2.5 py-0.5 rounded border text-xs font-semibold", getStatusColor(bloque.estado))}>
                                            {bloque.estado}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {bloque.factor_principal}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                                <div
                                                    className={clsx("h-1.5 rounded-full", bloque.probabilidad > 50 ? "bg-red-500" : "bg-blue-500")}
                                                    style={{ width: `${bloque.probabilidad}%` }}
                                                ></div>
                                            </div>
                                            <span className="font-medium">{bloque.probabilidad}%</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
