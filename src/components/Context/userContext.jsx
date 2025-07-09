import { createContext, useEffect, useState } from "react";

export let userContext = createContext(0)

export default function UserContextProvider (props){

 let [loggedIn , setloggedIn] =useState(null)

 useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
        setloggedIn(localStorage.getItem('userToken'))
    }
 },[])

    return <>
    <userContext.Provider value={{loggedIn , setloggedIn}}>
    {props.children}
    </userContext.Provider>
    
    </>

}