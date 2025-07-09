import React, { useEffect, useState } from 'react'
import style from './Spinner.module.css'
import { BallTriangle } from 'react-loader-spinner'

export default function Spinner() {
    const [counter , setcounter] = useState(0)
    useEffect(()=>{

    },[])
  return <>

 <div className="flex justify-center items-center h-screen">
<BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
  </div> 
 
  </>
}
