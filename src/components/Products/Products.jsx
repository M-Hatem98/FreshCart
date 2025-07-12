import { useQuery,  } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import Spinner from '../Spinner/Spinner'
import { Link } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { WishListContext } from '../Context/WishListContext'
import { Helmet } from 'react-helmet-async'

export default function Products() {

  let {addToCart , addedproductid } = useContext(CartContext)
  let {addProductToWishList , addeddproductid , wishlistIds } = useContext(WishListContext)
   async function addProdToCart(prodId){
    let response =await addToCart(prodId)
    if (response?.data?.status === "success") {
      toast.success(response?.data?.message , {
        duration : 3000,
        position : 'bottom-right'
      })
    }else {
     toast.error(response?.data?.message , {
        duration : 3000,
        position : 'bottom-right'
      })
    }
  }

   async function addProdToWishlist(prodId){
    let response =await addProductToWishList(prodId)
    if (response?.data?.status === "success") {
      toast.success(response?.data?.message , {
        duration : 3000,
        position : 'bottom-right'
      })
    }else {
     toast.error(response?.data?.message , {
        duration : 3000,
        position : 'bottom-right'
      })
    }
  }


  const { isPending, isError, data, error } = useQuery({
    queryKey: ['products'],
    queryFn: ()=>{
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    },
    select : (data)=>{
      return data?.data?.data
    }
  })

    if (isPending) {
    return <Spinner/>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }


  return <>
  <Helmet>
    <title>Products</title>
  </Helmet>
  <div className='min-h-screen'>
     <h1 className="text-3xl text-green-500 font-bold my-10">Check All Products</h1>
   <div className="flex flex-wrap gap-y-3">

  {data?.map((prod)=>{ const isInWishlist = wishlistIds.includes(prod._id); return <div key={prod?.id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6">
      <div className="relative product py-5 px-3 shadow hover:shadow-green-500 hover:transform hover:scale-105 transition-all duration-700 rounded-md m-3">
    <Link to={`/productdetails/${prod?.id}/${prod?.category.name}`}>
      <img src={prod?.imageCover} className='w-100' alt={prod?.title.split(" ").slice(0, 2).join(" ")} />
      <span className='text-gray-600'>{prod?.category.name}</span>
      <h3 className='text-xl font-medium text-green-500 text-ellipsis overflow-hidden whitespace-nowrap'>{prod?.title.split(" ").slice(0, 2).join(" ")}</h3>
      <div className="flex justify-between">
        <span>{prod?.price} EGP</span>
        <span><i className='fas fa-star text-yellow-400'></i> {prod?.ratingsAverage}</span>
      </div>
    </Link>
    <button onClick={() => addProdToWishlist(prod._id)}>
          {addeddproductid === prod._id ? (
            <i className="fas fa-spinner fa-spin absolute top-3 right-3 text-3xl text-red-500"></i>
          ) : (
            <i className={`absolute top-3 right-3 text-3xl text-red-500 ${isInWishlist ? 'fa-solid' : 'fa-regular'} fa-heart`} />
          )}
        </button>
      <button onClick={()=>{addProdToCart(prod?._id)}} className='w-full bg-green-600 py-2 text-white rounded-md my-2'>{addedproductid === prod?._id ? <i className="fas fa-spinner fa-spin"></i> : 'Add To Cart'}</button>
    </div>
    </div>})}
   </div>
   </div>

  </>
}
