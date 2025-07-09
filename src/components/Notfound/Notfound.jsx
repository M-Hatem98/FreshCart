import React from 'react'
import notfound from '../../assets/error.svg'
export default function Notfound() {
  return <>

  <div className="h-screen w-full flex justify-center items-center">
    <img src={notfound} alt="404 Error not Found" />
  </div>

  </>
}
