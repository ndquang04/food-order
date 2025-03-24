import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {TypeAnimation} from 'react-type-animation';
import {IoSearch} from 'react-icons/io5';
import {FaArrowLeft} from 'react-icons/fa';
import pageUrl from '../constants/pageUrl';
import useMobile from '../hooks/useMobile';

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();

  useEffect(() => {
    const isSearch = location.pathname === pageUrl.search;
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate(pageUrl.search);
  };

  return (
    <div className='w-full min-w-[300px] lg:min-w-[420px] h-12 lg:h-11 rounded-lg border-2 border-gray-200 overflow-hidden flex items-center text-neutral-500 bg-gray-50 group focus-within:border-primary-200 focus-within:bg-white'>
      <div>
        {isMobile && isSearchPage ? (
          <Link
            to={pageUrl.home}
            className='flex justify-center items-center h-full p-3 text-neutral-600 cursor-pointer group-focus-within:text-primary-200 group-focus-within:bg-gray-50 bg-white rounded-full shadow-md ml-1 mr-3'
          >
            <FaArrowLeft size={20} />
          </Link>
        ) : (
          <button className='flex justify-center items-center h-full p-3 text-neutral-600 cursor-pointer group-focus-within:text-primary-200 ml-1 mr-3'>
            <IoSearch size={23} />
          </button>
        )}
      </div>
      <div
        onClick={redirectToSearchPage}
        className='w-full h-full flex items-center'
      >
        {!isSearchPage ? (
          <div>
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Search "milk"',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "panner"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "curd"',
                1000,
                'Search "rice"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
              ]}
              wrapper='span'
              speed={30}
              repeat={Infinity}
            />
          </div>
        ) : (
          <div className='w-full h-full'>
            <input
              type='text'
              placeholder='Search for anything you want.'
              autoFocus
              className='bg-transparent w-full h-full outline-none'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
