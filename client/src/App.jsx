import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Component/Login/Login'
import Home from './Component/Pages/Home'
import Layout from './Component/Utils/Layout'
import NewArrivals from './Component/Pages/NewArrivals'
import NewArrivalsImg from './Component/Images/NewArrivalsImg'
import BestSeller from './Component/Pages/bestsellers'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>            
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/newarrivals' element={<NewArrivals/>} />
            <Route path='/newarrivalsimg' element={<NewArrivalsImg/>} />
            <Route path='/bestseller' element={<BestSeller/>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  )
}

export default App
