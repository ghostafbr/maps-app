import '../styles.css'
import {ChangeEvent, useContext, useRef} from 'react';
import {PlacesContext} from '../context';
import {SearchResults} from './SearchResults';

export const SearchBar = () => {

    const debounceRef = useRef<NodeJS.Timeout>();
    const {searchPlacesByTerm}  = useContext(PlacesContext);

    const onQueryChanged = (evt: ChangeEvent<HTMLInputElement>) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
            searchPlacesByTerm(evt.target.value);
        }, 300);
    }

    return (
        <div className="search-container">
            <input type="text" placeholder="Search..." name="search" className="form-control" onChange={ onQueryChanged }/>
            <SearchResults />
        </div>
    );
};
