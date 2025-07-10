
import { createBrowserRouter, RouterProvider , Router } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Brands from './components/Brands/Brands'
import Categories from './components/Categories/Categories'
import Cart from './components/Cart/Cart'
import Register from './components/Register/Register'
import Notfound from './components/Notfound/Notfound'
import UserContextProvider from './components/Context/userContext'
import ProtectRoute from './components/ProtectRoute/ProtectRoute'
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './components/Context/CartContext'
import { Toaster } from 'react-hot-toast'
import CheckOut from './components/CheckOut/CheckOut';
import AllUserOrders from './components/AllUserOrders/AllUserOrders'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/production';
import SubCategories from './components/SubCategories/SubCategories'
import WishListContextProvider from './components/Context/WishListContext'
import WishList from './components/WishList/WishList'
import CategoryProducts from './components/CategoryProducts/CategoryProducts'
import ResetPassword from './components/ResetPassword/ResetPassword'
import ResetCode from './components/ResetCode/ResetCode'

let queryClient = new QueryClient()

let route = createBrowserRouter([

  {path:'' , element : <Layout/> , children : [
    {index : true , element : <Home/>},
    {path: 'brands' , element : <ProtectRoute><Brands/></ProtectRoute>},
    {path: 'products' , element : <ProtectRoute><Products/></ProtectRoute>},
    {path: 'categories' , element : <ProtectRoute><Categories/></ProtectRoute>},
    {path: 'categories/:id/:category' , element : <ProtectRoute><SubCategories/></ProtectRoute>},
    {path: 'cart' , element : <ProtectRoute><Cart/></ProtectRoute>},
    {path: 'wishlist' , element : <ProtectRoute><WishList/></ProtectRoute>},
    {path: 'allorders' , element : <ProtectRoute><AllUserOrders/></ProtectRoute>},
    {path: 'checkout' , element : <ProtectRoute><CheckOut/></ProtectRoute>},
    {path: 'productdetails/:id/:category' , element : <ProtectRoute><ProductDetails/></ProtectRoute>},
    {path: 'main-category/:id/:name' , element : <ProtectRoute><CategoryProducts/></ProtectRoute>},
    {path: 'register' , element : <Register/>},
    {path: 'login' , element : <Login/>},
    {path: 'resetpassword' , element : <ResetPassword/>},
    {path: 'resetcode' , element : <ResetCode/>},
    {path: '*' , element : <Notfound/>},
  ]}
])
function App() {

  return (
  <>

  <QueryClientProvider client={queryClient}>

  <UserContextProvider>

  <CartContextProvider>
<WishListContextProvider>

 <RouterProvider router={route}></RouterProvider>
<Toaster />
<ReactQueryDevtools/>
</WishListContextProvider>
  </CartContextProvider>

  </UserContextProvider>
  </QueryClientProvider>
 
  </>
     
  )
}

export default App
