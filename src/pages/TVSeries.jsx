import React, { useState, useRef, useEffect } from 'react';
import GridItem from '../components/GridItem';
import SearchInput from '../components/SearchInput';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTVSeries } from '../slices/tvSeriesSlice';
import SearchProp from '../components/searchProp';

function TVSeries() {

    const dispatch = useDispatch();

    const tvseries = useSelector((state) => state.tvseries.data);
    let status = useSelector((state) => state.tvseries.status);
    const error = useSelector((state) => state.tvseries.error);
    const [searchResults, setSearchResults] = useState([]);


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTVSeries());
        }
    }, [dispatch, status]);

    if (status === 'failed') {
        return <div className='text-white'>Error: {error}</div>;
    }

    if (status === 'loading') {

        return <>
            <SearchProp placeholder='Search for movies or TV series' />

            <div className="text-2xl md:text-3xl text-white font-[300] mt-3">
                <h4>TV Series</h4>
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
                <SearchInput placeholder='Search for TV series' onSearch={handleSearch} onClear={handleClearSearch} type='tv'/>

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
                ) : (

                    <>

                        <div className="text-2xl md:text-3xl text-white font-[300] mt-8">
                            <h4>TV Series</h4>
                        </div>

                        <div className="flex justify-center lg:justify-start flex-wrap mt-2">
                            {tvseries.map((item, index) => (
                                <GridItem
                                    itemId={item.id}
                                    key={index}
                                    location={174}
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



export default TVSeries;