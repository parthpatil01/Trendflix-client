import React, { useState } from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../assets/search.png';
import clearIcon from '../assets/clear.png'
import '../components/circular.css'
import makeRequestWithToken from '../helper/makeRequestWithToken';
import { useSelector } from 'react-redux';
import axios from 'axios';

const SearchInput = ({ placeholder, onSearch, onClear,type }) => {


    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const baseUrl = import.meta.env.VITE_APP_API_URL
    const { userData } = useSelector((state) => state.auth);


    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if(value.length===0){
            onClear();
            console.log('herere')
        } 
    };

    const handleKeyPress = (e) => {
        // Check if the "Enter" key is pressed
        if (e.key === 'Enter' && query.length > 0) {
            // Fetch data from server when input changes
            fetchData(query);
        }
    };

    const handleSearch = (e) => {
        if (query.length > 0) {
            fetchData(query);
        }
    }

    const handleInputClear = () => {
        setQuery(''); // Clear the query
        onClear(); // Notify parent component that input is cleared
    };

    const fetchData = async (value) => {
        try {
            setIsLoading(true);
            // Perform your fetch operation here
            let response;
            if(type==='bookmark'){
                response = await makeRequestWithToken(`/media/search?q=${value}`,"POST",{email:userData?.useremail})
            }else {
                response = await axios.get(`${baseUrl}/data/search?q=${value}&type=${type}`);
            }
            
            const data = await response.data;
            // Send data back to parent
            onSearch(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false); // Reset loading status regardless of success or failure
        }
    };

    const handleFocus = (e) => {
        e.target.style.borderColor = '#5A698F';
    };

    const handleBlur = (e) => {
        e.target.style.borderColor = 'transparent';
    };

    return (
        <div className="flex items-center py-1">
            {!isLoading && <img src={searchIcon} alt="search" className="h-[24px] w-[24px] md:h-[28px] md:w-[28px] cursor-pointer" onClick={handleSearch} />}
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

            {query && ( // Render clear button only if there's text in the input
                <img
                    src={clearIcon}
                    alt="clear"
                    className="h-[20px] w-[20px] md:h-[24px] md:w-[24px] cursor-pointer relative right-[3%]"
                    style={{ marginLeft: '8px' }}
                    onClick={handleInputClear} // Call handleInputClear when clear button is clicked
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
