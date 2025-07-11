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
import PreOrder from './Component/Pages/PreOrder'
import ChildrenAndYoungAdultBooks from './Component/Pages/ChildrenAndYoungAdultBooks'
import HigherEducation from './Component/Pages/HigherEducation'
import TestPrep from './Component/Pages/TestPrep'
import GamesPuzzles from './Component/Pages/GamesPuzzles'
import Order from './Component/Pages/Order'

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
            <Route path='fiction-non-fiction-booksimg' element={<FictionNonFictionBooksImg/>} />
            <Route path='/pre-order' element={<PreOrder/>} />
            <Route path='/children-young-adult' element={<ChildrenAndYoungAdultBooks/>} />
            <Route path='/higher-education' element={<HigherEducation/>} />
            <Route path='/test-prep' element={<TestPrep/>} />
            <Route path='/games-puzzles' element={<GamesPuzzles/>} />            
            <Route path='/cart' element={<Order/>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  )
}

export default App
