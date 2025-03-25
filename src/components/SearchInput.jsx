import React, { useState } from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../assets/search.png';
import clearIcon from '../assets/clear.png';
import '../components/circular.css';
import { useLazyQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { useSelector } from 'react-redux';

const SEARCH_QUERY = gql`
  query Search($q: String!, $type: String!) {
    search(q: $q, type: $type) {
      id
      title
      name
      backdrop_path
      poster_path
      release_date
      first_air_date
      media_type
    }
  }
`;

const SEARCH_BOOKMARKS = gql`
  query SearchBookmarks($q: String!) {
    bookmarks(search: $q) {
      id
      title
      name
      backdrop_path
      poster_path
      release_date
      first_air_date
      media_type
    }
  }
`;

const SearchInput = ({ placeholder, onSearch, onClear, type }) => {
  const { userData } = useSelector((state) => state.auth);
  const [query, setQuery] = useState('');
  const [search, { loading: isLoading }] = useLazyQuery(
    type === 'bookmark' ? SEARCH_BOOKMARKS : SEARCH_QUERY,
    {
      onCompleted: (data) => {
        const results = type === 'bookmark' ? data.bookmarks : data.search;
        onSearch(results);
      },
      onError: (error) => {
        console.error('Error fetching data:', error);
      }
    }
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length === 0) {
      onClear();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      executeSearch();
    }
  };

  const handleSearch = () => {
    if (query.length > 0) {
      executeSearch();
    }
  };

  const executeSearch = () => {
    onClear();
    if (type === 'bookmark') {
      search({ variables: { q: query } });
    } else {
      search({ variables: { q: query, type } });
    }
  };

  const handleInputClear = () => {
    setQuery('');
    onClear();
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = '#5A698F';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = 'transparent';
  };

  return (
    <div className="flex items-center py-1">
      {!isLoading && (
        <img 
          src={searchIcon} 
          alt="search" 
          className="h-[24px] w-[24px] md:h-[28px] md:w-[28px] cursor-pointer" 
          onClick={handleSearch} 
        />
      )}
      {isLoading && <div className='circular-loader'></div>}

      <input
        type="text"
        placeholder={placeholder}
        className="h-[20px] w-[85vw] lg:text-xl ms-4 py-6 text-white bg-transparent"
        style={{
          border: 'none',
          outline: 'none',
          borderBottom: '1.5px solid transparent',
          transition: 'border-color 0.2s ease',
        }}
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
      />

      {query && (
        <img
          src={clearIcon}
          alt="clear"
          className="h-[20px] w-[20px] md:h-[24px] md:w-[24px] cursor-pointer relative right-[3%]"
          style={{ marginLeft: '8px' }}
          onClick={handleInputClear}
        />
      )}
    </div>
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default SearchInput;