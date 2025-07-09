import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext =createContext(0)

export default function CartContextProvider(props){
    let [addedproductid , setaddedproductid] = useState(null)
    let [cartId , setcartId] = useState(null)
    let [numOfCartItems , setnumOfCartItems] = useState(null)
    let [message , setmessage] = useState(null)
    let [products , setproducts] = useState(null)
    let [totalCartPrice , settotalCartPrice] = useState(null)
    let [isCartLoading, setIsCartLoading] = useState(true);
    let [isdeleted, setisdeleted] = useState(false);
    let token = localStorage.getItem('userToken')
    let headers = {
        token : localStorage.getItem('userToken')
    }

    function addToCart(prodId){
        setaddedproductid(prodId)
       return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
           productId : prodId
        },{
            headers
        }).then((response)=>{
            setaddedproductid(null)
            getLoggedUserCart()

            return response
            
        }).catch((error)=>{
            setaddedproductid(null)
            return error
            
        })
    }

function getLoggedUserCart(){
    setIsCartLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {headers}).then((response)=>{
        setcartId(response?.data?.cartId)
        setnumOfCartItems(response?.data?.numOfCartItems)
        setproducts(response?.data?.data?.products)
        settotalCartPrice(response?.data?.data?.totalCartPrice)
        setIsCartLoading(false)
    }).catch((error)=>{
        console.log(error);
        setIsCartLoading(false)
    })
}

 function updateCartProduct(productId , count){
   return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        count : count
    },{
        headers
    }).then((response)=>{
        setcartId(response?.data?.cartId)
            setnumOfCartItems(response?.data?.numOfCartItems)
            setproducts(response?.data?.data?.products)
            settotalCartPrice(response?.data?.data?.totalCartPrice)
        return response
        
    }).catch((error)=>{
        return error;
        
    })
}
 function deleteCartProduct(productId){
    setisdeleted(true)
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        headers
    }).then((response)=>{
        setcartId(response?.data?.cartId)
            setnumOfCartItems(response?.data?.numOfCartItems)
            setproducts(response?.data?.data?.products)
            settotalCartPrice(response?.data?.data?.totalCartPrice)
        setisdeleted(false)
        return response
        
    }).catch((error)=>{
        return error;
        setisdeleted(false)
        
    })
}

 function clearCart(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
      headers 
    }).then((response)=>{
        setcartId(response?.data?.cartId)
            setnumOfCartItems(response?.data?.numOfCartItems)
            setproducts(response?.data?.data?.products)
            settotalCartPrice(response?.data?.data?.totalCartPrice)
      return response;
      
    }).catch((error)=>{
      return error;
      
    })
  }

  function resetCart(){
            setcartId(null)
            setnumOfCartItems(0)
            setproducts(null)
            settotalCartPrice(0)
  }

useEffect(()=>{
 if(token) {
    getLoggedUserCart()
 }
},[token])





    return <CartContext.Provider value={{addToCart , updateCartProduct , deleteCartProduct , clearCart , resetCart , addedproductid , cartId , numOfCartItems  , products , totalCartPrice , isCartLoading , isdeleted }}>
        {props.children}
    </CartContext.Provider>
}