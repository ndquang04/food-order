import React, {useState, useRef, useEffect} from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import {AxiosToastSuccess, AxiosToastError} from '../utils/AxiosToast';
import Loading from '../common/Loading';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import pageUrl from '../constants/pageUrl';

const defaultData = ['', '', '', '', '', ''];

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(defaultData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location?.state?.email) {
      navigate(pageUrl.forgotPassword);
    }
  }, []);

  const validateValue = otp.every((el) => el.trim());

  const handleChange = (e, index) => {
    const value = e.target.value;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move to the next input after a digit is entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.verifyOTP,
        data: {
          otp: otp.join(''),
          email: location?.state?.email,
        },
      });
      setLoading(false);
      if (response.data.success) {
        AxiosToastSuccess(response.data.message);
        setOtp(defaultData);
        navigate(pageUrl.resetPassword, {
          state: {
            email: location?.state?.email,
          },
        });
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
        <p className='font-semibold text-lg text-primary-200'>Verify OTP 😊</p>
        <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
          {/* OTP */}
          <div className='form-wrap'>
            <div className='flex items-center justify-between gap-2'>
              {otp.map((item, index) => (
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  key={index}
                  type='text'
                  maxLength={1}
                  autoFocus={index === 0}
                  value={item}
                  onChange={(e) => handleChange(e, index)}
                  className='input-otp'
                />
              ))}
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
            Verify
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

export default OTPVerification;
