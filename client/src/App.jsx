import {useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import {ToastContainer, Slide} from 'react-toastify';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import FetchUserDetails from './utils/FetchUserDetails';
import {setUserDetails} from './store/userSlice';
import {useDispatch} from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const userData = await FetchUserDetails();
    dispatch(setUserDetails(userData?.data));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <main className='min-h-[70vh] lg:min-h-[75vh]'>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme='colored'
        transition={Slide}
      />
    </>
  );
}

export default App;
