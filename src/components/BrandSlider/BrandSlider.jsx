import React, { useEffect, useState } from 'react'
import style from './BrandSlider.module.css'
import axios from 'axios'
import Slider from "react-slick";
import Spinner from '../Spinner/Spinner';


export default function BrandSlider() {
    const [brands , setbrands] = useState(null)
var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows : false,
    autoplay : true,
     responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  function getAllBrands () {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    .then(({data})=>{
      setbrands(data?.data)
      
    }).catch((error)=>{
      console.log(error);
      
    })
  }
    useEffect(()=>{
      getAllBrands()
    },[])
  return <>
  {brands?.length > 0 ?  <div className="my-10">
<h2 className=' mb-8 text-3xl font-bold text-green-500'>Check Popular Brands</h2>

<Slider {...settings}>
  {brands?.map((category) => (
    <div
      key={category._id}
      className="text-center px-2 transition duration-300 hover:scale-105"
    >
      <div className="bg-white shadow-md rounded-md overflow-hidden p-2">
        <img
          src={category.image}
          className="mx-auto h-[200px] w-auto object-contain"
          alt={category.name}
        />
        <h3 className="mt-2 text-sm md:text-base font-medium text-gray-800">
          {category.name}
        </h3>
      </div>
    </div>
  ))}
</Slider>

  </div> : <Spinner/> }
 
  </>
}
