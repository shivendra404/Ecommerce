import React, { useEffect, useState } from 'react';
import {
  EnvelopeIcon,
  PhoneArrowDownLeftIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingBagIcon,
  ArchiveBoxIcon,
  UserIcon
} from '@heroicons/react/24/outline';



import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, LogOut } from 'lucide-react'
import { logoutUser } from '@/store/authSlice';
import { fetchWishItems } from '@/store/wishListSlice';
import { fetchCartItems } from '@/store/addToCartSlice';
import { fetchOrderItems } from '@/store/orderSlice';

const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [serachQuery, setSearchQuery] = useState("")

  const { isAuthenticate } = useSelector(state => state.auth)
  const [activeIcon, setActiveIcon] = useState(0) //making solid wishlist addtocard and order icon in header


  const handleLogout = () => {
    // console.log("hii");
    dispatch(logoutUser())
  };





  useEffect(() => {
    // console.log(location.pathname);
    if (location.pathname == "/orders") {
      setActiveIcon(3)
    }
    else if (location.pathname == "/wishlists") {
      setActiveIcon(1)
    }
    else if (location.pathname == "/addtocarts") {
      setActiveIcon(2)
    }
    else {
      setActiveIcon(0)
    }
  }, [location.pathname])



  const { wishListCount } = useSelector(state => state.wishList)
  const { addToCartCount } = useSelector(state => state.addToCart)

  function showWishList() {

    if (!isAuthenticate) {
      navigate('/auth/login', {
        state: {
          from: "/wishlists",
        },
        replace: true
      });
      return;
    }
    else {
      dispatch(fetchWishItems())
      navigate("/wishlists",)
    }
  }


  function showAddToCart() {
    if (!isAuthenticate) {
      navigate('/auth/login', {
        state: {
          from: "/addtocarts",
        },
        replace: true
      });
      return;
    }
    else {
      dispatch(fetchCartItems())
      navigate("/addtocarts",)
    }
  }


  function showOrders() {
    if (!isAuthenticate) {
      navigate('/auth/login', {
        state: {
          from: "/orders",
        },
        replace: true
      });
      return;
    } else {
      dispatch(fetchOrderItems())
      navigate("/orders",)
    }

  }


  function handleLogin() {
    if (!isAuthenticate) {
      navigate('/auth/login', {
        state: {
          from: location.pathname, // Current page path
        },
        replace: true
      });
      return;
    }
  }

  function handleRegister() {
    if (!isAuthenticate) {
      navigate('/auth/register', {
        state: {
          from: location.pathname, // Current page path
        },
        replace: true
      });
      return;
    }
  }


  function handleSarchQuery(e) {
    if (e.key === 'Enter') {

      console.log(serachQuery);
    }

  }


  return (
    <>
      {/* Upper Header */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 flex items-center justify-between">

            <div className="flex items-center space-x-4">
              <span className="text-xl font-bold text-gray-900">LUMINÈ</span>
              <div className="hidden md:flex items-center space-x-2 text-gray-600">
              </div>
            </div>


            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  onChange={(e) => { setSearchQuery(e.target.value) }}
                  onKeyDown={handleSarchQuery}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Right Side - Icons */}
            <div className="flex items-center space-x-4">

              <button className="p-1 relative text-gray-600 hover:text-emerald-600">
                {activeIcon != 1 ?
                  <HeartIcon onClick={showWishList} className="h-5 w-5" /> :
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                    <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
                  </svg>
                }
                {!isAuthenticate || wishListCount == 0 || wishListCount == null ?
                  <span></span> :
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {wishListCount}
                  </span>}
              </button>

              <button className="p-1 relative text-gray-600 hover:text-emerald-600">
                {activeIcon != 2 ?
                  <ArchiveBoxIcon onClick={showAddToCart} className="h-5 w-5" /> :
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                    <path d="M2 3a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2Z" />
                    <path fillRule="evenodd" d="M2 7.5h16l-.811 7.71a2 2 0 0 1-1.99 1.79H4.802a2 2 0 0 1-1.99-1.79L2 7.5ZM7 11a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z" clipRule="evenodd" />
                  </svg>
                }
                {!isAuthenticate || addToCartCount == 0 ? <span></span> : <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {addToCartCount}
                </span>}
              </button>

              <button className="p-1 relative text-gray-600 hover:text-emerald-600">
                {activeIcon != 3 ?
                  <ShoppingBagIcon onClick={showOrders} className="h-5 w-5" /> :
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                    <path fillRule="evenodd" d="M6 5v1H4.667a1.75 1.75 0 0 0-1.743 1.598l-.826 9.5A1.75 1.75 0 0 0 3.84 19H16.16a1.75 1.75 0 0 0 1.743-1.902l-.826-9.5A1.75 1.75 0 0 0 15.333 6H14V5a4 4 0 0 0-8 0Zm4-2.5A2.5 2.5 0 0 0 7.5 5v1h5V5A2.5 2.5 0 0 0 10 2.5ZM7.5 10a2.5 2.5 0 0 0 5 0V8.75a.75.75 0 0 1 1.5 0V10a4 4 0 0 1-8 0V8.75a.75.75 0 0 1 1.5 0V10Z" clipRule="evenodd" />
                  </svg>
                }
                {/* {!isAuthenticate || <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  3
                </span>} */}
              </button>
              {isAuthenticate ?
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-foreground hover:text-primary rounded-md transition-colors hover:bg-primary/10"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Logout</span>
                </button> :

                <div className="flex items-center">
                  <button
                    onClick={handleLogin}
                    className="flex items-center gap-1 px-4 py-2 text-foreground hover:text-primary rounded-md transition-colors hover:bg-primary/10"
                  >
                    <LogIn className="w-5 h-5" />
                    <span className="text-sm font-medium">Login</span>
                  </button>
                  <button
                    onClick={handleRegister}
                    className="flex items-center gap-1  py-2 text-foreground hover:text-primary rounded-md transition-colors hover:bg-primary/10"
                  >
                    <LogIn className="w-5 h-5" />
                    <span className="text-sm font-medium">Register</span>
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Lower Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <nav className="flex items-center space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) => {
                  const activeClass = isActive ? 'text-emerald-600 font-bold' : 'text-gray-700';
                  return `hover:text-emerald-600 transition-colors duration-300 relative group ${activeClass}`;
                }}
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) => {
                  const activeClass = isActive ? 'text-emerald-600 font-bold' : 'text-gray-700';
                  return `hover:text-emerald-600 transition-colors duration-300 relative group ${activeClass}`;
                }}
              >
                Products

              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) => {
                  const activeClass = isActive ? 'text-emerald-600 font-bold' : 'text-gray-700';
                  return `hover:text-emerald-600 transition-colors duration-300 relative group ${activeClass}`;
                }}
              >
                About

              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => {
                  const activeClass = isActive ? 'text-emerald-600 font-bold' : 'text-gray-700';
                  return `hover:text-emerald-600 transition-colors duration-300 relative group ${activeClass}`;
                }}
              >
                Contact

              </NavLink>
            </nav>

            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-2">
                <EnvelopeIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">info@fashionhub.com</span>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <PhoneArrowDownLeftIcon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </header >
    </>
  );
};

export default Header;