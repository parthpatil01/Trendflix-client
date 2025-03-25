
import React, { useState, useEffect } from 'react';
import GridItem from '../components/GridItem';
import SearchInput from '../components/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTV } from '../slices/tvSeriesSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { gql } from '@apollo/client';

const SEARCH_TV = gql`
  query SearchTV($q: String!, $type: String!) {
    search(q: $q, type: $type) {
      id
      name
      backdrop_path
      poster_path
      first_air_date
      media_type
    }
  }
`;

function TVSeries() {
  const dispatch = useDispatch();
  const { series, cursor, hasMore, loading, error } = useSelector((state) => state.tvseries);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(fetchTV(null)); 
  }, [dispatch]);

  const fetchMoreData = () => {
    if (hasMore) {
      dispatch(fetchTV(cursor));
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
        placeholder='Search for TV series' 
        onSearch={handleSearch} 
        onClear={handleClearSearch} 
        type='tv' 
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
                location={174}
                imageUrl={`https://image.tmdb.org/t/p/original/${item.backdrop_path || item.poster_path}`}
                year={item.first_air_date?.substring(0, 4)}
                type={item.media_type}
                rating="PG"
                title={item.name}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      ) : (
        <InfiniteScroll
          dataLength={series.length}
          next={fetchMoreData}
          height={window.innerHeight * 0.83}
          hasMore={hasMore}
          loader={<h4 className='text-white text-center'>Loading...</h4>}
          endMessage={<p style={{ textAlign: 'center' }}><b>No more series to show</b></p>}
        >
          <>
            <div className="text-2xl md:text-3xl text-white font-[300] mt-8">
              <h4>TV Series</h4>
            </div>
            <div className="flex justify-center lg:justify-start flex-wrap mt-2">
              {series.map((item, index) => (
                <GridItem
                  key={index}
                  item={item}
                  location={174}
                  imageUrl={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                  year={item.first_air_date?.substring(0, 4)}
                  type='tv'
                  rating="PG"
                  title={item.name}
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

export default TVSeries;