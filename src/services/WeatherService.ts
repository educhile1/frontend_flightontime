
import axios from 'axios';

// Interfaces basadas en la respuesta JSON del servicio de clima (src/response_weather.json)

// Interfaz para la solicitud al servicio de clima
export interface WeatherRequest {
    latitude: string;   // Latitud del destino u origen
    longitude: string;  // Longitud del destino u origen
    fechaVuelo: string; // Fecha del vuelo (YYYY-MM-DD)
}

// Bloque horario dentro del análisis diario (ej: mañana, tarde, noche)
export interface BloqueHorario {
    hora_inicio: string;
    hora_fin: string;
    estado: string;           // Estado del clima (ej: ROJO, AMARILLO)
    probabilidad: number;     // Probabilidad de problemas (0-100)
    factor_principal: string; // Causa principal (ej: Niebla, Hielo)
}

// Análisis detallado para un día específico
export interface AnalisisDiario {
    fecha: string;
    estado_general_dia: string;        // Estado general (ej: CANCELADO)
    probabilidad_promedio_dia: number; // Probabilidad promedio de afectación
    resumen_ejecutivo_dia: string;     // Resumen textual del día
    bloques_horarios: BloqueHorario[]; // Lista de bloques horarios
}

// Contenedor principal del análisis de IA
export interface AiAnalysis {
    analisis_diario: AnalisisDiario[];
}

// Respuesta completa del servicio de clima
export interface WeatherResponse {
    requestLatitude: string;
    requestLongitude: string;
    aiAnalysis: AiAnalysis;
    request_fecha_vuelo: string;
}

// Variable del endpoint del servicio (definida según requerimiento)
const WEATHER_ENDPOINT = 'http://localhost:8080/api/v1/weather/print';

/**
 * Servicio para obtener el análisis climático.
 * Nota: Este servicio puede tardar hasta 30 segundos en responder.
 * Se ha configurado un timeout de 60 segundos para evitar errores prematuros.
 * 
 * @param latitude Latitud
 * @param longitude Longitud
 * @param fechaVuelo Fecha del vuelo
 * @returns Promesa con la respuesta del clima (WeatherResponse)
 */
export const fetchWeatherData = async (
    latitude: string,
    longitude: string,
    fechaVuelo: string
): Promise<WeatherResponse> => {
    try {
        const requestData: WeatherRequest = {
            latitude,
            longitude,
            fechaVuelo
        };

        console.log('Weather API Request (Clima):', requestData);

        // Realizar la petición POST con un tiempo de espera extendido (60s)
        const response = await axios.post<WeatherResponse>(
            WEATHER_ENDPOINT,
            requestData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 60000 // 60 segundos de timeout
            }
        );

        console.log('Weather API Response (Clima):', response.data);
        return response.data;
    } catch (error) {
        // Manejo específico para errores de timeout
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            console.error('Weather API request timed out');
            throw new Error('La solicitud del clima excedió el tiempo de espera. Por favor, inténtelo de nuevo.');
        }
        console.error('Error fetching weather data:', error);
        throw error;
    }
};
