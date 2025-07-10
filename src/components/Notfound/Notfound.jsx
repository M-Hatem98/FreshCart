import React from 'react'
import notfound from '../../assets/error.svg'
import { Helmet } from 'react-helmet'
export default function Notfound() {
  return <>
  <Helmet>
    <title>Not Found</title>
  </Helmet>
  <div className="h-screen w-full flex justify-center items-center">
    <img src={notfound} alt="404 Error not Found" />
  </div>

  </>
}
