import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Component/Login/Login'
import Home from './Component/Pages/Home'
import Layout from './Component/Utils/Layout'
import NewArrivals from './Component/Pages/NewArrivals'
import NewArrivalsImg from './Component/Images/NewArrivalsImg'
import BestSeller from './Component/Pages/bestsellers'
import BestSellerImg from './Component/Images/BestSellerImg'
import SchoolBooks from './Component/Pages/SchoolBooks'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>            
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/newarrivalsimg' element={<NewArrivalsImg/>} />
            <Route path='/bestsellersimg' element={<BestSellerImg/>} />
            {/* <Route path='/schoolbooks' element={<SchoolBooks/>} /> */}
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  )
}

export default App
