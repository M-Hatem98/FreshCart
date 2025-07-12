import React, { useContext } from 'react'
import { CartContext } from '../Context/CartContext'
import Spinner from '../Spinner/Spinner'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
export default function Cart() {

  let {numOfCartItems , updateCartProduct , clearCart , deleteCartProduct , products , totalCartPrice , isCartLoading , isdeleted} =useContext(CartContext)
 
if (isCartLoading) {
  return <Spinner />;
}

if (!products || products.length == 0 ) {
  return (
    <div className='flex justify-center items-center h-screen'>
      {/* <h2 className='text-4xl text-green-500'>No Cart Items</h2> */}
      <div className="bg-white rounded-lg  p-6 text-center">
          <i className="fas fa-shopping-cart text-gray-300 text-9xl mb-4"></i>
          <p className="text-3xl text-gray-500">Your cart is empty</p>
          <Link
            to={'/'}
            className="inline-block bg-green-500 text-white px-6 py-2 mt-8 rounded-lg hover:bg-green-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
    </div>
     
  );
}
 
  async function handelUpdateProduct(productId , count){
    let response = await updateCartProduct(productId , count)
    
  }
  async function handeldeleteProduct(productId ){
    let response = await deleteCartProduct(productId)
    toast.success('Product Deleted Successfuly' , {
      duration : 3000 , 
      position : 'bottom-right'
    })
    
  }
  async function handelClearCart(){
    let response = await clearCart()
    
  }
  
 
 
 return <>
 <Helmet>
  <title>Cart</title>
 </Helmet>
 {isdeleted ? <Spinner /> :  <div className='my-10'>

      <div className="flex justify-between items-center mb-5">
        <div>
  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-500">Shopping Cart</h1>
        <h3 className=' text-xl my-3'>Total Price : {totalCartPrice} EGP</h3>
        </div>
  <div className="bg-green-500 text-white px-3 py-2 rounded-full flex items-center">
    <i className="fas fa-shopping-cart mr-2" />
    <span> {numOfCartItems} items</span>
  </div>
</div>

<div className="flex flex-col md:flex-row gap-5 ">

<div className="relative overflow-x-auto shadow-md sm:rounded-lg my-8 w-full md:w-2/3 lg:w-3/4">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {products?.map((prod)=>{return  <tr key={prod?.product?._id} className="bg-white border-b  border-gray-200 hover:bg-gray-50">
        <td className="p-4">
          <img src={prod?.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={prod?.product?.title} />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 ">
          {prod?.product?.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>{handelUpdateProduct(prod?.product?._id , prod.count-1)}} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <input type="number"  className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 " placeholder={prod.count} required />
            </div>
            <button onClick={()=>{handelUpdateProduct(prod?.product?._id , prod.count+1)}} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 ">
          {prod.price * prod.count}
        </td>
        <td className="px-6 py-4">
          <a  onClick={()=>{handeldeleteProduct(prod?.product?._id)}} className="cursor-pointer font-medium text-red-600 hover:underline">Remove</a>
        </td>
      </tr> })}
     

    </tbody>
  </table>

</div>
    <div className="w-full md:w-1/3 lg:w-1/4 my-8">
  <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 sticky top-4">
    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
    <div className="space-y-3 mb-4">
      <div className="flex justify-between">
        <span className="text-gray-600">Total Price</span>
        <span className="font-medium">{totalCartPrice} EGP</span>
      </div>
     
      <div x-show="discount > 0" className="flex justify-between text-green-600">
        <span>Discount</span>
        <span className="font-medium">0</span>
      </div>
      <div className="flex justify-between text-gray-600">
        <span>Tax</span>
        <span className="font-medium" >0</span>
      </div>
      <div className="border-t pt-3 mt-3">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{totalCartPrice} EGP</span>
        </div>
      </div>
    </div>
    <Link to={'/checkout'}>
    <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center" >
      <i className="fas fa-lock mr-2"></i>Proceed to Checkout
    </button>
    </Link>
    <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
      <i className="fas fa-shield-alt mr-2" /> Secure Checkout
    </div>
    <div className="flex justify-center space-x-2 mt-4">
      <i className="fab fa-cc-visa text-2xl text-blue-900" />
      <i className="fab fa-cc-mastercard text-2xl text-red-600" />
      <i className="fab fa-cc-amex text-2xl text-blue-500" />
      <i className="fab fa-cc-paypal text-2xl text-blue-700" />
    </div>
  </div>
</div>

</div> 
  <div x-show="cartItems.length > 0" className="flex flex-col sm:flex-row justify-between items-center gap-4">
       <Link to="{'/'}" className="flex items-center text-blue-600 hover:text-blue-800">

          <i className="fas fa-arrow-left mr-2"></i>
          Continue Shopping
        </Link>
        <button  onClick={handelClearCart} className="text-red-600 hover:text-red-800">
          <div>
  <i className="fas fa-trash mr-1" /> Clear Cart
</div>

        </button>
      </div>

</div>}
   

  

  </>
}
