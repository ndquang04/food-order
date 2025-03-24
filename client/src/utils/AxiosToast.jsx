import {toast, Bounce} from 'react-toastify';

const AxiosToastSuccess = (message) => {
  toast.success(`🦄 ${message}`, {
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const AxiosToastError = (message) => {
  toast.error(`🦄 ${message}`, {
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export {AxiosToastSuccess, AxiosToastError};
