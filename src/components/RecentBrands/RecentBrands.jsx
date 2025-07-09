import React, { useEffect, useState } from 'react'
import style from './RecentBrands.module.css'
import axios from 'axios'
import Spinner from '../Spinner/Spinner'

export default function RecentBrands() {
    const [allBrands , setallBrands] = useState(null)

    function getAllBrands(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({data})=>{  
        setallBrands(data?.data)
      }).catch((error)=>{ 
        console.log(error);
      })
    }

    useEffect(()=>{
      getAllBrands()
    },[])
  return <>
  {allBrands?.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 px-4">
    {allBrands.map((brand) => (
      <div key={brand?._id} className="bg-white rounded-md shadow hover:shadow-green-500 transition-all duration-500 p-5 text-center">
        <img
          src={brand?.image}
          className="w-full h-32 object-contain mx-auto mb-3"
          alt={brand?.name?.split(" ").slice(0, 2).join(" ")}
        />
        <h3 className="text-lg font-semibold text-gray-800">{brand?.name?.split(" ").slice(0, 2).join(" ")}</h3>
        <p className="text-green-500 text-sm">{brand?.slug}</p>
      </div>
    ))}
  </div>
) : (
  <Spinner />
)}

    
  </>
}
