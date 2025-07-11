import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './ProductDetails.module.css'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";
import Spinner from '../Spinner/Spinner';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../Context/WishListContext';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {

    let {addToCart , addedproductid } = useContext(CartContext)
    let {addProductToWishList , addeddproductid , wishlistIds } = useContext(WishListContext)

  let { id, category } = useParams()
  const [productDetails, setProductDetails] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState(null)

  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, [productDetails]);

  function getAllProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let related = data?.data.filter((prod) => prod.category.name === category);
        setRelatedProducts(related);
      })
      .catch((error) => console.log(error));
  }

  function getProductDetails() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data?.data)
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

  useEffect(() => {
    getProductDetails();
    getAllProducts();
  }, [id])

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

  return (
    <>
    <Helmet>
      <title>Product Details</title>
    </Helmet>
      {productDetails ? (
        <div className="flex flex-wrap items-center mt-8">
          <div className="w-full md:w-1/4">
            <Slider {...sliderSettings} ref={sliderRef1}>
              {productDetails.images.map((src, idx) => (
                <img key={idx} className='w-100 rounded-2xl' src={src} alt={productDetails.title} />
              ))}
            </Slider>

            <Slider {...thumbSettings} ref={sliderRef2}>
              {productDetails.images.map((src, idx) => (
                <img key={idx} className='w-100 rounded-2xl p-2' src={src} alt={productDetails.title} />
              ))}
            </Slider>
          </div>

          <div className="w-full md:w-3/4">
            <div className="container mx-auto max-w-4xl">
              <h3 className='text-2xl my-2 font-bold'>{productDetails.title}</h3>
              <p className='text-slate-500 my-2'>{productDetails.description}</p>
              <p className='text-green-500 my-2'>{productDetails.category.name}</p>
              <div className="flex justify-between my-3">
                <span><span className='text-green-500 font-medium'>Price :</span> {productDetails.price} EGP</span>
                <span><span className='text-green-500 font-medium'>Rate :</span> <i className='fas fa-star text-yellow-400'></i> {productDetails.ratingsAverage}</span>
              </div>
              <div className="flex justify-between my-3">
                <span><span className='text-green-500 font-medium'>Stock :</span> {productDetails.quantity}</span>
                <span><span className='text-green-500 font-medium'>Brand :</span> {productDetails.brand.name}</span>
              </div>
              <button onClick={()=>{addProdToCart(productDetails?.id)}} className='w-full text-white bg-green-600 py-2 rounded-md my-2'>Add To Cart</button>
            </div>
          </div>
        </div>
      ) : <Spinner />}

      {relatedProducts?.length > 0 ? (
        <div className='my-10'>
          <h3 className='text-3xl text-green-500 font-medium'>Related Products</h3>
          <div className="flex flex-wrap">
            {relatedProducts.map((prod) => {const isInWishlist = wishlistIds.includes(prod._id); return <div key={prod?.id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6">
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
      ) : <Spinner />}
    </>
  )
}
