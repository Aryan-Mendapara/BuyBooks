import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Component/Login/Login'
import Home from './Component/Pages/Home'
import Layout from './Component/Utils/Layout'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>            
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  )
}

export default App
