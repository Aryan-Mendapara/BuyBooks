import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function Layout({ children }) {
    return (
        <div className='flex flex-col min-h-screen'>
            <div>
                <Header />
            </div>
            <div>
                <main className='w-full'>
                    {children}
                </main>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Layout   