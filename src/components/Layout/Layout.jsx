import React from 'react'
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return <>
  <Navbar/>
  <div className="container min-h-screen mx-auto pt-16 max-w-7xl">
  <Outlet/>
  </div>
  <Footer/>
  </>
}
