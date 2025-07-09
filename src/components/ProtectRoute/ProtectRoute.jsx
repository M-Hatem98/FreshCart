import React, { useEffect, useState } from 'react'
import style from './ProtectRoute.module.css'
import { Navigate } from 'react-router-dom'

export default function ProtectRoute(props) {
   if(localStorage.getItem('userToken') !== null) {

    return props.children

   } else {
    <Navigate to='/login' />
   }
}
