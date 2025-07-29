import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Component/Login/Login'
import Home from './Component/Pages/Home'
import Layout from './Component/Utils/Layout'
import NewArrivalsImg from './Component/ViewMore/NewArrivalsImg'
import BestSellerImg from './Component/ViewMore/BestSellerImg'
import AddBooks from './Component/data/AddBooks'
import SchoolBooksImg from './Component/ViewMore/SchoolBooksImg'
import FictionNonFictionBooksImg from './Component/ViewMore/FictionNonFictionBooksImg'
import PreOrder from './Component/Pages/PreOrder'
import ChildrenAndYoungAdultBooks from './Component/Pages/ChildrenAndYoungAdultBooks'
import HigherEducation from './Component/Pages/HigherEducation'
import TestPrep from './Component/Pages/TestPrep'
import GamesPuzzles from './Component/Pages/GamesPuzzles'
import WishList from './Component/WishList/WishList'
import AddToCart from './Component/ImageDetails/ImagesInfo'
import BillingDetails from './Component/BillingDetails/BillingDetails'

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
            <Route path='/addImages' element={<AddBooks/>} />
            <Route path='fiction-non-fiction-booksimg' element={<FictionNonFictionBooksImg/>} />
            <Route path='/pre-order' element={<PreOrder/>} />
            <Route path='/children-young-adult' element={<ChildrenAndYoungAdultBooks/>} />
            <Route path='/higher-education' element={<HigherEducation/>} />
            <Route path='/test-prep' element={<TestPrep/>} />
            <Route path='/games-puzzles' element={<GamesPuzzles/>} />            
            <Route path='/billing-details' element={<BillingDetails/>} />
            <Route path='/wishlist' element={<WishList/>} />
            <Route path='/addtocart/:id' element={<AddToCart/>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  )
}

export default App
