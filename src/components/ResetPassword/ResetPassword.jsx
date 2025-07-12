import React, { useEffect, useState } from 'react'
import style from './ResetPassword.module.css'
import axios from 'axios'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import { Helmet } from 'react-helmet-async'

export default function ResetPassword() {
  let [Loding , setLoding] = useState(false)
    let navigate = useNavigate()
    let shecma = Yup.object().shape({
            newPassword: Yup.string().required('Pass is Req').matches(/^[A-Z][a-z0-9]{4,10}$/, "Invallid Pass"),
        })
    function resetPass (val) {
      
      const newPassword = val.newPassword;
      setLoding(true)
      axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , {
        email : localStorage.getItem('email') ,
        newPassword : newPassword
      }).then(({data})=>{
        navigate('/login')
        setLoding(false)
      }).catch((error)=>{
        console.log(error)
        setLoding(false)
      })

     
    }
    let formik = useFormik({
      initialValues: {
        newPassword : "",
      } , 
      validationSchema: shecma,
      onSubmit : resetPass
    })

  return <>
  <Helmet>
    <title>Reset Password</title>
  </Helmet>
  {Loding ? <Spinner/> : <div className="flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="bg-white shadow-md rounded-md p-6">
                       <div className='text-center my-5'>
                    <i className="fa-regular fa-face-smile text-center text-green-500 text-6xl"></i>
                    </div>
                    <h2 className="my-5 text-center text-3xl font-bold tracking-tight text-green-500">
                        Sign up for an account
                    </h2>
  <form onSubmit={formik.handleSubmit} className=" px-4 py-6">
    <div className="flex justify-center gap-2 mb-6">
      <input value={formik.values.newPassword} onBlur={formik.handleBlur} onChange={formik.handleChange}  name='newPassword' className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" type="password" inputMode="numeric"/>
    </div>
      {formik.errors.newPassword && formik.touched.newPassword ? (
  <div className="bg-red-100 rounded-lg py-5 px-6 my-4 text-base text-red-700" role="alert">
    {formik.errors.newPassword}
  </div>
) : null}

    <div className="flex items-center justify-center flex-col">
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Submit
      </button>

    </div>
  </form>
 </div>
                </div>
            </div> }
   


  </>
}
