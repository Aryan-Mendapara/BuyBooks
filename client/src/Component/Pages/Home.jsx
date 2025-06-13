import React from 'react'
import bestseller from '../../assets/img/bestseller.jpg'
import schoolbooks from '../../assets/img/schoolbooks.jpg'

function Home() {
  return (
    <div>
      <div>        
        <img src={bestseller} sizes={50} />
        <img src={schoolbooks} sizes={50} />
      </div>
    </div>
  )
}

export default Home
