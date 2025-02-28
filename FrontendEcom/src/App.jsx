import React, { useEffect } from 'react'
import AuthLayout from './components/auth/Layout.jsx'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminDashboard from './pages/admin-view/Dashboard.jsx'
import AdminLayout from './components/admin-view/Layout.jsx'
import AdminProducts from './pages/admin-view/Products.jsx'
import AdminOrders from './pages/admin-view/Orders.jsx'
import AdminFeatures from './pages/admin-view/Features.jsx'
import ShoppingLayout from './components/shopping-view/Layout.jsx'
import ShoppingHome from './pages/shopping-view/Home.jsx'
import ShoppingAccount from './pages/shopping-view/Account.jsx'
import CheckAuth from './components/commonAuth/CheckAuth.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/authSlice/index.js'
import Brand from './pages/admin-view/Brand.jsx'
import Category from './pages/admin-view/Category.jsx'
import About from './pages/shopping-view/About.jsx'
import Contact from './pages/shopping-view/Contact.jsx'
import Product from './pages/shopping-view/Product.jsx'
import ProductDescCard from './components/shopping-view/ProductDescCard.jsx'
import { getWishListCount } from './store/wishListSlice/index.js'
import { getAddToCartCount } from './store/addToCartSlice/index.js'
import Order from './pages/shopping-view/Order.jsx'
import AddToCart from './pages/shopping-view/AddToCart.jsx'
import WishList from './pages/shopping-view/WishList.jsx'


const App = () => {

  // const data = useSelector(state => state.auth)
  // console.log(data);

  const { user, isAuthenticate, isLoading } = useSelector(state => state.auth)

  // console.log(userData, "from app.jsx");

  // console.log("isAuthenticate", isAuthenticate);
  // const user = data.user
  // console.log("user,", user);


  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isAuthenticate, "1");

    // console.log('isAuthenticate jjjjjjjjjjjjj', isAuthenticate);
    dispatch(checkAuth()).then((data) => {
      console.log("response first app", data);
    })
    console.log(isAuthenticate, "2")
    if (isAuthenticate) {
      dispatch(getWishListCount())
      dispatch(getAddToCartCount())
    }

  }, [dispatch, isAuthenticate])



  if (isLoading && !isAuthenticate) return <h1>Loading...</h1>;

  return (
    <div>
      <div className='flex flex-col overFlow-hidden bg-white'>

        {/* <h1>Header component</h1> */}
        <Routes>
          <Route path='/auth' element={
            <CheckAuth isAuthenticated={isAuthenticate} user={user}>
              <AuthLayout />
            </CheckAuth>}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
          <Route path='/admin' element={
            <CheckAuth
              isAuthenticated={isAuthenticate}
              user={user}>
              <AdminLayout />
            </CheckAuth>}>
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route path='products' element={<AdminProducts />} />
            <Route path='orders' element={<AdminOrders />} />
            <Route path='brands' element={<Brand />} />
            <Route path='category' element={<Category />} />
            <Route path='features' element={<AdminFeatures />} />
          </Route>
          <Route path='' element={<ShoppingLayout />}>
            <Route path='' element={<ShoppingHome />} />
            <Route path='products' element={<Product />} />
            <Route path='serachedroducts' element={<Product />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />
            <Route path='product/:id' element={<ProductDescCard />} />
            <Route path='wishlists' element={
              <CheckAuth isAuthenticated={isAuthenticate} user={user}>
                <WishList />
              </CheckAuth >
            } />
            <Route path='addtocarts' element={
              <CheckAuth isAuthenticated={isAuthenticate} user={user}>
                <AddToCart />
              </CheckAuth >
            } />
            <Route path='orders' element={
              <CheckAuth isAuthenticated={isAuthenticate} user={user}>
                <Order />
              </CheckAuth >
            } />
          </Route>


          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </div >
    </div >
  )
}

export default App
