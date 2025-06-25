import React from 'react'
import schoolbooks from '../../assets/img/schoolbooks.jpg'
import NewArrivals from './NewArrivals';
import BestSeller from './bestsellers';

function Home() {
  
  return (
    <div>
      <div className='bg-gray-200 w-full'>
        {/* img */}
        <div>
          <img src={schoolbooks} className="w-full object-cover" alt="School Books" />
        </div>
      </div>
      {/* New Arrivals */}
      <div>
          <NewArrivals />
          <BestSeller />
      </div>

    </div>
  )
}

export default Home
