import React from 'react'
import RecentBrands from './../RecentBrands/RecentBrands';
import { Helmet } from 'react-helmet-async';

export default function Brands() {
  return <>
    <Helmet>
      <title>Brands</title>
    </Helmet>
    <div className='mt-8'>
      <RecentBrands/>
    </div>
  </>
  
}
