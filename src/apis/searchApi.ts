import axios from 'axios';

export const searchApi = axios.create({
    // baseURL: 'https://api.mapbox.com/search/searchbox/v1',
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        q: '',
        language: 'es',
        proximity: '',
        session_token: '',
        access_token: 'pk.eyJ1IjoiZ2hvc3RhZmJyIiwiYSI6ImNseXY0bnJucTFhNTEya3E0NXMzaTBmM2sifQ.maYWd3S_zwz2_LLWDLZxdg'
    }

})

export default searchApi;

// original
// https://api.mapbox.com/search/searchbox/v1/suggest?q=Sebastian+de+be&language=es&proximity=-76.50660717912639,3.4625772288341494&session_token=084b0a24-2baf-4211-890d-5b21d7e0cafb&access_token=pk.eyJ1IjoiZ2hvc3RhZmJyIiwiYSI6ImNseXY0bnJucTFhNTEya3E0NXMzaTBmM2sifQ.maYWd3S_zwz2_LLWDLZxdg

// generada
// https://api.mapbox.com/search/searchbox/v1/suggest?q=Sebastian+de+be&language=es&proximity=-76.50651764147636,3.4614960397159176&session_token=084b0a24-2baf-4211-890d-5b21d7e0cafb&access_token=pk.eyJ1IjoiZ2hvc3RhZmJyIiwiYSI6ImNseXY0bnJucTFhNTEya3E0NXMzaTBmM2sifQ.maYWd3S_zwz2_LLWDLZxdg


// https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=${country}&access_token=${accessToken}&proximity=${nearLongitude},${nearLatitude}
// https://api.mapbox.com/geocoding/v5/mapbox.places/sebastian%20.json?q=&language=es&proximity=-76.50651764147636,3.4614960397159176&session_token=084b0a24-2baf-4211-890d-5b21d7e0cafb&access_token=pk.eyJ1IjoiZ2hvc3RhZmJyIiwiYSI6ImNseXY0bnJucTFhNTEya3E0NXMzaTBmM2sifQ.ma
