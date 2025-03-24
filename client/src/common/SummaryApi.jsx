export const baseURL = 'http://192.168.1.15:8080/api';

const SummaryApi = {
  register: {
    url: 'user/register',
    method: 'POST',
  },
  login: {
    url: 'user/login',
    method: 'POST',
  },
  forgotPassword: {
    url: 'user/forgot-password',
    method: 'PUT',
  },
  verifyOTP: {
    url: 'user/verify-forgot-password-otp',
    method: 'PUT',
  },
  resetPassword: {
    url: 'user/reset-password',
    method: 'PUT',
  },
  refreshToken: {
    url: 'user/refresh-token',
    method: 'POST',
  },
  userDetails: {
    url: 'user/user-details',
    method: 'GET',
  },
};

export default SummaryApi;
