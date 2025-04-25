import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import Divider from './Divider';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import {logout} from '../store/userSlice';
import {AxiosToastError, AxiosToastSuccess} from '../utils/AxiosToast';
import pageUrl from '../constants/pageUrl';
import {FaExternalLinkAlt} from 'react-icons/fa';

const UserMenu = ({closeUserMenu}) => {
  const user = useSelector((state) => state?.user?.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await Axios({...SummaryApi.logout});
      if (res?.data?.success) {
        closeUserMenu && closeUserMenu();
        dispatch(logout());
        localStorage.clear();
        AxiosToastSuccess(res?.data?.message);
        navigate(pageUrl.home);
      }
    } catch (error) {
      AxiosToastError(error.message || error);
      console.log('err logout', error);
    }
  };

  return (
    <div>
      <p className='font-semibold'>My Account</p>
      <div className='text-sm flex items-center gap-2'>
        <span className='max-w-52 text-ellipsis line-clamp-1'>
          {user.name || user.mobile}{' '}
        </span>
        <Link to={pageUrl.profile} className='hover:text-primary-200'>
          <FaExternalLinkAlt size={15} />
        </Link>
      </div>
      <Divider />
      <div className='text-sm grid gap-2'>
        <Link to='' className='px-2 hover:text-primary-200'>
          Đơn hàng của tôi
        </Link>
        <Link to='' className='px-2 hover:text-primary-200'>
          Lưu địa chỉ
        </Link>
        <button
          onClick={handleLogout}
          className='text-left px-2 cursor-pointer hover:text-primary-200'
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
