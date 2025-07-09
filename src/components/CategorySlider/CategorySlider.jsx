import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import axios from 'axios'
import Slider from "react-slick";
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';

export default function CategorySlider() {
    const [categories , setcategories] = useState(null)
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
  function getAllCategories () {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then(({data})=>{
      setcategories(data?.data)
      
    }).catch((error)=>{
      console.log(error);
      
    })
  }
    useEffect(()=>{
      getAllCategories()
    },[])
  return <>
  {categories?.length > 0 ?  <div className="my-18">
<h2 className=' mb-3 text-3xl font-bold text-green-500'>Shop Popular Categories</h2>

<Slider {...settings}>
  {categories?.map((category) => (
    <div key={category._id} className="text-center px-2 transition duration-300 hover:scale-105">
      
      <Link to={`/main-category/${category._id}/${category.name}`}>
        <div className="bg-white shadow-md rounded-md overflow-hidden p-2 cursor-pointer">
          <img
            src={category.image}
            className="mx-auto h-[200px] w-auto object-contain"
            alt={category.name}
          />
          <h3 className="mt-2 text-sm md:text-base font-medium text-gray-800">
            {category.name}
          </h3>
        </div>
      </Link>
    </div>
  ))}
</Slider>

  </div> : <Spinner/> }
 
  </>
}
