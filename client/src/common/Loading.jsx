import {AiOutlineLoading3Quarters} from 'react-icons/ai';

const Loading = () => {
  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-10 flex items-center justify-center'>
      <div className='animate-spin text-primary-200'>
        <AiOutlineLoading3Quarters size={36} />
      </div>
    </div>
  );
};

export default Loading;
