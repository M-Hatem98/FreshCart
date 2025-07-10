import React, { useContext, useState } from 'react'
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../Context/userContext';
import toast from 'react-hot-toast';
import Spinner from '../Spinner/Spinner';
import { Helmet } from 'react-helmet';

export default function Login() {
    let [Loding , setLoding] =  useState(false)
   let {setloggedIn}= useContext(userContext)
    let shecma = Yup.object().shape({
        email: Yup.string().required('Email is Req').email('Invalid Mail'),
        password: Yup.string().required('Pass is Req').matches(/^[A-Z][a-z0-9]{4,10}$/, 'Invallid Pass'),
    })


    const [errMsg , seterrMsg] = useState(null)
        const [isLoding , setisLoding] = useState(false)
        let navigate = useNavigate()
         function submitForm(val) {
            setisLoding(true)
           
         axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,val).then(({data})=>{
                if(data.message === "success") {
                    setloggedIn(data?.token)
                navigate('/')
                localStorage.setItem('userToken' , data?.token)
            }
                setisLoding(false)
            }).catch((error)=>{
                seterrMsg(error?.response?.data?.message)
                setisLoding(false)
            })
        }

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: shecma,
        onSubmit: submitForm
    })

    function forgotPassword() {
        if(formik.values.email) {
            setLoding(true)
            axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
                {
                email : formik.values.email
            }).then(({data})=>{
                localStorage.setItem('email' , formik.values.email)
                navigate('/resetcode')
                toast.success(data?.message , {
                    duration : 3000,
                    position : 'bottom-right'
                })
                setLoding(false)
            }).catch((error)=>{
                setLoding(false)
                console.log(error)
            })
        }
        else {
        toast.error('Please Enter Email' , {
            duration : 3000,
            position : 'bottom-right'
        })
    }
    }



    return <>
    <Helmet>
        <title>Login</title>
    </Helmet>
    {Loding ? <Spinner/> : <div className="flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="bg-white shadow-md rounded-md p-6">
                    {/* <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="Face" /> */}
                    <div className='text-center my-5'>
                    <i className="fa-regular fa-face-smile text-center text-green-500 text-6xl"></i>
                    </div>
                    <h2 className="my-5 text-center text-3xl font-bold tracking-tight text-green-500">
                        Sign up for an account
                    </h2>
                    <form onSubmit={formik.handleSubmit} className="space-y-6" method="POST">

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1">
                                <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} id='email' name="email" type="email" autoComplete="email-address" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                            </div>
                            {formik.errors.email && formik.touched.email ? <div className="bg-red-100 rounded-lg py-5 px-6 my-4 text-base text-red-700" role="alert">{formik.errors.email}
                            </div> : null}

                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1">
                                <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} id='password' name="password" type="password" autoComplete="password" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                            </div>
                            {formik.errors.password && formik.touched.password ? <div className="bg-red-100 rounded-lg py-5 px-6 my-4 text-base text-red-700" role="alert">{formik.errors.password}
                            </div> : null}
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md border border-transparent bg-green-500 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" >
                                  {isLoding ? <i className="fas fa-spinner fa-spin"></i> : 'login Account'}   
                                </button>
                        </div>
                        {errMsg ? <div className="bg-red-100 rounded-lg py-5 px-6 my-4 text-base text-red-700" role="alert" >
                                        {errMsg}
                                    </div> : null }
                    <a onClick={forgotPassword} href="#" className="text-sm text-sky-600 hover:text-gray-900">Reset your password</a>
                    </form>
                </div>
            </div>
        </div>} 
        
    </>
}
