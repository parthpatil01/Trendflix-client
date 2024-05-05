import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const Demo = () => {
    const [trendingMedia, setTrendingMedia] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    let firstrun =true;

    useEffect(() => {
        if(firstrun){
            fetchTrending();
            firstrun=false;
        }

    }, []);

    const fetchTrending = async () => {
        try {
            const options = {


                headers: {
                    accept: 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWUxMjhkOTZkNzM2OTI4ZmU1ZTI2ZmNjMGM1MjdkOSIsInN1YiI6IjY2MmFhZDVmMmZlMmZhMDExZTk2YWQ2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-0f7F4R8dZIMfMN_i2O8YfugyaymhvIr4dtq2dnEGwQ',
                },
            };
            console.log('here')
            const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${currentPage}`, { ...options, timeout: 10000 });
            const newMedia = response.data.results;
            setTrendingMedia((prevMedia) => [...prevMedia, ...newMedia]);
            setCurrentPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error('Error fetching trending media:', error);
        } 
    };

    const refresh = () => {
        setCurrentPage(1); // Reset current page
        setTrendingMedia([]); // Clear existing data
        fetchTrending(); // Fetch new data
    };

    return (
        <div className='text-white'>
            <h2 >Trending Media</h2>

            <InfiniteScroll
                dataLength={trendingMedia.length} //This is important field to render the next data
                next={fetchTrending}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                // below props only if you need pull down functionality
                refreshFunction={refresh}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                pullDownToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                }
                releaseToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                }
            >
                <ul className='text-white'>
                    {trendingMedia.map((media) => (
                        <li key={media.id} className='py-5'>{media.title || media.name}</li>
                    ))}
                </ul>
            </InfiniteScroll>
        </div>
    );
};

export default Demo;
