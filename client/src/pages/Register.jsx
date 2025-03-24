import React, {useState} from 'react';
import {FaRegEyeSlash, FaRegEye} from 'react-icons/fa6';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import {AxiosToastSuccess, AxiosToastError} from '../utils/AxiosToast';
import Loading from '../common/Loading';
import {Link, useNavigate} from 'react-router-dom';
import pageUrl from '../constants/pageUrl';

const defaultData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const [data, setData] = useState(defaultData);

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isEqualPassword =
    data.password.trim() &&
    data.confirmPassword.trim() &&
    data.password !== data.confirmPassword;

  const validateValue =
    Object.values(data).every((el) => el.trim()) && !isEqualPassword;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await Axios({...SummaryApi.register, data});
      setLoading(false);
      if (response.data.success) {
        AxiosToastSuccess(response.data.message);
        setData(defaultData);
        navigate(pageUrl.login);
      }
    } catch (error) {
      setLoading(false);
      AxiosToastError(error?.response?.data?.message || error.message);
    }
    // toast('Hello Darkness!', {
    //   icon: '👏',
    //   style: {
    //     borderRadius: '10px',
    //     background: '#333',
    //     color: '#fff',
    //   },
    // });
  };

  return (
    <section className='w-full container mx-auto px-2'>
      {loading && <Loading />}
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p>Chào mừng đến với FoodFrenzy !</p>

        <form className='form' onSubmit={handleSubmit}>
          {/* Name */}
          <div className='form-wrap'>
            <span>
              <label htmlFor='name' className='cursor-pointer'>
                Name
              </label>
            </span>
            <input
              id='name'
              type='text'
              autoFocus
              maxLength={30}
              className='form-input'
              name='name'
              value={data.name}
              onChange={handleChange}
              placeholder='Enter your name'
            />
          </div>

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
              placeholder='Enter your email'
            />
          </div>

          {/* Password */}
          <div className='form-wrap'>
            <span>
              <label htmlFor='password' className='cursor-pointer'>
                Password
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
              placeholder='Enter your password'
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

          {/* Confirm Password */}
          <div className='form-wrap'>
            <span>
              <label htmlFor='confirmPassword' className='cursor-pointer'>
                Confirm Password
              </label>
            </span>
            <input
              id='confirmPassword'
              type={showCPassword ? 'text' : 'password'}
              maxLength={20}
              autoFocus
              className={`form-input ${
                isEqualPassword && 'border-red-500 border-2'
              }`}
              name='confirmPassword'
              value={data.confirmPassword}
              onChange={handleChange}
              placeholder='Enter your confirm password'
            />
            <div
              onClick={() => setShowCPassword(!showCPassword)}
              className='cursor-pointer absolute right-2 top-10'
            >
              {showCPassword ? (
                <FaRegEye size={20} />
              ) : (
                <FaRegEyeSlash size={20} />
              )}
            </div>
            {isEqualPassword && (
              <p className='text-red-500 mt-1'>Confirm password incorrect</p>
            )}
          </div>

          <button
            disabled={!validateValue}
            className={`${
              validateValue
                ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
                : 'bg-gray-600 cursor-not-allowed'
            } py-2 my-2 rounded font-semibold text-white`}
          >
            Register
          </button>
        </form>

        <div className='mt-1'>
          <span>Already have account ?</span>
          <Link
            to={pageUrl.login}
            className='font-medium text-green-600 hover:text-green-800 ml-1'
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
