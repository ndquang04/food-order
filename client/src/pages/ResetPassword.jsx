import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate, Link} from 'react-router-dom';
import {FaRegEyeSlash, FaRegEye} from 'react-icons/fa6';
import pageUrl from '../constants/pageUrl';
import Loading from '../common/Loading';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import {AxiosToastSuccess, AxiosToastError} from '../utils/AxiosToast';

const defaultData = {
  email: '',
  newPassword: '',
  confirmPassword: '',
};

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(defaultData);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location?.state?.email) {
      navigate(pageUrl.home);
    } else {
      setData({...data, email: location?.state?.email});
    }
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isEqualPassword =
    data.newPassword.trim() &&
    data.confirmPassword.trim() &&
    data.newPassword !== data.confirmPassword;

  const validateValue =
    Object.values(data).every((el) => el.trim()) && !isEqualPassword;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await Axios({...SummaryApi.resetPassword, data});
      setLoading(false);

      if (response?.data?.success) {
        AxiosToastSuccess(response?.data?.message);
        navigate(pageUrl.login);
        setData(defaultData);
      }
    } catch (error) {
      setLoading(false);
      AxiosToastError(error?.response?.data?.message || error.message);
    }
  };

  return (
    <section className='section'>
      {loading && <Loading />}
      <div className='wrapper'>
        <p className='title'>Đặt lại mật khẩu</p>
        <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
          {/* Password */}
          <div className='form-wrap'>
            <span>
              <label htmlFor='newPassword' className='cursor-pointer'>
                Mật khẩu mới
              </label>
            </span>
            <input
              id='newPassword'
              type={showPassword ? 'text' : 'password'}
              autoFocus
              maxLength={20}
              className='form-input'
              name='newPassword'
              value={data.newPassword}
              onChange={handleChange}
              placeholder='Enter your new password'
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
                Xác nhận mật khẩu
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
            Xác nhận
          </button>
        </form>

        <div className='mt-1'>
          <span>Bạn đã có tài khoản?</span>
          <Link
            to={pageUrl.login}
            className='font-medium text-green-600 hover:text-green-800 ml-1'
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
