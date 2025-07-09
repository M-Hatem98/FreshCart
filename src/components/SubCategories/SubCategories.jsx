

import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Spinner from '../Spinner/Spinner'
import axios from 'axios'

export default function SubCategories() {
  const { id } = useParams()

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['subcategories', id],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`),
    select: (data) => data?.data?.data,
  })

  if (isPending) return <Spinner />
  if (isError) return <span>Error: {error.message}</span>
  
if (!data || data.length === 0) {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="bg-white rounded-lg p-6 text-center">
        <i className="fas fa-layer-group text-gray-300 text-9xl mb-4"></i>
        <p className="text-3xl text-gray-500">No Subcategories Available</p>
        <Link
          to={'/'}
          className="inline-block bg-green-500 text-white px-6 py-2 mt-8 rounded-lg hover:bg-green-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

  return <>
  
     <h1 className="text-3xl text-green-500 font-bold my-10">Sub Categories</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-4">
      {data?.map((sub) => (
        <div
          key={sub?._id}
          className="bg-white rounded-lg shadow hover:shadow-green-500 transform hover:scale-105 transition-all duration-500">
          <div className="block text-center p-4">
            <span className="text-green-600 font-semibold text-lg">{sub?.name}</span>
          </div>
        </div>
      ))}
    </div>
  </>
  
}
