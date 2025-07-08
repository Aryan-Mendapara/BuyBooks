import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Component/Login/Login'
import Home from './Component/Pages/Home'
import Layout from './Component/Utils/Layout'
import NewArrivalsImg from './Component/Images/NewArrivalsImg'
import BestSellerImg from './Component/Images/BestSellerImg'
import SchoolBooks from './Component/Pages/SchoolBooks'
import ImagesData from './Component/data/BestSellersData'

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
            <Route path='/addImages' element={<ImagesData/>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  )
}

export default App
