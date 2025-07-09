import React  from 'react'
import RecentProducts from './../RecentProducts/RecentProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import BrandSlider from '../BrandSlider/BrandSlider';

export default function Home() {
   
  return (
    <div className='mt-8'>
      <MainSlider/>
      <CategorySlider/>
      <RecentProducts/>
      <BrandSlider/>
    </div>
  )
}
