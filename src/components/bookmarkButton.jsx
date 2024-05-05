import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import bookmarkOutline from '../assets/book-outline.png';
import bookmarkWhite from '../assets/bookmark-white.png';
import makeRequestWithToken from '../helper/makeRequestWithToken';
import { useNavigate } from "react-router-dom";


const BookmarkButton = ({ itemId, location, onDelete }) => {

    const [isBookmarked, setIsBookmarked] = useState(false);
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.auth);
    let status = useSelector((state) => state.trending.status);
    const email = userData?.useremail;

    useEffect(() => {
        
        if (status === 'succeeded') {
            checkBookmarkStatus();
        }

    }, []);

    const checkBookmarkStatus = async () => {
        try {
            if (email && itemId) {
                const response = await makeRequestWithToken(
                    "/media/bookmarks",
                    'POST',
                    { email, itemId } // Sending email and itemID data
                );
                if (response.data.isBookmarked) {
                    console.log(itemId)
                }
                setIsBookmarked(response.data.isBookmarked);
            } else setIsBookmarked(false);

        } catch (error) {
            console.error('Error checking bookmark status:', error);
        }
    };

    const toggleBookmark = async (event) => {
        event.stopPropagation();
        
        try {

            if (email) {

                if (isBookmarked) {
                    await makeRequestWithToken(`/media/delete/${itemId}`, 'DELETE', { email });
                    onDelete(itemId);
                } else {
                    await makeRequestWithToken(`/media/addmedia`, 'POST', { email, itemId, location });
                    setIsBookmarked(true)
                }
                
            }else{

            navigate('/sign-in');

            }

        } catch (error) {
            console.error('Error toggling bookmark:', error);
        }
    };

    return (

        <button onClick={toggleBookmark} className={`absolute m-2 p-1 bg-black bg-opacity-35 rounded-full ${location===111?'top-1 right-8 ' :'top-0 right-0' }`}>
            <img src={isBookmarked ? bookmarkWhite : bookmarkOutline} alt="bookmark" className='h-[15px] w-[15px]' />
        </button>
    );
};

export default BookmarkButton;
