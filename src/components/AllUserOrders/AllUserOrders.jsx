import React, { useContext, useEffect, useState } from 'react'
import style from './AllUserOrders.module.css'
import { CartContext } from '../Context/CartContext'
import Spinner from '../Spinner/Spinner'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
import { Helmet } from 'react-helmet-async'




export default function AllUserOrders() {
  const token = localStorage.getItem("userToken"); 
  
  let userId = null;
  if (token) {
    const decoded = jwtDecode(token); // ✅ Correct usage
    userId = decoded._id || decoded.id;
  }
  const [allProducts , setallProducts] = useState(null)
    let {cartId} = useContext(CartContext)
    
      function getAllProducts(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    .then(({data})=>{
      setallProducts(data)
      
    }).catch((error)=>{
      console.log(error);
      
    })
  }
  
  useEffect(()=>{
    getAllProducts()
    },[userId])
  return <>
<Helmet>
      <title>My Orders</title>
    </Helmet>
{allProducts?.length > 0 ? (
  <div className="space-y-8">
    <h1 className='text-3xl text-green-500 font-bold mt-8'>Check Your Orders</h1>
    {allProducts.map((order) => (
      <div key={order._id} className="bg-white shadow-md rounded-lg p-6">
        {/* Order Summary Header */}
        <div className="mb-4 border-b pb-4">
          <h2 className="text-xl font-semibold text-green-600">
            Order ID: <span className="text-gray-800">{order._id}</span>
          </h2>
          <p className="text-sm text-gray-500">
            Date: {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">
            Payment: <span className="capitalize">{order.paymentMethodType}</span>
          </p>
          <p className="text-sm text-gray-500">
            Shipping: {order.shippingAddress?.city}, {order.shippingAddress?.details}
          </p>
          <p className="text-sm font-medium mt-1">
            Total: <span className="text-black">{order.totalOrderPrice} EGP</span>
          </p>
        </div>

        {/* Products Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {order.cartItems.map((item, index) => (
            <div key={item._id || index} className="border rounded-lg p-4 hover:shadow transition">
              <img
                src={item?.product?.imageCover}
                alt={item?.product?.title}
                className="w-full h-40 object-cover rounded"
              />
              <div className="mt-3">
                <p className="text-gray-500 text-sm">{item?.product?.category?.name}</p>
                <h3 className="text-md font-semibold truncate text-green-600">
                  {item?.product?.title}
                </h3>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span>{item?.price} EGP</span>
                  <span className="flex items-center gap-1">
                    <i className="fas fa-star text-yellow-400 text-xs"></i>
                    {item?.product?.ratingsAverage || 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div> */}
        <div className="flex flex-wrap gap-y-3">
      {order.cartItems.map((item, index) => (
        <div key={item._id || index} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6">
          <div className="product py-5 px-3 shadow rounded-md m-3">
            <img
              src={item?.product?.imageCover}
              className="w-100"
              alt={item?.product?.title?.split(" ").slice(0, 2).join(" ")}
            />
            <span className="text-gray-600">{item?.product?.category?.name}</span>
            <h3 className="text-xl font-medium text-green-500 text-ellipsis overflow-hidden whitespace-nowrap">
              {item?.product?.title?.split(" ").slice(0, 2).join(" ")}
            </h3>
            <div className="flex justify-between">
              <span>{item?.price} EGP</span>
              <span>
                <i className="fas fa-star text-yellow-400"></i>{" "}
                {item?.product?.ratingsAverage}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
      </div>
    ))}
  </div>
) : (
  <Spinner />
)}

 
  </>
}
