import Axios from './Axios';
import SummaryApi from '../common/SummaryApi';

const FetchUserDetails = async () => {
  try {
    const res = await Axios({...SummaryApi.userDetails});
    return res;
  } catch (error) {
    console.log('error fetch user detail', error.message || error);
  }
};

export default FetchUserDetails;
