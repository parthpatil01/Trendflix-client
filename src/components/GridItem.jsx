import React from 'react';
import play from '../assets/play.png';
import tv from '../assets/tv.png'
import reel from '../assets/reel.png'
import placeholder from '../assets/placeholder.jpg'

import BookmarkButton from './bookmarkButton';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const GridItem = ({ item, location, imageUrl, year, type, rating, title, onDelete }) => {
  return (
    <article className="me-4 md:me-10 my-4 relative group">
      <div className='bg-tertiary rounded-md'>
        <Link 
          to={`/details?itemId=${item.id}&type=${type}`}
          className="block"
          aria-label={`View details for ${title}`}
        >
          <img 
            src={item.backdrop_path ? imageUrl : placeholder} 
            alt="" 
            className="rounded-md w-[160px] md:h-[150px] md:w-[250px]" 
          />
          <div className='absolute h-fit w-fit top-[20%] left-[20%] md:top-[30%] md:left-[30%] p-1 rounded-full inset-0 flex items-center justify-center opacity-0 bg-black bg-opacity-15 transition-opacity group-hover:opacity-100'>
            <img src={play} alt="" className='h-[25px] md:h-[35px]' />
            <span className='text-white px-4 text-sm md:text-base font-semibold'>Play</span>
          </div>
        </Link>
        <BookmarkButton item={item} location={location} onDelete={onDelete} />
      </div>
      
      <Link 
        to={`/details?itemId=${item.id}&type=${type}`}
        className="block mt-2"
      >
        <div className="text-xs md:text-[0.8rem] text-gray-400 px-2 pt-1">
          <span>{year}</span>
          <span> • </span>
          <div className='inline'>
            <img src={type == 'movie' ? reel : tv} alt="" className='h-3 inline me-1' />{type}
          </div>
          <span> • </span>
          <span>{rating}</span>
        </div>
        <h3 className='max-w-[160px] text-sm md:text-base md:max-w-[250px] truncate text-white px-2'>
          {title}
        </h3>
      </Link>
    </article>
  );
};

export default GridItem;
