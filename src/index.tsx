import React from 'react';
import ReactDOM from 'react-dom/client';
import {MapsApp} from './MapsApp';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2hvc3RhZmJyIiwiYSI6ImNseXY0bnJucTFhNTEya3E0NXMzaTBmM2sifQ.maYWd3S_zwz2_LLWDLZxdg';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if (!navigator.geolocation) {
    const errorMessage: string = 'Geolocation is not supported by your browser';
    alert(errorMessage);
    throw new Error(errorMessage);
}

root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);
