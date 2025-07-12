import React, { useEffect, useState } from 'react'
import style from './ResetCode.module.css'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Spinner from '../Spinner/Spinner'
import { Helmet } from 'react-helmet-async'

export default function ResetCode() {
  let [Loding , setLoding] = useState(false)
    let navigate = useNavigate()
    
    function verifyResetCode (val) {
      
      const resetcode = val.input1 + val.input2 + val.input3 + val.input4 + val.input5 + val.input6;
      setLoding(true)
      axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , {
        resetCode : resetcode
      }).then(({data})=>{
        
        if(data.status === "Success") {
          navigate('/resetpassword')
        }
        setLoding(false)
      }).catch((error)=>{
        console.log(error)
        setLoding(false)
      })

     
    }
    let formik = useFormik({
      initialValues: {
        input1 : "",
        input2 : "",
        input3 : "",
        input4 : "",
        input5 : "",
        input6 : "",
      } , 
      onSubmit : verifyResetCode
    })

     function forgotPassword() {
        if(localStorage.getItem('email')) {

            axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
                {
                email : localStorage.getItem('email')
            }).then(({data})=>{
                toast.success(data?.message , {
                    duration : 3000,
                    position : 'bottom-right'
                })
            }).catch((error)=>{
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
    <title>Reset Code</title>
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
      <input value={formik.values.input1} onChange={formik.handleChange} name='input1' className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500" type="text" maxLength={1} pattern="[0-9]" inputMode="numeric" autoComplete="one-time-code"  />
      <input value={formik.values.input2} onChange={formik.handleChange} name='input2' className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500" type="text" maxLength={1} pattern="[0-9]" inputMode="numeric" autoComplete="one-time-code"  />
      <input value={formik.values.input3} onChange={formik.handleChange} name='input3' className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500" type="text" maxLength={1} pattern="[0-9]" inputMode="numeric" autoComplete="one-time-code"  />
      <input value={formik.values.input4} onChange={formik.handleChange} name='input4' className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500" type="text" maxLength={1} pattern="[0-9]" inputMode="numeric" autoComplete="one-time-code"  />
      <input value={formik.values.input5} onChange={formik.handleChange} name='input5' className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500" type="text" maxLength={1} pattern="[0-9]" inputMode="numeric" autoComplete="one-time-code"  />
      <input value={formik.values.input6} onChange={formik.handleChange} name='input6' className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500" type="text" maxLength={1} pattern="[0-9]" inputMode="numeric" autoComplete="one-time-code"  />
    </div>
    <div className="flex items-center justify-center flex-col">
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Verify
      </button>
      <a onClick={forgotPassword} className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800 mt-5" href="#">
        Resend OTP
      </a>
    </div>
  </form>
 </div>
                </div>
            </div> }
    


  </>
}
