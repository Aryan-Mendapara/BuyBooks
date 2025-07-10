import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Component/Login/Login'
import Home from './Component/Pages/Home'
import Layout from './Component/Utils/Layout'
import NewArrivalsImg from './Component/ViewMore/NewArrivalsImg'
import BestSellerImg from './Component/ViewMore/BestSellerImg'
import ImagesData from './Component/data/BestSellersData'
import SchoolBooksImg from './Component/ViewMore/SchoolBooksImg'
import FictionNonFictionBooksImg from './Component/ViewMore/FictionNonFictionBooksImg'

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
            <Route path='/schoolbooksimg' element={<SchoolBooksImg/>} />
            <Route path='/addImages' element={<ImagesData/>} />
            <Route path='fictionnonfictionbooksimg' element={<FictionNonFictionBooksImg/>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  )
}

export default App
