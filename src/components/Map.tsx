import { MapPinIcon } from '@heroicons/react/24/solid';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { LayersControl, MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import AviationLayer from './AviationLayer';
import WeatherLayer from './WeatherLayer';

const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-marker-icon',
    html: `
      <div class="relative w-8 h-8 flex items-center justify-center transform -translate-x-1/2 -translate-y-full">
        <div class="absolute w-8 h-8 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
        <div class="relative w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-500 transform rotate-45 translate-y-1/2 -translate-x-1/2"></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

interface MapProps {
  center: [number, number];
  location: {
    city: string;
    country: string;
  };
}

const Map = ({ center, location }: MapProps) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [customIcon, setCustomIcon] = useState<L.DivIcon | null>(null);

  useEffect(() => {
    setCustomIcon(createCustomIcon());
  }, []);

  useEffect(() => {
    if (map) {
      map.flyTo(center, 13, {
        duration: 2,
      });
    }
  }, [center, map]);

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
      ref={setMap}
    >
      <LayersControl position="topright">
        {/* Weather layers */}
        <LayersControl.Overlay checked name="Weather Radar">
          <WeatherLayer />
        </LayersControl.Overlay>
        
        <LayersControl.Overlay name="Wind Patterns">
          <TileLayer
            url="https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid={apikey}"
            apikey={process.env.NEXT_PUBLIC_WEATHER_API_KEY || ''}
            opacity={0.5}
          />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Temperature">
          <TileLayer
            url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid={apikey}"
            apikey={process.env.NEXT_PUBLIC_WEATHER_API_KEY || ''}
            opacity={0.5}
          />
        </LayersControl.Overlay>
      </LayersControl>

      <ZoomControl position="bottomright" />

      {customIcon && (
        <Marker position={center} icon={customIcon}>
          <Popup className="custom-popup">
            <div className="text-center">
              <MapPinIcon className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="font-medium text-gray-900">Buradasınız!</div>
              <div className="text-gray-600">
                {location.city}, {location.country}
              </div>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;