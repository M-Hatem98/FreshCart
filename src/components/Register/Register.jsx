import React, { useContext, useState } from "react";
import { Formik, useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { userContext } from "../Context/userContext";
import { Helmet } from 'react-helmet-async';
export default function Register() {
   let {setloggedIn} =  useContext(userContext)
    let shecma = Yup.object().shape({
        name: Yup.string().required("Name is Req").min(3, "min 3 letters").max(20, "max 20 letters"),
        email: Yup.string().required("Email is Req").email("Invalid Mail"),
        password: Yup.string().required("Pass is Req").matches(/^[A-Z][a-z0-9]{4,10}$/, "Invallid Pass"),
        rePassword: Yup.string().required("rePassword is Req").oneOf([Yup.ref("password")], "Invalid Repassword"),
        phone: Yup.string().required("Phone is Req").matches(/^01[0125][0-9]{8}$/, "Invalid phone"),
    });
    let navigate = useNavigate()
    const [errMsg , seterrMsg] = useState(null)
    const [isLoding , setisLoding] = useState(false)
     function submitForm(val) {
        setisLoding(true)
            // kotys@mailinator.com
     axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,val).then(({data})=>{
            if(data.message === "success") {
                setloggedIn(data?.token)
                navigate('/')
                localStorage.setItem('userToken' , data?.token)
            }
            setisLoding(false)
        }).catch((error)=>{
            seterrMsg(error?.response?.data?.errors?.msg)
            setisLoding(false)
        })
    }
    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
        validationSchema: shecma,
        onSubmit: submitForm,
    });

    return (
        <>
        <Helmet>
        <title>Register</title>
        </Helmet>
            <div className="flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="bg-white shadow-md rounded-md p-6">
                       <div className='text-center my-5'>
                    <i className="fa-regular fa-face-smile text-center text-green-500 text-6xl"></i>
                    </div>
                    <h2 className="my-5 text-center text-3xl font-bold tracking-tight text-green-500">
                        Sign up for an account
                    </h2>
                        <form onSubmit={formik.handleSubmit} className="space-y-6" method="POST">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={formik.values.name}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                                    />
                                </div>

                                {formik.errors.name && formik.touched.name ? (
                                    <div className="bg-red-100 rounded-lg py-5 px-6 my-4 text-base text-red-700" role="alert" >
                                        {formik.errors.name}
                                    </div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700" >
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={formik.values.email}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email-address"
                                        required
                                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                                    />
                                </div>
                                {formik.errors.email && formik.touched.email ? (
                                    <div className="bg-red-100 rounded-lg py-5 px-6 my-4 text-base text-red-700" role="alert" >
                                        {formik.errors.email}
                                    </div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700" >
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={formik.values.password}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="password"
                                        required
                                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                                    />
                                </div>
                                {formik.errors.password && formik.touched.password ? (
                                    <div className="bg-red-100 rounded-lg py-5 px-6 my-4 text-base text-red-700" role="alert" >
                                        {formik.errors.password}
                                    </div>
                                ) : null}
                            </div>
                            <div>
                                <label  htmlFor="rePassword" className="block text-sm font-medium text-gray-700" >
                                    Confirm Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={formik.values.rePassword}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        id="rePassword"
                                        name="rePassword"
                                        type="Password"
                                        autoComplete="confirm-password"
                                        required
                                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                                    />
                                </div>
                                {formik.errors.rePassword && formik.touched.rePassword ? (
                                    <div className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700" role="alert" >
                                        {formik.errors.rePassword}
                                    </div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700" >
                                    Phone
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={formik.values.phone}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        autoComplete="Phone"
                                        required
                                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                                    />
                                </div>
                                {formik.errors.phone && formik.touched.phone ? (
                                    <div className="bg-red-100 rounded-lg py-5 px-6 my-4 text-base text-red-700" role="alert" >
                                        {formik.errors.phone}
                                    </div>
                                ) : null}
                            </div>
                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md border border-transparent bg-green-500 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" >
                                  {isLoding ? <i className="fas fa-spinner fa-spin"></i> : 'Register Account'}   
                                </button>
                            </div>
                                {errMsg ? <div className="bg-red-100 rounded-lg py-5 px-6 my-4 text-base text-red-700" role="alert" >
                                        {errMsg}
                                    </div> : null }


                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
