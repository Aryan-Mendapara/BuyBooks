import React from 'react'
import schoolbooks from '../../assets/img/schoolbooks.jpg'
import tea from '../../assets/img/tea.jpg'
import indias from '../../assets/img/indias.jpg'

function Home() {
  return (
    <div>
      <div className='bg-gray-200 w-full'>
        {/* img */}
        <div>
          <img src={schoolbooks} className="w-full object-cover" alt="School Books" />
        </div>

        {/* New Arrivals */}
        <div className='flex justify-center items-center'>
          <h1 className='text-4xl font-semibold p-2 border-b-2 border-orange-500'>New Arrivals</h1>
        </div>
        <div className="my-20 h-80 flex justify-center items-center space-x-5">
          <img src={tea} className="h-52 w-40 object-cover rounded" />
          <img src={indias} className="h-52 w-40 object-cover rounded" />
        </div>

      </div>
    </div>
  )
}

export default Home
