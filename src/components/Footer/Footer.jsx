import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Fresh Cart</h2>
          <p className="text-sm">
            Discover quality products with amazing deals. Your one-stop shop for everything!
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-green-500">Home</Link></li>
            <li><Link to="/products" className="hover:text-green-500">Products</Link></li>
            <li><Link to="/categories" className="hover:text-green-500">Categories</Link></li>
            <li><Link to="/brands" className="hover:text-green-500">Brands</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-blue-500"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-sky-400"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-pink-500"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-blue-300"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} <span className="font-semibold text-green-500">Fresh Cart </span>. All rights reserved | <a href="https://m-hatem98.github.io/Mohammed-Hatem/" className="hover:text-green-500 font-bold">Mohammed Hatem</a>.
      </div>
    </footer>
  )
}
