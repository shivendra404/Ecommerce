import { LogOut, Menu } from 'lucide-react'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '@/store/authSlice';
import { BellIcon } from '@heroicons/react/24/outline';


function AdminHeader({ setOpen }) {


    const dispatch = useDispatch()
    const handleLogout = () => {
        console.log("hii");
        dispatch(logoutUser())
    };


    return (
        <header className="flex  px-6 py-4 bg-background bg-white border-b shadow-sm">
            {/* Left Side - Menu Button */}
            <button
                onClick={() => setOpen(true)}
                className="lg:hidden p-2 rounded-full hover:bg-accent/10 transition-colors"
            >
                <Menu className="w-6 h-6 text-foreground" />
                <span className="sr-only">Toggle navigation menu</span>
            </button>

            {/* Right Side - Admin Controls */}
            <div className="flex items-center gap-4">
                {/* Language Selector */}
                <button className="p-2 text-foreground hover:text-primary rounded-full transition-colors relative">
                    <span className="text-2xl">🇺🇸</span>
                    <span className="sr-only">Change language</span>
                </button>

                {/* Notifications */}
                <button className="p-2 text-foreground hover:text-primary rounded-full transition-colors relative">
                    <BellIcon className="w-5 h-5 text-gray-600 hover:text-primary" />
                    <span className="sr-only">Notifications</span>
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                        3
                    </span>
                </button>

                {/* Admin Profile */}
                <div className="flex items-center gap-2">
                    <img
                        src="https://i.pinimg.com/474x/e7/57/dd/e757ddb889de99ba3655a0f7011a57ca.jpg"
                        alt="Admin profile"
                        className="w-8 h-8 rounded-full object-cover border-2 border-primary"
                    />
                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-foreground">admin@example.com</p>
                    </div>
                </div>

                {/* Logout Button (kept in original position) */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-foreground hover:text-primary rounded-md transition-colors hover:bg-primary/10"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </header>
    )
}

export default AdminHeader
