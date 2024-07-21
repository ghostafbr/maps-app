import axios from 'axios';


const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoiZ2hvc3RhZmJyIiwiYSI6ImNseXY0bnJucTFhNTEya3E0NXMzaTBmM2sifQ.maYWd3S_zwz2_LLWDLZxdg'
    }
})


export default directionsApi;
