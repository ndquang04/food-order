import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {FaRegCircleUser} from 'react-icons/fa6';
import {TiShoppingCart} from 'react-icons/ti';
import Search from './Search';
import logo from '../assets/logo.png';
import useMobile from '../hooks/useMobile';
import pageUrl from '../constants/pageUrl';
import {useSelector} from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === pageUrl.search;
  const user = useSelector((state) => state?.user);
  console.log('user', user);

  const redirectToLoginPage = () => {
    navigate(pageUrl.login);
  };

  return (
    <header className='h-[15vh] lg:h-[10vh] lg:shadow-md sticky top-0 flex flex-col justify-center gap-1 bg-white'>
      {!(isSearchPage && isMobile) && (
        <div className='container mx-auto flex items-center justify-between px-3'>
          {/* logo */}
          <div className='h-full'>
            <Link
              to={pageUrl.home}
              className='h-full  flex justify-center items-center'
            >
              <img
                src={logo}
                width={170}
                height={60}
                alt='logo'
                className='hidden lg:block'
              />
              <img
                src={logo}
                width={120}
                height={60}
                alt='logo'
                className='lg:hidden'
              />
            </Link>
          </div>

          {/* search */}
          <div className='hidden lg:block'>
            <Search />
          </div>

          {/* login and my cart */}
          <div className=''>
            {/* user icons display in only mobile version */}
            <button className='text-neutral-600 lg:hidden'>
              <FaRegCircleUser size={26} />
            </button>

            {/* desktop */}
            <div className='hidden lg:flex items-center gap-10'>
              <button
                className='cursor-pointer text-lg px-3'
                onClick={redirectToLoginPage}
              >
                Login
              </button>
              <button className='flex items-center gap-2 bg-green-800 hover:bg-green-600 p-3 rounded text-white'>
                {/* add to cart icon */}
                <div className='animate-bounce'>
                  <TiShoppingCart size={28} />
                </div>
                <div className='font-semibold'>
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className='container mx-auto px-3 lg:hidden'>
        <Search />
      </div>
    </header>
  );
};

export default Header;
