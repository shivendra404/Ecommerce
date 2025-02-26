import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'

function ShoppingLayout() {
    return (
        <div className='flex flex-col bg-white'>
            {/* Sticky Header */}
            <div className='sticky top-0 z-50'>
                <Header />
            </div>

            {/* Main Content */}
            <main className='flex flex-col w-full mt-[20px]'> {/* Adjust margin-top based on header height */}
                <Outlet />
            </main>
        </div>
    )
}

export default ShoppingLayout
