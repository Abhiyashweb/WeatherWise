
'use client';

import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import { useState, useEffect, useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface GoogleMapDisplayProps {
  center?: { lat: number; lng: number };
  zoom?: number;
}

const mapContainerStyle = {
  height: '400px',
  width: '100%',
  borderRadius: 'var(--radius)',
  border: '1px solid hsl(var(--border))',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const defaultCenter = {
  lat: 20.5937, // Center of India
  lng: 78.9629,
};

const GoogleMapDisplay: React.FC<GoogleMapDisplayProps> = ({
  center = defaultCenter,
  zoom = 5,
}) => {
  const [isClient, setIsClient] = useState(false);
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const memoizedCenter = useMemo(() => center, [center]);

  if (!isClient) {
    return <Skeleton style={mapContainerStyle} />;
  }

  if (!googleMapsApiKey) {
    return (
      <div style={mapContainerStyle} className="flex items-center justify-center bg-muted text-muted-foreground p-4 text-center">
        Google Maps API key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env file.
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} loadingElement={<Skeleton style={mapContainerStyle} />}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={memoizedCenter}
        zoom={zoom}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {/* You can add markers here later if you have coordinates */}
        <MarkerF position={memoizedCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapDisplay;
