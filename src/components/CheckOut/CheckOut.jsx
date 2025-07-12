import React, { useContext, useEffect, useState } from 'react'
import style from './CheckOut.module.css'
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function CheckOut() {
    const [isOnline , setisOnline] = useState(true)
    let {cartId , resetCart} = useContext(CartContext)
    let navigate = useNavigate()
    useEffect(()=>{

    },[])
    function payOnline(val){
  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,{
    shippingAddress : val
  },{
    headers : {
      token : localStorage.getItem('userToken')
    }
  }).then((response)=>{
    
    if(response?.data?.status === 'success') {
     window.location.href=response?.data?.session?.url
      resetCart()
    }else {
      toast.error('error...' , {
        duration : 3000,
        position : 'bottom-right'
      })
    }
    
  }).catch((error)=>{
    console.log(error);
    
  })
  
}
function payCash(val){
  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
    shippingAddress : val
  },{
    headers : {
      token : localStorage.getItem('userToken')
    }
  }).then((response)=>{
    if(response?.data?.status === 'success') {
      toast.success('Your Order Done' , {
        duration : 3000,
        position : 'bottom-right'
      })
      navigate('/allorders')
      resetCart()
    }else {
      toast.error('error...' , {
        duration : 3000,
        position : 'bottom-right'
      })
    }
    
  }).catch((error)=>{
    console.log(error);
    
  })
  
}

function detectPayment(val){
  if(isOnline) {
    payOnline(val)
  } else {
    payCash(val)
  }
}
      let formik = useFormik({
            initialValues: {
                details: '',
                phone: '',
                city: '',
            },
            onSubmit: detectPayment
        })
  return <>
  <Helmet>
    <title>Check Out</title>
  </Helmet>
   <div className="flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="bg-white shadow-md rounded-md p-6">
                    <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="Face" />
                    <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Check Out
                    </h2>
                    <form onSubmit={formik.handleSubmit} className="space-y-6" method="POST">

                        <div>
                            <label htmlFor="details" className="block text-sm font-medium text-gray-700">Details</label>
                            <div className="mt-1">
                                <input value={formik.values.details} onChange={formik.handleChange} id='details' name="details" type="text" autoComplete="details" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                            </div>
                        </div>


                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                            <div className="mt-1">
                                <input value={formik.values.phone}  onChange={formik.handleChange} id='phone' name="phone" type="tel" autoComplete="phone" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                            </div>                         
                        </div>


                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                            <div className="mt-1">
                                <input value={formik.values.city}  onChange={formik.handleChange} id='city' name="city" type="text" autoComplete="city" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                            </div>                         
                        </div>

                        <div>
                            <button onClick={()=>{setisOnline(false)}} type="submit" className="flex w-full justify-center rounded-md border border-transparent bg-green-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2" >
                                  Pay Cash  
                                </button>
                        </div>
                        <div>
                            <button onClick={()=>{setisOnline(true)}} type="submit" className="flex w-full justify-center rounded-md border border-transparent bg-green-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2" >
                                  Pay Online  
                                </button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>

  </>
}
