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
import UserMenuMobile from '../pages/UserMenuMobile';
import Dashboard from '../layouts/Dashboard';
import Profile from '../pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: pageUrl.home,
        element: <Home />,
      },
      {
        path: pageUrl.search,
        element: <SearchPage />,
      },
      {
        path: pageUrl.login,
        element: <Login />,
      },
      {
        path: pageUrl.register,
        element: <Register />,
      },
      {
        path: pageUrl.forgotPassword,
        element: <ForgotPassword />,
      },
      {
        path: pageUrl.verifyOTP,
        element: <OTPVerification />,
      },
      {
        path: pageUrl.resetPassword,
        element: <ResetPassword />,
      },
      {
        path: pageUrl.user,
        element: <UserMenuMobile />,
      },
      {
        path: pageUrl.dashboard,
        element: <Dashboard />,
        children: [
          {
            path: pageUrl.profile,
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

export default router;
