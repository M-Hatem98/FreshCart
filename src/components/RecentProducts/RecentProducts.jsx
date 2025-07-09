import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../Context/WishListContext';

export default function RecentProducts() {

  let {addToCart , addedproductid } = useContext(CartContext)
  let {addProductToWishList , addeddproductid , wishlistIds } = useContext(WishListContext)
  const [visibleCount, setVisibleCount] = useState(12);
  let { id, category } = useParams()
  const [allProducts , setallProducts] = useState(null)
  
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

  function getAllProducts(){
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
    .then(({data})=>{
      setallProducts(data?.data)
    }).catch((error)=>{
      console.log(error);
      
    })
  }

  const handleLoadMore = () => {
  setVisibleCount(prev => prev + 12); 
};

    useEffect(()=>{
      getAllProducts()
    },[id])



  return <>
{allProducts?.length > 0 ? <div>
        <h2 className=' mb-3 text-3xl font-bold text-green-500'>Shop Popular Products</h2>
   <div className="flex flex-wrap gap-y-3">
  {allProducts?.slice(0, visibleCount).map((prod)=>{ const isInWishlist = wishlistIds.includes(prod._id); return <div key={prod?.id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6">
      <div className="relative  product py-5 px-3 shadow hover:shadow-green-500 hover:transform hover:scale-105 transition-all duration-700 rounded-md m-3">
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
      <button onClick={()=>{addProdToCart(prod?._id)}} className='w-full bg-green-600 py-2 text-white rounded-md my-2'> {addedproductid === prod?._id ? <i className="fas fa-spinner fa-spin"></i> : 'Add To Cart'} </button>
    </div>
    </div>})}
    
          </div>

          {visibleCount < allProducts?.length && (
  <div className="text-center mt-6">
    <button
      onClick={handleLoadMore}
      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
    >
      Load More
    </button>
  </div>
)}
  </div> : <Spinner/>}
 
  </>
}
