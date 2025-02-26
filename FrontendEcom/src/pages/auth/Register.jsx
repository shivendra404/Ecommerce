import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CommonForm from '../../components/commonAuth/Form'
import { registerFormControls } from '../../config/index.js'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../store/authSlice/index.js'
import { toast } from 'sonner'
import { Input } from '../../components/ui/input'
import axios from 'axios'



function Register() {

    const initailState = {
        userName: '',
        email: '',
        password: '',
    }

    const [formData, setFormData] = React.useState(initailState)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState("user")

    // console.log(formData);
    async function onSubmit(e) {
        e.preventDefault();

        if (user === "admin") {
            console.log(user);
            console.log(formData);

            const res = await axios.post("http://localhost:9000/api/v1/admin/register", formData)
          
            console.log(res.data);


            if (res?.data?.success) {
                toast(res?.data?.message, {
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                    style: {
                        backgroundColor: '#4CAF50',
                        color: '#FFFFFF'
                    },
                });
                // console.log("from register page", data);
                navigate('/auth/login');
            }


        }
        else {
            console.log("user");
            console.log(formData);
            dispatch(registerUser(formData)).then((data) => {
                if (data?.payload?.success) {
                    // console.log("from if part register", data.payload);

                    toast("User successfully Register", {
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                        style: {
                            backgroundColor: '#4CAF50',
                            color: '#FFFFFF'
                        },
                    });
                    // console.log("from register page", data);
                    navigate('/auth/login');
                }
                else {
                    // console.log("from else part register", data.payload);

                }

            })


        }


    }

    const handleAdminCode = (e) => {
        const { name, value } = e.target
        console.log(name, value);
        setFormData((prevData) => ({ ...prevData, [name]: value }))

    }

    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new account</h1>
                <p>Already have an account
                    <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/login">Login</Link>
                </p>
            </div>
            <div className="mb-6">
                <div className="flex gap-5">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="role"
                            value="admin"
                            onChange={() => { setUser("admin") }}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">Admin</span>
                    </label>

                    <label className="flex items-center mt-0 pt-0 gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="role"
                            value="user"
                            checked={user === 'user'}
                            onChange={() => { setUser("user") }}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">User</span>
                    </label>
                </div>
            </div>
            {user == "admin" ?
                <div>
                    Admin code
                    <Input name="code" onChange={handleAdminCode} />
                </div> :
                <></>}
            <CommonForm
                formControls={registerFormControls}
                butttonText={"Sign Up"}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            ></CommonForm>

        </div >
    )
}

export default Register
