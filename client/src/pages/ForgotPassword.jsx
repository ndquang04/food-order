import React, {useState} from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import {AxiosToastSuccess, AxiosToastError} from '../utils/AxiosToast';
import Loading from '../common/Loading';
import {Link, useNavigate} from 'react-router-dom';
import pageUrl from '../constants/pageUrl';

const defaultData = {
  email: '',
};

const ForgotPassword = () => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateValue = Object.values(data).every((el) => el.trim());
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await Axios({...SummaryApi.forgotPassword, data});
      setLoading(false);
      if (response.data.success) {
        AxiosToastSuccess(response.data.message);
        navigate(pageUrl.verifyOTP, {
          state: data,
        });
        setData(defaultData);
      }
    } catch (error) {
      setLoading(false);
      AxiosToastError(error?.response?.data?.message || error.message);
    }
  };

  return (
    <section className='w-full container mx-auto px-2'>
      {loading && <Loading />}
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p className='font-semibold text-lg text-primary-200'>
          Forgot password
        </p>
        <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
          {/* Email */}
          <div className='form-wrap'>
            <input
              type='email'
              autoFocus
              className='form-input'
              value={data.email}
              onChange={(e) => setData({email: e.target.value})}
              placeholder='Enter your email'
            />
          </div>

          <button
            disabled={!validateValue}
            className={`${
              validateValue
                ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
                : 'bg-gray-600 cursor-not-allowed'
            } py-2 my-2 rounded font-semibold text-white`}
          >
            Send OTP
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

export default ForgotPassword;
