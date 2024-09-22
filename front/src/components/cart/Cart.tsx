
import React from 'react';
import Image from 'next/image';
import ICandidate from '@/interfaces/ICandidate';
import IUser from '@/interfaces/IUser';
import { getUsers } from '@/helpers/user.helper';
import { useRouter } from "next/navigation";

import Cartrender from '../cartrender/cartrender';
import { cpSync } from 'fs';

const OrderList = async () => {
  // const router = useRouter()
  // const [users, setusers] = useState<IUser[]>([])
  
      // useEffect (() => {
      //   const session = localStorage.getItem("userSesion")
      //     setUserSession (JSON.parse(session!))
      //     }, [])
      // useEffect (() => {

          const usersResponse = await getUsers()
          const usersarr = usersResponse.map(item => ({
            user: {
            id: item.user.id,
            name: item.user.name,
            dni: item.user.dni,
            email: item.user.email,
            address: item.user.address,
            city: item.user.city,
            country: item.user.country,
            suffrage: item.user.suffrage,
          
          }}));
          console.log (usersarr)
         
    //       setusers (usersarr)
    //   }
    // }, [])


  
          // useEffect (() => {
          //     if (userSession?.userData.name) {
          //      userSession?.userData.name === undefined ? router.push('/login') : fechData()
          //       } 
          //       }, [userSession?.userData])
  
  
                return (
  
                  <div className="flex justify-center flex-wrap m-8 p-4 bg-gray-100 rounded-lg shadow-md">
                      
                      {
      usersarr && usersarr.length > 0 ? 
      usersarr.map((item) => {
          return (
            <Cartrender key={item.user.id} {...item} />
          )
        })
      :   <p className="text-lg text-gray-600 font-medium">You don't have any products in your cart</p>
    }
                                
                  </div>
              
               
                  )
  }


  
  export default OrderList

