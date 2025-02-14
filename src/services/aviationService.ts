// Gerekli importlar
import { lineString } from '@turf/helpers';
import * as turf from '@turf/turf';
import { format } from 'date-fns';
import { Feature, LineString } from 'geojson';

// Uçuş verisi interface'i
export interface FlightData {
  id: string;
  callsign: string;
  origin: string;
  destination: string;
  latitude: number;
  longitude: number;
  altitude: number;
  speed: number;
  heading: number;
  aircraft: string;
  airline: string;
  status: string;
}

// Hava durumu verisi interface'i
export interface WeatherData {
  temperature: number;
  wind_speed: number;
  wind_direction: number;
  visibility: number;
  precipitation: number;
  cloud_cover: number;
}

// Aviation servisi
class AviationService {
  // Belirli bir bölgedeki uçuşları getir
  async getFlightsInBoundingBox(minLat: number, maxLat: number, minLon: number, maxLon: number): Promise<FlightData[]> {
    try {
      const params = new URLSearchParams({
        bounds: `${maxLat},${minLat},${minLon},${maxLon}`,
        faa: '1',
        satellite: '1',
        mlat: '1',
        flarm: '1',
        adsb: '1',
        gnd: '1',
        air: '1',
        vehicles: '1',
        estimated: '1',
        maxage: '14400',
        gliders: '1',
        stats: '1'
      });

      const response = await fetch(`/api/flights?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return this.transformFlightData(data);
    } catch (error) {
      console.error('Error fetching flights:', error);
      return [];
    }
  }

  // Hava durumu verilerini getir
  async getWeatherData(lat: number, lon: number): Promise<WeatherData | null> {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
      );
      const data = await response.json();
      return {
        temperature: data.main.temp,
        wind_speed: data.wind.speed,
        wind_direction: data.wind.deg,
        visibility: data.visibility,
        precipitation: data.rain ? data.rain['1h'] : 0,
        cloud_cover: data.clouds.all
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  }

  // Uçuş rotası hesapla
  calculateFlightPath(startPoint: [number, number], endPoint: [number, number]): Feature<LineString> {
    return lineString([startPoint, endPoint]);
  }

  // Uçuş mesafesi hesapla
  calculateDistance(startPoint: [number, number], endPoint: [number, number]): number {
    const from = turf.point(startPoint);
    const to = turf.point(endPoint);
    return turf.distance(from,to);
  }

  // Uçuş süresini tahmin et
  estimateFlightTime(distance: number, averageSpeed: number): string {
    const hours = distance / averageSpeed;
    return format(new Date(hours * 3600 * 1000), 'HH:mm');
  }

  // Uçuş verilerini dönüştür
  private transformFlightData(data: Record<string, unknown>): FlightData[] {
    const flights: FlightData[] = [];
    
    for (const key in data) {
      if (key !== 'full_count' && key !== 'version' && Array.isArray(data[key])) {
        const flight = data[key] as (string | number | null)[];
        flights.push({
          id: key,
          callsign: String(flight[0] || 'Unknown'),
          latitude: Number(flight[1] || 0),
          longitude: Number(flight[2] || 0),
          heading: Number(flight[3] || 0),
          altitude: Number(flight[4] || 0),
          speed: Number(flight[5] || 0),
          airline: String(flight[8] || 'Unknown'),
          origin: String(flight[11] || 'Unknown'),
          destination: String(flight[12] || 'Unknown'),
          aircraft: String(flight[9] || 'Unknown'),
          status: String(flight[14] || 'Unknown')
        });
      }
    }
    
    return flights;
  }
}

// Servis instance'ını export et
export const aviationService = new AviationService(); 