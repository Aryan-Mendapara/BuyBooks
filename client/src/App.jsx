import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Component/Login/Login'
import Home from './Component/Pages/Home'
import Layout from './Component/Utils/Layout'
import NewArrivalsImg from './Component/Pages/NewArrivals/NewArrivalsImg'
import BestSellerImg from './Component/Pages/BestSellers/BestSellerImg'
import AddBooks from './Component/data/AddBooks'
import SchoolBooksImg from './Component/Pages/SchoolBooks/SchoolBooksImg'
import FictionNonFictionBooksImg from './Component/Pages/FictionNonFiction/FictionNonFictionBooksImg.jsx'
import PreOrder from './Component/Pages/PreOrder/PreOrder.jsx'
import ChildrenAndYoungAdultBooks from './Component/Pages/ChildrenAndYoungAdultBooks/ChildrenAndYoungAdultBooks.jsx'
import HigherEducation from './Component/Pages/HigherEducation/HigherEducation.jsx'
import TestPrep from './Component/Pages/TestPrep/TestPrep.jsx'
import GamesPuzzles from './Component/Pages/GamesPuzzles/GamesPuzzles.jsx'
import WishList from './Component/WishList/WishList.jsx'
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
