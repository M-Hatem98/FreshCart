import axios from "axios"
import { createContext, useEffect, useState } from "react"

export let WishListContext = createContext(0)

export default function WishListContextProvider(props) {
  const [addeddproductid, setaddeddproductid] = useState(null)
  const [wishproducts, setwishproducts] = useState([])
  const [wishCount, setwishCount] = useState(0)
  const [wishlistIds, setWishlistIds] = useState([])
  const [deletedIds, setdeletedIds] = useState([])
  const [deleted , setdeleted] = useState(false)
  

  const token = localStorage.getItem('userToken')

  const headers = {
    token
  }

  function addProductToWishList(prodId) {
    setaddeddproductid(prodId)
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId: prodId }, { headers })
      .then((response) => {
        getWishListProducts() 
        setaddeddproductid(null)
        return response
      }).catch((error) => {
        setaddeddproductid(null)
        return error
      })
  }

  function getWishListProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((response) => {
        setwishproducts(response?.data?.data)
        setwishCount(response?.data?.count )
        setWishlistIds(response?.data?.data.map(product => product._id))

        return response
      }).catch((error) => {
        console.error("Error fetching wishlist:", error)
        return error
      })
  }

  function deletewishProduct(productId) {
    setdeleted(true)
    setdeletedIds(productId)
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
    .then((response) => {
        getWishListProducts()
        setdeletedIds(null)
        setdeleted(false)
        return response
    }).catch((error) => {
          setdeletedIds(null)
          setdeleted(false)
        return error
      })
  }

  useEffect(() => {
    if (token) {
      getWishListProducts()
    }
  }, [token])

  return (
    <WishListContext.Provider value={{
      addProductToWishList,
      getWishListProducts,
      deletewishProduct,
      wishCount,
      wishproducts,
      addeddproductid,
      wishlistIds,
      deletedIds,
      deleted
    }}>
      {props.children}
    </WishListContext.Provider>
  )
}
