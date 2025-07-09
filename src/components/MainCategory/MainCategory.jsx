import React, { useEffect, useState } from 'react'
import style from './MainCategory.module.css'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';

export default function MainCategory() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['categories'],
    queryFn: ()=>{
      return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    },
    select : (data)=>{
      
      return data?.data?.data
    }
 })

  if (isPending) {
    return <Spinner/>
  }

  if (isError) {
    return <span>Error: {error.message}</span>

  }



  return <>
    <h1 className="text-3xl text-green-500 font-bold my-18">All Categories</h1>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-5 px-4">
  {data?.map((cat) => (
    <div key={cat?._id} className="bg-white rounded-lg shadow-md hover:shadow-green-500 transform hover:scale-105 transition-all duration-500">
      <Link to={`/categories/${cat?._id}/${cat?.name}`} className="block text-center p-3">
        <div className="overflow-hidden rounded-md">
          <img
            src={cat?.image}
            alt={cat?.name}
            className="w-full h-[320px] object-cover rounded-md transition-transform duration-500 hover:scale-110"
          />
        </div>
        <h3 className="mt-3 text-md font-semibold text-gray-700 truncate">{cat?.name}</h3>
      </Link>
    </div>
  ))}
</div>

  </>
}
