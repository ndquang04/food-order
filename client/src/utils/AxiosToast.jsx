import {toast, Bounce} from 'react-toastify';

const AxiosToastSuccess = (message) => {
  toast.success(`🦄 ${message}`);
};

const AxiosToastError = (message) => {
  toast.error(`🦄 ${message}`);
};

export {AxiosToastSuccess, AxiosToastError};
