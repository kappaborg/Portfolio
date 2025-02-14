'use client';

import L from 'leaflet';
import { useEffect, useMemo } from 'react';
import { Marker } from 'react-leaflet';

interface AircraftMarkerProps {
  position: [number, number];
  heading: number;
  onClick?: () => void;
  isDark?: boolean;
  children?: React.ReactNode;
}

export default function AircraftMarker({ position, heading, onClick, isDark = false, children }: AircraftMarkerProps) {
  // SVG uçak ikonu
  const iconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${isDark ? '#60A5FA' : '#3B82F6'}" class="aircraft-icon" style="transform: rotate(${heading}deg);">
      <path d="M10.5 16.5L9 18v1h6v-1l-1.5-1.5h-3zM22 12c0-.72-.42-1.346-1.032-1.645l-2.125-5.312A2.25 2.25 0 0016.75 3h-9.5a2.25 2.25 0 00-2.093 1.043l-2.125 5.312A1.998 1.998 0 002 12c0 .72.42 1.346 1.032 1.645l2.125 5.312A2.25 2.25 0 007.25 21h9.5a2.25 2.25 0 002.093-1.043l2.125-5.312A1.998 1.998 0 0022 12zm-11 4.5a1.5 1.5 0 01-3 0V15h3v1.5zm0-3h-3v-3h3v3zm0-4.5h-3V7.5a1.5 1.5 0 013 0V9zm4.5 7.5a1.5 1.5 0 01-3 0V15h3v1.5zm0-3h-3v-3h3v3zm0-4.5h-3V7.5a1.5 1.5 0 013 0V9z"/>
    </svg>
  `;

  // Özel ikon oluştur
  const icon = useMemo(() => {
    return L.divIcon({
      html: `
        <div class="relative">
          <div class="absolute transform -translate-x-1/2 -translate-y-1/2">
            ${[iconSvg]}
            <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
              <div class="animate-ping absolute h-2 w-2 rounded-full bg-blue-400 opacity-75"></div>
              <div class="relative h-2 w-2 rounded-full bg-blue-500"></div>
            </div>
          </div>
        </div>
      `,
      className: 'aircraft-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  }, [heading, isDark]);

  // CSS stillerini ekle
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .aircraft-marker {
        transition: transform 0.3s ease-in-out;
      }
      .aircraft-icon {
        width: 24px;
        height: 24px;
        filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.2));
        transition: transform 0.3s ease-in-out;
      }
      .aircraft-marker:hover .aircraft-icon {
        transform: scale(1.2) rotate(${heading}deg);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [heading]);

  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{
        click: onClick
      }}
    >
      {children}
    </Marker>
  );
} 