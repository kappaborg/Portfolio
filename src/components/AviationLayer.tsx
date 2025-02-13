'use client';

import { useTheme } from '@/context/ThemeContext';
import { aviationService, FlightData } from '@/services/aviationService';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Circle, Polyline, Popup, useMap } from 'react-leaflet';
import AircraftMarker from './AircraftMarker';

interface AviationLayerProps {
  center: [number, number];
  radius: number; // Kilometre cinsinden yarıçap
}

export default function AviationLayer({ center, radius }: AviationLayerProps) {
  const map = useMap();
  const { theme } = useTheme();
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [flightPaths, setFlightPaths] = useState<{ id: string; path: [number, number][] }[]>([]);
  const [loading, setLoading] = useState(true);

  // Harita sınırlarını hesapla
  const calculateBoundingBox = (center: [number, number], radiusKm: number) => {
    const R = 6371; // Dünya yarıçapı (km)
    const lat = center[0];
    const lon = center[1];
    
    const latChange = (radiusKm / R) * (180 / Math.PI);
    const lonChange = (radiusKm / R) * (180 / Math.PI) / Math.cos(lat * Math.PI / 180);

    return {
      minLat: lat - latChange,
      maxLat: lat + latChange,
      minLon: lon - lonChange,
      maxLon: lon + lonChange
    };
  };

  // Uçuş verilerini periyodik olarak güncelle
  useEffect(() => {
    const bounds = calculateBoundingBox(center, radius);
    let interval: NodeJS.Timeout;

    const fetchFlights = async () => {
      try {
        setLoading(true);
        const flightData = await aviationService.getFlightsInBoundingBox(
          bounds.minLat,
          bounds.maxLat,
          bounds.minLon,
          bounds.maxLon
        );
        setFlights(flightData);

        // Uçuş rotalarını hesapla
        const paths = flightData.map(flight => {
          if (flight.latitude && flight.longitude) {
            const path = aviationService.calculateFlightPath(
              center,
              [flight.latitude, flight.longitude]
            );
            return {
              id: flight.id,
              path: path.geometry.coordinates.map((coord: number[]): [number, number] => [coord[1], coord[0]])
            };
          }
          return null;
        }).filter((path): path is { id: string; path: [number, number][] } => path !== null);

        setFlightPaths(paths);
      } catch (error) {
        console.error('Error fetching flight data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
     interval = setInterval(fetchFlights, 10000); // Her 10 saniyede bir güncelle

    return () => {
      clearInterval(interval);
    };
  }, [center, radius]);

  // Uçuş detaylarını göster
  const handleFlightClick = async (flight: FlightData) => {
    setSelectedFlight(flight);
    if (flight.latitude && flight.longitude) {
      const weather = await aviationService.getWeatherData(flight.latitude, flight.longitude);
      if (weather) {
        map.flyTo([flight.latitude, flight.longitude], 10, {
          duration: 1
        });
      }
    }
  };

  return (
    <>
      {/* Kapsama alanı dairesi */}
      <Circle
        center={center}
        radius={radius * 1000}
        pathOptions={{
          color: theme === 'dark' ? '#3B82F6' : '#2563EB',
          fillColor: theme === 'dark' ? '#3B82F680' : '#2563EB40',
          fillOpacity: 0.1
        }}
      />

      {/* Uçuş rotaları */}
      {flightPaths.map(({ id, path }) => (
        <Polyline
          key={`path-${id}`}
          positions={path}
          pathOptions={{
            color: theme === 'dark' ? '#60A5FA' : '#3B82F6',
            weight: 1,
            opacity: 0.6,
            dashArray: '5, 5'
          }}
        />
      ))}

      {/* Uçuşlar */}
      {flights.map((flight) => {
        if (!flight.latitude || !flight.longitude) return null;

        return (
          <motion.div
            key={`flight-${flight.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AircraftMarker
              position={[flight.latitude, flight.longitude]}
              heading={flight.heading}
              onClick={() => handleFlightClick(flight)}
              isDark={theme === 'dark'}
            >
              <Popup className="flight-popup">
                <div className="p-4 max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {flight.callsign || 'Unknown Flight'}
                    </h3>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {flight.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Altitude:</span>
                      <span className="font-medium">{Math.round(flight.altitude || 0)} m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Speed:</span>
                      <span className="font-medium">{Math.round(flight.speed || 0)} m/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Aircraft:</span>
                      <span className="font-medium">{flight.aircraft}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Airline:</span>
                      <span className="font-medium">{flight.airline}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">From</p>
                          <p className="font-medium">{flight.origin}</p>
                        </div>
                        <div className="text-center">
                          <span className="inline-block w-16 h-px bg-gray-300 dark:bg-gray-600"></span>
                          <span className="block mt-1 text-xs text-gray-500 dark:text-gray-400">Flight</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600 dark:text-gray-400">To</p>
                          <p className="font-medium">{flight.destination}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </AircraftMarker>
          </motion.div>
        );
      })}

      {/* Loading indicator */}
      {loading && (
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-[1000]">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Updating flight data...
            </span>
          </div>
        </div>
      )}
    </>
  );
} 