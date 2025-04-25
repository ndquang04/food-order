import React from 'react';
import UserMenu from '../components/UserMenu';

const Dashboard = () => {
  return (
    <section className='bg-white'>
      <div className='container mx-auto p-3 lg:grid grid-cols-[250px,1fr]'>
        {/* left for menu */}
        <div className='py-4 sticky top-[15vh] overflow-y-auto  '>
          <UserMenu />
        </div>

        {/* right for content */}
        <div className='bg-white p-4'>content display</div>
      </div>
    </section>
  );
};

export default Dashboard;
