import React, { useContext, useEffect, useState } from 'react'
import style from './CategoryProducts.module.css'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import { CartContext } from '../Context/CartContext'
import { WishListContext } from '../Context/WishListContext'
import toast from 'react-hot-toast'

export default function CategoryProducts() {
  let {addToCart , addedproductid } = useContext(CartContext)
      let {addProductToWishList , addeddproductid , wishlistIds } = useContext(WishListContext)
    const [products , setproducts] = useState(0)
    const { id, name } = useParams();

    function getCategoryProducts(a){
       axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let related = data?.data.filter((prod) => prod.category.name === name);
        setproducts(related);
      })
      .catch((error) => console.log(error));
    }

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

    useEffect(()=>{
      getCategoryProducts()
    },[id])

    if ( products.length == 0 ) {
      return (
        <div className='flex justify-center items-center h-screen'>
          {/* <h2 className='text-4xl text-green-500'>No Cart Items</h2> */}
          <div className="bg-white rounded-lg  p-6 text-center">
              <i className="fas fa-layer-group text-gray-300 text-9xl mb-4"></i>
              <p className="text-3xl text-gray-500">This Category Has No Products</p>
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

    if(!products){
      return <Spinner />;
    }
    
  return <>
     
        <div className='my-10'>
          <h3 className='text-3xl text-green-500 font-medium'>{products[0]?.category?.name || 'Category'} </h3>
          <div className="flex flex-wrap">
            {products.map((prod) => {const isInWishlist = wishlistIds.includes(prod._id); return <div key={prod?.id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6">
                <div className="relative product shadow hover:shadow-green-500 hover:transform hover:scale-105 transition-all duration-700 rounded-md overflow-hidden m-3">
                  <Link to={`/productdetails/${prod?.id}/${prod?.category?.name}`}>
                    <img src={prod?.imageCover} className='w-100' alt={prod?.title} />
                    <div className="pt-5 px-3">
                      <span className='text-gray-600'>{prod?.category?.name}</span>
                      <h3 className='text-xl font-medium text-green-500 text-ellipsis overflow-hidden whitespace-nowrap'>{prod?.title.split(" ").slice(0, 2).join(" ")}</h3>
                      <div className="flex justify-between">
                        <span>{prod?.price} EGP</span>
                        <span><i className='fas fa-star text-yellow-400'></i> {prod?.ratingsAverage}</span>
                      </div>
                    </div>
                  </Link>
                  <div className="px-3">

                    <button onClick={() => addProdToWishlist(prod._id)}>
          {addeddproductid === prod._id ? (
            <i className="fas fa-spinner fa-spin absolute top-3 right-3 text-3xl text-red-500"></i>
          ) : (
            <i className={`absolute top-3 right-3 text-3xl text-red-500 ${isInWishlist ? 'fa-solid' : 'fa-regular'} fa-heart`} />
          )}
        </button>
                    <button  onClick={()=>{addProdToCart(prod?.id)}} className='w-full bg-green-600 text-white py-2 rounded-md mt-2 mb-5'>Add To Cart</button>
                  </div>
                </div>
              </div>
            })}
          </div>
        </div>
      
  </>
}
