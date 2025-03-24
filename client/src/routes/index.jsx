import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import SearchPage from '../pages/SearchPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import pageUrl from '../constants/pageUrl';
import ForgotPassword from '../pages/ForgotPassword';
import OTPVerification from '../pages/OTPVerification';
import ResetPassword from '../pages/ResetPassword';

const {
  home,
  search,
  login,
  register,
  forgotPassword,
  verifyOTP,
  resetPassword,
} = pageUrl;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: home,
        element: <Home />,
      },
      {
        path: search,
        element: <SearchPage />,
      },
      {
        path: login,
        element: <Login />,
      },
      {
        path: register,
        element: <Register />,
      },
      {
        path: forgotPassword,
        element: <ForgotPassword />,
      },
      {
        path: verifyOTP,
        element: <OTPVerification />,
      },
      {
        path: resetPassword,
        element: <ResetPassword />,
      },
    ],
  },
]);

export default router;
