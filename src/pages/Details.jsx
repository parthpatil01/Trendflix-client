import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt, faArrowLeft, faLink, faTicket } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons'
import logo from '../assets/logo.png'

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Deatails() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get('itemId');
  const type = searchParams.get('type');
  const [loading, setLoading] = useState(true);

  const [movieDetails, setMovieDetails] = useState(null);
  const navigate = useNavigate();

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/data/details?itemId=${itemId}&type=${type}`);
      setMovieDetails(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchMovieDetails();

  }, [itemId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p className="text-white text-2xl">Loading...</p></div>;
  }

  if (!movieDetails) {
    return <div className="flex justify-center items-center h-screen"><p className="text-white text-2xl">No details available</p></div>;
  }

  console.log(movieDetails)

  const mapLanguage = (code) => {
    const languageMap = {
      en: 'English',
      hi: 'Hindi',
      ko: 'Korean',
      ja: 'Japanese',
      es: 'Spanish',
      zh: 'Chinese',
      ar: 'Arabic',
      pt: 'Portuguese',
      ru: 'Russian',
      // Add more languages as needed
    };

    return languageMap[code] || code; // Return language name or code if not found in the map
  };

  const handleBackButtonClick = () => {
    // Handle the back button click event here
    // For example, you can navigate back or perform any other action
    navigate(-1);
    console.log('Back button clicked!');
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="left lg:h-screen px-5 py-6">
        <div className="bg-secondary py-4 lg:py-0 px-6 lg:px-0 flex flex-row lg:flex-col lg:h-full lg:w-[70px] rounded-lg items-center">
          <img src={logo} alt="logo" className='h-[25px] w-[25px] lg:mt-6 self-center hidden lg:block' />
          <button onClick={handleBackButtonClick} className="text-white lg:mt-12 bg-tertiary h-[28px] w-[28px] rounded-full hover:text-gray-300 focus:outline-none">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
      </div >
      <div className="right flex flex-col lg:py-8 px-6 h-screen lg:overflow-y-auto">
        <div className="h-full flex flex-col lg:flex-row justify-around text-white">

          <div className="self-center">
            <img src={`https://image.tmdb.org/t/p/original/${movieDetails.detail.poster_path}`} className='rounded-md max-h-[650px] w-[400px] shadow-md' alt="Image" />
          </div>

          <div className="lg:w-[50%] mt-8 lg:mt-4">

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light">{movieDetails.detail.original_name || movieDetails.detail.name || movieDetails.detail.title || movieDetails.detail.original_title}</h1>
            <div className='flex mt-6'>
              <h1 className='text-3xl mr-4 font-semibold'>{(movieDetails.detail.vote_average / 2).toFixed(2)}</h1>
              {[...Array(5)].map((_, index) => (
                <span key={index} className="text-sm mt-2 text-white">
                  {index < Math.floor(movieDetails.detail.vote_average / 2) ? (
                    <FontAwesomeIcon icon={faStar} />
                  ) : index < movieDetails.detail.vote_average / 2 ? (
                    <FontAwesomeIcon icon={faStarHalfAlt} />
                  ) : (
                    <FontAwesomeIcon icon={faStarOutline} />
                  )}
                </span>
              ))}

            </div>
            <table className="table-auto w-full mt-6">
              <tbody>
                <tr>
                  <td className="font-semibold pr-4 text-xl text-gray-400">Length</td>
                  <td className="font-semibold pr-4 text-xl text-gray-400"> Year</td>
                  <td className="font-semibold pr-4 text-xl text-gray-400">Status</td>
                  <td className="font-semibold pr-4 text-xl text-gray-400">Language</td>

                </tr>
                <tr>
                  <td className="pr-4">{(movieDetails.detail.runtime || movieDetails.detail.episode_run_time) === undefined ? 'N/A' : `${movieDetails.detail.runtime || movieDetails.detail.episode_run_time[0]} min`} </td>

                  <td className="pr-4">{(movieDetails.detail.release_date || movieDetails.detail.first_air_date).slice(0, 4)}

                    {movieDetails.detail.last_air_date && ( movieDetails.detail.status === 'Returning Series' ? ' - present' : ` - ${movieDetails.detail.last_air_date.slice(0, 4)}`)}
                  </td>
                  <td className="pr-4">{movieDetails.detail.status}</td>
                  <td className="pr-4">{mapLanguage(movieDetails.detail.original_language)}</td>
                </tr>
              </tbody>
            </table>
            <h1 className='mt-6 text-xl font-medium'>Genres</h1>
            <div className='text-black flex flex-wrap mt-3'>
              {movieDetails.detail.genres.map((genre, index) => (
                <p key={index} className='bg-white rounded-lg font-semibold text-[16px] text-center px-2 mr-3 mb-2'>{genre.name}</p>
              ))}
            </div>
            <h1 className='mt-4 text-xl font-medium'>Synopsis</h1>
            <p className='mt-2 text-gray-300'>{movieDetails.detail.overview}</p>

            {movieDetails.cast.crew[0] && <><h1 className='mt-4 text-xl font-medium'>Director</h1>
              <div className='flex mt-3 gap-2 flex-wrap'>
                <p className=' border border-gray-400 font-semibold rounded-lg px-4 text-[16px] text-center'>{movieDetails.cast.crew[0].name}</p>
              </div>
            </>}

            {movieDetails.detail.created_by && <><h1 className='mt-4 text-xl font-medium'>Created by</h1>
              <div className='flex mt-3 gap-2 flex-wrap'>
                <p className=' border border-gray-400 font-semibold rounded-lg px-4 text-[16px] text-center'>{movieDetails.detail.created_by.length>0 && (movieDetails.detail.created_by[0].name || movieDetails.detail.created_by[0].original_name)}</p>
              </div>
            </>}

            <h1 className='mt-4 text-xl font-medium'>Casts</h1>
            <div className='flex mt-3 gap-2 flex-wrap'>
              {movieDetails.cast.cast.map((cast, index) => (
                <p key={index} className=' border border-gray-400 font-semibold rounded-lg px-4 text-[16px] text-center'>{cast.name}</p>
              ))}
            </div>

            <div className='mt-8'>
              <div className='inline'>
                <a
                  href={movieDetails.detail.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='pl-4 py-1 bg-[#5A698F] rounded-md font-semibold mr-4'
                >
                  Website <FontAwesomeIcon className='px-4' icon={faLink} />
                </a>

                {movieDetails.detail.imdb_id &&
                  <a
                    href={`https://www.imdb.com/title/${movieDetails.detail.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='pl-4 py-1 bg-[#5A698F] rounded-md text-center font-semibold'
                  >
                    IMDB <FontAwesomeIcon className='px-4' icon={faTicket} />
                  </a>
                }

              </div>
            </div>
            <div className='flex mt-10'><p className='invisible'>.</p></div>
          </div>
        </div>
      </div>
    </div >

  )
} export default Deatails;
