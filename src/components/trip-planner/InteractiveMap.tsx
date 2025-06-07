
'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { useState, useEffect } from 'react';

// Fix for default marker icon issue with Webpack
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
}

// Define style object outside component for stable identity
const mapContainerStyle: React.CSSProperties = {
  height: '400px',
  width: '100%',
  borderRadius: 'var(--radius)',
  border: '1px solid hsl(var(--border))',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  display: 'flex', // Added for centering text in placeholder
  alignItems: 'center', // Added for centering text in placeholder
  justifyContent: 'center', // Added for centering text in placeholder
  backgroundColor: 'hsl(var(--muted))' // Added for placeholder background
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  center = [20.5937, 78.9629], // Default to center of India
  zoom = 4,                   // Zoom to show a country-level view
}) => {
  const [clientRendered, setClientRendered] = useState(false);

  useEffect(() => {
    setClientRendered(true);
  }, []);

  if (!clientRendered) {
    // Return a styled placeholder div before the map initializes.
    // This div has the same dimensions and basic styling as the map container.
    return (
      <div style={mapContainerStyle}>
        Initializing map...
      </div>
    );
  }

  return (
    // When clientRendered is true, render the actual MapContainer.
    // We remove the flex properties from mapContainerStyle for the actual map
    // as MapContainer handles its own layout.
    <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{...mapContainerStyle, display: undefined, alignItems: undefined, justifyContent: undefined, backgroundColor: undefined }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default InteractiveMap;
