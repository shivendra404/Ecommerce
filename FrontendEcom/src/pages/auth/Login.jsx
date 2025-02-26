import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import CommonForm from '../../components/commonAuth/Form'
import { loginFormControls } from '../../config/index.js'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../store/authSlice/index.js'
import { toast } from "sonner"
import { fetchWishItems } from '@/store/wishListSlice'
import { fetchOrderItems } from '@/store/orderSlice'
import { fetchCartItems } from '@/store/addToCartSlice'



function Login() {
    const initailState = {
        email: '',
        password: '',
    }

    const [formData, setFormData] = React.useState(initailState)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();


    function onSubmit(e) {
        e.preventDefault()
        dispatch(loginUser(formData)).then((res) => {

            if (res?.payload?.success) {
                // console.log(res.payload);
                toast("User successfully logged In", {
                    action: {
                        label: "",
                        onClick: () => console.log("Undo"),
                    },
                    style: {
                        backgroundColor: 'rgba(130, 136, 130, 0.8)', // Light green with transparency
                        color: '#FFFFFF'
                    },
                });

                //if user is not login then first login after that according to fetch data from backed 
                if (location.state?.from === "/wishlists") {
                    dispatch(fetchWishItems())
                }
                if (location.state?.from === "/orders") {
                    dispatch(fetchOrderItems())
                }
                if (location.state?.from === "/addtocarts") {
                    dispatch(fetchCartItems())
                }

                //After fetching data redirect to thhat route
                const returnTo = res?.payload?.data?.role === "admin" ? "/admin/dashboard" : location.state?.from || "/"
                navigate(returnTo)

            }
            else {
                toast("User failed to loggin", {
                    action: {
                        label: "Retry",
                        onClick: () => console.log("Retry"),
                    },
                    style: {
                        backgroundColor: 'rgba(244, 67, 54, 0.8)', // Red with transparency
                        color: '#FFFFFF'
                    },
                });
            }
        })


    }



    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sing in to your account</h1>
                <p>Don't have an account
                    <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/register">Register</Link>
                </p>
            </div>


            <CommonForm
                formControls={loginFormControls}
                butttonText={"Sign In"}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            ></CommonForm>
        </div >
    )
}

export default Login
