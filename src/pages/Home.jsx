// Home.js
import React, { useState, useEffect } from 'react';
import GridItem from '../components/GridItem';
import ScrollContainer from 'react-indiana-drag-scroll';
import SearchInput from '../components/SearchInput';
import play from '../assets/play.png';
import BookmarkButton from '../components/bookmarkButton';
import reel from '../assets/reel.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrending } from '../slices/trendingSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const trending = useSelector((state) => state.trending.data);
    const status = useSelector((state) => state.trending.status);
    const error = useSelector((state) => state.trending.error);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTrending());
        }
    }, [status, dispatch]);

    const handleDelete = (itemId) => {
        console.log('on delete');
    };

    const handleSearch = (results) => {
        setSearchResults(results);
    };

    const handleClearSearch = () => {
        setSearchResults([]);
    };

    const handleOnClick = (itemId, type) => {
        navigate(`/details?itemId=${itemId}&type=${type}`);
    };

    if (status === 'failed') {
        return <div className='text-white'>Error: {error}</div>;
    }

    if (status === 'loading') {
        return (
            <>
                <SearchInput
                    placeholder='Search for movies or TV series'
                    onSearch={handleSearch}
                    onClear={handleClearSearch}
                    type='any'
                />
                <div className="text-2xl md:text-3xl text-white font-[300] mt-3">
                    <h4>Trending</h4>
                </div>
                <div className='text-white h-full w-full mt-12 lg:mt-0 flex justify-center lg:items-center'>
                    <p>Loading...</p>
                </div>
            </>
        );
    }

    if (status === 'succeeded') {
        const firstSection = trending.slice(0, 6);
        const recommendation = trending.slice(8);

        return (
            <div>
                <SearchInput
                    placeholder='Search for movies or TV series'
                    onSearch={handleSearch}
                    onClear={handleClearSearch}
                    type='any'
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
                                    location={173}
                                    imageUrl={`https://image.tmdb.org/t/p/original/${item.backdrop_path || item.poster_path}`}
                                    year={(item.release_date?.slice(0, 4)) || (item.first_air_date?.slice(0, 4))}
                                    type={item.first_air_date ? 'tv' : 'movie'}
                                    rating={item.adult ? "16+" : "PG"}
                                    title={item.title || item.name}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-2xl md:text-3xl text-white font-[300] mt-3">
                            <h4>Trending</h4>
                        </div>

                        <ScrollContainer className="scroll-container w-[100%] mt-4">
                            <div className="flex flex-nowrap">
                                {firstSection.map((item, index) => (
                                    <Link
                                        to={`/details?itemId=${item.id}&type=${item.first_air_date ? 'tv' : 'movie'}`}
                                        className="inline-block pe-8 relative group"
                                        key={index}
                                    >
                                        <div className="w-[280px] h-[130px] md:w-[370px] md:h-[180px] overflow-hidden rounded-md bg-tertiary">
                                            <img
                                                src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                                                alt={item.title || item.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className='absolute h-fit w-fit top-[35%] left-[30%] p-1 rounded-full inset-0 flex items-center justify-center opacity-0 bg-black bg-opacity-15 transition-opacity group-hover:opacity-100'>
                                                <img src={play} alt="play" className='h-[35px]' />
                                                <span className='text-white px-4 font-semibold'>Play</span>
                                            </div>
                                            <BookmarkButton
                                                item={item}
                                                location={111}
                                                onDelete={handleDelete}
                                                onClick={(e) => e.preventDefault()} // Prevent navigation when clicking bookmark
                                            />
                                        </div>

                                        <div className='absolute bottom-3 start-1 md:start-2' style={{ textShadow: '#444444 1px 0 10px' }}>
                                            <div className="text-[0.8rem] font-[500] text-white px-2 pt-1">
                                                <span>{item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4)}</span>
                                                <span> • </span>
                                                <div className='inline'>
                                                    <img src={reel} alt="type" className='h-3 inline me-1' />
                                                    {item.first_air_date ? 'tv' : 'movie'}
                                                </div>
                                                <span> • </span>
                                                <span>{item.adult ? "16+" : "PG"}</span>
                                            </div>
                                            <div className='w-[280px] md:w-[370px] truncate'>
                                                <span className="text-white text-lg px-2">{item.title || item.name}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </ScrollContainer>

                        <div className="text-2xl md:text-3xl text-white font-[300] mt-8">
                            <h4>Recommended for you</h4>
                        </div>

                        <div className="flex flex-wrap justify-center lg:justify-start mt-2">
                            {recommendation.map((item, index) => (
                                <GridItem
                                    key={index}
                                    item={item}
                                    location={173}
                                    imageUrl={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                                    year={item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4)}
                                    type={item.first_air_date ? 'tv' : 'movie'}
                                    rating={item.adult ? "16+" : "PG"}
                                    title={item.title || item.name}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default Home;