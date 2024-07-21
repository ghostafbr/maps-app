import mapboxgl from 'mapbox-gl';
import {useContext, useLayoutEffect, useRef} from 'react';
import {MapContext, PlacesContext} from '../context';
import {Loading} from './';

export const MapView = () => {

    const { isLoading, userLocation} = useContext( PlacesContext );
    const { setMap } = useContext(MapContext);
    const mapDiv = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!isLoading) {
            const map = new mapboxgl.Map({
                container: mapDiv.current!, // container ID
                style: 'mapbox://styles/mapbox/streets-v11', // style URL
                center: userLocation,
                zoom: 14
            });
            setMap(map!);
        }
    }, [isLoading, userLocation]);

    if (isLoading) {
        return <Loading />
    }
    
    return (
        <div ref={mapDiv} style={{
            height: '100vh',
            width: '100vw',
            left: 0,
            top: 0,
            position: 'fixed',
        }}>
            { userLocation?.join(', ') }
        </div>
    );
};
