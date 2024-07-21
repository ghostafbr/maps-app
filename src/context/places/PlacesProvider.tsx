import {useEffect, useReducer} from 'react';
import {searchApi} from '../../apis';
import {getUserLocation} from '../../helpers';
import {PlacesResponse, Feature} from '../../interfaces/places';
import {PlacesContext} from './PlacesContext';
import {placesReducer} from './placesReducer';

export interface PlacesState {
    isLoading: boolean;
    userLocation?:  [number, number];
    isLoadingPlaces?: boolean;
    places?: Feature[];
}

const INITIAL_STATE: PlacesState = {
    isLoading: false,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: []
};

export interface Props {
    children: JSX.Element | JSX.Element[];

}

export const PlacesProvider = ({children}: Props) => {

    const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

    useEffect(() => {
        getUserLocation().then((userLocation) => {
            dispatch({type: 'setUserLocation', payload: userLocation});
        });
    }, []);

    const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
        if (query.length === 0) {
            dispatch({type: 'setPlaces', payload: []});
            return [];
        }
        if (!state.userLocation) throw new Error('User location is not defined');

        dispatch({type: 'setLoadingPlaces'});

        const resp = await searchApi.get<PlacesResponse>(`/${ query }.json`, {
            params: {
                proximity: state.userLocation.join(','),
                session_token: '084b0a24-2baf-4211-890d-5b21d7e0cafb'
            }
        });

        dispatch({type: 'setPlaces', payload: resp.data.features});
        return resp.data.features;
    }

    return (
        <PlacesContext.Provider value={{
            ...state,
            searchPlacesByTerm
        }}>
            {children}
        </PlacesContext.Provider>
    );
};
