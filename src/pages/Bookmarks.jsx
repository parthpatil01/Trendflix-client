// Bookmarks.js
import React, { useState } from 'react';
import GridItem from '../components/GridItem';
import SearchInput from '../components/SearchInput';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookmarks, removeBookmarkMovie, removeBookmarkTVSeries } from '../slices/bookmarkSlice';
import { useEffect } from 'react';


function Bookmarks() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [searchResults, setSearchResults] = useState([]);
    const { data, status, error } = useSelector((state) => state.bookmark);
    

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchBookmarks());
        }
        console.log('fetching bookmarks');
    }, [isAuthenticated, dispatch]);


    const handleSearch = (results) => {
        setSearchResults(results);
    };

    const handleClearSearch = () => {
        setSearchResults([]);
    };


    const handleDelete = (itemId) => {
        // Determine whether the item is a movie or a TV series
        const itemToDelete = data.movies.find(item => item.id === itemId);
        console.log(itemToDelete);
        if (itemToDelete) {
            // If the item is in the movies array, remove it from there
            dispatch(removeBookmarkMovie(itemId));
        } else {
            // If the item is not in the movies array, it must be in the TV series array
            dispatch(removeBookmarkTVSeries(itemId));
        }
        setSearchResults([]);
    };

    if (!isAuthenticated) {
        return (
            <div className='text-xl text-white mt-5'>
                <p>Please log in to view your bookmarks.</p>
                <Link to="/sign-in" className='underline'>Login</Link>
            </div>
        );
    }

    if (status === 'loading') {
        return (
            <>
                <SearchInput
                    placeholder='Search for movies or TV series'
                    onSearch={handleSearch}
                    onClear={handleClearSearch}
                    type='bookmark'
                />
                <div className="text-3xl text-white font-[300] mt-3">
                    <h4>Bookmarks</h4>
                </div>
                <div className='text-white h-full w-full mt-12 lg:mt-0 flex justify-center lg:items-center'>
                    <p>Loading...</p>
                </div>
            </>
        );
    }

    if (status === 'failed') {
        return <div className='text-white'>Error: {error}</div>;
    }

    return (
        <div>
            <SearchInput
                placeholder='Search for bookmarked shows'
                onSearch={handleSearch}
                onClear={handleClearSearch}
                type='bookmark'
            />

            {searchResults.length > 0 ? (
                <>
                    <div className="text-2xl md:text-3xl text-white font-[300] mt-8">
                        <h4>Search Result</h4>
                    </div>
                    <div className="flex flex-wrap justify-center lg:justify-start mt-2">
                        {searchResults.map((item, index) => (
                            <GridItem
                                key={index}
                                item={item}
                                location={172}
                                imageUrl={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                                year={item.release_date?.substring(0, 4) || item.first_air_date?.substring(0, 4)}
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
                    {data.movies.length === 0 && data.tvSeries.length === 0 && (
                        <div className="text-3xl text-white font-[300] mt-8">
                            <h4>No Bookmarks</h4>
                        </div>
                    )}

                    {data.movies.length > 0 && (
                        <>
                            <div className="text-2xl md:text-3xl text-white font-[300] mt-8">
                                <h4>Bookmarked Movies</h4>
                            </div>
                            <div className="flex justify-center lg:justify-start flex-wrap mt-2">
                                {data.movies.map((item, index) => (
                                    <GridItem
                                        key={index}
                                        item={item}
                                        location={172}
                                        imageUrl={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                                        year={item.release_date?.substring(0, 4)}
                                        type="movie"
                                        rating="PG"
                                        title={item.title}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {data.tvSeries.length > 0 && (
                        <>
                            <div className="text-2xl md:text text-white font-[300] mt-8">
                                <h4>Bookmarked TV Series</h4>
                            </div>
                            <div className="flex justify-center lg:justify-start flex-wrap mt-2">
                                {data.tvSeries.map((item, index) => (
                                    <GridItem
                                        key={index}
                                        item={item}
                                        location={172}
                                        imageUrl={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                                        year={item.first_air_date?.substring(0, 4)}
                                        type="tv"
                                        rating="PG"
                                        title={item.name}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Bookmarks;