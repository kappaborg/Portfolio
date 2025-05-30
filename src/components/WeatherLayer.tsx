import { useTheme } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';
import { Circle, Popup } from 'react-leaflet';

interface WeatherData {
  id: string;
  type: string;
  intensity: number;
  coordinates: [number, number];
}

export default function WeatherLayer() {
  const { theme } = useTheme();
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  useEffect(() => {
    // Simulate weather data updates
    const interval = setInterval(() => {
      // In a real app, this would fetch from a weather API
      const mockData: WeatherData[] = [
        {
          id: '1',
          type: 'rain',
          intensity: 0.7,
          coordinates: [51.5074, -0.1278]
        },
        // Add more weather phenomena
      ];
      setWeatherData(mockData);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {weatherData.map((weather) => (
        <Circle
          key={weather.id}
          center={weather.coordinates}
          radius={weather.intensity * 10000}
          pathOptions={{
            color: theme === 'dark' ? '#60A5FA' : '#3B82F6',
            fillColor: theme === 'dark' ? '#3B82F680' : '#2563EB40',
            fillOpacity: 0.4
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-medium">{weather.type}</h3>
              <p>Intensity: {weather.intensity * 100}%</p>
            </div>
          </Popup>
        </Circle>
      ))}
    </>
  );
}