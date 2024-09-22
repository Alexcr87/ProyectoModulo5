import React, { useEffect } from 'react';
import Cartrender from '../candidaterender/Candidaterender';
import { getCandidates } from '@/helpers/candidate.helper';
import Link from "next/link";

const OrderList = async () => {
    const usersResponse = await getCandidates()
    const usersarr = usersResponse.map(item => ({
       imgUrl: item.imgUrl,
       id:item.id,
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
                return (

                  <div className="flex justify-center flex-wrap m-8 p-4 bg-gray-100 rounded-lg shadow-md">

                      {
      usersarr && usersarr.length > 0 ? 
      usersarr.map((item) => {
          return (
            <Link href={`/candidates/${item.id}`} key={item.id}>
            <Cartrender key={item.id} {...item} />
            </Link>
          )
        })
      :   <p className="text-lg text-gray-600 font-medium">You don't have any products in your cart</p>
    }

                  </div>


                  )
  }

  export default OrderList
