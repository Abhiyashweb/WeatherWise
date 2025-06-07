
'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';

// Fix for default marker icon issue with Webpack which can occur with react-leaflet
// https://github.com/PaulLeCam/react-leaflet/issues/808
// https://github.com/Leaflet/Leaflet/issues/4968
// @ts-ignore This is a known workaround
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface InteractiveMapProps {
  center?: LatLngExpression;
  zoom?: number;
  // In the future, we could pass markers or route data here
  // For example: markers?: Array<{ position: LatLngExpression; popupText: string }>;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  center = [20.5937, 78.9629], // Default to center of India, for example
  zoom = 4,                   // Zoom to show a country-level view
}) => {
  // MapContainer relies on window, so ensure it only renders client-side.
  // next/dynamic with ssr:false handles this, but this is an extra check.
  if (typeof window === 'undefined') {
    return <div style={{ height: '400px', width: '100%', backgroundColor: 'hsl(var(--muted))', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))' }}>Loading map...</div>;
  }

  return (
    <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true} 
        style={{ 
            height: '400px', 
            width: '100%', 
            borderRadius: 'var(--radius)', 
            border: '1px solid hsl(var(--border))',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* 
        Example of how a marker could be added if coordinates were available:
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> 
      */}
    </MapContainer>
  );
};

export default InteractiveMap;
