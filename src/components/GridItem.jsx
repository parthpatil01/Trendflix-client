import React from 'react';
import play from '../assets/play.png';
import tv from '../assets/tv.png'
import reel from '../assets/reel.png'
import BookmarkButton from './bookmarkButton';
import { useNavigate } from 'react-router-dom';



const GridItem = ({ itemId,location,imageUrl, year, type, rating, title, onDelete }) => {
  
  const navigate = useNavigate();


  const handleOnClick = (itemId)=>{
    navigate(`/details?itemId=${itemId}`);
  }
  
  return (
    <div className="me-4 md:me-10 my-4 relative cursor-pointer group" onClick={()=>handleOnClick(itemId)}>
      <div className='bg-tertiary rounded-md'>
        <img src={imageUrl} alt="img" className="rounded-md w-[160px] md:h-[150px] md:w-[250px]" />
        <div className='absolute h-fit w-fit top-[20%] left-[20%] md:top-[30%] md:left-[30%] p-1 rounded-full inset-0 flex items-center justify-center opacity-0 bg-black bg-opacity-15 transition-opacity group-hover:opacity-100 '>
          <img src={play} alt="play" className='h-[25px] md:h-[35px]' />
          <span className='text-white px-4 text-sm md:text-base font-semibold '>Play</span>
        </div>
        <BookmarkButton itemId={itemId} location={location} onDelete={onDelete}/>
      </div>
      <div className="text-xs md:text-[0.8rem] text-gray-400 px-2 pt-1">
        <span>{year}</span>
        <span> • </span>
        <div className='inline'>
          <img src={reel} alt="type" className='h-3 inline me-1' />{type}
        </div>
        <span> • </span>
        <span>{rating}</span>
      </div>
      <div className='max-w-[160px] text-sm md:text-base md:max-w-[250px] truncate'>
        <span className="text-white px-2">{title}</span>

      </div>
    </div>
  );
};

export default GridItem;
