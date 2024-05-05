import React, { useState, useRef, useEffect } from 'react';
import GridItem from '../components/GridItem';
import SearchInput from '../components/SearchInput';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../slices/moviesSlice';
import SearchProp from '../components/searchProp';

function Movies() {


    const dispatch = useDispatch();

    const movies = useSelector((state) => state.movies.data);
    let status = useSelector((state) => state.movies.status);
    const error = useSelector((state) => state.movies.error);
    const [searchResults, setSearchResults] = useState([]);


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchMovies());
        }
    }, [dispatch, status]);


    if (status === 'failed') {
        return <div className='text-white'>Error: {error}</div>;
    }

    if (status === 'loading') {

        return <>
            <SearchProp placeholder='Search for movies or TV series' />

            <div className="text-2xl md:text-3xl text-white font-[300] mt-3">
                <h4>Movies</h4>
            </div>

            <div className='text-white h-full w-full mt-12 lg:mt-0 flex justify-center lg:items-center'><p>Loading...</p></div>
        </>;
    }

    if (status === 'succeeded') {


        const handleDelete = (itemId) => {
            console.log('on delete');
        };


        const handleSearch = (results) => {
            setSearchResults(results);
        };

        const handleClearSearch = () => {
            setSearchResults([]);
        };

        return (
            <div>
                <SearchInput placeholder='Search for Movies' onSearch={handleSearch} onClear={handleClearSearch} type='movie' />

                {searchResults.length > 0 ? (

                    <>
                        <div className="text-2xl md:text-3xl text-white font-[300] mt-8">
                            <h4>Search Result</h4>
                        </div>

                        <div className="flex flex-wrap justify-center lg:justify-start mt-2">
                            {searchResults.map((item, index) => (

                                <GridItem
                                    key={index}
                                    itemId={item.id}
                                    location={173} //code for database location
                                    imageUrl={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                                    year={item.release_date ? item.release_date.substring(0, 4) : item.first_air_date.substring(0, 4)}
                                    type={item.media_type}
                                    rating="PG"
                                    title={item.title || item.name}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>

                    </>
                )

                    : (

                        <>
                            <div className="text-2xl md:text-3xl text-white font-[300] mt-8">
                                <h4>Movies</h4>
                            </div>

                            <div className="flex flex-wrap justify-center lg:justify-start mt-2">
                                {movies.map((item, index) => (
                                    <GridItem
                                        key={index}
                                        itemId={item.id}
                                        location={175}
                                        imageUrl={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                                        year={item.release_date ? item.release_date.substring(0, 4) : item.first_air_date.substring(0, 4)}
                                        type={item.media_type}
                                        rating="PG"
                                        title={item.title || item.name}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        </>
                    )}

            </div >

        );
    }

}



export default Movies;