import {AnySourceData, LngLatBounds, Map, Marker, Popup} from 'mapbox-gl';
import {useContext, useEffect, useReducer} from 'react';
import {directionsApi} from '../../apis';
import {DirectionsResponse} from '../../interfaces/directions';
import {PlacesContext} from '../places/PlacesContext';
import {MapContext} from './MapContext';
import {mapReducer} from './mapReducer';

export interface MapState {
    isMapReady: boolean;
    map?: Map;
    markers?: Marker[];
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: []
};

interface Props {
    children: JSX.Element | JSX.Element[];

}

export const MapProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
    const {places} = useContext(PlacesContext);

    useEffect(() => {
        state.markers?.forEach(marker => marker.remove());
        const newMarkers: Marker[] = [];

        for (const place of places!) {
            const [ lng, lat ] = place.center;
            const popUp = new Popup({offset: 25}).setHTML(`
                <h3>${ place.text }</h3>
                <p>${ place.properties.address }</p>
            `);

            const marker = new Marker({color: '#61DAFB'})
                .setLngLat([lng, lat])
                .setPopup(popUp)
                .addTo(state.map!);

            newMarkers.push(marker);

        }

        dispatch({type: 'setMarkers', payload: newMarkers});

    }, [places]);

    const setMap = (map: Map) => {

        const myLocationPopin = new Popup({offset: 25}).setHTML(`
            <h3>My Location</h3>
            <p>Latitude: ${map.getCenter().lat.toFixed(4)}</p>
`);

        new Marker({color: '#61DAFB'})
            .setLngLat(map.getCenter())
            .setPopup(myLocationPopin)
            .addTo(map);

        dispatch({type: 'setMap', payload: map});
    }

    const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {

        const response = await directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`);
        const {duration, distance, geometry} = response.data.routes[0];
        const { coordinates: coords } = geometry;

        let kms = distance / 1000;
        kms = Math.round(kms * 100) / 100;

        const minutes = Math.floor(duration / 60);

        console.log(`Distance: ${kms} km`);
        console.log(`Duration: ${minutes} minutes`);

        const bounds = new LngLatBounds(
            start,
            start
        );

        for (const coord of coords) {
            const newCoord: [number, number] = [coord[0], coord[1]];
            bounds.extend(newCoord);
        }

        state.map?.fitBounds(bounds, {
            padding: 200
        });


        // Polyline
        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }

        if ( state.map?.getLayer('RouteString') ) {
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }

        state.map?.addSource('RouteString', sourceData );

        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'black',
                'line-width': 3
            }
        })


    }

    return (
        <MapContext.Provider value={{
            ...state,
            setMap,
            getRouteBetweenPoints
        }}>

            { children }
        </MapContext.Provider>
    );
};
