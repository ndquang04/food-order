import React, {useEffect, useState} from 'react';
import {FaRegEyeSlash, FaRegEye} from 'react-icons/fa6';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import {AxiosToastSuccess, AxiosToastError} from '../utils/AxiosToast';
import Loading from '../common/Loading';
import {Link, useNavigate} from 'react-router-dom';
import pageUrl from '../constants/pageUrl';
import {useDispatch, useSelector} from 'react-redux';
import {FacebookAuthProvider, signInWithPopup} from 'firebase/auth';
import FetchUserDetails from '../utils/FetchUserDetails';
import {setUserDetails} from '../store/userSlice';
import {auth} from '../utils/Firebase';

const defaultData = {
  email: '',
  password: '',
};

const Login = () => {
  const [data, setData] = useState(defaultData);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.data);
  console.log('user login', user);

  useEffect(() => {
    if (user?._id) {
      navigate(pageUrl.home);
    }
  }, [user?._id]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateValue = Object.values(data).every((el) => el.trim());

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await Axios({...SummaryApi.login, data});
      setLoading(false);
      if (response?.data?.success) {
        AxiosToastSuccess(response.data.message);
        localStorage.setItem('accessToken', response.data.data.accessToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        const userData = await FetchUserDetails();
        dispatch(setUserDetails(userData?.data));
        setData(defaultData);
        navigate(pageUrl.home);
      }
    } catch (error) {
      setLoading(false);
      AxiosToastError(error?.response?.data?.message || error.message);
    }
  };

  const loginWithFB = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('LOGGED USER', result?.user);
    } catch (error) {
      console.log('error login FB', error?.message || error);
    }
  };

  return (
    <section className='section'>
      {loading && <Loading />}
      <div className='wrapper'>
        <p className='title'>Đăng nhập</p>

        <form className='form' onSubmit={handleSubmit}>
          {/* Email */}
          <div className='form-wrap'>
            <span>
              <label htmlFor='email' className='cursor-pointer'>
                Email
              </label>
            </span>
            <input
              id='email'
              type='email'
              autoFocus
              className='form-input'
              name='email'
              value={data.email}
              onChange={handleChange}
              placeholder='Nhập email'
            />
          </div>

          {/* Password */}
          <div className='form-wrap'>
            <span>
              <label htmlFor='password' className='cursor-pointer'>
                Mật khẩu
              </label>
            </span>
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              autoFocus
              maxLength={20}
              className='form-input'
              name='password'
              value={data.password}
              onChange={handleChange}
              placeholder='Nhập mật khẩu'
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className='cursor-pointer absolute right-2 top-10'
            >
              {showPassword ? (
                <FaRegEye size={20} />
              ) : (
                <FaRegEyeSlash size={20} />
              )}
            </div>
          </div>

          <button
            disabled={!validateValue}
            className={`${
              validateValue
                ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
                : 'bg-gray-600 cursor-not-allowed'
            } py-2 my-2 rounded font-semibold text-white`}
          >
            Đăng nhập
          </button>
          <button
            onClick={loginWithFB}
            type='button'
            className='bg-green-600 hover:bg-green-700 cursor-pointer py-2 my-2 rounded font-semibold'
          >
            Đăng nhập với Facebook
          </button>
        </form>

        <div className='mt-1 flex items-center justify-between'>
          <p>
            <span>Bạn chưa có tài khoản?</span>
            <Link
              to={pageUrl.register}
              className='font-medium text-green-600 hover:text-green-800 ml-1'
            >
              Đăng ký ngay
            </Link>
          </p>
          <p>
            <Link
              to={pageUrl.forgotPassword}
              className='font-medium text-primary-200 hover:text-yellow-500'
            >
              Quên mật khẩu?
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
