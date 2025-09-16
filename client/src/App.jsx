import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Component/Login/Login'
import Home from './Component/Pages/Home'
import Layout from './Component/Utils/Layout'
import NewArrivalsImg from './Component/Pages/NewArrivals/NewArrivalsImg'
import BestSellerImg from './Component/Pages/BestSellers/BestSellerImg'
import SchoolBooksImg from './Component/Pages/SchoolBooks/SchoolBooksImg'
import FictionNonFictionBooksImg from './Component/Pages/FictionNonFiction/FictionNonFictionBooksImg.jsx'
import PreOrder from './Component/Pages/PreOrder/PreOrder.jsx'
import ChildrenAndYoungAdultBooks from './Component/Pages/ChildrenAndYoungAdultBooks/ChildrenAndYoungAdultBooks.jsx'
import HigherEducation from './Component/Pages/HigherEducation/HigherEducation.jsx'
import TestPrep from './Component/Pages/TestPrep/TestPrep.jsx'
import GamesPuzzles from './Component/Pages/GamesPuzzles/GamesPuzzles.jsx'
import WishList from './Component/WishList/WishList.jsx'
import BillingDetails from './Component/BillingDetails/BillingDetails'
import Account from './Component/Account/Account.jsx'
import ShippingAddress from './Component/Shipping/ShippingAddress/ShippingAddress.jsx'
import OrderSummary from './Component/Shipping/OrderSummary/OrderSummary.jsx'
import TermsAndConditions from './Component/Shipping/TermsAndConditions/TermsAndConditions.jsx'
import ImgInfo from './Component/ImgInfo/ImgInfo.jsx'
import Payment from './Component/Shipping/Payment/Payment.jsx'
import Add_EditBooks from './Component/Add&EditBooks/Add&EditBooks.jsx'
import NetBanking from './Component/Shipping/Payment/OptionPayment/NetBanking.jsx'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>            
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/newarrivalsimg' element={<NewArrivalsImg />} />
            <Route path='/bestsellersimg' element={<BestSellerImg />} />
            <Route path='/schoolbooksimg' element={<SchoolBooksImg />} />
            <Route path='/addImages' element={<Add_EditBooks />} />
            <Route path='/editbook/:id' element={<Add_EditBooks />} />
            <Route path='/fiction-non-fiction-booksimg' element={<FictionNonFictionBooksImg />} />
            <Route path='/pre-order' element={<PreOrder />} />
            <Route path='/children-young-adult' element={<ChildrenAndYoungAdultBooks />} />
            <Route path='/higher-education' element={<HigherEducation />} />
            <Route path='/test-prep' element={<TestPrep />} />
            <Route path='/games-puzzles' element={<GamesPuzzles />} />            
            <Route path='/billing-details' element={<BillingDetails />} />
            <Route path='/wishlist' element={<WishList />} />
            <Route path='/addtocart/:id' element={<ImgInfo />} />
            <Route path='/my-account' element={<Account />} />
            <Route path='/shipping-address' element={<ShippingAddress />} />
            <Route path='/order-summary' element={<OrderSummary />} />
            <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/payment/net-banking' element={<NetBanking />}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  )
}

export default App
