import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './Sidebar'
import AdminHeader from './Header'


function AdminLayout() {

    const [openSidebar, setOpenSidebar] = useState(false);




    return (

        <div className='flex min-h-screen w-full'>
            {/* Admin Sidebar */}
            <div className='flex-shrink-0 h-screen sticky top-0'>
                <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
            </div>
            <div className='flex flex-1 flex-col'>
                {/* Admin Header */}
                <div className='h-16 sticky top-0 bg-white z-10'> {/* Fixed height for the header */}
                    <AdminHeader setOpen={setOpenSidebar} />
                </div>
                <main className='flex-1 flex bg-muted/40 p-4 md:p-6 '>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
