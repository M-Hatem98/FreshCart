import React, { useEffect, useState } from 'react'
import style from './MainSlider.module.css'
import Slider from "react-slick";
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'
import img4 from '../../assets/images/grocery-banner.png'
import img5 from '../../assets/images/grocery-banner-2.jpeg'


export default function MainSlider() {

  const [counter , setcounter] = useState(0)
  
var settings = {
  dots: true,
  infinite: true,
  speed: 900,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true, 
  autoplaySpeed: 3000
}



  useEffect(()=>{

    },[])
  return <>
  
<div className="flex flex-wrap">
  <div className="w-full md:w-3/4">
    <Slider {...settings}>
      <img className='h-[400px] w-full object-cover' src={img3} alt="Slider Image" />
      <img className='h-[400px] w-full object-cover' src={img4} alt="Slider Image" />
      <img className='h-[400px] w-full object-cover' src={img5} alt="Slider Image" />
    </Slider>
  </div>

  <div className="hidden md:block w-full md:w-1/4">
    <img className='w-full h-[200px] object-cover' src={img1} alt="Image 1" />
    <img className='w-full h-[200px] object-cover' src={img2} alt="Image 2" />
  </div>
</div>

  
  </>
}
