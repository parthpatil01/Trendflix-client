import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import bookmarkOutline from '../assets/book-outline.png';
import bookmarkWhite from '../assets/bookmark-white.png';
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

// GraphQL queries and mutations
const CHECK_BOOKMARK_STATUS = gql`
  query BookmarkStatus($itemId: Int!) {
    bookmarkStatus(itemId: $itemId) {
      isBookmarked
      message
    }
  }
`;

const ADD_BOOKMARK = gql`
  mutation AddBookmark($item: MediaInput!, $location: Int!) {
    postMedia(item: $item, location: $location) {
      message
    }
  }
`;

const REMOVE_BOOKMARK = gql`
  mutation RemoveBookmark($itemId: Int!) {
    deleteMedia(itemId: $itemId) {
      message
    }
  }
`;

const BookmarkButton = ({ item, location, onDelete }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  // Bookmark status query
  const { data, loading: statusLoading, refetch } = useQuery(CHECK_BOOKMARK_STATUS, {
    variables: { itemId: item.id },
    skip: !isAuthenticated,
    fetchPolicy: 'network-only', // Always fetch fresh data
    onError: (error) => {
      console.error('Error checking bookmark status:', error);
    }
  });

  const [addBookmark, { loading: addLoading }] = useMutation(ADD_BOOKMARK, {
    onCompleted: () => {
      refetch(); // Re-check bookmark status after adding
    },
    onError: (error) => {
      console.error('Error adding bookmark:', error);
      if (error.message.includes('Unauthorized')) {
        navigate('/sign-in');
      }
    }
  });

  const [removeBookmark, { loading: removeLoading }] = useMutation(REMOVE_BOOKMARK, {
    onCompleted: () => {
      refetch(); // Re-check bookmark status after removing
      if (location !== 172) {
        onDelete(item.id);
      }
    },
    onError: (error) => {
      console.error('Error removing bookmark:', error);
      if (error.message.includes('Unauthorized')) {
        navigate('/sign-in');
      }
    }
  });

  const isBookmarked = data?.bookmarkStatus?.isBookmarked || false;
  const isLoading = statusLoading || addLoading || removeLoading;

  const toggleBookmark = async (event) => {
    event.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }

    if (isBookmarked) {
      await removeBookmark({
        variables: {
          itemId: item.id
        }
      });
    } else {
      await addBookmark({
        variables: {
          item: {
            id: item.id,
            title: item.title,
            name: item.name,
            backdrop_path: item.backdrop_path,
            poster_path: item.poster_path,
            release_date: item.release_date,
            first_air_date: item.first_air_date,
            media_type: item.media_type || (item.first_air_date ? 'tv' : 'movie')
          },
          location
        }
      });
    }
  };

  return (
    <button 
      onClick={toggleBookmark} 
      disabled={isLoading}
      className={`absolute m-2 p-1 bg-black bg-opacity-35 rounded-full ${
        location === 111 ? 'top-1 right-8' : 'top-0 right-0'
      }`}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      <img 
        src={isBookmarked ? bookmarkWhite : bookmarkOutline} 
        alt="bookmark" 
        className='h-[15px] w-[15px]' 
      />
    </button>
  );
};

export default BookmarkButton;