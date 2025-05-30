import { MapPinIcon } from '@heroicons/react/24/solid';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { LayersControl, MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import AviationLayer from './AviationLayer';
import WeatherLayer from './WeatherLayer';

// Previous custom icon code...

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
        {/* Existing layers... */}

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