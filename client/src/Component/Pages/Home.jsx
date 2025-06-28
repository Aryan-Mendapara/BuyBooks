import React from 'react'
import schoolbooks from '../../assets/img/schoolbooks.jpg'
import NewArrivals from './NewArrivals';
import BestSeller from './bestsellers';
import BBIDiscountOffer from '../../assets/img/BBIDiscountOffer.jpg'
import SchoolBooks from './SchoolBooks';

function Home() {
  
  return (
    <div>
      <div className='bg-gray-200 w-full'>
        {/* img */}
        <div>
          <img src={schoolbooks} className="w-full object-cover" alt="School Books" />
        </div>
      </div>

      <div>
          <NewArrivals />
          <BestSeller />
      </div>

      {/* advertisement */}
      <div>
        <img src={BBIDiscountOffer} className='w-full object-cover' alt="BBIDiscountOffer" />
      </div>

      {/* School Books */}
      <SchoolBooks />
    </div>
  )
}

export default Home
