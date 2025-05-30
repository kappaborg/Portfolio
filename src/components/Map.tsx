'use client';

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
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);

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

  const handleMarkerClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        setShowEasterEgg(true);
        return 0;
      }
      return newCount;
    });
  };

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
      ref={setMap}
      className="relative"
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Standard">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        
        <LayersControl.BaseLayer name="Satellite">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Dark Mode">
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
          />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay checked name="Weather">
          <WeatherLayer />
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Aviation">
          <AviationLayer center={center} radius={100} />
        </LayersControl.Overlay>
      </LayersControl>

      <ZoomControl position="bottomright" />

      {customIcon && (
        <Marker 
          position={center} 
          icon={customIcon}
          eventHandlers={{
            click: handleMarkerClick
          }}
        >
          <Popup className="custom-popup">
            <div className="text-center">
              <MapPinIcon className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="font-medium text-gray-900">You are here!</div>
              <div className="text-gray-600">
                {location.city}, {location.country}
              </div>
            </div>
          </Popup>
        </Marker>
      )}

      {showEasterEgg && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg animate-bounce">
          🎉 You found the secret! 🎉
        </div>
      )}
    </MapContainer>
  );
};

export default Map;