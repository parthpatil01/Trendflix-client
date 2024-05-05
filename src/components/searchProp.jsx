import React,{useState} from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../assets/search.png';

const SearchProp = ({ placeholder }) => {


    const handleFocus = (e) => {
        e.target.style.borderColor = '#5A698F';
    };

    const handleBlur = (e) => {
        e.target.style.borderColor = 'transparent';
    };

    return (
        <div className="flex items-center py-1">
            <img src={searchIcon} alt="search" className="h-[28px] w-[28px]" />
            <input
                type="text"
                placeholder={placeholder}
                className="h-[20px] w-[85vw] ms-4 py-6 text-white bg-transparent"
                style={{
                    border: 'none',
                    outline: 'none',
                    fontSize: '1.2rem',
                    borderBottom: '1.5px solid transparent',
                    transition: 'border-color 0.2s ease',
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </div>
    );
};


SearchProp.propTypes = {
    placeholder: PropTypes.string.isRequired,
};

export default SearchProp;
