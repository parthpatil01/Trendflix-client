import logo from '../assets/logo.png'
import tv from '../assets/tv.png'
import reel from '../assets/reel.png'
import home from '../assets/home.png'
import bookmark from '../assets/bookmark.png'
import profile from '../assets/profile.avif'
import tvRed from '../assets/tv-red.png';
import tvWhite from '../assets/tv-white.png';
import reelRed from '../assets/reel-red.png';
import reelWhite from '../assets/reel-white.png';
import homeRed from '../assets/home-red.png';
import homeWhite from '../assets/home-white.png';
import bookmarkRed from '../assets/bookmark-red.png';
import bookmarkWhite from '../assets/bookmark-white.png';
import search from '../assets/search.png'
import Home from '../pages/Home'
import TVSeries from './TVSeries'
import Bookmarks from './Bookmarks'
import Movies from './Movies'
import { useState } from 'react'
import '../components/tooltip.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { signOut } from '../slices/authSlice'

function Homepage() {

    const [activeTab, setActiveTab] = useState('home');
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function IconWithHover({ redImage, whiteImage, image, tab }) {
        const [isHovered, setIsHovered] = useState(false);

        const handleMouseEnter = () => {
            setIsHovered(true);
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
        };

        return (
            <button onClick={() => setActiveTab(tab)}>
                <img
                    src={isHovered ? redImage : (activeTab === tab ? whiteImage : image)}
                    alt="icon"
                    className="h-[28px] w-[28px] lg:h-[22px] lg:w-[22px]"
                    style={{
                        transition: 'all 0.3s ease',
                        ...(isHovered && {
                            transform: 'scale(1.1)',

                        })
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
            </button>
        );
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'movies':
                return <Movies />;
            case 'tvseries':
                return <TVSeries />;
            case 'bookmarks':
                return <Bookmarks />;
            default:
                return <Home />;
        }
    };


    const handleSession = () => {
        if(isAuthenticated){
            dispatch(signOut());
            location.reload();

        }else{
            navigate('/sign-in');
        }


    }


    return (
        <div className="flex flex-col lg:flex-row">
            <div className="left lg:h-screen px-5 py-6">
                <div className="bg-secondary py-4 lg:py-0 px-6 lg:px-0 flex flex-row lg:flex-col lg:h-full lg:w-[70px] rounded-lg items-center">

                    <img src={logo} alt="logo" className='h-[25px] w-[25px] lg:mt-6 self-center' />

                    <div className='w-full flex justify-center'>
                        <div className='flex lg:flex-col items-center justify-evenly w-[170px] lg:mt-6 lg:h-[230px]'>

                            <IconWithHover redImage={homeRed} image={home} whiteImage={homeWhite} tab="home" />

                            <IconWithHover redImage={reelRed} image={reel} whiteImage={reelWhite} tab="movies" />

                            <IconWithHover redImage={tvRed} image={tv} whiteImage={tvWhite} tab="tvseries" />

                            <IconWithHover redImage={bookmarkRed} image={bookmark} whiteImage={bookmarkWhite} tab="bookmarks" />


                        </div>
                    </div>

                    <div className='flex lg:flex-1 items-end justify-end lg:mb-6'>

                        <div className='tooltip'>
                            <div className="tooltiptext"><button className='px-2 py-1 w-[70px] text-sm rounded-lg' style={isAuthenticated ? { backgroundColor: '#fa3c3c' } : { backgroundColor: '#2a385e' }} onClick={handleSession}>{isAuthenticated ? 'Log Out' : 'Sign In'}</button></div>
                            <img src={profile}
                                alt="profile-pic" className='rounded-full h-[35px] w-[42px] md:h-[45px] md:w-[50px] lg:h-[35px] lg:w-[35px]' />
                        </div>
                    </div>

                </div>
            </div >
            <div className="right flex flex-col lg:py-8 ps-3 lg:ps-2 h-screen lg:overflow-y-auto">

                {renderTabContent()}
            </div>
        </div >
    )
}

export default Homepage