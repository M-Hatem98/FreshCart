import React, { useContext }  from 'react'
import RecentProducts from './../RecentProducts/RecentProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import BrandSlider from '../BrandSlider/BrandSlider';
import { CartContext } from '../Context/CartContext';
import { userContext } from '../Context/userContext';
import { Helmet } from 'react-helmet';

export default function Home() {
  let {loggedIn} = useContext(userContext)
  return <>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <div className='mt-8'>
      <MainSlider/>
       {loggedIn ? 
      <>
      <CategorySlider/>
      <RecentProducts/>
      </> : <div className='flex justify-center items-center h-[400px]'>
      <div className="bg-white rounded-lg  p-6 text-center">
          <i class="fa-solid fa-right-to-bracket text-gray-300 text-9xl mb-4"></i>
          <p className="text-3xl text-gray-500">You must Login To see Our Products</p>
        </div>
    </div>
        }
      <BrandSlider/>
    </div>
  </>
  
}
