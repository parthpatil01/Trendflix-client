import React, { useState, useEffect } from 'react';
import GridItem from '../components/GridItem';
import SearchInput from '../components/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../slices/moviesSlice';
import InfiniteScroll from 'react-infinite-scroll-component';

function Movies() {
    const dispatch = useDispatch();
    const { movies, cursor, hasMore, loading, error } = useSelector((state) => state.movies);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
       
        dispatch(fetchMovies(null));
    }, [dispatch]);

    const fetchMoreData = () => {
        if (hasMore) {
            dispatch(fetchMovies(cursor));
        }
    };

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
            <SearchInput 
                placeholder='Search for Movies' 
                onSearch={handleSearch} 
                onClear={handleClearSearch} 
                type='movie' 
            />

            {searchResults.length > 0 ? (
                <div className='flex flex-col'>
                    <div className="text-2xl md:text-3xl text-white font-[300] mt-8">
                        <h4>Search Result</h4>
                    </div>
                    <div className="flex flex-wrap justify-center lg:justify-start mt-2">
                        {searchResults.map((item, index) => (
                            <GridItem
                                key={index}
                                item={item}
                                location={175}
                                imageUrl={`https://image.tmdb.org/t/p/original/${item.backdrop_path || item.poster_path}`}
                                year={item.release_date?.substring(0, 4) || item.first_air_date?.substring(0, 4)}
                                type={item.media_type}
                                rating="PG"
                                title={item.title || item.name}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <InfiniteScroll
                    dataLength={movies.length}
                    next={fetchMoreData}
                    height={window.innerHeight * 0.83}
                    hasMore={hasMore}
                    loader={<h4 className='text-white text-center'>Loading...</h4>}
                    endMessage={
                        <p className="text-white text-center py-4">
                            <b>No more movies to show</b>
                        </p>
                    }
                >
                    <>
                        <div className="text-2xl md:text-3xl text-white font-[300] mt-6">
                            <h4>Movies</h4>
                        </div>
                        <div className="flex flex-wrap justify-center lg:justify-start mt-2">
                            {movies.map((item, index) => (
                                <GridItem
                                    key={`${item.id}-${index}`}
                                    item={item}
                                    location={175}
                                    imageUrl={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                                    year={item.release_date?.substring(0, 4) || item.first_air_date?.substring(0, 4)}
                                    type='movie'
                                    rating="PG"
                                    title={item.title || item.name}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </>
                </InfiniteScroll>
            )}
        </div>
    );
}

export default Movies;