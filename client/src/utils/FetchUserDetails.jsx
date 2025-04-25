import Axios from './Axios';
import SummaryApi from '../common/SummaryApi';

const FetchUserDetails = async () => {
  try {
    const res = await Axios({...SummaryApi.userDetails});
    return res?.data;
  } catch (error) {
    // AxiosToastError(error.message || error);
    console.log('error fetch user detail', error);
  }
};

export default FetchUserDetails;
