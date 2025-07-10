import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './WishList.module.css'
import { WishListContext } from '../Context/WishListContext'
import Slider from "react-slick";
import Spinner from './../Spinner/Spinner';
import { CartContext } from './../Context/CartContext';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function WishList() {

      let {addToCart , addedproductid } = useContext(CartContext)
      let { wishCount , wishproducts , addeddproductid , deletewishProduct , wishlistIds ,deletedIds , deleted} = useContext(WishListContext) 
      

      const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, [wishproducts]);

   const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    asNavFor: nav2,
  };

  const thumbSettings = {
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: false,
    asNavFor: nav1,
  };

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

if(!wishproducts) return <Spinner />
  

if (!wishproducts || wishproducts.length == 0 ) {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="bg-white rounded-lg  p-6 text-center">
          <i className="fas fa-heart text-gray-300 text-9xl mb-4"></i>
          <p className="text-3xl text-gray-500">Your Wishlist is empty</p>
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

  async function handeldeleteWishProduct(productId ){
    let response = await deletewishProduct(productId)
    toast.success('Product Deleted Successfuly' , {
      duration : 3000 , 
      position : 'bottom-right'
    })
    
  }


  return <>
  <Helmet>
    <title>WishList</title>
  </Helmet>
  {deleted ? <Spinner /> :  <div className="my-10 ">
    
    <div className="flex justify-between items-center mb-5">
        <div>
  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-500">Shopping Wishlist</h1>
        </div>
  <div className="bg-green-500 text-white px-3 py-2 rounded-full flex items-center">
    <i className="fas fa-heart mr-2" />
    <span> {wishCount} items</span>
  </div>
</div>

{wishproducts?.map((product) => (
  <div key={product._id} className="flex flex-wrap items-center my-8 shadow-lg relative">

    <div className="w-full md:w-1/4">
      <Slider {...sliderSettings} ref={sliderRef1}>
        {product?.images.map((src, idx) => (
          <img key={idx} className="w-100 rounded-2xl" src={`https://ecommerce.routemisr.com/Route-Academy-products/${src}`} alt={product?.title} />
        ))}
      </Slider>

      <Slider {...thumbSettings} ref={sliderRef2}>
        {product?.images.map((src, idx) => (
          <img key={idx} className="w-100 rounded-2xl p-2" src={`https://ecommerce.routemisr.com/Route-Academy-products/${src}`} alt={product?.title} />
        ))}
      </Slider>
    </div>

    <div className="w-full md:w-3/4">
      <div className="container mx-auto max-w-4xl">
        <h3 className="text-2xl my-2 font-bold">{product?.title}</h3>
        <p className="text-slate-500 my-2">{product?.description}</p>
        <p className="text-green-500 my-2">{product?.category?.name}</p>
        <div className="flex justify-between my-3">
          <span><span className="text-green-500 font-medium">Price :</span> {product?.price} EGP</span>
          <span><span className="text-green-500 font-medium">Rate :</span> <i className="fas fa-star text-yellow-400"></i> {product?.ratingsAverage}</span>
        </div>
        <div className="flex justify-between my-3">
          <span><span className="text-green-500 font-medium">Stock :</span> {product?.quantity}</span>
          <span><span className="text-green-500 font-medium">Brand :</span> {product?.brand?.name}</span>
        </div>
        <button onClick={() => addProdToCart(product?._id)} className="w-full text-white bg-green-600 py-2 rounded-md my-2">
  {addedproductid === product?._id ? <i className="fas fa-spinner fa-spin"></i> : 'Add To Cart'}
</button>
      </div>
    </div>
<a  onClick={()=>{handeldeleteWishProduct(product?._id)}} className="cursor-pointer font-medium text-red-600 hover:underline absolute top-8 right-8">{deletedIds == product?._id ? <i className="fas fa-spinner fa-spin"></i> : 'Remove'}</a>
  </div>

))}
</div> }
 

  </>
}
