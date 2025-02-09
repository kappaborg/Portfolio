'use client';

import { MapPinIcon } from '@heroicons/react/24/solid';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { LayersControl, MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import AviationLayer from './AviationLayer';

// Özel marker ikonu oluşturuyoruz
const createCustomIcon = () => {
  return L.divIcon({
    html: `
      <div class="relative">
        <div class="absolute -top-8 -left-2">
          <div class="relative">
            <div class="animate-ping absolute h-4 w-4 rounded-full bg-blue-400 opacity-75"></div>
            <div class="relative h-4 w-4 rounded-full bg-blue-500"></div>
          </div>
        </div>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
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
        {/* Base map layer */}
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        {/* Satellite layer */}
        <LayersControl.BaseLayer name="Satellite">
          <TileLayer
            attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>

        {/* Aviation layer */}
        <LayersControl.Overlay checked name="Aviation Data">
          <AviationLayer center={center} radius={100} />
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