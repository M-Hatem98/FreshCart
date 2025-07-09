import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { userContext } from '../Context/userContext';
import logo from '../../assets/images/freshcart-logo.svg'
import { CartContext } from '../Context/CartContext';
import { WishListContext } from '../Context/WishListContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate()
 let {loggedIn , setloggedIn} = useContext(userContext)
 let {numOfCartItems , products} = useContext(CartContext)
 let {wishCount , wishproducts} = useContext(WishListContext)
 function logout(){
  localStorage.removeItem('userToken')
  setloggedIn(null)
  navigate('/login')
 }
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-4 md:px-8 h-18">
        {/* Logo */}
        {/* <div className="flex items-center space-x-6"> */}
          {/* <h1 className="text-2xl font-bold text-green-600">MyLogo</h1> */}
          <Link to={'/'}><img src={logo} alt="freshcart-logo" /></Link>
          {/* Desktop Links */}
          {loggedIn !== null ? <ul className="hidden md:flex space-x-10 text-xl">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `transition ${isActive ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/brands"
                className={({ isActive }) =>
                  `transition ${isActive ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`
                }
              >
                Brands
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `transition ${isActive ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  `transition ${isActive ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`
                }
              >
                Categories
              </NavLink>
            </li>
          </ul> : null}
          
        {/* </div> */}

        {/* Social Icons + Auth (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
         
          {/* <a href="#" className="text-gray-600 hover:text-green-600">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-600 hover:text-green-600">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-600 hover:text-green-600">
            <i className="fab fa-instagram"></i>
          </a> */}
           <ul className="hidden md:flex space-x-10 text-xl">
            {loggedIn === null ? <><li>
              <NavLink
                to="login"
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-green-600"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="register"
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-green-600"
              >
                Register
              </NavLink>
            </li></> : <>
              <li>

             <NavLink to="/wishlist" className="relative text-gray-600 hover:text-green-600">
             {wishCount == 0  || !wishproducts ?  null : <span className="absolute bottom-5 left-4  bg-red-100 text-red-800 text-xs font-medium me-2 px-1.5 py-0.5 rounded-sm  border border-red-400">{wishCount}</span>}
              
              <i className="fas fa-heart"></i>
            </NavLink>

              </li>
              <li>

             <NavLink to="/cart" className="relative text-gray-600 hover:text-green-600">
             {numOfCartItems == 0  || !products ?  null : <span className="absolute bottom-5 left-4  bg-green-100 text-green-800 text-xs font-medium me-2 px-1.5 py-0.5 rounded-sm  border border-green-400">{numOfCartItems}</span>}
              
              <i className="fas fa-cart-shopping"></i>
            </NavLink>

              </li>
             <li onClick={logout}>
              <NavLink
                onClick={() => setIsOpen(false)}
                className=" block text-gray-700 hover:text-green-600 cursor-pointer"
                >
                Logout
              </NavLink>
            </li>
                </>
            
            }

            </ul>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl text-gray-700`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 py-4 shadow">
          {loggedIn !== null ? <ul className="space-y-3">
            <li>
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-green-600"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/brands"
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-green-600"
              >
                Brands
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-green-600"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-green-600"
              >
                Categories
              </NavLink>
            </li>
          </ul> : null}
          




          {/* <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-gray-600 hover:text-green-600">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600">
              <i className="fab fa-instagram"></i>
            </a>
          </div> */}

          <div className="mt-4 space-y-2">
            {/* <button className="w-full text-gray-700 hover:text-green-600">Login</button>
            <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Register
            </button> */}
            <ul className="space-y-3">
              {loggedIn === null ? <> <li>
              <NavLink
                to="login"
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-green-600"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="register"
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-green-600"
              >
                Register
              </NavLink>
            </li></> : <>
              <li>

             <NavLink to="/wishlist" className="relative text-gray-600 hover:text-green-600">
             {numOfCartItems == 0  || !products ?  null : <span className="absolute bottom-5 left-4  bg-green-100 text-green-800 text-xs font-medium me-2 px-1.5 py-0.5 rounded-sm  border border-green-400">{numOfCartItems}</span>}
              
              <i className="fas fa-heart"></i>
            </NavLink>

              </li>
              <li>

             <NavLink to="/cart" className="relative text-gray-600 hover:text-green-600">
             {numOfCartItems == 0  || !products ?  null : <span className="absolute bottom-5 left-4  bg-green-100 text-green-800 text-xs font-medium me-2 px-1.5 py-0.5 rounded-sm  border border-green-400">{numOfCartItems}</span>}
              
              <i className="fas fa-cart-shopping"></i>
            </NavLink>

              </li>
             <li onClick={logout}>
              <NavLink
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-green-600 cursor-pointer"
                >
                Logout
              </NavLink>
            </li>
                </>
            }
           
           
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
